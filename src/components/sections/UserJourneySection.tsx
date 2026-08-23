import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, AlertCircle, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { sounds } from '../../utils/audio';

const JOURNEY_STAGES = [
  {
    num: '01',
    name: 'Awareness',
    action: 'Discovers Sabi Kit via design community or launch review',
    goal: 'Understand the value of a standardized 28-stage OS',
    emotion: 'Curious & Intrigued',
    emotionColor: 'text-[#366299]',
    painPoint: 'Tired of dislocated design templates and inconsistent files',
    uiSolution: 'Clear hero copy and interactive live preview of all 28 stages',
  },
  {
    num: '02',
    name: 'Landing Entry',
    action: 'Arrives on Sabi Kit landing page and inspects taxonomy',
    goal: 'Verify domain relevance and framework depth',
    emotion: 'Analytical & Focused',
    emotionColor: 'text-[#366299]',
    painPoint: 'Most UI kits are just pretty pictures without engineering specs',
    uiSolution: 'Live interactive low-fi studio, token inspector, and QA matrix',
  },
  {
    num: '03',
    name: 'Onboarding',
    action: 'Selects client archetype (SaaS / Fintech / Mobile)',
    goal: 'Quickly configure project boundaries and tokens',
    emotion: 'Excited & Hopeful',
    emotionColor: 'text-emerald-700',
    painPoint: 'Complex setup forms with too many non-essential questions',
    uiSolution: '3-tier modularity selector and instant 1-click preset loader',
  },
  {
    num: '04',
    name: 'First Action',
    action: 'Generates client brief and exports Figma 15-page structure',
    goal: 'Confirm structure is ready for immediate sprint start',
    emotion: 'Empowered & Confident',
    emotionColor: 'text-emerald-700',
    painPoint: 'Formatting pages and layer hierarchies in Figma manually takes hours',
    uiSolution: 'One-click copy-to-clipboard Figma master file hierarchy',
  },
  {
    num: '05',
    name: 'Core Value',
    action: 'Constructs low-fi wireframes and links master design tokens',
    goal: 'Complete prototype with zero layout or color ambiguity',
    emotion: 'Delighted & In the Flow',
    emotionColor: 'text-emerald-700',
    painPoint: 'Token naming mismatches between designers and engineers',
    uiSolution: 'Unified JSON design token package matching Tailwind & CSS variables',
  },
  {
    num: '06',
    name: 'Resolution',
    action: 'Executes 28-point QA check before sprint handoff',
    goal: 'Ensure zero accessibility or contrast defects',
    emotion: 'Relieved & Accomplished',
    emotionColor: 'text-emerald-700',
    painPoint: 'Last-minute bugs during developer sprint handoff',
    uiSolution: 'Interactive 14-point QA sign-off checklist and automated review',
  },
  {
    num: '07',
    name: 'Retention',
    action: 'Uses Sabi Kit as the permanent operating system for every client',
    goal: 'Standardize studio output and 10x delivery speed',
    emotion: 'Loyal Advocate',
    emotionColor: 'text-[#111111]',
    painPoint: 'Inconsistent design quality across different team members',
    uiSolution: 'Scalable master architecture documentation and prompt engine',
  },
];

