import React from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';
import { soundFx } from '../utils/audio';

export interface MotionButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  soundType?: 'action' | 'tick' | 'woosh' | 'none';
  children: React.ReactNode;
}

export const MotionButton: React.FC<MotionButtonProps> = ({
  variant = 'primary',
  soundType = 'action',
  className = '',
  onClick,
  onMouseEnter,
  children,
  ...props
}) => {
  const baseClasses =
    'relative inline-flex items-center justify-center transition-colors focus:outline-none uppercase overflow-hidden cursor-pointer';

  const variantClasses = {
    primary:
      'bg-paper text-ink hover:bg-paper-dim hover:shadow-[0_0_20px_rgba(184,164,244,0.4)] font-editorial font-bold tracking-widest text-xs py-3.5 px-7 sm:px-8 border border-paper focus-visible:ring-2 focus-visible:ring-lav transition-all duration-200',
    secondary:
      'border border-ink-3 bg-ink-2/80 text-paper hover:text-paper hover:border-lav hover:bg-ink-3 font-tech tracking-wider text-xs py-3.5 px-6 focus-visible:ring-2 focus-visible:ring-lav transition-all duration-200',
    outline:
      'border border-ink-3 bg-transparent text-paper-dim hover:border-lav hover:text-paper font-tech tracking-wider text-xs py-2.5 px-4 transition-all duration-200',
    ghost:
      'bg-transparent text-paper-dim hover:text-paper hover:bg-ink-3/40 font-tech tracking-wider text-xs py-2 px-3 transition-colors duration-200',
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (soundType === 'action') soundFx.playAction();
    else if (soundType === 'tick') soundFx.playTick();
    else if (soundType === 'woosh') soundFx.playWoosh();
    onClick?.(e);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (soundType !== 'none') soundFx.playTick();
    onMouseEnter?.(e);
  };

  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ y: 0 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10 inline-flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};
