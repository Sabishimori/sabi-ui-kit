import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Sparkles, UserPlus, ShoppingBag, Calendar, GitBranch } from 'lucide-react';
import { sounds } from '../../utils/audio';

const FLOWS = [
  {
    id: 'signup',
    name: 'ONBOARDING & SIGN UP FLOW',
    icon: UserPlus,
    tagline: 'Frictionless Account Creation & Immediate Value Delivery',
    steps: [
      { type: 'ENTRY', label: 'Landing Hero CTA', desc: 'User clicks "Get Started" or social auth' },
      { type: 'ACTION', label: 'Credentials Input', desc: 'Email/Password with instant validation' },
      { type: 'DECISION', label: 'OTP Verification', desc: '6-digit SMS or Magic Link check' },
      { type: 'ACTION', label: 'Workspace Setup', desc: 'Picks team size, domain & theme' },
      { type: 'SUCCESS', label: 'Dashboard Reveal', desc: 'Guided interactive feature tour' },
    ]
  },
  {
    id: 'purchase',
    name: 'E-COMMERCE & CHECKOUT FLOW',
    icon: ShoppingBag,
    tagline: '1-Click Stripe Checkout & Digital Token Delivery',
    steps: [
      { type: 'ENTRY', label: 'Product Detail View', desc: 'User reviews pricing tier & specs' },
      { type: 'ACTION', label: 'Cart Allocation', desc: 'Selects seat quantity and add-ons' },
      { type: 'DECISION', label: 'Promo Code Gate', desc: 'Checks coupon or volume discount' },
      { type: 'ACTION', label: 'Stripe Pay Gate', desc: 'Apple Pay / Card with 3D Secure' },
      { type: 'SUCCESS', label: 'License Provisioned', desc: 'Instant receipt & download link' },
    ]
  },
  {
    id: 'booking',
    name: 'SCHEDULING & BOOKING FLOW',
    icon: Calendar,
    tagline: 'Automated Calendar Sync & Appointment Confirmation',
    steps: [
      { type: 'ENTRY', label: 'Calendar Modal', desc: 'User opens appointment selector' },
      { type: 'ACTION', label: 'Date & Time Selection', desc: 'Auto-detects user timezone & slots' },
      { type: 'DECISION', label: 'Slot Conflict Check', desc: 'Realtime Google/Outlook calendar sync' },
      { type: 'ACTION', label: 'Host Details Form', desc: 'Collects meeting notes & agenda' },
      { type: 'SUCCESS', label: 'Meeting Scheduled', desc: 'Calendar invite & Google Meet link sent' },
    ]
  }
];

export const UserFlowsSection: React.FC = () => {
  const [activeFlowId, setActiveFlowId] = useState(FLOWS[0].id);
  const activeFlow = FLOWS.find((f) => f.id === activeFlowId) || FLOWS[0];

  const handleSelectFlow = (id: string) => {
    sounds.playClick();
    setActiveFlowId(id);
  };

  return (
    <section id="architecture" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F4F3F1] text-[#111111] border-b-2 border-[#0a0a0a] relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b-2 border-[#0a0a0a]/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="h-7 w-7 rounded-full bg-[#1a1a1a] text-white font-mono font-bold text-xs flex items-center justify-center">
              13
            </span>
            <span className="font-main font-bold uppercase tracking-wider text-xs text-[#111111]">
              CORE USER FLOWS & DECISION LOGIC
            </span>
          </div>
          <span className="font-mono text-xs text-[#6b6b6b]">SABI OS V1.0 • FLOW ARCHITECTURE</span>
        </div>

        <div className="mt-10 mb-8 max-w-3xl">
          <h2 className="text-3xl sm:text-5xl font-main tracking-tight leading-[1.1]">
            <span className="voral-headline-1">Decision Trees & Paths</span>
            <span className="voral-headline-2">for onboarding, checkout & booking.</span>
          </h2>
          <p className="mt-3 text-base text-[#6b6b6b] leading-relaxed">
            Every pathway accounts for happy paths, edge cases, error fallbacks, and success checkpoints. Select a flow below to inspect its node structure.
          </p>
        </div>

        {/* Flow Selector Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {FLOWS.map((f) => {
            const isSelected = f.id === activeFlowId;
            const Icon = f.icon;
            return (
              <button
                key={f.id}
                onClick={() => handleSelectFlow(f.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-main font-bold transition-all flex items-center gap-2 border-2 ${
                  isSelected
                    ? 'bg-[#1a1a1a] text-white border-[#0a0a0a] shadow-lg scale-105'
                    : 'bg-white text-[#111111] border-[#0a0a0a]/10 hover:bg-[#ECEAE6]'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{f.name}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Flow Nodes Visualizer */}
        <motion.div
          key={activeFlow.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#0a0a0a] shadow-xl space-y-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#0a0a0a]/10 pb-6">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#6b6b6b]">
                ACTIVE LOGIC SPECIFICATION
              </span>
              <h3 className="text-2xl font-main font-bold text-[#111111] mt-1">
                {activeFlow.name}
              </h3>
              <p className="text-xs text-[#6b6b6b] mt-0.5">
                {activeFlow.tagline}
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-800 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-full font-bold">
              {activeFlow.steps.length} Sequential Decision Nodes
            </span>
          </div>

          {/* Steps Swimlane */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {activeFlow.steps.map((st, idx) => (
              <div
                key={st.label}
                className="p-5 rounded-2xl bg-[#F4F3F1] border border-[#0a0a0a]/10 flex flex-col justify-between h-44 relative group hover:border-[#111111] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold text-[#111111] uppercase px-2 py-0.5 rounded-full bg-white border border-[#0a0a0a]/10">
                      {st.type}
                    </span>
                    <span className="font-mono text-xs font-bold text-[#8a8a8a]">0{idx + 1}</span>
                  </div>

                  <h4 className="font-main font-bold text-sm text-[#111111]">
                    {st.label}
                  </h4>
                  <p className="text-xs text-[#6b6b6b] mt-1 leading-snug">
                    {st.desc}
                  </p>
                </div>

                <div className="text-[10px] font-mono text-emerald-700 font-bold">
                  {idx < activeFlow.steps.length - 1 ? '→ Proceeds to Next' : '★ Goal Completed'}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
