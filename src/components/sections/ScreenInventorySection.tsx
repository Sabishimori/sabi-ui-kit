import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout, Monitor, Smartphone, Sparkles, CheckCircle2, Search, Bell, Bookmark, X, SlidersHorizontal, ArrowUpRight, Check, Eye, Edit3, MessageSquare, Star, Share2 } from 'lucide-react';
import { sounds } from '../../utils/audio';

const CATEGORIES = [
  {
    id: 'web',
    name: 'MARKETING WEBSITES',
    icon: Layout,
    count: '8 – 15 Frames',
    screens: [
      { name: '01. Landing Hero Page', spec: 'Conversion funnel & visual proof' },
      { name: '02. Feature Directory', spec: 'Interactive bento grid breakdown' },
      { name: '03. Pricing & Tier Matrix', spec: 'Annual/Monthly discount toggles' },
      { name: '04. Case Study & Storytelling', spec: 'Customer metrics & ROI quotes' },
      { name: '05. Documentation & Blog', spec: 'Clean markdown readability' },
      { name: '06. Legal & Privacy Terms', spec: 'Compliance & security badges' },
    ]
  },
  {
    id: 'saas',
    name: 'SAAS & DESKTOP APPS',
    icon: Monitor,
    count: '20 – 30 Frames',
    screens: [
      { name: '01. Executive Dashboard', spec: 'Realtime telemetry & charts' },
      { name: '02. High-Density Data Tables', spec: 'Sortable, filterable 100k rows' },
      { name: '03. Multi-Tenant Permissions', spec: 'RBAC role & seat assignment' },
      { name: '04. Workspace & Billing Settings', spec: 'Stripe customer portal sync' },
      { name: '05. Audit Trail & Security Logs', spec: 'Immutable SOC2 event history' },
      { name: '06. Integration Marketplace', spec: 'API keys & Slack/GitHub connectors' },
    ]
  },
  {
    id: 'mobile',
    name: 'MOBILE APPS (iOS / Android)',
    icon: Smartphone,
    count: '15 – 25 Frames',
    screens: [
      { name: '01. Luxury Spend & Commerce', spec: 'Layered cards stack & transaction telemetry' },
      { name: '02. Editorial Moodboard Feed', spec: 'Masonry visual discovery with Feed/Dept pills' },
      { name: '03. Eco-Score & Social Bento', spec: 'Eco metrics, social apps grid & product listings' },
      { name: '04. 3-Step Onboarding', spec: 'Biometric FaceID / Apple sign-in' },
      { name: '05. Offline Cache & Sync', spec: 'Local SQLite state persistence' },
      { name: '06. Push Notification Center', spec: 'Smart lockscreen rich alerts' },
    ]
  }
];

