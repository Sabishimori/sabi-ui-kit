import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface GsapKineticTextProps {
  text: string;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  stagger?: number;
  delay?: number;
}

export const GsapKineticText: React.FC<GsapKineticTextProps> = ({
  text,
  className = '',
  tag = 'h2',
  stagger = 0.03,
  delay = 0,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const words = text.split(' ');

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const chars = el.querySelectorAll('.gsap-char');

    const anim = gsap.fromTo(
      chars,
      {
        yPercent: 120,
        opacity: 0,
        rotateX: -40,
      },
      {
        yPercent: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.8,
        stagger: stagger,
        delay: delay,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      anim.kill();
    };
  }, [stagger, delay]);

  const Tag = tag as keyof JSX.IntrinsicElements;

  return (
    <div ref={containerRef} className={`overflow-hidden inline-flex flex-wrap gap-x-[0.28em] ${className}`}>
      {words.map((word, wIdx) => (
        <span key={wIdx} className="inline-flex overflow-hidden py-0.5">
          {word.split('').map((char, cIdx) => (
            <span
              key={cIdx}
              className="gsap-char inline-block will-change-transform transform-gpu origin-bottom"
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </div>
  );
};
