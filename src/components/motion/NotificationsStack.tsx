import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Check, X, Sparkles, Layers, ShieldCheck, ArrowRight } from 'lucide-react';
import { sounds } from '../../utils/audio';

export interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  type: 'system' | 'token' | 'handoff' | 'motion';
}

const DEFAULT_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n-1',
    title: 'Figma Tokens Synced',
    desc: '11 master color tokens and 8pt grid values verified with zero lint errors.',
    time: 'Just now',
    type: 'token'
  },
  {
    id: 'n-2',
    title: 'WCAG AAA Contrast Passed',
    desc: 'Luminance contrast ratio 7.4:1 certified for all primary and secondary surfaces.',
    time: '2m ago',
    type: 'system'
  },
  {
    id: 'n-3',
    title: 'Framer Motion Spring Calibrated',
    desc: 'Kinetic spring physics curve tuned to stiffness: 400, damping: 25.',
    time: '5m ago',
    type: 'motion'
  },
  {
    id: 'n-4',
    title: '28/28 Stages Handoff Ready',
    desc: 'Page architecture and relational component registry ready for engineering.',
    time: '12m ago',
    type: 'handoff'
  }
];

export const NotificationsStack: React.FC = () => {
  const [items, setItems] = useState<NotificationItem[]>(DEFAULT_NOTIFICATIONS);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDismiss = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playPop();
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleReset = () => {
    sounds.playChime();
    setItems(DEFAULT_NOTIFICATIONS);
  };

  return (
    <div className="w-full max-w-md mx-auto relative select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="h-6 w-6 rounded-full bg-[#111111] text-white flex items-center justify-center font-mono text-xs font-bold">
            <Bell className="h-3.5 w-3.5" />
          </span>
          <span className="font-main font-bold text-sm text-[#111111]">
            System Notifications Stack
          </span>
          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold">
            {items.length} Live
          </span>
        </div>

        <button
          onClick={() => {
            sounds.playClick();
            setIsExpanded(!isExpanded);
          }}
          className="text-xs font-mono text-[#666666] hover:text-[#111111] font-bold transition-colors"
        >
          {isExpanded ? 'Collapse Stack' : 'Expand All'}
        </button>
      </div>

      {/* Notifications Card Stack Container */}
      <div
        onClick={() => {
          sounds.playClick();
          setIsExpanded(!isExpanded);
        }}
        className={`relative min-h-[160px] cursor-pointer transition-all duration-300 ${
          isExpanded ? 'space-y-3' : 'h-36'
        }`}
      >
        <AnimatePresence>
          {items.map((item, index) => {
            const offset = index * 12;
            const scale = isExpanded ? 1 : 1 - index * 0.04;
            const zIndex = items.length - index;

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={{
                  opacity: isExpanded ? 1 : index > 2 ? 0 : 1 - index * 0.15,
                  y: isExpanded ? 0 : offset,
                  scale: scale,
                  zIndex: zIndex,
                }}
                exit={{ opacity: 0, scale: 0.8, x: 50 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                drag={isExpanded ? 'x' : false}
                dragConstraints={{ left: -100, right: 100 }}
                onDragEnd={(_, info) => {
                  if (Math.abs(info.offset.x) > 60) {
                    setItems((prev) => prev.filter((i) => i.id !== item.id));
                  }
                }}
                className={`w-full p-4 rounded-2xl border-2 border-[#0a0a0a] bg-white shadow-lg flex flex-col justify-between ${
                  !isExpanded ? 'absolute top-0 left-0' : 'relative'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <h5 className="font-main font-bold text-xs text-[#111111] leading-tight">
                      {item.title}
                    </h5>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-[#888888]">{item.time}</span>
                    <button
                      onClick={(e) => handleDismiss(item.id, e)}
                      className="p-1 text-[#888888] hover:text-[#111111] transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-[#555555] mt-1.5 leading-snug">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {items.length === 0 && (
          <div className="p-8 rounded-2xl bg-white border border-[#0a0a0a]/15 text-center space-y-3">
            <span className="text-xs font-mono text-[#666666]">All system notifications cleared.</span>
            <div>
              <button
                onClick={handleReset}
                className="voral-btn-pill py-1.5 px-4 text-xs"
              >
                Reset Notifications
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
