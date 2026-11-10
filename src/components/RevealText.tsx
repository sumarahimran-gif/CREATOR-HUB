import React from 'react';
import { Reveal, type RevealDirection } from './Reveal';

interface RevealTextProps {
  text: string;
  lines?: string[];
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  className?: string;
  delay?: number;
  duration?: number;
  direction?: Exclude<RevealDirection, 'pop' | 'none'>;
}

export const RevealText: React.FC<RevealTextProps> = ({
  text,
  lines,
  as: Component = 'h2',
  className = '',
  delay = 0,
  duration = 0.6,
  direction = 'left',
}) => {
  const textLines = lines ?? [text];

  return (
    <Reveal
      as={Component}
      className={`reveal-text ${className}`}
      direction="none"
      duration={duration}
      threshold={0.25}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="block">
        {textLines.map((line, lineIndex) => (
          <span
            key={`${lineIndex}-${line}`}
            className="block overflow-hidden"
            data-reveal-line=""
            data-reveal-direction={direction}
            style={{ '--reveal-delay': `${(delay + lineIndex * 0.1) * 1000}ms` } as React.CSSProperties}
          >
            <span className="block">{line}</span>
          </span>
        ))}
      </span>
    </Reveal>
  );
};
