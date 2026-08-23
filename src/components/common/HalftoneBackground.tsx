import React from 'react';

export const HalftoneBackground: React.FC = () => {
  // Ultra-clean, subtle architectural grid background with zero cloudiness or visual noise
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
      <div 
        className="w-full h-full"
        style={{
          backgroundImage: 'radial-gradient(rgba(10, 10, 10, 0.08) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
    </div>
  );
};
