import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sounds } from '../../utils/audio';

interface RollingTextButtonProps {
  text: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  variant?: 'primary' | 'secondary' | 'outline' | 'pill';
  className?: string;
}

export const RollingTextButton: React.FC<RollingTextButtonProps> = ({
  text,
  onClick,
  icon,
  iconPosition = 'right',
  variant = 'primary',
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-[#111111] text-white border-2 border-[#0a0a0a] hover:bg-[#222222] shadow-md';
      case 'secondary':
        return 'bg-white text-[#111111] border-2 border-[#0a0a0a] hover:bg-[#F4F3F1] shadow-sm';
      case 'outline':
        return 'bg-transparent text-[#111111] border border-[#0a0a0a]/20 hover:border-[#0a0a0a] hover:bg-white';
      case 'pill':
        return 'bg-[#111111] text-white rounded-full px-5 py-2 text-xs border border-[#0a0a0a]';
    }
  };

  const characters = text.split('');

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      onMouseEnter={() => {
        sounds.playPop();
        setIsHovered(true);
      }}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full font-main font-bold text-xs sm:text-sm tracking-wide overflow-hidden cursor-pointer select-none transition-colors duration-200 ${getVariantStyles()} ${className}`}
    >
      {icon && iconPosition === 'left' && (
        <span className="shrink-0 transition-transform duration-200 group-hover:-translate-x-0.5">
          {icon}
        </span>
      )}

      {/* Dual Character Track Rolling Effect */}
      <span className="relative inline-flex overflow-hidden py-0.5 leading-none">
        {/* Track 1: Original Characters */}
        <span className="inline-flex">
          {characters.map((char, i) => (
            <motion.span
              key={`orig-${i}`}
              animate={{
                y: isHovered ? '-120%' : '0%',
                opacity: isHovered ? 0 : 1,
              }}
              transition={{
                duration: 0.28,
                ease: [0.16, 1, 0.3, 1],
                delay: i * 0.015,
              }}
              className="inline-block"
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </span>

        {/* Track 2: Rolling In Characters from Bottom */}
        <span className="absolute inset-0 inline-flex">
          {characters.map((char, i) => (
            <motion.span
              key={`roll-${i}`}
              initial={{ y: '120%', opacity: 0 }}
              animate={{
                y: isHovered ? '0%' : '120%',
                opacity: isHovered ? 1 : 0,
              }}
              transition={{
                duration: 0.28,
                ease: [0.16, 1, 0.3, 1],
                delay: i * 0.015,
              }}
              className="inline-block text-emerald-400"
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </span>
      </span>

      {icon && iconPosition === 'right' && (
        <span className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5">
          {icon}
        </span>
      )}
    </motion.button>
  );
};
