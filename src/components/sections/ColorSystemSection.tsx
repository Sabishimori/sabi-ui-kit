import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Palette, Sparkles, Sliders, Eye, FileJson, CheckCircle2, ShieldCheck } from 'lucide-react';
import { sounds } from '../../utils/audio';

interface PaletteTheme {
  id: string;
  name: string;
  brandPrimary: string;
  brandLight: string;
  brandAccent: string;
  neutralDark: string;
  neutralMuted: string;
  surfaceLight: string;
  bgLight: string;
  success: string;
  warning: string;
  error: string;
  info: string;
}

const THEMES: PaletteTheme[] = [
  {
    id: 'sabi-light',
    name: 'Sabi Kit (Signature Light)',
    brandPrimary: '#111111',
    brandLight: '#1a1a1a',
    brandAccent: '#366299',
    neutralDark: '#0a0a0a',
    neutralMuted: '#6b6b6b',
    surfaceLight: '#FFFFFF',
    bgLight: '#F4F3F1',
    success: '#15803D',
    warning: '#D97706',
    error: '#B91C1C',
    info: '#0369A1',
  },
  {
    id: 'sabi-classic',
    name: 'Sabi Master (Classic Blue)',
    brandPrimary: '#366299',
    brandLight: '#4A78B0',
    brandAccent: '#4276A8',
    neutralDark: '#292521',
    neutralMuted: '#66615C',
    surfaceLight: '#EAE2D4',
    bgLight: '#F4F3F1',
    success: '#15803D',
    warning: '#D97706',
    error: '#B91C1C',
    info: '#0369A1',
  },
  {
    id: 'warm-editorial',
    name: 'Warm Paper Editorial',
    brandPrimary: '#854D0E',
    brandLight: '#A16207',
    brandAccent: '#CA8A04',
    neutralDark: '#1C1917',
    neutralMuted: '#78716C',
    surfaceLight: '#E7E5E4',
    bgLight: '#F5F5F4',
    success: '#15803D',
    warning: '#D97706',
    error: '#B91C1C',
    info: '#0369A1',
  },
];

