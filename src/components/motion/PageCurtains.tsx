import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PageCurtainsProps {
  pageKey: string;
  children: React.ReactNode;
}

export const PageCurtains: React.FC<PageCurtainsProps> = ({ pageKey, children }) => {
  const slats = [0, 1, 2, 3];

  return (
    <div className="relative w-full min-h-screen">
      <AnimatePresence mode="wait">
        <motion.div
          key={pageKey}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="w-full min-h-screen"
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {/* Slat Wipe Overlay Animation (Fires on Page Change) */}
      <AnimatePresence>
        <div className="pointer-events-none fixed inset-0 z-50 flex flex-col">
          {slats.map((i) => (
            <motion.div
              key={`curtain-${pageKey}-${i}`}
              initial={{ scaleY: 1 }}
              animate={{ scaleY: 0 }}
              exit={{ scaleY: 1 }}
              transition={{
                duration: 0.45,
                ease: [0.16, 1, 0.3, 1],
                delay: i * 0.04,
              }}
              style={{ originY: i % 2 === 0 ? 0 : 1 }}
              className="flex-1 w-full bg-[#111111]/80 backdrop-blur-xs"
            />
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
};
