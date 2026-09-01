import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ArrowLeft, Moon, Sun, ChevronDown, Sparkles, Volume2, RefreshCw, Play, Pause, Zap, Activity } from 'lucide-react';
import { sounds } from '../../utils/audio';

export const WidgetsPlaygroundSection: React.FC = () => {
  const [activeSort, setActiveSort] = useState('Newest');
  const [likesMap, setLikesMap] = useState<Record<string, number>>({
    garden: 24,
    halley: 20,
    window: 66,
    calm: 24,
    tree: 41,
    newsroom: 39,
    pulse: 25,
    exchange: 42,
    'life-dots': 48,
    'mini-golf': 33,
    tetris: 30,
    neovinyl: 137,
  });
  const [likedList, setLikedList] = useState<string[]>([]);

  // Halley's Comet ticker
  const [halleyDays, setHalleyDays] = useState(12918);

  // Pulse Clock real time
  const [time, setTime] = useState({ h: '14', m: '56', s: '08' });

  // Currency exchange
  const [usdAmount, setUsdAmount] = useState(100);
  const [selectedCurrency, setSelectedCurrency] = useState<'USD' | 'EUR' | 'GBP' | 'INR'>('INR');

  // Mini Golf putting animation state
  const [isPutting, setIsPutting] = useState(false);
  const [holeScore, setHoleScore] = useState(1);
  const [golfStrokes, setGolfStrokes] = useState(5);

  // Tetris animation loop
  const [tetrisScore, setTetrisScore] = useState(120);
  const [tetrisLines, setTetrisLines] = useState(3);

  // Neovinyl spinning state
  const [isVinylSpinning, setIsVinylSpinning] = useState(true);

  // Calm breathing animation cycle
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Breathe out'>('Breathe out');

  // Procedural LED Matrix state
  const [matrixPhase, setMatrixPhase] = useState(0);

  useEffect(() => {
    // Clock tick
    const timer = setInterval(() => {
      const now = new Date();
      setTime({
        h: String(now.getHours()).padStart(2, '0'),
        m: String(now.getMinutes()).padStart(2, '0'),
        s: String(now.getSeconds()).padStart(2, '0'),
      });
      setHalleyDays((d) => (Math.random() > 0.8 ? d - 1 : d));
    }, 1000);

    // Matrix sine wave pulse
    const matrixTimer = setInterval(() => {
      setMatrixPhase((p) => p + 0.2);
    }, 100);

    // Calm breathing timer
    const breathTimer = setInterval(() => {
      setBreathPhase((prev) => {
        if (prev === 'Inhale') return 'Hold';
        if (prev === 'Hold') return 'Breathe out';
        return 'Inhale';
      });
    }, 3200);

    return () => {
      clearInterval(timer);
      clearInterval(matrixTimer);
      clearInterval(breathTimer);
    };
  }, []);

  const toggleLike = (id: string) => {
    sounds.playPop();
    if (likedList.includes(id)) {
      setLikedList(likedList.filter((item) => item !== id));
      setLikesMap((prev) => ({ ...prev, [id]: prev[id] - 1 }));
    } else {
      setLikedList([...likedList, id]);
      setLikesMap((prev) => ({ ...prev, [id]: prev[id] + 1 }));
    }
  };

  const getExchangeRate = () => {
    switch (selectedCurrency) {
      case 'INR': return (usdAmount * 92.51).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      case 'EUR': return (usdAmount * 0.92).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      case 'GBP': return (usdAmount * 0.79).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      case 'USD': return (usdAmount * 1.00).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
  };

  const triggerPutt = () => {
    if (isPutting) return;
    sounds.playPop();
    setIsPutting(true);
    setTimeout(() => {
      sounds.playChime();
      setIsPutting(false);
      setGolfStrokes((s) => s + 1);
      setHoleScore((h) => h + 1);
    }, 1600);
  };

  return (
    <section id="essential-apps" className="pt-2 sm:pt-4 pb-16 sm:pb-24 px-6 sm:px-12 lg:px-16 2xl:px-24 bg-[#F4F3F1] text-[#111111] min-h-screen relative w-full">
      <div className="max-w-[1780px] mx-auto space-y-12 w-full">
        
        {/* Exact Top Bar Matching Nothing (R) Playground Reference */}
        <div className="flex items-center justify-between gap-4 border-b border-[#0a0a0a]/10 pb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sounds.playClick();
                window.history.back();
              }}
              className="p-1 text-[#111111] hover:opacity-70 transition-opacity"
              title="Back"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold tracking-widest uppercase text-[#111111]">
                NOTHING (R) PLAYGROUND
              </span>
              <span className="text-[10px] font-mono text-[#666666] uppercase font-bold">
                BETA
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => sounds.playPop()}
              className="w-7 h-7 rounded-full bg-white border border-[#0a0a0a]/10 flex items-center justify-center text-[#111111] hover:bg-[#ECEAE6] transition-colors shadow-sm"
              title="Theme Mode"
            >
              <Moon className="h-3.5 w-3.5" />
            </button>

            <button
              onClick={() => sounds.playPop()}
              className="w-7 h-7 rounded-full bg-white border border-[#0a0a0a]/10 flex items-center justify-center text-[#111111] hover:bg-[#ECEAE6] transition-colors shadow-sm"
              title="Status"
            >
              <div className="w-2.5 h-2.5 rounded-full border border-[#111111]" />
            </button>

            <button
              onClick={() => sounds.playWhoosh()}
              className="h-7 px-3 rounded-full bg-[#111111] text-white flex items-center justify-center gap-1 hover:bg-[#222222] transition-colors shadow-sm"
              title="Menu"
            >
              <div className="w-3 h-0.5 bg-white rounded-full mb-0.5" />
              <div className="w-3 h-0.5 bg-white rounded-full" />
            </button>
          </div>
        </div>

        {/* Title & Subtitle Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl sm:text-6xl font-serif tracking-tight text-[#111111] font-normal leading-tight">
              Essential Widgets <span className="font-sans not-italic text-2xl sm:text-3xl text-[#555555] font-normal">(Interactive Studio)</span>
            </h1>
            <p className="mt-2 text-sm sm:text-base text-[#555555] font-mono font-normal">
              Modular UI widgets engineered for your workflows — customize, benchmark, and integrate directly into your projects.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="text-xs font-mono text-[#666666]">Sort by</span>
            <div className="relative">
              <select
                value={activeSort}
                onChange={(e) => {
                  sounds.playClick();
                  setActiveSort(e.target.value);
                }}
                className="appearance-none bg-white border border-[#0a0a0a]/15 px-4 py-1.5 pr-8 rounded-full text-xs font-main font-bold text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#111111] shadow-sm cursor-pointer"
              >
                <option>Newest</option>
                <option>Most Popular</option>
                <option>Staff Picks</option>
                <option>Interactive</option>
              </select>
              <ChevronDown className="h-3.5 w-3.5 text-[#555555] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* 12 Nothing Animated Cards Grid (4 cols on Desktop, 6 cols on 1920px) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 gap-6 2xl:gap-8">
          
          {/* Card 1: THE GARDEN (3D Animated Flapping Butterfly) */}
          <div className="p-4 rounded-3xl bg-[#EBEAE8] border border-[#0a0a0a]/10 hover:border-[#0a0a0a]/40 transition-all flex flex-col justify-between h-[310px] shadow-sm group">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#555555]">
              <span className="uppercase font-bold tracking-wider">THE GARDEN</span>
              <button
                onClick={() => toggleLike('garden')}
                className="flex items-center gap-1 hover:text-[#111111] transition-colors"
              >
                <span>[{likesMap['garden']}]</span>
                <Heart className={`h-3 w-3 ${likedList.includes('garden') ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center my-2">
              <div className="w-36 h-36 rounded-[28px] overflow-hidden relative shadow-md group-hover:scale-105 transition-transform bg-[#111111]">
                <img
                  src="https://images.unsplash.com/photo-1557008075-7f2c5efa4cfd?w=300&auto=format&fit=crop&q=80"
                  alt="Monarch Butterfly on Red Zinnia"
                  className="w-full h-full object-cover brightness-90"
                />

                {/* Animated Floating Butterfly Overlay with Wing Flap */}
                <motion.div
                  animate={{
                    x: [-4, 6, -2, -4],
                    y: [-6, 2, -8, -6],
                    rotate: [-3, 4, -2, -3]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-8 left-10 pointer-events-none"
                >
                  <motion.svg
                    animate={{ rotateY: [0, 65, 0] }}
                    transition={{ duration: 0.28, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-10 h-10 drop-shadow-md"
                    viewBox="0 0 40 40"
                    fill="none"
                  >
                    <path d="M20 20 Q10 8 4 14 Q2 24 16 22 Z" fill="#EA580C" opacity="0.95" />
                    <path d="M20 20 Q30 8 36 14 Q38 24 24 22 Z" fill="#F97316" opacity="0.95" />
                    <line x1="20" y1="12" x2="20" y2="28" stroke="#111111" strokeWidth="2" strokeLinecap="round" />
                  </motion.svg>
                </motion.div>

                {/* Animated Pollen Motes */}
                <motion.div
                  animate={{ opacity: [0.2, 0.9, 0.2], y: [-5, -25] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
                  className="absolute bottom-10 right-8 h-1.5 w-1.5 rounded-full bg-amber-300 shadow-[0_0_8px_#fde047]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent flex flex-col justify-end p-3 text-white">
                  <span className="font-main font-bold text-xs">Zinnia</span>
                  <span className="text-[10px] font-mono text-white/80">Americas</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-[#0a0a0a]/5 text-[11px] font-mono text-[#555555]">
              <div className="h-4 w-4 rounded-full bg-[#111111] text-white text-[10px] flex items-center justify-center font-bold">A</div>
              <span>Adrian</span>
            </div>
          </div>

          {/* Card 2: HALLEY'S TRACKER (Rotating Orbit & Pulsing Comet) */}
          <div className="p-4 rounded-3xl bg-[#EBEAE8] border border-[#0a0a0a]/10 hover:border-[#0a0a0a]/40 transition-all flex flex-col justify-between h-[310px] shadow-sm group">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#555555]">
              <span className="uppercase font-bold tracking-wider">HALLEY'S TRACKER</span>
              <button
                onClick={() => toggleLike('halley')}
                className="flex items-center gap-1 hover:text-[#111111] transition-colors"
              >
                <span>[{likesMap['halley']}]</span>
                <Heart className={`h-3 w-3 ${likedList.includes('halley') ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center my-2">
              <div className="w-52 h-28 bg-[#111111] rounded-[24px] p-3 text-white flex items-center justify-between gap-2 shadow-lg group-hover:scale-105 transition-transform relative overflow-hidden">
                <div className="relative h-16 w-16 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#262626"
                      strokeWidth="2.5"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#818CF8"
                      strokeWidth="2.5"
                      strokeDasharray="53.2, 100"
                    />
                  </svg>

                  {/* Animated Orbiting Comet Dot */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 flex items-start justify-center"
                  >
                    <div className="h-2 w-2 rounded-full bg-indigo-300 shadow-[0_0_8px_#818cf8] -translate-y-1" />
                  </motion.div>

                  <span className="absolute text-[10px] font-mono text-center text-[#666666]">53.2% ORBIT</span>
                </div>

                <div className="flex-1 space-y-0.5">
                  <span className="text-[10px] font-mono text-[#666666] block uppercase">DAYS UNTIL RETURN</span>
                  <span className="text-sm font-mono font-bold tracking-tight text-white block">
                    {halleyDays.toLocaleString()}
                  </span>
                  <div className="grid grid-cols-2 gap-0.5 text-[10px] font-mono text-[#666666] pt-0.5">
                    <div>LAST 1986</div>
                    <div>NEXT 2061</div>
                    <div>PERIOD 75.3 YRS</div>
                    <div>DISTANCE 33.7 AU</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-[#0a0a0a]/5 text-[11px] font-mono text-[#555555]">
              <div className="h-4 w-4 rounded-full bg-[#111111] text-white text-[10px] flex items-center justify-center font-bold">K</div>
              <span>khushal548</span>
            </div>
          </div>

          {/* Card 3: WINDOW (Procedural Undulating Sine Wave LED Grid) */}
          <div className="p-4 rounded-3xl bg-[#EBEAE8] border border-[#0a0a0a]/10 hover:border-[#0a0a0a]/40 transition-all flex flex-col justify-between h-[310px] shadow-sm group">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#555555]">
              <span className="uppercase font-bold tracking-wider">WINDOW</span>
              <button
                onClick={() => toggleLike('window')}
                className="flex items-center gap-1 hover:text-[#111111] transition-colors"
              >
                <span>[{likesMap['window']}]</span>
                <Heart className={`h-3 w-3 ${likedList.includes('window') ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center my-2">
              <div className="w-36 h-36 bg-[#111111] rounded-[28px] p-3 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <div className="grid grid-cols-8 gap-1">
                  {Array.from({ length: 64 }).map((_, idx) => {
                    const row = Math.floor(idx / 8);
                    const col = idx % 8;
                    const dist = Math.sqrt(Math.pow(row - 3.5, 2) + Math.pow(col - 3.5, 2));
                    const isLit = Math.sin(dist * 0.8 - matrixPhase) > 0.2;
                    return (
                      <motion.div
                        key={idx}
                        className={`h-2.5 w-2.5 rounded-full transition-colors duration-150 ${
                          isLit
                            ? 'bg-amber-300 shadow-[0_0_6px_#fde047]'
                            : 'bg-[#222222]'
                        }`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-[#0a0a0a]/5 text-[11px] font-mono text-[#555555]">
              <div className="h-4 w-4 rounded-full bg-[#111111] text-white text-[10px] flex items-center justify-center font-bold">S</div>
              <span>Srizan</span>
            </div>
          </div>

          {/* Card 4: CALM (Interactive Breathing Dandelion Particles) */}
          <div className="p-4 rounded-3xl bg-[#EBEAE8] border border-[#0a0a0a]/10 hover:border-[#0a0a0a]/40 transition-all flex flex-col justify-between h-[310px] shadow-sm group">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#555555]">
              <span className="uppercase font-bold tracking-wider">CALM</span>
              <button
                onClick={() => toggleLike('calm')}
                className="flex items-center gap-1 hover:text-[#111111] transition-colors"
              >
                <span>[{likesMap['calm']}]</span>
                <Heart className={`h-3 w-3 ${likedList.includes('calm') ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center my-2">
              <div className="w-36 h-36 bg-[#111111] rounded-[28px] p-3 text-white flex flex-col items-center justify-between relative shadow-lg group-hover:scale-105 transition-transform">
                <div className="w-full flex justify-between items-center text-[10px] font-mono uppercase tracking-widest text-[#666666]">
                  <span>CALM</span>
                  <span className="h-2 w-2 rounded-full bg-amber-400" />
                </div>

                <motion.div
                  animate={{
                    scale: breathPhase === 'Inhale' ? 1.3 : breathPhase === 'Hold' ? 1.3 : 0.8,
                    rotate: breathPhase === 'Inhale' ? 15 : 0
                  }}
                  transition={{ duration: 2.8, ease: 'easeInOut' }}
                  className="flex items-center justify-center my-auto"
                >
                  <svg className="w-14 h-14" viewBox="0 0 48 48" fill="none">
                    <line x1="24" y1="24" x2="24" y2="44" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="24" y1="24" x2="12" y2="10" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
                    <line x1="24" y1="24" x2="24" y2="8" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
                    <line x1="24" y1="24" x2="36" y2="10" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
                    <line x1="24" y1="24" x2="8" y2="20" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
                    <line x1="24" y1="24" x2="40" y2="20" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
                    <circle cx="12" cy="10" r="1.5" fill="#fde047" />
                    <circle cx="24" cy="8" r="1.5" fill="#fde047" />
                    <circle cx="36" cy="10" r="1.5" fill="#fde047" />
                  </svg>
                </motion.div>

                <span className="text-[10px] font-mono text-white/90 font-medium">
                  {breathPhase}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-[#0a0a0a]/5 text-[11px] font-mono text-[#555555]">
              <div className="h-4 w-4 rounded-full bg-[#111111] text-white text-[10px] flex items-center justify-center font-bold">H</div>
              <span>HarimJimenez</span>
            </div>
          </div>

          {/* Card 5: MAGIC TREE (Animated Wind Sway Physics) */}
          <div className="p-4 rounded-3xl bg-[#EBEAE8] border border-[#0a0a0a]/10 hover:border-[#0a0a0a]/40 transition-all flex flex-col justify-between h-[310px] shadow-sm group">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#555555]">
              <span className="uppercase font-bold tracking-wider">MAGIC TREE</span>
              <button
                onClick={() => toggleLike('tree')}
                className="flex items-center gap-1 hover:text-[#111111] transition-colors"
              >
                <span>[{likesMap['tree']}]</span>
                <Heart className={`h-3 w-3 ${likedList.includes('tree') ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center my-2">
              <div className="w-36 h-36 bg-[#E0DFDC] rounded-[28px] p-3 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform overflow-hidden relative">
                <motion.svg
                  animate={{
                    skewX: [-2, 3, -1, -2],
                    rotate: [-1, 2, -1]
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-20 h-20"
                  viewBox="0 0 80 80"
                  fill="none"
                >
                  <path d="M40 70 L40 45 Q36 35 25 30 M40 45 Q44 35 55 30 M40 50 Q30 40 20 42 M40 50 Q50 40 60 42" stroke="#111111" strokeWidth="2.5" strokeLinecap="round" />
                  <ellipse cx="40" cy="28" rx="26" ry="12" fill="#2B2B2B" />
                  <ellipse cx="25" cy="30" rx="14" ry="8" fill="#404040" opacity="0.8" />
                  <ellipse cx="55" cy="30" rx="14" ry="8" fill="#1A1A1A" opacity="0.8" />
                  <line x1="20" y1="70" x2="60" y2="70" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" />
                </motion.svg>

                {/* Drifting wind motes */}
                <motion.div
                  animate={{ x: [-20, 100], y: [10, -30], opacity: [0, 0.8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeOut' }}
                  className="absolute h-1 w-1 rounded-full bg-black/40"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-[#0a0a0a]/5 text-[11px] font-mono text-[#555555]">
              <div className="h-4 w-4 rounded-full bg-[#111111] text-white text-[10px] flex items-center justify-center font-bold">S</div>
              <span>Samit Kumar Sah</span>
            </div>
          </div>

          {/* Card 6: NOTHING NEWSROOM (Glyph Strobe Sequence) */}
          <div className="p-4 rounded-3xl bg-[#EBEAE8] border border-[#0a0a0a]/10 hover:border-[#0a0a0a]/40 transition-all flex flex-col justify-between h-[310px] shadow-sm group">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#555555]">
              <span className="uppercase font-bold tracking-wider">NOTHING NEWSROOM</span>
              <button
                onClick={() => toggleLike('newsroom')}
                className="flex items-center gap-1 hover:text-[#111111] transition-colors"
              >
                <span>[{likesMap['newsroom']}]</span>
                <Heart className={`h-3 w-3 ${likedList.includes('newsroom') ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center my-2">
              <div className="w-36 h-36 bg-[#111111] rounded-[28px] p-3 text-white flex flex-col items-center justify-between shadow-lg group-hover:scale-105 transition-transform">
                <div className="h-16 w-24 bg-white rounded-xl overflow-hidden p-1.5 flex items-center justify-center shadow-inner relative">
                  {/* Flashing Glyph Light Bars */}
                  <motion.div
                    animate={{ opacity: [0.3, 1, 0.4, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-1 right-2 h-1.5 w-6 rounded-full bg-rose-500 shadow-[0_0_6px_#f43f5e]"
                  />
                  <div className="w-full h-full bg-[#F4F3F1] rounded-lg border border-black/10 flex items-center justify-center text-[10px] font-mono font-bold text-black">
                    GLYPHS
                  </div>
                </div>
                <span className="text-[10px] font-mono text-white/80 text-center">
                  Let's talk about Glyphs
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-[#0a0a0a]/5 text-[11px] font-mono text-[#555555]">
              <div className="h-4 w-4 rounded-full bg-[#111111] text-white text-[10px] flex items-center justify-center font-bold">D</div>
              <span>Daniel</span>
            </div>
          </div>

          {/* Card 7: PULSE CLOCK (Realtime Ticking LED Dot Matrix) */}
          <div className="p-4 rounded-3xl bg-[#EBEAE8] border border-[#0a0a0a]/10 hover:border-[#0a0a0a]/40 transition-all flex flex-col justify-between h-[310px] shadow-sm group">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#555555]">
              <span className="uppercase font-bold tracking-wider">PULSE CLOCK</span>
              <button
                onClick={() => toggleLike('pulse')}
                className="flex items-center gap-1 hover:text-[#111111] transition-colors"
              >
                <span>[{likesMap['pulse']}]</span>
                <Heart className={`h-3 w-3 ${likedList.includes('pulse') ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center my-2">
              <div className="w-36 h-36 bg-[#E0DFDC] rounded-[28px] p-2 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                <div className="w-28 h-28 bg-[#111111] rounded-[20px] p-2 text-white flex flex-col items-center justify-center shadow-lg">
                  <div className="font-mono text-xl font-black tracking-widest text-rose-500 flex items-center">
                    <span>{time.h}</span>
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="mx-0.5"
                    >
                      :
                    </motion.span>
                    <span>{time.m}</span>
                  </div>
                  <div className="flex gap-1 mt-2">
                    {[1, 1, 1, 0, 0].map((dot, i) => (
                      <span key={i} className={`h-1 w-1 rounded-full ${dot ? 'bg-white' : 'bg-[#444444]'}`} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-[#0a0a0a]/5 text-[11px] font-mono text-[#555555]">
              <div className="h-4 w-4 rounded-full bg-[#111111] text-white text-[10px] flex items-center justify-center font-bold">R</div>
              <span>robertKanalos</span>
            </div>
          </div>

          {/* Card 8: EXCHANGE (1) (Live Currency Converter & Sparkline) */}
          <div className="p-4 rounded-3xl bg-[#EBEAE8] border border-[#0a0a0a]/10 hover:border-[#0a0a0a]/40 transition-all flex flex-col justify-between h-[310px] shadow-sm group">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#555555]">
              <span className="uppercase font-bold tracking-wider">EXCHANGE (1)</span>
              <button
                onClick={() => toggleLike('exchange')}
                className="flex items-center gap-1 hover:text-[#111111] transition-colors"
              >
                <span>[{likesMap['exchange']}]</span>
                <Heart className={`h-3 w-3 ${likedList.includes('exchange') ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center my-2">
              <div className="w-52 h-28 bg-[#111111] rounded-[24px] p-2.5 text-white flex items-center justify-between gap-1 shadow-lg group-hover:scale-105 transition-transform">
                <div className="space-y-1 flex-1">
                  <span className="text-[10px] font-mono text-rose-400 block uppercase">• EXCHANGE (1)</span>
                  <div className="text-xs font-mono font-bold text-white">
                    {usdAmount} <span className="text-[10px] text-[#666666]">USD</span>
                  </div>
                  <div className="flex gap-1 pt-1">
                    {(['USD', 'EUR', 'GBP', 'INR'] as const).map(c => (
                      <button
                        key={c}
                        onClick={() => {
                          sounds.playPop();
                          setSelectedCurrency(c);
                        }}
                        className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                          selectedCurrency === c ? 'bg-white text-black' : 'bg-[#222222] text-[#666666]'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="h-full bg-white rounded-2xl p-2.5 text-black flex flex-col justify-center items-end shadow-inner">
                  <span className="text-xs font-mono font-black">{getExchangeRate()}</span>
                  <span className="text-[10px] font-mono font-bold text-[#555555]">{selectedCurrency}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-[#0a0a0a]/5 text-[11px] font-mono text-[#555555]">
              <div className="h-4 w-4 rounded-full bg-[#111111] text-white text-[10px] flex items-center justify-center font-bold">I</div>
              <span>Ifham</span>
            </div>
          </div>

          {/* Card 9: LIFE IN DOTS (Scanning Progress Sweep) */}
          <div className="p-4 rounded-3xl bg-[#EBEAE8] border border-[#0a0a0a]/10 hover:border-[#0a0a0a]/40 transition-all flex flex-col justify-between h-[310px] shadow-sm group">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#555555]">
              <span className="uppercase font-bold tracking-wider">LIFE IN DOTS</span>
              <button
                onClick={() => toggleLike('life-dots')}
                className="flex items-center gap-1 hover:text-[#111111] transition-colors"
              >
                <span>[{likesMap['life-dots']}]</span>
                <Heart className={`h-3 w-3 ${likedList.includes('life-dots') ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center my-2">
              <div className="w-52 h-28 bg-[#111111] rounded-[24px] p-3 text-white flex flex-col justify-between shadow-lg group-hover:scale-105 transition-transform font-mono text-[10px]">
                <div className="flex items-center justify-between">
                  <span className="text-[#666666]">2026</span>
                  <div className="flex gap-1">
                    {[1, 1, 0, 0, 0, 0, 0, 0].map((v, i) => (
                      <span key={i} className={`h-1.5 w-1.5 rounded-full ${v ? 'bg-rose-500' : 'bg-[#333333]'}`} />
                    ))}
                  </div>
                  <span className="font-bold">22%</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#666666]">MARCH</span>
                  <div className="flex gap-1">
                    {[1, 1, 1, 1, 1, 0, 0, 0].map((v, i) => (
                      <span key={i} className={`h-1.5 w-1.5 rounded-full ${v ? 'bg-white' : 'bg-[#333333]'}`} />
                    ))}
                  </div>
                  <span className="font-bold">74%</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#666666]">DAY 23</span>
                  <div className="flex gap-1">
                    {[1, 1, 0, 0, 0, 0, 0, 0].map((v, i) => (
                      <span key={i} className={`h-1.5 w-1.5 rounded-full ${v ? 'bg-rose-500' : 'bg-[#333333]'}`} />
                    ))}
                  </div>
                  <span className="font-bold">24%</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#666666]">5:47 AM</span>
                  <div className="flex gap-1">
                    {[1, 1, 1, 1, 1, 1, 0, 0].map((v, i) => (
                      <span key={i} className={`h-1.5 w-1.5 rounded-full ${v ? 'bg-white' : 'bg-[#333333]'}`} />
                    ))}
                  </div>
                  <span className="font-bold">78%</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-[#0a0a0a]/5 text-[11px] font-mono text-[#555555]">
              <div className="h-4 w-4 rounded-full bg-[#111111] text-white text-[10px] flex items-center justify-center font-bold">E</div>
              <span>Elena R.</span>
            </div>
          </div>

          {/* Card 10: MINI GOLF (Interactive Putt Simulation) */}
          <div className="p-4 rounded-3xl bg-[#EBEAE8] border border-[#0a0a0a]/10 hover:border-[#0a0a0a]/40 transition-all flex flex-col justify-between h-[310px] shadow-sm group">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#555555]">
              <span className="uppercase font-bold tracking-wider">MINI GOLF</span>
              <button
                onClick={() => toggleLike('mini-golf')}
                className="flex items-center gap-1 hover:text-[#111111] transition-colors"
              >
                <span>[{likesMap['mini-golf']}]</span>
                <Heart className={`h-3 w-3 ${likedList.includes('mini-golf') ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center my-2">
              <div className="w-36 h-36 bg-[#111111] rounded-[28px] p-3 text-white flex flex-col justify-between shadow-lg group-hover:scale-105 transition-transform font-mono relative overflow-hidden">
                <div className="flex justify-between items-center text-[10px] text-[#666666]">
                  <div><strong className="text-white">{golfStrokes}</strong> STROKES</div>
                  <div><strong className="text-white">0</strong> PAR</div>
                  <div className="text-rose-400">#1 RANK</div>
                </div>

                <div
                  onClick={triggerPutt}
                  className="h-12 w-full bg-[#222222] rounded-xl flex items-center justify-center cursor-pointer hover:bg-[#282828] transition-colors border border-white/5 relative"
                >
                  {isPutting ? (
                    <motion.div
                      animate={{ x: [-30, 30], scale: [1, 0.6] }}
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                      className="h-3 w-3 rounded-full bg-white shadow-md"
                    />
                  ) : (
                    <span className="text-[10px] text-white font-bold">⛳ PUTT BALL</span>
                  )}
                </div>

                <div className="text-[10px] text-[#666666] flex items-center justify-between pt-1">
                  <span>LEADERBOARD</span>
                  <span className="text-white font-bold">YOU {holeScore}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-[#0a0a0a]/5 text-[11px] font-mono text-[#555555]">
              <div className="h-4 w-4 rounded-full bg-[#111111] text-white text-[10px] flex items-center justify-center font-bold">M</div>
              <span>Marcus V.</span>
            </div>
          </div>

          {/* Card 11: THE TETRIS GAME (Interactive Mini Brick Matrix) */}
          <div className="p-4 rounded-3xl bg-[#EBEAE8] border border-[#0a0a0a]/10 hover:border-[#0a0a0a]/40 transition-all flex flex-col justify-between h-[310px] shadow-sm group">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#555555]">
              <span className="uppercase font-bold tracking-wider">THE TETRIS GAME</span>
              <button
                onClick={() => toggleLike('tetris')}
                className="flex items-center gap-1 hover:text-[#111111] transition-colors"
              >
                <span>[{likesMap['tetris']}]</span>
                <Heart className={`h-3 w-3 ${likedList.includes('tetris') ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center my-2">
              <div className="w-36 h-36 bg-[#111111] rounded-[28px] p-2.5 text-white flex gap-2 shadow-lg group-hover:scale-105 transition-transform font-mono">
                <div className="w-16 h-full bg-[#222222] rounded-lg p-1 grid grid-cols-4 gap-0.5">
                  {Array.from({ length: 32 }).map((_, i) => (
                    <div
                      key={i}
                      className={`rounded-[1px] ${
                        i > 24 ? 'bg-cyan-400' : i === 20 || i === 21 ? 'bg-amber-400' : 'bg-black/20'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex-1 flex flex-col justify-between text-[10px]">
                  <div>
                    <span className="text-[#666666] block">SCORE: {tetrisScore}</span>
                    <span className="text-[#666666] block">LVL: 1</span>
                    <span className="text-emerald-400 block mt-1">NEXT</span>
                  </div>
                  <button
                    onClick={() => {
                      sounds.playClick();
                      setTetrisScore((s) => s + 40);
                    }}
                    className="p-1 rounded bg-[#333333] hover:bg-[#444444] text-center text-white"
                  >
                    ↻ TURN
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-[#0a0a0a]/5 text-[11px] font-mono text-[#555555]">
              <div className="h-4 w-4 rounded-full bg-[#111111] text-white text-[10px] flex items-center justify-center font-bold">D</div>
              <span>Devon M.</span>
            </div>
          </div>

          {/* Card 12: NEOVINYL (Animated Turntable with Audio Reactive Grooves) */}
          <div className="p-4 rounded-3xl bg-[#EBEAE8] border border-[#0a0a0a]/10 hover:border-[#0a0a0a]/40 transition-all flex flex-col justify-between h-[310px] shadow-sm group">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#555555]">
              <span className="uppercase font-bold tracking-wider">NEOVINYL</span>
              <button
                onClick={() => toggleLike('neovinyl')}
                className="flex items-center gap-1 hover:text-[#111111] transition-colors"
              >
                <span>[{likesMap['neovinyl']}]</span>
                <Heart className={`h-3 w-3 ${likedList.includes('neovinyl') ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center my-2">
              <div
                onClick={() => {
                  sounds.playPop();
                  setIsVinylSpinning(!isVinylSpinning);
                }}
                className="w-36 h-36 bg-[#111111] rounded-[28px] p-2 flex items-center justify-center cursor-pointer relative shadow-lg group-hover:scale-105 transition-transform overflow-hidden"
              >
                {/* Spinning Vinyl Record with Groove Reflections */}
                <motion.div
                  animate={{ rotate: isVinylSpinning ? 360 : 0 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  className="h-24 w-24 rounded-full bg-[#0a0a0a] border-2 border-[#333333] flex items-center justify-center relative shadow-inner"
                >
                  <div className="h-10 w-10 rounded-full bg-rose-600 border-2 border-black flex items-center justify-center shadow-md">
                    <div className="h-2 w-2 rounded-full bg-black" />
                  </div>
                </motion.div>

                {/* Animated Tonearm */}
                <motion.div
                  animate={{ rotate: isVinylSpinning ? [40, 43, 40] : 10 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-3 right-4 h-11 w-1.5 bg-[#8a8a8a] rounded origin-top shadow-md pointer-events-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-[#0a0a0a]/5 text-[11px] font-mono text-[#555555]">
              <div className="h-4 w-4 rounded-full bg-[#111111] text-white text-[10px] flex items-center justify-center font-bold">V</div>
              <span>Studio Core</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
