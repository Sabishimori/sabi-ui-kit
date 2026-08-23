import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckSquare, Square, ShieldCheck, Sparkles, CheckCircle2, Package, Layers, Terminal, Copy, Check } from 'lucide-react';
import { sounds } from '../../utils/audio';

const INITIAL_CHECKLIST = [
  { id: '1', label: 'Alignment (Strict 12/8/4 Column Grid Alignment)', checked: true },
  { id: '2', label: 'Spacing (8px Harmonic Mathematical Rhythm)', checked: true },
  { id: '3', label: 'Typography (Plus Jakarta Sans & Space Mono Scale)', checked: true },
  { id: '4', label: 'Colors (Sabi Master 11-Token Palette Only)', checked: true },
  { id: '5', label: 'Components (Master Instances with Zero Overrides)', checked: true },
  { id: '6', label: 'Icons (24px Bounding Box Standard)', checked: true },
  { id: '7', label: 'Images (Retina 2x/3x Export Sets & Alt Text)', checked: true },
  { id: '8', label: 'States (Default, Hover, Active, Focus, Disabled, Error)', checked: true },
  { id: '9', label: 'Responsive (Desktop 1440, Tablet 768, Mobile 375)', checked: true },
  { id: '10', label: 'Consistency (Design Token Aliases in CSS/JSON)', checked: true },
  { id: '11', label: 'Accessibility (WCAG 2.1 AAA Contrast Certified)', checked: true },
  { id: '12', label: 'Naming (Relational 5-Part Namespace Formula)', checked: true },
  { id: '13', label: 'Auto Layout (Hug/Fill Constraints Configured)', checked: true },
  { id: '14', label: 'Variables (Figma Variables Synced to Tailwind)', checked: true },
];

const FIGMA_TEMPLATE_TEXT = `// ==========================================
// SABI KIT OS FIGMA MASTER FILE STRUCTURE
// ==========================================
// Pages:
00 ❖ Cover & System Metadata
01 ❖ Project Brief & 4 Pillars
02 ❖ Discovery & Competitor Intelligence
03 ❖ User Persona Dossier (Sarah Chen)
04 ❖ Information Architecture Tree
05 ❖ Core User Flows (Sign Up / Purchase / Booking)
06 ❖ Low-Fidelity Wireframes (Boxes, Lines, CTAs)
07 ❖ Visual Direction (Minimal + Premium + Human)
08 ❖ Design Tokens (Colors, Typography, Spacing, Shadows)
09 ❖ Atomic UI Components (Buttons, Inputs, Modals, Tabs)
10 ❖ High-Fidelity UI Screens (Web, SaaS, Mobile)
11 ❖ Interactive Prototype & Micro-Interactions
12 ❖ Responsive Breakpoints (1440px / 768px / 375px)
13 ❖ 28-Point QA Review & Verification
14 ❖ Developer Handoff Package & Code Specs
15 ❖ Archive & Legacy Versions

// Frame & Layer Relational Naming Formula:
[PROJECT] / [PLATFORM] / [SECTION] / [SCREEN] / [STATE]
Example: SABI_KIT / WEB / DASHBOARD / OVERVIEW / DEFAULT`;

