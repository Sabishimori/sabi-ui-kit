import React from 'react';

interface AnimatedLogoProps {
  size?: number | string;
  className?: string;
  rounded?: boolean;
  border?: boolean;
}

export const AnimatedLogo: React.FC<AnimatedLogoProps> = ({
  size = 28,
  className = '',
  rounded = true,
  border = false,
}) => {
  const sizePx = typeof size === 'number' ? `${size}px` : size;

  return (
    <div
      className={`inline-flex items-center justify-center overflow-hidden shrink-0 select-none bg-[#111111] ${
        rounded ? 'rounded-lg' : ''
      } ${border ? 'border border-white/15' : ''} ${className}`}
      style={{
        width: sizePx,
        height: sizePx,
      }}
    >
      <img
        src="/logo-animated.gif"
        alt="Sabi Kit Animated Logo"
        className="w-full h-full object-contain"
        style={{
          imageRendering: 'crisp-edges',
        }}
      />
    </div>
  );
};
