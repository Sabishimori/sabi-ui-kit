import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, Compass, Layers, Zap, BookOpen, Wrench, Target, FileCheck, HelpCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sounds } from '../../utils/audio';

gsap.registerPlugin(ScrollTrigger);

interface StepDetail {
  step: string;
  name: string;
  tagline: string;
  overview: string;
  inputs: string[];
  deliverables: string[];
  tools: string[];
  keyQuestions: string[];
}

const FLOW_STEPS: StepDetail[] = [
  {
    step: '01',
    name: 'DISCOVER',
    tagline: 'Market Signals, User Landscapes & Opportunity Mining',
    overview: 'Conduct thorough qualitative research and competitive benchmarking to identify unmet user needs, market dynamics, and operational feasibility before writing a single line of spec.',
    inputs: ['Stakeholder interview notes', 'Market analysis reports', 'Customer support tickets & churn logs'],
    deliverables: ['Opportunity Canvas', 'Competitor Benchmark Matrix', 'Discovery Brief'],
    tools: ['Notion', 'Miro', 'Typeform', 'Dovetail'],
    keyQuestions: ['Who suffers most from this problem today?', 'Why have existing alternatives failed to solve it?']
  },
  {
    step: '02',
    name: 'UNDERSTAND',
    tagline: '8-Dimension Product & Problem Alignment',
    overview: 'Synthesize raw customer discovery into the Sabi 8-Dimension Framework: Product, Problem, Audience, Value Proposition, Core Features, User Outcome, Business Outcome, and Differentiator.',
    inputs: ['Discovery synthesis', 'Feature wishlists', 'Business KPI targets'],
    deliverables: ['8-Dimension Alignment Board', 'Problem Statement Document', 'Strategic Value Hypotheses'],
    tools: ['Figma FigJam', 'Notion OS', 'Loom'],
    keyQuestions: ['What is the single core metric that proves value?', 'What is our unfair execution edge?']
  },
  {
    step: '03',
    name: 'DEFINE',
    tagline: 'Scope Boundaries, Personas & KPI Baselines',
    overview: 'Establish rigid project boundaries, craft our Sarah Chen operational persona, define MVP vs Phase 2 features, and establish SLA benchmarks.',
    inputs: ['8-Dimension alignment', 'Technical infrastructure constraints', 'Timeline & budget scope'],
    deliverables: ['User Persona Dossier (Sarah Chen)', 'Feature Prioritization Matrix (MoSCoW)', 'Project Dashboard Spec'],
    tools: ['Linear', 'Jira', 'Figma'],
    keyQuestions: ['What are we explicitly NOT building in this version?', 'What makes Sarah Chen choose this daily?']
  },
  {
    step: '04',
    name: 'ARCHITECT',
    tagline: 'Information Architecture & 7-Stage Emotional Journeys',
    overview: 'Map the complete structural hierarchy (Home, Discover, Search, Messages, Profile, Settings) and draft the 7-stage emotion/friction journey from Awareness to Retention.',
    inputs: ['Feature priorities', 'Data models & relational schemas', 'Authentication requirements'],
    deliverables: ['Site Map & Navigation Tree', '7-Stage Emotion & Pain-Point Map', 'User Flow Logic Diagrams'],
    tools: ['Whimsical', 'FigJam', 'Draw.io'],
    keyQuestions: ['Can a user find any critical setting in under 2 clicks?', 'Where is the highest emotional drop-off risk?']
  },
  {
    step: '05',
    name: 'WIREFRAME',
    tagline: 'Structural Low-Fidelity Layouts & Ergonomic Density',
    overview: 'Build rapid grayscale structural layouts using standardized boxes, text line shorthands, and CTA placeholders, focusing purely on cognitive density and layout hierarchy.',
    inputs: ['User flows & IA tree', 'Data table field requirements', 'Display responsive breakpoints'],
    deliverables: ['Low-Fi Wireframe Deck (Desktop/Mobile)', 'Clickable Structural Prototype', 'Layout Spacing Grid Rules'],
    tools: ['Figma Wireframe Kit', 'Balsamiq'],
    keyQuestions: ['Does the layout feel intuitive before any color is applied?', 'Is the visual hierarchy immediately obvious?']
  },
  {
    step: '06',
    name: 'VISUAL DIRECTION',
    tagline: 'Design Personality: Minimal + Premium + Technical + Human',
    overview: 'Establish the artistic ethos and emotional tone. Pair clean geometric Swiss grid logic with warm, tactile human neutrals to avoid generic corporate sterility.',
    inputs: ['Brand positioning guidelines', 'Aesthetic reference board', 'Target audience demographics'],
    deliverables: ['Moodboard & Style Tiles', 'Visual Direction Manifesto', 'Brand Imagery Guidelines'],
    tools: ['Figma', 'Midjourney', 'Arena (Are.na)'],
    keyQuestions: ['Does this feel premium and trustworthy to enterprise buyers?', 'Is there personality without clutter?']
  },
  {
    step: '07',
    name: 'DESIGN SYSTEM',
    tagline: 'Atomic Components, 11-Token Palette & 8pt Spatial Rhythm',
    overview: 'Codify foundational tokens: 11 master semantic colors, 4 typography scales (Display, H1-H3, Body, Caption), 8pt mathematical spacing, and button/card component sets.',
    inputs: ['Visual direction rules', 'Accessibility WCAG AAA targets', 'Framework specifications (React/Tailwind)'],
    deliverables: ['Design System Figma Library (100+ Components)', 'Design Tokens JSON Schema', 'Component State Variants Matrix'],
    tools: ['Figma Tokens Studio', 'Storybook', 'Zeroheight'],
    keyQuestions: ['Are all interactive states defined (Hover, Active, Focused, Disabled)?', 'Is contrast WCAG AAA compliant?']
  },
  {
    step: '08',
    name: 'PROTOTYPE',
    tagline: 'High-Fidelity Micro-Interactions & Interactive Simulation',
    overview: 'Bring static screens to life with smart animate transitions, realistic easing curves (stiffness: 400, damping: 25), and responsive keyboard/touch interactions.',
    inputs: ['Hi-Fi component screens', 'Micro-interaction specs', 'User testing scenarios'],
    deliverables: ['High-Fidelity Interactive Prototype', 'Motion Curves Specification', 'User Testing Video Recordings'],
    tools: ['Figma Prototype', 'ProtoPie', 'Framer'],
    keyQuestions: ['Does the motion feel snappy (<300ms) or sluggish?', 'Are loading and skeleton states seamless?']
  },
  {
    step: '09',
    name: 'USER TESTING',
    tagline: 'Usability Benchmarking, Friction Heatmaps & Heuristic Audits',
    overview: 'Run moderated and unmoderated usability sessions with real users. Track task completion rate, time-on-task, and cognitive friction scores.',
    inputs: ['Clickable prototype', 'Test scripts & task prompts', 'Screen recording software'],
    deliverables: ['Usability Audit Report', 'SUS Score (System Usability Scale)', 'Iterative Design Fixes Backlog'],
    tools: ['Maze', 'UserTesting', 'Loom', 'Hotjar'],
    keyQuestions: ['Where did users hesitate or misclick?', 'What percentage completed the primary flow without assistance?']
  },
  {
    step: '10',
    name: 'DEVELOPER HANDOFF',
    tagline: 'Figma Dev Mode, JSON Token Sync & Code Specifications',
    overview: 'Provide unambiguous technical specifications: spacing overlays, CSS custom properties, responsive breakpoints (390px, 834px, 1440px), and semantic DOM hierarchy.',
    inputs: ['Final validated designs', 'Design tokens repository', 'Component props definitions'],
    deliverables: ['Figma Dev Mode Specs', 'Tokens to CSS/Tailwind Export', 'Design QA Checklist'],
    tools: ['Figma Dev Mode', 'GitHub', 'Storybook', 'Zeplin'],
    keyQuestions: ['Are component props 1:1 with React interfaces?', 'Are edge-case empty and error states documented?']
  },
  {
    step: '11',
    name: 'QA & AUDIT',
    tagline: 'Cross-Device Parity, Accessibility & Motion Fidelity',
    overview: 'Execute rigorous design QA on staging builds. Validate sub-pixel alignment, font rendering, responsive viewport reflow, and screen reader accessibility.',
    inputs: ['Staging deployment URL', 'Design system token specs', 'Figma source files'],
    deliverables: ['Design QA Issue Tracker', 'Accessibility Audit Report (WCAG AAA)', 'Visual Regression Test Suite'],
    tools: ['BrowserStack', 'Playwright', 'Axe DevTools', 'Linear'],
    keyQuestions: ['Does the built product match Figma pixel-faithfully?', 'Are focus rings visible on keyboard navigation?']
  },
  {
    step: '12',
    name: 'LAUNCH & GO-TO-MARKET',
    tagline: 'Product Release, Telemetry Tracking & User Onboarding',
    overview: 'Deploy to production with real-time analytics tracking, onboarding tooltips, product changelog, and customer feedback loops.',
    inputs: ['Production release build', 'Marketing collateral', 'Analytics event schema'],
    deliverables: ['Live Production Product', 'Analytics Dashboard (Mixpanel/PostHog)', 'Product Launch Changelog'],
    tools: ['PostHog', 'Mixpanel', 'Vercel', 'Intercom'],
    keyQuestions: ['Is day-1 retention telemetry recording accurately?', 'Is onboarding conversion above baseline?']
  },
  {
    step: '13',
    name: 'ITERATE & OPTIMIZE',
    tagline: 'A/B Experimentation, Conversion Funnels & Growth Loops',
    overview: 'Analyze live user telemetry, identify conversion drop-offs, formulate A/B test hypotheses, and continuously refine user satisfaction.',
    inputs: ['Live telemetry data', 'Support tickets', 'User churn feedback'],
    deliverables: ['A/B Testing Roadmap', 'Conversion Optimization Report', 'V1.1 Feature Enhancement Specs'],
    tools: ['Statsig', 'PostHog', 'Linear', 'Notion'],
    keyQuestions: ['Which step in the funnel has the highest abandonment?', 'What small tweak yields the highest lift?']
  },
  {
    step: '14',
    name: 'SCALE & GOVERNANCE',
    tagline: 'Multi-Brand Token Architecture & Design System Scaling',
    overview: 'Scale the design system across multiple platforms, international locales, and sub-brands with versioned semantic tokens and automated component governance.',
    inputs: ['Multi-platform roadmap', 'Localization requirements', 'Sub-brand style guides'],
    deliverables: ['Multi-Brand Token Architecture', 'Design System Contribution Guide', 'Governance & Deprecation Lifecycle'],
    tools: ['Figma Enterprise', 'GitHub Actions', 'Zeroheight'],
    keyQuestions: ['Can a new brand theme be applied in under 5 minutes?', 'Is token versioning backward-compatible?']
  }
];

