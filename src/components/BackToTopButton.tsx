import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  const handleClick = () => {
    soundFx.playTick();
    if (onScrollToTop) {
      onScrollToTop();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
          initial={{ opacity: 0, scale: 0.8, y: 16 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
          }}
          exit={{
            opacity: 0,
            scale: 0.8,
            y: 16,
            transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-ink-2/90 backdrop-blur-md border border-lav/40 text-paper hover:text-paper hover:border-lav flex items-center justify-center shadow-[0_0_18px_rgba(184,164,244,0.35)] transition-all duration-300 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-lav focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
        >
          {/* Subtle pulsating ambient lavender halo */}
          <span className="absolute -inset-1 rounded-full bg-lav/15 blur-sm pointer-events-none group-hover:bg-lav/30 transition-all duration-300" />
          
          <ArrowUp className="w-4 h-4 text-paper group-hover:text-lav-soft" />
        </PressFeedbackButton>
      )}
    </AnimatePresence>
  );
};
