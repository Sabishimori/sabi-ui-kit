import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Copy, Check, Sparkles, FileJson, Layers, Palette, ShieldCheck } from 'lucide-react';
import { sounds } from '../../utils/audio';

const TOKENS = {
  colors: [
    { key: 'color.brand.primary', val: '#111111' },
    { key: 'color.brand.dark', val: '#1a1a1a' },
    { key: 'color.brand.accent', val: '#366299' },
    { key: 'color.surface.bg', val: '#F4F3F1' },
    { key: 'color.surface.card', val: '#FFFFFF' },
    { key: 'color.state.success', val: '#15803D' },
    { key: 'color.state.warning', val: '#D97706' },
    { key: 'color.state.error', val: '#B91C1C' },
  ],
  typography: [
    { key: 'font.family.display', val: 'Plus Jakarta Sans, sans-serif' },
    { key: 'font.family.body', val: 'DM Sans, sans-serif' },
    { key: 'font.family.mono', val: 'Space Mono, monospace' },
    { key: 'font.size.body', val: '15px' },
    { key: 'font.lineHeight.body', val: '1.5' },
  ],
  radius: [
    { key: 'radius.sm', val: '6px' },
    { key: 'radius.md', val: '12px' },
    { key: 'radius.lg', val: '24px' },
    { key: 'radius.full', val: '9999px' },
  ],
  spacing: [
    { key: 'space.4', val: '4px' },
    { key: 'space.8', val: '8px' },
    { key: 'space.16', val: '16px' },
    { key: 'space.24', val: '24px' },
    { key: 'space.32', val: '32px' },
    { key: 'space.48', val: '48px' },
  ],
  motion: [
    { key: 'motion.duration.fast', val: '150ms' },
    { key: 'motion.duration.normal', val: '300ms' },
    { key: 'motion.duration.slow', val: '500ms' },
    { key: 'motion.ease.voral', val: 'cubic-bezier(0.16, 1, 0.3, 1)' },
  ],
};

export const DesignTokensSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [activeCategory, setActiveCategory] = useState<keyof typeof TOKENS>('colors');

  const handleCopyJSON = () => {
    sounds.playChime();
    navigator.clipboard.writeText(JSON.stringify(TOKENS, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="design-tokens" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F4F3F1] text-[#111111] border-b-2 border-[#0a0a0a] relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b-2 border-[#0a0a0a]/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="h-7 w-7 rounded-full bg-[#1a1a1a] text-white font-mono font-bold text-xs flex items-center justify-center">
              22
            </span>
            <span className="font-main font-bold uppercase tracking-wider text-xs text-[#111111]">
              DESIGN TOKENS ENGINE & JSON REPOSITORY
            </span>
          </div>
          <span className="font-mono text-xs text-[#6b6b6b]">SABI OS V1.0 • TOKENS STUDIO</span>
        </div>

        <div className="mt-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl sm:text-5xl font-main tracking-tight leading-[1.1]">
              <span className="voral-headline-1">Mathematical Design Tokens</span>
              <span className="voral-headline-2">synced to code variables & Figma.</span>
            </h2>
            <p className="mt-3 text-base text-[#6b6b6b] leading-relaxed max-w-2xl">
              Eliminate hardcoded hex values and arbitrary margins. Tokens define every color, font scale, corner radius, spacing step, and easing curve.
            </p>
          </div>

          <button
            onClick={handleCopyJSON}
            className="voral-btn-pill shrink-0"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-300" /> : <Copy className="h-4 w-4" />}
            <span>{copied ? 'Tokens JSON Copied!' : 'Copy Tokens JSON Package'}</span>
          </button>
        </div>

        {/* Token Category Selectors */}
        <div className="mt-8 flex flex-wrap gap-2">
          {Object.keys(TOKENS).map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  sounds.playClick();
                  setActiveCategory(cat as keyof typeof TOKENS);
                }}
                className={`px-4 py-2 rounded-full text-xs font-mono uppercase font-bold transition-all border-2 ${
                  isSelected
                    ? 'bg-[#1a1a1a] text-white border-[#0a0a0a] shadow-md scale-105'
                    : 'bg-white text-[#111111] border-[#0a0a0a]/10 hover:bg-[#ECEAE6]'
                }`}
              >
                {cat} ({TOKENS[cat as keyof typeof TOKENS].length})
              </button>
            );
          })}
        </div>

        {/* Token Inspection Grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#0a0a0a] shadow-xl space-y-4"
        >
          <div className="flex items-center justify-between border-b border-[#0a0a0a]/10 pb-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#6b6b6b]">
              TOKEN KEY / CODE ALIAS / COMPUTED VALUE
            </span>
            <span className="text-xs font-mono text-emerald-700 font-bold">
              ● Live Sync Active
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {TOKENS[activeCategory].map((t) => (
              <div
                key={t.key}
                onClick={() => {
                  sounds.playPop();
                  navigator.clipboard.writeText(t.val);
                }}
                className="p-4 rounded-2xl bg-[#F4F3F1] border border-[#0a0a0a]/10 hover:border-[#111111] cursor-pointer transition-all flex flex-col justify-between h-28 group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-[#6b6b6b] group-hover:text-[#111111] font-medium">
                    {t.key}
                  </span>
                  <Copy className="h-3 w-3 text-[#8a8a8a] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#0a0a0a]/5">
                  <span className="font-mono font-bold text-xs sm:text-sm text-[#111111]">
                    {t.val}
                  </span>
                  {activeCategory === 'colors' && (
                    <span className="h-4 w-4 rounded-full border border-black/20" style={{ backgroundColor: t.val }} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
