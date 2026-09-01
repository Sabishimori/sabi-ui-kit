import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Ruler, Check, Copy, Sliders, Layers, Sparkles, Move, Eye, EyeOff, Grid } from 'lucide-react';
import { sounds } from '../../utils/audio';

const SPACING_TOKENS = [
  { token: 'space-0', px: 0, rem: '0rem', use: 'Reset / Flush boundary' },
  { token: 'space-1', px: 4, rem: '0.25rem', use: 'Micro-gaps, icon margins, pill tags' },
  { token: 'space-2', px: 8, rem: '0.5rem', use: 'Base unit, button padding Y, tight lists' },
  { token: 'space-3', px: 12, rem: '0.75rem', use: 'Input padding Y, compact card gaps' },
  { token: 'space-4', px: 16, rem: '1.0rem', use: 'Standard component padding, card gaps' },
  { token: 'space-6', px: 24, rem: '1.5rem', use: 'Medium card padding, bento container gaps' },
  { token: 'space-8', px: 32, rem: '2.0rem', use: 'Large section margins, modal padding' },
  { token: 'space-12', px: 48, rem: '3.0rem', use: 'Section vertical flow, viewport margins' },
  { token: 'space-16', px: 64, rem: '4.0rem', use: 'Major chapter separation, hero margins' },
  { token: 'space-24', px: 96, rem: '6.0rem', use: 'Page boundary padding, closing sections' },
];

