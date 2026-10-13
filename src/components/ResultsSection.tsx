import React from 'react';
import { motion } from 'motion/react';
import { RevealHeading, RevealItem, RevealGroup, revealChildVariants } from './ScrollReveal';
import { useImageViewer } from './ImageViewer';

interface ResultImage {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  wide?: boolean;
}

const resultImages: ResultImage[] = [
  {
    src: '/results/channel-analytics.jpg',
    alt: 'YouTube Studio channel analytics.',
    caption: 'Channel analytics.',
    width: 1179,
    height: 556,
    wide: true,
  },
  {
    src: '/results/silver-play-button.jpg',
    alt: 'Silver Play Button. 100,000 subscribers.',
    caption: 'Silver Play Button. 100,000 subscribers.',
    width: 226,
    height: 180,
  },
  {
    src: '/results/shorts-audience-retention.png',
    alt: 'Shorts audience retention.',
    caption: 'Shorts audience retention.',
    width: 1108,
    height: 768,
  },
  {
    src: '/results/estimated-earnings.jpg',
    alt: 'Estimated earnings.',
    caption: 'Estimated earnings.',
    width: 1373,
    height: 414,
    wide: true,
  },
  {
    src: '/results/estimated-revenue.png',
    alt: 'Estimated revenue.',
    caption: 'Estimated revenue.',
    width: 768,
    height: 1367,
  },
];

export const ResultsSection: React.FC = () => {
  const { openImage } = useImageViewer();

  return (
    <section
      id="results"
      className="relative py-20 sm:py-24 lg:py-28 px-6 sm:px-10 lg:px-16 bg-ink border-t border-ink-3 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto space-y-16 sm:space-y-20">
        <div className="space-y-4 max-w-3xl">
          <RevealItem>
            <div className="flex items-center gap-3 text-xs sm:text-sm font-tech tracking-[0.25em] text-lav uppercase">
              <span className="w-5 h-[1px] bg-lav/40 inline-block shrink-0" />
              <span>RESULTS</span>
            </div>
          </RevealItem>

          <RevealHeading
            text="Real results from real channels."
            as="h2"
            className="font-editorial font-bold text-2xl sm:text-3xl lg:text-4xl text-paper tracking-tight leading-[1.15]"
          />
        </div>

        <RevealGroup
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          stagger={0.08}
        >
          {resultImages.map((image) => (
            <motion.figure
              key={image.src}
              variants={revealChildVariants}
              className={`flex min-w-0 flex-col rounded-[20px] border border-white/10 bg-ink-2 p-4 ${
                image.wide ? 'lg:col-span-2' : ''
              }`}
            >
              <button
                type="button"
                onClick={() => openImage(image)}
                aria-label={`Open image: ${image.caption}`}
                className="flex min-h-[220px] w-full flex-1 cursor-zoom-in items-center justify-center rounded-xl bg-ink p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lav"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  loading="lazy"
                  className="h-auto max-h-[60vh] w-auto max-w-full object-contain"
                />
              </button>
              <figcaption className="mt-4 text-center text-base text-paper-dim font-sans leading-relaxed">
                {image.caption}
              </figcaption>
            </motion.figure>
          ))}
        </RevealGroup>

        <RevealItem>
          <p className="mx-auto max-w-4xl text-center text-xs sm:text-sm text-paper-dim font-sans leading-relaxed">
            Results shown are from the founder&apos;s own channels and are not typical or guaranteed. Creator Hub does not promise any particular income or growth.
          </p>
        </RevealItem>
      </div>

    </section>
  );
};
