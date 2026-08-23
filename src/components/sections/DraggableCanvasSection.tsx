import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Move, Edit3, Plus, RefreshCw, Sparkles, Check, Trash2, LayoutGrid, Columns, Shuffle, Tag, ShoppingCart, Star } from 'lucide-react';
import { sounds } from '../../utils/audio';

interface CanvasItem {
  id: string;
  title: string;
  price: number;
  category: string;
  rating: number;
  tag: string;
  image: string;
  x?: number;
  y?: number;
}

const FALLBACK_ITEMS: CanvasItem[] = [
  {
    id: 'item-1',
    title: 'Sabi Mechanical Keycaps',
    price: 120,
    category: 'Hardware',
    rating: 4.9,
    tag: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'item-2',
    title: 'Editorial Leather Portfolio',
    price: 240,
    category: 'Accessories',
    rating: 4.8,
    tag: 'Limited',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'item-3',
    title: 'Wireless Minimalist Headphone',
    price: 350,
    category: 'Audio',
    rating: 5.0,
    tag: 'New Release',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'item-4',
    title: 'Tactile Ceramic Coffee Dripper',
    price: 65,
    category: 'Lifestyle',
    rating: 4.7,
    tag: 'Handcrafted',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'item-5',
    title: 'Monochrome Desk Mat (90x40cm)',
    price: 45,
    category: 'Workspace',
    rating: 4.6,
    tag: 'Essential',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'item-6',
    title: 'Precision Brass Ruler 30cm',
    price: 38,
    category: 'Stationery',
    rating: 4.9,
    tag: 'Classic',
    image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=300&auto=format&fit=crop&q=80',
  }
];

