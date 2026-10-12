import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();

  // High-performance spring physics for ultra-smooth GPU transformation without reflow
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    restDelta: 0.0005,
  });

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2.5px] bg-ink-3/40 z-30 pointer-events-none"
      aria-hidden="true"
    >
      {/* Active Scroll Depth Indicator (z-index 30, lower than z-50 modals) */}
      <motion.div
        className="h-full w-full bg-lav transform-gpu origin-left shadow-[0_0_12px_rgba(184,164,244,0.6)]"
        style={{ scaleX }}
      />
    </div>
  );
};
