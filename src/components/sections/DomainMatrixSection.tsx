import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Sparkles, Check, Globe, Layers, ArrowRight, Search, CheckCircle2 } from 'lucide-react';
import { sounds } from '../../utils/audio';

interface DomainHierarchy {
  primary: string;
  categoryGroup: 'Enterprise & SaaS' | 'Finance & Commerce' | 'Health & Science' | 'Consumer & Media' | 'Emerging Tech';
  subdomains: string[];
  productCategories: string[];
  recommendedPatterns: string[];
  keyKPIs: string[];
}

const DOMAIN_DATABASE: DomainHierarchy[] = [
  {
    primary: 'Fintech & Banking',
    categoryGroup: 'Finance & Commerce',
    subdomains: ['Neobanking', 'DeFi & Web3 Wallets', 'Commercial Lending', 'WealthTech & Robo-Advisors', 'Payment Gateway & Checkout', 'Insurtech Claims'],
    productCategories: ['B2B Treasury Dashboard', 'Consumer Card App', 'Loan Origination Flow', 'Stock Trading Terminal', 'Risk & Fraud Center'],
    recommendedPatterns: ['Two-Factor Gated Actions', 'High-Density Numeric Tables', 'Realtime Balance WebSockets', 'Instant KYC Identity Upload'],
    keyKPIs: ['Transaction Success Rate (99.99%)', 'KYC Pass Rate (>88%)', 'Time to Fund (<2 mins)']
  },
  {
    primary: 'SaaS & Enterprise Tools',
    categoryGroup: 'Enterprise & SaaS',
    subdomains: ['CRM & Pipeline', 'HR Tech & Payroll', 'DevTools & CI/CD', 'Product Analytics', 'Collaboration & Docs', 'Security & Compliance'],
    productCategories: ['Executive Cockpit', 'Multi-Tenant Permissions Matrix', 'Audit Trail Log', 'Billing & Seat Manager', 'Integration Marketplace'],
    recommendedPatterns: ['Collapsible Left Sidebar', 'Keyboard Command Palette (Cmd+K)', 'Bulk Row Actions', 'Custom Filter Presets'],
    keyKPIs: ['Daily Active Users / Monthly Active Users (DAU/MAU)', 'Seat Expansion Rate', 'Net Revenue Retention (>120%)']
  },
  {
    primary: 'Healthcare & Medtech',
    categoryGroup: 'Health & Science',
    subdomains: ['Telehealth & Virtual Care', 'Electronic Health Records (EHR)', 'Diagnostics & Lab Tests', 'Clinical Trials', 'Pharmacy Delivery', 'Mental Wellness'],
    productCategories: ['Doctor Consultation Room', 'Patient Medical History', 'Prescription Tracker', 'Vitals Telemetry Monitor', 'HIPAA Secure Chat'],
    recommendedPatterns: ['High-Legibility Font Scaling', 'Emergency Action Sticky Bar', 'Timeline Appointment Booking', 'Confidentiality Masking'],
    keyKPIs: ['Consultation Wait Time (<5m)', 'Adherence Rate', 'Patient Satisfaction (CSAT > 90%)']
  },
  {
    primary: 'E-commerce & Retail',
    categoryGroup: 'Finance & Commerce',
    subdomains: ['Headless DTC Stores', 'B2B Wholesale Procurement', 'Multi-Vendor Marketplaces', 'Subscription Boxes', 'Social Commerce', 'Inventory Logistics'],
    productCategories: ['Product Detail Matrix', 'One-Click Stripe Checkout', 'Order Fulfillment Hub', 'Return & Refund Portal', 'Loyalty Rewards Center'],
    recommendedPatterns: ['Sticky Mini-Cart', 'Faceted Filter Drawer', 'Dynamic Inventory Stock Badges', 'Variant Swatch Picker'],
    keyKPIs: ['Cart Conversion Rate (>3.5%)', 'Average Order Value (AOV)', 'Cart Abandonment Rate (<65%)']
  },
  {
    primary: 'AI & Machine Learning',
    categoryGroup: 'Emerging Tech',
    subdomains: ['Autonomous Agent Workspaces', 'Prompt Engineering Studios', 'Model Fine-Tuning Hubs', 'Computer Vision Labeling', 'Generative Media', 'Voice Synthesis'],
    productCategories: ['Interactive AI Canvas', 'Token Usage Telemetry', 'Prompt Versioning Tree', 'Model Evaluation Matrix', 'Agent Task Timeline'],
    recommendedPatterns: ['Streaming Text Markdown', 'Regenerate & Branching Nodes', 'Diff Comparison Viewer', 'Low-Latency Glassmorphism'],
    keyKPIs: ['Token Latency (<200ms TTFT)', 'Prompt Task Completion', 'User Satisfaction / Thumbs Up']
  },
  {
    primary: 'Edtech & E-Learning',
    categoryGroup: 'Consumer & Media',
    subdomains: ['Interactive Bootcamps', 'K-12 Virtual Classrooms', 'Corporate Upskilling', 'Language Gamification', 'Certification Exams', 'Tutor Marketplace'],
    productCategories: ['Video Lesson Player', 'Interactive Code Sandbox', 'Skill Progress Tree', 'Assignment Submitter', 'Quiz Exam Engine'],
    recommendedPatterns: ['Bite-sized Lesson Carousel', 'Gamified Streak Badges', 'Split-Screen Workspace', 'Instant Feedback Toasts'],
    keyKPIs: ['Course Completion Rate (>45%)', '7-Day Retention', 'Quiz Pass Rate (>80%)']
  },
  {
    primary: 'CleanEnergy & ClimateTech',
    categoryGroup: 'Health & Science',
    subdomains: ['Solar & Grid Management', 'Carbon Accounting', 'EV Charging Networks', 'Smart Meter Telemetry', 'ESG Compliance Reporting', 'Supply Chain Auditing'],
    productCategories: ['Carbon Footprint Ledger', 'Solar Output Realtime Wave', 'Grid Load Balancing Monitor', 'EV Charger Station Locator', 'ESG Audit Exporter'],
    recommendedPatterns: ['Live Energy Flow Visualizer', 'Green / Neutral Semantic Color Tokens', 'Export to PDF/CSV Specs', 'Anomaly Alert Badges'],
    keyKPIs: ['Carbon Offset Verified (Tons)', 'Grid Uptime (99.9%)', 'Energy Cost Savings %']
  },
  {
    primary: 'Logistics & Supply Chain',
    categoryGroup: 'Enterprise & SaaS',
    subdomains: ['Fleet Management', 'Warehouse Automation (WMS)', 'Freight Forwarding', 'Last-Mile Delivery', 'Cold Chain Telemetry', 'Customs Clearance'],
    productCategories: ['Live GPS Fleet Map', 'Warehouse Bin Locator', 'Bill of Lading Generator', 'Driver Mobile Dispatch', 'Delivery Exception Alert'],
    recommendedPatterns: ['Full-Screen Interactive Map', 'Realtime Barcode Scanner', 'High-Contrast Status Chips', 'Offline Data Storage Sync'],
    keyKPIs: ['On-Time In-Full Delivery (OTIF)', 'Fuel Efficiency Optimization', 'Dock Turnaround Time']
  }
];