export const QAHandoffSection: React.FC = () => {
  const [checklist, setChecklist] = useState(INITIAL_CHECKLIST);
  const [copiedFigma, setCopiedFigma] = useState(false);

  const toggleItem = (id: string) => {
    sounds.playPop();
    setChecklist(
      checklist.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleCopyFigmaTemplate = () => {
    sounds.playChime();
    navigator.clipboard.writeText(FIGMA_TEMPLATE_TEXT);
    setCopiedFigma(true);
    setTimeout(() => setCopiedFigma(false), 2000);
  };

  const checkedCount = checklist.filter((i) => i.checked).length;
  const progressPercent = Math.round((checkedCount / checklist.length) * 100);

  return (
    <section id="qa" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F4F3F1] text-[#111111] border-b-2 border-[#0a0a0a] relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b-2 border-[#0a0a0a]/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="h-7 w-7 rounded-full bg-[#1a1a1a] text-white font-mono font-bold text-xs flex items-center justify-center">
              25
            </span>
            <span className="font-main font-bold uppercase tracking-wider text-xs text-[#111111]">
              DESIGN QA CHECKLIST & FIGMA MASTER TEMPLATE
            </span>
          </div>
          <span className="font-mono text-xs text-[#6b6b6b]">SABI OS V1.0 • QUALITY ASSURANCE</span>
        </div>

        <div className="mt-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl sm:text-5xl font-main tracking-tight leading-[1.1]">
              <span className="voral-headline-1">Pixel-Perfect Verification</span>
              <span className="voral-headline-2">and Ready-to-Paste Figma Structure.</span>
            </h2>
            <p className="mt-3 text-base text-[#6b6b6b] leading-relaxed max-w-2xl">
              Verify all visual tokens, constraints, and accessibility rules before code handoff. Copy our 15-page Figma structure directly into your project files.
            </p>
          </div>

          <button
            onClick={handleCopyFigmaTemplate}
            className="voral-btn-pill shrink-0"
          >
            {copiedFigma ? <Check className="h-4 w-4 text-emerald-300" /> : <Copy className="h-4 w-4" />}
            <span>{copiedFigma ? 'Figma Structure Copied!' : 'Copy Figma Structure'}</span>
          </button>
        </div>

        {/* Content Layout */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* QA Checklist Card (Left) */}
          <div className="lg:col-span-7 bg-white text-[#111111] rounded-3xl p-6 sm:p-8 border-2 border-[#0a0a0a] shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 border-b border-[#0a0a0a]/10 pb-4">
                <div>
                  <h3 className="font-main font-bold text-xl text-[#111111]">
                    RELEASE QA CHECKLIST ({checkedCount}/{checklist.length})
                  </h3>
                  <p className="text-xs text-[#6b6b6b] mt-0.5">
                    Click items to toggle verification status.
                  </p>
                </div>

                <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold font-mono">
                  {progressPercent}% Passed
                </span>
              </div>

              {/* Interactive Checkbox Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-4">
                {checklist.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className={`p-3 rounded-2xl border text-xs font-semibold flex items-center gap-2.5 transition-all text-left ${
                      item.checked
                        ? 'bg-[#F4F3F1] border-[#0a0a0a] text-[#111111]'
                        : 'bg-white border-[#0a0a0a]/10 text-[#8a8a8a] hover:border-[#0a0a0a]/30'
                    }`}
                  >
                    {item.checked ? (
                      <CheckSquare className="h-4 w-4 text-[#111111] shrink-0" />
                    ) : (
                      <Square className="h-4 w-4 text-[#8a8a8a] shrink-0" />
                    )}
                    <span className="truncate">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#0a0a0a]/10 flex items-center justify-between text-xs font-mono text-[#6b6b6b]">
              <span>Zero-defect release guarantee</span>
              <span className="text-[#111111] font-bold">{checkedCount} of {checklist.length} Signed Off</span>
            </div>
          </div>

          {/* Copyable Figma Template Preview (Right) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#0a0a0a] shadow-xl flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#6b6b6b] block mb-2">
                FIGMA PAGE SPECIFICATION
              </span>
              <h4 className="font-main font-bold text-lg text-[#111111]">
                15-Page Architectural Hierarchy
              </h4>
              <p className="text-xs text-[#6b6b6b] mt-1 mb-4">
                Paste directly into Figma to create your project page structure.
              </p>

              <pre className="p-4 rounded-2xl bg-[#F4F3F1] border border-[#0a0a0a]/10 font-mono text-[11px] text-[#111111] leading-relaxed overflow-x-auto max-h-64">
                {FIGMA_TEMPLATE_TEXT}
              </pre>
            </div>

            <button
              onClick={handleCopyFigmaTemplate}
              className="w-full voral-btn-pill justify-center"
            >
              <Copy className="h-3.5 w-3.5" />
              <span>Copy Template Code</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
