import React from 'react';
import { useReveal } from '../hooks/useReveal';

export type RevealDirection = 'left' | 'right' | 'up' | 'pop' | 'none';

interface RevealProps {
  children: React.ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  threshold?: number;
  stagger?: number;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  as: Component = 'div',
  className = '',
  direction = 'up',
  delay = 0,
  duration = 0.6,
  threshold = 0.25,
  stagger,
}) => {
  const { ref, revealed } = useReveal(threshold);
  const style = {
    '--reveal-delay': `${delay * 1000}ms`,
    '--reveal-duration': `${duration * 1000}ms`,
  } as React.CSSProperties;
  const staggeredChildren =
    stagger === undefined
      ? children
      : React.Children.map(children, (child, index) => {
          if (!React.isValidElement<{ style?: React.CSSProperties }>(child)) return child;
          const itemDelay = {
            '--reveal-item-delay': `${index * stagger * 1000}ms`,
          } as React.CSSProperties;
          return React.cloneElement(child, {
            style: { ...child.props.style, ...itemDelay },
          });
        });

  return React.createElement(
    Component,
    {
      ref,
      className,
      'data-reveal': '',
      'data-reveal-direction': direction,
      'data-revealed': revealed,
      'data-reveal-stagger': stagger === undefined ? undefined : '',
      style,
    },
    staggeredChildren,
  );
};
