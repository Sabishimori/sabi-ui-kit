import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Trophy, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';

interface ClosingSectionProps {}

export const ClosingSection: React.FC<ClosingSectionProps> = () => {
  return (
    <section className="py-20 px-4 sm:px-8 lg:px-12 bg-white rounded-3xl border border-[#0a0a0a]/10 shadow-sm relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4F3F1] border border-[#0a0a0a]/10 text-xs font-mono font-bold text-[#111111]">
          <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          <span>PRODUCTION DESIGN OS V1.0 &bull; CERTIFIED</span>
        </div>

        <div className="space-y-4">
          <h2 className="text-4xl sm:text-6xl font-main font-black tracking-tight text-[#111111] leading-none">
            End-to-End Product Lifecycle Complete.
          </h2>

          <p className="text-base sm:text-lg text-[#555555] max-w-2xl mx-auto leading-relaxed">
            All 8 subdivisions and 28 production stages have been modeled, tokenized, and calibrated for zero-ambiguity design engineering and developer handoff.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[#0a0a0a]/10">
          <div className="p-4 rounded-2xl bg-[#F4F3F1] border border-[#0a0a0a]/10 space-y-1">
            <span className="font-mono text-xs text-[#666666] font-bold uppercase">WCAG COMPLIANCE</span>
            <div className="font-main font-bold text-lg text-[#111111]">AAA Grade Certified</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#F4F3F1] border border-[#0a0a0a]/10 space-y-1">
            <span className="font-mono text-xs text-[#666666] font-bold uppercase">SPATIAL SCALE</span>
            <div className="font-main font-bold text-lg text-[#111111]">8pt Sub-Pixel Crisp</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#F4F3F1] border border-[#0a0a0a]/10 space-y-1">
            <span className="font-mono text-xs text-[#666666] font-bold uppercase">CODE HANDOFF</span>
            <div className="font-main font-bold text-lg text-[#111111]">Zero-Ambiguity Specs</div>
          </div>
        </div>
      </div>
    </section>
  );
};
