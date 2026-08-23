import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Move, 
  LayoutGrid, 
  Eye, 
  Ruler, 
  Zap, 
  FileText, 
  Sparkles, 
  Wrench, 
  ArrowRight,
  Terminal,
  Layers,
  Cpu,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';
import { sounds } from '../../utils/audio';

// Tool Components
import { DraggableCanvasSection } from '../sections/DraggableCanvasSection';
import { AutoLayoutStudioSection } from '../sections/AutoLayoutStudioSection';
import { HierarchySystemSection } from '../sections/HierarchySystemSection';
import { SpatialSystemSection } from '../sections/SpatialSystemSection';
import { MotionLibrarySection } from '../sections/MotionLibrarySection';
import { InteractiveBriefBuilder } from '../sections/InteractiveBriefBuilder';

type WorkspaceTool = 'canvas' | 'autolayout' | 'hierarchy' | 'spatial' | 'motion' | 'brief';

export const WorkspacePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<WorkspaceTool>('canvas');

  const tools = [
    {
      id: 'canvas' as const,
      num: '01',
      label: 'Live API Canvas',
      category: 'Physical Layout & API',
      exampleDomain: 'E-Commerce & Hardware Products',
      icon: Move,
      desc: 'Freeform drag physics with live public API product cards, price editing, and Kanban swimlane reflow.'
    },
    {
      id: 'autolayout' as const,
      num: '02',
      label: 'Auto-Layout & Booleans',
      category: 'Atomic Component Reflow',
      exampleDomain: 'SaaS Dashboard Components',
      icon: LayoutGrid,
      desc: 'Figma Auto-Layout direction, alignment matrix, and live boolean props (hasIcon, hasBadge, isLoading).'
    },
    {
      id: 'hierarchy' as const,
      num: '03',
      label: 'Visual Hierarchy',
      category: 'Scanning Heuristics',
      exampleDomain: 'Editorial & Publishing Systems',
      icon: Eye,
      desc: 'Typographic scale contrast, 100/60/40 luminance rules, and live F-Pattern & Z-Pattern eye scanning overlays.'
    },
    {
      id: 'spatial' as const,
      num: '04',
      label: '8pt Spatial Grid',
      category: 'Mathematical Tokens',
      exampleDomain: 'Fintech & Multi-Device Tables',
      icon: Ruler,
      desc: '8pt harmonic spacing tokens, content density switcher (Compact vs Spacious), and inspect bounding boxes.'
    },
    {
      id: 'motion' as const,
      num: '05',
      label: 'Motion Laboratory',
      category: 'Spring Physics Lab',
      exampleDomain: 'Kinetic UI & Interactions',
      icon: Zap,
      desc: 'Interactive spring stiffness/damping tuner with one-click code copy for Framer Motion, GSAP, CSS, and Tailwind.'
    },
    {
      id: 'brief' as const,
      num: '06',
      label: 'Brief Generator',
      category: 'Client Discovery & Scope',
      exampleDomain: 'Client Proposal & Deliverable Specs',
      icon: FileText,
      desc: 'Interactive discovery brief builder with project budget estimator and markdown export engine.'
    },
  ];

  const currentTool = tools.find(t => t.id === activeTab) || tools[0];

  return (
    <div className="space-y-12 sm:space-y-16 pb-16 sm:pb-24 w-full">
      
      {/* ── Page Header Spread ── */}
      <section className="px-3 sm:px-6 lg:px-8 2xl:px-10 max-w-[1880px] mx-auto w-full">
        <div className="p-8 sm:p-12 2xl:p-14 rounded-3xl bg-white border border-[#0a0a0a]/10 shadow-sm flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#111111]">
                OPERATIONAL STUDIO &bull; 6 PRODUCTION WORKBENCHES
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl 2xl:text-6xl font-main font-black tracking-tight text-[#111111] leading-tight">
              Operational Workspace & Senior Tools
            </h1>
            <p className="text-base sm:text-lg text-[#555555] leading-relaxed">
              A daily design engineering laboratory. Select any tool from the side-navigation below to test layout reflows live, tune kinetic spring physics, and export production code.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#F4F3F1] border border-[#0a0a0a]/10 shrink-0 space-y-1.5 font-mono text-xs text-[#555555] min-w-[260px]">
            <div className="text-[10px] uppercase text-[#666666] font-bold tracking-wider">
              ACTIVE WORKBENCH
            </div>
            <div className="text-[#111111] font-bold text-lg flex items-center gap-2">
              <span className="text-emerald-700 font-mono">[{currentTool.num}]</span>
              <span>{currentTool.label}</span>
            </div>
            <div className="text-[11px] text-[#666666] font-sans">
              Domain: <strong className="text-[#111111]">{currentTool.exampleDomain}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* ── Side-Navigation & Tool Viewport Layout ── */}
      <section className="px-3 sm:px-6 lg:px-8 2xl:px-10 max-w-[1880px] mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-start gap-6 2xl:gap-8">
          
          {/* ══════════════════════════════════════════════════════════════════
              LEFT SIDE SUB-NAVIGATION (In-Flow Resting & Sticky on Scroll)
             ══════════════════════════════════════════════════════════════════ */}
          <aside className="w-full lg:w-80 2xl:w-96 shrink-0 lg:sticky lg:top-24 z-20 self-start">
            <div className="p-5 rounded-3xl bg-white border border-[#0a0a0a]/10 shadow-sm space-y-4 max-h-[calc(100vh-7.5rem)] overflow-y-auto no-scrollbar">
              
              <div className="flex items-center justify-between pb-3 border-b border-[#0a0a0a]/10">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#111111] flex items-center gap-2">
                  <Wrench className="h-3.5 w-3.5 text-emerald-700" />
                  WORKBENCH TOOLS
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#F4F3F1] text-[#666666] font-bold">
                  6 Tools
                </span>
              </div>

              {/* Tool Navigation List */}
              <div className="space-y-1.5">
                {tools.map((tool) => {
                  const isActive = activeTab === tool.id;
                  const Icon = tool.icon;
                  return (
                    <button
                      key={tool.id}
                      onClick={() => {
                        sounds.playClick();
                        setActiveTab(tool.id);
                      }}
                      className={`w-full text-left p-3 rounded-2xl transition-all flex items-center justify-between group relative ${
                        isActive
                          ? 'bg-[#111111] text-white shadow-md'
                          : 'hover:bg-[#F4F3F1] text-[#111111]'
                      }`}
                    >
                      {isActive && (
                        <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-[#111111] rounded-r-full" />
                      )}

                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`p-2 rounded-xl shrink-0 ${
                          isActive ? 'bg-white/15 text-emerald-400' : 'bg-[#F4F3F1] text-[#666666]'
                        }`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 space-y-0.5">
                          <div className="flex items-center gap-1.5">
                            <span className={`text-[10px] font-mono font-bold ${
                              isActive ? 'text-emerald-400' : 'text-[#888888]'
                            }`}>
                              {tool.num}
                            </span>
                            <h4 className="text-xs font-main font-bold truncate">
                              {tool.label}
                            </h4>
                          </div>
                          <p className={`text-[10.5px] font-mono truncate ${
                            isActive ? 'text-white/60' : 'text-[#666666]'
                          }`}>
                            {tool.category}
                          </p>
                        </div>
                      </div>

                      <ChevronRight className={`h-4 w-4 shrink-0 transition-transform ${
                        isActive ? 'text-emerald-400 translate-x-0.5' : 'text-[#888888] opacity-0 group-hover:opacity-100'
                      }`} />
                    </button>
                  );
                })}
              </div>

              {/* Tool Context Footer */}
              <div className="pt-4 border-t border-[#0a0a0a]/10 space-y-2">
                <span className="text-[10px] font-mono text-[#666666] uppercase font-bold tracking-wider block">
                  Active Tool Summary
                </span>
                <p className="text-xs text-[#555555] leading-relaxed">
                  {currentTool.desc}
                </p>
              </div>
            </div>
          </aside>

          {/* ══════════════════════════════════════════════════════════════════
              RIGHT CONTENT VIEWPORT (Active Tool Sandbox)
             ══════════════════════════════════════════════════════════════════ */}
          <main className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                {activeTab === 'canvas' && <DraggableCanvasSection />}
                {activeTab === 'autolayout' && <AutoLayoutStudioSection />}
                {activeTab === 'hierarchy' && <HierarchySystemSection />}
                {activeTab === 'spatial' && <SpatialSystemSection />}
                {activeTab === 'motion' && <MotionLibrarySection />}
                {activeTab === 'brief' && <InteractiveBriefBuilder />}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </section>
    </div>
  );
};
