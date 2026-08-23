import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, TrendingUp, Users, RefreshCw, Sparkles, ArrowRight, ShieldCheck, ShoppingCart, GitBranch } from 'lucide-react';
import { sounds } from '../../utils/audio';

interface ModelPipeline {
  id: string;
  num: string;
  name: string;
  tagline: string;
  revenueStreams: string;
  acquisitionModel: string;
  retentionTriggers: string;
  conversionMetrics: string;
  pipelineStages: {
    stage: string;
    action: string;
    uiGate: string;
  }[];
}

const MODELS_DATA: ModelPipeline[] = [
  {
    id: 'b2b',
    num: '01',
    name: 'B2B Enterprise Pipeline',
    tagline: 'Annual Contracts, Seat Licenses & Security Audits',
    revenueStreams: 'Annual contract value (ACV $20k-$250k+), platform base fee, seat expansion licenses, dedicated SLA support.',
    acquisitionModel: 'Account-based marketing (ABM), outbound SDRs, executive demo requests, partner system integrations.',
    retentionTriggers: 'SSO auto-provisioning, quarterly business review dashboards, compliance logs, enterprise Slack webhooks.',
    conversionMetrics: 'Demo-to-POC conversion rate (>40%), security review clearance speed, procurement checkout sign-off.',
    pipelineStages: [
      { stage: '1. Inbound / Outbound', action: 'Lead views whitepaper or demo', uiGate: 'Lead Capture Form' },
      { stage: '2. Product Discovery', action: 'Live executive demo with sales engineer', uiGate: 'Custom Sandbox' },
      { stage: '3. Security & Legal', action: 'SOC2 & HIPAA vendor questionnaire', uiGate: 'Security Audit Portal' },
      { stage: '4. Contract Execution', action: 'Annual MSA signed with seat limits', uiGate: 'DocuSign / Stripe Invoicing' },
      { stage: '5. Team Provisioning', action: 'IT admin configures SAML/SSO seats', uiGate: 'Admin User Matrix' },
      { stage: '6. Annual Expansion', action: 'Department adds 50+ new licenses', uiGate: 'One-Click Upgrade Gate' },
    ]
  },
  {
    id: 'b2c',
    num: '02',
    name: 'B2C Consumer Pipeline',
    tagline: 'Frictionless In-App Purchases & Viral Growth Loops',
    revenueStreams: 'Micro-transactions ($0.99-$19.99), in-app consumable credits, premium feature un-locks, ad monetization.',
    acquisitionModel: 'TikTok / Instagram paid ads, organic App Store SEO (ASO), viral share links, influencer referral codes.',
    retentionTriggers: 'Daily streak rewards, push notification nudges, personalized recommendation feed, badge milestones.',
    conversionMetrics: 'Install-to-signup (>70%), Day-1 retention (>45%), first purchase conversion rate (>5%).',
    pipelineStages: [
      { stage: '1. Impression / Ad', action: 'User taps 15-second viral video ad', uiGate: 'Deep-Linked App Screen' },
      { stage: '2. 3-Second Onboarding', action: 'Sign in with Apple / Google in 1 tap', uiGate: 'Biometric Auth Modal' },
      { stage: '3. Instant Core Value', action: 'Completes first fun creative action in app', uiGate: 'Interactive Canvas' },
      { stage: '4. Soft Paywall', action: 'Prompted to unlock unlimited HD filters', uiGate: 'Apple Pay / Google Pay' },
      { stage: '5. Social Sharing', action: 'Shares result to friends with watermark', uiGate: 'Native Share Sheet' },
      { stage: '6. Re-Engagement', action: 'Push notification: "Your streak is alive!"', uiGate: 'Smart Lockscreen Nudge' },
    ]
  },
  {
    id: 'marketplace',
    num: '03',
    name: 'Two-Sided Marketplace Pipeline',
    tagline: 'Buyer & Seller Matchmaking with Escrow Protection',
    revenueStreams: 'Take rate on gross merchandise value (GMV 8%-20%), buyer transaction processing fee, seller listing boosts.',
    acquisitionModel: 'Supply-side creator recruitment campaigns, demand-side SEO landing pages, buyer cashback referrals.',
    retentionTriggers: 'Instant payout notification for sellers, price-drop alerts for buyers, saved search notifications.',
    conversionMetrics: 'Search-to-cart rate (>6%), seller order acceptance rate (>98%), escrow release speed.',
    pipelineStages: [
      { stage: '1. Seller Onboarding', action: 'Creator uploads portfolio & bank details', uiGate: 'KYC & Stripe Connect' },
      { stage: '2. Catalog Indexing', action: 'Product approved and listed in search engine', uiGate: 'Automated AI Moderation' },
      { stage: '3. Buyer Discovery', action: 'Buyer searches keyword and compares reviews', uiGate: 'Faceted Filter Grid' },
      { stage: '4. Escrow Checkout', action: 'Funds locked securely until order delivered', uiGate: 'Stripe Escrow Checkout' },
      { stage: '5. Order Fulfillment', action: 'Seller ships item / delivers digital download', uiGate: 'Tracking & DL Gate' },
      { stage: '6. Automated Payout', action: 'System takes 12% fee and pays seller instantly', uiGate: 'Seller Earnings Dashboard' },
    ]
  },
  {
    id: 'subscription',
    num: '04',
    name: 'Subscription SaaS Pipeline',
    tagline: 'Recurring Monthly/Annual Billing & Tier Upgrades',
    revenueStreams: 'Recurring monthly ($29/mo) and annual ($290/yr) subscription tiers, add-on usage storage buckets.',
    acquisitionModel: 'Product-led growth (PLG), interactive self-serve onboarding, SEO documentation, template directory.',
    retentionTriggers: 'Automated weekly digest emails, team collaboration alerts, integration sync notifications.',
    conversionMetrics: 'Trial-to-paid conversion (>12%), net revenue churn (<0.8%/mo), annual billing discount uptake.',
    pipelineStages: [
      { stage: '1. Self-Serve Signup', action: 'Starts 14-day free trial without credit card', uiGate: 'Quick Auth Form' },
      { stage: '2. Template Setup', action: 'Selects pre-configured Sabi workspace template', uiGate: 'Workspace Wizard' },
      { stage: '3. Team Invitation', action: 'Invites 3 colleagues to edit in real time', uiGate: 'Invite Modal' },
      { stage: '4. Usage Cap Trigger', action: 'Hits free limit (e.g. 5 active projects)', uiGate: 'Upgrade Modal Banner' },
      { stage: '5. Card Checkout', action: 'Enters corporate credit card for Pro tier', uiGate: 'Stripe Billing Portal' },
      { stage: '6. Auto-Renewal', action: 'Automated monthly charge with invoice PDF', uiGate: 'Billing History Tab' },
    ]
  }
];

