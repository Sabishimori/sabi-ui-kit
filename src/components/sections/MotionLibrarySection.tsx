import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Copy, Check, Sliders, Sparkles, Wand2, Activity, Layers, Code2, Zap, Clock, Workflow } from 'lucide-react';
import { sounds } from '../../utils/audio';

const MOTION_PRESETS = [
  {
    id: 'spring-pop',
    name: 'Spring Bouncy Pop',
    desc: 'Snappy tactile modal or button entry with slight spring overshoot.',
    type: 'spring',
    config: { stiffness: 400, damping: 25, mass: 1 },
    initial: { scale: 0.7, opacity: 0, y: 30 },
    animate: { scale: 1, opacity: 1, y: 0 },
    codeFramer: `<motion.div
  initial={{ scale: 0.7, opacity: 0, y: 30 }}
  animate={{ scale: 1, opacity: 1, y: 0 }}
  transition={{ type: "spring", stiffness: 400, damping: 25, mass: 1 }}
/>`,
    codeGsap: `gsap.fromTo(".target", 
  { scale: 0.7, y: 30, opacity: 0 }, 
  { scale: 1, y: 0, opacity: 1, duration: 0.6, ease: "elastic.out(1, 0.75)" }
);`,
    codeCss: `@keyframes springPop {
  0% { transform: translateY(30px) scale(0.7); opacity: 0; }
  70% { transform: translateY(-4px) scale(1.03); opacity: 1; }
  100% { transform: translateY(0) scale(1); opacity: 1; }
}`,
    codeTailwind: `<div className="animate-in fade-in zoom-in-75 slide-in-from-bottom-6 duration-500 ease-out" />`
  },
  {
    id: 'sheet-drawer',
    name: 'Editorial Sheet Slide',
    desc: 'Buttery smooth bottom drawer & modal sheet with ease-out-expo curve.',
    type: 'tween',
    config: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    initial: { y: '100%', opacity: 0 },
    animate: { y: 0, opacity: 1 },
    codeFramer: `<motion.div
  initial={{ y: "100%", opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
/>`,
    codeGsap: `gsap.fromTo(".sheet", 
  { yPercent: 100, opacity: 0 }, 
  { yPercent: 0, opacity: 1, duration: 0.5, ease: "power4.out" }
);`,
    codeCss: `.sheet-drawer {
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s;
}`,
    codeTailwind: `<div className="transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]" />`
  },
  {
    id: 'stagger-cascade',
    name: 'Staggered Children Cascade',
    desc: 'Sequential cascading entry for list items and bento grid cards.',
    type: 'stagger',
    config: { staggerChildren: 0.08, delayChildren: 0.1 },
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    codeFramer: `<motion.div
  variants={{
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
  }}
  initial="hidden"
  animate="show"
>
  {items.map(item => (
    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} />
  ))}
</motion.div>`,
    codeGsap: `gsap.from(".bento-card", {
  y: 20,
  opacity: 0,
  stagger: 0.08,
  duration: 0.5,
  ease: "power3.out"
});`,
    codeCss: `/* CSS Staggered Cascade with Animation-Delay */
.item:nth-child(1) { animation-delay: 80ms; }
.item:nth-child(2) { animation-delay: 160ms; }
.item:nth-child(3) { animation-delay: 240ms; }`,
    codeTailwind: `<div className="stagger-group [&>*:nth-child(1)]:delay-75 [&>*:nth-child(2)]:delay-150" />`
  },
  {
    id: 'magnetic-card',
    name: '3D Spatial Tilt & Glow',
    desc: 'Perspective tilt adhering to cursor coordinates for hero elements.',
    type: 'tilt',
    config: { damping: 20, stiffness: 300 },
    initial: { rotateX: 0, rotateY: 0 },
    animate: { rotateX: 12, rotateY: -12 },
    codeFramer: `<motion.div
  whileHover={{ scale: 1.03, rotateX: 6, rotateY: -6 }}
  transition={{ type: "spring", stiffness: 300, damping: 20 }}
  style={{ transformStyle: "preserve-3d" }}
/>`,
    codeGsap: `gsap.to(".card-3d", {
  rotationX: 6,
  rotationY: -6,
  scale: 1.03,
  duration: 0.3,
  ease: "power2.out"
});`,
    codeCss: `.card-3d:hover {
  transform: perspective(1000px) rotateX(6deg) rotateY(-6deg) scale3d(1.03, 1.03, 1.03);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}`,
    codeTailwind: `<div className="hover:scale-105 transition-transform duration-300 [transform-style:preserve-3d]" />`
  }
];

