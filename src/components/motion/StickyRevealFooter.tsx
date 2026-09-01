import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUp, ArrowUpRight, Layers, Heart, Sparkles, ShieldCheck, Terminal, Compass } from 'lucide-react';
import { MagneticButton } from './MagneticButton';
import { GsapKineticText } from './GsapKineticText';
import { AnimatedLogo } from '../common/AnimatedLogo';
import { sounds } from '../../utils/audio';

gsap.registerPlugin(ScrollTrigger);

interface StickyRevealFooterProps {}

export const StickyRevealFooter: React.FC<StickyRevealFooterProps> = () => {
  const footerRef = useRef<HTMLElement | null>(null);
  const diamondRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 800px)', () => {
      // 1. Diamond Logo 3D Spin & Snap on Scroll into View
      if (diamondRef.current) {
        gsap.fromTo(
          diamondRef.current,
          { rotate: 0, scale: 0.7, opacity: 0 },
          {
            rotate: 45,
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 2. Staggered Column Entrance with GSAP
      gsap.fromTo(
        el.querySelectorAll('.footer-col-group'),
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // 3. Telemetry bar entrance
      gsap.fromTo(
        el.querySelector('.footer-bottom-bar'),
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      return () => {};
    });

    return () => {
      mm.revert();
    };
  }, []);

  const scrollToTop = () => {
    sounds.playWhoosh();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      ref={footerRef}
      className="relative z-20 bg-[#111111] text-white py-16 sm:py-20 px-4 sm:px-8 lg:px-12 2xl:px-20 border-t-2 border-[#0a0a0a] overflow-hidden w-full mt-8 sm:mt-12"
    >
      {/* Subtle Background Glow Mesh */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-[#366299]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1780px] mx-auto flex flex-col justify-between min-h-[300px] w-full relative z-10 space-y-12">
        
        {/* Top Row: Brand & Quick Navigation Matrix */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-12 border-b border-white/10 pb-14">
          
          {/* Brand Info & Mission Statement */}
          <div className="footer-col-group space-y-5 max-w-md">
            <div className="flex items-center gap-3.5">
              <AnimatedLogo size={52} border rounded className="shadow-[0_0_16px_rgba(255,255,255,0.15)] rounded-xl" />

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-main font-black text-2xl tracking-tight text-white">
                    Sabi Kit OS
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-emerald-400 text-[11px] font-mono font-bold tracking-wider">
                    V1.0 MASTER
                  </span>
                </div>
              </div>
            </div>

            <p className="text-sm text-white/70 leading-relaxed font-normal">
              The 28-stage architectural design system and operational workbench for elite product designers, design engineers, and scaling startups. Zero ambiguity from strategy to developer handoff.
            </p>

            {/* GSAP Magnetic Back-to-Top Button */}
            <div className="pt-2">
              <MagneticButton onClick={scrollToTop}>
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#111111] font-main font-bold text-xs hover:bg-emerald-400 transition-colors shadow-md group">
                  <span>Back to Top of Page</span>
                  <ArrowUp className="h-3.5 w-3.5 transform group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </MagneticButton>
            </div>
          </div>

          {/* Quick Links Column Matrix (GSAP Staggered) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 2xl:gap-16 text-xs font-mono">
            
            {/* Col 1: Pages */}
            <div className="footer-col-group space-y-3.5">
              <span className="text-xs text-white/60 uppercase font-bold tracking-widest block border-b border-white/10 pb-2">
                PAGES & ROUTING
              </span>
              <ul className="space-y-2.5 text-white/80">
                <li>
                  <a href="#home" onClick={() => sounds.playClick()} className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 group">
                    <span>Overview & Insights</span>
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
                <li>
                  <a href="#workspace" onClick={() => sounds.playClick()} className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 group">
                    <span>Workspace & 6 Tools</span>
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
                <li>
                  <a href="#framework" onClick={() => sounds.playClick()} className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 group">
                    <span>28-Stage Blueprint</span>
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
                <li>
                  <a href="#widgets" onClick={() => sounds.playClick()} className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 group">
                    <span>Essential Widgets</span>
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
                <li>
                  <a href="#laws" onClick={() => sounds.playClick()} className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 group">
                    <span>Laws of UX Laboratory</span>
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 2: Specialized Tools */}
            <div className="footer-col-group space-y-3.5">
              <span className="text-xs text-white/60 uppercase font-bold tracking-widest block border-b border-white/10 pb-2">
                OPERATIONAL TOOLS
              </span>
              <ul className="space-y-2.5 text-white/80">
                <li><a href="#workspace" onClick={() => sounds.playClick()} className="hover:text-emerald-400 transition-colors">01. Live API Canvas</a></li>
                <li><a href="#workspace" onClick={() => sounds.playClick()} className="hover:text-emerald-400 transition-colors">02. Auto-Layout Studio</a></li>
                <li><a href="#workspace" onClick={() => sounds.playClick()} className="hover:text-emerald-400 transition-colors">03. Visual Hierarchy</a></li>
                <li><a href="#workspace" onClick={() => sounds.playClick()} className="hover:text-emerald-400 transition-colors">04. 8pt Spatial Grid</a></li>
                <li><a href="#workspace" onClick={() => sounds.playClick()} className="hover:text-emerald-400 transition-colors">05. Motion Lab (GSAP/Framer)</a></li>
                <li><a href="#workspace" onClick={() => sounds.playClick()} className="hover:text-emerald-400 transition-colors">06. Brief Generator</a></li>
              </ul>
            </div>

            {/* Col 3: Design Standards */}
            <div className="footer-col-group space-y-3.5">
              <span className="text-xs text-white/60 uppercase font-bold tracking-widest block border-b border-white/10 pb-2">
                SYSTEM STANDARDS
              </span>
              <ul className="space-y-2.5 text-white/80">
                <li><a href="#laws" onClick={() => sounds.playClick()} className="hover:text-emerald-400 transition-colors">Fitts & Hick Laws</a></li>
                <li><a href="#framework" onClick={() => sounds.playClick()} className="hover:text-emerald-400 transition-colors">8pt Spatial System</a></li>
                <li><a href="#framework" onClick={() => sounds.playClick()} className="hover:text-emerald-400 transition-colors">WCAG AAA Certified</a></li>
                <li><a href="#framework" onClick={() => sounds.playClick()} className="hover:text-emerald-400 transition-colors">Figma Dev Mode Synced</a></li>
                <li><a href="#framework" onClick={() => sounds.playClick()} className="hover:text-emerald-400 transition-colors">JSON Token Schemas</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & GSAP Engine Telemetry */}
        <div className="footer-bottom-bar flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/50 pt-2">
          <div>
            © {new Date().getFullYear()} Sabi Kit OS. Built with GSAP & Framer Motion for senior designers & engineering teams.
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-white/80">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-bold text-white">GSAP SCROLL ENGINE ACTIVE</span>
            </div>
            <span className="text-white/50">•</span>
            <span className="text-white/60">1920px Fluid Grid</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
