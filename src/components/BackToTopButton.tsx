import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { soundFx } from '../utils/audio';
import { PressFeedbackButton } from './PressFeedbackButton';

interface BackToTopButtonProps {
  show: boolean;
  onScrollToTop?: () => void;
}

export const BackToTopButton: React.FC<BackToTopButtonProps> = ({
  show,
  onScrollToTop,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const handleClick = () => {
    soundFx.playTick();
    if (onScrollToTop) {
      onScrollToTop();
    } else {
      window.scrollTo({ top: 0, behavior: shouldReduceMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <PressFeedbackButton
          size="sm"
          type="button"
          aria-label="Scroll back to top"
          title="Back to top"
          onClick={handleClick}
          initial={{
            opacity: 0,
            ...(shouldReduceMotion ? {} : { scale: 0.8 }),
            y: 16,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
          }}
          exit={{
            opacity: 0,
            ...(shouldReduceMotion ? {} : { scale: 0.8 }),
            y: 16,
            transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-ink-2/90 backdrop-blur-md border border-lav/40 text-paper hover:text-paper hover:border-lav flex items-center justify-center shadow-[0_0_18px_color-mix(in_srgb,var(--color-lav)_35%,transparent)] transition-colors duration-300 group cursor-pointer focus:outline-none"
        >
          {/* Subtle pulsating ambient blue halo */}
          <span className="absolute -inset-1 rounded-full bg-lav/15 blur-sm pointer-events-none group-hover:bg-lav/30 transition-all duration-300" />
          
          <ArrowUp className="w-4 h-4 text-paper group-hover:text-lav-soft" />
        </PressFeedbackButton>
      )}
    </AnimatePresence>
  );
};
