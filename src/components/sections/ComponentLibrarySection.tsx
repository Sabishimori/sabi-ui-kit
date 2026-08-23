import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Check, Bell, Search, ToggleLeft, ToggleRight, X, Sparkles, Command, ArrowRight, ShieldCheck, Terminal, Flame, Zap, User } from 'lucide-react';
import { sounds } from '../../utils/audio';

export const ComponentLibrarySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [switchOn, setSwitchOn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showCommandBar, setShowCommandBar] = useState(false);

  const triggerToast = () => {
    sounds.playChime();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const toggleLoading = () => {
    sounds.playPop();
    setIsLoading(true);
    setTimeout(() => {
      sounds.playChime();
      setIsLoading(false);
    }, 1200);
  };

  return (
    <section id="components" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F4F3F1] text-[#111111] border-b-2 border-[#0a0a0a] relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b-2 border-[#0a0a0a]/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="h-7 w-7 rounded-full bg-[#1a1a1a] text-white font-mono font-bold text-xs flex items-center justify-center">
              21
            </span>
            <span className="font-main font-bold uppercase tracking-wider text-xs text-[#111111]">
              ULTRA-MODERN COMPONENT SYSTEM (2026 SPEC)
            </span>
          </div>
          <span className="font-mono text-xs text-[#6b6b6b]">SABI OS V1.0 • ATOMIC UI SUITE</span>
        </div>

        <div className="mt-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl sm:text-5xl font-main tracking-tight leading-[1.1]">
              <span className="voral-headline-1">Atomic Component Suite</span>
              <span className="voral-headline-2">and Interactive Micro-Interaction Sandbox.</span>
            </h2>
            <p className="mt-3 text-base text-[#6b6b6b] leading-relaxed max-w-2xl">
              Experience next-generation tactile UI: Clean command palettes, magnetic actions, dynamic skeleton states, and animated micro-interactions.
            </p>
          </div>

          {/* Open Command Palette Trigger */}
          <button
            onClick={() => {
              sounds.playWhoosh();
              setShowCommandBar(true);
            }}
            className="voral-btn-pill shrink-0"
          >
            <Command className="h-4 w-4 text-emerald-400" />
            <span>Open Command Palette (Cmd+K)</span>
          </button>
        </div>

        {/* 3 Modern Component Bento Blocks */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Segmented Tabs */}
          <div className="p-6 rounded-3xl bg-white border-2 border-[#0a0a0a] shadow-xl flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#6b6b6b]">
                  01 SEGMENTED PILL TABS
                </span>
                <span className="h-2 w-2 rounded-full bg-[#111111] animate-pulse" />
              </div>

              <div className="p-1 rounded-full bg-[#F4F3F1] border border-[#0a0a0a]/10 flex gap-1">
                {['Overview', 'Telemetry', 'Releases'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      sounds.playClick();
                      setActiveTab(tab);
                    }}
                    className={`flex-1 py-2 rounded-full text-xs font-main font-bold transition-all duration-200 ${
                      activeTab === tab
                        ? 'bg-[#1a1a1a] text-white shadow-md'
                        : 'text-[#6b6b6b] hover:text-[#111111]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="mt-4 p-4 rounded-2xl bg-[#F4F3F1] border border-[#0a0a0a]/10 text-xs text-[#111111]">
                Active Viewport: <strong className="text-[#111111] font-main font-bold">{activeTab} Surface</strong>
              </div>
            </div>
            <span className="text-[10px] font-mono text-[#8a8a8a]">Zero-latency tab switching</span>
          </div>

          {/* Card 2: Interactive Dynamic Skeleton Loader */}
          <div className="p-6 rounded-3xl bg-white border-2 border-[#0a0a0a] shadow-xl flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#6b6b6b]">
                  02 SKELETON LOADER STATE
                </span>
                <button
                  onClick={toggleLoading}
                  className="text-[11px] font-mono text-[#111111] underline hover:font-bold"
                >
                  Simulate Load
                </button>
              </div>

              {isLoading ? (
                <div className="space-y-3 animate-pulse">
                  <div className="h-4 w-3/4 bg-[#111111]/10 rounded-lg" />
                  <div className="h-3 w-full bg-[#111111]/5 rounded" />
                  <div className="h-3 w-5/6 bg-[#111111]/5 rounded" />
                  <div className="h-8 w-28 bg-[#111111]/10 rounded-full mt-2" />
                </div>
              ) : (
                <div className="space-y-2">
                  <h4 className="font-main font-bold text-sm text-[#111111]">
                    Sabi Kit Data Layer v1.0.4
                  </h4>
                  <p className="text-xs text-[#6b6b6b] leading-relaxed">
                    12,840 metrics synced across client database in 12ms.
                  </p>
                  <div className="pt-2 flex items-center gap-2">
                    <span className="px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold">
                      ● SYNCED
                    </span>
                  </div>
                </div>
              )}
            </div>
            <span className="text-[10px] font-mono text-[#8a8a8a]">Smooth skeleton shimmer physics</span>
          </div>

          {/* Card 3: Magnetic Action Buttons & Toasts */}
          <div className="p-6 rounded-3xl bg-white border-2 border-[#0a0a0a] shadow-xl flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#6b6b6b] block mb-4">
                03 ACTIONS & FLOATING TOASTS
              </span>

              <div className="space-y-2.5">
                <button
                  onClick={triggerToast}
                  className="w-full voral-btn-pill justify-center"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Trigger Modern Toast Event</span>
                </button>

                <button
                  onClick={() => {
                    sounds.playClick();
                    setSwitchOn(!switchOn);
                  }}
                  className="w-full py-2.5 px-4 rounded-full bg-[#F4F3F1] border border-[#0a0a0a]/15 text-xs text-[#111111] font-semibold flex items-center justify-between transition-colors hover:border-[#111111]"
                >
                  <span>Telemetry Live Mode</span>
                  {switchOn ? (
                    <ToggleRight className="h-6 w-6 text-[#111111]" />
                  ) : (
                    <ToggleLeft className="h-6 w-6 text-[#8a8a8a]" />
                  )}
                </button>
              </div>
            </div>
            <span className="text-[10px] font-mono text-[#8a8a8a]">Tactile feedback & spring dynamics</span>
          </div>
        </div>

        {/* Command Palette Modal Dialog */}
        <AnimatePresence>
          {showCommandBar && (
            <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowCommandBar(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                className="relative bg-white border-2 border-[#0a0a0a] rounded-3xl p-6 max-w-xl w-full shadow-2xl z-10 text-[#111111] space-y-4"
              >
                <div className="flex items-center gap-3 border-b border-[#0a0a0a]/10 pb-4">
                  <Search className="h-5 w-5 text-[#6b6b6b] shrink-0" />
                  <input
                    type="text"
                    placeholder="Type a command or search Sabi Kit..."
                    className="w-full bg-transparent text-sm text-[#111111] focus:outline-none placeholder:text-[#8a8a8a] font-main"
                    autoFocus
                  />
                  <button
                    onClick={() => setShowCommandBar(false)}
                    className="p-1 text-[#6b6b6b] hover:text-[#111111]"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-1 text-xs font-mono">
                  <div className="p-2.5 rounded-xl hover:bg-[#F4F3F1] cursor-pointer flex items-center justify-between transition-colors">
                    <span className="text-[#111111] font-bold">Jump to 14-Step Master Flow</span>
                    <span className="text-[#8a8a8a]">#master-flow</span>
                  </div>
                  <div className="p-2.5 rounded-xl hover:bg-[#F4F3F1] cursor-pointer flex items-center justify-between transition-colors">
                    <span className="text-[#111111] font-bold">Export Design Tokens JSON</span>
                    <span className="text-[#8a8a8a]">#tokens</span>
                  </div>
                  <div className="p-2.5 rounded-xl hover:bg-[#F4F3F1] cursor-pointer flex items-center justify-between transition-colors">
                    <span className="text-[#111111] font-bold">Open Interactive Brief Generator</span>
                    <span className="text-[#8a8a8a]">#brief-builder</span>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Floating Toast Notification */}
        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="fixed bottom-6 right-6 z-50 p-4 rounded-3xl bg-[#1a1a1a] text-white shadow-2xl flex items-center gap-3 border border-white/20"
            >
              <div className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center font-bold">
                <Check className="h-4 w-4 text-emerald-400" />
              </div>
              <div>
                <h5 className="font-main font-bold text-xs text-white">Sabi Kit Event Dispatched</h5>
                <p className="text-[11px] text-[#8a8a8a]">State updated with 300ms spring physics.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
