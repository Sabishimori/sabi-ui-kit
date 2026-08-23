import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, AlertCircle, ArrowUpRight, Sparkles, Search, Globe, RefreshCw, Zap, TrendingUp } from 'lucide-react';
import { sounds } from '../../utils/audio';

interface CompetitorProfile {
  name: string;
  domain: string;
  category: string;
  marketLeader: boolean;
  strength: string;
  weakness: string;
  uxQualityScore: number;
  uxGrade: string;
  badgeColor: string;
  unfairOpportunity: string;
  website: string;
}

const REAL_COMPETITORS: CompetitorProfile[] = [
  {
    name: 'Linear App',
    domain: 'DevTools & Issue Tracking',
    category: 'SaaS / Productivity',
    marketLeader: true,
    strength: 'Ultra-fast 50ms keyboard shortcuts, sync engine, minimal dark mode.',
    weakness: 'Steep learning curve for non-technical stakeholders, minimal reporting views.',
    uxQualityScore: 9.8,
    uxGrade: 'Masterclass (9.8/10)',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-300',
    unfairOpportunity: 'Build visual Gantt and client-friendly timeline reporting without losing speed.',
    website: 'https://linear.app'
  },
  {
    name: 'Stripe Dashboard',
    domain: 'Fintech & Payments',
    category: 'Fintech',
    marketLeader: true,
    strength: 'World-class documentation, rock-solid reliability, crisp typography.',
    weakness: 'Dense nested sub-menus, search can feel slow across millions of historical events.',
    uxQualityScore: 9.4,
    uxGrade: 'Exceptional (9.4/10)',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-300',
    unfairOpportunity: 'Zero-latency instant search with local indexed cache and visual refund trees.',
    website: 'https://stripe.com'
  },
  {
    name: 'Retool',
    domain: 'Internal Tools & Enterprise',
    category: 'Enterprise SaaS',
    marketLeader: false,
    strength: 'Massive library of pre-built UI components and direct database connectors.',
    weakness: 'Heavy layout shift on initial load, clunky mobile web responsive scaling.',
    uxQualityScore: 7.6,
    uxGrade: 'Good (7.6/10)',
    badgeColor: 'bg-sky-50 text-sky-800 border-sky-300',
    unfairOpportunity: 'Lightweight offline client with native mobile layout morphing.',
    website: 'https://retool.com'
  },
  {
    name: 'Notion',
    domain: 'Knowledge Base & Wiki',
    category: 'SaaS / Docs',
    marketLeader: true,
    strength: 'Infinite flexibility, block-based modular canvas, frictionless markdown.',
    weakness: 'High data views and complex relational database filters become sluggish.',
    uxQualityScore: 8.8,
    uxGrade: 'Great (8.8/10)',
    badgeColor: 'bg-sky-50 text-sky-800 border-sky-300',
    unfairOpportunity: 'High-throughput virtualization tables optimized for 100k+ rows.',
    website: 'https://notion.so'
  },
  {
    name: 'Shopify Admin',
    domain: 'E-commerce Management',
    category: 'Commerce',
    marketLeader: true,
    strength: 'Massive third-party app ecosystem, rock-solid checkout reliability.',
    weakness: 'Third-party app sprawl creates visual inconsistency and disparate UI styles.',
    uxQualityScore: 8.2,
    uxGrade: 'Great (8.2/10)',
    badgeColor: 'bg-sky-50 text-sky-800 border-sky-300',
    unfairOpportunity: 'Strictly enforced atomic component theming across all plugin surfaces.',
    website: 'https://shopify.com'
  },
  {
    name: 'Brex',
    domain: 'Corporate Cards & Spend',
    category: 'Fintech',
    marketLeader: false,
    strength: 'Clean receipt scanning via mobile, automated multi-level expense approvals.',
    weakness: 'Complex multi-entity currency switches cause accidental misallocations.',
    uxQualityScore: 8.5,
    uxGrade: 'Great (8.5/10)',
    badgeColor: 'bg-sky-50 text-sky-800 border-sky-300',
    unfairOpportunity: 'Visual entity switcher with unmistakable color-coded contextual borders.',
    website: 'https://brex.com'
  }
];

