import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Folder, FileText, Code2, Sparkles, Copy, Check, Terminal } from 'lucide-react';
import { sounds } from '../../utils/audio';

const FIGMA_PAGES = [
  '00-Cover', '01-Brief', '02-Research', '03-UX', '04-IA', '05-User Flows',
  '06-Wireframes', '07-Visual Direction', '08-Design System', '09-Components',
  '10-Final UI', '11-Prototype', '12-Responsive', '13-QA', '14-Handoff', '15-Archive'
];

export const FileStructureSection: React.FC = () => {
  const [projectInput, setProjectInput] = useState('SABI_KIT');
  const [platformInput, setPlatformInput] = useState('WEB');
  const [sectionInput, setSectionInput] = useState('DASHBOARD');
  const [screenInput, setScreenInput] = useState('OVERVIEW');
  const [stateInput, setStateInput] = useState('DEFAULT');
  const [copiedFormula, setCopiedFormula] = useState(false);

  const fullConvention = `${projectInput} / ${platformInput} / ${sectionInput} / ${screenInput} / ${stateInput}`;

  const handleCopyFormula = () => {
    sounds.playChime();
    navigator.clipboard.writeText(fullConvention);
    setCopiedFormula(true);
    setTimeout(() => setCopiedFormula(false), 2000);
  };

  return (
    <section id="file-structure" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F4F3F1] text-[#111111] border-b-2 border-[#0a0a0a] relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b-2 border-[#0a0a0a]/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="h-7 w-7 rounded-full bg-[#1a1a1a] text-white font-mono font-bold text-xs flex items-center justify-center">
              26
            </span>
            <span className="font-main font-bold uppercase tracking-wider text-xs text-[#111111]">
              FILE STRUCTURE & RELATIONAL CONVENTIONS
            </span>
          </div>
          <span className="font-mono text-xs text-[#6b6b6b]">SABI OS V1.0 • ASSET STANDARDIZATION</span>
        </div>

        <div className="mt-10 mb-8 max-w-3xl">
          <h2 className="text-3xl sm:text-5xl font-main tracking-tight leading-[1.1]">
            <span className="voral-headline-1">Standardized Relational Logic</span>
            <span className="voral-headline-2">ensures instant code & asset sync.</span>
          </h2>
          <p className="mt-3 text-base text-[#6b6b6b] leading-relaxed">
            Every layer, frame, and export node conforms to a strict 5-part relational formula, eliminating confusion between Figma files and React components.
          </p>
        </div>

        {/* 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: 15-Page Figma Hierarchy */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#0a0a0a] shadow-xl flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#6b6b6b] block mb-2">
                FIGMA 15-PAGE ARCHITECTURAL DIRECTORY
              </span>
              <h4 className="font-main font-bold text-xl text-[#111111] mb-4">
                Structured Page Registry
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {FIGMA_PAGES.map((page) => (
                  <div
                    key={page}
                    className="p-2.5 rounded-xl bg-[#F4F3F1] border border-[#0a0a0a]/10 text-xs font-mono text-[#111111] flex items-center gap-1.5"
                  >
                    <Folder className="h-3.5 w-3.5 text-[#6b6b6b] shrink-0" />
                    <span className="truncate">{page}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-[11px] font-mono text-[#6b6b6b] pt-4 border-t border-[#0a0a0a]/10">
              Preserves chronological versions without cluttering master screens.
            </div>
          </div>

          {/* Right: Live Interactive Naming Formula Studio */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#0a0a0a] shadow-xl flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#6b6b6b] block mb-2">
                INTERACTIVE RELATIONAL FORMULA BUILDER
              </span>
              <h4 className="font-main font-bold text-xl text-[#111111]">
                [PROJECT] / [PLATFORM] / [SECTION] / [SCREEN] / [STATE]
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                <div>
                  <label className="text-[10px] font-mono text-[#6b6b6b] uppercase block mb-1">PROJECT</label>
                  <input
                    type="text"
                    value={projectInput}
                    onChange={(e) => setProjectInput(e.target.value.toUpperCase())}
                    className="w-full px-3 py-1.5 rounded-xl bg-[#F4F3F1] border border-[#0a0a0a]/15 text-xs font-mono font-bold text-[#111111]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono text-[#6b6b6b] uppercase block mb-1">PLATFORM</label>
                  <input
                    type="text"
                    value={platformInput}
                    onChange={(e) => setPlatformInput(e.target.value.toUpperCase())}
                    className="w-full px-3 py-1.5 rounded-xl bg-[#F4F3F1] border border-[#0a0a0a]/15 text-xs font-mono font-bold text-[#111111]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono text-[#6b6b6b] uppercase block mb-1">SECTION</label>
                  <input
                    type="text"
                    value={sectionInput}
                    onChange={(e) => setSectionInput(e.target.value.toUpperCase())}
                    className="w-full px-3 py-1.5 rounded-xl bg-[#F4F3F1] border border-[#0a0a0a]/15 text-xs font-mono font-bold text-[#111111]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono text-[#6b6b6b] uppercase block mb-1">SCREEN</label>
                  <input
                    type="text"
                    value={screenInput}
                    onChange={(e) => setScreenInput(e.target.value.toUpperCase())}
                    className="w-full px-3 py-1.5 rounded-xl bg-[#F4F3F1] border border-[#0a0a0a]/15 text-xs font-mono font-bold text-[#111111]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono text-[#6b6b6b] uppercase block mb-1">STATE</label>
                  <input
                    type="text"
                    value={stateInput}
                    onChange={(e) => setStateInput(e.target.value.toUpperCase())}
                    className="w-full px-3 py-1.5 rounded-xl bg-[#F4F3F1] border border-[#0a0a0a]/15 text-xs font-mono font-bold text-[#111111]"
                  />
                </div>
              </div>
            </div>

            {/* Live Result Box */}
            <div className="p-4 rounded-2xl bg-[#F4F3F1] border border-[#0a0a0a]/10 space-y-3">
              <span className="text-[10px] font-mono font-bold text-[#8a8a8a] uppercase block">
                COMPUTED LAYER & ASSET NAME
              </span>
              <div className="font-mono text-xs sm:text-sm font-bold text-[#111111] bg-white p-3 rounded-xl border border-[#0a0a0a]/10 truncate">
                {fullConvention}
              </div>

              <button
                onClick={handleCopyFormula}
                className="w-full voral-btn-pill justify-center"
              >
                {copiedFormula ? <Check className="h-4 w-4 text-emerald-300" /> : <Copy className="h-4 w-4" />}
                <span>{copiedFormula ? 'Formula Copied!' : 'Copy Relational String'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
