import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, ArrowRight, CheckCircle2, Sparkles, Zap, Shield, Rocket, Copy, Check, Wand2, Shuffle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../utils/audio';

const TIERS = [
  {
    level: 'LEVEL 01',
    name: 'Quick Project (Sprint)',
    subtitle: 'Landing pages, marketing sites, quick MVPs',
    frames: '8 – 15 total frames',
    timeline: '1 – 2 Weeks',
    icon: Zap,
    whyUse: 'Ideal for early-stage startups and rapid marketing campaigns where speed-to-market is the #1 priority. Skips heavy documentation in favor of rapid high-fi delivery.',
    flow: ['Discover', 'Define', 'Visual Dir', 'High-Fidelity', 'Handoff'],
  },
  {
    level: 'LEVEL 02',
    name: 'Standard Project (Production)',
    subtitle: 'SaaS systems, mobile apps, web applications',
    frames: '20 – 30 total frames',
    timeline: '3 – 5 Weeks',
    icon: Rocket,
    whyUse: 'The standard sweet spot for 90% of commercial digital products. Balances full low-fi wireframing, design token governance, and usability testing.',
    flow: ['Discover', 'Understand', 'Wireframe', 'Design System', 'High-Fi UI', 'Test', 'Handoff'],
  },
  {
    level: 'LEVEL 03',
    name: 'Complex Product (Enterprise)',
    subtitle: 'Enterprise ecosystems, multi-tenant fintech, healthcare',
    frames: '30 – 60+ total frames',
    timeline: '6 – 12 Weeks',
    icon: Shield,
    whyUse: 'Required for high-compliance, multi-role ecosystems with deep edge cases, HIPAA/SOC2 audits, multi-level permissions, and heavy database tables.',
    flow: [
      'Full Discovery', 'Journey Mapping', 'Information Arch',
      'UI Wireframes', 'Design System', 'Hi-Fi Production',
      'Interactive Prototype', 'Test & Iterate', 'Handoff'
    ],
  },
];

