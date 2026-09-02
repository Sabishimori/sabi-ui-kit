import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedLogo } from './AnimatedLogo';
import { sounds } from '../../utils/audio';

interface LoadingScreenProps {
  onComplete?: () => void;
  minDurationMs?: number;
}

const BOOT_STAGES = [
  { threshold: 0, text: 'INITIALIZING RUNTIME KERNEL & 8PT SPATIAL MATRIX...' },
  { threshold: 24, text: 'COMPILING 28-STAGE BLUEPRINT & DESIGN TOKENS...' },
  { threshold: 52, text: 'CALIBRATING 22 LAWS OF UX & COGNITIVE HEURISTICS...' },
  { threshold: 78, text: 'HYDRATING DESIGN VAULT & CURATED STUDIO REGISTRY...' },
  { threshold: 96, text: 'ALL MODULES VERIFIED // SABI OS KIT READY' },
];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onComplete,
  minDurationMs = 1800,
}) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  // Live IST Bangalore time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setCurrentTime(`${timeStr} IST`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

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
    }, 650);
  }, [onComplete]);

  // Smooth realistic progress counter
  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawPct = Math.min(100, Math.floor((elapsed / minDurationMs) * 100));

      // Non-linear organic acceleration curve
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          finishLoading();
          return 100;
        }
        const next = Math.max(prev + Math.floor(Math.random() * 3 + 1), rawPct);
        if (next >= 100) {
          clearInterval(interval);
          finishLoading();
          return 100;
        }
        return next;
      });
    }, 30);

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

  const currentStatus = [...BOOT_STAGES].reverse().find((s) => progress >= s.threshold)?.text || BOOT_STAGES[0].text;

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            y: '-100%',
            opacity: 0.95,
            transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
          }}
          className="fixed inset-0 z-[999999] bg-[#0a0a0a] text-white flex flex-col justify-between p-6 sm:p-10 lg:p-12 select-none overflow-hidden font-mono"
        >
          {/* Halftone dot background matrix */}
          <div className="absolute inset-0 halftone-dot-pattern opacity-15 pointer-events-none" />

          {/* Top Telemetry Header */}
          <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4 text-xs">
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <span className="font-bold tracking-wider text-white">SABI OS V1.0</span>
              <span className="text-white/40 hidden sm:inline">&bull;</span>
              <span className="text-white/60 hidden sm:inline">BOOT PROTOCOL</span>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <span className="text-white/70 hidden md:inline">{currentTime}</span>
              <button
                onClick={() => {
                  setProgress(100);
                  finishLoading();
                }}
                className="px-2.5 py-1 rounded-full border border-white/20 text-[10px] sm:text-xs text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                SKIP [ESC]
              </button>
            </div>
          </div>

          {/* Center Brand & Progress Sequence */}
          <div className="relative z-10 max-w-xl w-full mx-auto my-auto space-y-8 py-8">
            {/* Animated Logo & Identity */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="relative">
                <AnimatedLogo size={72} rounded border className="shadow-2xl shadow-emerald-500/10" />
                <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full bg-emerald-400 border-2 border-[#0a0a0a]" />
              </div>

              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl font-main font-black tracking-tight text-white">
                  Sabi OS Kit
                </h1>
                <p className="text-xs text-white/60 font-sans tracking-wide">
                  The Complete Production Design System & Workspace
                </p>
              </div>
            </div>

            {/* Giant Dynamic Percentage Counter */}
            <div className="text-center space-y-2">
              <div className="text-6xl sm:text-7xl font-mono font-black tracking-tight text-white">
                {String(progress).padStart(3, '0')}
                <span className="text-emerald-400 text-3xl sm:text-4xl ml-1 font-normal">%</span>
              </div>

              {/* Status Boot Message */}
              <div className="h-6 flex items-center justify-center">
                <p className="text-xs font-mono text-emerald-400/90 tracking-wider truncate">
                  {currentStatus}
                </p>
              </div>
            </div>

            {/* Precision 8pt Progress Bar */}
            <div className="space-y-2">
              <div className="w-full h-2 rounded-full bg-white/10 border border-white/15 overflow-hidden p-0.5">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-teal-300 to-white"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut', duration: 0.1 }}
                />
              </div>

              {/* Metric Markers */}
              <div className="flex justify-between text-[10px] text-white/40 font-mono">
                <span>00</span>
                <span>28 STAGES</span>
                <span>22 LAWS</span>
                <span>200+ TOOLS</span>
                <span>100</span>
              </div>
            </div>
          </div>

          {/* Bottom Telemetry Bar */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-white/10 pt-4 text-[11px] text-white/50">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
              <span>WCAG AAA &bull; 8-POINT SPATIAL HARMONY</span>
            </div>
            <span>SABI UI KIT &bull; ALL SYSTEMS OPERATIONAL</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
