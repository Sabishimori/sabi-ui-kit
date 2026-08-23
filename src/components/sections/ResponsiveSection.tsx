import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Monitor, Tablet, Smartphone, Sparkles, CheckCircle2 } from 'lucide-react';
import { sounds } from '../../utils/audio';

const VIEWPORTS = [
  {
    id: 'desktop',
    name: 'Desktop Display',
    range: '1200px – 1440px+',
    icon: Monitor,
    nav: 'Permanent Left Sidebar or full top horizontal bar',
    cols: '12-Column Responsive Grid • 24px Gutters • 80px Margins',
    type: 'Display 56px, H1 40px, Body 15px with 1.5 line height',
    complex: 'Full virtualized data tables, multi-column bento matrices',
    widthClass: 'w-full max-w-4xl',
  },
  {
    id: 'tablet',
    name: 'Tablet & iPad',
    range: '768px – 1024px',
    icon: Tablet,
    nav: 'Collapsible slide drawer or top action bar',
    cols: '8-Column Responsive Grid • 16px Gutters • 32px Margins',
    type: 'Headings scale down ~15%. Body text stays at 15px',
    complex: 'Horizontal swipe galleries, modal sheets from bottom',
    widthClass: 'w-full max-w-xl',
  },
  {
    id: 'mobile',
    name: 'Mobile Phone',
    range: '320px – 480px',
    icon: Smartphone,
    nav: 'Fixed Bottom Navigation Bar (56px) or Hamburger Sheet',
    cols: '4-Column Single Stack Grid • 12px Gutters • 16px Margins',
    type: 'Display 32px, H1 24px, 44px minimum tap targets',
    complex: 'Full bottom drawer sheets, progressive accordion cards',
    widthClass: 'w-full max-w-xs',
  },
];

export const ResponsiveSection: React.FC = () => {
  const [activeViewport, setActiveViewport] = useState(VIEWPORTS[0]);

  const handleSelect = (vp: typeof VIEWPORTS[0]) => {
    sounds.playPop();
    setActiveViewport(vp);
  };

  return (
    <section id="responsive" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F4F3F1] text-[#111111] border-b-2 border-[#0a0a0a] relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b-2 border-[#0a0a0a]/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="h-7 w-7 rounded-full bg-[#1a1a1a] text-white font-mono font-bold text-xs flex items-center justify-center">
              23
            </span>
            <span className="font-main font-bold uppercase tracking-wider text-xs text-[#111111]">
              RESPONSIVE LAYOUT & BREAKPOINT BEHAVIOR
            </span>
          </div>
          <span className="font-mono text-xs text-[#6b6b6b]">SABI OS V1.0 • MULTI-DEVICE REFLOW</span>
        </div>

        <div className="mt-10 mb-8 max-w-3xl">
          <h2 className="text-3xl sm:text-5xl font-main tracking-tight leading-[1.1]">
            <span className="voral-headline-1">Responsive Fluid Reflow</span>
            <span className="voral-headline-2">across Desktop, Tablet and Mobile.</span>
          </h2>
          <p className="mt-3 text-base text-[#6b6b6b] leading-relaxed">
            Layouts adapt mathematically across all screens without awkward line breaks or squished tables. Switch device views below to test responsive simulation.
          </p>
        </div>

        {/* 3 Viewport Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          {VIEWPORTS.map((vp) => {
            const isSelected = activeViewport.id === vp.id;
            const Icon = vp.icon;
            return (
              <button
                key={vp.id}
                onClick={() => handleSelect(vp)}
                className={`p-5 rounded-3xl text-left transition-all duration-200 flex flex-col justify-between h-32 border-2 ${
                  isSelected
                    ? 'bg-[#1a1a1a] text-white border-[#0a0a0a] shadow-xl scale-105 z-10'
                    : 'bg-white text-[#111111] border-[#0a0a0a]/10 hover:border-[#0a0a0a]/40 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Icon className="h-5 w-5" />
                  <span className={`font-mono text-xs font-bold ${isSelected ? 'text-emerald-400' : 'text-[#8a8a8a]'}`}>
                    {vp.range}
                  </span>
                </div>
                <div>
                  <h4 className="font-main font-bold text-base">
                    {vp.name}
                  </h4>
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Viewport Simulation Canvas */}
        <div className="p-8 rounded-3xl bg-[#ECEAE6] border-2 border-[#0a0a0a] flex flex-col items-center justify-center space-y-6">
          <div className="text-xs font-mono font-bold text-[#111111] bg-white border border-[#0a0a0a]/15 px-4 py-1.5 rounded-full shadow-sm">
            Active Simulation: {activeViewport.name} ({activeViewport.range})
          </div>

          <motion.div
            key={activeViewport.id}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`bg-white border-2 border-[#0a0a0a] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 transition-all duration-300 ${activeViewport.widthClass}`}
          >
            {/* Nav Spec */}
            <div className="flex items-center justify-between border-b border-[#0a0a0a]/10 pb-4">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#6b6b6b]">
                NAVIGATION ARCHETYPE
              </span>
              <span className="text-xs font-main font-bold text-[#111111]">
                {activeViewport.nav}
              </span>
            </div>

            {/* Grid & Typo specs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#F4F3F1] border border-[#0a0a0a]/10 space-y-1">
                <span className="text-[10px] font-mono font-bold text-[#111111] uppercase">GRID & GUTTERS</span>
                <p className="text-xs text-[#6b6b6b]">{activeViewport.cols}</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F4F3F1] border border-[#0a0a0a]/10 space-y-1">
                <span className="text-[10px] font-mono font-bold text-[#111111] uppercase">TYPOGRAPHY SCALING</span>
                <p className="text-xs text-[#6b6b6b]">{activeViewport.type}</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 font-medium">
              ★ <strong>Component Behavior:</strong> {activeViewport.complex}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
