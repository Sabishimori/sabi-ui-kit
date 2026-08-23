import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Layers, Type, Sparkles, Sliders, Check, Copy, ArrowRight, Grid, Zap, Compass } from 'lucide-react';
import { sounds } from '../../utils/audio';

export const HierarchySystemSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'scale' | 'contrast' | 'eyetracking' | 'gestalt'>('scale');
  const [headlineScale, setHeadlineScale] = useState(40);
  const [bodyScale, setBodyScale] = useState(16);
  const [contrastLevel, setContrastLevel] = useState<'high' | 'medium' | 'flat'>('high');
  const [showEyeTracking, setShowEyeTracking] = useState(true);
  const [patternType, setPatternType] = useState<'f-pattern' | 'z-pattern'>('f-pattern');
  const [copiedTokens, setCopiedTokens] = useState(false);

  const handleCopyHierarchySpec = () => {
    sounds.playChime();
    const spec = `// SABI KIT HIERARCHY & TYPOGRAPHY SYSTEM SPEC:
const hierarchyTokens = {
  display: { size: "56px", lineHeight: "1.05", weight: 900, tracking: "-0.03em" },
  h1: { size: "${headlineScale}px", lineHeight: "1.15", weight: 800, tracking: "-0.02em" },
  h2: { size: "28px", lineHeight: "1.25", weight: 700, tracking: "-0.01em" },
  h3: { size: "20px", lineHeight: "1.35", weight: 600, tracking: "0em" },
  bodyLarge: { size: "18px", lineHeight: "1.5", weight: 400, tracking: "0em" },
  bodyRegular: { size: "${bodyScale}px", lineHeight: "1.5", weight: 400, tracking: "0em" },
  caption: { size: "12px", lineHeight: "1.4", weight: 600, tracking: "0.05em", uppercase: true },
  contrastRules: {
    primaryText: "#111111 (100% luminance)",
    secondaryText: "#6b6b6b (60% luminance)",
    tertiaryText: "#8a8a8a (45% luminance)",
    surfaceBackground: "#F4F3F1",
    cardBackground: "#FFFFFF",
    frameBorder: "2px solid #0a0a0a"
  }
};`;
    navigator.clipboard.writeText(spec);
    setCopiedTokens(true);
    setTimeout(() => setCopiedTokens(false), 2000);
  };

  return (
    <section id="hierarchy-system" className="px-4 sm:px-8 lg:px-12 2xl:px-20 max-w-[1780px] mx-auto w-full text-[#111111] relative">
      <div className="w-full">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b-2 border-[#0a0a0a]/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="h-7 w-7 rounded-full bg-[#1a1a1a] text-white font-mono font-bold text-xs flex items-center justify-center">
              01
            </span>
            <span className="font-main font-bold uppercase tracking-wider text-xs text-[#111111]">
              VISUAL HIERARCHY & COGNITIVE SCANNING ARCHITECTURE
            </span>
          </div>
          <span className="font-mono text-xs text-[#6b6b6b]">SABI OS V1.0 • PERCEPTUAL LOGIC</span>
        </div>

        <div className="mt-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl sm:text-5xl font-main tracking-tight leading-[1.1]">
              <span className="voral-headline-1">Visual Hierarchy Systems</span>
              <span className="voral-headline-2">and Cognitive Eye-Tracking Models.</span>
            </h2>
            <p className="mt-3 text-base text-[#6b6b6b] leading-relaxed max-w-2xl">
              Senior designers do not guess visual weights. Hierarchy is engineered through mathematical scale contrast, luminance weighting, Gestalt proximity, and eye-scanning pathways.
            </p>
          </div>

          <button
            onClick={handleCopyHierarchySpec}
            className="voral-btn-pill shrink-0"
          >
            {copiedTokens ? <Check className="h-4 w-4 text-emerald-300" /> : <Copy className="h-4 w-4" />}
            <span>{copiedTokens ? 'Tokens Copied!' : 'Copy Hierarchy Spec'}</span>
          </button>
        </div>

        {/* 4 Hierarchy Mode Tabs */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { id: 'scale' as const, label: '1. Scale & Proportion', sub: 'Typographic Ratios' },
            { id: 'contrast' as const, label: '2. Contrast & Luminance', sub: 'Primary vs Secondary' },
            { id: 'eyetracking' as const, label: '3. F & Z Scanning Paths', sub: 'Eye-Tracking Flow' },
            { id: 'gestalt' as const, label: '4. Gestalt Proximity', sub: 'Spatial Grouping' }
          ].map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  sounds.playClick();
                  setActiveTab(tab.id);
                }}
                className={`p-4 rounded-2xl text-left transition-all border-2 flex flex-col justify-between h-24 ${
                  isSelected
                    ? 'bg-[#1a1a1a] text-white border-[#0a0a0a] shadow-lg scale-[1.02]'
                    : 'bg-white text-[#111111] border-[#0a0a0a]/10 hover:border-[#0a0a0a]/40 shadow-sm'
                }`}
              >
                <div className="font-main font-bold text-xs sm:text-sm">
                  {tab.label}
                </div>
                <div className={`text-[10px] font-mono ${isSelected ? 'text-white/70' : 'text-[#8a8a8a]'}`}>
                  {tab.sub}
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Interactive Studio Viewport */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Canvas: Live Specimen Layout */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#0a0a0a] shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-[#0a0a0a]/10 pb-4 mb-6">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#6b6b6b]">
                LIVE PERCEPTUAL SPECIMEN
              </span>
              <span className="text-xs font-mono text-emerald-700 font-bold">
                WCAG AAA High Contrast
              </span>
            </div>

            {/* Specimen Content with Eye-Tracking Overlay */}
            <div className="relative p-6 rounded-2xl bg-[#F4F3F1] border border-[#0a0a0a]/10 space-y-6">
              
              {/* Eye-Tracking Heatmap Overlay */}
              {activeTab === 'eyetracking' && showEyeTracking && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-20" viewBox="0 0 500 300" preserveAspectRatio="none">
                  {patternType === 'f-pattern' ? (
                    <>
                      {/* F-Pattern Eye Scan Lines */}
                      <path d="M 40 40 L 460 40 M 40 40 L 40 240 M 40 120 L 320 120 M 40 180 L 220 180" stroke="#F43F5E" strokeWidth="3" strokeDasharray="6 3" fill="none" opacity="0.8" />
                      <circle cx="40" cy="40" r="8" fill="#F43F5E" />
                      <circle cx="460" cy="40" r="6" fill="#F43F5E" opacity="0.7" />
                      <circle cx="40" cy="120" r="7" fill="#F43F5E" />
                      <circle cx="320" cy="120" r="5" fill="#F43F5E" opacity="0.6" />
                      <circle cx="40" cy="180" r="6" fill="#F43F5E" />
                      <text x="55" y="45" fill="#F43F5E" fontSize="10" fontFamily="monospace" fontWeight="bold">Fixation 1 (Primary Headline)</text>
                      <text x="55" y="125" fill="#F43F5E" fontSize="10" fontFamily="monospace" fontWeight="bold">Fixation 2 (Action Bar)</text>
                      <text x="55" y="185" fill="#F43F5E" fontSize="10" fontFamily="monospace" fontWeight="bold">Fixation 3 (Body Summary)</text>
                    </>
                  ) : (
                    <>
                      {/* Z-Pattern Eye Scan Lines */}
                      <path d="M 40 40 L 460 40 L 40 240 L 460 240" stroke="#6366F1" strokeWidth="3" strokeDasharray="6 3" fill="none" opacity="0.8" />
                      <circle cx="40" cy="40" r="8" fill="#6366F1" />
                      <circle cx="460" cy="40" r="7" fill="#6366F1" />
                      <circle cx="40" cy="240" r="7" fill="#6366F1" />
                      <circle cx="460" cy="240" r="8" fill="#6366F1" />
                      <text x="55" y="45" fill="#6366F1" fontSize="10" fontFamily="monospace" fontWeight="bold">Point 1 (Logo)</text>
                      <text x="360" y="45" fill="#6366F1" fontSize="10" fontFamily="monospace" fontWeight="bold">Point 2 (Top CTA)</text>
                      <text x="55" y="235" fill="#6366F1" fontSize="10" fontFamily="monospace" fontWeight="bold">Point 3 (Value Metric)</text>
                      <text x="360" y="235" fill="#6366F1" fontSize="10" fontFamily="monospace" fontWeight="bold">Point 4 (Final CTA)</text>
                    </>
                  )}
                </svg>
              )}

              {/* Level 1: Category Tag (Caption • 12px) */}
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#1a1a1a] text-white text-[10px] font-mono font-bold tracking-widest uppercase">
                  ENTERPRISE PLATFORM ARCHITECTURE
                </span>
                <span className="text-[11px] font-mono text-[#8a8a8a]">
                  LEVEL 1: CAPTION
                </span>
              </div>

              {/* Level 2: Primary Headline */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[#8a8a8a] block font-bold">
                  LEVEL 2: DISPLAY HEADLINE ({headlineScale}px)
                </span>
                <h3
                  style={{ fontSize: `${headlineScale}px` }}
                  className={`font-main font-black tracking-tight leading-tight ${
                    contrastLevel === 'high' ? 'text-[#111111]' : contrastLevel === 'medium' ? 'text-[#333333]' : 'text-[#666666]'
                  }`}
                >
                  Architect High-Speed Systems
                </h3>
              </div>

              {/* Level 3: Secondary Subhead & Body */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[#8a8a8a] block font-bold">
                  LEVEL 3: BODY PROSE ({bodyScale}px)
                </span>
                <p
                  style={{ fontSize: `${bodyScale}px` }}
                  className={`leading-relaxed ${
                    contrastLevel === 'high' ? 'text-[#111111]/80' : contrastLevel === 'medium' ? 'text-[#444444]' : 'text-[#666666]'
                  }`}
                >
                  Clear hierarchy guides the eye effortlessly. When headlines dominate and secondary copy steps back, users comprehend data 400% faster with zero cognitive fatigue.
                </p>
              </div>

              {/* Level 4: Action & Telemetry Row */}
              <div className="pt-4 border-t border-[#0a0a0a]/10 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button className="voral-btn-pill py-2 px-5 text-xs shadow-md">
                    Primary Action
                  </button>
                  <button className="px-4 py-2 rounded-full border border-[#0a0a0a]/20 text-xs font-main font-bold text-[#111111] hover:bg-white transition-colors">
                    Secondary Details
                  </button>
                </div>

                <span className="text-[10px] font-mono text-[#8a8a8a] uppercase font-bold">
                  LEVEL 4: INTERACTIVE CTAS
                </span>
              </div>
            </div>

            {/* Bottom Status */}
            <div className="pt-4 mt-6 border-t border-[#0a0a0a]/10 flex items-center justify-between text-xs font-mono text-[#6b6b6b]">
              <span>Ratio: Display ({headlineScale}px) / Body ({bodyScale}px) = {(headlineScale / bodyScale).toFixed(2)}x</span>
              <span className="text-[#111111] font-bold">Mathematical Proportions</span>
            </div>
          </div>

          {/* Right Panel: Controls & Theoretical Breakdown */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#0a0a0a] shadow-xl flex flex-col justify-between space-y-6">
            
            {/* Scale Slider Controls */}
            {activeTab === 'scale' && (
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#6b6b6b] block">
                  PROPORTIONAL SCALE CONTROLLER
                </span>
                <p className="text-xs text-[#6b6b6b] leading-relaxed">
                  Adjust the scale contrast between the primary display headline and body prose to maintain the golden visual ratio (2.2x to 3.0x).
                </p>

                {/* Headline Slider */}
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <span className="text-[#111111] font-bold">Headline Size: {headlineScale}px</span>
                    <span className="text-emerald-700 font-bold">Display</span>
                  </div>
                  <input
                    type="range"
                    min="24"
                    max="64"
                    step="2"
                    value={headlineScale}
                    onChange={(e) => {
                      sounds.playClick();
                      setHeadlineScale(Number(e.target.value));
                    }}
                    className="w-full h-1.5 bg-[#F4F3F1] rounded-lg appearance-none cursor-pointer accent-[#1a1a1a]"
                  />
                </div>

                {/* Body Slider */}
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <span className="text-[#111111] font-bold">Body Size: {bodyScale}px</span>
                    <span className="text-emerald-700 font-bold">Prose</span>
                  </div>
                  <input
                    type="range"
                    min="12"
                    max="22"
                    step="1"
                    value={bodyScale}
                    onChange={(e) => {
                      sounds.playClick();
                      setBodyScale(Number(e.target.value));
                    }}
                    className="w-full h-1.5 bg-[#F4F3F1] rounded-lg appearance-none cursor-pointer accent-[#1a1a1a]"
                  />
                </div>
              </div>
            )}

            {/* Contrast Mode Selector */}
            {activeTab === 'contrast' && (
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#6b6b6b] block">
                  LUMINANCE & CONTRAST WEIGHTING
                </span>
                <p className="text-xs text-[#6b6b6b] leading-relaxed">
                  Luminance weighting tells the human visual cortex where to focus first. Without contrast, typography becomes a flat, unreadable wall of gray.
                </p>

                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'high' as const, label: 'High (Sabi)', desc: '100% / 60% / 40%' },
                    { id: 'medium' as const, label: 'Medium', desc: '80% / 50% / 30%' },
                    { id: 'flat' as const, label: 'Flat (Bad)', desc: 'Equal weight' }
                  ].map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        sounds.playPop();
                        setContrastLevel(c.id);
                      }}
                      className={`p-3 rounded-2xl text-left border transition-all ${
                        contrastLevel === c.id ? 'bg-[#1a1a1a] text-white border-black shadow-md font-bold' : 'bg-[#F4F3F1] text-[#111111] border-[#0a0a0a]/10'
                      }`}
                    >
                      <div className="text-xs font-main">{c.label}</div>
                      <div className={`text-[10px] font-mono ${contrastLevel === c.id ? 'text-white/70' : 'text-[#8a8a8a]'}`}>{c.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Eye-Tracking Pattern Selector */}
            {activeTab === 'eyetracking' && (
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#6b6b6b] block">
                  COGNITIVE EYE-SCANNING PATHWAYS
                </span>
                <p className="text-xs text-[#6b6b6b] leading-relaxed">
                  Users read web content in systematic F-patterns (dense text & articles) and Z-patterns (landing pages & marketing cards).
                </p>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      sounds.playClick();
                      setPatternType('f-pattern');
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      patternType === 'f-pattern' ? 'bg-[#1a1a1a] text-white border-black font-bold shadow-md' : 'bg-[#F4F3F1] text-[#111111] border-[#0a0a0a]/10'
                    }`}
                  >
                    <div className="text-xs font-main">F-Pattern (Editorial)</div>
                    <div className="text-[10px] font-mono opacity-70">Top horizontal &rarr; Down left</div>
                  </button>

                  <button
                    onClick={() => {
                      sounds.playClick();
                      setPatternType('z-pattern');
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      patternType === 'z-pattern' ? 'bg-[#1a1a1a] text-white border-black font-bold shadow-md' : 'bg-[#F4F3F1] text-[#111111] border-[#0a0a0a]/10'
                    }`}
                  >
                    <div className="text-xs font-main">Z-Pattern (Landing)</div>
                    <div className="text-[10px] font-mono opacity-70">Top-left &rarr; Right &rarr; Bottom-right</div>
                  </button>
                </div>
              </div>
            )}

            {/* Gestalt Proximity */}
            {activeTab === 'gestalt' && (
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#6b6b6b] block">
                  GESTALT LAW OF PROXIMITY
                </span>
                <p className="text-xs text-[#6b6b6b] leading-relaxed">
                  Elements placed close together are perceived as a unified conceptual group. Space between related elements must always be smaller than space between unrelated sections.
                </p>

                <div className="p-4 rounded-2xl bg-[#F4F3F1] border border-[#0a0a0a]/10 space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between text-[#111111]">
                    <span>Label to Input Gap:</span>
                    <strong className="text-emerald-700">4px – 8px (Tight)</strong>
                  </div>
                  <div className="flex items-center justify-between text-[#111111]">
                    <span>Field to Field Gap:</span>
                    <strong className="text-emerald-700">16px – 24px (Medium)</strong>
                  </div>
                  <div className="flex items-center justify-between text-[#111111]">
                    <span>Section to Section Gap:</span>
                    <strong className="text-emerald-700">48px – 96px (Spacious)</strong>
                  </div>
                </div>
              </div>
            )}

            {/* Senior Rule Box */}
            <div className="p-4 rounded-2xl bg-[#F4F3F1] border border-[#0a0a0a]/10 space-y-1.5">
              <span className="text-[10px] font-mono font-bold text-[#111111] uppercase tracking-wider block">
                SENIOR DESIGNER GOLDEN RULE
              </span>
              <p className="text-xs text-[#6b6b6b] leading-relaxed font-normal">
                "If everything is shouting, nothing is heard. Establish one dominant focal anchor per viewport."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
