import React from 'react';
import { motion, type HTMLMotionProps, useReducedMotion } from 'motion/react';

type PressFeedbackButtonProps = Omit<
  HTMLMotionProps<'button'>,
  'whileTap' | 'transition' | 'size'
> & {
  size?: 'lg' | 'sm' | 'row';
  tone?: 'dark' | 'light';
};

export const PressFeedbackButton: React.FC<PressFeedbackButtonProps> = ({
  size = 'lg',
  tone = 'dark',
  children,
  ...props
}) => {
  const shouldReduceMotion = useReducedMotion();
  const scale = size === 'row' ? 1.04 : 1.05;
  const spring = { type: 'spring' as const, stiffness: 400, damping: 13 };
  const pressShadow =
    tone === 'light'
      ? '0 0 0 2px rgba(72, 68, 82, 0.8), 0 0 18px rgba(72, 68, 82, 0.32)'
      : '0 0 0 2px rgba(184, 164, 244, 0.9), 0 0 18px rgba(184, 164, 244, 0.5)';
  const hoverShadow =
    tone === 'light'
      ? 'hover:shadow-[0_0_18px_rgba(72,68,82,0.3)]'
      : 'hover:shadow-[0_0_18px_rgba(184,164,244,0.35)]';

  return (
    <motion.button
      {...props}
      whileTap={
        shouldReduceMotion
          ? undefined
          : {
              scale,
              boxShadow: pressShadow,
              transition: spring,
            }
      }
      transition={spring}
      className={`${props.className ?? ''} ${hoverShadow}`}
    >
      {children}
    </motion.button>
  );
};