export const MotionLibrarySection: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState(MOTION_PRESETS[0]);
  const [playTrigger, setPlayTrigger] = useState(0);
  const [stiffness, setStiffness] = useState(400);
  const [damping, setDamping] = useState(25);
  const [mass, setMass] = useState(1);
  const [duration, setDuration] = useState(0.5);
  const [codeTab, setCodeTab] = useState<'framer' | 'gsap' | 'css' | 'tailwind'>('framer');
  const [copiedTab, setCopiedTab] = useState<string | null>(null);

  const handleTriggerReplay = () => {
    sounds.playWhoosh();
    setPlayTrigger((prev) => prev + 1);
  };

  const getCodeSnippet = () => {
    switch (codeTab) {
      case 'framer': return selectedPreset.codeFramer;
      case 'gsap': return selectedPreset.codeGsap;
      case 'css': return selectedPreset.codeCss;
      case 'tailwind': return selectedPreset.codeTailwind;
    }
  };

  const handleCopyCode = () => {
    sounds.playChime();
    navigator.clipboard.writeText(getCodeSnippet());
    setCopiedTab(codeTab);
    setTimeout(() => setCopiedTab(null), 2000);
  };

  return (
    <section id="motion-library" className="px-4 sm:px-8 lg:px-12 2xl:px-20 max-w-[1780px] mx-auto w-full text-[#111111] relative">
      <div className="w-full">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b-2 border-[#0a0a0a]/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="h-7 w-7 rounded-full bg-[#1a1a1a] text-white font-mono font-bold text-xs flex items-center justify-center">
              M1
            </span>
            <span className="font-main font-bold uppercase tracking-wider text-xs text-[#111111]">
              MOTION ARCHITECTURE & ANIMATION COPY ENGINE
            </span>
          </div>
          <span className="font-mono text-xs text-[#6b6b6b]">SABI OS V1.0 • PHYSICS & TIMING ENGINE</span>
        </div>

        <div className="mt-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl sm:text-5xl font-main tracking-tight leading-[1.1]">
              <span className="voral-headline-1">Motion & Physics Library</span>
              <span className="voral-headline-2">with One-Click Code Exporter.</span>
            </h2>
            <p className="mt-3 text-base text-[#6b6b6b] leading-relaxed max-w-2xl">
              Choreograph UI transitions, tune spring physics, and copy production-ready code in <strong>Framer Motion, GSAP, CSS, or Tailwind</strong> with a single click.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleTriggerReplay}
              className="voral-btn-pill-light shadow-sm"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Replay Animation</span>
            </button>

            <button
              onClick={handleCopyCode}
              className="voral-btn-pill shadow-sm"
            >
              {copiedTab ? <Check className="h-4 w-4 text-emerald-300" /> : <Copy className="h-4 w-4" />}
              <span>{copiedTab ? 'Code Copied!' : `Copy ${codeTab.toUpperCase()}`}</span>
            </button>
          </div>
        </div>

        {/* 4 Motion Presets Ribbon */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {MOTION_PRESETS.map((preset) => {
            const isSelected = selectedPreset.id === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => {
                  sounds.playPop();
                  setSelectedPreset(preset);
                  setPlayTrigger((p) => p + 1);
                }}
                className={`p-5 rounded-3xl text-left transition-all border-2 flex flex-col justify-between h-36 ${
                  isSelected
                    ? 'bg-[#1a1a1a] text-white border-[#0a0a0a] shadow-xl scale-[1.02] z-10'
                    : 'bg-white text-[#111111] border-[#0a0a0a]/10 hover:border-[#0a0a0a]/40 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                    isSelected ? 'text-emerald-400' : 'text-[#8a8a8a]'
                  }`}>
                    {preset.type.toUpperCase()}
                  </span>
                  <Activity className="h-3.5 w-3.5 opacity-60" />
                </div>

                <div>
                  <h4 className="font-main font-bold text-sm sm:text-base leading-tight">
                    {preset.name}
                  </h4>
                  <p className={`text-[11px] mt-1 line-clamp-2 leading-snug ${
                    isSelected ? 'text-white/80' : 'text-[#6b6b6b]'
                  }`}>
                    {preset.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Live Interactive Specimen Stage & Code Studio */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Canvas: Live Animated Specimen */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#0a0a0a] shadow-xl flex flex-col justify-between min-h-[460px] relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-[#0a0a0a]/10 pb-3 mb-6">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#6b6b6b]">
                PHYSICS VIEWPORT SIMULATOR
              </span>
              <span className="text-xs font-mono text-emerald-700 font-bold">
                60 FPS Hardware Accelerated
              </span>
            </div>

            {/* Specimen Render */}
            <div className="flex-1 flex items-center justify-center p-6 bg-[#ECEAE6] rounded-2xl border border-[#0a0a0a]/10 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${selectedPreset.id}-${playTrigger}`}
                  initial={selectedPreset.initial}
                  animate={selectedPreset.animate}
                  transition={
                    selectedPreset.type === 'spring'
                      ? { type: 'spring', stiffness, damping, mass }
                      : { duration, ease: [0.16, 1, 0.3, 1] }
                  }
                  whileHover={
                    selectedPreset.id === 'magnetic-card'
                      ? { scale: 1.05, rotateX: 8, rotateY: -8 }
                      : { scale: 1.02 }
                  }
                  className="w-72 bg-white rounded-3xl p-5 border-2 border-[#0a0a0a] shadow-2xl space-y-3 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#1a1a1a] text-white text-[9px] font-mono font-bold">
                      SABI SPECIMEN
                    </span>
                    <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                  </div>

                  <div className="h-28 rounded-2xl bg-[#F4F3F1] border border-[#0a0a0a]/10 flex flex-col justify-end p-3 overflow-hidden relative">
                    <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                    <span className="font-main font-bold text-xs text-[#111111]">
                      Kinetic Motion Specimen
                    </span>
                    <span className="text-[10px] font-mono text-[#8a8a8a]">
                      Curved Spring Interpolation
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-xs font-mono">
                    <span className="text-[#6b6b6b]">Duration:</span>
                    <strong className="text-[#111111]">{duration}s</strong>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Timing Guidelines Rule */}
            <div className="pt-4 mt-6 border-t border-[#0a0a0a]/10 flex flex-wrap items-center justify-between text-xs font-mono text-[#6b6b6b]">
              <span>Micro-interactions: 100–150ms</span>
              <span>Modals / Sheets: 300–400ms</span>
              <span className="text-[#111111] font-bold">Choreographed</span>
            </div>
          </div>

          {/* Right Panel: Parameter Sliders & Code Exporter */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#0a0a0a] shadow-xl flex flex-col justify-between space-y-6">
            
            {/* Live Sliders */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#6b6b6b]">
                  SPRING & TIMING PARAMETERS
                </span>
                <span className="text-xs font-mono text-[#8a8a8a]">Realtime Reflow</span>
              </div>

              {/* Stiffness Slider */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-1">
                  <span className="text-[#111111] font-bold">Stiffness: {stiffness}</span>
                  <span className="text-emerald-700 font-bold">Tension</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="1000"
                  step="25"
                  value={stiffness}
                  onChange={(e) => {
                    sounds.playClick();
                    setStiffness(Number(e.target.value));
                  }}
                  className="w-full h-1.5 bg-[#F4F3F1] rounded-lg appearance-none cursor-pointer accent-[#1a1a1a]"
                />
              </div>

              {/* Damping Slider */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-1">
                  <span className="text-[#111111] font-bold">Damping: {damping}</span>
                  <span className="text-emerald-700 font-bold">Friction</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="60"
                  step="1"
                  value={damping}
                  onChange={(e) => {
                    sounds.playClick();
                    setDamping(Number(e.target.value));
                  }}
                  className="w-full h-1.5 bg-[#F4F3F1] rounded-lg appearance-none cursor-pointer accent-[#1a1a1a]"
                />
              </div>

              {/* Duration Slider */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-1">
                  <span className="text-[#111111] font-bold">Duration: {duration}s</span>
                  <span className="text-emerald-700 font-bold">Time Window</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="2.0"
                  step="0.05"
                  value={duration}
                  onChange={(e) => {
                    sounds.playClick();
                    setDuration(Number(e.target.value));
                  }}
                  className="w-full h-1.5 bg-[#F4F3F1] rounded-lg appearance-none cursor-pointer accent-[#1a1a1a]"
                />
              </div>
            </div>

            {/* Multi-Format Code Exporter */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <div className="flex gap-1.5 bg-[#F4F3F1] p-1 rounded-xl border border-[#0a0a0a]/10">
                  {(['framer', 'gsap', 'css', 'tailwind'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => {
                        sounds.playPop();
                        setCodeTab(tab);
                      }}
                      className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                        codeTab === tab
                          ? 'bg-[#1a1a1a] text-white shadow-sm'
                          : 'text-[#6b6b6b] hover:text-[#111111]'
                      }`}
                    >
                      {tab.toUpperCase()}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleCopyCode}
                  className="text-xs font-mono font-bold text-[#111111] hover:text-[#366299] flex items-center gap-1"
                >
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy</span>
                </button>
              </div>

              <pre className="p-4 rounded-2xl bg-[#111111] text-emerald-400 text-xs font-mono overflow-x-auto max-h-[140px] border border-black shadow-inner leading-relaxed">
                <code>{getCodeSnippet()}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
