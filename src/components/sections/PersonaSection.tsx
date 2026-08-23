import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Briefcase, Clock, Quote, Target, AlertTriangle, Zap, Shuffle, Sparkles, Check, Edit3 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../utils/audio';
import { LearnerCard } from '../common/LearnerCard';
import { ALL_SLIDES } from '../../data/slidesData';

interface PersonaSectionProps {
  learnerMode: boolean;
}

interface PersonaModel {
  name: string;
  initials: string;
  role: string;
  domain: string;
  age: number;
  location: string;
  experience: string;
  quote: string;
  primaryGoals: string;
  coreNeeds: string;
  keyFrustrations: string;
  motivationalTriggers: string;
}

const PERSONA_TEMPLATES: PersonaModel[] = [
  {
    name: 'Sarah Chen',
    initials: 'SC',
    role: 'Operations Manager',
    domain: 'B2B Enterprise SaaS',
    age: 34,
    location: 'San Francisco, CA',
    experience: 'Advanced (8 years)',
    quote: '"I need a central dashboard that instantly syncs client data and avoids clicking through complex tab nests."',
    primaryGoals: 'Consolidate daily project workflows into a single visual window and run automated reports under 10 seconds.',
    coreNeeds: 'Fast keyboard commands (Cmd+K), real-time sync with database tables, and clean CSV/JSON export paths.',
    keyFrustrations: 'Too many sub-menus, sluggish load speeds during large data audits, and loss of contextual parameters.',
    motivationalTriggers: 'Highly organized structures, zero-click access to critical settings, and intuitive visual status badges.'
  },
  {
    name: 'Marcus Vance',
    initials: 'MV',
    role: 'Head of Treasury & Risk',
    domain: 'Fintech & Digital Banking',
    age: 42,
    location: 'New York, NY',
    experience: 'Expert (15 years)',
    quote: '"If money movement isn\'t confirmed in real time with an audit trail, my entire compliance department is blocked."',
    primaryGoals: 'Monitor multi-million dollar liquidity transfers with instant fraud scoring and multi-sig authorization.',
    coreNeeds: 'Real-time WebSocket balances, two-person rule approval gates, and tamper-proof PDF audit generation.',
    keyFrustrations: 'Hidden transaction fees, ambiguous error codes during wire delays, and lack of dark mode for night desks.',
    motivationalTriggers: 'High-contrast typography, mathematical grid precision, and rock-solid 99.99% system reliability.'
  },
  {
    name: 'Elena Rostova',
    initials: 'ER',
    role: 'Lead Clinical Coordinator',
    domain: 'Healthcare & Telehealth',
    age: 29,
    location: 'Boston, MA',
    experience: 'Mid-Level (5 years)',
    quote: '"In urgent triage, I have 15 seconds to review vitals and medication history before speaking to a doctor."',
    primaryGoals: 'Coordinate 40+ virtual patient appointments daily without medical chart discrepancies or lag.',
    coreNeeds: 'High-legibility medical summaries, one-click prescription routing, and HIPAA-compliant live video.',
    keyFrustrations: 'Complex multi-step modal dialogs, small tap targets on iPad touch screens, and patient connectivity drops.',
    motivationalTriggers: 'Large clear status chips, reassuring color cues (soft greens/blues), and instant patient search.'
  },
  {
    name: 'Devon Malik',
    initials: 'DM',
    role: 'AI Infrastructure Architect',
    domain: 'AI & Machine Learning',
    age: 27,
    location: 'Austin, TX',
    experience: 'Specialist (6 years)',
    quote: '"I want to test 50 prompt variants simultaneously and see token latency graphs without opening 10 browser windows."',
    primaryGoals: 'Benchmark LLM inference costs and automate fine-tuning pipelines with instant model deployment.',
    coreNeeds: 'Streaming markdown code syntax, diff comparison canvas, and API token usage gauges.',
    keyFrustrations: 'Opaque pricing calculators, sluggish terminal scrollbacks, and non-reproducible prompt versions.',
    motivationalTriggers: 'Monospace code aesthetics, sleek glassmorphism, and instant copy-paste cURL snippets.'
  }
];

