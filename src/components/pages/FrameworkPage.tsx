import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Layers, 
  BookOpen, 
  Sparkles, 
  HelpCircle,
  Building2,
  FileText,
  Search,
  Network,
  Layout,
  Palette,
  Zap,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Terminal,
  FolderOpen
} from 'lucide-react';
import { MotionAccordion, AccordionItem } from '../motion/MotionAccordion';
import { sounds } from '../../utils/audio';

// Sections
import { PurposeSection } from '../sections/PurposeSection';
import { MasterFlowSection } from '../sections/MasterFlowSection';
import { DashboardSection } from '../sections/DashboardSection';
import { BriefContextSection } from '../sections/BriefContextSection';
import { DomainMatrixSection } from '../sections/DomainMatrixSection';
import { BusinessModelSection } from '../sections/BusinessModelSection';
import { CompetitorSection } from '../sections/CompetitorSection';
import { ReferenceBoardSection } from '../sections/ReferenceBoardSection';
import { PersonaSection } from '../sections/PersonaSection';
import { UserJourneySection } from '../sections/UserJourneySection';
import { UserFlowsSection } from '../sections/UserFlowsSection';
import { InformationArchitectureSection } from '../sections/InformationArchitectureSection';
import { ScreenInventorySection } from '../sections/ScreenInventorySection';
import { WireframeSection } from '../sections/WireframeSection';
import { VisualDirectionSection } from '../sections/VisualDirectionSection';
import { ColorSystemSection } from '../sections/ColorSystemSection';
import { TypographySection } from '../sections/TypographySection';
import { HierarchySystemSection } from '../sections/HierarchySystemSection';
import { SpacingGridSection } from '../sections/SpacingGridSection';
import { SpatialSystemSection } from '../sections/SpatialSystemSection';
import { ComponentLibrarySection } from '../sections/ComponentLibrarySection';
import { DesignTokensSection } from '../sections/DesignTokensSection';
import { ResponsiveSection } from '../sections/ResponsiveSection';
import { MotionLibrarySection } from '../sections/MotionLibrarySection';
import { HiFiPipelineSection } from '../sections/HiFiPipelineSection';
import { QAHandoffSection } from '../sections/QAHandoffSection';
import { FileStructureSection } from '../sections/FileStructureSection';
import { ModularitySection } from '../sections/ModularitySection';
import { ClosingSection } from '../sections/ClosingSection';

interface FrameworkPageProps {}

type SubdivisionId = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08';

interface StageItem {
  id: string;
  num: string;
  title: string;
  subtitle: string;
}

interface Subdivision {
  id: SubdivisionId;
  name: string;
  label: string;
  category: string;
  icon: React.FC<{ className?: string }>;
  desc: string;
  stages: StageItem[];
}

