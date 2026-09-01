import React, { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Compass, 
  ExternalLink, 
  Search, 
  Copy, 
  Check, 
  Sparkles, 
  Layers, 
  Smartphone, 
  Brain, 
  Palette, 
  Activity, 
  Box, 
  Code2, 
  ChevronRight, 
  ArrowUpRight,
  FolderOpen,
  X
} from 'lucide-react';
import { RESOURCES_100_DATA, ResourceItem } from '../../data/resourcesData';
import { sounds } from '../../utils/audio';

export const ResourcesPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedResource, setSelectedResource] = useState<ResourceItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(36);

  // Lock body scroll when modal is open and listen for Esc key
  useEffect(() => {
    if (selectedResource) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setSelectedResource(null);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedResource]);

  const categories: { id: string; label: string; count: number; icon: React.FC<{ className?: string }> }[] = useMemo(() => {
    return [
      { id: 'all', label: `All Vault (${RESOURCES_100_DATA.length})`, count: RESOURCES_100_DATA.length, icon: Compass },
      { id: 'curated', label: 'Curated Studios', count: RESOURCES_100_DATA.filter(r => r.category === 'curated' || r.badge.includes('Studio') || r.num.startsWith('N')).length, icon: Sparkles },
      { id: 'ui', label: 'Mobile & Web UI', count: RESOURCES_100_DATA.filter(r => r.category === 'ui').length, icon: Smartphone },
      { id: 'ux', label: 'UX & Psychology', count: RESOURCES_100_DATA.filter(r => r.category === 'ux').length, icon: Brain },
      { id: 'ai', label: 'AI & Prompts', count: RESOURCES_100_DATA.filter(r => r.category === 'ai').length, icon: Sparkles },
      { id: 'tokens', label: 'Type & Colors', count: RESOURCES_100_DATA.filter(r => r.category === 'tokens').length, icon: Palette },
      { id: 'motion', label: 'Motion & Physics', count: RESOURCES_100_DATA.filter(r => r.category === 'motion').length, icon: Activity },
      { id: 'code', label: 'UI Kits & Code', count: RESOURCES_100_DATA.filter(r => r.category === 'code').length, icon: Code2 },
      { id: 'assets', label: '3D, Icons & Assets', count: RESOURCES_100_DATA.filter(r => r.category === 'assets').length, icon: Box },
    ];
  }, []);

  const filteredResources = useMemo(() => {
    return RESOURCES_100_DATA.filter((item) => {
      let matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      if (activeCategory === 'curated') {
        matchesCategory = item.category === 'curated' || item.badge.includes('Studio') || item.num.startsWith('N');
      }

      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesSearch = 
        item.name.toLowerCase().includes(q) ||
        item.tagline.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q) ||
        item.url.toLowerCase().includes(q) ||
        item.badge.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const displayedResources = filteredResources.slice(0, visibleCount);

  const handleCopyUrl = (url: string, id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playPop();
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-16 sm:pb-24 w-full">
      
      {/* 1. Header & Search Hub (1920px Fluid Full Width) */}
      <section className="px-4 sm:px-8 lg:px-16 2xl:px-24 max-w-[1780px] mx-auto w-full pt-2 sm:pt-4">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b-2 border-[#0a0a0a]/10 pb-10">
          <div className="space-y-3.5 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="h-6 w-6 rounded-lg bg-[#111111] text-white flex items-center justify-center shadow-sm">
                <Compass className="h-3.5 w-3.5 text-emerald-400" />
              </span>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#111111]">
                CURATED SENIOR DESIGNER VAULT &bull; {RESOURCES_100_DATA.length}+ RESOURCES
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl 2xl:text-6xl font-main font-black tracking-tight text-[#111111]">
              The Ultimate Design Reference & Tools Vault
            </h1>
            <p className="text-base sm:text-lg text-[#555555] leading-relaxed">
              Every critical tool, inspiration library, curated design studio, cognitive UX heuristic, generative AI prompt, color engine, motion framework, and asset repository needed by senior product architects.
            </p>
          </div>

          {/* Quick Search & Filter Info */}
          <div className="w-full lg:w-96 space-y-2">
            <div className="relative">
              <Search className="h-4 w-4 text-[#666666] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(36);
                }}
                placeholder={`Search ${RESOURCES_100_DATA.length}+ tools, URLs & prompts...`}
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white border border-[#0a0a0a]/15 text-xs font-main font-bold text-[#111111] placeholder:text-[#666666] focus:outline-none focus:ring-2 focus:ring-[#111111] shadow-sm"
              />
            </div>
            <div className="flex items-center justify-between text-xs font-mono text-[#555555] px-1">
              <span>Showing {displayedResources.length} of {filteredResources.length} matches</span>
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="text-[#111111] font-bold hover:underline"
                >
                  Clear Search
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Category Filter Pills Bar (Wrapped, Fully Responsive) */}
        <div className="mt-8 flex flex-wrap items-center gap-2 sm:gap-2.5">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  sounds.playClick();
                  setActiveCategory(cat.id);
                  setVisibleCount(36);
                }}
                className={`px-4 py-2.5 rounded-full text-xs font-main font-bold whitespace-nowrap transition-all border flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#111111] text-white border-[#0a0a0a] shadow-md scale-[1.02]'
                    : 'bg-white text-[#666666] border-[#0a0a0a]/10 hover:text-[#111111] hover:bg-[#ECEAE6]'
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-emerald-400' : 'text-[#666666]'}`} />
                <span>{cat.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[11px] font-mono ${
                  isActive ? 'bg-white/20 text-white' : 'bg-[#F4F3F1] text-[#666666]'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 2. Responsive Resources Grid */}
      <section className="px-4 sm:px-8 lg:px-16 2xl:px-24 max-w-[1780px] mx-auto w-full">
        {filteredResources.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#0a0a0a]/10 space-y-4">
            <FolderOpen className="h-12 w-12 text-[#666666] mx-auto" />
            <h3 className="text-xl font-main font-bold text-[#111111]">
              No resources found matching "{searchQuery}"
            </h3>
            <p className="text-sm text-[#666666]">
              Try a different keyword or reset category filter.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="voral-btn-pill text-xs"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {displayedResources.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => {
                  sounds.playPop();
                  setSelectedResource(item);
                }}
                className="bg-white rounded-3xl border border-[#0a0a0a]/12 p-5 sm:p-7 flex flex-col justify-between min-h-[520px] shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer relative overflow-hidden"
              >
                {/* Card Top Row: Category Index + Slide Number */}
                <div className="flex items-center justify-between text-xs font-mono text-[#555555] pb-3 border-b border-[#0a0a0a]/5">
                  <span className="font-bold tracking-wider uppercase text-xs text-[#111111] truncate max-w-[200px]">
                    {item.badge}
                  </span>
                  <span className="font-bold text-xs text-[#666666]">
                    {item.num}
                  </span>
                </div>

                {/* Center Brand Identity */}
                <div className="flex flex-col items-center justify-center my-3 space-y-2 text-center">
                  {/* Circular Brand Logo Badge or Icon */}
                  <div 
                    className="w-13 h-13 sm:w-14 sm:h-14 rounded-full flex items-center justify-center font-main font-black text-xl shadow-md border-2 border-white transform group-hover:scale-110 transition-transform duration-300 overflow-hidden bg-white shrink-0"
                    style={{ backgroundColor: item.logoBg, color: item.logoColor }}
                  >
                    {item.iconUrl ? (
                      <img 
                        src={item.iconUrl} 
                        alt={item.name} 
                        className="w-8 h-8 object-contain rounded-full"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      item.logoText
                    )}
                  </div>

                  {/* Resource Title */}
                  <h3 className="font-main font-black text-xl sm:text-2xl 2xl:text-3xl text-[#111111] tracking-tight group-hover:text-[#366299] transition-colors truncate max-w-full px-2">
                    {item.name}
                  </h3>
                </div>

                {/* High-Resolution Graphic Preview or Meta Image */}
                <div className="relative w-full h-[200px] sm:h-[220px] rounded-2xl bg-[#F4F3F1] border border-[#0a0a0a]/10 overflow-hidden flex flex-col justify-between shadow-inner group/preview my-2">
                  {item.metaImage ? (
                    <div className="relative w-full h-full overflow-hidden bg-[#111111]">
                      <img 
                        src={item.metaImage} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover/preview:scale-105 transition-transform duration-500"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLElement).parentElement!.innerHTML = `
                            <div class="w-full h-full p-4 flex flex-col justify-between bg-[#F4F3F1]">
                              <p class="text-xs text-[#555555] line-clamp-3">${item.desc}</p>
                              <div class="flex gap-1.5 flex-wrap">
                                <span class="px-2 py-0.5 rounded bg-white text-[11px] font-mono text-[#111111] border border-[#0a0a0a]/10">${item.badge}</span>
                              </div>
                            </div>
                          `;
                        }}
                      />
                      {/* Gradient Vignette */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
                      
                      {/* Floating Meta Tagline */}
                      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-[11px] font-mono">
                        <span className="truncate font-bold drop-shadow-md mr-2">{item.tagline || item.name}</span>
                        <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] shrink-0">
                          Preview
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3.5 w-full h-full flex flex-col justify-between">
                      {/* Top Fake App Nav Header */}
                      <div className="flex items-center justify-between gap-2 border-b border-[#0a0a0a]/10 pb-2">
                        <div className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-[#111111]" />
                          <span className="text-[11px] font-mono font-bold text-[#111111] truncate max-w-[150px]">
                            {item.previewElements.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#888888]" />
                          <span className="h-1.5 w-1.5 rounded-full bg-[#888888]" />
                        </div>
                      </div>

                      {/* Preview Middle Mockup Content */}
                      <div className="flex-1 flex flex-col justify-center py-2 space-y-2">
                        <p className="text-xs text-[#555555] font-normal leading-relaxed line-clamp-2">
                          {item.desc}
                        </p>

                        {/* 4 Feature Badges */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {item.previewElements.pills.slice(0, 4).map((pill) => (
                            <span
                              key={pill}
                              className="px-2 py-0.5 rounded-md bg-white border border-[#0a0a0a]/10 text-[11px] font-mono font-bold text-[#111111] shadow-xs"
                            >
                              {pill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Bottom Quick-Action Peek Info */}
                      <div className="flex items-center justify-between text-[11px] font-mono text-[#666666] pt-1.5 border-t border-[#0a0a0a]/5">
                        <span>Click for Usage Guide & Prompts</span>
                        <ChevronRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform text-[#111111]" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Pill Bar (Left: Link / Right: Category Tag) */}
                <div className="mt-3 pt-3 border-t border-[#0a0a0a]/10 flex items-center justify-between gap-3 text-xs font-mono">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1.5 text-[#111111] font-bold hover:text-emerald-600 transition-colors truncate"
                    title={item.url}
                  >
                    <ExternalLink className="h-3.5 w-3.5 shrink-0 text-[#666666]" />
                    <span className="truncate">{item.url.replace('https://', '').replace('http://', '').replace(/\/$/, '')}</span>
                  </a>

                  <span className="px-2.5 py-1 rounded-full bg-[#F4F3F1] border border-[#0a0a0a]/10 text-xs font-bold text-[#666666] shrink-0 truncate max-w-[130px]">
                    {item.badge}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Load More Trigger Button */}
        {visibleCount < filteredResources.length && (
          <div className="mt-12 text-center">
            <button
              onClick={() => {
                sounds.playWhoosh();
                setVisibleCount(prev => prev + 36);
              }}
              className="voral-btn-pill px-8 py-4 text-sm font-bold shadow-lg"
            >
              <span>Load More Resources ({filteredResources.length - visibleCount} remaining)</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </section>

      {/* 3. Deep-Dive Detailed Resource Modal (Rendered in React Portal directly on document.body for 100% Full-Screen Black Shade & Smooth Scroll) */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedResource && (
            <div 
              className="fixed inset-0 z-[99999] bg-black/85 flex items-center justify-center p-3 sm:p-6 w-screen h-screen overflow-hidden"
              onClick={() => {
                sounds.playPop();
                setSelectedResource(null);
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl border-2 border-[#0a0a0a] max-w-2xl w-full h-[85vh] max-h-[85vh] flex flex-col shadow-2xl relative overflow-hidden pointer-events-auto"
              >
                {/* 1. Pinned Header with Title & Close Button */}
                <div className="flex items-center justify-between gap-4 p-4 sm:p-6 border-b border-[#0a0a0a]/10 shrink-0 bg-white z-10">
                  <div className="flex items-center gap-3 sm:gap-4 truncate">
                    <div
                      className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl flex items-center justify-center font-main font-black text-lg sm:text-xl shadow-sm shrink-0 overflow-hidden bg-white border border-[#0a0a0a]/10"
                      style={{ backgroundColor: selectedResource.logoBg, color: selectedResource.logoColor }}
                    >
                      {selectedResource.iconUrl ? (
                        <img 
                          src={selectedResource.iconUrl} 
                          alt={selectedResource.name} 
                          className="w-6 h-6 sm:w-7 sm:h-7 object-contain rounded-full"
                        />
                      ) : (
                        selectedResource.logoText
                      )}
                    </div>

                    <div className="truncate">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full bg-[#F4F3F1] text-[10px] font-mono font-bold text-[#111111] uppercase border border-[#0a0a0a]/10">
                          {selectedResource.categoryLabel}
                        </span>
                        <span className="text-[11px] font-mono text-[#666666]">
                          #{selectedResource.num}
                        </span>
                      </div>

                      <h2 className="text-xl sm:text-2xl font-main font-black text-[#111111] mt-0.5 truncate">
                        {selectedResource.name}
                      </h2>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      sounds.playPop();
                      setSelectedResource(null);
                    }}
                    className="p-2 sm:p-2.5 rounded-full bg-[#F4F3F1] hover:bg-[#111111] hover:text-white transition-colors text-[#111111] shrink-0"
                    aria-label="Close modal"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* 2. Scrollable Middle Body with min-h-0 and Custom Smooth Scrollbar (100% Scrollable) */}
                <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 space-y-5 overscroll-contain custom-modal-scroll">
                  {/* Optional High-Res Meta Image Banner */}
                  {selectedResource.metaImage && (
                    <div className="relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden border border-[#0a0a0a]/15 bg-black shrink-0">
                      <img 
                        src={selectedResource.metaImage} 
                        alt={selectedResource.name} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-2.5 left-3.5 right-3.5 flex items-center justify-between text-white">
                        <span className="font-mono text-xs text-white/90 truncate mr-2">{selectedResource.tagline}</span>
                        <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-mono font-bold shrink-0">
                          {selectedResource.badge}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Tagline & Overview */}
                  <div className="space-y-1.5">
                    <h4 className="font-main font-bold text-base text-[#111111]">
                      {selectedResource.tagline}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                      {selectedResource.desc}
                    </p>
                  </div>

                  {/* What We Use It For */}
                  <div className="p-4 rounded-2xl bg-[#F4F3F1] border border-[#0a0a0a]/10 space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#111111]">
                      <Sparkles className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                      <span>What Senior Designers Use It For</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                      {selectedResource.whatWeUseFor}
                    </p>
                  </div>

                  {/* How We Use It */}
                  <div className="p-4 rounded-2xl bg-[#F4F3F1] border border-[#0a0a0a]/10 space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#111111]">
                      <Layers className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                      <span>How To Integrate In Workflow</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                      {selectedResource.howWeUseFor}
                    </p>
                  </div>

                  {/* Senior Designer Pro-Tip */}
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/60 space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-emerald-800">
                      <Brain className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      <span>Senior Designer Pro-Tip</span>
                    </div>
                    <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed font-medium">
                      {selectedResource.seniorTip}
                    </p>
                  </div>

                  {/* Sample Prompt (If available) */}
                  {selectedResource.promptExample && (
                    <div className="p-4 rounded-2xl bg-[#111111] text-white space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono text-emerald-400 font-bold uppercase">
                        <span>Ready-to-Use Prompt</span>
                        <button
                          onClick={(e) => handleCopyUrl(selectedResource.promptExample!, 'prompt', e)}
                          className="flex items-center gap-1 text-[11px] text-white/80 hover:text-white"
                        >
                          {copiedId === 'prompt' ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                          <span>{copiedId === 'prompt' ? 'Copied' : 'Copy Prompt'}</span>
                        </button>
                      </div>
                      <p className="text-xs font-mono text-white/80 bg-white/5 p-3 rounded-xl border border-white/10 leading-relaxed">
                        {selectedResource.promptExample}
                      </p>
                    </div>
                  )}
                </div>

                {/* 3. Pinned Sticky Footer with Action Buttons */}
                <div className="p-3.5 sm:p-4 border-t border-[#0a0a0a]/10 shrink-0 bg-[#FAFAF9] z-10 flex flex-wrap items-center justify-between gap-3">
                  <button
                    onClick={(e) => handleCopyUrl(selectedResource.url, selectedResource.id, e)}
                    className="voral-btn-pill-light text-xs"
                  >
                    {copiedId === selectedResource.id ? (
                      <>
                        <Check className="h-4 w-4 text-emerald-600" />
                        <span>URL Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        <span>Copy Direct Link</span>
                      </>
                    )}
                  </button>

                  <a
                    href={selectedResource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="voral-btn-pill text-xs shadow-md"
                  >
                    <span>Launch {selectedResource.name}</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};
