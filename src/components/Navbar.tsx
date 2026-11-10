import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Volume2, VolumeX, Menu, X } from 'lucide-react';
import { soundFx } from '../utils/audio';
import { RequestAccessPill } from './RequestAccessPill';
import { PressFeedbackButton } from './PressFeedbackButton';
import { PressFeedbackLink } from './PressFeedbackLink';
import logoSrc from '../assets/images/logo-nav-80.webp';

interface NavbarProps {
  onOpenApply: () => void;
  onOpenContact: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onLogoClick?: () => void;
  visible?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenApply,
  onOpenContact,
  soundEnabled,
  onToggleSound,
  onLogoClick,
  visible = true,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [isScrolled, setIsScrolled] = useState(false);
  const shouldReduceMotion =
    useReducedMotion() ??
    (typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const menuButtonRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const wasMenuOpen = useRef(false);
  const shouldRestoreMenuFocus = useRef(true);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'What You Get', href: '#what-you-get' },
    { label: "Who It's For", href: '#who-its-for' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) {
      if (wasMenuOpen.current) {
        const menuButton = menuButtonRef.current?.querySelector<HTMLButtonElement>('button');
        if (shouldRestoreMenuFocus.current && menuButton?.offsetParent !== null) {
          menuButton?.focus();
        }
        shouldRestoreMenuFocus.current = true;
        wasMenuOpen.current = false;
      }
      return;
    }

