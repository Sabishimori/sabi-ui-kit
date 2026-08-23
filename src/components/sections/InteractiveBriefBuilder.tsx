import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Copy, Check, Wand2, Rocket, RefreshCw, Send, CheckCircle2 } from 'lucide-react';
import { sounds } from '../../utils/audio';

const PRESET_IDEAS = [
  { title: '🚀 Space Exploration Simulator', domain: 'Gaming / Edtech', audience: 'Kids & Students', vibe: 'Minimal + Futuristic' },
  { title: '🍕 AI Smart Pizza Delivery', domain: 'FoodTech / Mobile', audience: 'Hungry Foodies', vibe: 'Minimal + Fast' },
  { title: '💳 Next-Gen Crypto & Fintech Hub', domain: 'Fintech / SaaS', audience: 'Operations Managers', vibe: 'Voral Light + Precision' },
  { title: '🌱 Solar & Clean Energy Tracker', domain: 'ClimateTech', audience: 'Eco Builders', vibe: 'Earthy + Human' },
];

export const InteractiveBriefBuilder: React.FC = () => {
  const [appName, setAppName] = useState('My Dream App');
  const [selectedDomain, setSelectedDomain] = useState('SaaS & Mobile');
  const [targetUser, setTargetUser] = useState('Students & Creators');
  const [selectedVibe, setSelectedVibe] = useState('Minimal + Light + 2px Frames');
  const [generatedBrief, setGeneratedBrief] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    sounds.playChime();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#111111', '#366299', '#D97706', '#15803D']
    });

    const brief = `=====================================================
VORAL.CO / SABI OS V1.0 • AUTO-GENERATED PROJECT BRIEF
=====================================================
PROJECT NAME: ${appName}
DOMAIN / CATEGORY: ${selectedDomain}
TARGET PERSONA: ${targetUser}
VISUAL DIRECTION: ${selectedVibe}

1. EXECUTIVE SUMMARY & MISSION:
Build a seamless digital experience that solves core user friction
with zero cognitive clutter and high-performance utility.

2. 14-STEP EXECUTION BLUEPRINT:
- Step 01: Discover market signals for ${appName}
- Step 02: Synthesize 8-dimension product understanding
- Step 03: Define Sarah Chen archetype for ${targetUser}
- Step 04: Architect 6 navigation anchors & 7-stage emotion flow
- Step 05: Draft low-fi wireframes (Boxes, Text Lines, CTAs)
- Step 06: Lock visual personality: ${selectedVibe}
- Step 07: Configure Plus Jakarta Sans typography & token palette
- Step 08: Assemble High-Fidelity UI screens
- Step 09: Build interactive motion prototype
- Step 10: Run user usability testing & error state gating
- Step 11: Polish spacing densities on 8px scale
- Step 12: Developer handoff with 28-point QA check
- Step 13: Present stakeholder walkthrough
- Step 14: Final release & archive

3. FIGMA NAMESPACE SPECIFICATION:
${appName.toUpperCase().replace(/\s+/g, '_')} / WEB / DASHBOARD / OVERVIEW / DEFAULT

Generated via Voral.co / Sabi UI/UX Operating System V1.0
=====================================================`;

    setGeneratedBrief(brief);
  };

  const handleCopy = () => {
    if (!generatedBrief) return;
    sounds.playChime();
    navigator.clipboard.writeText(generatedBrief);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="brief-builder" className="px-4 sm:px-8 lg:px-12 2xl:px-20 max-w-[1780px] mx-auto w-full text-[#111111] relative overflow-hidden">
      <div className="w-full relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#0a0a0a]/15 text-[#111111] text-xs font-mono font-bold mb-4 shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Interactive Studio • Brief It Yourself</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-main tracking-tight leading-[1.1]">
            <span className="voral-headline-1">Design Brief Generator</span>
            <span className="voral-headline-2">for creators, kids and product teams.</span>
          </h2>
          <p className="mt-3 text-base text-[#6b6b6b] leading-relaxed">
            Configure your dream project parameters below to instantly generate a complete 14-step architectural brief.
          </p>
        </div>

        {/* Quick Presets */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PRESET_IDEAS.map((p) => (
            <button
              key={p.title}
              onClick={() => {
                sounds.playPop();
                setAppName(p.title.split(' ').slice(1).join(' '));
                setSelectedDomain(p.domain);
                setTargetUser(p.audience);
                setSelectedVibe(p.vibe);
              }}
              className="p-4 rounded-2xl bg-white border border-[#0a0a0a]/15 hover:border-[#0a0a0a] text-left transition-all hover:scale-105 shadow-sm"
            >
              <h4 className="font-main font-bold text-xs sm:text-sm text-[#111111]">
                {p.title}
              </h4>
              <p className="text-[11px] font-mono text-[#6b6b6b] mt-1">
                {p.domain}
              </p>
            </button>
          ))}
        </div>

        {/* Input Configuration Form */}
        <div className="mt-8 bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#0a0a0a] shadow-xl space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-mono text-[#6b6b6b] uppercase tracking-wider block mb-1.5 font-bold">
                What are you building? (Project Name)
              </label>
              <input
                type="text"
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-[#F4F3F1] border border-[#0a0a0a]/15 text-[#111111] text-sm focus:outline-none focus:ring-2 focus:ring-[#111111] font-main font-bold"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-[#6b6b6b] uppercase tracking-wider block mb-1.5 font-bold">
                Product Domain
              </label>
              <input
                type="text"
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-[#F4F3F1] border border-[#0a0a0a]/15 text-[#111111] text-sm focus:outline-none focus:ring-2 focus:ring-[#111111] font-main font-bold"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-[#6b6b6b] uppercase tracking-wider block mb-1.5 font-bold">
                Who is the Hero / User?
              </label>
              <input
                type="text"
                value={targetUser}
                onChange={(e) => setTargetUser(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-[#F4F3F1] border border-[#0a0a0a]/15 text-[#111111] text-sm focus:outline-none focus:ring-2 focus:ring-[#111111] font-main font-bold"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-[#6b6b6b] uppercase tracking-wider block mb-1.5 font-bold">
                Aesthetic Vibe & Personality
              </label>
              <input
                type="text"
                value={selectedVibe}
                onChange={(e) => setSelectedVibe(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-[#F4F3F1] border border-[#0a0a0a]/15 text-[#111111] text-sm focus:outline-none focus:ring-2 focus:ring-[#111111] font-main font-bold"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[#0a0a0a]/10 flex justify-center">
            <button
              onClick={handleGenerate}
              className="voral-btn-pill py-3 px-8 text-base shadow-lg"
            >
              <Wand2 className="h-5 w-5" />
              <span>Generate Sabi OS Blueprint</span>
            </button>
          </div>
        </div>

        {/* Generated Output Card */}
        <AnimatePresence>
          {generatedBrief && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#0a0a0a] shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-[#0a0a0a]/10 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  <span className="font-main font-bold text-sm text-[#111111]">
                    Voral / Sabi Blueprint Ready
                  </span>
                </div>

                <button
                  onClick={handleCopy}
                  className="voral-btn-pill py-1.5 px-4 text-xs font-bold"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-300" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Full Brief'}</span>
                </button>
              </div>

              <pre className="font-mono text-xs sm:text-sm text-[#111111] bg-[#F4F3F1] p-4 rounded-2xl border border-[#0a0a0a]/10 whitespace-pre-wrap leading-relaxed overflow-x-auto max-h-96">
                {generatedBrief}
              </pre>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
