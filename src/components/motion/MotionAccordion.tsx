import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Plus, Minus } from 'lucide-react';
import { sounds } from '../../utils/audio';

export interface AccordionItem {
  id: string;
  title: string;
  category?: string;
  content: string | React.ReactNode;
}

interface MotionAccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
}

export const MotionAccordion: React.FC<MotionAccordionProps> = ({
  items,
  allowMultiple = false,
  className = '',
}) => {
  const [openIds, setOpenIds] = useState<string[]>([items[0]?.id || '']);

  const toggleItem = (id: string) => {
    sounds.playPop();
    if (allowMultiple) {
      setOpenIds(
        openIds.includes(id) ? openIds.filter((item) => item !== id) : [...openIds, id]
      );
    } else {
      setOpenIds(openIds.includes(id) ? [] : [id]);
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);

        return (
          <div
            key={item.id}
            className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
              isOpen
                ? 'bg-white border-[#0a0a0a] shadow-md'
                : 'bg-white/80 border-[#0a0a0a]/12 hover:border-[#0a0a0a]/40 hover:bg-white'
            }`}
          >
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer select-none"
            >
              <div className="space-y-1">
                {item.category && (
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#888888] font-bold block">
                    {item.category}
                  </span>
                )}
                <h4 className="font-main font-bold text-base sm:text-lg text-[#111111] leading-snug">
                  {item.title}
                </h4>
              </div>

              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="h-8 w-8 rounded-full bg-[#F4F3F1] border border-[#0a0a0a]/10 flex items-center justify-center text-[#111111] shrink-0"
              >
                <ChevronDown className="h-4 w-4" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-[#555555] leading-relaxed border-t border-[#0a0a0a]/5">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