const SUBDIVISIONS: Subdivision[] = [
  {
    id: '01',
    name: 'Domain Landscape & Verticals',
    label: '01. Domain Landscape',
    category: 'DOMAINS & VERTICALS',
    icon: Building2,
    desc: 'Understanding industry landscapes, sub-domain trees, monetization models, and strategic intent.',
    stages: [
      { id: 'domain-matrix', num: '01', title: 'Domain Landscape Matrix', subtitle: '8 Core Industry Verticals' },
      { id: 'business-model', num: '02', title: 'Business Model & Value Props', subtitle: 'Monetization & Unit Economics' },
      { id: 'purpose-intent', num: '03', title: 'Strategic Purpose & Intent', subtitle: 'Executive North Star' },
      { id: 'master-flow', num: '04', title: 'Master Project Flow', subtitle: 'End-to-End Milestone Map' },
    ]
  },
  {
    id: '02',
    name: 'Intake & Discovery Scoping',
    label: '02. Intake & Scope',
    category: 'INTAKE & REQUIREMENTS',
    icon: FileText,
    desc: 'How product requirements are collected, client templates, intake checklists, and scoping specs.',
    stages: [
      { id: 'brief-context', num: '05', title: 'Client Intake Discovery Brief', subtitle: 'Scoping Specs & Templates' },
      { id: 'dashboard-telemetry', num: '06', title: 'Telemetry & Success KPIs', subtitle: 'System Metrics & Health' },
    ]
  },
  {
    id: '03',
    name: 'Research, Competitors & UX',
    label: '03. Research & UX',
    category: 'RESEARCH & BENCHMARKS',
    icon: Search,
    desc: 'Quantitative & qualitative research, competitor benchmark matrices, moodboards, and user journey mapping.',
    stages: [
      { id: 'competitor-analysis', num: '07', title: 'Competitor Intelligence Matrix', subtitle: '4-Quadrant Positioning' },
      { id: 'reference-board', num: '08', title: 'Visual Reference Library', subtitle: 'Craft & Quality Moodboards' },
      { id: 'persona-archetypes', num: '09', title: 'User Persona Archetypes', subtitle: 'Behavioral Motivations' },
      { id: 'user-journey', num: '10', title: 'End-to-End User Journey', subtitle: 'Friction Points & Delights' },
    ]
  },
  {
    id: '04',
    name: 'IA & Interaction Flows',
    label: '04. IA & Flows',
    category: 'IA & USER FLOWS',
    icon: Network,
    desc: 'Tree taxonomy, relational database models, screen inventory registries, and decision user flows.',
    stages: [
      { id: 'user-flows', num: '11', title: 'Decision & Interaction Flows', subtitle: 'High-Cardinality Pathways' },
      { id: 'info-architecture', num: '12', title: 'Information Architecture (IA)', subtitle: 'Relational Page Taxonomy' },
      { id: 'screen-inventory', num: '13', title: 'Complete Screen Inventory', subtitle: 'Standardized Page Registry' },
    ]
  },
  {
    id: '05',
    name: 'Wireframing & Blueprints',
    label: '05. Wireframes',
    category: 'WIREFRAMES & SKELETONS',
    icon: Layout,
    desc: 'Low-fidelity structural skeletons, visual hierarchy weighting, and component placement rules.',
    stages: [
      { id: 'wireframe-blueprints', num: '14', title: 'Low-Fidelity Wireframes', subtitle: 'Layout Skeletons & Sizing' },
      { id: 'hierarchy-system', num: '15', title: 'Visual Hierarchy & Scanning', subtitle: '100/60/40 Luminance Rules' },
    ]
  },
  {
    id: '06',
    name: 'Product Systems & Tokens',
    label: '06. Product Systems',
    category: 'PRODUCT & SYSTEMS',
    icon: Palette,
    desc: 'Mathematical 11-token color palette, 8pt harmonic spatial system, card compounds, and Figma variables.',
    stages: [
      { id: 'color-system', num: '16', title: '11-Token Mathematical Colors', subtitle: 'WCAG AAA certified scale' },
      { id: 'typography-system', num: '17', title: 'Typographic Hierarchy & Scale', subtitle: 'Harmonic Type Modular Scale' },
      { id: 'spatial-system', num: '18', title: '8pt Spatial System', subtitle: 'Sub-pixel Sharp Spacing' },
      { id: 'spacing-grid', num: '19', title: 'Responsive 8-Column Grid', subtitle: 'Fluid Breakpoint Physics' },
      { id: 'component-library', num: '20', title: 'Card & Compound Components', subtitle: 'Atomic Component Library' },
      { id: 'design-tokens', num: '21', title: 'Design Token Schema & Variables', subtitle: 'JSON Token Export Engine' },
    ]
  },
  {
    id: '07',
    name: 'Kinetic Motion & Lifecycle',
    label: '07. Motion & Lifecycle',
    category: 'CREATION & LIFECYCLE',
    icon: Zap,
    desc: 'Kinetic text animations, card hover springs, screen transitions, and responsive viewport adapters.',
    stages: [
      { id: 'motion-library', num: '22', title: 'Kinetic Spring Physics Lab', subtitle: 'Framer / GSAP / CSS Tokens' },
      { id: 'responsive-engine', num: '23', title: 'Adaptive Multi-Device Breakpoints', subtitle: 'Mobile to 1920px Ultra-Wide' },
    ]
  },
  {
    id: '08',
    name: 'Hi-Fi & Production Handoff',
    label: '08. Hi-Fi & Handoff',
    category: 'DELIVERY & HANDOFF',
    icon: CheckCircle2,
    desc: 'Visual direction, production prototypes, Figma Dev Mode sync, edge-case QA, and modular delivery.',
    stages: [
      { id: 'visual-direction', num: '24', title: 'Aesthetic Visual Direction', subtitle: 'High-Craft Art Direction' },
      { id: 'hifi-pipeline', num: '25', title: 'Hi-Fi Component Pipeline', subtitle: 'Draft to Production Variable' },
      { id: 'qa-handoff', num: '26', title: 'Quality Assurance Checklist', subtitle: 'Edge-Case Audit Matrix' },
      { id: 'file-structure', num: '27', title: 'Figma File & Page Registry', subtitle: 'Standard Directory Architecture' },
      { id: 'modularity-handoff', num: '28', title: 'Modular Production Architecture', subtitle: 'Zero-Ambiguity Dev Handoff' },
    ]
  }
];

