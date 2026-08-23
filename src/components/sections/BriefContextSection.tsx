import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Cpu, Users, Palette, Compass, Layers, CheckCircle2, PenTool, Sparkles, HelpCircle } from 'lucide-react';
import { sounds } from '../../utils/audio';

const PILLARS = [
  {
    id: 'business',
    category: 'MARKET STRATEGY',
    title: 'Business Strategy',
    icon: Building2,
    desc: 'What commercial objectives drive this build? Define the business outcomes, targeted KPIs, financial parameters, and monetization triggers.',
    sketchSvg: (
      <svg className="w-full h-32" viewBox="0 0 240 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 100 L60 80 L100 85 L140 50 L180 60 L220 20" stroke="#111111" strokeWidth="2.5" strokeDasharray="4 2" strokeLinecap="round" />
        <circle cx="220" cy="20" r="5" fill="#15803D" />
        <rect x="25" y="45" width="55" height="24" rx="4" stroke="#6b6b6b" strokeWidth="1.5" strokeDasharray="2 2" fill="none" />
        <text x="33" y="61" fontSize="9" fill="#111111" fontFamily="monospace" fontWeight="bold">ARR $1M+</text>
        <path d="M140 50 L140 100 M100 85 L100 100 M60 80 L60 100" stroke="#0a0a0a" strokeOpacity="0.15" strokeWidth="1.5" strokeDasharray="3 3" />
        <text x="130" y="112" fontSize="8" fill="#6b6b6b" fontFamily="sans-serif">Q1 &rarr; Q4 KPI Growth</text>
      </svg>
    )
  },
  {
    id: 'product',
    category: 'ARCHITECTURE',
    title: 'Product Logic',
    icon: Cpu,
    desc: 'What structural logic governs the digital application? Specify platform requirements, API integrations, data flows, and latency constraints.',
    sketchSvg: (
      <svg className="w-full h-32" viewBox="0 0 240 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="30" width="55" height="40" rx="8" stroke="#111111" strokeWidth="2" fill="#FFFFFF" />
        <text x="28" y="54" fontSize="10" fontWeight="bold" fill="#111111" fontFamily="sans-serif">Client UI</text>
        <path d="M75 50 L115 50" stroke="#111111" strokeWidth="2" strokeLinecap="round" />
        <circle cx="140" cy="50" r="20" stroke="#111111" strokeWidth="2" strokeDasharray="3 2" fill="#F4F3F1" />
        <text x="126" y="53" fontSize="9" fill="#111111" fontFamily="monospace" fontWeight="bold">API GW</text>
        <path d="M160 50 L185 50" stroke="#111111" strokeWidth="2" strokeLinecap="round" />
        <rect x="185" y="30" width="45" height="40" rx="6" stroke="#15803D" strokeWidth="2" fill="#15803D" fillOpacity="0.1" />
        <text x="193" y="54" fontSize="9" fontWeight="bold" fill="#15803D" fontFamily="sans-serif">DB Sync</text>
        <text x="75" y="95" fontSize="8" fill="#6b6b6b" fontFamily="monospace">Latency &lt; 150ms</text>
      </svg>
    )
  },
  {
    id: 'users',
    category: 'DEMOGRAPHICS',
    title: 'User Archetypes',
    icon: Users,
    desc: 'Who are the core user personas? Document daily workflows, friction points, behavior traits, accessibility standards, and success criteria.',
    sketchSvg: (
      <svg className="w-full h-32" viewBox="0 0 240 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="45" r="16" stroke="#111111" strokeWidth="2" fill="#FFFFFF" />
        <path d="M40 85 C40 70 50 65 60 65 C70 65 80 70 80 85" stroke="#111111" strokeWidth="2" strokeLinecap="round" />
        <path d="M85 35 Q115 20 145 35" stroke="#D97706" strokeWidth="1.5" strokeDasharray="2 2" />
        <rect x="130" y="35" width="95" height="45" rx="8" stroke="#111111" strokeWidth="1.5" fill="#FFFFFF" />
        <text x="138" y="52" fontSize="9" fontWeight="bold" fill="#111111" fontFamily="sans-serif">Sarah Chen (34)</text>
        <text x="138" y="68" fontSize="8" fill="#6b6b6b" fontFamily="sans-serif">"Zero tab nests!"</text>
      </svg>
    )
  },
  {
    id: 'design',
    category: 'VISUAL LANGUAGE',
    title: 'Design Goals',
    icon: Palette,
    desc: 'What defines visual excellence? Establishes benchmarks for interface aesthetic, typographic hierarchy, tactile feedback, and brand soul.',
    sketchSvg: (
      <svg className="w-full h-32" viewBox="0 0 240 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="25" y="20" width="190" height="75" rx="10" stroke="#111111" strokeWidth="2" fill="#FFFFFF" />
        <rect x="35" y="30" width="40" height="8" rx="2" fill="#111111" />
        <rect x="35" y="44" width="80" height="5" rx="2" fill="#ECEAE6" />
        <rect x="35" y="53" width="60" height="5" rx="2" fill="#ECEAE6" />
        <rect x="145" y="35" width="55" height="45" rx="6" stroke="#111111" strokeWidth="1.5" strokeDasharray="3 2" fill="#F4F3F1" />
        <circle cx="172" cy="57" r="10" stroke="#111111" strokeWidth="1.5" />
        <text x="50" y="110" fontSize="9" fill="#111111" fontWeight="bold" fontFamily="monospace">Minimal + Technical + Human</text>
      </svg>
    )
  },
];

