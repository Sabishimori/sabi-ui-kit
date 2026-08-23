import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Sparkles, Layers, ShieldCheck, ArrowRight, Zap, Target } from 'lucide-react';
import { sounds } from '../../utils/audio';

const HIFI_STEPS = [
  {
    num: '01',
    name: 'Master Screen Composition',
    desc: 'Assemble root dashboard and hero views directly with design system tokens and 8px spacing rules. No manual unlinked colors.',
    deliverable: '12 Primary Desktop & Mobile Views',
  },
  {
    num: '02',
    name: 'Interactive User Pathways',
    desc: 'Connect sequential task flows: authentication, checkout gating, filter searches, and modal configurations.',
    deliverable: 'Figma Smart-Animate Interactive Flow',
  },
  {
    num: '03',
    name: 'Secondary & Sub-Views',
    desc: 'Flesh out deep audit menus, profile settings, SAML team manager, invoice PDF drawers, and notification logs.',
    deliverable: 'Complete 28-Screen Inventory',
  },
  {
    num: '04',
    name: 'Edge Cases & Empty States',
    desc: 'Design 0-data empty screens, 10,000-row stress tests, 404/500 network error dialogs, and skeleton loaders.',
    deliverable: 'Zero-Defect Edge State Kit',
  }
];

const TAGS = ['Final Content', 'Atomic Components', 'State Variations', 'Edge Handling', 'Responsive Grid', 'WCAG AAA'];

export const HiFiPipelineSection: React.FC = () => {
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const activeStep = HIFI_STEPS[activeStepIdx];

  const handleSelectStep = (idx: number) => {
    sounds.playClick(500 + idx * 40);
    setActiveStepIdx(idx);
  };

  return (
    <section id="components-flow" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F4F3F1] text-[#111111] border-b-2 border-[#0a0a0a] relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b-2 border-[#0a0a0a]/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="h-7 w-7 rounded-full bg-[#1a1a1a] text-white font-mono font-bold text-xs flex items-center justify-center">
              24
            </span>
            <span className="font-main font-bold uppercase tracking-wider text-xs text-[#111111]">
              HIGH-FIDELITY SCREENS PIPELINE
            </span>
          </div>
          <span className="font-mono text-xs text-[#6b6b6b]">SABI OS V1.0 • PRODUCTION UI</span>
        </div>

        <div className="mt-10 mb-8 max-w-3xl">
          <h2 className="text-3xl sm:text-5xl font-main tracking-tight leading-[1.1]">
            <span className="voral-headline-1">4-Stage Production Pipeline</span>
            <span className="voral-headline-2">for High-Fidelity UI assembly.</span>
          </h2>
          <p className="mt-3 text-base text-[#6b6b6b] leading-relaxed">
            Move from approved low-fi wireframes to pixel-perfect production screens with systematic coverage of edge cases, loading skeletons, and interactive states.
          </p>
        </div>

        {/* 4-Step Steps Ribbon */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {HIFI_STEPS.map((st, idx) => {
            const isSelected = activeStepIdx === idx;
            return (
              <div
                key={st.num}
                onClick={() => handleSelectStep(idx)}
                className={`p-6 rounded-3xl cursor-pointer transition-all duration-200 border-2 flex flex-col justify-between h-48 ${
                  isSelected
                    ? 'bg-white border-[#0a0a0a] shadow-xl scale-[1.02] ring-2 ring-[#0a0a0a]'
                    : 'bg-white/70 border-[#0a0a0a]/10 hover:border-[#0a0a0a]/40 shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-mono text-xs font-bold ${isSelected ? 'text-emerald-700' : 'text-[#8a8a8a]'}`}>
                      PHASE {st.num}
                    </span>
                    {isSelected && <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
                  </div>
                  <h4 className="font-main font-bold text-base text-[#111111]">
                    {st.name}
                  </h4>
                  <p className="text-xs text-[#6b6b6b] mt-1 line-clamp-2">
                    {st.desc}
                  </p>
                </div>

                <div className="text-[10px] font-mono text-[#111111] font-bold truncate pt-2 border-t border-[#0a0a0a]/10">
                  {st.deliverable}
                </div>
              </div>
            );
          })}
        </div>

        {/* Tag Pills */}
        <div className="p-6 rounded-3xl bg-white border-2 border-[#0a0a0a] shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#111111] font-bold uppercase">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>Strict Hi-Fi Constraints:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {TAGS.map((tag) => (
              <span
                key={tag}
                className="px-3.5 py-1 rounded-full bg-[#F4F3F1] border border-[#0a0a0a]/15 text-xs font-main font-bold text-[#111111]"
              >
                ✓ {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