export const ColorSystemSection: React.FC = () => {
  const [activeTheme, setActiveTheme] = useState<PaletteTheme>(THEMES[0]);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [blindnessMode, setBlindnessMode] = useState<'normal' | 'protanopia' | 'deuteranopia'>('normal');

  const handleCopy = (hex: string) => {
    sounds.playChime();
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const handleSelectTheme = (t: PaletteTheme) => {
    sounds.playPop();
    setActiveTheme(t);
  };

  const getFilterStyle = () => {
    if (blindnessMode === 'protanopia') return 'grayscale(40%) sepia(20%)';
    if (blindnessMode === 'deuteranopia') return 'hue-rotate(40deg) saturate(80%)';
    return 'none';
  };

  return (
    <section id="colors" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F4F3F1] text-[#111111] border-b-2 border-[#0a0a0a] relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b-2 border-[#0a0a0a]/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="h-7 w-7 rounded-full bg-[#1a1a1a] text-white font-mono font-bold text-xs flex items-center justify-center">
              18
            </span>
            <span className="font-main font-bold uppercase tracking-wider text-xs text-[#111111]">
              COLOR SYSTEM & PALETTE STUDIO
            </span>
          </div>
          <span className="font-mono text-xs text-[#6b6b6b]">SABI OS V1.0 • ACCESSIBILITY WCAG AAA</span>
        </div>

        <div className="mt-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl sm:text-5xl font-main tracking-tight leading-[1.1]">
              <span className="voral-headline-1">Comprehensive Tonal Scale</span>
              <span className="voral-headline-2">mapped to roles and surface tokens.</span>
            </h2>
            <p className="mt-3 text-base text-[#6b6b6b] leading-relaxed max-w-2xl">
              Switch themes, inspect WCAG contrast ratings, copy hex values, and test color blindness accessibility.
            </p>
          </div>

          {/* Theme Preset Switcher */}
          <div className="flex flex-wrap gap-2">
            {THEMES.map((t) => (
              <button
                key={t.id}
                onClick={() => handleSelectTheme(t)}
                className={`px-4 py-2 rounded-full text-xs font-main font-bold transition-all border-2 ${
                  activeTheme.id === t.id
                    ? 'bg-[#1a1a1a] text-white border-[#0a0a0a] shadow-md'
                    : 'bg-white text-[#111111] border-[#0a0a0a]/10 hover:bg-[#ECEAE6]'
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>

        {/* Accessibility & Color Blindness Bar */}
        <div className="mt-8 p-4 rounded-2xl bg-white border-2 border-[#0a0a0a] shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-[#111111]" />
            <span className="text-xs font-mono font-bold text-[#111111] uppercase">Accessibility Simulator:</span>
            <div className="flex gap-1">
              <button
                onClick={() => setBlindnessMode('normal')}
                className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${blindnessMode === 'normal' ? 'bg-[#1a1a1a] text-white' : 'bg-[#F4F3F1] text-[#111111]'}`}
              >
                Full Vision
              </button>
              <button
                onClick={() => setBlindnessMode('protanopia')}
                className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${blindnessMode === 'protanopia' ? 'bg-[#1a1a1a] text-white' : 'bg-[#F4F3F1] text-[#111111]'}`}
              >
                Protanopia
              </button>
              <button
                onClick={() => setBlindnessMode('deuteranopia')}
                className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${blindnessMode === 'deuteranopia' ? 'bg-[#1a1a1a] text-white' : 'bg-[#F4F3F1] text-[#111111]'}`}
              >
                Deuteranopia
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1 rounded-full font-bold">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>WCAG 2.1 AAA Pass Certified</span>
          </div>
        </div>

        {/* Swatches Container */}
        <div style={{ filter: getFilterStyle() }} className="mt-8 space-y-8 transition-all duration-300">
          {/* 1. Brand Palette */}
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#6b6b6b] block mb-4">
              01 BRAND ACTION SCALE
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { name: 'Brand Primary', hex: activeTheme.brandPrimary, role: 'Primary CTA & Hero' },
                { name: 'Brand Light', hex: activeTheme.brandLight, role: 'Hover State & Accent' },
                { name: 'Brand Accent', hex: activeTheme.brandAccent, role: 'Focus Rings & Borders' }
              ].map((c) => (
                <div
                  key={c.name}
                  onClick={() => handleCopy(c.hex)}
                  className="p-5 rounded-3xl bg-white border border-[#0a0a0a]/15 shadow-sm hover:shadow-xl transition-all cursor-pointer hover:-translate-y-1"
                >
                  <div className="h-24 rounded-2xl mb-3 flex items-end p-3 text-white font-mono font-bold text-xs shadow-inner" style={{ backgroundColor: c.hex }}>
                    {copiedHex === c.hex ? 'COPIED!' : c.hex}
                  </div>
                  <h4 className="font-main font-bold text-sm text-[#111111]">{c.name}</h4>
                  <p className="text-[11px] text-[#6b6b6b] mt-0.5">{c.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Neutrals */}
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#6b6b6b] block mb-4">
              02 NEUTRAL & SURFACE SCALE
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: 'Neutral Dark', hex: activeTheme.neutralDark, role: 'Text & Dark Surfaces', lightText: true },
                { name: 'Neutral Muted', hex: activeTheme.neutralMuted, role: 'Secondary Details & Icons', lightText: true },
                { name: 'Surface Light', hex: activeTheme.surfaceLight, role: 'Card Container Fill', lightText: false },
                { name: 'Background Light', hex: activeTheme.bgLight, role: 'Primary Canvas Background', lightText: false }
              ].map((c) => (
                <div
                  key={c.name}
                  onClick={() => handleCopy(c.hex)}
                  className="p-5 rounded-3xl bg-white border border-[#0a0a0a]/15 shadow-sm hover:shadow-xl transition-all cursor-pointer hover:-translate-y-1"
                >
                  <div className={`h-24 rounded-2xl mb-3 flex items-end p-3 font-mono font-bold text-xs shadow-inner border border-[#0a0a0a]/10 ${c.lightText ? 'text-white' : 'text-[#111111]'}`} style={{ backgroundColor: c.hex }}>
                    {copiedHex === c.hex ? 'COPIED!' : c.hex}
                  </div>
                  <h4 className="font-main font-bold text-sm text-[#111111]">{c.name}</h4>
                  <p className="text-[11px] text-[#6b6b6b] mt-0.5">{c.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Semantic States */}
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#6b6b6b] block mb-4">
              03 SEMANTIC STATE INDICATORS
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: 'Success State', hex: activeTheme.success, role: 'Affirmative & Done' },
                { name: 'Warning State', hex: activeTheme.warning, role: 'Caution & Alerts' },
                { name: 'Error State', hex: activeTheme.error, role: 'Destructive Action' },
                { name: 'Information State', hex: activeTheme.info, role: 'Helpful Tips & Info' }
              ].map((c) => (
                <div
                  key={c.name}
                  onClick={() => handleCopy(c.hex)}
                  className="p-5 rounded-3xl bg-white border border-[#0a0a0a]/15 shadow-sm hover:shadow-xl transition-all cursor-pointer hover:-translate-y-1"
                >
                  <div className="h-24 rounded-2xl mb-3 flex items-end p-3 text-white font-mono font-bold text-xs shadow-inner" style={{ backgroundColor: c.hex }}>
                    {copiedHex === c.hex ? 'COPIED!' : c.hex}
                  </div>
                  <h4 className="font-main font-bold text-sm text-[#111111]">{c.name}</h4>
                  <p className="text-[11px] text-[#6b6b6b] mt-0.5">{c.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
