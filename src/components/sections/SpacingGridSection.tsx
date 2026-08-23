import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Ruler, Grid, Sparkles, Monitor, Tablet, Smartphone, Sliders } from 'lucide-react';
import { sounds } from '../../utils/audio';

const SPACING_SCALE = [
  { token: 'space.4', px: 4, label: 'Micro-gap (4px)', usage: 'Badge icons, compact chips' },
  { token: 'space.8', px: 8, label: 'Base Unit (8px)', usage: 'Button internal padding, form fields' },
  { token: 'space.16', px: 16, label: 'Standard (16px)', usage: 'Card inner padding, icon text gap' },
  { token: 'space.24', px: 24, label: 'Medium (24px)', usage: 'Column gutter, section header margins' },
  { token: 'space.32', px: 32, label: 'Large (32px)', usage: 'Card grid gap, dialog padding' },
  { token: 'space.48', px: 48, label: 'X-Large (48px)', usage: 'Desktop component separation' },
  { token: 'space.64', px: 64, label: '2X-Large (64px)', usage: 'Hero block margins, page margins' },
  { token: 'space.96', px: 96, label: '3X-Large (96px)', usage: 'Major editorial section vertical rhythm' },
];

export const SpacingGridSection: React.FC = () => {
  const [selectedSpacing, setSelectedSpacing] = useState(SPACING_SCALE[2]);
  const [containerWidth, setContainerWidth] = useState(1280);

  const getColumnCount = () => {
    if (containerWidth < 600) return 4;
    if (containerWidth < 1024) return 8;
    return 12;
  };

  const getDeviceLabel = () => {
    if (containerWidth < 600) return 'Mobile Screen (4 Columns • Gutter 12px • Margin 16px)';
    if (containerWidth < 1024) return 'Tablet Screen (8 Columns • Gutter 16px • Margin 32px)';
    return 'Desktop Screen (12 Columns • Gutter 24px • Margin 80px)';
  };

  return (
    <section id="system" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F4F3F1] text-[#111111] border-b-2 border-[#0a0a0a] relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b-2 border-[#0a0a0a]/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="h-7 w-7 rounded-full bg-[#1a1a1a] text-white font-mono font-bold text-xs flex items-center justify-center">
              20
            </span>
            <span className="font-main font-bold uppercase tracking-wider text-xs text-[#111111]">
              SPACING SCALE & RESPONSIVE GRID CANVAS
            </span>
          </div>
          <span className="font-mono text-xs text-[#6b6b6b]">SABI OS V1.0 • 8PX RHYTHM</span>
        </div>

        <div className="mt-10 mb-8 max-w-3xl">
          <h2 className="text-3xl sm:text-5xl font-main tracking-tight leading-[1.1]">
            <span className="voral-headline-1">Harmonic 8px Ruler</span>
            <span className="voral-headline-2">and Responsive Column Canvas.</span>
          </h2>
          <p className="mt-3 text-base text-[#6b6b6b] leading-relaxed">
            Drag the viewport width slider to see 12, 8, and 4 column grid guidelines snap live in real time.
          </p>
        </div>

        {/* Live Responsive Container Slider */}
        <div className="p-6 rounded-3xl bg-white border-2 border-[#0a0a0a] shadow-md space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2 text-[#111111] font-bold">
              <Sliders className="h-4 w-4" />
              <span>LIVE CONTAINER RESIZER: {containerWidth}px</span>
            </div>
            <span className="text-[#6b6b6b] font-semibold">{getDeviceLabel()}</span>
          </div>

          <input
            type="range"
            min="360"
            max="1440"
            step="10"
            value={containerWidth}
            onChange={(e) => setContainerWidth(Number(e.target.value))}
            className="w-full h-2 bg-[#F4F3F1] rounded-lg appearance-none cursor-pointer accent-[#1a1a1a]"
          />

          {/* Quick Width Buttons */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { label: 'Mobile (375px)', val: 375 },
              { label: 'Tablet (768px)', val: 768 },
              { label: 'Laptop (1024px)', val: 1024 },
              { label: 'Desktop (1280px)', val: 1280 },
              { label: 'Wide (1440px)', val: 1440 }
            ].map((b) => (
              <button
                key={b.label}
                onClick={() => {
                  sounds.playClick();
                  setContainerWidth(b.val);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-colors border ${
                  containerWidth === b.val ? 'bg-[#1a1a1a] text-white border-[#0a0a0a] font-bold shadow-sm' : 'bg-[#F4F3F1] text-[#6b6b6b] border-[#0a0a0a]/10 hover:text-[#111111]'
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>

        {/* Live Grid Canvas Simulation */}
        <div className="mt-8 p-6 rounded-3xl bg-[#ECEAE6] border-2 border-[#0a0a0a] overflow-hidden flex justify-center">
          <div
            className="w-full bg-white rounded-2xl p-4 sm:p-6 border border-[#0a0a0a]/15 shadow-xl transition-all duration-300 relative"
            style={{ maxWidth: `${containerWidth}px` }}
          >
            {/* Column Guides Overlay */}
            <div className="grid gap-3 mb-6" style={{ gridTemplateColumns: `repeat(${getColumnCount()}, minmax(0, 1fr))` }}>
              {Array.from({ length: getColumnCount() }).map((_, i) => (
                <div key={i} className="h-28 rounded-xl bg-[#F4F3F1] border border-dashed border-[#0a0a0a]/30 flex items-center justify-center text-[10px] font-mono text-[#6b6b6b]">
                  Col {i + 1}
                </div>
              ))}
            </div>

            {/* Sample UI Cards Snapped to Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[#F4F3F1] border border-[#0a0a0a]/10 space-y-1">
                <span className="text-[10px] font-mono text-[#111111] font-bold uppercase">Bento Card A</span>
                <p className="text-xs text-[#6b6b6b]">Snapped to 4 columns on Desktop.</p>
              </div>
              <div className="p-4 rounded-xl bg-[#F4F3F1] border border-[#0a0a0a]/10 space-y-1">
                <span className="text-[10px] font-mono text-[#111111] font-bold uppercase">Bento Card B</span>
                <p className="text-xs text-[#6b6b6b]">Fluid gutters maintaining 8px rhythm.</p>
              </div>
              <div className="p-4 rounded-xl bg-[#F4F3F1] border border-[#0a0a0a]/10 space-y-1">
                <span className="text-[10px] font-mono text-[#111111] font-bold uppercase">Bento Card C</span>
                <p className="text-xs text-[#6b6b6b]">Reflows cleanly to single column stack.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Spacing Ruler Scale Breakdown */}
        <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-white border-2 border-[#0a0a0a] shadow-xl">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#6b6b6b] block mb-6">
            MATHEMATICAL 8-STEP SPACING SCALE
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SPACING_SCALE.map((sp) => (
              <div
                key={sp.token}
                onClick={() => {
                  sounds.playClick(600 + sp.px * 5);
                  setSelectedSpacing(sp);
                }}
                className={`p-4 rounded-2xl cursor-pointer transition-all border-2 ${
                  selectedSpacing.token === sp.token
                    ? 'bg-[#1a1a1a] text-white border-[#0a0a0a] shadow-lg'
                    : 'bg-[#F4F3F1] text-[#111111] border-[#0a0a0a]/10 hover:border-[#0a0a0a]/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold">{sp.token}</span>
                  <span className="font-mono text-xs font-bold">{sp.px}px</span>
                </div>
                <div className="my-2.5 h-2 rounded bg-current opacity-80" style={{ width: `${Math.min(sp.px * 3, 100)}%` }} />
                <p className="text-[11px] opacity-80 leading-snug mt-1">{sp.usage}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
