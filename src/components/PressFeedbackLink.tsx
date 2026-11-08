import React from 'react';
import { motion, type HTMLMotionProps, useReducedMotion } from 'motion/react';
import { pressFeedbackSpring } from './PressFeedbackButton';

type PressFeedbackLinkProps = Omit<
  HTMLMotionProps<'a'>,
  'whileHover' | 'whileTap' | 'transition'
> & {
  origin?: 'left' | 'center';
  inlineFlex?: boolean;
};

export const PressFeedbackLink: React.FC<PressFeedbackLinkProps> = ({
  children,
  origin = 'left',
  inlineFlex = false,
  style,
  onPointerEnter,
  onPointerLeave,
  onPointerDown,
  onPointerUp,
  onPointerCancel,
  onTouchEnd,
  onBlur,
  ...props
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = React.useState(false);
  const [isPressed, setIsPressed] = React.useState(false);
  const transition = shouldReduceMotion ? { duration: 0 } : pressFeedbackSpring;

  const clearFeedback = () => {
    setIsHovered(false);
    setIsPressed(false);
  };

  return (
    <motion.a
      {...props}
      animate={{
        scale: shouldReduceMotion ? 1 : isPressed ? 1.1 : isHovered ? 1.05 : 1,
      }}
      transition={transition}
      onPointerEnter={(event) => {
        setIsHovered(event.pointerType === 'mouse' || event.pointerType === 'pen');
        onPointerEnter?.(event);
      }}
      onPointerLeave={(event) => {
        clearFeedback();
        onPointerLeave?.(event);
      }}
      onPointerDown={(event) => {
        if (event.button === 0) setIsPressed(true);
        onPointerDown?.(event);
      }}
      onPointerUp={(event) => {
        setIsPressed(false);
        setIsHovered(false);
        onPointerUp?.(event);
      }}
      onPointerCancel={(event) => {
        clearFeedback();
        onPointerCancel?.(event);
      }}
      onTouchEnd={(event) => {
        clearFeedback();
        onTouchEnd?.(event);
      }}
      onBlur={(event) => {
        clearFeedback();
        onBlur?.(event);
      }}
      style={{
        ...style,
        display: inlineFlex ? 'inline-flex' : 'inline-block',
        transformOrigin: origin === 'center' ? 'center center' : 'left center',
      }}
    >
      {children}
    </motion.a>
  );
};