const DIMENSIONS = [
  { key: 'Product', label: 'Product', detail: 'Digital platform / utility system with high-speed command palettes and realtime sync.', sketch: '🖥️ Architecture' },
  { key: 'Problem', label: 'Problem', detail: 'Foundational pain point: tab fatigue, slow loading, and dislocated data sets.', sketch: '⚠️ Friction Loop' },
  { key: 'Audience', label: 'Audience', detail: 'Ops Managers, Growth Teams, and Enterprise Leads needing rapid audits.', sketch: '👥 Sarah Chen' },
  { key: 'Value Proposition', label: 'Value Proposition', detail: '10x faster execution and total project clarity in a unified view.', sketch: '💎 10x ROI Metric' },
  { key: 'Core Features', label: 'Core Features', detail: 'Master filters, instant search, responsive 12-col grid, and dark mode.', sketch: '⚡ Modules' },
  { key: 'User Outcome', label: 'User Outcome', detail: 'Finish large data audits in under 10 seconds flat with zero errors.', sketch: '🎯 10s Task' },
  { key: 'Business Outcome', label: 'Business Outcome', detail: '40% reduction in churn, expanded contract value, and faster sales.', sketch: '📈 Revenue' },
  { key: 'Differentiator', label: 'Differentiator', detail: 'Minimalist editorial design + extreme performance speed & low cognitive load.', sketch: '🚀 Unfair Edge' },
];