export const ModularitySection: React.FC = () => {
  const [selectedTierIdx, setSelectedTierIdx] = useState(1);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const activeTier = TIERS[selectedTierIdx];

  const handleSelectTier = (idx: number) => {
    sounds.playClick(600 + idx * 50);
    setSelectedTierIdx(idx);
  };

  const handleRandomizeScope = () => {
    sounds.playChime();
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.7 },
      colors: ['#111111', '#15803D', '#D97706']
    });
    const next = (selectedTierIdx + 1) % TIERS.length;
    setSelectedTierIdx(next);
  };

  const figmaAIPrompt = `Create a complete Figma design system and wireframe template for a ${activeTier.name} (${activeTier.subtitle}) following the Sabi Kit OS V1.0 rules:
- Scope: ${activeTier.frames} across a ${activeTier.timeline} sprint.
- Execution Flow: ${activeTier.flow.join(' -> ')}.
- Style: Sabi Kit Light (#F4F3F1 bg, 2px solid #0a0a0a frames, #1a1a1a dark pills).
- Typography: Plus Jakarta Sans Bold for display headlines, DM Sans Regular for body prose.
- Color Palette: Primary #111111, Dark Neutral #1a1a1a, Surface #FFFFFF, Background #F4F3F1, Accent #366299.
- Spacing: Strict 8px harmonic scale with auto-layout constraints.
- Frame Naming Convention: PROJECT / PLATFORM / SECTION / SCREEN / STATE.
Generate the master canvas with components, tokens, and responsive 12-column desktop and 4-column mobile artboards.`;

  const handleCopyPrompt = () => {
    sounds.playChime();
    navigator.clipboard.writeText(figmaAIPrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <section id="delivery" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F4F3F1] text-[#111111] border-b-2 border-[#0a0a0a] relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b-2 border-[#0a0a0a]/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="h-7 w-7 rounded-full bg-[#1a1a1a] text-white font-mono font-bold text-xs flex items-center justify-center">
              27
            </span>
            <span className="font-main font-bold uppercase tracking-wider text-xs text-[#111111]">
              TEMPLATE MODULARITY & FIGMA AI PROMPTER
            </span>
          </div>
          <span className="font-mono text-xs text-[#6b6b6b]">SABI OS V1.0 • ADAPTIVE SCOPING</span>
        </div>

        <div className="mt-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl sm:text-5xl font-main tracking-tight leading-[1.1]">
              <span className="voral-headline-1">Template Modularity</span>
              <span className="voral-headline-2">and AI Figma Prompt Generator.</span>
            </h2>
            <p className="mt-3 text-base text-[#6b6b6b] leading-relaxed max-w-2xl">
              Never waste client budget over-engineering a simple MVP or under-specifying an enterprise portal. Select the exact right scope below.
            </p>
          </div>

          <button
            onClick={handleRandomizeScope}
            className="voral-btn-pill-light shrink-0 shadow-sm"
          >
            <Shuffle className="h-4 w-4 text-[#111111]" />
            <span>Randomize Project Scope</span>
          </button>
        </div>

        {/* 3 Tier Scope Cards */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {TIERS.map((tier, idx) => {
            const isSelected = selectedTierIdx === idx;
            const Icon = tier.icon;
            return (
              <div
                key={tier.level}
                onClick={() => handleSelectTier(idx)}
                className={`p-6 sm:p-8 rounded-3xl cursor-pointer transition-all duration-200 flex flex-col justify-between border-2 ${
                  isSelected
                    ? 'bg-white border-[#0a0a0a] shadow-xl scale-[1.02] ring-2 ring-[#0a0a0a]'
                    : 'bg-white/70 border-[#0a0a0a]/10 hover:border-[#0a0a0a]/40 shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-[#6b6b6b] uppercase tracking-widest">
                      {tier.level}
                    </span>
                    <Icon className="h-5 w-5 text-[#111111]" />
                  </div>

                  <h3 className="text-2xl font-main font-bold text-[#111111]">
                    {tier.name}
                  </h3>
                  <p className="text-xs text-[#6b6b6b] mt-1">
                    {tier.subtitle}
                  </p>

                  <div className="mt-4 flex items-center gap-2">
                    <span className="px-3 py-0.5 rounded-full bg-[#1a1a1a] text-white font-mono text-xs font-bold">
                      {tier.frames}
                    </span>
                    <span className="px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono text-xs font-bold">
                      {tier.timeline}
                    </span>
                  </div>

                  <p className="text-xs text-[#6b6b6b] mt-4 leading-relaxed font-normal">
                    {tier.whyUse}
                  </p>

                  {/* Flow Pills */}
                  <div className="mt-6 pt-4 border-t border-[#0a0a0a]/10">
                    <span className="text-[10px] font-mono text-[#8a8a8a] uppercase tracking-wider block mb-2 font-bold">
                      EXECUTION STEPS
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {tier.flow.map((step) => (
                        <span
                          key={step}
                          className="px-2.5 py-1 rounded-full bg-[#F4F3F1] text-[11px] font-semibold text-[#111111] border border-[#0a0a0a]/10"
                        >
                          {step}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-[#0a0a0a]/10 flex items-center justify-between text-xs font-mono text-[#6b6b6b]">
                  <span>{tier.flow.length} Sequential Steps</span>
                  {isSelected && <span className="text-emerald-700 font-bold">Selected Scope</span>}
                </div>
              </div>
            );
          })}
        </div>

        {/* Figma AI Prompt Generator Box */}
        <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-white border-2 border-[#0a0a0a] shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#0a0a0a]/10 pb-4">
            <div className="flex items-center gap-2">
              <Wand2 className="h-5 w-5 text-[#111111]" />
              <div>
                <h4 className="font-main font-bold text-base text-[#111111]">
                  Figma AI & Claude Template Prompt Generator
                </h4>
                <p className="text-xs text-[#6b6b6b]">
                  Ready to copy and paste into Figma AI / ChatGPT to auto-generate this exact project structure.
                </p>
              </div>
            </div>

            <button
              onClick={handleCopyPrompt}
              className="voral-btn-pill shrink-0"
            >
              {copiedPrompt ? <Check className="h-4 w-4 text-emerald-300" /> : <Copy className="h-4 w-4" />}
              <span>{copiedPrompt ? 'Prompt Copied!' : 'Copy Figma AI Prompt'}</span>
            </button>
          </div>

          <pre className="p-4 rounded-2xl bg-[#F4F3F1] border border-[#0a0a0a]/10 font-mono text-xs text-[#111111] leading-relaxed overflow-x-auto whitespace-pre-wrap">
            {figmaAIPrompt}
          </pre>
        </div>
      </div>
    </section>
  );
};
