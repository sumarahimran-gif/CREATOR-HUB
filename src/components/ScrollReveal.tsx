import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion, type Variants } from 'motion/react';

const getIsMobile = () => typeof window !== 'undefined' && window.innerWidth < 768;

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean>(getIsMobile);

  useEffect(() => {
    const handleResize = () => setIsMobile(getIsMobile());
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};

// =========================================================================
// 1. REVEAL HEADING (Word-by-word slide-up mask on enter, fade-out on exit)
// =========================================================================
interface RevealHeadingProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  className?: string;
  delay?: number;
}

export const RevealHeading: React.FC<RevealHeadingProps> = ({
  text,
  as: Component = 'h2',
  className = '',
  delay = 0,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const words = text.split(' ');

  const containerVariants: Variants = {
    hidden: {
      opacity: 0,
      filter: shouldReduceMotion || isMobile ? 'none' : 'blur(6px)',
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 1, 1],
      },
    },
    visible: {
      opacity: 1,
      filter: shouldReduceMotion || isMobile ? 'none' : 'blur(0px)',
      transition: {
        duration: 0.4,
        staggerChildren: shouldReduceMotion ? 0 : 0.06,
        delayChildren: delay,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: {
      y: shouldReduceMotion ? '0%' : '105%',
      transition: {
        duration: 0.35,
        ease: [0.4, 0, 1, 1],
      },
    },
    visible: {
      y: '0%',
      transition: {
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <Component className={className}>
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2, margin: '0px 0px -8% 0px' }}
        variants={containerVariants}
        style={{ willChange: 'transform, opacity' }}
        className="inline-block"
      >
        {words.map((word, i) => (
          <span
            key={i}
            className="inline-block overflow-hidden align-top leading-none pb-[0.08em] mr-[0.25em] last:mr-0"
          >
            <motion.span
              variants={wordVariants}
              style={{ willChange: 'transform, opacity' }}
              className="inline-block"
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Component>
  );
};

// =========================================================================
// 2. REVEAL ITEM (Blocks of text, single cards, buttons, etc.)
// =========================================================================
interface RevealItemProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'p' | 'li' | 'span';
  isCard?: boolean; // Large cards and images: opacity + y only (no blur) to maintain 60fps
}

export const RevealItem: React.FC<RevealItemProps> = ({
  children,
  className = '',
  delay = 0,
  as = 'div',
  isCard = false,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const MotionComponent = motion[as] as typeof motion.div;

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 24,
      filter: shouldReduceMotion || isCard || isMobile ? 'none' : 'blur(8px)',
      transition: {
        duration: 0.45,
        ease: [0.4, 0, 1, 1], // Leaving is faster than entering
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: shouldReduceMotion || isCard || isMobile ? 'none' : 'blur(0px)',
      transition: {
        duration: 0.9,
        delay,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <MotionComponent
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2, margin: '0px 0px -8% 0px' }}
      variants={itemVariants}
      style={{ willChange: 'transform, opacity' }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
};

// =========================================================================
// 3. REVEAL GROUP (Grids and card collections)
// =========================================================================
interface RevealGroupProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}

export const RevealGroup: React.FC<RevealGroupProps> = ({
  children,
  className = '',
  stagger = 0.08,
  delay = 0,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {
      transition: {
        staggerChildren: 0, // On exit, all children fade out together with no stagger
      },
    },
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : stagger,
        delayChildren: delay,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2, margin: '0px 0px -8% 0px' }}
      variants={containerVariants}
      style={{ willChange: 'transform, opacity' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const prefersReducedMotionCheck = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const revealChildVariants: Variants = {
  hidden: () => ({
    opacity: 0,
    y: prefersReducedMotionCheck() ? 0 : 24,
    filter: 'none',
    transition: {
      duration: 0.45,
      ease: [0.4, 0, 1, 1],
    },
  }),
  visible: () => ({
    opacity: 1,
    y: 0,
    filter: 'none',
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export const revealChildTextVariants: Variants = {
  hidden: () => ({
    opacity: 0,
    y: prefersReducedMotionCheck() ? 0 : 24,
    filter: prefersReducedMotionCheck() || getIsMobile() ? 'none' : 'blur(8px)',
    transition: {
      duration: 0.45,
      ease: [0.4, 0, 1, 1],
    },
  }),
  visible: () => ({
    opacity: 1,
    y: 0,
    filter: prefersReducedMotionCheck() || getIsMobile() ? 'none' : 'blur(0px)',
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};