export const SpatialSystemSection: React.FC = () => {
  const [densityMode, setDensityMode] = useState<'compact' | 'balanced' | 'spacious'>('balanced');
  const [showRulers, setShowRulers] = useState(true);
  const [showGridOverlay, setShowGridOverlay] = useState(true);
  const [copiedTokens, setCopiedTokens] = useState(false);
  const [hoveredBox, setHoveredBox] = useState<string | null>(null);
  const [selectedTokenPreview, setSelectedTokenPreview] = useState<number | null>(null);

  const getDensityValues = () => {
    switch (densityMode) {
      case 'compact':
        return { 
          containerPadPx: 16,
          cardPadPx: 12,
          gridGapPx: 8,
          btnGapPx: 6,
          label: 'Compact / High Density (4px / 8px)' 
        };
      case 'balanced':
        return { 
          containerPadPx: 24,
          cardPadPx: 16,
          gridGapPx: 16,
          btnGapPx: 8,
          label: 'Balanced / Standard SaaS (8px / 16px)' 
        };
      case 'spacious':
        return { 
          containerPadPx: 32,
          cardPadPx: 24,
          gridGapPx: 24,
          btnGapPx: 12,
          label: 'Spacious / Luxury & Editorial (16px / 32px)' 
        };
    }
  };

  const density = getDensityValues();

  const handleCopySpacingSpec = () => {
    sounds.playChime();
    const spec = `// 8PT HARMONIC SPATIAL TOKENS:
export const spacing = {
  0: "0px",
  1: "4px",   // 0.25rem
  2: "8px",   // 0.50rem (Base unit)
  3: "12px",  // 0.75rem
  4: "16px",  // 1.00rem (2x)
  6: "24px",  // 1.50rem (3x)
  8: "32px",  // 2.00rem (4x)
  12: "48px", // 3.00rem (6x)
  16: "64px", // 4.00rem (8x)
  24: "96px", // 6.00rem (12x)
};`;
    navigator.clipboard.writeText(spec);
    setCopiedTokens(true);
    setTimeout(() => setCopiedTokens(false), 2000);
  };

  return (
    <section id="spatial-system" className="px-4 sm:px-8 lg:px-12 2xl:px-20 max-w-[1780px] mx-auto w-full text-[#111111] relative">
      <div className="w-full">
        {/* Top Header Row */}
        <div className="flex items-center justify-between gap-4 border-b-2 border-[#0a0a0a]/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="h-7 w-7 rounded-full bg-[#1a1a1a] text-white font-mono font-bold text-xs flex items-center justify-center">
              19
            </span>
            <span className="font-main font-bold uppercase tracking-wider text-xs text-[#111111]">
              8-POINT SPATIAL HARMONY & DENSITY ARCHITECTURE
            </span>
          </div>
          <span className="font-mono text-xs text-[#6b6b6b]">SABI OS V1.0 • MATHEMATICAL RHYTHM</span>
        </div>

        {/* Headline & Description */}
        <div className="mt-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl sm:text-5xl font-main tracking-tight leading-[1.1]">
              <span className="voral-headline-1">Spacing Systems & Density</span>
              <span className="voral-headline-2">with Live 8pt Box-Model Overlays.</span>
            </h2>
            <p className="mt-3 text-base text-[#6b6b6b] leading-relaxed max-w-2xl">
              Eliminate arbitrary pixel values. Every margin, padding zone, and component gap is visually exposed with live bounding boxes, measurement redlines, and 8-point harmonic alignment.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Toggle Overlays */}
            <button
              onClick={() => {
                sounds.playClick();
                setShowRulers(!showRulers);
              }}
              className={`px-4 py-2 rounded-full text-xs font-main font-bold border transition-all flex items-center gap-1.5 ${
                showRulers 
                  ? 'bg-purple-900 text-white border-purple-950 shadow-sm' 
                  : 'bg-white text-[#111111] border-[#0a0a0a]/15 hover:bg-[#ECEAE6]'
              }`}
            >
              {showRulers ? <Eye className="h-3.5 w-3.5 text-purple-300" /> : <EyeOff className="h-3.5 w-3.5 text-[#666666]" />}
              <span>{showRulers ? 'Box-Model Overlays: ON' : 'Overlays: OFF'}</span>
            </button>

            {/* Toggle 8pt Dot Matrix Grid */}
            <button
              onClick={() => {
                sounds.playClick();
                setShowGridOverlay(!showGridOverlay);
              }}
              className={`px-4 py-2 rounded-full text-xs font-main font-bold border transition-all flex items-center gap-1.5 ${
                showGridOverlay 
                  ? 'bg-[#1a1a1a] text-white border-[#0a0a0a] shadow-sm' 
                  : 'bg-white text-[#111111] border-[#0a0a0a]/15 hover:bg-[#ECEAE6]'
              }`}
            >
              <Grid className="h-3.5 w-3.5" />
              <span>{showGridOverlay ? '8pt Grid: ON' : '8pt Grid: OFF'}</span>
            </button>

            {/* Copy Spec */}
            <button
              onClick={handleCopySpacingSpec}
              className="voral-btn-pill shrink-0"
            >
              {copiedTokens ? <Check className="h-4 w-4 text-emerald-300" /> : <Copy className="h-4 w-4" />}
              <span>{copiedTokens ? 'Tokens Copied!' : 'Copy 8pt Tokens'}</span>
            </button>
          </div>
        </div>

        {/* Density Mode Switcher Bar */}
        <div className="mt-8 p-3 sm:p-4 rounded-2xl bg-white border-2 border-[#0a0a0a] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-mono text-[#111111] font-bold">
            <Box className="h-4 w-4 text-[#366299]" />
            <span>Active Content Density Mode:</span>
            <span className="text-purple-700 font-bold bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
              {density.label}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'compact' as const, label: 'Compact (DevTools/Fintech)' },
              { id: 'balanced' as const, label: 'Balanced (Standard SaaS)' },
              { id: 'spacious' as const, label: 'Spacious (Luxury/Editorial)' }
            ].map((d) => (
              <button
                key={d.id}
                onClick={() => {
                  sounds.playClick();
                  setDensityMode(d.id);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-main font-bold transition-all border ${
                  densityMode === d.id
                    ? 'bg-[#1a1a1a] text-white border-[#0a0a0a] shadow-md scale-[1.02]'
                    : 'bg-[#F4F3F1] text-[#666666] border-[#0a0a0a]/10 hover:text-[#111111] hover:bg-[#ECEAE6]'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Layout Specimen & Registry */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Interactive Layout Specimen with Rich Figma Box-Model Visualizer */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#0a0a0a] shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div>
              {/* Specimen Header & Legend */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#0a0a0a]/10 pb-3 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#111111]">
                    LIVE HARMONIC SPECIMEN
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-mono font-bold">
                    Interactive
                  </span>
                </div>

                {/* Inspect Color Legend */}
                {showRulers && (
                  <div className="flex items-center gap-3 text-[11px] font-mono">
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded bg-purple-500/40 border border-purple-600 inline-block" />
                      <span className="text-purple-900 font-bold">Padding</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded bg-blue-500/40 border border-blue-600 inline-block" />
                      <span className="text-blue-900 font-bold">Gap</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded bg-amber-500/40 border border-amber-600 inline-block" />
                      <span className="text-amber-900 font-bold">Margin</span>
                    </span>
                  </div>
                )}
              </div>

              {/* Dynamic Density Card Container with Visible Box-Model Overlays */}
              <div className="relative p-2 rounded-2xl bg-[#ECEAE6]/60 border border-[#0a0a0a]/15">
                
                {/* Visual Margin Callout */}
                {showRulers && (
                  <div className="absolute -top-3 left-4 px-2 py-0.5 bg-amber-600 text-white rounded text-[10px] font-mono font-bold shadow-sm z-20 flex items-center gap-1">
                    <span>Margin: 8px</span>
                  </div>
                )}

                <motion.div
                  layout
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  style={{ padding: `${density.containerPadPx}px` }}
                  className={`rounded-xl border-2 border-[#0a0a0a] relative overflow-hidden transition-all duration-300 ${
                    showRulers 
                      ? 'bg-purple-500/10 shadow-[inset_0_0_0_1px_rgba(147,51,234,0.4)]' 
                      : 'bg-[#F4F3F1]'
                  } ${showGridOverlay ? 'halftone-dot-pattern' : ''}`}
                  onMouseEnter={() => setHoveredBox('container')}
                  onMouseLeave={() => setHoveredBox(null)}
                >
                  {/* Container Padding Measurement Label */}
                  {showRulers && (
                    <div className="absolute top-2 right-2 px-2 py-0.5 bg-purple-700 text-white rounded text-[10px] font-mono font-bold shadow-sm z-20 flex items-center gap-1">
                      <Ruler className="h-3 w-3" />
                      <span>Container Padding: {density.containerPadPx}px</span>
                    </div>
                  )}

                  {/* Inner Content Stack */}
                  <div className="space-y-4 relative z-10">
                    
                    {/* Header Row */}
                    <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-[#0a0a0a]/10 shadow-xs relative">
                      <div className="flex items-center gap-3">
                        <span className="h-9 w-9 rounded-xl bg-[#111111] text-white flex items-center justify-center font-mono text-xs font-bold shrink-0">
                          8pt
                        </span>
                        <div>
                          <h4 className="font-main font-bold text-sm text-[#111111]">
                            Financial Growth Portfolio
                          </h4>
                          <span className="text-[11px] font-mono text-[#666666]">
                            Active Asset Governance &bull; 8pt Rhythm
                          </span>
                        </div>
                      </div>

                      <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-mono font-bold">
                        +42.8% ROI
                      </span>
                    </div>

                    {/* Gap Indicator Bar (Visual gap highlight between rows) */}
                    {showRulers && (
                      <div 
                        style={{ height: `${density.gridGapPx}px` }}
                        className="w-full bg-blue-500/25 border border-dashed border-blue-500/60 rounded flex items-center justify-center text-[9px] font-mono text-blue-900 font-bold"
                      >
                        Gap: {density.gridGapPx}px
                      </div>
                    )}

                    {/* Sub-grid with Dynamic Measured Gaps & Padding */}
                    <div 
                      style={{ gap: `${density.gridGapPx}px` }}
                      className="grid grid-cols-2"
                    >
                      {/* Metric Card 1 */}
                      <div
                        style={{ padding: `${density.cardPadPx}px` }}
                        className={`rounded-xl border relative transition-all duration-200 ${
                          showRulers
                            ? 'bg-purple-500/10 border-purple-500/40 shadow-xs'
                            : 'bg-white border-[#0a0a0a]/10'
                        }`}
                        onMouseEnter={() => setHoveredBox('metric-1')}
                        onMouseLeave={() => setHoveredBox(null)}
                      >
                        {showRulers && (
                          <span className="absolute -top-2.5 right-2 px-1.5 py-0.2 rounded bg-purple-600 text-white text-[9px] font-mono font-bold z-10">
                            Pad: {density.cardPadPx}px
                          </span>
                        )}
                        <div className="bg-white p-2.5 rounded-lg border border-[#0a0a0a]/5">
                          <span className="text-[10px] font-mono text-[#8a8a8a] uppercase font-bold block">EQUITY CAP</span>
                          <div className="font-mono text-lg font-black text-[#111111] mt-0.5">$840,250</div>
                        </div>
                      </div>

                      {/* Metric Card 2 */}
                      <div
                        style={{ padding: `${density.cardPadPx}px` }}
                        className={`rounded-xl border relative transition-all duration-200 ${
                          showRulers
                            ? 'bg-purple-500/10 border-purple-500/40 shadow-xs'
                            : 'bg-white border-[#0a0a0a]/10'
                        }`}
                        onMouseEnter={() => setHoveredBox('metric-2')}
                        onMouseLeave={() => setHoveredBox(null)}
                      >
                        {showRulers && (
                          <span className="absolute -top-2.5 right-2 px-1.5 py-0.2 rounded bg-purple-600 text-white text-[9px] font-mono font-bold z-10">
                            Pad: {density.cardPadPx}px
                          </span>
                        )}
                        <div className="bg-white p-2.5 rounded-lg border border-[#0a0a0a]/5">
                          <span className="text-[10px] font-mono text-[#8a8a8a] uppercase font-bold block">RUNWAY</span>
                          <div className="font-mono text-lg font-black text-emerald-700 mt-0.5">38 Months</div>
                        </div>
                      </div>
                    </div>

                    {/* Gap Indicator Bar (Visual gap highlight before actions) */}
                    {showRulers && (
                      <div 
                        style={{ height: `${density.gridGapPx}px` }}
                        className="w-full bg-blue-500/25 border border-dashed border-blue-500/60 rounded flex items-center justify-center text-[9px] font-mono text-blue-900 font-bold"
                      >
                        Gap: {density.gridGapPx}px
                      </div>
                    )}

                    {/* Action Buttons Row with Visual Measured Gap */}
                    <div 
                      style={{ gap: `${density.btnGapPx}px` }}
                      className="flex flex-wrap items-center bg-white p-3 rounded-xl border border-[#0a0a0a]/10"
                    >
                      <button className="voral-btn-pill py-2 px-4 text-xs">
                        Export Ledger
                      </button>

                      {showRulers && (
                        <span className="px-1.5 py-0.5 bg-blue-600 text-white rounded text-[9px] font-mono font-bold shrink-0">
                          Gap: {density.btnGapPx}px
                        </span>
                      )}

                      <button className="px-4 py-2 rounded-full border border-[#0a0a0a]/20 text-xs font-main font-bold text-[#111111] hover:bg-[#F4F3F1] transition-colors">
                        Filter Date
                      </button>
                    </div>

                  </div>
                </motion.div>
              </div>
            </div>

            {/* Specimen Footer Metrics */}
            <div className="pt-4 mt-6 border-t border-[#0a0a0a]/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#666666]">
              <div className="flex items-center gap-2">
                <span>Base Unit: <strong className="text-[#111111]">8px (0.5rem)</strong></span>
                <span>&bull;</span>
                <span>Half Step: <strong className="text-[#111111]">4px (0.25rem)</strong></span>
              </div>
              <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                100% Math Grid Adherence
              </span>
            </div>
          </div>

          {/* Right: 8-Point Spacing Tokens Matrix Table */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#0a0a0a] shadow-xl flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center justify-between border-b border-[#0a0a0a]/10 pb-3 mb-4">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#111111] block">
                    8PT HARMONIC SPACING REGISTRY
                  </span>
                  <span className="text-[11px] text-[#666666]">Click any token to inspect width live</span>
                </div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#F4F3F1] text-[#111111] border border-[#0a0a0a]/10">
                  10 Tokens
                </span>
              </div>

              {/* Full Spacing Token List */}
              <div className="space-y-2">
                {SPACING_TOKENS.map((t) => {
                  const isSelected = selectedTokenPreview === t.px;
                  return (
                    <div
                      key={t.token}
                      onClick={() => {
                        sounds.playPop();
                        setSelectedTokenPreview(isSelected ? null : t.px);
                      }}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'bg-purple-50 border-purple-600 shadow-sm ring-1 ring-purple-600'
                          : 'bg-[#F4F3F1] border-[#0a0a0a]/10 hover:bg-white hover:border-[#0a0a0a]/30'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-[120px]">
                        <span className="font-mono font-bold text-xs text-[#111111]">{t.token}</span>
                        <span className="text-xs font-mono text-purple-800 font-bold bg-purple-100/80 px-1.5 py-0.2 rounded">
                          {t.px}px
                        </span>
                      </div>

                      <div className="flex-1 flex items-center justify-end gap-3 min-w-0">
                        {/* Visual Width Bar */}
                        <div className="h-3.5 bg-[#E5E2DC] rounded-full overflow-hidden w-24 max-w-[96px] flex items-center shrink-0">
                          <div
                            style={{ width: `${Math.min(100, (t.px / 96) * 100)}%` }}
                            className={`h-full rounded-full transition-all duration-300 ${
                              isSelected ? 'bg-purple-600' : 'bg-[#111111]'
                            }`}
                          />
                        </div>
                        <span className="text-[11px] text-[#555555] truncate max-w-[170px]" title={t.use}>
                          {t.use}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Golden Rule Callout Box */}
            <div className="p-4 bg-[#ECEAE6] rounded-2xl border border-[#0a0a0a]/15 text-xs font-mono text-[#111111] space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-purple-950">
                <Sparkles className="h-3.5 w-3.5 text-purple-600 shrink-0" />
                <span>8pt Spatial Hard Rule</span>
              </div>
              <p className="text-[11px] text-[#555555] leading-relaxed">
                Never use arbitrary odd pixel values (e.g. 13px, 17px, 23px). Every margin, padding, and layout gap must snap strictly to 4px/8px increments for perfect design system modularity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