export const CompetitorSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isScanning, setIsScanning] = useState(false);

  const handleRunScan = () => {
    sounds.playWhoosh();
    setIsScanning(true);
    setTimeout(() => {
      sounds.playChime();
      setIsScanning(false);
    }, 800);
  };

  const categories = ['All', 'Fintech', 'SaaS / Productivity', 'Enterprise SaaS', 'Commerce'];

  const filteredCompetitors = REAL_COMPETITORS.filter((c: CompetitorProfile) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.strength.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.weakness.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.unfairOpportunity.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || c.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <section id="competitors" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F4F3F1] text-[#111111] border-b-2 border-[#0a0a0a] relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b-2 border-[#0a0a0a]/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="h-7 w-7 rounded-full bg-[#1a1a1a] text-white font-mono font-bold text-xs flex items-center justify-center">
              09
            </span>
            <span className="font-main font-bold uppercase tracking-wider text-xs text-[#111111]">
              COMPETITOR & DIFFERENTIATOR ENGINE
            </span>
          </div>
          <span className="font-mono text-xs text-[#6b6b6b]">SABI OS V1.0 • MARKET INTELLIGENCE</span>
        </div>

        <div className="mt-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl sm:text-5xl font-main tracking-tight leading-[1.1]">
              <span className="voral-headline-1">Real-Time Competitor Scanner</span>
              <span className="voral-headline-2">and Unfair Differentiators.</span>
            </h2>
            <p className="mt-3 text-base text-[#6b6b6b] leading-relaxed max-w-2xl">
              Search any product or domain to inspect real-world competitors, their UX bottlenecks, quality scores, and our unfair design advantages.
            </p>
          </div>

          <button
            onClick={handleRunScan}
            disabled={isScanning}
            className="voral-btn-pill shrink-0 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${isScanning ? 'animate-spin' : ''}`} />
            <span>{isScanning ? 'Scanning...' : 'Refresh Scanner'}</span>
          </button>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="mt-8 p-4 rounded-2xl bg-white border-2 border-[#0a0a0a] shadow-sm flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8a8a8a]" />
            <input
              type="text"
              placeholder="Search product (e.g. Linear, Stripe, Notion, Shopify, Retool)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs font-main rounded-full bg-[#F4F3F1] border border-[#0a0a0a]/15 focus:outline-none focus:ring-2 focus:ring-[#111111]"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  sounds.playClick();
                  setSelectedCategory(cat);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-main font-bold whitespace-nowrap transition-colors border ${
                  selectedCategory === cat
                    ? 'bg-[#1a1a1a] text-white border-[#0a0a0a]'
                    : 'bg-[#F4F3F1] text-[#6b6b6b] border-[#0a0a0a]/10 hover:text-[#111111]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Competitor Cards Table */}
        <div className="mt-8 overflow-x-auto rounded-3xl border-2 border-[#0a0a0a] bg-white shadow-xl">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-[#0a0a0a]/10 bg-[#F4F3F1] text-[11px] font-mono text-[#6b6b6b] uppercase">
                <th className="py-4 px-6">COMPETITOR</th>
                <th className="py-4 px-6">DOMAIN SCOPE</th>
                <th className="py-4 px-6">CORE STRENGTH</th>
                <th className="py-4 px-6">UX PITFALL / WEAKNESS</th>
                <th className="py-4 px-6">UX SCORE</th>
                <th className="py-4 px-6">UNFAIR OPPORTUNITY</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0a0a0a]/10 text-xs sm:text-sm">
              {filteredCompetitors.map((c: CompetitorProfile) => (
                <tr
                  key={c.name}
                  className="hover:bg-[#F4F3F1]/70 transition-colors group"
                >
                  <td className="py-5 px-6 font-main font-bold text-[#111111]">
                    <div className="flex items-center gap-2">
                      <span>{c.name}</span>
                      {c.marketLeader && (
                        <span className="px-2 py-0.5 rounded-full bg-[#1a1a1a] text-white text-[9px] font-mono font-bold">
                          Leader
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-5 px-6 font-mono text-xs text-[#6b6b6b]">
                    {c.domain}
                  </td>
                  <td className="py-5 px-6 text-[#111111]/80 max-w-xs leading-relaxed">
                    {c.strength}
                  </td>
                  <td className="py-5 px-6 text-rose-800 font-medium max-w-xs leading-relaxed">
                    {c.weakness}
                  </td>
                  <td className="py-5 px-6 whitespace-nowrap">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${c.badgeColor}`}>
                      {c.uxGrade}
                    </span>
                  </td>
                  <td className="py-5 px-6 font-semibold text-[#111111] max-w-xs leading-relaxed">
                    <div className="flex items-start gap-1">
                      <span>{c.unfairOpportunity}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 shrink-0 mt-0.5 text-[#8a8a8a] group-hover:text-[#111111]" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
