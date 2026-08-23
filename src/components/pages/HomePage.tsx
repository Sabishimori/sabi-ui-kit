import React from 'react';
import { motion } from 'framer-motion';
import { 
  Wrench, 
  Layers, 
  Smartphone, 
  Brain, 
  ArrowRight, 
  ArrowUpRight,
  ShieldCheck, 
  Grid, 
  FileCode2,
  Compass,
  Sparkles,
  Zap,
  Target,
  CheckCircle2,
  TrendingUp,
  Cpu,
  MoveRight,
  Quote
} from 'lucide-react';
import { HeroSection } from '../sections/HeroSection';
import { NotificationsStack } from '../motion/NotificationsStack';
import { PageView } from '../common/TopNavbar';
import { sounds } from '../../utils/audio';

interface HomePageProps {
  onNavigate: (page: PageView) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-28 sm:space-y-40 2xl:space-y-48 pb-24 sm:pb-36 w-full">
      
      {/* ── 1. Full-Bleed Helious-Style Video Hero ── */}
      <HeroSection onGetStarted={() => onNavigate('framework')} />

      {/* ── 2. Editorial Manifesto Spread: Why Sabi Kit OS Exists ── */}
      <section className="px-6 sm:px-12 lg:px-16 2xl:px-24 max-w-[1780px] mx-auto w-full">
        <div className="space-y-16 sm:space-y-24">
          