export const BriefContextSection: React.FC = () => {
  const [selectedPillar, setSelectedPillar] = useState(PILLARS[3]);
  const [selectedDim, setSelectedDim] = useState<number | null>(null);

  return (
    <section id="context" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F4F3F1] text-[#111111] border-b-2 border-[#0a0a0a] relative">
      <div className="max-w-7xl mx-auto space-y-24">
        {/* SLIDE 05: PROJECT BRIEF CONTEXT */}
        <div>
          {/* Header */}
          <div className="flex items-center justify-between gap-4 border-b-2 border-[#0a0a0a]/10 pb-4">
            <div className="flex items-center gap-3">
              <span className="h-7 w-7 rounded-full bg-[#1a1a1a] text-white font-mono font-bold text-xs flex items-center justify-center">
                04
              </span>
              <span className="font-main font-bold uppercase tracking-wider text-xs text-[#111111]">
                PROJECT BRIEF CONTEXT (4 PILLARS)
              </span>
            </div>
            <span className="font-mono text-xs text-[#6b6b6b]">SABI OS V1.0 • STRATEGIC PILLARS</span>
          </div>

          <div className="mt-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-5xl font-main tracking-tight leading-[1.1]">
                <span className="voral-headline-1">Context Extraction Model</span>
                <span className="voral-headline-2">with architectural sketch references.</span>
              </h2>
              <p className="mt-3 text-base text-[#6b6b6b] leading-relaxed max-w-2xl">
                Four fundamental pillars establish project boundaries. Below each pillar is an architectural scribble diagram illustrating the mental model.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-[#111111] bg-white border border-[#0a0a0a]/15 px-3.5 py-1.5 rounded-full self-start md:self-auto shadow-sm">
              <PenTool className="h-3.5 w-3.5" />
              <span>Architectural Scribble References</span>
            </div>
          </div>

          {/* 4 Pillars Grid with Scribble Sketches */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PILLARS.map((p) => {
              const isSelected = selectedPillar.id === p.id;
              const Icon = p.icon;
              return (
                <div
                  key={p.id}
                  onClick={() => {
                    sounds.playClick();
                    setSelectedPillar(p);
                  }}
                  className={`p-6 rounded-3xl cursor-pointer text-left transition-all duration-200 flex flex-col justify-between border-2 ${
                    isSelected
                      ? 'bg-white text-[#111111] shadow-xl border-[#0a0a0a] ring-2 ring-[#0a0a0a] scale-[1.02]'
                      : 'bg-white/80 text-[#111111] border-[#0a0a0a]/10 hover:border-[#0a0a0a]/40 shadow-sm'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-[#6b6b6b]">
                        {p.category}
                      </span>
                      <Icon className="h-4 w-4 text-[#111111]" />
                    </div>

                    <h3 className="text-xl font-main font-bold text-[#111111]">
                      {p.title}
                    </h3>

                    <p className="text-xs text-[#6b6b6b] leading-relaxed mt-2 line-clamp-3">
                      {p.desc}
                    </p>
                  </div>

                  {/* Scribble Diagram Box */}
                  <div className="mt-4 pt-3 border-t border-[#0a0a0a]/10 bg-[#F4F3F1] rounded-2xl p-2 flex items-center justify-center">
                    {p.sketchSvg}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SLIDE 06: PRODUCT UNDERSTANDING */}
        <div className="pt-12 border-t-2 border-[#0a0a0a]/10">
          {/* Header */}
          <div className="flex items-center justify-between gap-4 border-b-2 border-[#0a0a0a]/10 pb-4">
            <div className="flex items-center gap-3">
              <span className="h-7 w-7 rounded-full bg-[#1a1a1a] text-white font-mono font-bold text-xs flex items-center justify-center">
                05
              </span>
              <span className="font-main font-bold uppercase tracking-wider text-xs text-[#111111]">
                PRODUCT UNDERSTANDING (8 DIMENSIONS)
              </span>
            </div>
            <span className="font-mono text-xs text-[#6b6b6b]">SABI OS V1.0</span>
          </div>

          <div className="mt-10 mb-8 max-w-3xl">
            <h2 className="text-3xl sm:text-5xl font-main tracking-tight leading-[1.1]">
              <span className="voral-headline-1">Standard Product Alignment</span>
              <span className="voral-headline-2">across 8 architectural dimensions.</span>
            </h2>
            <p className="mt-3 text-base text-[#6b6b6b] leading-relaxed">
              Zero ambiguity across user needs, product mechanics, and business growth metrics. Click any dimension to inspect its architectural sketch anchor.
            </p>
          </div>

          {/* 8 Dimensions Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DIMENSIONS.map((dim, idx) => {
              const isSelected = selectedDim === idx;
              return (
                <div
                  key={dim.key}
                  onClick={() => {
                    sounds.playClick(500 + idx * 40);
                    setSelectedDim(isSelected ? null : idx);
                  }}
                  className={`p-5 rounded-3xl cursor-pointer transition-all duration-200 border-2 flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#1a1a1a] text-white shadow-xl border-[#0a0a0a] scale-105'
                      : 'bg-white text-[#111111] border-[#0a0a0a]/10 hover:border-[#0a0a0a]/40 shadow-sm'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-mono font-bold uppercase tracking-wider ${
                        isSelected ? 'text-emerald-400' : 'text-[#6b6b6b]'
                      }`}>
                        {dim.key}
                      </span>
                      <span className="text-xs font-mono opacity-60">0{idx + 1}</span>
                    </div>

                    <p className={`text-xs sm:text-sm mt-2 leading-relaxed ${
                      isSelected ? 'text-white/95' : 'text-[#111111]/80'
                    }`}>
                      {dim.detail}
                    </p>
                  </div>

                  <div className={`mt-4 pt-3 border-t text-[11px] font-mono font-semibold flex items-center justify-between ${
                    isSelected ? 'border-white/20 text-emerald-300' : 'border-[#0a0a0a]/5 text-[#8a8a8a]'
                  }`}>
                    <span>{dim.sketch}</span>
                    <span>&rarr;</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
