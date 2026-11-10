import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { ChromeMedallion } from './ChromeMedallion';
import { PressFeedbackButton } from './PressFeedbackButton';
import { ThreeCanvas } from './ThreeCanvas';
import { soundFx } from '../utils/audio';
import { PrimaryCta, SecondaryCta } from './CtaButtons';
import { useImageViewer } from './ImageViewer';
import { RevealText } from './RevealText';
import { FadeUp } from './FadeUp';
import logoSrc from '../assets/images/logo-hero-500.webp';

interface HeroScrollStoryboardProps {
  onOpenApply: () => void;
  onOpenContact: () => void;
  onNavbarShow?: () => void;
  onLogoClick?: () => void;
}

export const HeroScrollStoryboard: React.FC<HeroScrollStoryboardProps> = ({
  onOpenApply,
  onOpenContact,
  onLogoClick,
}) => {
  const { openImage } = useImageViewer();
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const beamRef = useRef<HTMLSpanElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);

  const [shockwave, setShockwave] = useState<boolean>(false);
  const [showSweep, setShowSweep] = useState<boolean>(false);
  const [logoPulse, setLogoPulse] = useState<boolean>(false);

  // Interactive mouse parallax offset (-1 to 1)
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateProgress = () => {
      const spacer = sectionRef.current;
      if (!spacer) return;

      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const rect = spacer.getBoundingClientRect();
      const scrollDistance = Math.max(0, rect.height - window.innerHeight);
      const progress = reducedMotion || scrollDistance === 0
        ? 1
        : Math.min(1, Math.max(0, -rect.top) / scrollDistance);

      if (beamRef.current) {
        beamRef.current.style.height = reducedMotion || progress > 0.8 ? '64px' : '0px';
      }
      if (scrollCueRef.current) {
        scrollCueRef.current.style.opacity = reducedMotion || progress <= 0.05 ? '1' : '0';
      }
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  // Entrance sweep at 2.0s, then repeating every 7.5s
  useEffect(() => {
    if (shouldReduceMotion) return;

    const initialSweep = setTimeout(() => {
      setShowSweep(true);
      setTimeout(() => setShowSweep(false), 1400);
    }, 2000);

    const interval = setInterval(() => {
      setShowSweep(true);
      setTimeout(() => setShowSweep(false), 1400);
    }, 7500);

    return () => {
      clearTimeout(initialSweep);
      clearInterval(interval);
    };
  }, [shouldReduceMotion]);

  // Handle medallion click: tactile sound + blue shockwave ripple
  const handleMedallionClick = () => {
    soundFx.playAction();
    if (!shouldReduceMotion) {
      setShockwave(true);
      setLogoPulse(true);
      setTimeout(() => {
        setShockwave(false);
        setLogoPulse(false);
      }, 850);
    }
    openImage({ src: logoSrc, alt: 'Creator Hub chrome medallion logo', width: 500, height: 500 });
    if (onLogoClick) onLogoClick();
  };

  const handleScrollCueClick = () => {
    soundFx.playTick();
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth' });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.9, behavior: shouldReduceMotion ? 'auto' : 'smooth' });
    }
  };

  // Scroll-out transforms across the first 60% of the hero height
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const glowScrollOpacity = useTransform(scrollYProgress, [0, 0.6], [0.35, 0.05]);

  // Timing constants (ease [0.16, 1, 0.3, 1] throughout)
  const EXPO_OUT = [0.16, 1, 0.3, 1] as const;

  const creatorLetters = ['C', 'R', 'E', 'A', 'T', 'O', 'R'];
  const hubLetters = ['H', 'U', 'B', '.'];

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="hero-scroll-spacer relative h-[250vh]"
    >
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="hero-section sticky top-0 box-border h-[100svh] w-full bg-ink text-paper flex flex-col items-center justify-center gap-2 px-5 md:px-8 lg:px-16 pb-2 overflow-hidden perspective-1000"
      >
      {/* 1. Three.js Background Canvas with Interactive Mouse Particle Parallax */}
      <ThreeCanvas />

      {/* 2. Soft Ambient Breathing Lavender Nebula Behind Logo */}
      <motion.div
        style={{ opacity: shouldReduceMotion ? 0.3 : glowScrollOpacity }}
        animate={
          shouldReduceMotion
            ? { scale: 1, opacity: 0.3 }
            : { scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }
        }
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { repeat: Infinity, duration: 4.8, ease: 'easeInOut' }
        }
        className="absolute inset-0 pointer-events-none z-0"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[320px] bg-white/[0.04] blur-[130px] rounded-full pointer-events-none" />
      </motion.div>

      {/* 3. Main Lockup Container (Fades and lifts on scroll-out) */}
      <motion.div
        className="hero-lockup relative mx-auto w-full max-w-7xl flex flex-col items-center gap-[clamp(8px,1.5vh,16px)] z-10"
      >
        <div className="hero-headline-group flex w-max max-w-[94vw] flex-col items-center gap-2">
        {/* Single H1 for SEO and screen readers, content in DOM from first render */}
        <h1 className="hero-headline-row relative m-0 flex w-max max-w-full flex-row flex-nowrap items-center justify-center gap-[clamp(12px,1.5vw,24px)]">
          <span className="sr-only">Creator Hub – Private YouTube Automation Community</span>

          {/* Left Wing: CREATOR (Unfolds with 35ms letter stagger + 3D mouse parallax) */}
          <div aria-hidden="true" className="relative order-1 z-10">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, x: -34 }}
              animate={{ opacity: 1, x: 0 }}
              transition={shouldReduceMotion ? { duration: 0.01 } : { duration: 0.55, ease: 'easeOut' }}
              className="hero-entrance-word relative inline-flex items-center"
            >
              <div className="flex items-center">
                {creatorLetters.map((char, i) => (
                  <span
                    key={`creator-char-${i}`}
                    className="hero-headline-word font-editorial font-bold tracking-[-0.02em] text-paper leading-[1.1] inline-block select-text"
                  >
                    {char}
                  </span>
                ))}
              </div>

              {/* Soft Ambient Light Sweep across typography */}
              {showSweep && (
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '250%' }}
                  transition={{ duration: 1.4, ease: EXPO_OUT }}
                  className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/[0.14] to-transparent w-1/2 skew-x-[-20deg]"
                />
              )}
            </motion.div>
          </div>

          {/* Central Medallion Anchor (z-20 so letters unfold from behind it + 3D Tilt Tracking) */}
          <div className="relative order-2 z-20 shrink-0">
          <motion.div
            animate={
              shouldReduceMotion
                ? { x: 0, y: 0 }
                : {
                    x: 0,
                    y: mouseOffset.y * 6,
                    rotateY: mouseOffset.x * 8,
                    rotateX: -mouseOffset.y * 8,
                }
            }
            transition={shouldReduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 140, damping: 20 }}
            className="transform-style-3d"
          >
            {/* Medallion Scale (0.88 to 1) & 1.5° Tilt Settling */}
            <motion.div
              initial={shouldReduceMotion ? false : { scale: 0.88, rotate: -1.5, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : {
                      scale: { duration: 0.6, delay: 0.08, ease: EXPO_OUT },
                      rotate: { duration: 0.6, delay: 0.08, ease: EXPO_OUT },
                      opacity: { duration: 0.6, delay: 0.08 },
                    }
              }
            >
              {/* Independent 6s Floating Levitation */}
              <motion.div
                animate={shouldReduceMotion ? { y: 0 } : { y: [0, -7, 0] }}
                transition={shouldReduceMotion ? { duration: 0 } : { repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                className="flex flex-col items-center justify-center"
              >
                {/* Interactive button supporting click, Enter, and Space */}
                <button
                  type="button"
                  onClick={handleMedallionClick}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleMedallionClick();
                    }
                  }}
                  className="cursor-pointer group relative flex flex-col items-center justify-center rounded-full outline-none p-1"
                  title="Creator Hub Medallion — Click to interact"
                  aria-label="Creator Hub Medallion"
                >
                  {/* Single blue ring shockwave and subtle neutral bloom on click */}
                  {shockwave && (
                    <>
                      <motion.span
                        initial={{ scale: 0.85, opacity: 0.475 }}
                        animate={{ scale: 2.8, opacity: 0 }}
                        transition={{ duration: 0.85, ease: EXPO_OUT }}
                        className="absolute inset-0 rounded-full border-2 border-lav shadow-[0_8px_24px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.12)] pointer-events-none z-30"
                      />
                      <motion.span
                        initial={{ scale: 0.9, opacity: 0.4 }}
                        animate={{ scale: 2.2, opacity: 0 }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        className="absolute inset-0 rounded-full bg-white/10 blur-2xl pointer-events-none z-30"
                      />
                    </>
                  )}

                  {/* Reactive pulse on logo clicks */}
                  {logoPulse && (
                    <motion.span
                      initial={{ scale: 0.85, opacity: 0.475 }}
                      animate={{ scale: 1.7, opacity: 0 }}
                      transition={{ duration: 0.65, ease: EXPO_OUT }}
                      className="absolute inset-0 rounded-full border-2 border-lav shadow-[0_8px_24px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.12)] pointer-events-none z-30"
                    />
                  )}

                  <ChromeMedallion size="clamp(72px, min(12vw, 21vh), 230px)" className="hero-medallion transition-transform duration-300" />
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
          </div>

          {/* Right Wing: HUB. (Unfolds with 35ms letter stagger + 3D mouse parallax) */}
          <div aria-hidden="true" className="relative order-3 z-10">
            {/* Small Label: SCALE • RETENTION (Fades in with tracking tightening) */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, x: 34 }}
              animate={{ opacity: 1, x: 0 }}
              transition={shouldReduceMotion ? { duration: 0.01 } : { duration: 0.55, ease: 'easeOut' }}
              className="hero-entrance-word relative inline-flex items-center"
            >
              <div className="flex items-center">
                {hubLetters.map((char, i) => (
                  <span
                    key={`hub-char-${i}`}
                    className="hero-headline-word font-editorial font-bold tracking-[-0.02em] text-paper leading-[1.1] inline-block select-text"
                  >
                    {char}
                  </span>
                ))}
              </div>

              {/* Soft Ambient Light Sweep across typography */}
              {showSweep && (
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '250%' }}
                  transition={{ duration: 1.4, ease: EXPO_OUT }}
                  className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/[0.14] to-transparent w-1/2 skew-x-[-20deg]"
                />
              )}
            </motion.div>
          </div>
        </h1>

        <div className="hero-headline-labels flex w-full items-center justify-between">
          <motion.span
            initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0.01 } : { duration: 0.6, ease: EXPO_OUT }}
            className="font-tech text-[clamp(7px,0.65vw,12px)] font-normal uppercase leading-tight tracking-[0.08em] text-lav"
          >
            — Operating System
          </motion.span>
          <motion.span
            initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0.01 } : { duration: 0.6, ease: EXPO_OUT }}
            className="font-tech text-[clamp(7px,0.65vw,12px)] font-normal uppercase leading-tight tracking-[0.08em] text-lav"
          >
            SCALE · RETENTION —
          </motion.span>
        </div>
        </div>

        {/* Main Headline */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? { duration: 0.01 } : { duration: 0.6, delay: 0.18, ease: 'easeOut' }}
          className="hero-entrance-caption w-full text-center max-w-2xl mx-auto space-y-1 z-20"
        >
          <RevealText
            text="Build your channel alongside creators who are actively building theirs."
            lines={[
              'Build your channel alongside creators',
              'who are actively building theirs.',
            ]}
            as="h2"
            delay={0.16}
            duration={0.6}
            className="font-editorial font-bold text-base sm:text-xl md:text-2xl text-paper tracking-[-0.02em] leading-snug"
          />

          {/* Paragraph */}
          <motion.p
            className="text-sm sm:text-base text-paper-dim font-sans leading-relaxed pt-2"
          >
            Creator Hub is a structured private community for creators committed to YouTube Automation. Receive practical guidance, valuable resources, proven workflows, and access to a network of individuals working toward similar goals.
          </motion.p>
        </motion.div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-[14px] w-full sm:w-auto max-w-sm sm:max-w-none mx-auto z-20">
          <div className="w-full sm:w-auto">
            <PrimaryCta
              onClick={onOpenApply}
              label="Request Access"
              className="w-full sm:w-auto"
            />
          </div>

          <div className="w-full sm:w-auto">
            <SecondaryCta
              onClick={onOpenContact}
              label="Contact Us"
              className="w-full sm:w-auto"
            />
          </div>
        </div>

        {/* Hero Disclaimer (Opacity only fade) */}
        <FadeUp>
          <p className="text-xs text-paper-dim font-tech text-center max-w-lg mx-auto leading-relaxed tracking-wider z-20">
            No misleading guarantees or promises of overnight success. Practical guidance, resources, and continuous execution.
          </p>
        </FadeUp>
      </motion.div>

      <div className="hero-scroll-beam-wrap pointer-events-none absolute bottom-14 left-1/2 flex h-16 -translate-x-1/2 justify-center" aria-hidden="true">
        <span ref={beamRef} className="hero-scroll-beam" />
      </div>

      {/* Quiet Scroll Cue Button (Continuous floating bounce prompt) */}
      <div
        ref={scrollCueRef}
        className="hero-scroll-cue absolute bottom-2 left-0 right-0 flex w-full justify-center z-20"
      >
        <PressFeedbackButton
          size="row"
          type="button"
          aria-label="Scroll to explore"
          onClick={handleScrollCueClick}
          className="flex flex-col items-center gap-1 cursor-pointer group bg-transparent border-none p-1 focus:outline-none"
        >
          <span className="text-[10px] font-tech tracking-[0.3em] text-paper-dim group-hover:text-lav uppercase transition-colors">
            Scroll
          </span>
          <span className="hero-scroll-dot-track" aria-hidden="true">
            <span className="hero-scroll-dot" />
          </span>
        </PressFeedbackButton>
      </div>

      </div>
    </section>
  );
};