export const DomainMatrixSection: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<DomainHierarchy>(DOMAIN_DATABASE[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDomains = DOMAIN_DATABASE.filter((d) =>
    d.primary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.subdomains.some((sub) => sub.toLowerCase().includes(searchQuery.toLowerCase())) ||
    d.productCategories.some((cat) => cat.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <section id="domains" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F4F3F1] text-[#111111] border-b-2 border-[#0a0a0a] relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b-2 border-[#0a0a0a]/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="h-7 w-7 rounded-full bg-[#1a1a1a] text-white font-mono font-bold text-xs flex items-center justify-center">
              06
            </span>
            <span className="font-main font-bold uppercase tracking-wider text-xs text-[#111111]">
              DOMAIN, SUBDOMAINS & PRODUCT CATEGORIES
            </span>
          </div>
          <span className="font-mono text-xs text-[#6b6b6b]">SABI OS V1.0 • TAXONOMY MATRIX</span>
        </div>

        <div className="mt-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl sm:text-5xl font-main tracking-tight leading-[1.1]">
              <span className="voral-headline-1">Complete Domain Taxonomy</span>
              <span className="voral-headline-2">and Product Category Directory.</span>
            </h2>
            <p className="mt-3 text-base text-[#6b6b6b] leading-relaxed max-w-2xl">
              Whenever you start a client project, select your primary domain below to instantly retrieve all subdomains, product categories, recommended UI patterns, and KPI benchmarks.
            </p>
          </div>

          <div className="relative min-w-[280px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8a8a8a]" />
            <input
              type="text"
              placeholder="Search domains, subdomains..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs font-main rounded-full bg-white border-2 border-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-[#111111] shadow-sm"
            />
          </div>
        </div>

        {/* Primary Domains Pill Selector */}
        <div className="mt-8 flex flex-wrap gap-2">
          {filteredDomains.map((d) => {
            const isActive = selectedDomain.primary === d.primary;
            return (
              <button
                key={d.primary}
                onClick={() => {
                  sounds.playPop();
                  setSelectedDomain(d);
                }}
                className={`px-4 py-2 rounded-full text-xs font-main font-bold transition-all shadow-sm flex items-center gap-2 border-2 ${
                  isActive
                    ? 'bg-[#1a1a1a] text-white border-[#0a0a0a] shadow-md scale-105'
                    : 'bg-white text-[#111111] hover:bg-[#ECEAE6] border-[#0a0a0a]/10'
                }`}
              >
                <Globe className="h-3.5 w-3.5 opacity-70" />
                <span>{d.primary}</span>
              </button>
            );
          })}
        </div>

        {/* Deep Dive Domain & Subdomain Matrix Box */}
        <motion.div
          key={selectedDomain.primary}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#0a0a0a] shadow-xl space-y-8"
        >
          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#0a0a0a]/10 pb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#111111] bg-[#F4F3F1] border border-[#0a0a0a]/10 px-2.5 py-0.5 rounded-full">
                  {selectedDomain.categoryGroup}
                </span>
                <span className="text-xs text-[#8a8a8a]">•</span>
                <span className="text-xs font-mono text-[#6b6b6b]">Active Taxonomy Node</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-main font-bold text-[#111111] mt-1">
                {selectedDomain.primary} Architecture
              </h3>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-full">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>Ready for Client Discovery & Scoping</span>
            </div>
          </div>

          {/* 4 Quadrants */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. Subdomains */}
            <div className="p-5 rounded-2xl bg-[#F4F3F1] border border-[#0a0a0a]/10 space-y-3">
              <span className="text-[11px] font-mono font-bold text-[#111111] uppercase tracking-wider block">
                AVAILABLE SUBDOMAINS ({selectedDomain.subdomains.length})
              </span>
              <ul className="space-y-1.5 text-xs text-[#111111]">
                {selectedDomain.subdomains.map((sub) => (
                  <li key={sub} className="flex items-start gap-1.5 font-medium">
                    <span className="text-[#111111] font-bold">•</span>
                    <span>{sub}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 2. Product Categories */}
            <div className="p-5 rounded-2xl bg-[#F4F3F1] border border-[#0a0a0a]/10 space-y-3">
              <span className="text-[11px] font-mono font-bold text-[#111111] uppercase tracking-wider block">
                PRODUCT CATEGORIES ({selectedDomain.productCategories.length})
              </span>
              <ul className="space-y-1.5 text-xs text-[#111111]">
                {selectedDomain.productCategories.map((cat) => (
                  <li key={cat} className="flex items-start gap-1.5 font-medium">
                    <span className="text-emerald-700 font-bold">✓</span>
                    <span>{cat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Recommended UI Patterns */}
            <div className="p-5 rounded-2xl bg-[#F4F3F1] border border-[#0a0a0a]/10 space-y-3">
              <span className="text-[11px] font-mono font-bold text-[#111111] uppercase tracking-wider block">
                RECOMMENDED UI PATTERNS
              </span>
              <ul className="space-y-1.5 text-xs text-[#111111]">
                {selectedDomain.recommendedPatterns.map((pat) => (
                  <li key={pat} className="flex items-start gap-1.5">
                    <span className="text-[#111111] font-bold">&rarr;</span>
                    <span>{pat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. Target KPIs */}
            <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-3">
              <span className="text-[11px] font-mono font-bold text-amber-900 uppercase tracking-wider block">
                TARGET KPI BENCHMARKS
              </span>
              <ul className="space-y-1.5 text-xs text-amber-950 font-medium">
                {selectedDomain.keyKPIs.map((kpi) => (
                  <li key={kpi} className="flex items-start gap-1.5">
                    <span className="text-amber-700 font-bold">★</span>
                    <span>{kpi}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
