import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, Globe, Smartphone, LayoutDashboard, ShoppingBag, Rocket, Shield, Activity, Sparkles, CheckCircle2 } from 'lucide-react';
import { sounds } from '../../utils/audio';

const PROJECT_TYPES = [
  { name: 'Marketing Websites', icon: Globe, frames: '8 – 15 Frames', desc: 'Hero landing pages, conversion funnels & storytelling.' },
  { name: 'SaaS Systems', icon: Layers, frames: '20 – 30 Frames', desc: 'Complex workflows, multi-tenant matrices & settings.' },
  { name: 'Mobile Apps', icon: Smartphone, frames: '15 – 25 Frames', desc: 'iOS & Android native ergonomics with 44px tap targets.' },
  { name: 'Dashboards', icon: LayoutDashboard, frames: '10 – 20 Frames', desc: 'High-density telemetry, charts & real-time controls.' },
  { name: 'E-Commerce', icon: ShoppingBag, frames: '12 – 22 Frames', desc: 'Product catalogs, faceted search & 1-click checkouts.' },
  { name: 'MVPs & Startups', icon: Rocket, frames: '8 – 12 Frames', desc: 'Rapid validation prototypes for early investment.' },
  { name: 'Enterprise Portals', icon: Shield, frames: '30 – 60+ Frames', desc: 'SOC2/HIPAA compliance, SAML/SSO & audit logs.' },
  { name: 'Fintech & Crypto', icon: Activity, frames: '20 – 35 Frames', desc: 'Treasury management, ledger views & fraud gating.' },
];

export const PurposeSection: React.FC = () => {
  const [selectedType, setSelectedType] = useState(1);

  return (
    <section id="purpose" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F4F3F1] text-[#111111] border-b-2 border-[#0a0a0a] relative">
      <div className="max-w-7xl mx-auto">
        {/* Header Bar */}
        <div className="flex items-center justify-between gap-4 border-b-2 border-[#0a0a0a]/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="h-7 w-7 rounded-full bg-[#1a1a1a] text-white font-mono font-bold text-xs flex items-center justify-center">
              01
            </span>
            <span className="font-main font-bold uppercase tracking-wider text-xs text-[#111111]">
              PROJECT PURPOSE & SCALABLE SCOPE
            </span>
          </div>
          <span className="font-mono text-xs text-[#6b6b6b]">SABI OS V1.0 • ARCHETYPE MATRIX</span>
        </div>

        {/* 2-Line Headline */}
        <div className="mt-10 mb-8 max-w-3xl">
          <h2 className="text-3xl sm:text-5xl font-main tracking-tight leading-[1.1]">
            <span className="voral-headline-1">Enforcing scalable logic</span>
            <span className="voral-headline-2">across all digital archetypes.</span>
          </h2>
          <p className="mt-3 text-base text-[#6b6b6b] leading-relaxed">
            From single landing pages to enterprise financial portals, Sabi OS establishes mathematical certainty and eliminates design ambiguity.
          </p>
        </div>

        {/* 8 Supported Project Types Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROJECT_TYPES.map((pt, idx) => {
            const isSelected = selectedType === idx;
            const Icon = pt.icon;
            return (
              <div
                key={pt.name}
                onClick={() => {
                  sounds.playClick();
                  setSelectedType(idx);
                }}
                className={`p-6 rounded-3xl cursor-pointer transition-all duration-200 border-2 flex flex-col justify-between h-56 ${
                  isSelected
                    ? 'bg-white border-[#0a0a0a] shadow-xl scale-[1.02] ring-2 ring-[#0a0a0a]'
                    : 'bg-white/70 border-[#0a0a0a]/10 hover:border-[#0a0a0a]/40 shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="h-9 w-9 rounded-2xl bg-[#F4F3F1] border border-[#0a0a0a]/10 flex items-center justify-center text-[#111111]">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#1a1a1a] text-white text-[10px] font-mono font-bold">
                      {pt.frames}
                    </span>
                  </div>

                  <h3 className="font-main font-bold text-base text-[#111111]">
                    {pt.name}
                  </h3>
                  <p className="text-xs text-[#6b6b6b] mt-1.5 leading-relaxed">
                    {pt.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#0a0a0a]/5 flex items-center justify-between text-[11px] font-mono text-[#6b6b6b]">
                  <span>Scope Archetype</span>
                  {isSelected && <span className="text-emerald-700 font-bold">Selected</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