const FRAMEWORK_FAQS: AccordionItem[] = [
  {
    id: 'faq-1',
    category: 'SUBDIVISION 01 • DOMAIN LANDSCAPE',
    title: 'How does Sabi Kit structure business domains before design starts?',
    content: 'By establishing explicit domain constraints, unit economics, regulatory compliance matrices (e.g., HIPAA for Health, PCI-DSS for Fintech), and proven industry reference sets before sketching a single screen.'
  },
  {
    id: 'faq-2',
    category: 'SUBDIVISION 06 • PRODUCT SYSTEMS',
    title: 'Why use an 8-point spatial system instead of arbitrary pixels?',
    content: 'The 8pt system guarantees sub-pixel sharpness across 1x, 2x, and 3x device screens, aligns directly with 8-column layout grids, and reduces spatial decision fatigue to zero.'
  },
  {
    id: 'faq-3',
    category: 'SUBDIVISION 08 • PRODUCTION HANDOFF',
    title: 'How are Figma variables synchronized with production code?',
    content: 'Tokens are exported as structured JSON schemas and transformed into CSS Custom Properties and Tailwind CSS theme configurations with automated CI/CD linting.'
  }
];

export const FrameworkPage: React.FC<FrameworkPageProps> = () => {
  const [activeSubdivisionId, setActiveSubdivisionId] = useState<SubdivisionId>('01');
  const [activeStageId, setActiveStageId] = useState<string>('domain-matrix');
  const [sidebarSearch, setSidebarSearch] = useState('');
  const [expandedSubdivisions, setExpandedSubdivisions] = useState<Record<string, boolean>>({
    '01': true,
    '02': true,
    '03': true,
    '04': true,
    '05': true,
    '06': true,
    '07': true,
    '08': true,
  });

  // Scroll spy to highlight active section in sidebar automatically
  useEffect(() => {
    const handleScrollSpy = () => {
      const scrollPos = window.scrollY + 200;

      // Check subdivisions
      for (const sub of SUBDIVISIONS) {
        const el = document.getElementById(`subdivision-${sub.id}`);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSubdivisionId(sub.id);
            break;
          }
        }
      }

      // Check stages
      for (const sub of SUBDIVISIONS) {
        for (const stage of sub.stages) {
          const el = document.getElementById(stage.id);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
              setActiveStageId(stage.id);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  const toggleSubdivision = (subId: string) => {
    sounds.playPop();
    setExpandedSubdivisions(prev => ({
      ...prev,
      [subId]: !prev[subId]
    }));
  };

  const scrollToSubdivision = (subId: SubdivisionId) => {
    sounds.playClick();
    setActiveSubdivisionId(subId);
    const element = document.getElementById(`subdivision-${subId}`);
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  const scrollToStage = (subId: SubdivisionId, stageId: string) => {
    sounds.playClick();
    setActiveSubdivisionId(subId);
    setActiveStageId(stageId);
    const element = document.getElementById(stageId);
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-20 sm:pb-32 w-full">
      
      {/* ── Page Header Spread ── */}
      <section className="px-3 sm:px-6 lg:px-8 2xl:px-10 max-w-[1880px] mx-auto w-full">
        <div className="p-8 sm:p-12 2xl:p-14 rounded-3xl bg-white border border-[#0a0a0a]/10 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <span className="h-6 w-6 rounded-lg bg-[#111111] text-white flex items-center justify-center shadow-sm">
              <Layers className="h-3.5 w-3.5 text-emerald-400" />
            </span>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#111111]">
              END-TO-END PRODUCT FRAMEWORK &bull; 8 SUBDIVISIONS &bull; 28 CONTINUOUS STAGES
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl 2xl:text-6xl font-main font-black tracking-tight text-[#111111] leading-tight">
            Product Creation Lifecycle & Systems
          </h1>

          <p className="text-base sm:text-lg text-[#555555] leading-relaxed max-w-4xl">
            A comprehensive, scrollable production blueprint. Browse continuously from domain taxonomy to token architecture, spring physics, and production CI/CD handoff, or use the sticky sidebar to jump to any stage.
          </p>
        </div>
      </section>

      {/* ── Master Continuous Scrollable Layout with Sticky Side Navigation ── */}
      <section className="px-3 sm:px-6 lg:px-8 2xl:px-10 max-w-[1880px] mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-start gap-6 2xl:gap-8 relative">
          
          {/* ══════════════════════════════════════════════════════════════════
              LEFT SIDE SUB-NAVIGATION (In-Flow Resting & Sticky on Scroll)
             ══════════════════════════════════════════════════════════════════ */}
          <aside className="w-full lg:w-80 2xl:w-96 shrink-0 lg:sticky lg:top-24 z-20 self-start">
            <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#0a0a0a]/10 shadow-sm flex flex-col max-h-[calc(100vh-7.5rem)] space-y-3.5">
              
              {/* Sidebar Header & Search */}
              <div className="space-y-2.5 pb-3 border-b border-[#0a0a0a]/10 shrink-0">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#111111] flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
                    FRAMEWORK INDEX
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#F4F3F1] text-[#666666] font-bold">
                    28 Stages
                  </span>
                </div>

                <div className="relative">
                  <Search className="h-3.5 w-3.5 text-[#666666] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={sidebarSearch}
                    onChange={(e) => setSidebarSearch(e.target.value)}
                    placeholder="Quick filter stages..."
                    className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-[#F4F3F1] border border-[#0a0a0a]/10 text-xs font-mono text-[#111111] placeholder:text-[#666666] focus:outline-none focus:ring-1 focus:ring-[#111111]"
                  />
                </div>
              </div>

              {/* 8 Subdivisions Tree List */}
              <div className="flex-1 overflow-y-auto no-scrollbar space-y-1.5 pr-1">
                {SUBDIVISIONS.map((sub) => {
                  const Icon = sub.icon;
                  const isCurrentSub = activeSubdivisionId === sub.id;
                  const isExpanded = expandedSubdivisions[sub.id] || sidebarSearch.length > 0;

                  // Filter stages if search query active
                  const filteredStages = sidebarSearch 
                    ? sub.stages.filter(s => s.title.toLowerCase().includes(sidebarSearch.toLowerCase()) || s.num.includes(sidebarSearch))
                    : sub.stages;

                  if (sidebarSearch && filteredStages.length === 0) return null;

                  return (
                    <div key={sub.id} className="space-y-1">
                      
                      {/* Subdivision Category Header */}
                      <button
                        onClick={() => {
                          toggleSubdivision(sub.id);
                          scrollToSubdivision(sub.id);
                        }}
                        className={`w-full p-2.5 rounded-2xl flex items-center justify-between text-left transition-all ${
                          isCurrentSub
                            ? 'bg-[#111111] text-white shadow-md'
                            : 'hover:bg-[#F4F3F1] text-[#111111]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Icon className={`h-4 w-4 shrink-0 ${isCurrentSub ? 'text-emerald-400' : 'text-[#666666]'}`} />
                          <span className="font-main font-bold text-xs truncate">
                            {sub.name}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full ${
                            isCurrentSub ? 'bg-white/20 text-white' : 'bg-[#ECEAE6] text-[#666666]'
                          }`}>
                            {sub.stages.length}
                          </span>
                          <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''} ${isCurrentSub ? 'text-white/70' : 'text-[#666666]'}`} />
                        </div>
                      </button>

                      {/* Nested Stages Tree */}
                      {isExpanded && (
                        <div className="relative pl-5 py-1 space-y-1 ml-3 border-l-2 border-[#0a0a0a]/10">
                          {filteredStages.map((stage) => {
                            const isStageActive = activeStageId === stage.id;
                            return (
                              <button
                                key={stage.id}
                                onClick={() => scrollToStage(sub.id, stage.id)}
                                className={`w-full text-left px-3 py-1.5 rounded-xl text-xs transition-all flex items-center justify-between group relative ${
                                  isStageActive
                                    ? 'bg-[#ECEAE6] text-[#111111] font-bold shadow-sm'
                                    : 'text-[#555555] hover:text-[#111111] hover:bg-[#F4F3F1]'
                                }`}
                              >
                                {isStageActive && (
                                  <span className="absolute -left-[22px] top-1/2 -translate-y-1/2 w-1.5 h-4 bg-[#111111] rounded-r-full" />
                                )}

                                <div className="flex items-center gap-2 min-w-0">
                                  <span className={`text-[10px] font-mono ${isStageActive ? 'text-emerald-700 font-bold' : 'text-[#888888]'}`}>
                                    {stage.num}
                                  </span>
                                  <span className="truncate">
                                    {stage.title}
                                  </span>
                                </div>

                                <ChevronRight className={`h-3 w-3 shrink-0 ${isStageActive ? 'text-[#111111]' : 'opacity-0 group-hover:opacity-100 text-[#888888]'}`} />
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Sidebar Footer Indicator */}
              <div className="pt-3 border-t border-[#0a0a0a]/10 shrink-0 flex items-center justify-between text-[11px] font-mono text-[#666666]">
                <span>Continuous Scroll Feed</span>
                <span className="text-emerald-700 font-bold">100% Live</span>
              </div>
            </div>
          </aside>

          {/* ══════════════════════════════════════════════════════════════════
              RIGHT CONTENT VIEWPORT (Continuous All 8 Subdivisions Scroll Feed)
             ══════════════════════════════════════════════════════════════════ */}
          <main className="flex-1 min-w-0 space-y-24 sm:space-y-36">
            
            {/* ── Subdivision 01: Domain Landscape & Verticals ── */}
            <div id="subdivision-01" className="space-y-12 sm:space-y-16">
              <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#0a0a0a]/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#666666]">
                    <Building2 className="h-4 w-4 text-emerald-700" />
                    <span>Subdivision 01 &bull; DOMAINS & VERTICALS</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-main font-bold text-[#111111]">
                    Domain Landscape & Verticals
                  </h2>
                  <p className="text-sm sm:text-base text-[#555555] leading-relaxed max-w-3xl">
                    Understanding industry landscapes, sub-domain trees, monetization models, and strategic intent.
                  </p>
                </div>
                <div className="shrink-0 text-xs font-mono px-3.5 py-1.5 rounded-full bg-[#F4F3F1] border border-[#0a0a0a]/10 font-bold text-[#111111]">
                  Stages 01–04
                </div>
              </div>

              <div className="space-y-20 sm:space-y-28">
                <div id="domain-matrix"><DomainMatrixSection /></div>
                <div id="business-model"><BusinessModelSection /></div>
                <div id="purpose-intent"><PurposeSection /></div>
                <div id="master-flow"><MasterFlowSection /></div>
              </div>
            </div>

            {/* ── Subdivision 02: Intake & Discovery Scoping ── */}
            <div id="subdivision-02" className="space-y-12 sm:space-y-16 pt-8 border-t border-[#0a0a0a]/10">
              <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#0a0a0a]/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#666666]">
                    <FileText className="h-4 w-4 text-emerald-700" />
                    <span>Subdivision 02 &bull; INTAKE & REQUIREMENTS</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-main font-bold text-[#111111]">
                    Intake & Discovery Scoping
                  </h2>
                  <p className="text-sm sm:text-base text-[#555555] leading-relaxed max-w-3xl">
                    How product requirements are collected, client templates, intake checklists, and scoping specs.
                  </p>
                </div>
                <div className="shrink-0 text-xs font-mono px-3.5 py-1.5 rounded-full bg-[#F4F3F1] border border-[#0a0a0a]/10 font-bold text-[#111111]">
                  Stages 05–06
                </div>
              </div>

              <div className="space-y-20 sm:space-y-28">
                <div id="brief-context"><BriefContextSection /></div>
                <div id="dashboard-telemetry"><DashboardSection /></div>
              </div>
            </div>

            {/* ── Subdivision 03: Research, Competitors & UX ── */}
            <div id="subdivision-03" className="space-y-12 sm:space-y-16 pt-8 border-t border-[#0a0a0a]/10">
              <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#0a0a0a]/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#666666]">
                    <Search className="h-4 w-4 text-emerald-700" />
                    <span>Subdivision 03 &bull; RESEARCH & BENCHMARKS</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-main font-bold text-[#111111]">
                    Research, Competitors & UX
                  </h2>
                  <p className="text-sm sm:text-base text-[#555555] leading-relaxed max-w-3xl">
                    Quantitative & qualitative research, competitor benchmark matrices, moodboards, and user journey mapping.
                  </p>
                </div>
                <div className="shrink-0 text-xs font-mono px-3.5 py-1.5 rounded-full bg-[#F4F3F1] border border-[#0a0a0a]/10 font-bold text-[#111111]">
                  Stages 07–10
                </div>
              </div>

              <div className="space-y-20 sm:space-y-28">
                <div id="competitor-analysis"><CompetitorSection /></div>
                <div id="reference-board"><ReferenceBoardSection /></div>
                <div id="persona-archetypes"><PersonaSection /></div>
                <div id="user-journey"><UserJourneySection /></div>
              </div>
            </div>

            {/* ── Subdivision 04: IA & Interaction Flows ── */}
            <div id="subdivision-04" className="space-y-12 sm:space-y-16 pt-8 border-t border-[#0a0a0a]/10">
              <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#0a0a0a]/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#666666]">
                    <Network className="h-4 w-4 text-emerald-700" />
                    <span>Subdivision 04 &bull; IA & USER FLOWS</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-main font-bold text-[#111111]">
                    IA & Interaction Flows
                  </h2>
                  <p className="text-sm sm:text-base text-[#555555] leading-relaxed max-w-3xl">
                    Tree taxonomy, relational database models, screen inventory registries, and decision user flows.
                  </p>
                </div>
                <div className="shrink-0 text-xs font-mono px-3.5 py-1.5 rounded-full bg-[#F4F3F1] border border-[#0a0a0a]/10 font-bold text-[#111111]">
                  Stages 11–13
                </div>
              </div>

              <div className="space-y-20 sm:space-y-28">
                <div id="user-flows"><UserFlowsSection /></div>
                <div id="info-architecture"><InformationArchitectureSection /></div>
                <div id="screen-inventory"><ScreenInventorySection /></div>
              </div>
            </div>

            {/* ── Subdivision 05: Wireframing & Blueprints ── */}
            <div id="subdivision-05" className="space-y-12 sm:space-y-16 pt-8 border-t border-[#0a0a0a]/10">
              <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#0a0a0a]/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#666666]">
                    <Layout className="h-4 w-4 text-emerald-700" />
                    <span>Subdivision 05 &bull; WIREFRAMES & SKELETONS</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-main font-bold text-[#111111]">
                    Wireframing & Blueprints
                  </h2>
                  <p className="text-sm sm:text-base text-[#555555] leading-relaxed max-w-3xl">
                    Low-fidelity structural skeletons, visual hierarchy weighting, and component placement rules.
                  </p>
                </div>
                <div className="shrink-0 text-xs font-mono px-3.5 py-1.5 rounded-full bg-[#F4F3F1] border border-[#0a0a0a]/10 font-bold text-[#111111]">
                  Stages 14–15
                </div>
              </div>

              <div className="space-y-20 sm:space-y-28">
                <div id="wireframe-blueprints"><WireframeSection /></div>
                <div id="hierarchy-system"><HierarchySystemSection /></div>
              </div>
            </div>

            {/* ── Subdivision 06: Product Systems & Tokens ── */}
            <div id="subdivision-06" className="space-y-12 sm:space-y-16 pt-8 border-t border-[#0a0a0a]/10">
              <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#0a0a0a]/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#666666]">
                    <Palette className="h-4 w-4 text-emerald-700" />
                    <span>Subdivision 06 &bull; PRODUCT & SYSTEMS</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-main font-bold text-[#111111]">
                    Product Systems & Tokens
                  </h2>
                  <p className="text-sm sm:text-base text-[#555555] leading-relaxed max-w-3xl">
                    Mathematical 11-token color palette, 8pt harmonic spatial system, card compounds, and Figma variables.
                  </p>
                </div>
                <div className="shrink-0 text-xs font-mono px-3.5 py-1.5 rounded-full bg-[#F4F3F1] border border-[#0a0a0a]/10 font-bold text-[#111111]">
                  Stages 16–21
                </div>
              </div>

              <div className="space-y-20 sm:space-y-28">
                <div id="color-system"><ColorSystemSection /></div>
                <div id="typography-system"><TypographySection /></div>
                <div id="spatial-system"><SpatialSystemSection /></div>
                <div id="spacing-grid"><SpacingGridSection /></div>
                <div id="component-library"><ComponentLibrarySection /></div>
                <div id="design-tokens"><DesignTokensSection /></div>
              </div>
            </div>

            {/* ── Subdivision 07: Kinetic Motion & Lifecycle ── */}
            <div id="subdivision-07" className="space-y-12 sm:space-y-16 pt-8 border-t border-[#0a0a0a]/10">
              <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#0a0a0a]/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#666666]">
                    <Zap className="h-4 w-4 text-emerald-700" />
                    <span>Subdivision 07 &bull; CREATION & LIFECYCLE</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-main font-bold text-[#111111]">
                    Kinetic Motion & Lifecycle
                  </h2>
                  <p className="text-sm sm:text-base text-[#555555] leading-relaxed max-w-3xl">
                    Kinetic text animations, card hover springs, screen transitions, and responsive viewport adapters.
                  </p>
                </div>
                <div className="shrink-0 text-xs font-mono px-3.5 py-1.5 rounded-full bg-[#F4F3F1] border border-[#0a0a0a]/10 font-bold text-[#111111]">
                  Stages 22–23
                </div>
              </div>

              <div className="space-y-20 sm:space-y-28">
                <div id="motion-library"><MotionLibrarySection /></div>
                <div id="responsive-engine"><ResponsiveSection /></div>
              </div>
            </div>

            {/* ── Subdivision 08: Hi-Fi & Production Handoff ── */}
            <div id="subdivision-08" className="space-y-12 sm:space-y-16 pt-8 border-t border-[#0a0a0a]/10">
              <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#0a0a0a]/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#666666]">
                    <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                    <span>Subdivision 08 &bull; DELIVERY & HANDOFF</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-main font-bold text-[#111111]">
                    Hi-Fi & Production Handoff
                  </h2>
                  <p className="text-sm sm:text-base text-[#555555] leading-relaxed max-w-3xl">
                    Visual direction, production prototypes, Figma Dev Mode sync, edge-case QA, and modular delivery.
                  </p>
                </div>
                <div className="shrink-0 text-xs font-mono px-3.5 py-1.5 rounded-full bg-[#F4F3F1] border border-[#0a0a0a]/10 font-bold text-[#111111]">
                  Stages 24–28
                </div>
              </div>

              <div className="space-y-20 sm:space-y-28">
                <div id="visual-direction"><VisualDirectionSection /></div>
                <div id="hifi-pipeline"><HiFiPipelineSection /></div>
                <div id="qa-handoff"><QAHandoffSection /></div>
                <div id="file-structure"><FileStructureSection /></div>
                <div id="modularity-handoff"><ModularitySection /></div>
                <div id="closing-handoff"><ClosingSection /></div>
              </div>
            </div>
          </main>
        </div>
      </section>

      {/* ── Architectural FAQ & Heuristics Section ── */}
      <section className="px-3 sm:px-6 lg:px-8 2xl:px-10 max-w-[1880px] mx-auto w-full pt-12 border-t border-[#0a0a0a]/10">
        <div className="mb-8 space-y-2">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-[#366299]" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#111111]">
              ARCHITECTURAL FAQ & METHODOLOGY
            </span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-main font-bold text-[#111111]">
            Operating Heuristics & Decision Framework
          </h3>
        </div>

        <MotionAccordion items={FRAMEWORK_FAQS} />
      </section>
    </div>
  );
};
