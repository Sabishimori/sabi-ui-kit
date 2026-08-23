import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, BookOpen, Layers, ArrowLeft } from 'lucide-react';
import { ALL_SLIDES } from '../../data/slidesData';
import { sounds } from '../../utils/audio';

interface PresentationDeckModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSlideIndex?: number;
}

export const PresentationDeckModal: React.FC<PresentationDeckModalProps> = ({
  isOpen,
  onClose,
  initialSlideIndex = 0,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialSlideIndex);
  const [showNotes, setShowNotes] = useState(true);

  useEffect(() => {
    if (initialSlideIndex >= 0 && initialSlideIndex < ALL_SLIDES.length) {
      setCurrentIndex(initialSlideIndex);
    }
  }, [initialSlideIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        e.preventDefault();
        next();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prev();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex]);

  if (!isOpen) return null;

  const currentSlide = ALL_SLIDES[currentIndex];

  const next = () => {
    sounds.playClick(700);
    setCurrentIndex((prev) => (prev === ALL_SLIDES.length - 1 ? 0 : prev + 1));
  };

  const prev = () => {
    sounds.playClick(600);
    setCurrentIndex((prev) => (prev === 0 ? ALL_SLIDES.length - 1 : prev - 1));
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#F4F3F1] text-[#111111] flex flex-col justify-between overflow-hidden select-none border-2 border-[#0a0a0a]">
      {/* Top Deck Bar */}
      <div className="px-6 py-4 bg-white border-b-2 border-[#0a0a0a] flex items-center justify-between gap-4 z-20 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="w-10 h-10 rounded-full bg-[#1a1a1a] text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all"
            title="Exit Deck Mode (Esc)"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#111111] uppercase tracking-widest">
                VORAL / CLIENT PRESENTATION DECK
              </span>
              <span className="text-xs text-[#8a8a8a]">•</span>
              <span className="text-xs text-[#6b6b6b] font-mono">
                Slide {currentSlide.number} of {ALL_SLIDES.length - 1}
              </span>
            </div>
            <h3 className="font-main font-bold text-sm text-[#111111] truncate max-w-md">
              {currentSlide.title}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-main font-semibold transition-all border ${
              showNotes ? 'bg-[#1a1a1a] text-white border-[#0a0a0a]' : 'bg-[#F4F3F1] text-[#111111] border-[#0a0a0a]/15 hover:bg-[#ECEAE6]'
            }`}
          >
            <BookOpen className="h-3.5 w-3.5 inline mr-1" />
            <span>{showNotes ? 'Hide Briefing Notes' : 'Show Briefing Notes'}</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="p-2 rounded-full border border-[#0a0a0a]/15 bg-[#F4F3F1] hover:bg-[#ECEAE6] text-[#111111] transition-colors"
            title="Exit Presentation Deck (Esc)"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Main Slide Viewer */}
      <div className="flex-1 relative flex items-center justify-center p-4 sm:p-8 overflow-hidden bg-[#F4F3F1]">
        <div className="max-w-6xl w-full h-full flex flex-col lg:flex-row gap-6 items-center justify-center relative z-10">
          {/* Slide High-Res Image Canvas */}
          <div className="flex-1 w-full h-full max-h-[70vh] flex items-center justify-center rounded-3xl overflow-hidden bg-white border-2 border-[#0a0a0a] shadow-2xl p-2 relative group">
            <img
              src={currentSlide.pngPath}
              alt={currentSlide.title}
              className="max-h-full max-w-full object-contain rounded-2xl"
            />
            <div className="absolute top-4 left-4 bg-[#1a1a1a] px-3 py-1 rounded-full text-xs font-mono text-white border border-white/10 font-bold shadow-md">
              SLIDE {currentSlide.number} • {currentSlide.category}
            </div>
          </div>

          {/* Right Briefing Notes */}
          {showNotes && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full lg:w-96 bg-white border-2 border-[#0a0a0a] rounded-3xl p-6 shadow-2xl space-y-4 max-h-[70vh] overflow-y-auto"
            >
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#6b6b6b] block">
                  CLIENT BRIEFING FOCUS
                </span>
                <h4 className="font-main font-bold text-lg text-[#111111] mt-1">
                  {currentSlide.title}
                </h4>
                {currentSlide.subtitle && (
                  <p className="text-xs text-[#6b6b6b] font-medium mt-0.5">
                    {currentSlide.subtitle}
                  </p>
                )}
                <p className="text-xs text-[#111111]/80 leading-relaxed mt-2 font-normal">
                  {currentSlide.description}
                </p>
              </div>

              {/* Plain English Analogy */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                <div className="flex items-center gap-2 mb-1 text-amber-900 font-main font-bold text-xs">
                  <span>{currentSlide.kidAnalogy.emoji}</span>
                  <span>{currentSlide.kidAnalogy.title}</span>
                </div>
                <p className="text-xs text-amber-950 leading-relaxed">
                  {currentSlide.kidAnalogy.concept}
                </p>
                <div className="mt-2 pt-2 border-t border-amber-200 text-[11px] text-amber-900/80 italic">
                  💡 <strong>Example:</strong> {currentSlide.kidAnalogy.example}
                </div>
              </div>

              {/* Key Stakeholder Question */}
              <div className="p-3.5 rounded-2xl bg-[#F4F3F1] border border-[#0a0a0a]/10 text-xs">
                <span className="text-[10px] font-mono text-[#111111] uppercase font-bold block mb-1">
                  Client Discussion Prompt
                </span>
                <p className="text-[#6b6b6b] text-[11px]">
                  "How does this phase align with your team's upcoming product sprint and quarterly KPIs?"
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Floating Prev / Next Controls */}
        <button
          onClick={prev}
          className="absolute left-6 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white hover:bg-[#1a1a1a] hover:text-white border-2 border-[#0a0a0a] text-[#111111] flex items-center justify-center transition-all shadow-xl hover:scale-110 active:scale-95"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <button
          onClick={next}
          className="absolute right-6 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white hover:bg-[#1a1a1a] hover:text-white border-2 border-[#0a0a0a] text-[#111111] flex items-center justify-center transition-all shadow-xl hover:scale-110 active:scale-95"
          aria-label="Next Slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Bottom Thumbnail Strip */}
      <div className="px-6 py-3 bg-white border-t-2 border-[#0a0a0a] flex items-center gap-3 overflow-x-auto z-20">
        <div className="flex items-center gap-2 min-w-max">
          {ALL_SLIDES.map((slide, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={slide.id}
                onClick={() => {
                  sounds.playClick(600 + idx * 10);
                  setCurrentIndex(idx);
                }}
                className={`relative rounded-xl overflow-hidden transition-all duration-200 border-2 ${
                  isActive
                    ? 'border-[#0a0a0a] ring-2 ring-[#0a0a0a] scale-110 z-10'
                    : 'border-[#0a0a0a]/20 opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={slide.pngPath}
                  alt={slide.title}
                  className="h-10 w-16 object-cover bg-[#F4F3F1]"
                />
                <div className="absolute bottom-0 inset-x-0 bg-[#1a1a1a] text-[8px] font-mono text-center text-white py-0.5">
                  {slide.number}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
