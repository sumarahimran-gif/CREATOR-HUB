import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { ChromeMedallion } from './ChromeMedallion';
import { ThreeCanvas } from './ThreeCanvas';
import { soundFx } from '../utils/audio';
import { PrimaryCta, SecondaryCta } from './CtaButtons';

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
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const [shockwave, setShockwave] = useState<boolean>(false);
  const [showSweep, setShowSweep] = useState<boolean>(false);
  const [logoPulse, setLogoPulse] = useState<boolean>(false);

  // Interactive mouse parallax offset (-1 to 1)
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

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

  // Handle medallion click: tactile sound + lavender shockwave ripple
  const handleMedallionClick = () => {
    soundFx.playAction();
    setShockwave(true);
    setLogoPulse(true);
    setTimeout(() => {
      setShockwave(false);
      setLogoPulse(false);
    }, 850);
    if (onLogoClick) onLogoClick();
  };

  const handleScrollCueClick = () => {
    soundFx.playTick();
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' });
    }
  };

  // Scroll-out transforms across the first 60% of the hero height
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const headlineScrollOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const headlineScrollY = useTransform(scrollYProgress, [0, 0.6], [0, -40]);
  const headlineScrollBlur = useTransform(scrollYProgress, [0, 0.6], [0, 6]);
  const headlineScrollFilter = useTransform(headlineScrollBlur, (b) => `blur(${b}px)`);

  const medallionScrollScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.85]);
  const glowScrollOpacity = useTransform(scrollYProgress, [0, 0.6], [0.35, 0.05]);

  // Timing constants (ease [0.16, 1, 0.3, 1] throughout)
  const EXPO_OUT = [0.16, 1, 0.3, 1] as const;

  const creatorLetters = ['C', 'R', 'E', 'A', 'T', 'O', 'R'];
  const hubLetters = ['H', 'U', 'B', '.'];

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-[100svh] min-h-[100svh] w-full bg-ink text-paper flex flex-col items-center justify-center gap-[clamp(16px,3.2vh,48px)] px-4 sm:px-8 lg:px-14 pt-[104px] pb-2 overflow-hidden perspective-1000"
    >
      {/* 1. Three.js Background Canvas with Interactive Mouse Particle Parallax */}
      <ThreeCanvas />

      {/* 2. Soft Ambient Breathing Lavender Nebula Behind Logo */}
      <motion.div
        style={{ opacity: glowScrollOpacity }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ repeat: Infinity, duration: 4.8, ease: 'easeInOut' }}
        className="absolute inset-0 pointer-events-none z-0"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[320px] bg-lav/10 blur-[130px] rounded-full pointer-events-none" />
      </motion.div>

      {/* 3. Main Lockup Container (Fades and lifts on scroll-out) */}
      <motion.div
        style={{
          opacity: headlineScrollOpacity,
          y: headlineScrollY,
          filter: headlineScrollFilter,
        }}
        className="relative w-full mx-auto flex flex-col items-center gap-[clamp(16px,3.2vh,48px)] z-10"
      >
        {/* Single H1 for SEO and screen readers, content in DOM from first render */}
        <h1 className="relative flex w-full md:w-max max-w-[92vw] flex-col items-center justify-center gap-2 md:flex-row md:gap-[clamp(16px,2.4vw,48px)] mx-auto">
          <span className="sr-only">CREATOR HUB</span>

          {/* Left Wing: CREATOR (Unfolds with 35ms letter stagger + 3D mouse parallax) */}
          <motion.div
            aria-hidden="true"
            animate={{
              x: 0,
              y: mouseOffset.y * -4,
            }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
            className="relative order-2 flex min-w-0 max-w-full flex-col items-center text-center z-10 md:order-1 md:items-start md:text-left"
          >
            <motion.div
              initial={{ opacity: 0, letterSpacing: '0.12em' }}
              animate={{ opacity: 1, letterSpacing: '-0.035em' }}
              transition={{
                duration: 1.1,
                ease: EXPO_OUT,
              }}
              className="relative inline-flex items-center overflow-visible"
            >
              <div className="flex items-center">
                {creatorLetters.map((char, i) => (
                  <motion.span
                    key={`creator-char-${i}`}
                    initial={{ opacity: 0, x: 65, filter: 'blur(12px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    transition={
                      shouldReduceMotion
                        ? { duration: 0.4 }
                        : {
                            duration: 1.0,
                            delay: i * 0.035,
                            ease: EXPO_OUT,
                          }
                    }
                    className="font-editorial font-black text-[clamp(2.5rem,5.4vw,7rem)] tracking-tight text-paper leading-none inline-block select-text"
                  >
                    {char}
                  </motion.span>
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

            {/* Small Label: OPERATING SYSTEM (Fades in with tracking tightening from 0.5em to 0.25em) */}
            <motion.div
              initial={{ opacity: 0, letterSpacing: '0.5em' }}
              animate={{ opacity: 1, letterSpacing: '0.25em' }}
              transition={
                shouldReduceMotion
                  ? { duration: 0.4 }
                  : {
                      duration: 0.8,
                      delay: 0.7,
                      ease: EXPO_OUT,
                    }
              }
              className="block max-w-full select-text text-left md:absolute md:top-full md:mt-3"
            >
              <span className="max-w-full break-words text-[clamp(7px,0.65vw,12px)] font-tech font-normal uppercase leading-tight tracking-[0.08em] text-lav">
                — Operating System
              </span>
            </motion.div>
          </motion.div>

          {/* Central Medallion Anchor (z-20 so letters unfold from behind it + 3D Tilt Tracking) */}
          <motion.div
            style={{ scale: medallionScrollScale }}
            animate={{
              x: 0,
              y: mouseOffset.y * 6,
              rotateY: mouseOffset.x * 8,
              rotateX: -mouseOffset.y * 8,
            }}
            transition={{ type: 'spring', stiffness: 140, damping: 20 }}
            className="relative order-1 z-20 shrink-0 transform-style-3d md:order-2"
          >
            {/* Medallion Scale (0.88 to 1) & 1.5° Tilt Settling */}
            <motion.div
              initial={{ scale: 0.88, rotate: -1.5, opacity: 0.8 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0.4 }
                  : {
                      scale: { duration: 1.0, delay: 0.3, ease: EXPO_OUT },
                      rotate: { duration: 1.0, delay: 0.3, ease: EXPO_OUT },
                      opacity: { duration: 0.8, delay: 0.2 },
                    }
              }
            >
              {/* Independent 6s Floating Levitation */}
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
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
                  className="cursor-pointer group relative flex flex-col items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-lav p-1"
                  title="Creator Hub Medallion — Click to interact"
                  aria-label="Creator Hub Medallion"
                >
                  {/* Single Lavender Ring Shockwave & Light Bloom on Click */}
                  {shockwave && (
                    <>
                      <motion.span
                        initial={{ scale: 0.85, opacity: 0.95 }}
                        animate={{ scale: 2.8, opacity: 0 }}
                        transition={{ duration: 0.85, ease: EXPO_OUT }}
                        className="absolute inset-0 rounded-full border-2 border-lav shadow-[0_0_50px_rgba(184,164,244,0.9)] pointer-events-none z-30"
                      />
                      <motion.span
                        initial={{ scale: 0.9, opacity: 0.8 }}
                        animate={{ scale: 2.2, opacity: 0 }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        className="absolute inset-0 rounded-full bg-lav/40 blur-2xl pointer-events-none z-30"
                      />
                    </>
                  )}

                  {/* Reactive pulse on logo clicks */}
                  {logoPulse && (
                    <motion.span
                      initial={{ scale: 0.85, opacity: 0.95 }}
                      animate={{ scale: 1.7, opacity: 0 }}
                      transition={{ duration: 0.65, ease: EXPO_OUT }}
                      className="absolute inset-0 rounded-full border-2 border-lav shadow-[0_0_40px_rgba(184,164,244,0.85)] pointer-events-none z-30"
                    />
                  )}

                  <ChromeMedallion size="clamp(90px, 12vw, 230px)" className="transition-transform duration-300" />
                </button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Wing: HUB. (Unfolds with 35ms letter stagger + 3D mouse parallax) */}
          <motion.div
            aria-hidden="true"
            animate={{
              x: 0,
              y: mouseOffset.y * -4,
            }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
            className="relative order-3 flex min-w-0 max-w-full flex-col items-center text-center z-10 md:items-end md:text-right"
          >
            {/* Small Label: SCALE • RETENTION (Fades in with tracking tightening) */}
            <motion.span
              initial={{ opacity: 0, letterSpacing: '0.5em' }}
              animate={{ opacity: 1, letterSpacing: '0.25em' }}
              transition={
                shouldReduceMotion
                  ? { duration: 0.4 }
                  : {
                      duration: 0.8,
                      delay: 0.7,
                      ease: EXPO_OUT,
                    }
              }
              className="block max-w-full break-words text-right text-[clamp(7px,0.65vw,12px)] font-tech font-normal uppercase leading-tight tracking-[0.08em] text-lav md:absolute md:bottom-full md:mb-3 md:right-0"
            >
              SCALE · RETENTION —
            </motion.span>

            <motion.div
              initial={{ opacity: 0, letterSpacing: '0.12em' }}
              animate={{ opacity: 1, letterSpacing: '-0.035em' }}
              transition={{
                duration: 1.1,
                ease: EXPO_OUT,
              }}
              className="relative inline-flex items-center overflow-visible"
            >
              <div className="flex items-center">
                {hubLetters.map((char, i) => (
                  <motion.span
                    key={`hub-char-${i}`}
                    initial={{ opacity: 0, x: -65, filter: 'blur(12px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    transition={
                      shouldReduceMotion
                        ? { duration: 0.4 }
                        : {
                            duration: 1.0,
                            delay: i * 0.035,
                            ease: EXPO_OUT,
                          }
                    }
                    className="font-editorial font-black text-[max(2.4rem,calc(clamp(2.5rem,5.4vw,7rem)-0.9vw))] tracking-tight text-paper leading-none inline-block select-text"
                  >
                    {char}
                  </motion.span>
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
          </motion.div>
        </h1>

        {/* Thin 1px Lavender Line (scaleX 0 to 1, 0.9s duration) */}
        <div className="w-full max-w-xl mx-auto overflow-hidden">
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={
              shouldReduceMotion
                ? { duration: 0.4 }
                : {
                    duration: 0.9,
                    delay: 0.7,
                    ease: EXPO_OUT,
                  }
            }
            className="h-[1px] bg-lav/30 w-full origin-center"
          />
        </div>

        {/* Main Headline revealed LINE BY LINE in overflow-hidden masks (90ms stagger) */}
        <div className="w-full text-center max-w-2xl mx-auto space-y-1 z-20">
          <h2 className="font-editorial font-bold text-base sm:text-xl md:text-2xl text-paper tracking-tight leading-snug">
            {/* Line 1 */}
            <div className="overflow-hidden pb-0.5">
              <motion.span
                initial={{ y: '100%', opacity: 0, filter: 'blur(6px)' }}
                animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0.4 }
                    : {
                        duration: 0.75,
                        delay: 0.9,
                        ease: EXPO_OUT,
                      }
                }
                className="inline-block"
              >
                Build your channel alongside creators
              </motion.span>
            </div>

            {/* Line 2 (90ms stagger) */}
            <div className="overflow-hidden pb-0.5">
              <motion.span
                initial={{ y: '100%', opacity: 0, filter: 'blur(6px)' }}
                animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0.4 }
                    : {
                        duration: 0.75,
                        delay: 0.99,
                        ease: EXPO_OUT,
                      }
                }
                className="inline-block"
              >
                who are actively building theirs.
              </motion.span>
            </div>
          </h2>

          {/* Paragraph (y 16 to 0, opacity 0 to 1, blur 6px to 0) */}
          <motion.p
            initial={{ y: 16, opacity: 0, filter: 'blur(6px)' }}
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            transition={
              shouldReduceMotion
                ? { duration: 0.4 }
                : {
                    duration: 0.7,
                    delay: 1.2,
                    ease: EXPO_OUT,
                  }
            }
            className="text-sm sm:text-base text-paper-dim font-sans leading-relaxed pt-2"
          >
            Creator Hub is a structured private community for creators committed to YouTube Automation. Receive practical guidance, valuable resources, proven workflows, and access to a network of individuals working toward similar goals.
          </motion.p>
        </div>

        {/* Action CTAs: Gap 14px between buttons. Side by side from 640px up. Stacked full-width below 640px, with primary on top. Enter last in hero timeline (100ms apart), rising y 14 to 0 with fade */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-[14px] w-full sm:w-auto max-w-sm sm:max-w-none mx-auto z-20">
          <motion.div
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={
              shouldReduceMotion
                ? { duration: 0.4 }
                : {
                    duration: 0.6,
                    delay: 1.4,
                    ease: EXPO_OUT,
                  }
            }
            className="w-full sm:w-auto"
          >
            <PrimaryCta
              onClick={onOpenApply}
              label="Request Access"
              className="w-full sm:w-auto"
            />
          </motion.div>

          <motion.div
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={
              shouldReduceMotion
                ? { duration: 0.4 }
                : {
                    duration: 0.6,
                    delay: 1.5,
                    ease: EXPO_OUT,
                  }
            }
            className="w-full sm:w-auto"
          >
            <SecondaryCta
              onClick={onOpenContact}
              label="Contact Us"
              className="w-full sm:w-auto"
            />
          </motion.div>
        </div>

        {/* Hero Disclaimer (Opacity only fade) */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={
            shouldReduceMotion
              ? { duration: 0.4 }
              : {
                  duration: 0.5,
                  delay: 1.65,
                }
          }
          className="text-xs text-paper-dim font-tech text-center max-w-lg mx-auto leading-relaxed tracking-wider z-20"
        >
          No misleading guarantees or promises of overnight success. Practical guidance, resources, and continuous execution.
        </motion.p>
      </motion.div>

      {/* Quiet Scroll Cue Button (Continuous floating bounce prompt) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={
          shouldReduceMotion
            ? { duration: 0.4 }
            : {
                duration: 0.5,
                delay: 1.8,
              }
        }
        className="w-full flex justify-center z-20"
      >
        <button
          type="button"
          aria-label="Scroll to explore"
          onClick={handleScrollCueClick}
          className="flex flex-col items-center gap-1 cursor-pointer group bg-transparent border-none p-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-lav"
        >
          <span className="text-[10px] font-tech tracking-[0.3em] text-paper-dim group-hover:text-lav uppercase transition-colors">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
            className="w-6 h-6 rounded-full border border-ink-3 flex items-center justify-center bg-ink-2/80 group-hover:border-lav/50 transition-colors"
          >
            <ArrowDown className="w-3 h-3 text-paper-dim group-hover:text-lav transition-colors" />
          </motion.div>
        </button>
      </motion.div>

    </section>
  );
};