export const ScreenInventorySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(2); // default to Mobile Apps to show the 3-screen luxury mockup
  const [activeFeedTab, setActiveFeedTab] = useState<'Feed' | 'Department'>('Feed');
  const activeCategory = CATEGORIES[activeTab];

  const handleSelectTab = (idx: number) => {
    sounds.playClick();
    setActiveTab(idx);
  };

  return (
    <section id="inventory" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F4F3F1] text-[#111111] border-b-2 border-[#0a0a0a] relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b-2 border-[#0a0a0a]/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="h-7 w-7 rounded-full bg-[#1a1a1a] text-white font-mono font-bold text-xs flex items-center justify-center">
              15
            </span>
            <span className="font-main font-bold uppercase tracking-wider text-xs text-[#111111]">
              SCREEN INVENTORY & MOBILE ECOSYSTEM
            </span>
          </div>
          <span className="font-mono text-xs text-[#6b6b6b]">SABI OS V1.0 • PRODUCTION SPECS</span>
        </div>

        <div className="mt-10 mb-8 max-w-3xl">
          <h2 className="text-3xl sm:text-5xl font-main tracking-tight leading-[1.1]">
            <span className="voral-headline-1">Standard Screen Inventories</span>
            <span className="voral-headline-2">and Luxury Mobile App Studio.</span>
          </h2>
          <p className="mt-3 text-base text-[#6b6b6b] leading-relaxed">
            From high-end editorial commerce to enterprise dashboards, every digital screen is mathematically organized and edge-state verified.
          </p>
        </div>

        {/* 3 Archetype Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          {CATEGORIES.map((cat, idx) => {
            const isSelected = activeTab === idx;
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => handleSelectTab(idx)}
                className={`p-5 rounded-3xl text-left transition-all duration-200 flex flex-col justify-between h-32 border-2 ${
                  isSelected
                    ? 'bg-[#1a1a1a] text-white border-[#0a0a0a] shadow-xl scale-105 z-10'
                    : 'bg-white text-[#111111] border-[#0a0a0a]/10 hover:border-[#0a0a0a]/40 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Icon className="h-5 w-5" />
                  <span className={`font-mono text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-[#F4F3F1] text-[#111111]'
                  }`}>
                    {cat.count}
                  </span>
                </div>
                <div>
                  <h4 className="font-main font-bold text-base">
                    {cat.name}
                  </h4>
                </div>
              </button>
            );
          })}
        </div>

        {/* 3-Screen Luxury Mobile Showcase Mockup (Charles Mobile Ecosystem) */}
        {activeTab === 2 && (
          <div className="mb-12 p-6 sm:p-10 rounded-3xl bg-[#ECEAE6] border-2 border-[#0a0a0a] shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#0a0a0a]/10 pb-4">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#6b6b6b]">
                  LIVE HI-FI MOBILE SHOWCASE
                </span>
                <h3 className="text-2xl font-main font-bold text-[#111111] mt-0.5">
                  Charles Editorial Mobile Ecosystem (3-Screen Flow)
                </h3>
              </div>
              <span className="text-xs font-mono text-emerald-800 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-full font-bold">
                100% Production Ready
              </span>
            </div>

            {/* 3 Phone Frames Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start justify-center">
              
              {/* Phone 1: Luxury Commerce & Spend Terminal */}
              <div className="bg-[#F4F3F1] rounded-[36px] p-4 border-2 border-[#0a0a0a] shadow-2xl space-y-3.5 max-w-sm mx-auto w-full">
                {/* Header */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-[#111111] text-white flex items-center justify-center font-bold text-xs">
                      C
                    </div>
                    <span className="font-main font-bold text-xs text-[#111111]">Charles</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#111111]">
                    <Search className="h-4 w-4" />
                    <div className="relative">
                      <Bell className="h-4 w-4" />
                      <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-rose-500" />
                    </div>
                  </div>
                </div>

                {/* Pill Controls */}
                <div className="flex items-center justify-center gap-2 pt-1">
                  <div className="h-7 w-7 rounded-full bg-white border border-[#0a0a0a]/10 flex items-center justify-center text-[#111111] shadow-sm">
                    <Bookmark className="h-3.5 w-3.5" />
                  </div>
                  <div className="h-7 w-7 rounded-full bg-white border border-[#0a0a0a]/10 flex items-center justify-center text-[#111111] shadow-sm">
                    <X className="h-3.5 w-3.5" />
                  </div>
                  <div className="h-7 w-7 rounded-full bg-white border border-[#0a0a0a]/10 flex items-center justify-center text-[#111111] shadow-sm">
                    <SlidersHorizontal className="h-3.5 w-3.5" />
                  </div>
                </div>

                {/* Hero Layered Card Stack */}
                <div className="relative pt-2">
                  <div className="w-[85%] h-2 bg-white/60 mx-auto rounded-t-xl" />
                  <div className="w-[92%] h-2 bg-white/80 mx-auto rounded-t-xl" />
                  <div className="rounded-3xl overflow-hidden relative shadow-lg h-44 bg-[#111111]">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80"
                      alt="Model in blue cardigan"
                      className="w-full h-full object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-3.5 text-white">
                      <div className="flex items-end justify-between">
                        <div>
                          <h5 className="font-main font-bold text-xs">Black cotton hoodie</h5>
                          <span className="text-[10px] font-mono text-white/70">fearofgod.com</span>
                        </div>
                        <button className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-bold text-white border border-white/30">
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2 Transaction Mini Metrics */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 rounded-2xl bg-white border border-[#0a0a0a]/10 shadow-sm space-y-1">
                    <span className="text-[9px] font-mono text-[#8a8a8a] uppercase block font-bold">Last transaction</span>
                    <span className="text-xs font-main font-bold text-[#111111] block">17,255 USD</span>
                    <span className="text-[9px] text-[#6b6b6b] block truncate">Montreal, CA</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-white border border-[#0a0a0a]/10 shadow-sm space-y-1">
                    <span className="text-[9px] font-mono text-[#8a8a8a] uppercase block font-bold">Increase rate</span>
                    <span className="text-xs font-main font-bold text-emerald-700 block">+57.05%</span>
                    <span className="text-[9px] text-[#6b6b6b] block">this month</span>
                  </div>
                </div>

                {/* Active Listing Row */}
                <div className="p-3 rounded-2xl bg-white border border-[#0a0a0a]/10 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center text-[10px] font-bold text-indigo-700">
                      18%
                    </div>
                    <div>
                      <span className="font-main font-bold text-[11px] text-[#111111] block">White cotton T-shirt</span>
                      <span className="text-[9px] text-[#6b6b6b]">Selling now 02:30 PM</span>
                    </div>
                  </div>
                  <button className="px-3 py-1 rounded-full bg-[#F4F3F1] border border-[#0a0a0a]/10 text-[10px] font-bold text-[#111111]">
                    Edit
                  </button>
                </div>

                {/* Bottom Floating Chat Bar */}
                <div className="p-2 rounded-full bg-white border border-[#0a0a0a]/15 shadow-md flex items-center justify-between text-xs px-4">
                  <span className="text-[#8a8a8a] text-[11px]">Start chatting</span>
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-3.5 w-3.5 text-[#111111]" />
                    <SlidersHorizontal className="h-3.5 w-3.5 text-[#6b6b6b]" />
                  </div>
                </div>
              </div>

              {/* Phone 2: High-Fashion Moodboard & Masonry Feed */}
              <div className="bg-[#F4F3F1] rounded-[36px] p-4 border-2 border-[#0a0a0a] shadow-2xl space-y-3.5 max-w-sm mx-auto w-full">
                {/* Header */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-[#111111] text-white flex items-center justify-center font-bold text-xs">
                      C
                    </div>
                    <span className="font-main font-bold text-xs text-[#111111]">Charles</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#111111]">
                    <Search className="h-4 w-4" />
                    <div className="relative">
                      <Bell className="h-4 w-4" />
                      <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-rose-500" />
                    </div>
                  </div>
                </div>

                {/* Feed / Department Tab Toggle */}
                <div className="p-1 rounded-full bg-white border border-[#0a0a0a]/10 flex gap-1 shadow-sm">
                  <button
                    onClick={() => setActiveFeedTab('Feed')}
                    className={`flex-1 py-1 rounded-full text-xs font-main font-bold transition-all ${
                      activeFeedTab === 'Feed' ? 'bg-[#1a1a1a] text-white shadow-sm' : 'text-[#6b6b6b]'
                    }`}
                  >
                    Feed
                  </button>
                  <button
                    onClick={() => setActiveFeedTab('Department')}
                    className={`flex-1 py-1 rounded-full text-xs font-main font-bold transition-all ${
                      activeFeedTab === 'Department' ? 'bg-[#1a1a1a] text-white shadow-sm' : 'text-[#6b6b6b]'
                    }`}
                  >
                    Department
                  </button>
                </div>

                {/* 2x2 Masonry Editorial Fashion Grid */}
                <div className="grid grid-cols-2 gap-2 h-72">
                  <div className="rounded-2xl overflow-hidden bg-[#222222] shadow-sm relative group h-32">
                    <img
                      src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&auto=format&fit=crop&q=80"
                      alt="Fashion veil"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="rounded-2xl overflow-hidden bg-[#111111] shadow-sm relative group row-span-2 h-72">
                    <img
                      src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=300&auto=format&fit=crop&q=80"
                      alt="Editorial streetwear"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="rounded-2xl overflow-hidden bg-[#333333] shadow-sm relative group h-36">
                    <img
                      src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=300&auto=format&fit=crop&q=80"
                      alt="Sculptural knitwear"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Bottom Floating Chat Bar */}
                <div className="p-2 rounded-full bg-white border border-[#0a0a0a]/15 shadow-md flex items-center justify-between text-xs px-4">
                  <span className="text-[#8a8a8a] text-[11px]">Start chatting</span>
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-3.5 w-3.5 text-[#111111]" />
                    <SlidersHorizontal className="h-3.5 w-3.5 text-[#6b6b6b]" />
                  </div>
                </div>
              </div>

              {/* Phone 3: Eco-Score, Social Apps Grid & Product Inventory */}
              <div className="bg-[#F4F3F1] rounded-[36px] p-4 border-2 border-[#0a0a0a] shadow-2xl space-y-3.5 max-w-sm mx-auto w-full">
                {/* Header */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-[#111111] text-white flex items-center justify-center font-bold text-xs">
                      C
                    </div>
                    <span className="font-main font-bold text-xs text-[#111111]">Charles</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#111111]">
                    <Search className="h-4 w-4" />
                    <div className="relative">
                      <Bell className="h-4 w-4" />
                      <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-rose-500" />
                    </div>
                  </div>
                </div>

                {/* Top Row: Eco-Score Card + Social App Grid */}
                <div className="grid grid-cols-2 gap-2">
                  {/* Eco-Score */}
                  <div className="p-3 rounded-2xl bg-white border border-[#0a0a0a]/10 shadow-sm flex flex-col justify-between h-28">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-main font-bold text-xs text-[#111111]">Eco-score</span>
                        <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                      </div>
                      <span className="text-[10px] text-[#6b6b6b] mt-1 block">
                        2,053 Comp. 28/01
                      </span>
                      <span className="text-[9px] text-[#8a8a8a]">15:18 PM</span>
                    </div>

                    <div className="h-6 w-6 rounded-full bg-[#F4F3F1] border border-[#0a0a0a]/10 flex items-center justify-center text-[#111111]">
                      <Bookmark className="h-3 w-3" />
                    </div>
                  </div>

                  {/* Bento Social App Icon Grid */}
                  <div className="p-2.5 rounded-2xl bg-white border border-[#0a0a0a]/10 shadow-sm grid grid-cols-4 gap-1.5 items-center justify-center h-28">
                    <div className="h-6 w-6 rounded-full bg-black text-white flex items-center justify-center text-[9px] font-bold">♪</div>
                    <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center text-[9px] font-bold">📷</div>
                    <div className="h-6 w-6 rounded-full bg-black text-white flex items-center justify-center text-[9px] font-bold">⌥</div>
                    <div className="h-6 w-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[9px] font-bold">in</div>
                    <div className="h-6 w-6 rounded-full bg-red-600 text-white flex items-center justify-center text-[9px] font-bold">▶</div>
                    <div className="h-6 w-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px] font-bold">≋</div>
                    <div className="h-6 w-6 rounded-full bg-black text-white flex items-center justify-center text-[9px] font-bold">**</div>
                    <div className="h-6 w-6 rounded-full bg-[#F4F3F1] text-black border border-black/20 flex items-center justify-center text-[9px] font-bold">+</div>
                  </div>
                </div>

                {/* Product Listing Table */}
                <div className="p-3 rounded-2xl bg-white border border-[#0a0a0a]/10 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-xs font-main font-bold text-[#111111]">
                    <span>Product listing</span>
                    <span className="text-[#8a8a8a] text-[10px]">&rarr;</span>
                  </div>

                  <div className="space-y-1.5 divide-y divide-[#0a0a0a]/5">
                    <div className="pt-1 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="h-5 w-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[8px] font-bold">●</div>
                        <div>
                          <span className="text-[10px] font-bold text-[#111111] block">White cotton T-shirt</span>
                          <span className="text-[8px] text-[#6b6b6b]">Selling now 02:30 PM</span>
                        </div>
                      </div>
                      <button className="px-2.5 py-0.5 rounded-full bg-[#F4F3F1] border border-[#0a0a0a]/10 text-[9px] font-bold text-[#111111]">Edit</button>
                    </div>

                    <div className="pt-1.5 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="h-5 w-5 rounded-full bg-slate-200 text-slate-800 flex items-center justify-center text-[8px] font-bold">●</div>
                        <div>
                          <span className="text-[10px] font-bold text-[#111111] block">Slate grey hoodie</span>
                          <span className="text-[8px] text-[#6b6b6b]">Sample received 15/02</span>
                        </div>
                      </div>
                      <button className="px-2.5 py-0.5 rounded-full bg-[#F4F3F1] border border-[#0a0a0a]/10 text-[9px] font-bold text-[#111111]">View</button>
                    </div>

                    <div className="pt-1.5 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="h-5 w-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-[8px] font-bold">●</div>
                        <div>
                          <span className="text-[10px] font-bold text-[#111111] block">Yellow hoodie</span>
                          <span className="text-[8px] text-[#6b6b6b]">Completed 28/01</span>
                        </div>
                      </div>
                      <button className="px-2.5 py-0.5 rounded-full bg-[#F4F3F1] border border-[#0a0a0a]/10 text-[9px] font-bold text-[#111111]">View</button>
                    </div>
                  </div>
                </div>

                {/* Bottom Floating Chat Bar */}
                <div className="p-2 rounded-full bg-white border border-[#0a0a0a]/15 shadow-md flex items-center justify-between text-xs px-4">
                  <span className="text-[#8a8a8a] text-[11px]">Start chatting</span>
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-3.5 w-3.5 text-[#111111]" />
                    <SlidersHorizontal className="h-3.5 w-3.5 text-[#6b6b6b]" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Screen Inventory Grid */}
        <motion.div
          key={activeCategory.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#0a0a0a] shadow-xl space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#0a0a0a]/10 pb-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#6b6b6b]">
                SCREEN INVENTORY CHECKLIST
              </span>
              <h3 className="text-2xl font-main font-bold text-[#111111] mt-1">
                {activeCategory.name} Specification
              </h3>
            </div>
            <span className="text-xs font-mono text-emerald-800 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-full font-bold">
              {activeCategory.screens.length} Standard Core Screens
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeCategory.screens.map((scr) => (
              <div
                key={scr.name}
                className="p-5 rounded-2xl bg-[#F4F3F1] border border-[#0a0a0a]/10 space-y-1.5 hover:border-[#111111] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-main font-bold text-sm text-[#111111]">
                    {scr.name}
                  </span>
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                </div>
                <p className="text-xs text-[#6b6b6b] leading-relaxed">
                  {scr.spec}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
