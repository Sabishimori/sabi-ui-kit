import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Sliders, Check, ExternalLink, Globe, Layout, Palette } from 'lucide-react';
import { sounds } from '../../utils/audio';

interface AestheticSample {
  id: string;
  name: string;
  tagline: string;
  characteristics: string[];
  colorPalette: string[];
  typographyRule: string;
  referenceSites: { name: string; url: string; note: string }[];
  visualMockup: {
    bg: string;
    text: string;
    border: string;
    cardBg: string;
    accent: string;
    fontFamily: string;
  };
}

const AESTHETICS: AestheticSample[] = [
  {
    id: 'minimal',
    name: 'Minimal & Pure',
    tagline: 'Pure Asymmetrical Whitespace & Swiss Precision',
    characteristics: ['Zero decorative noise', 'High structural alignment', 'Strict 8px spacing rhythm', 'Subtle 1px micro-borders'],
    colorPalette: ['#111111', '#6b6b6b', '#ECEAE6', '#F4F3F1'],
    typographyRule: 'Plus Jakarta Sans + strict 1.5 line height',
    referenceSites: [
      { name: 'Linear.app', url: 'https://linear.app', note: 'Standard for ultra-fast minimalist software' },
      { name: 'Apple Design', url: 'https://apple.com', note: 'Masterclass in spacious product hierarchy' },
    ],
    visualMockup: {
      bg: 'bg-white text-[#111111]',
      text: 'text-[#111111]',
      border: 'border-[#0a0a0a]',
      cardBg: 'bg-[#F4F3F1]',
      accent: 'bg-[#1a1a1a] text-white',
      fontFamily: 'font-main'
    }
  },
  {
    id: 'premium',
    name: 'Voral Editorial Luxe',
    tagline: 'Warm Paper Undertones & High-Contrast Typography',
    characteristics: ['Tactile paper warmth (#F4F3F1)', 'Two-line high-contrast titles', '2px solid black structural frames', 'Dark pill button physics'],
    colorPalette: ['#111111', '#1a1a1a', '#ECEAE6', '#F4F3F1'],
    typographyRule: 'Plus Jakarta Sans Bold + Space Mono captions',
    referenceSites: [
      { name: 'Pitch.com', url: 'https://pitch.com', note: 'High-end executive presentation elegance' },
      { name: 'Cosmos.so', url: 'https://cosmos.so', note: 'Luxury curation and visual rhythm' },
    ],
    visualMockup: {
      bg: 'bg-[#F4F3F1] text-[#111111]',
      text: 'text-[#111111]',
      border: 'border-[#0a0a0a]',
      cardBg: 'bg-white',
      accent: 'bg-[#1a1a1a] text-white',
      fontFamily: 'font-main'
    }
  },
  {
    id: 'technical',
    name: 'Technical & Dev',
    tagline: 'High-Density Telemetry & Monospace Readouts',
    characteristics: ['Command palettes (Cmd+K)', 'Real-time WebSocket data badges', 'Terminal syntax coloring', 'Compact table rows'],
    colorPalette: ['#0A0A0B', '#366299', '#15803D', '#D97706'],
    typographyRule: 'Space Mono + Plus Jakarta Sans Headings',
    referenceSites: [
      { name: 'Vercel.com', url: 'https://vercel.com', note: 'Geom-focused technical developer aesthetic' },
      { name: 'Stripe.com', url: 'https://stripe.com', note: 'Precision financial telemetry and docs' },
    ],
    visualMockup: {
      bg: 'bg-[#111111] text-white',
      text: 'text-white',
      border: 'border-[#0a0a0a]',
      cardBg: 'bg-[#1a1a1a]',
      accent: 'bg-emerald-500 text-black',
      fontFamily: 'font-mono'
    }
  },
  {
    id: 'human',
    name: 'Human & Warm',
    tagline: 'Tactile Organic Paper with Earthy Neutrals',
    characteristics: ['Warm cream canvas (#F4F3F1)', 'Comfortable reading line length', 'Friendly conversational micro-copy', 'Gentle corner radiuses (24px)'],
    colorPalette: ['#F4F3F1', '#ECEAE6', '#111111', '#15803D'],
    typographyRule: 'DM Sans + Warm Editorial Subtitles',
    referenceSites: [
      { name: 'Notion.so', url: 'https://notion.so', note: 'Human-friendly modular workspace' },
      { name: 'Substack.com', url: 'https://substack.com', note: 'Reader-first editorial typography' },
    ],
    visualMockup: {
      bg: 'bg-[#F4F3F1] text-[#111111]',
      text: 'text-[#111111]',
      border: 'border-[#0a0a0a]',
      cardBg: 'bg-white',
      accent: 'bg-[#1a1a1a] text-white',
      fontFamily: 'font-main'
    }
  }
];

