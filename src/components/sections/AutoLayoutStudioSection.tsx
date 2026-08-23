import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout, Sliders, ToggleLeft, ToggleRight, Check, Copy, Sparkles, Box, ArrowRight, Layers, Smartphone, RefreshCw } from 'lucide-react';
import { sounds } from '../../utils/audio';

export const AutoLayoutStudioSection: React.FC = () => {
  // Auto Layout Props
  const [direction, setDirection] = useState<'row' | 'col' | 'wrap'>('row');
  const [alignment, setAlignment] = useState<'start' | 'center' | 'end' | 'between'>('center');
  const [gap, setGap] = useState(16);
  const [paddingX, setPaddingX] = useState(24);
  const [paddingY, setPaddingY] = useState(24);
  const [sizingMode, setSizingMode] = useState<'hug' | 'fill' | 'fixed'>('hug');

  // Boolean Component Variables
  const [hasIcon, setHasIcon] = useState(true);
  const [hasBadge, setHasBadge] = useState(true);
  const [hasSubtitle, setHasSubtitle] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [variant, setVariant] = useState<'editorial' | 'solid' | 'outline'>('editorial');
  const [itemCount, setItemCount] = useState(3);
  const [copiedTokens, setCopiedTokens] = useState(false);

  const getAlignClass = () => {
    switch (alignment) {
      case 'start': return 'justify-start items-start';
      case 'center': return 'justify-center items-center';
      case 'end': return 'justify-end items-end';
      case 'between': return 'justify-between items-center';
    }
  };

  const getFlexDirection = () => {
    switch (direction) {
      case 'row': return 'flex-row';
      case 'col': return 'flex-col';
      case 'wrap': return 'flex-row flex-wrap';
    }
  };

  const handleCopyConfig = () => {
    sounds.playChime();
    const config = `// SABI KIT AUTO-LAYOUT & VARIABLE SPEC:
const layoutSpec = {
  direction: "${direction}",
  alignment: "${alignment}",
  gap: "${gap}px",
  padding: "${paddingY}px ${paddingX}px",
  sizing: "${sizingMode}",
  booleans: {
    hasIcon: ${hasIcon},
    hasBadge: ${hasBadge},
    hasSubtitle: ${hasSubtitle},
    isLoading: ${isLoading},
    isDisabled: ${isDisabled},
    variant: "${variant}"
  }
};`;
    navigator.clipboard.writeText(config);
    setCopiedTokens(true);
    setTimeout(() => setCopiedTokens(false), 2000);
  };

  return (
    <section id="auto-layout" className="px-4 sm:px-8 lg:px-12 2xl:px-20 max-w-[1780px] mx-auto w-full text-[#111111] relative">
      <div className="w-full">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b-2 border-[#0a0a0a]/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="h-7 w-7 rounded-full bg-[#1a1a1a] text-white font-mono font-bold text-xs flex items-center justify-center">
              AL
            </span>
            <span className="font-main font-bold uppercase tracking-wider text-xs text-[#111111]">
              AUTO-LAYOUT, VARIABLES & BOOLEAN STUDIO
            </span>
          </div>
          <span className="font-mono text-xs text-[#6b6b6b]">SABI OS V1.0 • ATOMIC COMPONENT ENGINE</span>
        </div>

        <div className="mt-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl sm:text-5xl font-main tracking-tight leading-[1.1]">
              <span className="voral-headline-1">Auto-Layout & Boolean Studio</span>
              <span className="voral-headline-2">with Dynamic Reflow Physics.</span>
            </h2>
            <p className="mt-3 text-base text-[#6b6b6b] leading-relaxed max-w-2xl">
              Inspect how Figma auto-layout properties (Direction, Alignment, Hug vs Fill) and React boolean variables dynamically control layout behavior in real time.
            </p>
          </div>

          <button
            onClick={handleCopyConfig}
            className="voral-btn-pill shrink-0"
          >
            {copiedTokens ? <Check className="h-4 w-4 text-emerald-300" /> : <Copy className="h-4 w-4" />}
            <span>{copiedTokens ? 'Config Copied!' : 'Copy Auto-Layout JSON'}</span>
          </button>
        </div>

        {/* 2 Column Interactive Studio */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Live Auto-Layout Canvas */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#0a0a0a] shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#0a0a0a]/10 pb-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#111111]">
                  INTERACTIVE AUTO-LAYOUT CONTAINER
                </span>
              </div>
              <span className="font-mono text-xs text-[#6b6b6b]">
                {sizingMode === 'hug' ? 'Hug Content' : sizingMode === 'fill' ? 'Fill (100%)' : 'Fixed (420px)'}
              </span>
            </div>

            {/* Canvas Viewport */}
            <div className="min-h-[380px] bg-[#ECEAE6] rounded-2xl p-4 border border-[#0a0a0a]/15 flex items-center justify-center overflow-hidden">
              <motion.div
                layout
                transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                style={{
                  paddingTop: `${paddingY}px`,
                  paddingBottom: `${paddingY}px`,
                  paddingLeft: `${paddingX}px`,
                  paddingRight: `${paddingX}px`,
                  gap: `${gap}px`,
                }}
                className={`bg-white rounded-3xl border-2 border-[#0a0a0a] shadow-lg flex transition-all duration-200 ${getFlexDirection()} ${getAlignClass()} ${
                  sizingMode === 'hug' ? 'w-auto' : sizingMode === 'fill' ? 'w-full' : 'w-[380px]'
                }`}
              >
                {Array.from({ length: itemCount }).map((_, idx) => (
                  <motion.div
                    key={idx}
                    layout
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    className={`p-4 rounded-2xl border transition-all ${
                      variant === 'editorial'
                        ? 'bg-[#F4F3F1] border-[#0a0a0a]/20 text-[#111111]'
                        : variant === 'solid'
                        ? 'bg-[#1a1a1a] border-black text-white'
                        : 'bg-white border-[#0a0a0a] text-[#111111]'
                    } ${isDisabled ? 'opacity-40 cursor-not-allowed' : 'hover:scale-105'}`}
                  >
                    {/* Top Row: Icon + Badge */}
                    <div className="flex items-center justify-between gap-3 mb-2">
                      {hasIcon && (
                        <span className={`h-6 w-6 rounded-lg flex items-center justify-center ${
                          variant === 'solid' ? 'bg-white/20 text-white' : 'bg-[#1a1a1a] text-white'
                        }`}>
                          <Sparkles className="h-3 w-3" />
                        </span>
                      )}

                      {hasBadge && (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-emerald-100 text-emerald-800">
                          PROPS 0{idx + 1}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <div className="space-y-0.5">
                      <h5 className="font-main font-bold text-xs">
                        Component Node {idx + 1}
                      </h5>
                      {hasSubtitle && (
                        <p className={`text-[10px] ${variant === 'solid' ? 'text-white/70' : 'text-[#6b6b6b]'}`}>
                          Reflows with dynamic auto-layout constraints.
                        </p>
                      )}
                    </div>

                    {/* Loading simulation */}
                    {isLoading && (
                      <div className="mt-2 pt-2 border-t border-current/10 flex items-center gap-1 text-[9px] font-mono animate-pulse">
                        <RefreshCw className="h-3 w-3 animate-spin" />
                        <span>Syncing variable...</span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Bottom Telemetry */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#6b6b6b]">
              <span>Gap: {gap}px • Padding: {paddingY}px/{paddingX}px</span>
              <span className="text-[#111111] font-bold">Direction: {direction.toUpperCase()}</span>
            </div>
          </div>

          {/* Right Column: Interactive Controls & Boolean Matrix */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#0a0a0a] shadow-xl space-y-6">
            
            {/* 1. Layout Direction & Alignment */}
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#6b6b6b] block">
                01 AUTO-LAYOUT DIRECTION & SIZING
              </span>

              {/* Direction Switcher */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'row' as const, label: 'Horizontal →' },
                  { id: 'col' as const, label: 'Vertical ↓' },
                  { id: 'wrap' as const, label: 'Wrap ⤶' }
                ].map((d) => (
                  <button
                    key={d.id}
                    onClick={() => {
                      sounds.playClick();
                      setDirection(d.id);
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-main font-bold border transition-all ${
                      direction === d.id ? 'bg-[#1a1a1a] text-white border-[#0a0a0a]' : 'bg-[#F4F3F1] text-[#111111] border-[#0a0a0a]/10'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>

              {/* Sizing Mode (Hug / Fill / Fixed) */}
              <div className="grid grid-cols-3 gap-2 pt-1">
                {(['hug', 'fill', 'fixed'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => {
                      sounds.playClick();
                      setSizingMode(mode);
                    }}
                    className={`py-1.5 px-2.5 rounded-xl text-xs font-mono capitalize transition-all border ${
                      sizingMode === mode ? 'bg-[#1a1a1a] text-white font-bold border-[#0a0a0a]' : 'bg-[#F4F3F1] text-[#6b6b6b] border-[#0a0a0a]/10'
                    }`}
                  >
                    {mode === 'hug' ? 'Hug' : mode === 'fill' ? 'Fill' : 'Fixed'}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Gap & Padding Sliders */}
            <div className="space-y-4 pt-4 border-t border-[#0a0a0a]/10">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#6b6b6b] block">
                02 SPACING & PADDING RULER
              </span>

              {/* Gap Slider */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-1">
                  <span className="text-[#111111] font-bold">Item Gap</span>
                  <span className="text-emerald-700 font-bold">{gap}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="48"
                  step="4"
                  value={gap}
                  onChange={(e) => {
                    sounds.playClick();
                    setGap(Number(e.target.value));
                  }}
                  className="w-full h-1.5 bg-[#F4F3F1] rounded-lg appearance-none cursor-pointer accent-[#1a1a1a]"
                />
              </div>

              {/* Padding X Slider */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-1">
                  <span className="text-[#111111] font-bold">Padding X & Y</span>
                  <span className="text-emerald-700 font-bold">{paddingX}px / {paddingY}px</span>
                </div>
                <input
                  type="range"
                  min="8"
                  max="48"
                  step="4"
                  value={paddingX}
                  onChange={(e) => {
                    sounds.playClick();
                    setPaddingX(Number(e.target.value));
                    setPaddingY(Number(e.target.value));
                  }}
                  className="w-full h-1.5 bg-[#F4F3F1] rounded-lg appearance-none cursor-pointer accent-[#1a1a1a]"
                />
              </div>
            </div>

            {/* 3. Boolean Component Variables */}
            <div className="space-y-3 pt-4 border-t border-[#0a0a0a]/10">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#6b6b6b] block">
                03 BOOLEAN COMPONENT VARIABLES
              </span>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'hasIcon', val: hasIcon, set: setHasIcon },
                  { label: 'hasBadge', val: hasBadge, set: setHasBadge },
                  { label: 'hasSubtitle', val: hasSubtitle, set: setHasSubtitle },
                  { label: 'isLoading', val: isLoading, set: setIsLoading },
                  { label: 'isDisabled', val: isDisabled, set: setIsDisabled },
                ].map((b) => (
                  <button
                    key={b.label}
                    onClick={() => {
                      sounds.playPop();
                      b.set(!b.val);
                    }}
                    className={`p-2.5 rounded-xl border text-xs font-mono flex items-center justify-between transition-all ${
                      b.val ? 'bg-[#1a1a1a] text-white border-black font-bold' : 'bg-[#F4F3F1] text-[#6b6b6b] border-[#0a0a0a]/10'
                    }`}
                  >
                    <span>{b.label}</span>
                    {b.val ? <ToggleRight className="h-4 w-4 text-emerald-400" /> : <ToggleLeft className="h-4 w-4" />}
                  </button>
                ))}

                {/* Add/Remove Item Node */}
                <button
                  onClick={() => {
                    sounds.playClick();
                    setItemCount(itemCount >= 5 ? 1 : itemCount + 1);
                  }}
                  className="p-2.5 rounded-xl border border-[#0a0a0a]/15 bg-[#F4F3F1] text-xs font-mono font-bold text-[#111111] flex items-center justify-between"
                >
                  <span>Item Count</span>
                  <span className="h-5 w-5 rounded-full bg-[#111111] text-white text-[10px] flex items-center justify-center">
                    {itemCount}
                  </span>
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
