import React, { useState, useEffect } from 'react';
import { ArrowUp, Sparkles, Terminal, Copy, Check, Volume2, Play, Layers, Compass, Cpu, Palette, ShieldCheck, Heart } from 'lucide-react';
import { sounds } from '../../utils/audio';

export const Footer: React.FC = () => {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(now.toUTCString().slice(17, 25) + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    sounds.playWhoosh();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copySnippet = (name: string, content: string) => {
    sounds.playChime();
    navigator.clipboard.writeText(content);
    setCopiedToken(name);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const chapters = [
    { title: '01–04 Strategy', href: '#strategy', desc: 'Purpose, Flow & Dashboard' },
    { title: '05–08 Context', href: '#context', desc: 'Pillars, Domains & Monetization' },
    { title: '09–12 Research', href: '#research', desc: 'Competitors, Persona & Journey' },
    { title: '13–16 Architecture', href: '#architecture', desc: 'Flows, IA & Wireframes' },
    { title: '17–20 System', href: '#system', desc: 'Visual, Colors, Type & Grid' },
    { title: '21–24 Components', href: '#components-flow', desc: 'Atomic Suite & Hi-Fi Pipeline' },
    { title: '25–28 Delivery', href: '#delivery', desc: 'QA Checklist, File Org & Handoff' },
  ];

  return (
    <footer className="bg-[#F4F3F1] text-[#111111] border-t-2 border-[#0a0a0a] pt-16 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Top Row: Brand & Live Telemetry */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-12 border-b-2 border-[#0a0a0a]/10">
          <div>
            <div className="flex items-center gap-3">
              {/* 2x2 Checkerboard Mark */}
              <svg className="w-6 h-6 block transform rotate-45" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0" y="0" width="10" height="10" fill="#111111" />
                <rect x="10" y="0" width="10" height="10" fill="#F4F3F1" stroke="#111111" strokeWidth="1.2" />
                <rect x="0" y="10" width="10" height="10" fill="#F4F3F1" stroke="#111111" strokeWidth="1.2" />
                <rect x="10" y="10" width="10" height="10" fill="#111111" />
              </svg>
              <span className="font-main font-black text-2xl tracking-tight text-[#111111]">
                Sabi Kit OS
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#1a1a1a] text-white text-[10px] font-mono font-bold">
                V1.0 STABLE
              </span>
            </div>
            <p className="mt-2 text-sm text-[#6b6b6b] max-w-md leading-relaxed font-normal">
              The 28-stage master design framework and operational operating system for modern product teams, agencies, and design engineers.
            </p>
          </div>

          {/* Telemetry Status Box */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="px-4 py-2.5 rounded-2xl bg-white border border-[#0a0a0a]/15 shadow-sm text-xs font-mono">
              <span className="text-[#8a8a8a] block text-[10px] uppercase font-bold">SYSTEM TIME</span>
              <span className="font-bold text-[#111111]">{timeString || '12:00:00 UTC'}</span>
            </div>

            <div className="px-4 py-2.5 rounded-2xl bg-white border border-[#0a0a0a]/15 shadow-sm text-xs font-mono">
              <span className="text-[#8a8a8a] block text-[10px] uppercase font-bold">TOTAL COVERAGE</span>
              <span className="font-bold text-emerald-700">28 / 28 Stages Active</span>
            </div>

            <button
              onClick={scrollToTop}
              className="voral-btn-pill py-3 px-5 text-xs shadow-md"
            >
              <span>Back to Top</span>
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Middle Section 1: 7-Chapter Interactive Navigation Matrix */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#6b6b6b]">
              INTERACTIVE 7-CHAPTER DIRECTORY (28 SLIDES)
            </span>
            <span className="text-xs font-mono text-[#8a8a8a]">[Click to Smooth Scroll]</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-3">
            {chapters.map((ch, idx) => (
              <a
                key={ch.title}
                href={ch.href}
                onClick={() => sounds.playClick(500 + idx * 30)}
                className="p-4 rounded-2xl bg-white border border-[#0a0a0a]/15 hover:border-[#0a0a0a] hover:shadow-md transition-all group flex flex-col justify-between h-28"
              >
                <div>
                  <span className="font-mono text-[10px] text-[#8a8a8a] uppercase block font-bold">
                    CHAPTER 0{idx + 1}
                  </span>
                  <h4 className="font-main font-bold text-xs sm:text-sm text-[#111111] mt-0.5 group-hover:text-[#366299] transition-colors">
                    {ch.title}
                  </h4>
                </div>
                <p className="text-[11px] text-[#6b6b6b] line-clamp-1">
                  {ch.desc}
                </p>
              </a>
            ))}
          </div>
        </div>

        {/* Middle Section 2: Interactive Soundboard & Token Copier Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Quick Code Tokens Copier */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#0a0a0a] shadow-xl space-y-4 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#6b6b6b] block mb-1">
                ONE-CLICK CODE TOKENS EXPORTER
              </span>
              <h4 className="font-main font-bold text-lg text-[#111111]">
                Quick Copy Production Ready Assets
              </h4>
              <p className="text-xs text-[#6b6b6b] mt-1 mb-4">
                Instantly copy design tokens, CSS variables, and Figma structure strings directly into your project codebase.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  {
                    name: 'CSS Variables',
                    content: `:root {
  --sabi-bg: #F4F3F1;
  --sabi-card: #FFFFFF;
  --sabi-border: #0a0a0a;
  --sabi-dark: #111111;
  --sabi-btn: #1a1a1a;
  --sabi-accent: #366299;
}`
                  },
                  {
                    name: 'Tailwind Color Tokens',
                    content: `colors: {
  sabi: {
    bg: '#F4F3F1',
    card: '#FFFFFF',
    border: '#0a0a0a',
    dark: '#111111',
    btn: '#1a1a1a',
    accent: '#366299'
  }
}`
                  },
                  {
                    name: 'Figma Relational String',
                    content: `[PROJECT] / [PLATFORM] / [SECTION] / [SCREEN] / [STATE]`
                  },
                  {
                    name: 'Sabi OS Master Rule',
                    content: `28 Stages • Minimal + Light + 2px Solid Black Frames + Halftone Stipple Vector Art`
                  }
                ].map((item) => (
                  <button
                    key={item.name}
                    onClick={() => copySnippet(item.name, item.content)}
                    className="p-3.5 rounded-2xl bg-[#F4F3F1] border border-[#0a0a0a]/15 hover:border-[#0a0a0a] text-left transition-all flex items-center justify-between text-xs font-semibold group"
                  >
                    <div>
                      <span className="font-main font-bold text-[#111111] block">
                        {item.name}
                      </span>
                      <span className="font-mono text-[10px] text-[#8a8a8a]">
                        {copiedToken === item.name ? 'Copied to Clipboard!' : 'Click to Copy'}
                      </span>
                    </div>
                    {copiedToken === item.name ? (
                      <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                    ) : (
                      <Copy className="h-4 w-4 text-[#8a8a8a] group-hover:text-[#111111] shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-[11px] font-mono text-[#6b6b6b] pt-3 border-t border-[#0a0a0a]/10">
              Synced with Sabi Kit V1.0 Master Design Tokens JSON.
            </div>
          </div>

          {/* Right: Interactive UI Audio Soundboard */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#0a0a0a] shadow-xl space-y-4 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#6b6b6b] block mb-1">
                WEB AUDIO SOUNDBOARD
              </span>
              <h4 className="font-main font-bold text-lg text-[#111111]">
                Tactile Audio Feedback Engine
              </h4>
              <p className="text-xs text-[#6b6b6b] mt-1 mb-4">
                Test the synthesized Web Audio oscillators used across Sabi Kit micro-interactions.
              </p>

              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { name: 'Button Click', fn: () => sounds.playClick(600) },
                  { name: 'Toggle Pop', fn: () => sounds.playPop() },
                  { name: 'Modal Whoosh', fn: () => sounds.playWhoosh() },
                  { name: 'Success Chime', fn: () => sounds.playChime() },
                ].map((snd) => (
                  <button
                    key={snd.name}
                    onClick={snd.fn}
                    className="p-3.5 rounded-2xl bg-[#F4F3F1] border border-[#0a0a0a]/15 hover:bg-[#1a1a1a] hover:text-white transition-all text-xs font-main font-bold flex items-center justify-between group"
                  >
                    <span>{snd.name}</span>
                    <Volume2 className="h-4 w-4 text-[#8a8a8a] group-hover:text-white" />
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#F4F3F1] border border-[#0a0a0a]/10 flex items-center justify-between text-xs font-mono">
              <span className="text-[#6b6b6b]">Zero External Audio Files</span>
              <span className="font-bold text-emerald-700">Pure Web Audio API</span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Guarantee */}
        <div className="pt-8 border-t-2 border-[#0a0a0a]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#6b6b6b]">
          <div>
            © 2026 Sabi Kit UI/UX Project Operating System. Built with mathematical precision.
          </div>

          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-600" />
            <span className="text-[#111111] font-bold">28 Master Slides Fully Compiled</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
