import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Type, Sliders, Sparkles, Upload, RefreshCw, Check, Globe } from 'lucide-react';
import { sounds } from '../../utils/audio';

const PRESET_FONTS = [
  { name: 'Plus Jakarta Sans', category: 'Modern Geometric (Sabi Kit)', googleFont: 'Plus+Jakarta+Sans:wght@400;600;800' },
  { name: 'Outfit', category: 'Display Geometric', googleFont: 'Outfit:wght@400;600;800' },
  { name: 'DM Sans', category: 'High-Legibility Body', googleFont: 'DM+Sans:wght@400;500;700' },
  { name: 'Space Mono', category: 'Precision Monospace (Sabi Kit)', googleFont: 'Space+Mono:wght@400;700' },
  { name: 'Space Grotesk', category: 'Technical Grotesque', googleFont: 'Space+Grotesk:wght@400;600;700' },
  { name: 'JetBrains Mono', category: 'Developer Monospace', googleFont: 'JetBrains+Mono:wght@400;600' }
];

export const TypographySection: React.FC = () => {
  const [selectedFont, setSelectedFont] = useState('Plus Jakarta Sans');
  const [customFontName, setCustomFontName] = useState('');
  const [customText, setCustomText] = useState('Architect Digital Products with Sabi UI/UX Kit');
  const [uploadedFontLoaded, setUploadedFontLoaded] = useState(false);

  const handleSelectFont = (fontName: string, googleQuery?: string) => {
    sounds.playPop();
    setSelectedFont(fontName);

    if (googleQuery) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = `https://fonts.googleapis.com/css2?family=${googleQuery}&display=swap`;
      document.head.appendChild(link);
    }
  };

  const handleCustomGoogleFont = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customFontName.trim()) return;
    const formatted = customFontName.trim();
    const query = formatted.replace(/\s+/g, '+');
    handleSelectFont(formatted, `${query}:wght@400;600;800`);
    setCustomFontName('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    sounds.playChime();
    const fontName = file.name.replace(/\.[^/.]+$/, '');
    const reader = new FileReader();

    reader.onload = async (event) => {
      try {
        const buffer = event.target?.result as ArrayBuffer;
        const fontFace = new FontFace(fontName, buffer);
        await fontFace.load();
        document.fonts.add(fontFace);
        setSelectedFont(fontName);
        setUploadedFontLoaded(true);
      } catch (err) {
        console.error('Error loading font:', err);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <section id="typography" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F4F3F1] text-[#111111] border-b-2 border-[#0a0a0a] relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b-2 border-[#0a0a0a]/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="h-7 w-7 rounded-full bg-[#1a1a1a] text-white font-mono font-bold text-xs flex items-center justify-center">
              19
            </span>
            <span className="font-main font-bold uppercase tracking-wider text-xs text-[#111111]">
              DYNAMIC TYPOGRAPHY ENGINE & CUSTOM UPLOADER
            </span>
          </div>
          <span className="font-mono text-xs text-[#6b6b6b]">SABI OS V1.0 • TYPE SPECIMEN</span>
        </div>

        <div className="mt-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl sm:text-5xl font-main tracking-tight leading-[1.1]">
              <span className="voral-headline-1">Dynamic Typography Studio</span>
              <span className="voral-headline-2">and Live Client Font Uploader.</span>
            </h2>
            <p className="mt-3 text-base text-[#6b6b6b] leading-relaxed max-w-2xl">
              Pair geometric headlines with high-legibility body prose. Upload any TTF/WOFF2 font file or enter any Google Font name to test typography live.
            </p>
          </div>

          {/* Local Font File Uploader */}
          <div className="relative">
            <label className="voral-btn-pill-light cursor-pointer shadow-sm">
              <Upload className="h-4 w-4 text-[#111111]" />
              <span>{uploadedFontLoaded ? `Active: ${selectedFont}` : 'Upload Font (.ttf / .woff2)'}</span>
              <input
                type="file"
                accept=".ttf,.woff,.woff2,.otf"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Font Presets & Google Font Query Bar */}
        <div className="mt-8 p-4 rounded-2xl bg-white border-2 border-[#0a0a0a] shadow-sm flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Presets */}
          <div className="flex flex-wrap items-center gap-1.5 w-full lg:w-auto">
            {PRESET_FONTS.map((f) => (
              <button
                key={f.name}
                onClick={() => handleSelectFont(f.name, f.googleFont)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-main font-bold transition-all border ${
                  selectedFont === f.name
                    ? 'bg-[#1a1a1a] text-white border-[#0a0a0a]'
                    : 'bg-[#F4F3F1] text-[#111111] border-[#0a0a0a]/10 hover:bg-[#ECEAE6]'
                }`}
              >
                {f.name}
              </button>
            ))}
          </div>

          {/* Load Any Google Font Form */}
          <form onSubmit={handleCustomGoogleFont} className="flex items-center gap-2 w-full lg:w-auto">
            <Globe className="h-4 w-4 text-[#8a8a8a] shrink-0 hidden sm:block" />
            <input
              type="text"
              placeholder="Load Google Font (e.g. Syne, Inter)..."
              value={customFontName}
              onChange={(e) => setCustomFontName(e.target.value)}
              className="px-3.5 py-2 text-xs font-main rounded-full bg-[#F4F3F1] border border-[#0a0a0a]/15 focus:outline-none focus:ring-2 focus:ring-[#111111] w-full sm:w-60"
            />
            <button
              type="submit"
              className="voral-btn-pill py-2 px-4 text-xs font-bold whitespace-nowrap"
            >
              Load Font
            </button>
          </form>
        </div>

        {/* Specimen Live Playground with Scale Breakdowns */}
        <div className="mt-8 bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#0a0a0a] shadow-xl space-y-8">
          {/* Interactive Custom Sentence Input */}
          <div className="border-b border-[#0a0a0a]/10 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <input
              type="text"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Type your custom specimen sentence..."
              className="w-full text-base font-medium text-[#111111] bg-[#F4F3F1] px-4 py-2.5 rounded-full border border-[#0a0a0a]/15 focus:outline-none focus:ring-2 focus:ring-[#111111]"
            />
            <span className="text-xs font-mono text-[#111111] font-bold whitespace-nowrap px-3 py-1 bg-[#F4F3F1] rounded-full border border-[#0a0a0a]/10">
              Active Font: {selectedFont}
            </span>
          </div>

          {/* 6 Typography Scales Rendered with the Active Font */}
          <div className="space-y-6 divide-y divide-[#0a0a0a]/10" style={{ fontFamily: selectedFont }}>
            {/* Display */}
            <div className="pt-4 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
              <span className="font-mono text-xs text-[#8a8a8a] uppercase w-36 shrink-0 font-bold">
                Display • 56px
              </span>
              <div className="flex-1 text-3xl sm:text-5xl md:text-6xl font-black text-[#111111] tracking-tight leading-none">
                {customText}
              </div>
            </div>

            {/* H1 Heading */}
            <div className="pt-6 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
              <span className="font-mono text-xs text-[#8a8a8a] uppercase w-36 shrink-0 font-bold">
                H1 • 40px
              </span>
              <div className="flex-1 text-2xl sm:text-4xl font-bold text-[#111111] tracking-tight leading-tight">
                {customText}
              </div>
            </div>

            {/* H2 Heading */}
            <div className="pt-6 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
              <span className="font-mono text-xs text-[#8a8a8a] uppercase w-36 shrink-0 font-bold">
                H2 • 28px
              </span>
              <div className="flex-1 text-xl sm:text-2xl font-semibold text-[#111111]">
                {customText}
              </div>
            </div>

            {/* Body Large */}
            <div className="pt-6 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
              <span className="font-mono text-xs text-[#8a8a8a] uppercase w-36 shrink-0 font-bold">
                Body Large • 18px
              </span>
              <div className="flex-1 text-base sm:text-lg text-[#111111]/80 leading-relaxed font-normal">
                {customText} — Sabi Kit enforces rigorous typographic hierarchy across all digital surfaces.
              </div>
            </div>

            {/* Caption & Label */}
            <div className="pt-6 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
              <span className="font-mono text-xs text-[#8a8a8a] uppercase w-36 shrink-0 font-bold">
                Caption • 12px
              </span>
              <div className="flex-1 text-xs font-mono uppercase tracking-widest text-[#111111] font-bold">
                METADATA TOKEN • {selectedFont.toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
