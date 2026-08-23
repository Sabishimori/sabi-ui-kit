import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, FolderTree, Sparkles, Home, Compass, Search, MessageSquare, User, Settings, ArrowRight } from 'lucide-react';
import { sounds } from '../../utils/audio';

const PRIMARY_NAV = [
  {
    name: 'Home',
    icon: Home,
    role: 'Root Entry & Overview',
    children: ['Landing Hero & Value Prop', 'Feature Overview Matrix', 'Live Interactive Sandbox', 'Client Testimonial Feed']
  },
  {
    name: 'Discover',
    icon: Compass,
    role: 'Catalog & Exploration',
    children: ['Explore Component Catalog', 'Curated Project Templates', 'Faceted Taxonomy Filter', 'Popular Releases']
  },
  {
    name: 'Search',
    icon: Search,
    role: 'Fast Telemetry & Query',
    children: ['Instant Keyword Search', 'Saved Filter Presets', 'Recent Audit History', 'Fuzzy Token Lookup']
  },
  {
    name: 'Messages',
    icon: MessageSquare,
    role: 'Team Collaboration',
    children: ['Comment Threads', 'System Webhook Alerts', 'Client Feedback Requests', 'Notification Rules']
  },
  {
    name: 'Profile',
    icon: User,
    role: 'Account & Permissions',
    children: ['My Active Projects', 'Created Custom Themes', 'Seat & License Manager', 'Exported Spec Logs']
  },
  {
    name: 'Settings',
    icon: Settings,
    role: 'System Administration',
    children: ['Account & Authentication', 'SAML/SSO Configuration', 'API Keys & Webhooks', 'Audit & Compliance Log']
  }
];

export const InformationArchitectureSection: React.FC = () => {
  const [activeNavIdx, setActiveNavIdx] = useState(0);
  const activeNav = PRIMARY_NAV[activeNavIdx];

  const handleSelectNav = (idx: number) => {
    sounds.playClick(500 + idx * 30);
    setActiveNavIdx(idx);
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F4F3F1] text-[#111111] border-b-2 border-[#0a0a0a] relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b-2 border-[#0a0a0a]/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="h-7 w-7 rounded-full bg-[#1a1a1a] text-white font-mono font-bold text-xs flex items-center justify-center">
              14
            </span>
            <span className="font-main font-bold uppercase tracking-wider text-xs text-[#111111]">
              INFORMATION ARCHITECTURE & SITEMAP TREE
            </span>
          </div>
          <span className="font-mono text-xs text-[#6b6b6b]">SABI OS V1.0 • HIERARCHICAL NAVIGATION</span>
        </div>

        <div className="mt-10 mb-8 max-w-3xl">
          <h2 className="text-3xl sm:text-5xl font-main tracking-tight leading-[1.1]">
            <span className="voral-headline-1">Hierarchical Sitemap Tree</span>
            <span className="voral-headline-2">for zero-depth cognitive navigation.</span>
          </h2>
          <p className="mt-3 text-base text-[#6b6b6b] leading-relaxed">
            Every screen and sub-view resides exactly where users expect it to be. Click any primary anchor below to inspect its child views and routing rules.
          </p>
        </div>

        {/* 6 Primary Navigation Anchors */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {PRIMARY_NAV.map((nav, idx) => {
            const isSelected = activeNavIdx === idx;
            const Icon = nav.icon;
            return (
              <button
                key={nav.name}
                onClick={() => handleSelectNav(idx)}
                className={`p-5 rounded-3xl text-left transition-all duration-200 flex flex-col justify-between h-36 border-2 ${
                  isSelected
                    ? 'bg-[#1a1a1a] text-white border-[#0a0a0a] shadow-xl scale-105 z-10'
                    : 'bg-white text-[#111111] border-[#0a0a0a]/10 hover:border-[#0a0a0a]/40 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-mono text-xs font-bold ${isSelected ? 'text-emerald-400' : 'text-[#8a8a8a]'}`}>
                    0{idx + 1}
                  </span>
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-main font-bold text-sm sm:text-base">
                    {nav.name}
                  </h4>
                  <span className={`text-[10px] block mt-0.5 truncate ${isSelected ? 'text-white/80' : 'text-[#6b6b6b]'}`}>
                    {nav.children.length} Sub-views
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Deep Dive Child Views Tree */}
        <motion.div
          key={activeNav.name}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-6 sm:p-10 rounded-3xl bg-white border-2 border-[#0a0a0a] shadow-xl space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#0a0a0a]/10 pb-6">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#6b6b6b]">
                PRIMARY NAVIGATION NODE
              </span>
              <h3 className="text-2xl sm:text-3xl font-main font-bold text-[#111111] mt-1">
                {activeNav.name} Node Structure
              </h3>
              <p className="text-xs text-[#6b6b6b] mt-0.5">
                {activeNav.role}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-full font-bold">
              <span>Max 2-Click Routing Depth</span>
            </div>
          </div>

          {/* Child Views Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {activeNav.children.map((child, i) => (
              <div
                key={child}
                className="p-5 rounded-2xl bg-[#F4F3F1] border border-[#0a0a0a]/10 space-y-2 hover:border-[#111111] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-[#111111] uppercase">
                    SUB-VIEW {i + 1}
                  </span>
                  <span className="text-[10px] font-mono text-[#8a8a8a] font-bold">L2</span>
                </div>
                <h5 className="font-main font-bold text-sm text-[#111111]">
                  {child}
                </h5>
                <p className="text-[11px] text-[#6b6b6b] leading-relaxed">
                  Direct navigation accessible via global nav and keyboard shortcut.
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
