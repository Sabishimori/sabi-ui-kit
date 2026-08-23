import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Layers, Menu, X, ArrowLeft, ArrowUpRight } from 'lucide-react';
import { sounds } from '../../utils/audio';

interface NavbarProps {
  openSlideDrawer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ openSlideDrawer }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(sounds.isMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState('01-04 Strategy');

  useEffect(() => {
    const onScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSoundToggle = () => {
    const nextMuted = sounds.toggleMute();
    setIsMuted(nextMuted);
  };

  // 7 Groups representing 4 slides each across all 28 slides
  const navGroups = [
    { label: '01–04 Strategy', href: '#strategy', sub: 'Purpose & Flow' },
    { label: '05–08 Context', href: '#context', sub: 'Taxonomy & Models' },
    { label: '09–12 Research', href: '#research', sub: 'Persona & Journey' },
    { label: '13–16 Architecture', href: '#architecture', sub: 'Flows & Wireframes' },
    { label: '17–20 System', href: '#system', sub: 'Tokens & Grid' },
    { label: '21–24 Components', href: '#components-flow', sub: 'Atomic UI & Hi-Fi' },
    { label: '25–28 Delivery', href: '#delivery', sub: 'QA & Handoff' },
  ];

  return (
    <header className="sticky top-0 left-0 right-0 z-40 bg-[#F4F3F1]/95 backdrop-blur-md border-b-2 border-[#0a0a0a]">
      {/* Top Thin Progress Line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#0a0a0a]/10">
        <div
          className="h-full bg-[#111111] transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 flex items-center justify-between gap-3">
        {/* Left: Compact Circular Back Button & Brand */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              sounds.playClick();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-7 h-7 rounded-full bg-[#1a1a1a] text-white flex items-center justify-center shadow-sm hover:scale-105 active:scale-95 transition-all shrink-0"
            aria-label="Back to top"
            title="Scroll to Top"
          >
            <ArrowLeft className="h-3 w-3 text-white" />
          </button>

          <a
            href="#hero"
            onClick={() => sounds.playClick()}
            className="flex items-center gap-2 text-[#111111] no-underline group"
          >
            {/* 2x2 Checkerboard Mark */}
            <svg className="w-4 h-4 block transform rotate-45" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0" y="0" width="10" height="10" fill="#111111" />
              <rect x="10" y="0" width="10" height="10" fill="#F4F3F1" stroke="#111111" strokeWidth="1.2" />
              <rect x="0" y="10" width="10" height="10" fill="#F4F3F1" stroke="#111111" strokeWidth="1.2" />
              <rect x="10" y="10" width="10" height="10" fill="#111111" />
            </svg>
            <div className="flex items-baseline gap-1.5">
              <span className="font-main font-black text-sm tracking-tight text-[#111111]">
                Sabi Kit
              </span>
              <span className="font-mono text-[8px] text-[#8a8a8a] tracking-wider uppercase hidden sm:inline">
                OS V1.0
              </span>
            </div>
          </a>
        </div>

        {/* Center: 7 Chapter Groups (Small, sleek text) */}
        <nav className="hidden lg:flex items-center gap-1 bg-white border border-[#0a0a0a]/15 p-0.5 rounded-full shadow-sm">
          {navGroups.map((g) => {
            const isActive = activeGroup === g.label;
            return (
              <a
                key={g.label}
                href={g.href}
                onClick={() => {
                  sounds.playClick();
                  setActiveGroup(g.label);
                }}
                className={`px-2.5 py-1 rounded-full text-[10.5px] font-main transition-all ${
                  isActive
                    ? 'bg-[#1a1a1a] text-white font-bold shadow-sm'
                    : 'text-[#6b6b6b] font-medium hover:text-[#111111] hover:bg-[#F4F3F1]'
                }`}
              >
                <span>{g.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Right: Actions (Sleek and compact) */}
        <div className="flex items-center gap-2">
          {/* 28 Slides Drawer Button */}
          <button
            onClick={() => {
              sounds.playWhoosh();
              openSlideDrawer();
            }}
            className="voral-btn-pill py-1.5 px-3 text-[11px] shadow-sm font-semibold flex items-center gap-1.5"
            title="Browse all 28 project slides"
          >
            <Layers className="h-3 w-3" />
            <span>28 Slides</span>
          </button>

          {/* Audio Toggle */}
          <button
            onClick={handleSoundToggle}
            className="p-1.5 rounded-full border border-[#0a0a0a]/15 bg-white text-[#6b6b6b] hover:text-[#111111] hover:bg-[#ECEAE6] transition-colors shadow-sm"
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            aria-label="Toggle Sound"
          >
            {isMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 lg:hidden text-[#111111] rounded-full border border-[#0a0a0a]/15 bg-white shadow-sm"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="h-3.5 w-3.5" /> : <Menu className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F4F3F1] border-b-2 border-[#0a0a0a] px-4 py-3 space-y-1.5">
          <div className="text-[9px] font-mono text-[#8a8a8a] uppercase tracking-wider mb-1 font-bold">
            28 SLIDES • 7 CHAPTER GROUPS
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {navGroups.map((g) => (
              <a
                key={g.label}
                href={g.href}
                onClick={() => {
                  sounds.playClick();
                  setActiveGroup(g.label);
                  setMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-xl text-xs font-semibold text-[#111111] bg-white border border-[#0a0a0a]/15 flex items-center justify-between shadow-sm"
              >
                <div>
                  <div className="font-bold text-[11px]">{g.label}</div>
                  <div className="text-[9px] text-[#6b6b6b] font-mono">{g.sub}</div>
                </div>
                <ArrowUpRight className="h-3 w-3 text-[#8a8a8a]" />
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
