import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Sliders, FileText, Download, Sparkles, Building, User, Calendar, CheckCircle2, RefreshCw } from 'lucide-react';
import { sounds } from '../../utils/audio';

const CLIENT_PRESETS = [
  {
    name: 'Acme Fintech Terminal',
    client: 'Acme Global Banking',
    product: 'Institutional Trading OS',
    designer: 'Studio Core (Lead UX)',
    type: 'B2B Enterprise SaaS',
    platform: 'Figma & Next.js 15',
    status: 'Active Blueprint',
    version: '1.0.4 Release',
    date: 'Q4 2026 Strategy',
    duration: '6-Week Sprint',
    deliverables: 'Design System, Component Spec, Assets',
  },
  {
    name: 'Lumina Health App',
    client: 'Lumina Care Labs',
    product: 'Telehealth Patient Portal',
    designer: 'Sarah Chen (Senior UX)',
    type: 'Mobile & Web Healthcare',
    platform: 'Figma & React Native',
    status: 'In Progress (Stage 08)',
    version: '2.1.0 Beta',
    date: 'Q1 2027 Launch',
    duration: '8-Week Sprint',
    deliverables: 'Mobile Screen Inventory, HIPAA Flows',
  },
  {
    name: 'Omni Commerce Store',
    client: 'Omni Retail Group',
    product: 'Headless E-Commerce Matrix',
    designer: 'Alex Rivera (UI Lead)',
    type: 'B2C E-Commerce Hub',
    platform: 'Figma & Shopify Hydrogen',
    status: 'QA & Handoff (Stage 12)',
    version: '1.0.0 Stable',
    date: 'Immediate Launch',
    duration: '4-Week Sprint',
    deliverables: 'Cart Flow, Checkout Gating, Design Tokens',
  }
];

