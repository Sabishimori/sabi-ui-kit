import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, Eye, Sparkles, CheckCircle2, Box, AlignLeft, AlignCenter, AlignJustify, Sliders, Maximize2 } from 'lucide-react';
import { sounds } from '../../utils/audio';

export const WireframeSection: React.FC = () => {
  const [isHiFi, setIsHiFi] = useState(false);
  const [cornerRadius, setCornerRadius] = useState<'rounded-none' | 'rounded-md' | 'rounded-2xl' | 'rounded-3xl'>('rounded-2xl');
  const [radiusPx, setRadiusPx] = useState(12);
  const [textAlign, setTextAlign] = useState<'text-left' | 'text-center'>('text-left');
  const [boxDensity, setBoxDensity] = useState<'compact' | 'standard' | 'relaxed'>('standard');
  const [activeUXFocus, setActiveUXFocus] = useState(0);

  const handleToggleHiFi = () => {
    sounds.playPop();
    setIsHiFi(!isHiFi);
  };

  const setRadius = (cls: typeof cornerRadius, px: number) => {
    sounds.playClick();
    setCornerRadius(cls);
    setRadiusPx(px);
  };

  const setAlign = (align: typeof textAlign) => {
    sounds.playClick();
    setTextAlign(align);
  };

  const setDensity = (d: typeof boxDensity) => {
    sounds.playClick();
    setBoxDensity(d);
  };

  const handleUXFocusClick = (idx: number) => {
    sounds.playClick(600 + idx * 40);
    setActiveUXFocus(idx);
    if (idx === 0) setDensity('compact');
    if (idx === 1) setDensity('standard');
    if (idx === 2) setAlign('text-left');
    if (idx === 3) setDensity('relaxed');
  };

  return (
    <section id="wireframes" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F4F3F1] text-[#111111] border-b-2 border-[#0a0a0a] relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b-2 border-[#0a0a0a]/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="h-7 w-7 rounded-full bg-[#1a1a1a] text-white font-mono font-bold text-xs flex items-center justify-center">
              16
            </span>
            <span className="font-main font-bold uppercase tracking-wider text-xs text-[#111111]">
              WIREFRAME SYSTEM & INTERACTIVE SPEC STUDIO
            </span>
          </div>
          <span className="font-mono text-xs text-[#6b6b6b]">SABI OS V1.0 • LOW-FI ERGONOMICS</span>
        </div>

        <div className="mt-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl sm:text-5xl font-main tracking-tight leading-[1.1]">
              <span className="voral-headline-1">Structural Low-Fidelity Layouts</span>
              <span className="voral-headline-2">and Interactive Ergonomic Studio.</span>
            </h2>
            <p className="mt-3 text-base text-[#6b6b6b] leading-relaxed max-w-2xl">
              Test corner radiuses, text alignments, box dimensions, and UX focus densities live on the interactive canvas below.
            </p>
          </div>

          <button
            onClick={handleToggleHiFi}
            className="voral-btn-pill shrink-0"
          >
            <Eye className="h-4 w-4" />
            <span>{isHiFi ? 'Active: High-Fidelity UI' : 'Toggle: Switch to Hi-Fi Finished'}</span>
          </button>
        </div>

        {/* Live Controls Bar */}
        <div className="mt-8 p-4 rounded-2xl bg-white border-2 border-[#0a0a0a] shadow-sm flex flex-wrap items-center justify-between gap-4">
          {/* Radius Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#6b6b6b] font-bold uppercase">Corner Radius:</span>
            <div className="flex gap-1">
              {[
                { label: '0px', cls: 'rounded-none' as const, px: 0 },
                { label: '6px', cls: 'rounded-md' as const, px: 6 },
                { label: '12px', cls: 'rounded-2xl' as const, px: 12 },
                { label: '20px', cls: 'rounded-3xl' as const, px: 20 },
              ].map((r) => (
                <button
                  key={r.label}
                  onClick={() => setRadius(r.cls, r.px)}
                  className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all ${
                    radiusPx === r.px ? 'bg-[#1a1a1a] text-white' : 'bg-[#F4F3F1] text-[#111111]'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Text Align */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#6b6b6b] font-bold uppercase">Alignment:</span>
            <div className="flex gap-1">
              <button
                onClick={() => setAlign('text-left')}
                className={`p-1.5 rounded-full ${textAlign === 'text-left' ? 'bg-[#1a1a1a] text-white' : 'bg-[#F4F3F1] text-[#111111]'}`}
                title="Left Align"
              >
                <AlignLeft className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setAlign('text-center')}
                className={`p-1.5 rounded-full ${textAlign === 'text-center' ? 'bg-[#1a1a1a] text-white' : 'bg-[#F4F3F1] text-[#111111]'}`}
                title="Center Align"
              >
                <AlignCenter className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Density */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#6b6b6b] font-bold uppercase">Density:</span>
            <div className="flex gap-1">
              {['compact', 'standard', 'relaxed'].map((d) => (
                <button
                  key={d}
                  onClick={() => setDensity(d as typeof boxDensity)}
                  className={`px-3 py-1 rounded-full text-xs font-mono capitalize transition-all ${
                    boxDensity === d ? 'bg-[#1a1a1a] text-white font-bold' : 'bg-[#F4F3F1] text-[#111111]'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 4 Interactive Wireframe Cards + UX Focus Selector */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 4 Wireframe Components */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Box 1: Image / Media Container */}
            <div className={`p-6 bg-white border border-[#0a0a0a]/15 shadow-sm transition-all duration-300 ${cornerRadius} ${textAlign} ${
              isHiFi ? 'shadow-xl border-[#0a0a0a]' : ''
            }`}>
              <div className="flex justify-between items-center text-[10px] font-mono text-[#6b6b6b] mb-2">
                <span>BOX CONTAINER</span>
                <span className="text-[#111111] font-bold">280x110 • r:{radiusPx}px</span>
              </div>
              <div className={`h-24 mb-4 flex items-center justify-center border ${cornerRadius} ${
                isHiFi ? 'bg-[#111111] text-white shadow-md' : 'bg-[#F4F3F1] border-dashed border-[#0a0a0a]/30 text-[#6b6b6b]'
              }`}>
                {isHiFi ? <span className="font-main font-bold text-xs">High-Res Hero Visual</span> : <span className="font-mono text-[11px]">BOXES PLACEHOLDER</span>}
              </div>
              <h4 className="font-main font-bold text-sm text-[#111111]">Boxes & Containers</h4>
              <p className="text-xs text-[#6b6b6b] mt-1">Containers indicating image, graphic, and video placeholders.</p>
            </div>

            {/* Box 2: Text Lines */}
            <div className={`p-6 bg-white border border-[#0a0a0a]/15 shadow-sm transition-all duration-300 ${cornerRadius} ${textAlign} ${
              isHiFi ? 'shadow-xl border-[#0a0a0a]' : ''
            }`}>
              <div className="flex justify-between items-center text-[10px] font-mono text-[#6b6b6b] mb-2">
                <span>TYPOGRAPHY LINES</span>
                <span className="text-[#111111] font-bold">lh: 1.5 • 15px Body</span>
              </div>
              <div className={`h-24 mb-4 p-4 flex flex-col justify-center gap-2 border ${cornerRadius} ${
                isHiFi ? 'bg-[#F4F3F1] border-[#0a0a0a]/10' : 'bg-[#F4F3F1] border-dashed border-[#0a0a0a]/30'
              }`}>
                {isHiFi ? (
                  <>
                    <div className="h-3 w-3/4 bg-[#111111] rounded font-main" />
                    <div className="h-2 w-full bg-[#8a8a8a]/40 rounded" />
                    <div className="h-2 w-1/2 bg-[#8a8a8a]/40 rounded" />
                  </>
                ) : (
                  <span className="font-mono text-[11px] text-[#6b6b6b] text-center">TEXT LINES PLACEHOLDER</span>
                )}
              </div>
              <h4 className="font-main font-bold text-sm text-[#111111]">Text Hierarchy</h4>
              <p className="text-xs text-[#6b6b6b] mt-1">Shorthand rules suggesting content blocks and headings.</p>
            </div>

            {/* Box 3: Navigation */}
            <div className={`p-6 bg-white border border-[#0a0a0a]/15 shadow-sm transition-all duration-300 ${cornerRadius} ${textAlign} ${
              isHiFi ? 'shadow-xl border-[#0a0a0a]' : ''
            }`}>
              <div className="flex justify-between items-center text-[10px] font-mono text-[#6b6b6b] mb-2">
                <span>NAVIGATION BAR</span>
                <span className="text-[#111111] font-bold">h: 56px • Sticky</span>
              </div>
              <div className={`h-24 mb-4 p-3 flex items-center justify-between border ${cornerRadius} ${
                isHiFi ? 'bg-[#1a1a1a] text-white' : 'bg-[#F4F3F1] border-dashed border-[#0a0a0a]/30 text-[#6b6b6b]'
              }`}>
                {isHiFi ? (
                  <div className="flex items-center justify-between w-full text-xs font-bold px-2">
                    <span className="text-white">SABI KIT APP</span>
                    <span className="text-white/70">Menu / Search</span>
                  </div>
                ) : (
                  <span className="font-mono text-[11px] text-center w-full">NAVIGATION PLACEHOLDER</span>
                )}
              </div>
              <h4 className="font-main font-bold text-sm text-[#111111]">Navigation Anchors</h4>
              <p className="text-xs text-[#6b6b6b] mt-1">Header placeholders marking global menus and breadcrumbs.</p>
            </div>

            {/* Box 4: CTAs */}
            <div className={`p-6 bg-white border border-[#0a0a0a]/15 shadow-sm transition-all duration-300 ${cornerRadius} ${textAlign} ${
              isHiFi ? 'shadow-xl border-[#0a0a0a]' : ''
            }`}>
              <div className="flex justify-between items-center text-[10px] font-mono text-[#6b6b6b] mb-2">
                <span>CALL TO ACTION</span>
                <span className="text-[#111111] font-bold">h: 44px • Primary</span>
              </div>
              <div className={`h-24 mb-4 flex items-center justify-center border ${cornerRadius} ${
                isHiFi ? 'bg-[#1a1a1a] text-white shadow-md' : 'bg-[#F4F3F1] border-dashed border-[#0a0a0a]/30 text-[#6b6b6b]'
              }`}>
                {isHiFi ? <span className="font-main font-bold text-xs">Deploy Project Now</span> : <span className="font-mono text-[11px]">CTAS PLACEHOLDER</span>}
              </div>
              <h4 className="font-main font-bold text-sm text-[#111111]">Call to Actions</h4>
              <p className="text-xs text-[#6b6b6b] mt-1">Button skeletons highlighting primary actions.</p>
            </div>
          </div>

          {/* Interactive UX Focus Selector */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#0a0a0a] shadow-lg space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#6b6b6b] block border-b border-[#0a0a0a]/10 pb-3">
              CORE UX FOCUS (CLICK TO TEST)
            </span>

            {[
              { num: '01', title: 'Layout & Spacing Density', desc: 'Auto-switches to compact high-throughput table density.' },
              { num: '02', title: 'Content Hierarchy', desc: 'Establishes clear proportional weight from Display to Caption.' },
              { num: '03', title: 'Dynamic User Flows', desc: 'Verifies that every journey has a smooth forward pathway.' },
              { num: '04', title: 'Functional Usability', desc: 'Maximizes click target areas and removes cosmetic distractions.' }
            ].map((f, idx) => {
              const isActive = activeUXFocus === idx;
              return (
                <div
                  key={f.num}
                  onClick={() => handleUXFocusClick(idx)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all border-2 ${
                    isActive
                      ? 'bg-[#1a1a1a] text-white border-[#0a0a0a] shadow-md'
                      : 'bg-[#F4F3F1] text-[#111111] border-[#0a0a0a]/10 hover:border-[#0a0a0a]/40'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`font-mono font-bold text-xs ${isActive ? 'text-emerald-400' : 'text-[#6b6b6b]'}`}>{f.num}</span>
                    <h5 className="font-main font-bold text-sm">{f.title}</h5>
                  </div>
                  <p className={`text-xs mt-1 leading-relaxed ${isActive ? 'text-white/90' : 'text-[#6b6b6b]'}`}>
                    {f.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
