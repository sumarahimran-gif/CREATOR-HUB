import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useReducedMotion, type Variants } from 'motion/react';

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

const useRevealVisibility = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '0px 0px 18% 0px',
  });
  const shouldReduceMotion =
    useReducedMotion() ??
    (typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [fallbackVisible, setFallbackVisible] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) {
      setFallbackVisible(true);
      return;
    }
    if (isInView) return;

    const timeout = window.setTimeout(() => setFallbackVisible(true), 1500);
    return () => window.clearTimeout(timeout);
  }, [isInView, shouldReduceMotion]);

  return {
    ref,
    shouldReduceMotion: Boolean(shouldReduceMotion),
    isVisible: Boolean(shouldReduceMotion) || isInView || fallbackVisible,
  };
};

// =========================================================================
// 1. REVEAL HEADING (Word-by-word slide-up on first entry)
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
  const { ref, shouldReduceMotion, isVisible } = useRevealVisibility();
  const words = text.split(' ');

  const containerVariants: Variants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.5,
        ease: 'easeOut',
      },
    },
    visible: {
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.5,
        ease: 'easeOut',
        staggerChildren: shouldReduceMotion ? 0 : 0.04,
        delayChildren: delay,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: {
      y: shouldReduceMotion ? 0 : 16,
      opacity: shouldReduceMotion ? 1 : 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.5,
        ease: 'easeOut',
      },
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <Component className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        ref={ref}
        aria-hidden="true"
        initial={shouldReduceMotion ? false : 'hidden'}
        animate={isVisible ? 'visible' : 'hidden'}
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
  isCard?: boolean;
}

export const RevealItem: React.FC<RevealItemProps> = ({
  children,
  className = '',
  delay = 0,
  as = 'div',
}) => {
  const { ref, shouldReduceMotion, isVisible } = useRevealVisibility();
  const MotionComponent = motion[as] as typeof motion.div;

  const itemVariants: Variants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 16,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.5,
        ease: 'easeOut',
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.5,
        delay,
        ease: 'easeOut',
      },
    },
  };

  return (
    <MotionComponent
      ref={ref}
      initial={shouldReduceMotion ? false : 'hidden'}
      animate={isVisible ? 'visible' : 'hidden'}
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
  const { ref, shouldReduceMotion, isVisible } = useRevealVisibility();

  const containerVariants: Variants = {
    hidden: {
      transition: {
        staggerChildren: 0,
      },
    },
    visible: {
      transition: {
        duration: shouldReduceMotion ? 0 : 0.5,
        ease: 'easeOut',
        staggerChildren: shouldReduceMotion ? 0 : stagger,
        delayChildren: delay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial={shouldReduceMotion ? false : 'hidden'}
      animate={isVisible ? 'visible' : 'hidden'}
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

const reducedMotionVariants = (opacity: number, y: number): Variants => ({
  hidden: () => {
    const shouldReduceMotion = prefersReducedMotionCheck();
    return {
      opacity: shouldReduceMotion ? 1 : opacity,
      y: shouldReduceMotion ? 0 : y,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.5,
        ease: 'easeOut',
      },
    };
  },
  visible: () => {
    const shouldReduceMotion = prefersReducedMotionCheck();
    return {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.5,
        ease: 'easeOut',
      },
    };
  },
});

export const revealChildVariants = reducedMotionVariants(0, 16);
export const revealChildTextVariants = reducedMotionVariants(0, 16);
