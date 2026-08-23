import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sounds } from '../../utils/audio';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onGetStarted?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  // Autoplay video muted for standard background ambiance
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.playbackRate = 1.0;
      video.play().catch(() => {});
    }
  }, []);

  // GSAP scroll parallax
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 800px)', () => {
      if (videoRef.current) {
        gsap.to(videoRef.current, {
          scale: 1.12,
          filter: 'brightness(0.55)',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }

      if (titleRef.current) {
        gsap.to(titleRef.current, {
          y: -50,
          opacity: 0.6,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '80% top',
            scrub: 1,
          },
        });
      }

      return () => {};
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen min-h-[720px] max-h-[1200px] overflow-hidden select-none bg-black"
    >
      {/* ── Full-Bleed Horizontal Landscape Background Video ── */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black">
        <video
          ref={videoRef}
          src="/assets/hero-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover will-change-transform scale-105"
        />

        {/* Cinematic Vignettes for High Editorial Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent opacity-95 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/20 to-black/50 pointer-events-none" />

        {/* Subtle Micro-Noise / Film Grain */}
        <div
          className="absolute inset-0 opacity-[0.035] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          }}
        />
      </div>

      {/* ── Content Layer — Bottom-Anchored Editorial Layout ── */}
      <div
        ref={titleRef}
        className="relative z-10 h-full flex flex-col justify-end px-6 sm:px-10 lg:px-16 2xl:px-24 pb-10 sm:pb-14 2xl:pb-16"
      >
        <div className="w-full max-w-[1780px] mx-auto">

          {/* Large Editorial Title — Bottom Left */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-main font-black text-white leading-[0.88] tracking-tighter mb-2"
            style={{ fontSize: 'clamp(3.5rem, 12vw, 13rem)' }}
          >
            Sabi Kit
            <span className="inline-block text-white/40 ml-3 sm:ml-5" style={{ fontSize: '0.35em', verticalAlign: 'super' }}>✦</span>
          </motion.h1>

          {/* Bottom Row: Subtitle left + Description & CTA right */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-12 mt-4 sm:mt-6"
          >
            {/* Left — Sub-tagline */}
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)] shrink-0" />
              <p className="text-white/50 font-mono text-xs sm:text-sm uppercase tracking-widest">
                28-Stage Design Framework • Project OS V1.0
              </p>
            </div>

            {/* Right — Description + CTA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5 sm:gap-8 lg:max-w-xl">
              <p className="text-white/50 text-sm sm:text-[15px] leading-relaxed max-w-sm">
                A master design framework and operational workbench for product designers, design engineers, and scaling startups. Zero ambiguity from discovery to handoff.
              </p>

              <button
                onClick={() => {
                  sounds.playWhoosh();
                  if (onGetStarted) {
                    onGetStarted();
                  } else {
                    const el = document.getElementById('master-flow');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="group shrink-0 inline-flex items-center gap-3 bg-white text-[#111111] font-main font-bold text-sm px-7 py-3.5 rounded-full hover:bg-white/90 transition-colors duration-300 shadow-xl"
              >
                Get started
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#111111] text-white group-hover:translate-x-0.5 transition-transform duration-300">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Subtle Top-Right Telemetry ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute top-6 right-6 sm:right-10 lg:right-16 2xl:right-24 z-10 flex items-center gap-3 text-white/30 font-mono text-[11px] uppercase tracking-wider"
      >
        <span className="hidden sm:inline">8pt Grid</span>
        <span className="hidden sm:inline">•</span>
        <span className="hidden sm:inline">WCAG AAA</span>
        <span className="hidden sm:inline">•</span>
        <span>1920px Fluid</span>
      </motion.div>
    </section>
  );
};