export const DashboardSection: React.FC = () => {
  const [selectedPresetIdx, setSelectedPresetIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const [meta, setMeta] = useState(CLIENT_PRESETS[0]);
  const [activeStage, setActiveStage] = useState(8);

  const handleSelectPreset = (idx: number) => {
    sounds.playPop();
    setSelectedPresetIdx(idx);
    setMeta(CLIENT_PRESETS[idx]);
  };

  const handleCopySpec = () => {
    sounds.playChime();
    const text = `SABI KIT OS PROJECT DASHBOARD SPECIFICATION:
====================================
PROJECT NAME: ${meta.name}
CLIENT: ${meta.client}
PRODUCT: ${meta.product}
LEAD DESIGNER: ${meta.designer}
PROJECT TYPE: ${meta.type}
TECH PLATFORM: ${meta.platform}
ACTIVE STATUS: ${meta.status} (Stage ${activeStage} of 14)
SYSTEM VERSION: ${meta.version}
TARGET DATE: ${meta.date}
SPRINT DURATION: ${meta.duration}
CORE DELIVERABLES: ${meta.deliverables}

Centrally governed via Sabi Kit UI/UX Project Operating System V1.0`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="dashboard" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F4F3F1] text-[#111111] border-b-2 border-[#0a0a0a] relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b-2 border-[#0a0a0a]/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="h-7 w-7 rounded-full bg-[#1a1a1a] text-white font-mono font-bold text-xs flex items-center justify-center">
              03
            </span>
            <span className="font-main font-bold uppercase tracking-wider text-xs text-[#111111]">
              PROJECT DASHBOARD & CLIENT CONTROL CENTER
            </span>
          </div>
          <span className="font-mono text-xs text-[#6b6b6b]">SABI OS V1.0 • GOVERNANCE</span>
        </div>

        {/* 2-Line Headline */}
        <div className="mt-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl sm:text-5xl font-main tracking-tight leading-[1.1]">
              <span className="voral-headline-1">Client Project</span>
              <span className="voral-headline-2">Control Center & Meta Spec.</span>
            </h2>
            <p className="mt-3 text-base text-[#6b6b6b] max-w-2xl leading-relaxed">
              When starting any client or internal work, this centralized metadata block sets the project name, client constraints, tech stack, and deliverable commitments so everyone stays aligned.
            </p>
          </div>

          <button
            onClick={handleCopySpec}
            className="voral-btn-pill shrink-0"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-300" /> : <Copy className="h-4 w-4" />}
            <span>{copied ? 'Spec Copied!' : 'Copy Client Project Spec'}</span>
          </button>
        </div>

        {/* Client Preset Switcher */}
        <div className="mt-10 p-4 rounded-2xl bg-white border-2 border-[#0a0a0a] shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#111111] font-bold uppercase tracking-wider">
            <Building className="h-4 w-4 text-[#366299]" />
            <span>Switch Real Client Scenario:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {CLIENT_PRESETS.map((p, idx) => (
              <button
                key={p.name}
                onClick={() => handleSelectPreset(idx)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-main font-bold transition-all ${
                  selectedPresetIdx === idx
                    ? 'bg-[#1a1a1a] text-white shadow-md'
                    : 'bg-[#F4F3F1] text-[#6b6b6b] hover:text-[#111111] border border-[#0a0a0a]/10'
                }`}
              >
                {p.client}
              </button>
            ))}
          </div>
        </div>

        {/* Live Stage Progress Slider */}
        <div className="mt-6 p-6 rounded-3xl bg-white border-2 border-[#0a0a0a] shadow-md">
          <div className="flex items-center justify-between text-xs font-mono mb-3">
            <span className="text-[#6b6b6b] uppercase tracking-wider font-bold">
              PROJECT EXECUTION STAGE
            </span>
            <span className="text-emerald-700 font-bold">
              Stage {activeStage} of 14 ({Math.round((activeStage / 14) * 100)}% Complete)
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="14"
            value={activeStage}
            onChange={(e) => {
              sounds.playClick(600 + Number(e.target.value) * 20);
              setActiveStage(Number(e.target.value));
            }}
            className="w-full h-2 bg-[#F4F3F1] rounded-lg appearance-none cursor-pointer accent-[#1a1a1a]"
          />
        </div>

        {/* 11 Metadata Matrix Cards with Live Editing */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'PROJECT NAME', field: 'name', value: meta.name },
            { label: 'CLIENT', field: 'client', value: meta.client },
            { label: 'PRODUCT', field: 'product', value: meta.product },
            { label: 'DESIGNER', field: 'designer', value: meta.designer },
            { label: 'TYPE', field: 'type', value: meta.type },
            { label: 'PLATFORM', field: 'platform', value: meta.platform },
            { label: 'STATUS', field: 'status', value: meta.status, isStatus: true },
            { label: 'VERSION', field: 'version', value: meta.version },
            { label: 'DATE', field: 'date', value: meta.date },
            { label: 'DURATION', field: 'duration', value: meta.duration },
          ].map((c) => (
            <div key={c.label} className="p-5 rounded-2xl bg-white border border-[#0a0a0a]/15 shadow-sm">
              <span className="text-[11px] font-mono text-[#8a8a8a] uppercase tracking-wider block">{c.label}</span>
              {c.isStatus ? (
                <div className="text-sm font-main font-bold text-emerald-700 mt-1 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
                  <span>{meta.status}</span>
                </div>
              ) : (
                <input
                  type="text"
                  value={c.value}
                  onChange={(e) => setMeta({ ...meta, [c.field]: e.target.value })}
                  className="text-sm font-main font-bold text-[#111111] mt-1 bg-transparent w-full border-b border-transparent focus:border-[#111111] focus:outline-none"
                />
              )}
            </div>
          ))}

          {/* Deliverables */}
          <div className="p-5 rounded-2xl bg-white border border-[#0a0a0a]/15 shadow-sm sm:col-span-2">
            <span className="text-[11px] font-mono text-[#8a8a8a] uppercase tracking-wider block">DELIVERABLES</span>
            <input
              type="text"
              value={meta.deliverables}
              onChange={(e) => setMeta({ ...meta, deliverables: e.target.value })}
              className="text-sm font-main font-bold text-[#111111] mt-1 bg-transparent w-full border-b border-transparent focus:border-[#111111] focus:outline-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
