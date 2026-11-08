import React from 'react';
import { motion, type HTMLMotionProps, useReducedMotion } from 'motion/react';

export const pressFeedbackSpring = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 17,
};

type PressFeedbackButtonProps = Omit<
  HTMLMotionProps<'button'>,
  | 'whileHover'
  | 'whileTap'
  | 'transition'
  | 'size'
> & {
  size?: 'lg' | 'sm' | 'row' | 'link';
};

export const PressFeedbackButton: React.FC<PressFeedbackButtonProps> = ({
  size = 'lg',
  children,
  animate,
  onPointerEnter,
  onPointerLeave,
  onPointerDown,
  onPointerUp,
  onPointerCancel,
  onTouchEnd,
  onBlur,
  style,
  ...props
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = React.useState(false);
  const [isHoverScaleEnabled, setIsHoverScaleEnabled] = React.useState(false);
  const [isPressed, setIsPressed] = React.useState(false);
  const hoverScale =
    size === 'lg' ? 1.04 : size === 'sm' ? 1.08 : size === 'link' ? 1.05 : 1;
  const tapScale =
    size === 'lg' ? 1.07 : size === 'sm' ? 1.14 : size === 'link' ? 1.1 : 1.015;
  const baseAnimate =
    typeof animate === 'object' &&
    animate !== null &&
    !Array.isArray(animate) &&
    !('start' in animate)
      ? animate
      : {};
  const transition = shouldReduceMotion
    ? { duration: 0 }
    : pressFeedbackSpring;

  const clearFeedback = () => {
    setIsHovered(false);
    setIsHoverScaleEnabled(false);
    setIsPressed(false);
  };

  return (
    <motion.button
      {...props}
      animate={{
        ...baseAnimate,
        scale: shouldReduceMotion
          ? 1
          : isPressed
            ? tapScale
            : isHoverScaleEnabled
              ? hoverScale
              : 1,
        filter: isHovered
          ? 'drop-shadow(0 0 7px color-mix(in srgb, var(--color-lav) 35%, transparent))'
          : 'none',
      }}
      transition={transition}
      onPointerEnter={(event) => {
        const supportsHover = event.pointerType === 'mouse' || event.pointerType === 'pen';
        setIsHovered(supportsHover);
        setIsHoverScaleEnabled(supportsHover);
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
        setIsHoverScaleEnabled(false);
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
        ...(size === 'link'
          ? { display: 'inline-block', transformOrigin: 'left center' }
          : {}),
      }}
      className={props.className}
    >
      {children}
    </motion.button>
  );
};