          {/* Section Category & Micro-Meta */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#0a0a0a]/10 pb-6">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#111111]">
                01 &bull; MANIFESTO & SYSTEM THESIS
              </span>
            </div>
            <span className="font-mono text-xs text-[#666666] tracking-wider uppercase">
              ZERO-AMBIGUITY DESIGN ENGINEERING &bull; SABI OS V1.0
            </span>
          </div>

          {/* Large Statement Typography & Narrative Spread */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Big Editorial Statement */}
            <div className="lg:col-span-7 space-y-8">
              <h2 className="text-4xl sm:text-6xl 2xl:text-7xl font-main font-black tracking-tight text-[#111111] leading-[1.04]">
                Digital products fail in the void between design craft and production code.
              </h2>

              <p className="text-lg sm:text-xl text-[#555555] font-normal leading-relaxed max-w-2xl">
                Most teams burn weeks in subjective debates, inconsistent pixel grids, and disconnected component states. Sabi Kit OS was engineered as an uncompromising operational workbench: mathematically anchored tokens, standardized page taxonomies, and live kinetic spring physics.
              </p>
            </div>

            {/* Right Pull Quote & Core Tenet */}
            <div className="lg:col-span-5 p-8 sm:p-12 rounded-3xl bg-white border border-[#0a0a0a]/10 shadow-sm space-y-6">
              <Quote className="h-8 w-8 text-[#366299]" />
              <blockquote className="text-xl sm:text-2xl font-main font-bold text-[#111111] leading-snug tracking-tight">
                "When tokens, layouts, and physics are defined mathematically before Figma frames are styled, ambiguity drops to zero."
              </blockquote>
              <div className="pt-4 border-t border-[#0a0a0a]/10 flex items-center justify-between text-xs font-mono text-[#666666]">
                <span className="font-bold text-[#111111]">SABI ARCHITECTURAL CREED</span>
                <span>WCAG AAA &bull; 8PT SPATIAL</span>
              </div>
            </div>
          </div>

          {/* 3 Spacious Architectural Pillar Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
            
            {/* Pillar 1 */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#0a0a0a]/10 shadow-sm flex flex-col justify-between min-h-[320px] space-y-6 hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-2xl bg-[#111111] text-white flex items-center justify-center shadow-md">
                  <Target className="h-6 w-6 text-emerald-400" />
                </div>
                <h3 className="font-main font-bold text-2xl text-[#111111] tracking-tight">
                  01. Relational Data Models First
                </h3>
                <p className="text-sm text-[#555555] leading-relaxed">
                  Before drawing UI components, we establish market domain taxonomy, client intake briefs, and entity relationship models so every screen reflects true backend state.
                </p>
              </div>
              <div className="pt-4 border-t border-[#0a0a0a]/10 text-xs font-mono text-[#666666] font-bold">
                8 CORE VERTICALS DEFINED
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#0a0a0a]/10 shadow-sm flex flex-col justify-between min-h-[320px] space-y-6 hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-2xl bg-[#111111] text-white flex items-center justify-center shadow-md">
                  <Grid className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="font-main font-bold text-2xl text-[#111111] tracking-tight">
                  02. 8pt Harmonic Spatial Scale
                </h3>
                <p className="text-sm text-[#555555] leading-relaxed">
                  A mathematical 8-step spatial scale paired with an 11-token WCAG AAA certified color palette eliminates pixel guesswork and ensures sub-pixel sharpness across all retina displays.
                </p>
              </div>
              <div className="pt-4 border-t border-[#0a0a0a]/10 text-xs font-mono text-[#666666] font-bold">
                100% SUB-PIXEL CRISP
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#0a0a0a]/10 shadow-sm flex flex-col justify-between min-h-[320px] space-y-6 hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-2xl bg-[#111111] text-white flex items-center justify-center shadow-md">
                  <Zap className="h-6 w-6 text-amber-400" />
                </div>
                <h3 className="font-main font-bold text-2xl text-[#111111] tracking-tight">
                  03. Kinetic Spring Physics
                </h3>
                <p className="text-sm text-[#555555] leading-relaxed">
                  Motion is physical reality. Every micro-interaction, card entry, and screen transition adheres to calibrated spring stiffness and damping curves with direct Framer Motion, GSAP, and CSS copy.
                </p>
              </div>
              <div className="pt-4 border-t border-[#0a0a0a]/10 text-xs font-mono text-[#666666] font-bold">
                FRAMER MOTION &bull; GSAP &bull; TAILWIND
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. The 4 Movements of Product Creation (Editorial Spread) ── */}
      <section className="px-6 sm:px-12 lg:px-16 2xl:px-24 max-w-[1780px] mx-auto w-full">
        <div className="space-y-16 sm:space-y-20">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#0a0a0a]/10 pb-6">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#111111]">
                02 &bull; THE 4 MOVEMENTS OF CREATION
              </span>
            </div>
            <span className="font-mono text-xs text-[#666666] tracking-wider uppercase">
              END-TO-END METHODOLOGY &bull; DISCOVERY TO HANDOFF
            </span>
          </div>

          {/* 4 Movements Horizontal Timeline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Movement 1 */}
            <div className="space-y-5 p-8 rounded-3xl bg-[#ECEAE6]/80 border border-[#0a0a0a]/10 flex flex-col justify-between min-h-[340px]">
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold text-[#666666] uppercase tracking-wider">
                  MOVEMENT 01
                </span>
                <h4 className="font-main font-black text-2xl text-[#111111] tracking-tight leading-tight">
                  Domain Taxonomy & Discovery
                </h4>
                <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                  Analyze industry landscape, sub-domain rules, unit economics, and client intake briefs before visual ideation.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#111111] font-bold">
                <span>Stages 01–06</span>
                <MoveRight className="h-3.5 w-3.5 text-emerald-600" />
              </div>
            </div>

            {/* Movement 2 */}
            <div className="space-y-5 p-8 rounded-3xl bg-[#ECEAE6]/80 border border-[#0a0a0a]/10 flex flex-col justify-between min-h-[340px]">
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold text-[#666666] uppercase tracking-wider">
                  MOVEMENT 02
                </span>
                <h4 className="font-main font-black text-2xl text-[#111111] tracking-tight leading-tight">
                  Research, IA & Wireframing
                </h4>
                <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                  Competitor matrices, personas, user journeys, relational page registries, and structural layout skeletons.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#111111] font-bold">
                <span>Stages 07–15</span>
                <MoveRight className="h-3.5 w-3.5 text-blue-600" />
              </div>
            </div>

            {/* Movement 3 */}
            <div className="space-y-5 p-8 rounded-3xl bg-[#ECEAE6]/80 border border-[#0a0a0a]/10 flex flex-col justify-between min-h-[340px]">
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold text-[#666666] uppercase tracking-wider">
                  MOVEMENT 03
                </span>
                <h4 className="font-main font-black text-2xl text-[#111111] tracking-tight leading-tight">
                  Design Tokens & Variables
                </h4>
                <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                  11-color palette, 8pt spatial grid, compound component library, and Figma variable token JSON export.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#111111] font-bold">
                <span>Stages 16–21</span>
                <MoveRight className="h-3.5 w-3.5 text-amber-600" />
              </div>
            </div>

            {/* Movement 4 */}
            <div className="space-y-5 p-8 rounded-3xl bg-[#ECEAE6]/80 border border-[#0a0a0a]/10 flex flex-col justify-between min-h-[340px]">
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold text-[#666666] uppercase tracking-wider">
                  MOVEMENT 04
                </span>
                <h4 className="font-main font-black text-2xl text-[#111111] tracking-tight leading-tight">
                  Kinetic Physics & Handoff
                </h4>
                <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                  Spring physics tuning, multi-device viewport adapters, edge-case QA audits, and zero-ambiguity CI/CD delivery.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#111111] font-bold">
                <span>Stages 22–28</span>
                <MoveRight className="h-3.5 w-3.5 text-rose-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. System Telemetry Benchmarks ── */}
      <section className="px-6 sm:px-12 lg:px-16 2xl:px-24 max-w-[1780px] mx-auto w-full">
        <div className="space-y-12">
          <div className="flex items-center justify-between gap-4 border-b border-[#0a0a0a]/10 pb-6">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#111111]">
                03 &bull; SYSTEM BENCHMARKS & TELEMETRY
              </span>
            </div>
            <span className="font-mono text-xs text-[#666666]">1920PX FLUID WORKBENCH</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* 4 Metric Cards */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-6">
              {[
                {
                  num: '28 / 28',
                  label: 'PROJECT STAGES',
                  desc: 'End-to-end lifecycle from market discovery to code handoff.',
                  icon: Layers,
                  badge: '100% Coverage'
                },
                {
                  num: '15 Pages',
                  label: 'FIGMA ARCHITECTURE',
                  desc: 'Standardized page directory with relational naming formula.',
                  icon: FileCode2,
                  badge: 'Zero Ambiguity'
                },
                {
                  num: '8px Ruler',
                  label: 'HARMONIC SPACING',
                  desc: 'Mathematical 8-step spacing scale and responsive columns.',
                  icon: Grid,
                  badge: 'Sub-pixel Crisp'
                },
                {
                  num: 'AAA Grade',
                  label: 'WCAG ACCESSIBILITY',
                  desc: '11-token color palette certified for maximum legibility.',
                  icon: ShieldCheck,
                  badge: 'Universal Design'
                }
              ].map((m) => {
                const Icon = m.icon;
                return (
                  <div
                    key={m.label}
                    className="p-8 rounded-3xl bg-white border border-[#0a0a0a]/10 shadow-sm flex flex-col justify-between min-h-[260px] hover:shadow-md hover:-translate-y-1 transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 rounded-full bg-[#F4F3F1] border border-[#0a0a0a]/10 text-xs font-mono font-bold text-[#111111]">
                          {m.badge}
                        </span>
                        <Icon className="h-4 w-4 text-[#666666]" />
                      </div>
                      <div className="font-main font-black text-3xl sm:text-4xl text-[#111111] tracking-tight">
                        {m.num}
                      </div>
                      <h4 className="font-mono text-xs text-[#555555] uppercase font-bold mt-1.5 tracking-wider">
                        {m.label}
                      </h4>
                    </div>
                    <p className="text-xs text-[#555555] leading-relaxed">
                      {m.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Notifications Feed */}
            <div className="lg:col-span-4 p-8 rounded-3xl bg-[#ECEAE6] border border-[#0a0a0a]/10 shadow-sm">
              <NotificationsStack />
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Specialized Studio Portals Spread ── */}
      <section className="px-6 sm:px-12 lg:px-16 2xl:px-24 max-w-[1780px] mx-auto w-full">
        <div className="space-y-12">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#0a0a0a]/10 pb-6">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#111111]">
                04 &bull; STUDIO SUITES & WORKSPACES
              </span>
            </div>
            <span className="font-mono text-xs text-[#666666]">5 SPECIALIZED PRODUCTION SUITES</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-8">
            
            {/* Portal 1: Workspace & Tools */}
            <div
              onClick={() => onNavigate('workspace')}
              className="p-8 2xl:p-10 rounded-3xl bg-white border border-[#0a0a0a]/10 shadow-sm hover:shadow-2xl cursor-pointer group flex flex-col justify-between min-h-[340px] transition-all hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="p-3.5 rounded-2xl bg-[#111111] text-white shadow-md">
                    <Wrench className="h-5 w-5 text-emerald-400" />
                  </span>
                  <span className="px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60 font-mono text-xs font-bold">
                    6 Live Tools
                  </span>
                </div>
                <h4 className="font-main font-bold text-2xl text-[#111111] group-hover:text-[#366299] transition-colors leading-tight">
                  Interactive Workspace & Tools
                </h4>
                <p className="text-sm text-[#555555] leading-relaxed">
                  Draggable canvas with live API integration, Auto-Layout & Component Boolean Studio, and spring physics lab.
                </p>
              </div>

              <div className="pt-6 border-t border-[#0a0a0a]/10 flex items-center justify-between text-xs font-mono font-bold text-[#111111]">
                <span>Launch Studio & Tools</span>
                <ArrowUpRight className="h-4 w-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-emerald-600" />
              </div>
            </div>

            {/* Portal 2: Product Creation Framework */}
            <div
              onClick={() => onNavigate('framework')}
              className="p-8 2xl:p-10 rounded-3xl bg-white border border-[#0a0a0a]/10 shadow-sm hover:shadow-2xl cursor-pointer group flex flex-col justify-between min-h-[340px] transition-all hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="p-3.5 rounded-2xl bg-[#111111] text-white shadow-md">
                    <Layers className="h-5 w-5 text-blue-400" />
                  </span>
                  <span className="px-3.5 py-1 rounded-full bg-[#F4F3F1] border border-[#0a0a0a]/10 text-[#111111] font-mono text-xs font-bold">
                    8 Subdivisions
                  </span>
                </div>
                <h4 className="font-main font-bold text-2xl text-[#111111] group-hover:text-[#366299] transition-colors leading-tight">
                  Product Creation Framework
                </h4>
                <p className="text-sm text-[#555555] leading-relaxed">
                  OS Folder-Tab navigation across 8 rich subdivisions: Domain taxonomy, intake briefs, IA, tokens, and handoff.
                </p>
              </div>

              <div className="pt-6 border-t border-[#0a0a0a]/10 flex items-center justify-between text-xs font-mono font-bold text-[#111111]">
                <span>Read 8 Subdivisions (01–28)</span>
                <ArrowUpRight className="h-4 w-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-blue-600" />
              </div>
            </div>

            {/* Portal 3: Essential Apps & Widgets */}
            <div
              onClick={() => onNavigate('widgets')}
              className="p-8 2xl:p-10 rounded-3xl bg-white border border-[#0a0a0a]/10 shadow-sm hover:shadow-2xl cursor-pointer group flex flex-col justify-between min-h-[340px] transition-all hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="p-3.5 rounded-2xl bg-[#111111] text-white shadow-md">
                    <Smartphone className="h-5 w-5 text-amber-400" />
                  </span>
                  <span className="px-3.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200/60 font-mono text-xs font-bold">
                    Nothing (R) Matrix
                  </span>
                </div>
                <h4 className="font-main font-bold text-2xl text-[#111111] group-hover:text-[#366299] transition-colors leading-tight">
                  Essential Apps & Widgets (Beta)
                </h4>
                <p className="text-sm text-[#555555] leading-relaxed">
                  12 interactive dot-matrix widgets, Halley's orbital tracker, Calm dandelion breathing, and turntable audio visualizer.
                </p>
              </div>

              <div className="pt-6 border-t border-[#0a0a0a]/10 flex items-center justify-between text-xs font-mono font-bold text-[#111111]">
                <span>Explore 12 Live Widgets</span>
                <ArrowUpRight className="h-4 w-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-amber-600" />
              </div>
            </div>

            {/* Portal 4: Laws of UX Laboratory */}
            <div
              onClick={() => onNavigate('laws')}
              className="p-8 2xl:p-10 rounded-3xl bg-white border border-[#0a0a0a]/10 shadow-sm hover:shadow-2xl cursor-pointer group flex flex-col justify-between min-h-[340px] transition-all hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="p-3.5 rounded-2xl bg-[#111111] text-white shadow-md">
                    <Brain className="h-5 w-5 text-rose-400" />
                  </span>
                  <span className="px-3.5 py-1 rounded-full bg-rose-50 text-rose-800 border border-rose-200/60 font-mono text-xs font-bold">
                    Cognitive Heuristics
                  </span>
                </div>
                <h4 className="font-main font-bold text-2xl text-[#111111] group-hover:text-[#366299] transition-colors leading-tight">
                  Laws of UX & Cognitive Laboratory
                </h4>
                <p className="text-sm text-[#555555] leading-relaxed">
                  Interactive behavioral experiments for Fitts's Law, Hick's Law, Doherty Threshold (&lt;400ms), and Miller's 7±2 Law.
                </p>
              </div>

              <div className="pt-6 border-t border-[#0a0a0a]/10 flex items-center justify-between text-xs font-mono font-bold text-[#111111]">
                <span>Run Heuristic Tests</span>
                <ArrowUpRight className="h-4 w-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-rose-600" />
              </div>
            </div>

            {/* Portal 5: Curated Design Reference & Prompt Vault (106+) */}
            <div
              onClick={() => onNavigate('resources')}
              className="p-8 2xl:p-12 rounded-3xl bg-white border border-[#0a0a0a]/10 shadow-sm hover:shadow-2xl cursor-pointer group flex flex-col justify-between min-h-[320px] transition-all hover:-translate-y-1 md:col-span-2 2xl:col-span-4"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="space-y-3 max-w-3xl">
                  <div className="flex items-center gap-2">
                    <span className="p-3.5 rounded-2xl bg-[#111111] text-white shadow-md">
                      <Compass className="h-5 w-5 text-emerald-400" />
                    </span>
                    <span className="px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60 font-mono text-xs font-bold">
                      100+ Curated Tools & Vault
                    </span>
                  </div>
                  <h4 className="font-main font-bold text-2xl sm:text-4xl text-[#111111] group-hover:text-[#366299] transition-colors leading-tight">
                    Design Reference & Prompt Engineering Vault
                  </h4>
                  <p className="text-sm sm:text-base text-[#555555] leading-relaxed">
                    Mobbin, Refero, Laws of UX, Midjourney prompts, Coolors, Typewolf, GSAP, Spline, Shadcn UI, and Storybook. Complete with usage workflows and senior designer tips.
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-3">
                  <span className="voral-btn-pill shadow-md text-sm px-6 py-3">
                    <span>Open 100+ Resources Vault</span>
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>

              <div className="pt-6 border-t border-[#0a0a0a]/10 flex items-center justify-between text-xs font-mono font-bold text-[#666666]">
                <span>Direct Link & Prompt Copier Included</span>
                <span className="text-emerald-700 font-bold">100% Curated for Senior Architects</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
