import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Sparkles, Compass, Eye, ShieldCheck } from 'lucide-react';
import { sounds } from '../../utils/audio';

export const ReferenceBoardSection: React.FC = () => {
  return (
    <section id="reference-board" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F4F3F1] text-[#111111] border-b-2 border-[#0a0a0a] relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b-2 border-[#0a0a0a]/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="h-7 w-7 rounded-full bg-[#1a1a1a] text-white font-mono font-bold text-xs flex items-center justify-center">
              10
            </span>
            <span className="font-main font-bold uppercase tracking-wider text-xs text-[#111111]">
              AESTHETIC REFERENCE BOARD & GUARDRAILS
            </span>
          </div>
          <span className="font-mono text-xs text-[#6b6b6b]">SABI OS V1.0 • STYLE RESTRICTIONS</span>
        </div>

        {/* 2-Line Headline */}
        <div className="mt-10 mb-8 max-w-3xl">
          <h2 className="text-3xl sm:text-5xl font-main tracking-tight leading-[1.1]">
            <span className="voral-headline-1">Approved Design Constraints</span>
            <span className="voral-headline-2">restrict unnecessary aesthetic drift.</span>
          </h2>
          <p className="mt-3 text-base text-[#6b6b6b] leading-relaxed">
            Strict visual guardrails ensure that all designers, frontend engineers, and contributors create a cohesive high-end experience without visual noise.
          </p>
        </div>

        {/* 3 Column Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Col 1: INSPIRATION DIRECTION */}
          <div className="p-6 rounded-3xl bg-white border-2 border-[#0a0a0a] shadow-xl space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-[#0a0a0a]/10 pb-3 mb-4">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#111111]">
                  INSPIRATION DIRECTION
                </span>
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-[#F4F3F1] border border-[#0a0a0a]/10">
                  <h4 className="font-main font-bold text-sm text-[#111111]">Minimal Layout</h4>
                  <p className="text-xs text-[#6b6b6b] mt-1">High asymmetrical white space allowing data to breathe naturally.</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F4F3F1] border border-[#0a0a0a]/10">
                  <h4 className="font-main font-bold text-sm text-[#111111]">Modern Sans + Mono</h4>
                  <p className="text-xs text-[#6b6b6b] mt-1">Plus Jakarta Sans paired with Space Mono metadata readouts.</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F4F3F1] border border-[#0a0a0a]/10">
                  <h4 className="font-main font-bold text-sm text-[#111111]">Tactile Light Canvas</h4>
                  <p className="text-xs text-[#6b6b6b] mt-1">Warm off-white #F4F3F1 surfaces with crisp 2px solid black frames.</p>
                </div>
              </div>
            </div>
            <span className="text-[10px] font-mono text-emerald-700 font-bold">✓ Approved Core Benchmark</span>
          </div>

          {/* Col 2: RESTRICTIONS */}
          <div className="p-6 rounded-3xl bg-white border-2 border-[#0a0a0a] shadow-xl space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-[#0a0a0a]/10 pb-3 mb-4">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-rose-700">
                  DESIGN RESTRICTIONS
                </span>
                <XCircle className="h-4 w-4 text-rose-600" />
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200">
                  <h4 className="font-main font-bold text-sm text-rose-900">No Complex Glows</h4>
                  <p className="text-xs text-rose-800 mt-1">Prohibit muddy multi-colored blur glows that reduce legibility.</p>
                </div>

                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200">
                  <h4 className="font-main font-bold text-sm text-rose-900">No Dense Glass Clutter</h4>
                  <p className="text-xs text-rose-800 mt-1">Avoid heavy blurred overlays that obscure data hierarchy.</p>
                </div>

                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200">
                  <h4 className="font-main font-bold text-sm text-rose-900">No Arbitrary Margins</h4>
                  <p className="text-xs text-rose-800 mt-1">Strict 8px harmonic spacing grid without unapproved pixel offsets.</p>
                </div>
              </div>
            </div>
            <span className="text-[10px] font-mono text-rose-700 font-bold">✕ Strict Exclusions</span>
          </div>

          {/* Col 3: TARGET AUDIENCE FIT */}
          <div className="p-6 rounded-3xl bg-white border-2 border-[#0a0a0a] shadow-xl space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-[#0a0a0a]/10 pb-3 mb-4">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#111111]">
                  ENTERPRISE AUDIENCE FIT
                </span>
                <ShieldCheck className="h-4 w-4 text-[#366299]" />
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-[#F4F3F1] border border-[#0a0a0a]/10">
                  <h4 className="font-main font-bold text-sm text-[#111111]">Executive Trust</h4>
                  <p className="text-xs text-[#6b6b6b] mt-1">Commanding, calm, and dependable visual tone for high-stakes buyers.</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F4F3F1] border border-[#0a0a0a]/10">
                  <h4 className="font-main font-bold text-sm text-[#111111]">Zero-Friction Ergonomics</h4>
                  <p className="text-xs text-[#6b6b6b] mt-1">Optimized for fast keyboard operations (Cmd+K) and sub-100ms navigation.</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F4F3F1] border border-[#0a0a0a]/10">
                  <h4 className="font-main font-bold text-sm text-[#111111]">Universal Accessibility</h4>
                  <p className="text-xs text-[#6b6b6b] mt-1">WCAG 2.1 AAA high-contrast certification across all surface scales.</p>
                </div>
              </div>
            </div>
            <span className="text-[10px] font-mono text-[#366299] font-bold">★ Production Standard</span>
          </div>
        </div>
      </div>
    </section>
  );
};
