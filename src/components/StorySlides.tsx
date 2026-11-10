import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FadeUp } from './FadeUp';

interface StorySlidesProps {
  slides: React.ReactNode[];
  'aria-label': string;
}

export const StorySlides: React.FC<StorySlidesProps> = ({
  slides,
  'aria-label': ariaLabel,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [wideViewport, setWideViewport] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const pinned = wideViewport && !reducedMotion && slides.length === 3;

  useEffect(() => {
    const wideQuery = window.matchMedia('(min-width: 768px)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreferences = () => {
      setWideViewport(wideQuery.matches);
      setReducedMotion(motionQuery.matches);
    };

    updatePreferences();
    wideQuery.addEventListener('change', updatePreferences);
    motionQuery.addEventListener('change', updatePreferences);
    window.addEventListener('resize', updatePreferences, { passive: true });
    return () => {
      wideQuery.removeEventListener('change', updatePreferences);
      motionQuery.removeEventListener('change', updatePreferences);
      window.removeEventListener('resize', updatePreferences);
    };
  }, []);

  const updateScrollProgress = useCallback(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track || !pinned) return;

    const scrollDistance = Math.max(1, container.offsetHeight - window.innerHeight);
    const progress = Math.min(
      1,
      Math.max(0, -container.getBoundingClientRect().top) / scrollDistance,
    );
    track.style.transform = `translateX(${-progress * 66.6667}%)`;
    const index = Math.min(slides.length - 1, Math.floor(progress * slides.length));
    setActiveSlide((current) => (current === index ? current : index));
  }, [pinned, slides.length]);

  useEffect(() => {
    if (!pinned) return;
    updateScrollProgress();
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', updateScrollProgress, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
    };
  }, [pinned, updateScrollProgress]);

  const goToSlide = (index: number) => {
    const container = containerRef.current;
    if (!pinned || !container) {
      slideRefs.current[index]?.scrollIntoView({
        behavior: reducedMotion ? 'auto' : 'smooth',
        block: 'center',
      });
      setActiveSlide(index);
      return;
    }

    const containerTop = container.getBoundingClientRect().top + window.scrollY;
    const scrollDistance = container.offsetHeight - window.innerHeight;
    const segmentProgress = (index + 0.5) / slides.length;
    window.scrollTo({
      top: containerTop + scrollDistance * segmentProgress,
      behavior: reducedMotion ? 'auto' : 'smooth',
    });
  };

  const controls = (
    <div className="flex items-center justify-between gap-6 border-t border-ink-3 pt-3">
      <span className="font-tech text-xs tracking-[0.18em] text-paper-dim" aria-live="polite">
        {String(activeSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
      </span>
      <div className="flex items-center gap-2" role="group" aria-label={`${ariaLabel} slides`}>
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1} of ${slides.length}`}
            aria-current={activeSlide === index ? 'step' : undefined}
            className="flex h-7 w-7 items-center justify-center rounded-full focus-visible:outline-none"
          >
            <span
              aria-hidden="true"
              className={`h-[5px] rounded-full transition-[width,background-color] duration-[250ms] ${
                activeSlide === index ? 'w-4 bg-lav-soft' : 'w-[5px] bg-paper-dim'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div
      ref={containerRef}
      className="relative"
      style={pinned ? { height: '250vh' } : undefined}
      role="region"
      aria-label={ariaLabel}
    >
      {pinned ? (
        <div className="sticky top-0 box-border h-[100svh] pt-[var(--story-nav-height)] pb-3">
          <div className="mx-auto flex h-full w-full max-w-7xl flex-col gap-3 px-5 md:px-8 lg:px-16">
            <div className="relative min-h-0 flex-1">
              <div
                ref={trackRef}
                className="story-slide-track flex h-full w-[300%] will-change-transform"
              >
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className="flex h-full w-1/3 shrink-0 items-center justify-center px-1"
                  >
                    <div className="max-h-full w-full max-w-4xl">{slide}</div>
                  </div>
                ))}
              </div>
            </div>
            {controls}
          </div>
        </div>
      ) : (
        <FadeUp className="grid grid-cols-1 gap-6" stagger={0.1}>
          {slides.map((slide, index) => (
            <div
              key={index}
              ref={(element) => {
                slideRefs.current[index] = element;
              }}
            >
              {slide}
            </div>
          ))}
          {controls}
        </FadeUp>
      )}
    </div>
  );
};
