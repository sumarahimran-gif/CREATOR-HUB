import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'What You Get', href: '#what-you-get' },
    { label: "Who It's For", href: '#who-its-for' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

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
      el.scrollIntoView({ behavior: 'auto', block: 'start' });
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: visible ? 0 : -100 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-40 bg-ink/90 backdrop-blur-md border-b border-ink-3 transition-colors duration-300 lg:h-[88px]"
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
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-lav/40 bg-ink-2 p-0.5 shadow-[0_0_15px_color-mix(in_srgb,var(--color-lav)_30%,transparent)] transition-all group-hover:border-lav group-hover:shadow-[0_0_25px_color-mix(in_srgb,var(--color-lav)_60%,transparent)] xl:h-[52px] xl:w-[52px]">
              {/* Soft Ambient Lavender Halo */}
              <div className="absolute -inset-1 rounded-full bg-lav/15 blur-[6px] pointer-events-none group-hover:bg-lav/30 transition-all" />

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
        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-[18px] px-2 lg:flex lg:px-0 xl:px-2 2xl:gap-8" aria-label="Main Navigation">
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
                    ? 'font-bold text-white'
                    : 'text-paper-dim hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-lav"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
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
          <PressFeedbackButton
            size="sm"
            onClick={() => {
              soundFx.playTick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.08] text-paper-dim transition-colors hover:bg-white/[0.14] hover:text-white lg:hidden cursor-pointer outline-none"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5" />}
          </PressFeedbackButton>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden bg-ink-2 border-b border-ink-3 px-5 py-6 space-y-4 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <PressFeedbackLink
                    origin="center"
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`px-4 py-3 text-sm font-tech uppercase tracking-widest transition-colors border-b border-ink-3 ${
                      isActive ? 'text-lav font-bold' : 'text-paper-dim hover:text-paper'
                    }`}
                  >
                    {link.label}
                  </PressFeedbackLink>
                );
              })}
            </div>

            <div className="pt-2 flex flex-col gap-3">
              <PressFeedbackButton
                size="lg"
                type="button"
                onClick={() => {
                  soundFx.playTick();
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full h-[48px] rounded-full bg-white/[0.08] border border-white/10 text-paper-dim hover:bg-white/[0.14] hover:text-white font-editorial text-[14px] font-semibold tracking-[0.02em] flex items-center justify-center transition-colors cursor-pointer"
              >
                Ask a Question →
              </PressFeedbackButton>

              {/* Full width 54px pill with arrow chip on right */}
              <RequestAccessPill
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenApply();
                }}
                size="drawer"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