export const MasterFlowSection: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = FLOW_STEPS[activeStepIndex];
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const stepsTrackRef = useRef<HTMLDivElement | null>(null);

  // GSAP scroll trigger without hiding elements initially
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 800px)', () => {
      if (sectionRef.current) {
        gsap.from(sectionRef.current, {
          y: 30,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      }
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section 
      id="master-flow" 
      ref={sectionRef}
      className="px-4 sm:px-8 lg:px-12 2xl:px-20 max-w-[1780px] mx-auto w-full text-[#111111] relative"
    >
      <div className="w-full">
        {/* Section Header */}
        <div className="flex items-center justify-between gap-4 border-b-2 border-[#0a0a0a]/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="h-7 w-7 rounded-full bg-[#1a1a1a] text-white font-mono font-bold text-xs flex items-center justify-center">
              03
            </span>
            <span className="font-main font-bold uppercase tracking-wider text-xs text-[#111111]">
              MASTER PROJECT FLOW (14 STAGES)
            </span>
          </div>
          <span className="font-mono text-xs text-[#6b6b6b]">SABI MASTER PIPELINE</span>
        </div>

        <div className="mt-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl sm:text-5xl font-main tracking-tight leading-[1.1]">
              <span className="voral-headline-1">14-Stage Master Flow</span>
              <span className="voral-headline-2">with Full Deliverables & Inputs.</span>
            </h2>
            <p className="mt-3 text-base text-[#6b6b6b] leading-relaxed max-w-2xl">
              Click any stage below to inspect detailed inputs, required deliverables, primary tools used, and non-negotiable critical questions.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#6b6b6b] bg-white px-3.5 py-1.5 rounded-full border border-[#0a0a0a]/10 shadow-sm self-start md:self-auto">
            <span>Current Stage:</span>
            <strong className="text-[#111111]">{activeStep.step} / 14 ({activeStep.name})</strong>
          </div>
        </div>

        {/* 14 Stage Naturally Wrapped Button Grid (No Scrolling) */}
        <div 
          ref={stepsTrackRef}
          className="mt-8 flex flex-wrap items-center gap-2 sm:gap-2.5 pt-1"
        >
          {FLOW_STEPS.map((step, idx) => {
            const isActive = idx === activeStepIndex;
            return (
              <button
                key={step.step}
                onClick={() => {
                  sounds.playPop();
                  setActiveStepIndex(idx);
                }}
                className={`master-flow-step-btn px-4 py-2.5 rounded-2xl border-2 transition-all flex items-center gap-2 text-xs font-main ${
                  isActive
                    ? 'bg-[#1a1a1a] text-white border-[#0a0a0a] shadow-lg scale-105 z-10'
                    : 'bg-white text-[#111111] border-[#0a0a0a]/10 hover:border-[#0a0a0a]/40 hover:bg-[#ECEAE6]'
                }`}
              >
                <span className={`font-mono text-[10px] font-bold ${isActive ? 'text-emerald-400' : 'text-[#8a8a8a]'}`}>
                  {step.step}
                </span>
                <span className="font-bold whitespace-nowrap">{step.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Breakdown Dossier */}
        <motion.div
          key={activeStep.step}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#0a0a0a] shadow-xl space-y-6"
        >
          {/* Top Stage Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#0a0a0a]/10 pb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#1a1a1a] text-white font-mono text-[10px] font-bold">
                  STAGE {activeStep.step} OF 14
                </span>
                <span className="text-xs font-mono text-[#6b6b6b]">• SABI FRAMEWORK</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-main font-black tracking-tight text-[#111111]">
                {activeStep.name} — <span className="text-[#6b6b6b] font-normal text-lg sm:text-2xl">{activeStep.tagline}</span>
              </h3>
            </div>

            <button
              onClick={() => {
                sounds.playClick();
                setActiveStepIndex((activeStepIndex + 1) % FLOW_STEPS.length);
              }}
              className="voral-btn-pill"
            >
              <span>Next ({FLOW_STEPS[(activeStepIndex + 1) % FLOW_STEPS.length].name})</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Overview Description */}
          <p className="text-sm sm:text-base text-[#111111]/90 leading-relaxed font-normal">
            {activeStep.overview}
          </p>

          {/* 4 In-Depth Briefing Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {/* Box 1: Inputs */}
            <div className="p-4 rounded-2xl bg-[#F4F3F1] border border-[#0a0a0a]/10 space-y-2">
              <div className="flex items-center gap-2 text-[#111111] text-xs font-mono font-bold uppercase">
                <Target className="h-4 w-4 text-[#366299]" />
                <span>Required Inputs</span>
              </div>
              <ul className="space-y-1.5 text-xs text-[#6b6b6b]">
                {activeStep.inputs.map((inp) => (
                  <li key={inp} className="flex items-start gap-1.5">
                    <span className="text-[#111111] font-bold">•</span>
                    <span>{inp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Box 2: Deliverables */}
            <div className="p-4 rounded-2xl bg-[#F4F3F1] border border-[#0a0a0a]/10 space-y-2">
              <div className="flex items-center gap-2 text-emerald-800 text-xs font-mono font-bold uppercase">
                <FileCheck className="h-4 w-4 text-emerald-600" />
                <span>Key Deliverables</span>
              </div>
              <ul className="space-y-1.5 text-xs text-[#6b6b6b]">
                {activeStep.deliverables.map((del) => (
                  <li key={del} className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{del}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Box 3: Tools */}
            <div className="p-4 rounded-2xl bg-[#F4F3F1] border border-[#0a0a0a]/10 space-y-2">
              <div className="flex items-center gap-2 text-[#111111] text-xs font-mono font-bold uppercase">
                <Layers className="h-4 w-4 text-amber-600" />
                <span>Tools Used</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {activeStep.tools.map((tl) => (
                  <span key={tl} className="px-2 py-0.5 rounded-md bg-white border border-[#0a0a0a]/10 text-[11px] font-mono text-[#111111]">
                    {tl}
                  </span>
                ))}
              </div>
            </div>

            {/* Box 4: Key Questions */}
            <div className="p-4 rounded-2xl bg-[#F4F3F1] border border-[#0a0a0a]/10 space-y-2">
              <div className="flex items-center gap-2 text-[#111111] text-xs font-mono font-bold uppercase">
                <HelpCircle className="h-4 w-4 text-rose-600" />
                <span>Critical Questions</span>
              </div>
              <ul className="space-y-1.5 text-xs text-[#6b6b6b] italic">
                {activeStep.keyQuestions.map((q) => (
                  <li key={q} className="leading-snug">
                    "{q}"
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