export const UserJourneySection: React.FC = () => {
  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const activeStage = JOURNEY_STAGES[activeStageIdx];

  const handleSelect = (idx: number) => {
    sounds.playClick(500 + idx * 40);
    setActiveStageIdx(idx);
  };

  return (
    <section id="journey" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F4F3F1] text-[#111111] border-b-2 border-[#0a0a0a] relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b-2 border-[#0a0a0a]/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="h-7 w-7 rounded-full bg-[#1a1a1a] text-white font-mono font-bold text-xs flex items-center justify-center">
              12
            </span>
            <span className="font-main font-bold uppercase tracking-wider text-xs text-[#111111]">
              7-STAGE EMOTIONAL USER JOURNEY
            </span>
          </div>
          <span className="font-mono text-xs text-[#6b6b6b]">SABI OS V1.0 • JOURNEY MAPPING</span>
        </div>

        <div className="mt-10 mb-8 max-w-3xl">
          <h2 className="text-3xl sm:text-5xl font-main tracking-tight leading-[1.1]">
            <span className="voral-headline-1">7-Stage Friction Mapping</span>
            <span className="voral-headline-2">from Awareness to Lifelong Retention.</span>
          </h2>
          <p className="mt-3 text-base text-[#6b6b6b] leading-relaxed">
            Every step of the user journey is engineered to eliminate cognitive hesitation, convert friction into satisfaction, and reinforce product habit loops.
          </p>
        </div>

        {/* 7-Stage Horizontal Step Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {JOURNEY_STAGES.map((st, idx) => {
            const isSelected = activeStageIdx === idx;
            return (
              <button
                key={st.num}
                onClick={() => handleSelect(idx)}
                className={`p-3.5 rounded-2xl text-left transition-all duration-200 flex flex-col justify-between h-28 border-2 ${
                  isSelected
                    ? 'bg-[#1a1a1a] text-white border-[#0a0a0a] shadow-xl scale-105 z-10'
                    : 'bg-white text-[#111111] border-[#0a0a0a]/10 hover:border-[#0a0a0a]/40 shadow-sm'
                }`}
              >
                <span className={`font-mono text-xs font-bold ${isSelected ? 'text-emerald-400' : 'text-[#8a8a8a]'}`}>
                  {st.num}
                </span>
                <div>
                  <span className="font-main font-bold text-xs block leading-tight">
                    {st.name}
                  </span>
                  <span className={`text-[10px] block mt-0.5 truncate ${isSelected ? 'text-white/80' : 'text-[#6b6b6b]'}`}>
                    {st.emotion}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Deep Dive Journey Card */}
        <motion.div
          key={activeStage.num}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-6 sm:p-10 rounded-3xl bg-white border-2 border-[#0a0a0a] shadow-xl space-y-6"
        >
          {/* Title Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#0a0a0a]/10 pb-6">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-[#1a1a1a] text-white font-main font-bold text-2xl flex items-center justify-center shrink-0 shadow-md">
                {activeStage.num}
              </div>
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#6b6b6b]">
                  STAGE {activeStage.num} OF 07
                </span>
                <h3 className="text-2xl sm:text-3xl font-main font-bold text-[#111111]">
                  {activeStage.name} Flow Spec
                </h3>
              </div>
            </div>

            <button
              onClick={() => handleSelect((activeStageIdx + 1) % JOURNEY_STAGES.length)}
              className="voral-btn-pill"
            >
              <span>Next ({JOURNEY_STAGES[(activeStageIdx + 1) % JOURNEY_STAGES.length].name})</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* 4 Quadrants */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* User Action */}
            <div className="p-4 rounded-2xl bg-[#F4F3F1] border border-[#0a0a0a]/10 space-y-1.5">
              <span className="text-[10px] font-mono font-bold uppercase text-[#111111] tracking-wider block">
                USER ACTION
              </span>
              <p className="text-xs text-[#6b6b6b] leading-relaxed">
                {activeStage.action}
              </p>
            </div>

            {/* Core Goal */}
            <div className="p-4 rounded-2xl bg-[#F4F3F1] border border-[#0a0a0a]/10 space-y-1.5">
              <span className="text-[10px] font-mono font-bold uppercase text-[#111111] tracking-wider block">
                PRIMARY GOAL
              </span>
              <p className="text-xs text-[#6b6b6b] leading-relaxed">
                {activeStage.goal}
              </p>
            </div>

            {/* Potential Friction / Pain Point */}
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-1.5">
              <span className="text-[10px] font-mono font-bold uppercase text-rose-800 tracking-wider block">
                POTENTIAL FRICTION
              </span>
              <p className="text-xs text-[#111111]/80 leading-relaxed font-medium">
                {activeStage.painPoint}
              </p>
            </div>

            {/* Sabi OS Architectural Fix */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1.5">
              <span className="text-[10px] font-mono font-bold uppercase text-emerald-800 tracking-wider block">
                ENGINEERED UI SOLUTION
              </span>
              <p className="text-xs text-emerald-950 leading-relaxed font-medium">
                {activeStage.uiSolution}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