    wasMenuOpen.current = true;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    drawerRef.current?.querySelector<HTMLElement>('button, a[href]')?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setMobileMenuOpen(false);
        return;
      }

      if (event.key !== 'Tab' || !drawerRef.current) return;
      const focusable = Array.from(
        drawerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.offsetParent !== null);
      if (focusable.length === 0) {
        event.preventDefault();
        drawerRef.current.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!drawerRef.current.contains(document.activeElement)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileMenuOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const sections = navLinks
      .map((link) => ({
        href: link.href,
        element: document.getElementById(link.href.slice(1)),
      }))
      .filter((section): section is { href: string; element: HTMLElement } => Boolean(section.element));

    const updateActiveSection = () => {
      const hero = document.getElementById('hero');
      const heroBounds = hero?.getBoundingClientRect();
      const isHeroVisible = Boolean(
        heroBounds && heroBounds.bottom > 0 && heroBounds.top < window.innerHeight,
      );
      if (isHeroVisible) {
        setActiveSection((current) => (current ? '' : current));
        return;
      }

      const activationLine = window.innerHeight * 0.4;
      const activeSection = sections.find(({ element }) => {
        const bounds = element.getBoundingClientRect();
        return bounds.top <= activationLine + 1 && bounds.bottom > activationLine - 1;
      });
      const isAtPageBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 1;
      const nextActiveSection = activeSection?.href ?? (isAtPageBottom ? navLinks[navLinks.length - 1].href : '');
      setActiveSection((current) => (current === nextActiveSection ? current : nextActiveSection));
    };

    const updateObservedSections = () => {
      observer?.disconnect();
      const activationLine = window.innerHeight * 0.4;
      const sectionObserver = new IntersectionObserver(
        updateActiveSection,
        {
          rootMargin: `-${Math.max(0, activationLine - 1)}px 0px -${Math.max(0, window.innerHeight - activationLine - 1)}px 0px`,
          threshold: 0,
        },
      );

      observer = sectionObserver;
      sections.forEach(({ element }) => sectionObserver.observe(element));
    };

    let observer: IntersectionObserver | null = null;
    updateObservedSections();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateObservedSections);
    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateObservedSections);
      observer?.disconnect();
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    soundFx.playTick();
    setMobileMenuOpen(false);
    try {
      window.history.pushState(null, '', href);
    } catch {
      window.location.hash = href;
    }

    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth', block: 'start' });
    }
  };

  return (
    <>
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: visible ? 0 : -100 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-40 border-b transition-[background-color,backdrop-filter,border-color] duration-[250ms] ease-out lg:h-[88px] ${
        isScrolled
          ? 'bg-[rgba(11,12,14,0.72)] backdrop-blur-[12px] border-line'
          : 'bg-transparent backdrop-blur-none border-transparent'
      }`}
    >
      <div className="mx-auto flex h-20 w-full max-w-[1920px] items-center justify-between gap-3 px-4 sm:px-8 lg:h-[88px] lg:gap-3 lg:px-4 xl:gap-4 xl:px-8">
        
        {/* Brand Logo & Title */}
        <div className="flex shrink-0 items-center gap-3">
          <PressFeedbackLink
            origin="center"
            inlineFlex
            href="#"
            onClick={(e) => {
              e.preventDefault();
              soundFx.playTick();
              window.scrollTo({ top: 0, behavior: 'auto' });
              if (onLogoClick) onLogoClick();
            }}
            className="group relative flex cursor-pointer items-center gap-3 whitespace-nowrap p-1 outline-none"
          >
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-lav/40 bg-ink-2 p-0.5 shadow-[0_8px_24px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.12)] transition-all group-hover:border-lav xl:h-[52px] xl:w-[52px]">
              {/* Soft neutral ambient halo */}
              <div className="absolute -inset-1 rounded-full bg-white/5 blur-[6px] pointer-events-none group-hover:bg-white/10 transition-all" />

              <img
                src={logoSrc}
                alt="Creator Hub Logo"
                width={80}
                height={80}
                className="w-full h-full object-cover rounded-full relative z-10"
              />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-editorial font-bold text-sm sm:text-base lg:text-sm xl:text-base text-paper tracking-widest uppercase">
                  Creator Hub
                </span>
                <span className="inline font-tech text-xs text-lav tracking-wider lg:hidden xl:inline">
                  (YT Automation)
                </span>
              </div>
              <span className="mt-[-2px] hidden text-[9px] font-tech uppercase tracking-[0.25em] text-paper-dim 2xl:block">
                Private YouTube Automation Community
              </span>
            </div>
          </PressFeedbackLink>
        </div>

        {/* Desktop Navigation Links with Active Highlight */}
        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-3 px-2 lg:flex xl:gap-[18px] xl:px-2 2xl:gap-8" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <PressFeedbackLink
                origin="center"
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative shrink-0 whitespace-nowrap py-2 font-tech text-[11px] uppercase tracking-[0.14em] transition-colors 2xl:text-xs ${
                  isActive
                    ? 'group font-bold text-lav'
                    : 'group text-paper-dim hover:text-lav'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-lav"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.25, ease: 'easeOut' }}
                  />
                )}
                {!isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-lav transition-transform duration-[250ms] ease-out group-hover:scale-x-100 motion-reduce:transition-none"
                  />
                )}
              </PressFeedbackLink>
            );
          })}
        </nav>

        {/* Right Action Buttons with exact 10px spacing and rounded-full pill styling */}
        <div className="flex shrink-0 items-center gap-[10px] lg:gap-2 xl:gap-3">
          {/* Sound Synthesizer Toggle (44px x 44px, fully rounded-full, 8% white bg, 10% border, paper-dim icon) */}
          <PressFeedbackButton
            size="sm"
            onClick={onToggleSound}
            className="w-[44px] h-[44px] rounded-full bg-white/[0.08] border border-white/10 text-paper-dim hover:bg-white/[0.14] hover:text-white flex items-center justify-center shrink-0 transition-colors cursor-pointer outline-none"
            title={soundEnabled ? 'Disable Tactile Sound FX' : 'Enable Tactile Sound FX'}
            aria-label="Toggle Sound Effects"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-lav" />
            ) : (
              <VolumeX className="w-4 h-4 text-paper-dim" />
            )}
          </PressFeedbackButton>

          {/* Request Access Pill (Desktop: 48px, Mobile/Tablet: 44px) */}
          <div className="hidden lg:block">
            <RequestAccessPill onClick={onOpenApply} size="desktop" className="lg:gap-2 lg:pl-3 xl:gap-3 xl:pl-5" />
          </div>
          <div className="lg:hidden">
            <RequestAccessPill onClick={onOpenApply} size="mobile" />
          </div>

          {/* Mobile Menu Hamburger (44px x 44px, fully rounded-full, 8% white bg, 10% border, paper-dim icon) */}
          <div className="lg:hidden" ref={menuButtonRef}>
            <PressFeedbackButton
              size="sm"
              onClick={() => {
                soundFx.playTick();
                setMobileMenuOpen((isOpen) => !isOpen);
              }}
              className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.08] text-paper-dim transition-colors hover:bg-white/[0.14] hover:text-white cursor-pointer outline-none"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
              aria-controls={mobileMenuOpen ? 'mobile-menu' : undefined}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5" />}
            </PressFeedbackButton>
          </div>
        </div>
      </div>

    </motion.header>
    <AnimatePresence>
      {mobileMenuOpen && (
        <motion.div
          className="fixed inset-0 z-50 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.25, ease: 'easeOut' }}
          onClick={(event) => {
            if (event.target === event.currentTarget) setMobileMenuOpen(false);
          }}
        >
          <div
            className="absolute inset-0 bg-black/60"
            aria-hidden="true"
            onClick={() => setMobileMenuOpen(false)}
          />
          <motion.div
            ref={drawerRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            tabIndex={-1}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.25, ease: 'easeOut' }}
            className="absolute right-0 top-0 flex h-full w-[min(88vw,24rem)] flex-col overflow-y-auto border-l border-ink-3 bg-ink-2 px-5 pb-6 pt-5 shadow-2xl"
          >
            <div className="mb-4 flex min-h-12 items-center justify-end">
              <button
                type="button"
                onClick={() => {
                  soundFx.playTick();
                  setMobileMenuOpen(false);
                }}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.08] text-paper-dim transition-colors hover:bg-white/[0.14] hover:text-white"
                aria-label="Close Navigation Menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex flex-col" aria-label="Mobile Navigation">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <PressFeedbackLink
                    origin="center"
                    key={link.label}
                    href={link.href}
                    onClick={(event) => handleNavClick(event, link.href)}
                    className={`relative flex min-h-12 items-center border-b border-ink-3 px-4 py-3 text-sm font-tech uppercase tracking-widest transition-colors ${
                      isActive ? 'group font-bold text-lav' : 'group text-paper-dim hover:text-paper'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        className="absolute bottom-0 left-4 right-4 h-[2px] origin-left bg-lav"
                        transition={{ duration: shouldReduceMotion ? 0 : 0.25, ease: 'easeOut' }}
                      />
                    )}
                    {!isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute bottom-0 left-4 right-4 h-[2px] origin-left scale-x-0 bg-lav transition-transform duration-[250ms] ease-out group-hover:scale-x-100 motion-reduce:transition-none"
                      />
                    )}
                  </PressFeedbackLink>
                );
              })}
            </nav>

            <div className="mt-5 flex flex-col gap-3">
              <PressFeedbackButton
                size="lg"
                type="button"
                onClick={() => {
                  soundFx.playTick();
                  shouldRestoreMenuFocus.current = false;
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="h-12 w-full rounded-full border border-white/10 bg-white/[0.08] text-paper-dim transition-colors hover:bg-white/[0.14] hover:text-white font-editorial text-[14px] font-semibold tracking-[0.02em] flex items-center justify-center cursor-pointer"
              >
                Ask a Question →
              </PressFeedbackButton>

              <RequestAccessPill
                onClick={() => {
                  shouldRestoreMenuFocus.current = false;
                  setMobileMenuOpen(false);
                  onOpenApply();
                }}
                size="drawer"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
};
