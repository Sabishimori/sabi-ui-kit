import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedLogo } from './AnimatedLogo';
import { sounds } from '../../utils/audio';

interface LoadingScreenProps {
  onComplete?: () => void;
  minDurationMs?: number;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onComplete,
  minDurationMs = 1800,
}) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Lock scroll during loading
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const finishLoading = useCallback(() => {
    setIsFinished(true);
    sounds.playChime();
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 700);
  }, [onComplete]);

  // Smooth realistic progress counter
  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawPct = Math.min(100, Math.floor((elapsed / minDurationMs) * 100));

      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          finishLoading();
          return 100;
        }
        // Smooth step increments
        const next = Math.max(prev + Math.floor(Math.random() * 3 + 1), rawPct);
        if (next >= 100) {
          clearInterval(interval);
          finishLoading();
          return 100;
        }
        return next;
      });
    }, 28);

    return () => clearInterval(interval);
  }, [minDurationMs, finishLoading]);

  // Keyboard shortcut (Escape to skip)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setProgress(100);
        finishLoading();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [finishLoading]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          exit={{ 
            y: '-100%',
            transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] }
          }}
          className="fixed inset-0 z-[999999] bg-[#ffffff] text-[#111111] flex flex-col justify-between select-none overflow-hidden font-main"
        >
          {/* Top/Main Confident Minimal Negative Space */}
          <div className="flex-1 w-full" />

          {/* Lower Indicator Row (Loading label on left, Percentage in center, Skip on right) */}
          <div className="w-full px-6 sm:px-12 pb-6 flex items-center justify-between">
            {/* Left: Animated Brand Icon + "Loading" */}
            <div className="w-1/3 flex items-center gap-2.5">
              <AnimatedLogo size={22} rounded={false} border={false} className="bg-transparent" />
              <span className="text-sm sm:text-base font-semibold text-[#111111] tracking-tight">
                Loading
              </span>
            </div>

            {/* Center: Dynamic Live Percentage */}
            <div className="w-1/3 text-center">
              <span className="text-sm sm:text-base font-semibold text-[#111111] tracking-tight">
                {progress}%
              </span>
            </div>

            {/* Right: Quick Skip Trigger */}
            <div className="w-1/3 text-right">
              <button
                onClick={() => {
                  setProgress(100);
                  finishLoading();
                }}
                className="text-[11px] font-mono text-[#888888] hover:text-[#111111] transition-colors cursor-pointer"
              >
                SKIP [ESC]
              </button>
            </div>
          </div>

          {/* Bottom Ticker Bar with Inverted Color Split Progress Fill */}
          <div className="w-full h-9 sm:h-10 border-t border-[#0a0a0a]/15 relative overflow-hidden bg-white text-[#111111] text-[10px] sm:text-[11px] font-mono uppercase tracking-wider font-semibold">
            {/* Base Layer: Black text on White background */}
            <div className="absolute inset-0 px-6 sm:px-12 flex items-center justify-between pointer-events-none">
              <span className="w-1/3 truncate text-left">SABI OS KIT</span>
              <span className="w-1/3 truncate text-center">PRODUCT DESIGN SYSTEM & WORKSPACE</span>
              <span className="w-1/3 truncate text-right">28 STAGES &bull; 22 LAWS &bull; 200+ TOOLS</span>
            </div>

            {/* Progress Fill Layer: Black background with White text (Expands as progress increases) */}
            <div 
              className="absolute inset-y-0 left-0 bg-[#000000] text-white overflow-hidden transition-all duration-75 ease-out"
              style={{ width: `${progress}%` }}
            >
              <div className="w-screen h-full px-6 sm:px-12 flex items-center justify-between text-white font-mono uppercase tracking-wider font-semibold text-[10px] sm:text-[11px]">
                <span className="w-1/3 truncate text-left">SABI OS KIT</span>
                <span className="w-1/3 truncate text-center">PRODUCT DESIGN SYSTEM & WORKSPACE</span>
                <span className="w-1/3 truncate text-right">28 STAGES &bull; 22 LAWS &bull; 200+ TOOLS</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
