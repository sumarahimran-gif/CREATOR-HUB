import React from 'react';
import { Reveal } from './Reveal';

interface FadeUpProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
}

export const FadeUp: React.FC<FadeUpProps> = ({
  children,
  className = '',
  delay = 0,
  stagger,
}) => (
  <Reveal
    className={className}
    delay={delay}
    direction="up"
    stagger={stagger}
  >
    {children}
  </Reveal>
);
