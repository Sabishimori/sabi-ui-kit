import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronDown, ChevronUp, Lightbulb, Compass, BookOpen } from 'lucide-react';
import { sounds } from '../../utils/audio';

interface LearnerCardProps {
  title: string;
  concept: string;
  example: string;
  emoji: string;
  slideNumber?: string;
  forceOpen?: boolean;
}

export const LearnerCard: React.FC<LearnerCardProps> = ({
  title,
  concept,
  example,
  emoji,
  slideNumber,
  forceOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(forceOpen);

  const toggle = () => {
    sounds.playPop();
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full bg-white border-2 border-[#0a0a0a] rounded-3xl overflow-hidden shadow-lg transition-all duration-300">
      {/* Clickable Header */}
      <button
        onClick={toggle}
        className="w-full p-5 flex items-center justify-between gap-4 text-left transition-colors hover:bg-[#F4F3F1]/80"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-[#1a1a1a] text-white flex items-center justify-center text-lg shadow-sm">
            {emoji}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#6b6b6b]">
                KID & BEGINNER LEARNER GUIDE
              </span>
              {slideNumber && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#F4F3F1] border border-[#0a0a0a]/10 text-[#111111] font-bold">
                  SLIDE {slideNumber}
                </span>
              )}
            </div>
            <h4 className="font-main font-bold text-sm sm:text-base text-[#111111] mt-0.5">
              {title}
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-main font-semibold text-[#111111] bg-[#F4F3F1] border border-[#0a0a0a]/10 px-3 py-1.5 rounded-full">
          <span>{isOpen ? 'Close Explainer' : 'Read Plain English'}</span>
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>
      </button>

      {/* Expandable Body */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-2 border-t border-[#0a0a0a]/10 bg-[#F4F3F1]/50 space-y-4">
              {/* Concept Paragraph */}
              <div className="space-y-1">
                <span className="text-[11px] font-mono font-bold uppercase text-[#6b6b6b] tracking-wider block">
                  WHAT DOES THIS ACTUALLY MEAN?
                </span>
                <p className="text-sm text-[#111111] leading-relaxed font-normal">
                  {concept}
                </p>
              </div>

              {/* Real World Analogy Box */}
              <div className="p-4 rounded-2xl bg-white border border-[#0a0a0a]/15 shadow-sm space-y-1.5">
                <div className="flex items-center gap-2 text-amber-800 text-xs font-mono font-bold uppercase">
                  <Lightbulb className="h-3.5 w-3.5 text-amber-600" />
                  <span>Imagine This In Real Life:</span>
                </div>
                <p className="text-xs sm:text-sm text-[#111111]/90 leading-relaxed italic">
                  "{example}"
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