export const PersonaSection: React.FC = () => {
  const [currentPersona, setCurrentPersona] = useState<PersonaModel>(PERSONA_TEMPLATES[0]);
  const [templateIdx, setTemplateIdx] = useState(0);
  const slide11 = ALL_SLIDES[10];

  const handleRandomize = () => {
    sounds.playChime();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#111111', '#4A78B0', '#15803D']
    });
    const nextIdx = (templateIdx + 1) % PERSONA_TEMPLATES.length;
    setTemplateIdx(nextIdx);
    setCurrentPersona(PERSONA_TEMPLATES[nextIdx]);
  };

  return (
    <section id="persona" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F4F3F1] text-[#111111] border-b-2 border-[#0a0a0a] relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b-2 border-[#0a0a0a]/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="h-7 w-7 rounded-full bg-[#1a1a1a] text-white font-mono font-bold text-xs flex items-center justify-center">
              07
            </span>
            <span className="font-main font-bold uppercase tracking-wider text-xs text-[#111111]">
              DYNAMIC USER PERSONA GENERATOR
            </span>
          </div>
          <span className="font-mono text-xs text-[#6b6b6b]">SABI OS V1.0 • USER RESEARCH</span>
        </div>

        <div className="mt-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl sm:text-5xl font-main tracking-tight leading-[1.1]">
              <span className="voral-headline-1">Human-Centered Profiles</span>
              <span className="voral-headline-2">for ergonomic workflow design.</span>
            </h2>
            <p className="mt-3 text-base text-[#6b6b6b] leading-relaxed max-w-2xl">
              Generate realistic user archetypes across SaaS, Fintech, Healthcare, and AI to design human-centered ergonomics.
            </p>
          </div>

          <button
            onClick={handleRandomize}
            className="voral-btn-pill shrink-0"
          >
            <Shuffle className="h-4 w-4" />
            <span>Generate New Persona</span>
          </button>
        </div>

        {/* Persona Layout */}
        <motion.div
          key={currentPersona.name}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
        >
          {/* Left Bio Card */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#0a0a0a] shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-16 w-16 rounded-full bg-[#1a1a1a] text-white flex items-center justify-center text-xl font-main font-bold shadow-md">
                  {currentPersona.initials}
                </div>
                <div>
                  <h3 className="text-2xl font-main font-bold text-[#111111]">
                    {currentPersona.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#6b6b6b] mt-0.5">
                    {currentPersona.role} • {currentPersona.domain}
                  </p>
                </div>
              </div>

              <div className="space-y-3 py-4 border-y border-[#0a0a0a]/10 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-[#8a8a8a]">AGE</span>
                  <span className="font-bold text-[#111111]">{currentPersona.age} Years Old</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8a8a8a]">LOCATION</span>
                  <span className="font-bold text-[#111111]">{currentPersona.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8a8a8a]">EXPERIENCE</span>
                  <span className="font-bold text-[#111111]">{currentPersona.experience}</span>
                </div>
              </div>
            </div>

            {/* Quote Block */}
            <div className="mt-6 p-4 rounded-2xl bg-[#F4F3F1] border border-[#0a0a0a]/10 relative">
              <Quote className="h-4 w-4 text-[#111111] mb-1" />
              <p className="text-xs sm:text-sm text-[#111111] font-medium italic leading-relaxed">
                {currentPersona.quote}
              </p>
            </div>
          </div>

          {/* Right 4 Quadrant Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Primary Goals */}
            <div className="p-6 rounded-3xl bg-white border border-[#0a0a0a]/15 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono font-bold text-[#111111] uppercase tracking-wider block mb-2">
                  PRIMARY GOALS
                </span>
                <p className="text-xs sm:text-sm text-[#6b6b6b] leading-relaxed">
                  {currentPersona.primaryGoals}
                </p>
              </div>
            </div>

            {/* Core Needs */}
            <div className="p-6 rounded-3xl bg-white border border-[#0a0a0a]/15 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono font-bold text-[#111111] uppercase tracking-wider block mb-2">
                  CORE NEEDS
                </span>
                <p className="text-xs sm:text-sm text-[#6b6b6b] leading-relaxed">
                  {currentPersona.coreNeeds}
                </p>
              </div>
            </div>

            {/* Key Frustrations */}
            <div className="p-6 rounded-3xl bg-rose-50 border border-rose-200 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono font-bold text-rose-800 uppercase tracking-wider block mb-2">
                  KEY FRUSTRATIONS
                </span>
                <p className="text-xs sm:text-sm text-[#111111]/80 leading-relaxed">
                  {currentPersona.keyFrustrations}
                </p>
              </div>
            </div>

            {/* Motivational Triggers */}
            <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-200 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono font-bold text-emerald-800 uppercase tracking-wider block mb-2">
                  MOTIVATIONAL TRIGGERS
                </span>
                <p className="text-xs sm:text-sm text-[#111111]/80 leading-relaxed">
                  {currentPersona.motivationalTriggers}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