export const BusinessModelSection: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<ModelPipeline>(MODELS_DATA[0]);

  const handleSelect = (m: ModelPipeline) => {
    sounds.playClick();
    setSelectedModel(m);
  };

  return (
    <section id="business-model" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F4F3F1] text-[#111111] border-b-2 border-[#0a0a0a] relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b-2 border-[#0a0a0a]/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="h-7 w-7 rounded-full bg-[#1a1a1a] text-white font-mono font-bold text-xs flex items-center justify-center">
              05
            </span>
            <span className="font-main font-bold uppercase tracking-wider text-xs text-[#111111]">
              BUSINESS MODEL & VALUE PIPELINES
            </span>
          </div>
          <span className="font-mono text-xs text-[#6b6b6b]">SABI OS V1.0 • MONETIZATION FLOWS</span>
        </div>

        <div className="mt-10 mb-8 max-w-3xl">
          <h2 className="text-3xl sm:text-5xl font-main tracking-tight leading-[1.1]">
            <span className="voral-headline-1">End-to-End Pipelines</span>
            <span className="voral-headline-2">for B2B, B2C & Marketplaces.</span>
          </h2>
          <p className="mt-3 text-base text-[#6b6b6b] leading-relaxed">
            Select a monetization archetype to view the step-by-step pipeline from first user acquisition through conversion gates to lifetime retention.
          </p>
        </div>

        {/* 4 Models Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {MODELS_DATA.map((m) => {
            const isSelected = selectedModel.id === m.id;
            return (
              <button
                key={m.id}
                onClick={() => handleSelect(m)}
                className={`p-5 rounded-3xl text-left transition-all duration-200 flex flex-col justify-between h-32 border-2 ${
                  isSelected
                    ? 'bg-[#1a1a1a] text-white border-[#0a0a0a] shadow-xl scale-105'
                    : 'bg-white text-[#111111] border-[#0a0a0a]/10 hover:border-[#0a0a0a]/40 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-mono text-xs font-bold ${isSelected ? 'text-emerald-400' : 'text-[#8a8a8a]'}`}>
                    {m.num}
                  </span>
                  <GitBranch className="h-4 w-4 opacity-70" />
                </div>
                <div>
                  <h3 className="font-main font-bold text-sm sm:text-base leading-tight">
                    {m.name}
                  </h3>
                  <p className={`text-[11px] mt-1 line-clamp-1 ${isSelected ? 'text-white/80' : 'text-[#6b6b6b]'}`}>
                    {m.tagline}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Model Pipeline Swimlane Visualizer */}
        <motion.div
          key={selectedModel.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-6 sm:p-10 rounded-3xl bg-white border-2 border-[#0a0a0a] shadow-xl space-y-8"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#0a0a0a]/10 pb-6">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#6b6b6b]">
                ACTIVE BUSINESS PIPELINE ARCHITECTURE
              </span>
              <h3 className="text-2xl sm:text-3xl font-main font-bold text-[#111111] mt-1">
                {selectedModel.name}
              </h3>
            </div>
            <span className="text-xs font-mono text-emerald-800 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-full font-bold">
              6-Stage Pipeline Mapped
            </span>
          </div>

          {/* 6 Stage Pipeline Swimlane */}
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#6b6b6b] block mb-4">
              STAGE-BY-STAGE CUSTOMER CONVERSION FLOW
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
              {selectedModel.pipelineStages.map((st) => (
                <div
                  key={st.stage}
                  className="p-4 rounded-2xl bg-[#F4F3F1] border border-[#0a0a0a]/10 flex flex-col justify-between h-44"
                >
                  <div>
                    <span className="font-mono text-[10px] text-[#111111] font-bold uppercase block">
                      {st.stage}
                    </span>
                    <p className="text-xs text-[#111111] font-medium mt-1.5 leading-snug">
                      {st.action}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-[#0a0a0a]/10">
                    <span className="text-[9px] font-mono text-[#8a8a8a] uppercase block">UI GATE</span>
                    <span className="text-[11px] font-mono text-[#111111] font-bold block truncate">
                      {st.uiGate}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4 Deep Dive Drivers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-[#0a0a0a]/10">
            <div className="p-4 rounded-2xl bg-[#F4F3F1] border border-[#0a0a0a]/5 space-y-1.5">
              <span className="text-[10px] font-mono font-bold text-[#111111] uppercase tracking-wider block">
                REVENUE STREAMS
              </span>
              <p className="text-xs text-[#6b6b6b] leading-relaxed">
                {selectedModel.revenueStreams}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F4F3F1] border border-[#0a0a0a]/5 space-y-1.5">
              <span className="text-[10px] font-mono font-bold text-[#111111] uppercase tracking-wider block">
                ACQUISITION MODEL
              </span>
              <p className="text-xs text-[#6b6b6b] leading-relaxed">
                {selectedModel.acquisitionModel}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F4F3F1] border border-[#0a0a0a]/5 space-y-1.5">
              <span className="text-[10px] font-mono font-bold text-[#111111] uppercase tracking-wider block">
                RETENTION TRIGGERS
              </span>
              <p className="text-xs text-[#6b6b6b] leading-relaxed">
                {selectedModel.retentionTriggers}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F4F3F1] border border-[#0a0a0a]/5 space-y-1.5">
              <span className="text-[10px] font-mono font-bold text-[#111111] uppercase tracking-wider block">
                CONVERSION METRICS
              </span>
              <p className="text-xs text-[#6b6b6b] leading-relaxed">
                {selectedModel.conversionMetrics}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
