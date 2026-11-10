import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';

interface ScrubTextProps {
  text: string;
  className?: string;
}

const ScrubWord: React.FC<{
  word: string;
  index: number;
  count: number;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  reducedMotion: boolean;
}> = ({ word, index, count, progress, reducedMotion }) => {
  const start = index / count;
  const end = (index + 1) / count;
  const opacity = useTransform(progress, [start, end], [0.3, 1]);

  return (
    <motion.span style={{ opacity: reducedMotion ? 1 : opacity }}>
      {word}
    </motion.span>
  );
};

export const ScrubText: React.FC<ScrubTextProps> = ({
  text,
  className = '',
}) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const reducedMotion =
    useReducedMotion() ??
    (typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 85%', 'end 15%'],
  });
  const MotionElement = motion.p;
  const words = text.split(/(\s+)/);
  const wordCount = words.filter((word) => !/^\s+$/.test(word)).length;
  let wordIndex = 0;

  return (
    <MotionElement ref={ref} className={className}>
      {words.map((word, index) => {
        if (/^\s+$/.test(word)) return word;

        const currentIndex = wordIndex++;
        return (
          <ScrubWord
            key={`${index}-${word}`}
            word={word}
            index={currentIndex}
            count={wordCount}
            progress={scrollYProgress}
            reducedMotion={Boolean(reducedMotion)}
          />
        );
      })}
    </MotionElement>
  );
};
