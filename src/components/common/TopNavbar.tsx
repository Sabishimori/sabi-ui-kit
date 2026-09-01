import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Wrench, 
  Layers, 
  Smartphone, 
  Brain, 
  Volume2, 
  VolumeX, 
  Compass, 
  Menu, 
  X
} from 'lucide-react';
import { sounds } from '../../utils/audio';

import { AnimatedLogo } from './AnimatedLogo';

export type PageView = 'home' | 'workspace' | 'framework' | 'widgets' | 'laws' | 'resources';

interface TopNavbarProps {
  activePage: PageView;
  setActivePage: (page: PageView) => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({ 
  activePage, 
  setActivePage 
}) => {
  const [isMuted, setIsMuted] = useState(sounds.isMuted());
  const [timeString, setTimeString] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
      });
      setTimeString(`${timeStr} IST`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handlePageChange = (page: PageView) => {
    sounds.playClick();
    setActivePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.location.hash = page;
  };

  const handleSoundToggle = () => {
    const nextMuted = sounds.toggleMute();
    setIsMuted(nextMuted);
  };

  const navItems: { id: PageView; label: string; badge?: string }[] = [
    { id: 'home', label: 'Overview' },
    { id: 'workspace', label: 'Workspace & Tools' },
    { id: 'framework', label: 'Product Framework' },
    { id: 'widgets', label: 'Essential Widgets' },
    { id: 'laws', label: 'Laws of UX' },
    { id: 'resources', label: 'Design Vault', badge: '100+' },
  ];

  return (
    <header className="fixed top-3 sm:top-4 left-0 right-0 z-50 w-full pointer-events-none select-none px-3 sm:px-6 lg:px-10 2xl:px-16">
      <div className="max-w-[1780px] mx-auto pointer-events-auto">
        {/* Unified Horizontal Floating Glass Capsule */}
        <div className="w-full h-14 sm:h-16 px-4 sm:px-6 rounded-full bg-black/75 hover:bg-black/85 backdrop-blur-2xl border border-white/[0.12] shadow-2xl shadow-black/40 flex items-center justify-between gap-4 transition-all duration-300">
          
          {/* Left: Brand Identity with Large 12 FPS Animated Looping Logo */}
          <div 
            onClick={() => handlePageChange('home')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <AnimatedLogo size={36} border rounded className="shadow-lg hover:scale-105 transition-transform" />

            <div className="flex items-center gap-1.5">
              <span className="font-main font-black text-base sm:text-lg tracking-tight text-white leading-none">
                Sabi Kit
              </span>
              <span className="px-1.5 py-0.5 rounded bg-white/10 text-white/50 text-[10px] font-mono font-bold">
                V1.0
              </span>
            </div>
          </div>

          {/* Center: Desktop Navigation Pills */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handlePageChange(item.id)}
                  className={`px-3 py-1.5 2xl:px-4 2xl:py-2 rounded-full text-xs font-main transition-all duration-200 relative flex items-center gap-1.5 whitespace-nowrap ${
                    isActive
                      ? 'bg-white/15 text-white font-bold shadow-inner'
                      : 'text-white/70 hover:text-white hover:bg-white/10 font-medium'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`px-1.5 py-0.5 rounded-full text-[9.5px] font-mono font-bold ${
                      isActive ? 'bg-emerald-400 text-black' : 'bg-white/15 text-emerald-300'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: Sound Toggle & UTC Clock */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            
            {/* Audio Feedback Toggle */}
            <button
              onClick={handleSoundToggle}
              className={`p-2 rounded-full border transition-all ${
                isMuted
                  ? 'bg-white/5 border-white/10 text-white/40 hover:text-white/70'
                  : 'bg-emerald-500/20 border-emerald-400/40 text-emerald-300 hover:bg-emerald-500/30'
              }`}
              title={isMuted ? 'Unmute UI Sounds' : 'Mute UI Sounds'}
            >
              {isMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
            </button>

            {/* Live Clock / Location Pill (Indian Bangalore Time) */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-white/80 font-mono text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{timeString || '18:30 IST'}</span>
            </div>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 p-3 rounded-3xl bg-black/90 backdrop-blur-2xl border border-white/10 shadow-2xl space-y-1">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handlePageChange(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-main flex items-center justify-between transition-colors ${
                    isActive 
                      ? 'bg-white/20 text-white font-bold' 
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-400 text-black text-[10px] font-mono font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};