export const VisualDirectionSection: React.FC = () => {
  const [selectedAesthetic, setSelectedAesthetic] = useState<AestheticSample>(AESTHETICS[1]);

  const handleSelect = (a: AestheticSample) => {
    sounds.playPop();
    setSelectedAesthetic(a);
  };

  return (
    <section id="visual-dir" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F4F3F1] text-[#111111] border-b-2 border-[#0a0a0a] relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b-2 border-[#0a0a0a]/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="h-7 w-7 rounded-full bg-[#1a1a1a] text-white font-mono font-bold text-xs flex items-center justify-center">
              17
            </span>
            <span className="font-main font-bold uppercase tracking-wider text-xs text-[#111111]">
              VISUAL DIRECTION & REAL-WORLD REFERENCES
            </span>
          </div>
          <span className="font-mono text-xs text-[#6b6b6b]">SABI OS V1.0 • AESTHETIC DIRECTORY</span>
        </div>

        <div className="mt-10 mb-8 max-w-3xl">
          <h2 className="text-3xl sm:text-5xl font-main tracking-tight leading-[1.1]">
            <span className="voral-headline-1">Visual Direction Benchmarks</span>
            <span className="voral-headline-2">and Real-World Aesthetic Samples.</span>
          </h2>
          <p className="mt-3 text-base text-[#6b6b6b] leading-relaxed">
            Click any aesthetic below to inspect live sample layout cards, typography rules, color palettes, and real reference websites.
          </p>
        </div>

        {/* 4 Aesthetic Style Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {AESTHETICS.map((a) => {
            const isSelected = selectedAesthetic.id === a.id;
            return (
              <button
                key={a.id}
                onClick={() => handleSelect(a)}
                className={`p-5 rounded-3xl text-left transition-all duration-200 border-2 ${
                  isSelected
                    ? 'bg-[#1a1a1a] text-white border-[#0a0a0a] shadow-xl scale-105'
                    : 'bg-white text-[#111111] border-[#0a0a0a]/10 hover:border-[#0a0a0a]/40 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Palette className="h-4 w-4 opacity-70" />
                  {isSelected && <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />}
                </div>
                <h3 className="font-main font-bold text-base">
                  {a.name}
                </h3>
                <p className={`text-[11px] mt-1 line-clamp-1 ${isSelected ? 'text-white/80' : 'text-[#6b6b6b]'}`}>
                  {a.tagline}
                </p>
              </button>
            );
          })}
        </div>

        {/* Live Aesthetic Spec & Real Reference Links */}
        <motion.div
          key={selectedAesthetic.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
        >
          {/* Live Rendered Mockup UI Canvas (Left) */}
          <div className={`lg:col-span-6 p-6 sm:p-8 rounded-3xl border-2 shadow-2xl flex flex-col justify-between space-y-6 ${selectedAesthetic.visualMockup.bg} ${selectedAesthetic.visualMockup.border}`}>
            <div>
              <div className="flex items-center justify-between border-b border-current/10 pb-4 mb-6">
                <span className="text-xs font-mono font-bold uppercase tracking-widest opacity-80">
                  {selectedAesthetic.name.toUpperCase()} INTERFACE DEMO
                </span>
                <span className="h-2 w-2 rounded-full bg-[#111111]" />
              </div>

              {/* Sample Mini Card Inside Mockup */}
              <div className={`p-5 rounded-2xl border ${selectedAesthetic.visualMockup.cardBg} ${selectedAesthetic.visualMockup.border} space-y-3`}>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest opacity-60">
                  ACTIVE WORKSPACE
                </span>
                <h4 className={`text-xl font-bold ${selectedAesthetic.visualMockup.fontFamily}`}>
                  Sabi Kit Master Architecture
                </h4>
                <p className="text-xs opacity-80 leading-relaxed font-normal">
                  {selectedAesthetic.tagline}. Designed for high focus and predictable team execution.
                </p>

                <div className="pt-2 flex items-center gap-2">
                  <button className={`px-4 py-2 rounded-full text-xs font-bold shadow-md ${selectedAesthetic.visualMockup.accent}`}>
                    Deploy Release
                  </button>
                  <button className="px-3.5 py-2 rounded-full text-xs font-semibold border border-current/20">
                    Inspect Specs
                  </button>
                </div>
              </div>
            </div>

            {/* Typography & Palette preview */}
            <div className="pt-4 border-t border-current/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
              <span>{selectedAesthetic.typographyRule}</span>
              <div className="flex items-center gap-1.5">
                {selectedAesthetic.colorPalette.map((c) => (
                  <span key={c} className="h-4 w-4 rounded-full border border-black/20" style={{ backgroundColor: c }} />
                ))}
              </div>
            </div>
          </div>

          {/* Real Website References & Characteristics (Right) */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#0a0a0a] shadow-xl flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#6b6b6b] block mb-2">
                REAL-WORLD INSPIRATION REFERENCES
              </span>
              <h3 className="text-2xl font-main font-bold text-[#111111]">
                {selectedAesthetic.name} Benchmarks
              </h3>

              {/* External Links */}
              <div className="mt-4 space-y-2.5">
                {selectedAesthetic.referenceSites.map((site) => (
                  <a
                    key={site.name}
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sounds.playClick()}
                    className="p-3.5 rounded-2xl bg-[#F4F3F1] hover:bg-[#ECEAE6] border border-[#0a0a0a]/15 flex items-center justify-between transition-all group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <Globe className="h-3.5 w-3.5 text-[#111111]" />
                        <span className="font-main font-bold text-xs sm:text-sm text-[#111111]">
                          {site.name}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#6b6b6b] mt-0.5">
                        {site.note}
                      </p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-[#8a8a8a] group-hover:text-[#111111] shrink-0 ml-2" />
                  </a>
                ))}
              </div>

              {/* Characteristics Checklist */}
              <div className="mt-6 pt-4 border-t border-[#0a0a0a]/10">
                <span className="text-[10px] font-mono text-[#6b6b6b] uppercase tracking-wider block mb-2">
                  CORE DESIGN RULES
                </span>
                <ul className="space-y-1.5 text-xs text-[#111111]">
                  {selectedAesthetic.characteristics.map((ch) => (
                    <li key={ch} className="flex items-start gap-2">
                      <span className="text-emerald-700 font-bold">✓</span>
                      <span>{ch}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="text-[11px] font-mono text-[#6b6b6b] pt-4 border-t border-[#0a0a0a]/10">
              Sabi Kit aesthetic constraint: "Minimal + Light + 2px Solid Frames + Halftone Stipple"
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
