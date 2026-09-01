import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Wrench, 
  Layers, 
  Smartphone, 
  Brain, 
  Volume2, 
  VolumeX, 
  ChevronLeft, 
  ChevronRight, 
  ArrowUpRight, 
  Sparkles,
  Search,
  BookOpen,
  Compass
} from 'lucide-react';
import { sounds } from '../../utils/audio';

export type PageView = 'home' | 'workspace' | 'framework' | 'widgets' | 'laws' | 'resources';

interface SidebarProps {
  activePage: PageView;
  setActivePage: (page: PageView) => void;
  openSlideDrawer: () => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  activePage, 
  setActivePage, 
  openSlideDrawer,
  isCollapsed,
  setIsCollapsed
}) => {
  const [isMuted, setIsMuted] = useState(sounds.isMuted());
  const [timeString, setTimeString] = useState('');

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.location.hash = page;
  };

  const handleSoundToggle = () => {
    const nextMuted = sounds.toggleMute();
    setIsMuted(nextMuted);
  };

  const navItems: { id: PageView; label: string; sub: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: 'Overview', sub: 'Hero & Insights', icon: Home },
    { id: 'workspace', label: 'Workspace', sub: 'Active Tool Suite', icon: Wrench },
    { id: 'framework', label: 'Framework', sub: '28-Stage Docs', icon: Layers },
    { id: 'widgets', label: 'Essential Widgets', sub: 'Widget Matrix', icon: Smartphone },
    { id: 'laws', label: 'Laws of UX', sub: 'Cognitive Lab', icon: Brain },
    { id: 'resources', label: 'Design Vault', sub: '32+ Curated Links', icon: Compass },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-40 bg-[#F4F3F1] border-r-2 border-[#0a0a0a] flex flex-col justify-between transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-20' : 'w-20 md:w-64'
      }`}
    >
      {/* Top Header & Brand */}
      <div>
        <div className="h-16 px-4 border-b-2 border-[#0a0a0a]/10 flex items-center justify-between">
          <div
            onClick={() => handlePageChange('home')}
            className="flex items-center gap-3 cursor-pointer group overflow-hidden"
          >
            {/* 2x2 Checkerboard Rotated Diamond Mark */}
            <svg className="w-5 h-5 shrink-0 block transform rotate-45" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0" y="0" width="10" height="10" fill="#111111" />
              <rect x="10" y="0" width="10" height="10" fill="#F4F3F1" stroke="#111111" strokeWidth="1.2" />
              <rect x="0" y="10" width="10" height="10" fill="#F4F3F1" stroke="#111111" strokeWidth="1.2" />
              <rect x="10" y="10" width="10" height="10" fill="#111111" />
            </svg>

            {!isCollapsed && (
              <div className="hidden md:flex flex-col">
                <span className="font-main font-black text-base tracking-tight text-[#111111] leading-none">
                  Sabi Kit
                </span>
                <span className="font-mono text-[8px] text-[#8a8a8a] tracking-wider uppercase mt-0.5 font-bold">
                  PROJECT OS V1.0
                </span>
              </div>
            )}
          </div>

          <button
            onClick={() => {
              sounds.playPop();
              setIsCollapsed(!isCollapsed);
            }}
            className="p-1 rounded-full text-[#6b6b6b] hover:text-[#111111] hover:bg-white border border-transparent hover:border-[#0a0a0a]/15 transition-all"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        {/* Primary Page Navigation Links */}
        <nav className="p-3 space-y-1.5">
          {!isCollapsed && (
            <span className="hidden md:block text-[9px] font-mono font-bold uppercase tracking-widest text-[#8a8a8a] px-3 py-1">
              PAGES & WORKSPACES
            </span>
          )}

          {navItems.map((item) => {
            const isActive = activePage === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handlePageChange(item.id)}
                className={`w-full p-2.5 rounded-2xl flex items-center gap-3 transition-all text-left ${
                  isActive
                    ? 'bg-[#111111] text-white shadow-md font-bold'
                    : 'text-[#111111] hover:bg-white/80 hover:border-[#0a0a0a]/15'
                }`}
                title={item.label}
              >
                <span className={`p-1.5 rounded-xl flex items-center justify-center shrink-0 ${
                  isActive ? 'bg-white/10 text-emerald-400' : 'bg-white border border-[#0a0a0a]/10 text-[#111111]'
                }`}>
                  <Icon className="h-4 w-4" />
                </span>

                {!isCollapsed && (
                  <div className="hidden md:block flex-1 min-w-0">
                    <div className="text-xs font-main truncate leading-tight">
                      {item.label}
                    </div>
                    <div className={`text-[9px] font-mono truncate ${
                      isActive ? 'text-white/70' : 'text-[#8a8a8a]'
                    }`}>
                      {item.sub}
                    </div>
                  </div>
                )}

                {!isCollapsed && isActive && (
                  <span className="hidden md:block h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Controls & Telemetry (Unified Dark Base) */}
      <div className="p-3 border-t-2 border-[#0a0a0a] bg-[#111111] text-white space-y-2">
        {/* 28 Slides Directory Drawer Trigger */}
        <button
          onClick={() => {
            sounds.playWhoosh();
            openSlideDrawer();
          }}
          className={`w-full p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-white shadow-sm flex items-center gap-2.5 text-xs font-main font-bold transition-all ${
            isCollapsed ? 'justify-center' : 'justify-center md:justify-between'
          }`}
          title="28-Slide Master Deck Directory"
        >
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-emerald-400 shrink-0" />
            {!isCollapsed && <span className="hidden md:inline">28 Slides Index</span>}
          </div>
          {!isCollapsed && (
            <span className="hidden md:inline px-1.5 py-0.5 rounded-md bg-white/15 text-[9px] font-mono text-white/80">
              ⌘K
            </span>
          )}
        </button>

        {/* Audio Soundboard & Telemetry Row */}
        <div className={`flex items-center gap-2 ${isCollapsed ? 'flex-col' : 'flex-col md:flex-row md:justify-between'}`}>
          <button
            onClick={handleSoundToggle}
            className="p-2 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-white/80 hover:text-white transition-colors shadow-sm"
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>

          {!isCollapsed && (
            <div className="hidden md:block flex-1 text-right text-[10px] font-mono text-white/60 pr-1">
              <span className="font-bold text-white">{timeString}</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