export const DraggableCanvasSection: React.FC = () => {
  const [items, setItems] = useState<CanvasItem[]>(FALLBACK_ITEMS);
  const [layoutMode, setLayoutMode] = useState<'freeform' | 'grid' | 'kanban'>('freeform');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Fetch real subjects from DummyJSON free public API with fallback
  const fetchLiveSubjects = async () => {
    sounds.playWhoosh();
    setIsFetching(true);
    try {
      const res = await fetch('https://dummyjson.com/products?limit=6');
      if (!res.ok) throw new Error('Network error');
      const data = await res.json();
      if (data.products && data.products.length > 0) {
        const mapped: CanvasItem[] = data.products.map((p: any) => ({
          id: String(p.id),
          title: p.title,
          price: p.price,
          category: p.category.toUpperCase(),
          rating: p.rating,
          tag: p.brand || 'Featured',
          image: p.thumbnail,
        }));
        setItems(mapped);
        sounds.playChime();
      }
    } catch (e) {
      console.log('Using robust fallback data');
      setItems(FALLBACK_ITEMS);
    } finally {
      setIsFetching(false);
    }
  };

  const updateItemTitle = (id: string, newTitle: string) => {
    setItems(items.map(it => it.id === id ? { ...it, title: newTitle } : it));
  };

  const updateItemPrice = (id: string, newPrice: number) => {
    setItems(items.map(it => it.id === id ? { ...it, price: newPrice } : it));
  };

  const handleAddItem = () => {
    sounds.playPop();
    const newItem: CanvasItem = {
      id: `custom-${Date.now()}`,
      title: 'New Dynamic Subject',
      price: 99,
      category: 'CUSTOM UI',
      rating: 5.0,
      tag: 'Editable',
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&auto=format&fit=crop&q=80'
    };
    setItems([newItem, ...items]);
  };

  const handleDeleteItem = (id: string) => {
    sounds.playPop();
    setItems(items.filter(it => it.id !== id));
  };

  return (
    <section id="draggable-canvas" className="px-4 sm:px-8 lg:px-12 2xl:px-20 max-w-[1780px] mx-auto w-full text-[#111111] relative">
      <div className="w-full">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b-2 border-[#0a0a0a]/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="h-7 w-7 rounded-full bg-[#1a1a1a] text-white font-mono font-bold text-xs flex items-center justify-center">
              API
            </span>
            <span className="font-main font-bold uppercase tracking-wider text-xs text-[#111111]">
              LIVE API DRAGGABLE OBJECTS & EDITABLE WORKSPACE
            </span>
          </div>
          <span className="font-mono text-xs text-[#6b6b6b]">SABI OS V1.0 • DYNAMIC CANVAS ENGINE</span>
        </div>

        <div className="mt-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl sm:text-5xl font-main tracking-tight leading-[1.1]">
              <span className="voral-headline-1">Editable Subject Canvas</span>
              <span className="voral-headline-2">with Freeform Drag Physics & Live API.</span>
            </h2>
            <p className="mt-3 text-base text-[#6b6b6b] leading-relaxed max-w-2xl">
              Drag, reorder, edit titles, and switch layouts live. Connects to real public API data with spring momentum and tactile layout reflow.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={fetchLiveSubjects}
              disabled={isFetching}
              className="voral-btn-pill-light shadow-sm"
            >
              <RefreshCw className={`h-4 w-4 text-[#111111] ${isFetching ? 'animate-spin' : ''}`} />
              <span>{isFetching ? 'Fetching API...' : 'Fetch Live API Data'}</span>
            </button>

            <button
              onClick={handleAddItem}
              className="voral-btn-pill shadow-sm"
            >
              <Plus className="h-4 w-4" />
              <span>Add Editable Subject</span>
            </button>
          </div>
        </div>

        {/* Layout Switcher Bar */}
        <div className="mt-8 p-3 rounded-2xl bg-white border-2 border-[#0a0a0a] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-mono text-[#111111] font-bold">
            <Move className="h-4 w-4 text-[#366299]" />
            <span>Active Workspace Mode:</span>
          </div>

          <div className="flex items-center gap-1.5">
            {[
              { id: 'freeform' as const, label: 'Freeform Drag & Drop', icon: Move },
              { id: 'grid' as const, label: 'Auto-Layout Bento Grid', icon: LayoutGrid },
              { id: 'kanban' as const, label: 'Pipeline Columns', icon: Columns }
            ].map((m) => {
              const Icon = m.icon;
              return (
                <button
                  key={m.id}
                  onClick={() => {
                    sounds.playClick();
                    setLayoutMode(m.id);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-main font-bold transition-all flex items-center gap-1.5 border ${
                    layoutMode === m.id
                      ? 'bg-[#1a1a1a] text-white border-[#0a0a0a] shadow-sm'
                      : 'bg-[#F4F3F1] text-[#6b6b6b] border-[#0a0a0a]/10 hover:text-[#111111]'
                  }`}
                >
                  <Icon className="h-3 w-3" />
                  <span>{m.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Interactive Canvas */}
        <div
          ref={canvasRef}
          className="mt-6 min-h-[560px] bg-[#ECEAE6] rounded-3xl p-6 sm:p-8 border-2 border-[#0a0a0a] shadow-2xl relative overflow-hidden flex flex-col justify-between"
        >
          {/* Canvas Guidelines Watermark */}
          <div className="absolute top-4 right-4 text-[10px] font-mono text-[#8a8a8a] bg-white/70 backdrop-blur-md px-3 py-1 rounded-full border border-black/10">
            {layoutMode === 'freeform' ? '✦ Drag any card with mouse / touch' : '✦ Responsive auto-flow mode'}
          </div>

          {/* Cards Render */}
          <div className={
            layoutMode === 'freeform'
              ? 'flex flex-wrap gap-4 relative z-10'
              : layoutMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10'
              : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10'
          }>
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  drag={layoutMode === 'freeform'}
                  dragConstraints={canvasRef}
                  dragElastic={0.1}
                  whileDrag={{ scale: 1.06, rotate: 2, zIndex: 50 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="w-full sm:w-80 bg-white rounded-3xl p-5 border-2 border-[#0a0a0a] shadow-lg cursor-grab active:cursor-grabbing space-y-4 hover:shadow-2xl transition-shadow"
                >
                  {/* Card Image & Badge */}
                  <div className="h-36 rounded-2xl overflow-hidden relative bg-[#F4F3F1] border border-[#0a0a0a]/10">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#1a1a1a] text-white text-[9px] font-mono font-bold">
                        {item.category}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteItem(item.id);
                      }}
                      className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-white/80 backdrop-blur-md text-[#6b6b6b] hover:text-rose-600 transition-colors shadow-sm"
                      title="Remove Subject"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* Editable Title & Category */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => updateItemTitle(item.id, e.target.value)}
                        className="font-main font-bold text-sm text-[#111111] bg-transparent border-b border-transparent hover:border-[#0a0a0a]/30 focus:border-[#111111] focus:outline-none w-full"
                      />
                      <Edit3 className="h-3.5 w-3.5 text-[#8a8a8a] shrink-0 ml-1" />
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-1 text-xs font-mono font-bold text-[#111111]">
                        <span>$</span>
                        <input
                          type="number"
                          value={item.price}
                          onChange={(e) => updateItemPrice(item.id, Number(e.target.value))}
                          className="w-16 bg-transparent border-b border-transparent hover:border-[#0a0a0a]/30 focus:border-[#111111] focus:outline-none"
                        />
                      </div>

                      <div className="flex items-center gap-1 text-[11px] font-mono text-amber-600 font-bold">
                        <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                        <span>{item.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Action */}
                  <div className="pt-2 border-t border-[#0a0a0a]/10 flex items-center justify-between text-xs font-mono text-[#6b6b6b]">
                    <span className="px-2 py-0.5 rounded-md bg-[#F4F3F1] text-[10px] font-bold text-[#111111]">
                      {item.tag}
                    </span>
                    <span className="text-[10px] text-[#8a8a8a]">Drag to reposition</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Bottom Help Indicator */}
          <div className="pt-4 mt-6 border-t border-[#0a0a0a]/10 flex flex-wrap items-center justify-between text-xs font-mono text-[#6b6b6b] relative z-10">
            <span>Dynamic subjects fetched via public API & client state engine</span>
            <span className="text-[#111111] font-bold">{items.length} Active Dynamic Nodes</span>
          </div>
        </div>
      </div>
    </section>
  );
};
