import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Zap, 
  Clock, 
  Target, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Gauge, 
  Sliders, 
  ShieldCheck,
  Search,
  BookOpen,
  Filter,
  Check,
  RefreshCw,
  ExternalLink,
  Cpu,
  Smile,
  Activity,
  SlidersHorizontal,
  Compass
} from 'lucide-react';
import { ALL_21_LAWS, LawOfUX } from '../../data/lawsOfUxData';
import { sounds } from '../../utils/audio';

type CategoryFilter = 'All' | 'Heuristic' | 'Gestalt' | 'Cognitive & Performance';

export const LawsOfUXSection: React.FC = () => {
  const [activeLawId, setActiveLawId] = useState<string>('aesthetic-usability');
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const activeLaw = useMemo(() => {
    return ALL_21_LAWS.find((l) => l.id === activeLawId) || ALL_21_LAWS[0];
  }, [activeLawId]);

  const filteredLaws = useMemo(() => {
    return ALL_21_LAWS.filter((law) => {
      const matchesCategory = activeCategory === 'All' || law.category === activeCategory;
      const matchesSearch = 
        law.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        law.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        law.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        law.num.includes(searchQuery);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // ── 1. Fitts's Law Simulator State ──
  const [targetHitTime, setTargetHitTime] = useState<number | null>(null);
  const [testStart, setTestStart] = useState<number>(0);
  const [isFittsRunning, setIsFittsRunning] = useState(false);

  const startFittsTest = () => {
    sounds.playWhoosh();
    setIsFittsRunning(true);
    setTargetHitTime(null);
    setTestStart(Date.now());
  };

  const handleTargetClick = (size: 'tiny' | 'large') => {
    sounds.playChime();
    const elapsed = Date.now() - testStart;
    setTargetHitTime(elapsed);
    setIsFittsRunning(false);
  };

  // ── 2. Hick's Law Simulator State ──
  const [choiceCount, setChoiceCount] = useState(4);
  const hicksReactionTime = useMemo(() => {
    // RT = 150ms (base) + 180ms * log2(choiceCount + 1)
    return Math.round(150 + 180 * Math.log2(choiceCount + 1));
  }, [choiceCount]);

  // ── 3. Doherty Threshold State ──
  const [isDelayedMode, setIsDelayedMode] = useState(false);
  const [dohertyFeedback, setDohertyFeedback] = useState('System Idle. Click trigger to measure latency.');
  const [isDohertyLoading, setIsDohertyLoading] = useState(false);

  const triggerDohertyAction = () => {
    setIsDohertyLoading(true);
    if (isDelayedMode) {
      setDohertyFeedback('Simulating 1,200ms slow backend response...');
      setTimeout(() => {
        sounds.playChime();
        setIsDohertyLoading(false);
        setDohertyFeedback('Done (1,200ms latency — High cognitive friction & loss of flow)');
      }, 1200);
    } else {
      setTimeout(() => {
        sounds.playChime();
        setIsDohertyLoading(false);
        setDohertyFeedback('Done (50ms response — Peak Productivity & Instant Flow)');
      }, 50);
    }
  };

  // ── 4. Miller's Law 7±2 Chunking State ──
  const [isChunked, setIsChunked] = useState(true);
  const rawNumber = '4158923091';
  const chunkedNumber = '(415) 892-3091';

  // ── 5. Postel's Law Flexible Validator ──
  const [inputVal, setInputVal] = useState('555.234.8910');
  const sanitizedOutput = useMemo(() => {
    const digits = inputVal.replace(/\D/g, '');
    if (digits.length === 10) {
      return `+1 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    }
    return digits ? `+1 ${digits}` : 'Awaiting input...';
  }, [inputVal]);

  // ── 6. Goal-Gradient & Zeigarnik Effect Progress ──
  const [goalProgress, setGoalProgress] = useState(75);

  // ── 7. Gestalt Boundary Switcher ──
  const [showBoundaries, setShowBoundaries] = useState(true);

  return (
    <section id="laws-of-ux" className="pt-2 sm:pt-4 pb-16 sm:pb-28 px-3 sm:px-6 lg:px-8 2xl:px-10 max-w-[1880px] mx-auto w-full text-[#111111] relative">
      <div className="w-full space-y-12 sm:space-y-16">
        
        {/* ── 1. Editorial Header & Search Hub ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-[#0a0a0a]/10 pb-8">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="h-6 w-6 rounded-lg bg-[#111111] text-white flex items-center justify-center shadow-sm">
                <Brain className="h-3.5 w-3.5 text-rose-400" />
              </span>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#111111]">
                COGNITIVE PSYCHOLOGY & UX HEURISTICS &bull; ALL {ALL_21_LAWS.length} LAWS OF UX
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl 2xl:text-6xl font-main font-black tracking-tight text-[#111111] leading-tight">
              The {ALL_21_LAWS.length} Laws of UX & Cognitive Laboratory
            </h1>
            <p className="text-base sm:text-lg text-[#555555] leading-relaxed">
              Compiled by Jon Yablonski (<a href="https://lawsofux.com/" target="_blank" rel="noreferrer" className="text-[#111111] font-bold underline hover:text-[#366299]">lawsofux.com</a>). Every design decision in Sabi Kit is anchored to verified human cognitive psychology, motor steering models, and behavioral ergonomics.
            </p>
          </div>

          {/* Quick Search & Count Filter */}
          <div className="w-full lg:w-96 space-y-2">
            <div className="relative">
              <Search className="h-4 w-4 text-[#666666] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search all ${ALL_21_LAWS.length} laws, formulas, origins...`}
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-[#0a0a0a]/12 text-xs font-mono text-[#111111] placeholder:text-[#666666] focus:outline-none focus:ring-2 focus:ring-[#111111] shadow-sm"
              />
            </div>
            <div className="flex items-center justify-between text-xs font-mono text-[#666666] px-1">
              <span>Showing {filteredLaws.length} of {ALL_21_LAWS.length} Laws</span>
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="text-[#111111] font-bold hover:underline"
                >
                  Clear Search
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── 2. Category Filter Pills ── */}
        <div className="flex flex-wrap items-center gap-2">
          {(['All', 'Heuristic', 'Gestalt', 'Cognitive & Performance'] as CategoryFilter[]).map((cat) => {
            const isActive = activeCategory === cat;
            const count = cat === 'All' 
              ? ALL_21_LAWS.length 
              : ALL_21_LAWS.filter(l => l.category === cat).length;

            return (
              <button
                key={cat}
                onClick={() => {
                  sounds.playClick();
                  setActiveCategory(cat);
                }}
                className={`px-4 py-2.5 rounded-full text-xs font-main font-bold transition-all border flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#111111] text-white border-[#0a0a0a] shadow-md scale-[1.02]'
                    : 'bg-white text-[#666666] border-[#0a0a0a]/10 hover:text-[#111111] hover:bg-[#ECEAE6]'
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-[#F4F3F1] text-[#666666]'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── 3. 21-Laws Grid (Responsive & Tactile) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-7 gap-3.5">
          {filteredLaws.map((law) => {
            const isSelected = activeLaw.id === law.id;
            return (
              <button
                key={law.id}
                onClick={() => {
                  sounds.playPop();
                  setActiveLawId(law.id);
                  const el = document.getElementById('law-inspector');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }}
                className={`p-4 rounded-2xl text-left transition-all duration-200 border flex flex-col justify-between h-36 relative group ${
                  isSelected
                    ? 'bg-[#111111] text-white border-[#0a0a0a] shadow-xl scale-[1.02] z-10'
                    : 'bg-white text-[#111111] border-[#0a0a0a]/10 hover:border-[#0a0a0a]/30 shadow-sm hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`font-mono text-xs font-bold ${
                    isSelected ? 'text-rose-400' : 'text-[#666666]'
                  }`}>
                    {law.num}
                  </span>
                  <span className={`text-[9.5px] font-mono px-1.5 py-0.2 rounded-full uppercase font-bold ${
                    isSelected 
                      ? 'bg-white/15 text-white' 
                      : 'bg-[#F4F3F1] text-[#666666]'
                  }`}>
                    {law.category.split(' ')[0]}
                  </span>
                </div>

                <div>
                  <h4 className="font-main font-bold text-xs sm:text-sm leading-tight group-hover:text-[#366299] transition-colors">
                    {law.name}
                  </h4>
                  <p className={`text-[11px] mt-1 line-clamp-2 ${
                    isSelected ? 'text-white/70' : 'text-[#666666]'
                  }`}>
                    {law.summary}
                  </p>
                </div>

                {isSelected && (
                  <motion.div
                    layoutId="activeLawDot"
                    className="absolute -bottom-1 left-4 right-4 h-0.5 bg-rose-400 rounded-full"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* ── 4. Deep-Dive Cognitive Laboratory Inspector Sandbox ── */}
        <div id="law-inspector" className="pt-4">
          <motion.div
            key={activeLaw.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
          >
            
            {/* Left: Law Specification & Guidelines */}
            <div className="lg:col-span-6 bg-white rounded-3xl p-8 sm:p-10 border border-[#0a0a0a]/10 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#111111] text-white text-xs font-mono font-bold">
                    LAW {activeLaw.num}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#F4F3F1] border border-[#0a0a0a]/10 text-xs font-mono font-bold text-[#111111]">
                    {activeLaw.category}
                  </span>
                  <span className="text-xs font-mono text-[#666666]">
                    &bull; {activeLaw.origin} ({activeLaw.year || 'Classic'})
                  </span>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-4xl font-main font-black text-[#111111] tracking-tight">
                    {activeLaw.name}
                  </h2>
                  <blockquote className="text-base sm:text-lg text-[#111111] font-medium leading-relaxed mt-3 italic border-l-2 border-[#111111] pl-4">
                    "{activeLaw.summary}"
                  </blockquote>
                </div>

                {/* Key Takeaway */}
                <div className="p-5 rounded-2xl bg-[#F4F3F1] border border-[#0a0a0a]/10 space-y-2">
                  <span className="text-xs font-mono text-[#666666] uppercase font-bold tracking-wider block">
                    ACTIONABLE DESIGN TAKEAWAY
                  </span>
                  <p className="text-sm text-[#111111] leading-relaxed">
                    {activeLaw.keyTakeaway}
                  </p>
                </div>

                {/* Guidelines Checklist */}
                <div className="space-y-2.5 pt-2">
                  <span className="text-xs font-mono text-[#666666] uppercase font-bold tracking-wider block">
                    PRACTICAL IMPLEMENTATION GUIDELINES
                  </span>
                  <div className="space-y-2">
                    {activeLaw.guidelines.map((g, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#555555]">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{g}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer specs */}
              <div className="pt-6 border-t border-[#0a0a0a]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-[#666666]">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#111111]">Formula / Rule:</span>
                  <span className="bg-[#F4F3F1] px-2.5 py-1 rounded-md text-[#111111] font-bold">
                    {activeLaw.formula}
                  </span>
                </div>
                <div className="text-emerald-700 font-bold">
                  Verified by Cognitive Science
                </div>
              </div>
            </div>

            {/* Right: Dynamic Interactive Simulation Sandbox */}
            <div className="lg:col-span-6 bg-white rounded-3xl p-8 sm:p-10 border border-[#0a0a0a]/10 shadow-sm flex flex-col justify-between space-y-6">
              
              <div className="flex items-center justify-between border-b border-[#0a0a0a]/10 pb-4">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-[#366299]" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#111111]">
                    LIVE HEURISTIC SIMULATOR
                  </span>
                </div>
                <span className="text-xs font-mono text-[#666666]">Interactive Lab</span>
              </div>

              {/* Dynamic Sandbox Conditionals */}
              <div className="flex-1 flex flex-col justify-center">
                
                {/* 1. Fitts's Law Simulator */}
                {activeLaw.id === 'fitts' && (
                  <div className="space-y-6">
                    <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                      Compare the acquisition time to click a tiny 14px target vs an ergonomic 48px touch target.
                    </p>

                    <div className="p-8 bg-[#F4F3F1] rounded-2xl border border-[#0a0a0a]/10 min-h-[220px] flex flex-col items-center justify-center gap-6">
                      {!isFittsRunning ? (
                        <button
                          onClick={startFittsTest}
                          className="voral-btn-pill flex items-center gap-2"
                        >
                          <Target className="h-4 w-4 text-emerald-400" />
                          <span>Start Fitts Acquisition Test</span>
                        </button>
                      ) : (
                        <div className="flex items-center justify-around w-full">
                          <button
                            onClick={() => handleTargetClick('tiny')}
                            className="h-3.5 w-3.5 bg-rose-600 rounded-sm hover:scale-125 transition-transform"
                            title="Tiny 14px target"
                          />
                          <button
                            onClick={() => handleTargetClick('large')}
                            className="voral-btn-pill py-3.5 px-8 text-xs font-bold shadow-md"
                          >
                            48px Sabi Touch Target
                          </button>
                        </div>
                      )}

                      {targetHitTime !== null && (
                        <div className="text-xs font-mono text-emerald-800 font-bold bg-emerald-100 px-4 py-2 rounded-full border border-emerald-300">
                          Target Acquisition Speed: {targetHitTime}ms
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* 2. Hick's Law Simulator */}
                {activeLaw.id === 'hicks' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span>Number of Choices: <strong className="text-[#111111]">{choiceCount}</strong></span>
                      <span>Estimated Decision Time: <strong className="text-emerald-700">{hicksReactionTime}ms</strong></span>
                    </div>

                    <input
                      type="range"
                      min="2"
                      max="16"
                      value={choiceCount}
                      onChange={(e) => {
                        sounds.playClick();
                        setChoiceCount(Number(e.target.value));
                      }}
                      className="w-full accent-[#111111] cursor-pointer"
                    />

                    <div className="p-6 bg-[#F4F3F1] rounded-2xl border border-[#0a0a0a]/10">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {Array.from({ length: choiceCount }).map((_, i) => (
                          <div
                            key={i}
                            className="p-3 rounded-xl bg-white border border-[#0a0a0a]/10 text-center font-mono text-xs font-bold text-[#111111] shadow-xs"
                          >
                            Option {i + 1}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. Doherty Threshold Simulator */}
                {activeLaw.id === 'doherty' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-[#555555]">Response Mode:</span>
                      <button
                        onClick={() => {
                          sounds.playPop();
                          setIsDelayedMode(!isDelayedMode);
                        }}
                        className={`px-3 py-1 rounded-full text-xs font-mono font-bold border transition-colors ${
                          isDelayedMode 
                            ? 'bg-rose-100 text-rose-800 border-rose-300'
                            : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        }`}
                      >
                        {isDelayedMode ? 'Lag Mode (1,200ms)' : 'Sabi Mode (50ms Instant)'}
                      </button>
                    </div>

                    <div className="p-8 bg-[#F4F3F1] rounded-2xl border border-[#0a0a0a]/10 flex flex-col items-center justify-center gap-4">
                      <button
                        onClick={triggerDohertyAction}
                        disabled={isDohertyLoading}
                        className="voral-btn-pill flex items-center gap-2"
                      >
                        <Zap className="h-4 w-4 text-amber-400" />
                        <span>{isDohertyLoading ? 'Processing Request...' : 'Trigger Latency Test'}</span>
                      </button>

                      <p className="text-xs font-mono text-[#666666] text-center max-w-sm">
                        {dohertyFeedback}
                      </p>
                    </div>
                  </div>
                )}

                {/* 4. Miller's Law 7±2 Chunking */}
                {activeLaw.id === 'millers' && (
                  <div className="space-y-6">
                    <p className="text-xs sm:text-sm text-[#555555]">
                      Toggle chunking to witness how working memory retention improves when 10 digits are split into 3 memorable chunks.
                    </p>

                    <div className="p-8 bg-[#F4F3F1] rounded-2xl border border-[#0a0a0a]/10 text-center space-y-4">
                      <div className="text-2xl sm:text-3xl font-mono font-black text-[#111111] tracking-wider">
                        {isChunked ? chunkedNumber : rawNumber}
                      </div>

                      <button
                        onClick={() => {
                          sounds.playPop();
                          setIsChunked(!isChunked);
                        }}
                        className="voral-btn-pill text-xs py-2 px-5"
                      >
                        {isChunked ? 'Show Raw String (10 items)' : 'Apply 7±2 Chunking (3 items)'}
                      </button>
                    </div>
                  </div>
                )}

                {/* 5. Postel's Law Input Sanitizer */}
                {activeLaw.id === 'postels' && (
                  <div className="space-y-6">
                    <p className="text-xs sm:text-sm text-[#555555]">
                      Type any messy phone format (e.g. 555-123-4567, 555.123.4567, or 5551234567). Postel's Law accepts all liberal inputs and outputs strict standardized data.
                    </p>

                    <div className="space-y-3">
                      <input
                        type="text"
                        value={inputVal}
                        onChange={(e) => setInputVal(e.target.value)}
                        placeholder="Type raw number..."
                        className="w-full p-3 rounded-xl bg-white border border-[#0a0a0a]/15 text-xs font-mono text-[#111111]"
                      />

                      <div className="p-4 bg-[#F4F3F1] rounded-xl border border-[#0a0a0a]/10 flex items-center justify-between text-xs font-mono">
                        <span className="text-[#666666]">Standardized Output:</span>
                        <strong className="text-emerald-700">{sanitizedOutput}</strong>
                      </div>
                    </div>
                  </div>
                )}

                {/* 6. Goal-Gradient & Zeigarnik Effect */}
                {(activeLaw.id === 'goal-gradient' || activeLaw.id === 'zeigarnik') && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span>Task Completion: <strong className="text-[#111111]">{goalProgress}%</strong></span>
                      <span>Motivation: <strong className="text-emerald-700">{goalProgress >= 70 ? 'HIGH MOMENTUM' : 'MODERATE'}</strong></span>
                    </div>

                    <div className="w-full h-4 bg-[#ECEAE6] rounded-full overflow-hidden border border-[#0a0a0a]/10">
                      <motion.div
                        className="h-full bg-[#111111]"
                        initial={{ width: 0 }}
                        animate={{ width: `${goalProgress}%` }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>

                    <div className="flex gap-2">
                      {[25, 50, 75, 90].map((val) => (
                        <button
                          key={val}
                          onClick={() => {
                            sounds.playClick();
                            setGoalProgress(val);
                          }}
                          className={`flex-1 py-2 rounded-xl text-xs font-mono font-bold border transition-colors ${
                            goalProgress === val ? 'bg-[#111111] text-white border-[#111111]' : 'bg-[#F4F3F1] text-[#111111] border-[#0a0a0a]/10'
                          }`}
                        >
                          {val}%
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Default Gestalt / Generic Visual Heuristic Sandbox */}
                {!['fitts', 'hicks', 'doherty', 'millers', 'postels', 'goal-gradient', 'zeigarnik'].includes(activeLaw.id) && (
                  <div className="p-8 bg-[#F4F3F1] rounded-2xl border border-[#0a0a0a]/10 space-y-4 text-center">
                    <Compass className="h-8 w-8 text-[#111111] mx-auto opacity-70" />
                    <h4 className="font-main font-bold text-base text-[#111111]">
                      {activeLaw.name} in Sabi OS Architecture
                    </h4>
                    <p className="text-xs text-[#555555] leading-relaxed max-w-md mx-auto">
                      {activeLaw.exampleUse}
                    </p>
                    <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-800 font-bold bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                      <Check className="h-3.5 w-3.5" />
                      <span>Certified in Sabi Tokens & Components</span>
                    </div>
                  </div>
                )}

              </div>

              {/* Sandbox Footer */}
              <div className="pt-4 border-t border-[#0a0a0a]/10 flex items-center justify-between text-xs font-mono text-[#666666]">
                <span>lawsofux.com Standard</span>
                <span className="text-[#111111] font-bold">100% Tested Heuristic</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
