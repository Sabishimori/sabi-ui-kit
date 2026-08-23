import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Grid, Box, Ruler, Check, Copy, Sliders, Layers, Sparkles, Move } from 'lucide-react';
import { sounds } from '../../utils/audio';

const SPACING_TOKENS = [
  { token: 'space-0', px: 0, rem: '0rem', use: 'Reset / Flush' },
  { token: 'space-1', px: 4, rem: '0.25rem', use: 'Micro-gaps, icon margins, pill badges' },
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
  const [copiedTokens, setCopiedTokens] = useState(false);
  const [hoveredBox, setHoveredBox] = useState<string | null>(null);

  const getDensitySettings = () => {
    switch (densityMode) {
      case 'compact':
        return { padding: 'p-3', gap: 'gap-2', cardPad: 'p-4', label: 'Compact / High Density (4px / 8px)' };
      case 'balanced':
        return { padding: 'p-6', gap: 'gap-4', cardPad: 'p-6', label: 'Balanced / Standard SaaS (8px / 16px)' };
      case 'spacious':
        return { padding: 'p-8', gap: 'gap-6', cardPad: 'p-8', label: 'Spacious / Editorial & Luxury (16px / 32px)' };
    }
  };

  const currentDensity = getDensitySettings();

  const handleCopySpacingSpec = () => {
    sounds.playChime();
    const spec = `// 8PT HARMONIC SPATIAL TOKENS:
export const spacing = {
  0: "0px",
  1: "4px",   // 0.25rem
  2: "8px",   // 0.50rem (Base)
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
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b-2 border-[#0a0a0a]/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="h-7 w-7 rounded-full bg-[#1a1a1a] text-white font-mono font-bold text-xs flex items-center justify-center">
              02
            </span>
            <span className="font-main font-bold uppercase tracking-wider text-xs text-[#111111]">
              8-POINT SPATIAL HARMONY & DENSITY ARCHITECTURE
            </span>
          </div>
          <span className="font-mono text-xs text-[#6b6b6b]">SABI OS V1.0 • MATHEMATICAL RHYTHM</span>
        </div>

        <div className="mt-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl sm:text-5xl font-main tracking-tight leading-[1.1]">
              <span className="voral-headline-1">Spacing Systems & Density</span>
              <span className="voral-headline-2">with 8pt Grid Inspect Physics.</span>
            </h2>
            <p className="mt-3 text-base text-[#6b6b6b] leading-relaxed max-w-2xl">
              Eliminate arbitrary pixel numbers. Every margin, padding, gap, and layout offset is constrained to an 8-point harmonic rhythm for zero developer-designer friction.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sounds.playClick();
                setShowRulers(!showRulers);
              }}
              className={`px-4 py-2 rounded-full text-xs font-main font-bold border transition-all ${
                showRulers ? 'bg-[#1a1a1a] text-white border-[#0a0a0a]' : 'bg-white text-[#111111] border-[#0a0a0a]/15'
              }`}
            >
              <Ruler className="h-3.5 w-3.5 inline mr-1.5" />
              <span>{showRulers ? 'Figma Inspect Overlays ON' : 'Overlays OFF'}</span>
            </button>

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
        <div className="mt-8 p-3 rounded-2xl bg-white border-2 border-[#0a0a0a] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-mono text-[#111111] font-bold">
            <Box className="h-4 w-4 text-[#366299]" />
            <span>Active Content Density Mode:</span>
            <span className="text-[#8a8a8a] font-normal">({currentDensity.label})</span>
          </div>

          <div className="flex items-center gap-1.5">
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
                    ? 'bg-[#1a1a1a] text-white border-[#0a0a0a] shadow-sm'
                    : 'bg-[#F4F3F1] text-[#6b6b6b] border-[#0a0a0a]/10 hover:text-[#111111]'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Live Interactive Specimen with Hover Inspection */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Interactive Layout Specimen with Inspect Overlays */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#0a0a0a] shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-[#0a0a0a]/10 pb-3 mb-6">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#6b6b6b]">
                  LIVE HARMONIC SPECIMEN
                </span>
                <span className="text-xs font-mono text-[#8a8a8a]">
                  Hover elements to inspect margins & padding
                </span>
              </div>

              {/* Dynamic Density Card Container */}
              <motion.div
                layout
                className={`rounded-2xl bg-[#F4F3F1] border-2 border-[#0a0a0a] ${currentDensity.cardPad} space-y-4 relative`}
                onMouseEnter={() => setHoveredBox('container')}
                onMouseLeave={() => setHoveredBox(null)}
              >
                {showRulers && (
                  <div className="absolute -top-3 left-4 px-2 py-0.5 bg-rose-600 text-white rounded text-[9px] font-mono font-bold">
                    Container Padding: {densityMode === 'compact' ? '16px' : densityMode === 'balanced' ? '24px' : '32px'}
                  </div>
                )}

                {/* Header row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-8 w-8 rounded-full bg-[#1a1a1a] text-white flex items-center justify-center font-mono text-xs font-bold">
                      8pt
                    </span>
                    <div>
                      <h4 className="font-main font-bold text-sm text-[#111111]">
                        Financial Growth Portfolio
                      </h4>
                      <span className="text-[10px] font-mono text-[#6b6b6b]">
                        Active Asset Governance
                      </span>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
                    +42.8% ROI
                  </span>
                </div>

                {/* Sub-grid with Dynamic Gap */}
                <div className={`grid grid-cols-2 ${currentDensity.gap}`}>
                  <div
                    className="p-4 rounded-xl bg-white border border-[#0a0a0a]/10 relative group"
                    onMouseEnter={() => setHoveredBox('metric-1')}
                    onMouseLeave={() => setHoveredBox(null)}
                  >
                    {showRulers && (
                      <span className="absolute -top-2 -right-2 px-1.5 py-0.5 rounded bg-blue-600 text-white text-[8px] font-mono font-bold">
                        Pad: 16px
                      </span>
                    )}
                    <span className="text-[10px] font-mono text-[#8a8a8a] uppercase font-bold">EQUITY CAP</span>
                    <div className="font-mono text-lg font-black text-[#111111] mt-0.5">$840,250</div>
                  </div>

                  <div
                    className="p-4 rounded-xl bg-white border border-[#0a0a0a]/10 relative group"
                    onMouseEnter={() => setHoveredBox('metric-2')}
                    onMouseLeave={() => setHoveredBox(null)}
                  >
                    {showRulers && (
                      <span className="absolute -top-2 -right-2 px-1.5 py-0.5 rounded bg-blue-600 text-white text-[8px] font-mono font-bold">
                        Pad: 16px
                      </span>
                    )}
                    <span className="text-[10px] font-mono text-[#8a8a8a] uppercase font-bold">RUNWAY</span>
                    <div className="font-mono text-lg font-black text-emerald-700 mt-0.5">38 Months</div>
                  </div>
                </div>

                {/* Action Buttons with 8px Gap */}
                <div className="flex items-center gap-2 pt-2">
                  <button className="voral-btn-pill py-2 px-4 text-xs">
                    Export Ledger
                  </button>
                  <button className="px-4 py-2 rounded-full border border-[#0a0a0a]/20 text-xs font-main font-bold text-[#111111] hover:bg-white transition-colors">
                    Filter Date
                  </button>
                </div>
              </motion.div>
            </div>

            <div className="pt-4 mt-6 border-t border-[#0a0a0a]/10 flex items-center justify-between text-xs font-mono text-[#6b6b6b]">
              <span>Base Unit: 8px (0.5rem)</span>
              <span className="font-bold text-[#111111]">100% Math Grid Adherence</span>
            </div>
          </div>

          {/* Right: 8-Point Spacing Tokens Matrix Table */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#0a0a0a] shadow-xl flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#6b6b6b] block mb-1">
                8PT HARMONIC SPACING REGISTRY
              </span>
              <p className="text-xs text-[#6b6b6b] mb-4 leading-relaxed">
                Standard token scale used across Tailwind CSS, CSS variables, and Figma design tokens.
              </p>

              <div className="space-y-1.5 max-h-[340px] overflow-y-auto pr-1">
                {SPACING_TOKENS.map((t) => (
                  <div
                    key={t.token}
                    className="p-2.5 rounded-xl bg-[#F4F3F1] border border-[#0a0a0a]/10 flex items-center justify-between text-xs font-mono hover:bg-white hover:border-[#0a0a0a]/30 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#111111]">{t.token}</span>
                      <span className="text-[#8a8a8a]">({t.px}px)</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Visual Bar representation */}
                      <div
                        style={{ width: `${Math.max(4, t.px)}px` }}
                        className="h-2 bg-[#1a1a1a] rounded-sm shrink-0"
                      />
                      <span className="text-[10px] text-[#6b6b6b] truncate max-w-[120px]">{t.use}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 bg-[#ECEAE6] rounded-xl border border-[#0a0a0a]/10 text-xs font-mono text-[#111111]">
              <strong>Rule:</strong> Never use odd pixel values (e.g. 13px, 17px). Always snap to 4px/8px increments.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
