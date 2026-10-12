import React from 'react';
import { ArrowUp, Instagram, Mail } from 'lucide-react';
import { soundFx } from '../utils/audio';
import { PrimaryCta, SecondaryCta } from './CtaButtons';
import { RevealHeading, RevealItem, RevealGroup, revealChildVariants } from './ScrollReveal';
import { motion } from 'motion/react';

interface FooterAndContactProps {
  onOpenTerms: () => void;
  onOpenPrivacy: () => void;
  onOpenRefund: () => void;
  onOpenApply: () => void;
  onOpenRazorpay: () => void;
  onOpenContact: () => void;
}

export const FooterAndContact: React.FC<FooterAndContactProps> = ({
  onOpenTerms,
  onOpenPrivacy,
  onOpenRefund,
  onOpenApply,
  onOpenContact,
}) => {
  const scrollToTop = () => {
    soundFx.playTick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'What You Get', href: '#what-you-get' },
    { label: "Who It's For", href: '#who-its-for' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    soundFx.playTick();
    try {
      window.history.pushState(null, '', href);
    } catch {
      window.location.hash = href;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-ink border-t border-ink-3 overflow-hidden">
      
      {/* ========================================================= */}
      {/* 1. CONTACT SECTION                                        */}
      {/* ========================================================= */}
      <section id="contact" className="py-20 sm:py-24 lg:py-28 px-6 sm:px-10 lg:px-16 border-b border-ink-3">
        <div className="max-w-5xl mx-auto">
          <RevealItem delay={0.05}>
            <div className="border border-ink-3 bg-ink-2/90 p-8 sm:p-12 lg:p-14 shadow-2xl hover:border-lav/40 transition-colors">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                
                <div className="lg:col-span-8 space-y-4">
                  <span className="text-xs sm:text-sm font-tech tracking-[0.25em] text-lav uppercase block">
                    Have Questions?
                  </span>

                  <h3 className="font-editorial font-bold text-2xl sm:text-3xl lg:text-4xl text-paper tracking-tight leading-[1.15] uppercase">
                    Speak with us before joining.
                  </h3>

                  <p className="text-base text-paper-dim font-sans leading-relaxed max-w-xl">
                    If you have questions about Creator Hub, YouTube Automation, membership, or the joining process, please contact us before purchasing.
                  </p>

                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center flex-wrap gap-2 sm:gap-4 text-sm font-tech text-paper-dim tracking-wider">
                    <a
                      href="mailto:drxversion1997@gmail.com"
                      className="flex items-center gap-2 text-paper font-bold hover:text-lav transition-colors cursor-pointer"
                    >
                      <Mail className="w-4 h-4 text-lav" />
                      <span>drxversion1997@gmail.com</span>
                    </a>
                    <span className="hidden sm:inline text-ink-3">•</span>
                    <a
                      href="https://instagram.com/mani_singh_yt"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-paper font-bold hover:text-lav transition-colors cursor-pointer uppercase"
                    >
                      <Instagram className="w-4 h-4 text-lav" />
                      <span>@mani_singh_yt</span>
                    </a>
                    <span className="hidden sm:inline text-ink-3">•</span>
                    <span className="text-xs uppercase">Mon – Sat | 10:00 AM – 6:00 PM IST</span>
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col gap-3 justify-end">
                  <PrimaryCta
                    onClick={() => window.open('https://instagram.com/mani_singh_yt', '_blank', 'noopener,noreferrer')}
                    label="Message Us"
                    className="w-full"
                  />

                  <SecondaryCta
                    onClick={onOpenContact}
                    label="Ask a Question"
                    className="w-full"
                  />
                </div>

              </div>
            </div>
          </RevealItem>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. PRE-FOOTER CALL TO ACTION                              */}
      {/* ========================================================= */}
      <section className="py-20 sm:py-24 lg:py-28 px-6 sm:px-10 lg:px-16 text-center border-b border-ink-3">
        <div className="max-w-4xl mx-auto space-y-6">
          <RevealHeading
            text="Ready to start building?"
            as="h2"
            className="font-editorial font-bold text-2xl sm:text-3xl lg:text-4xl text-paper tracking-tight leading-[1.15] uppercase"
          />

          <RevealItem delay={0.1}>
            <p className="text-base text-paper-dim font-sans tracking-wide max-w-2xl mx-auto leading-relaxed">
              Join a community of creators who are learning, experimenting, and building together.
            </p>
          </RevealItem>

          <RevealItem delay={0.18}>
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-[14px] w-full sm:w-auto max-w-sm sm:max-w-none mx-auto">
              <PrimaryCta
                onClick={onOpenApply}
                label="Request Access"
                className="w-full sm:w-auto"
              />

              <SecondaryCta
                onClick={onOpenContact}
                label="Ask a Question"
                className="w-full sm:w-auto"
              />
            </div>
          </RevealItem>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. FOOTER INFO & POLICIES                                 */}
      {/* ========================================================= */}
      <div className="py-14 sm:py-18 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand & Description */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-editorial font-bold text-lg text-paper tracking-widest uppercase">
                Creator Hub
              </span>
              <span className="font-tech text-xs text-lav tracking-wider">
                (YT Automation)
              </span>
            </div>

            <p className="text-base text-paper-dim font-sans leading-relaxed max-w-sm">
              Helping digital creators learn, connect, and build through practical guidance and a structured community.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-4 space-y-2">
            <span className="text-xs font-tech text-paper-dim uppercase tracking-widest block mb-2 font-medium">
              Navigation
            </span>
            <div className="grid grid-cols-2 gap-2 text-sm font-tech text-paper-dim uppercase">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="hover:text-lav transition-colors py-0.5"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Back to Top */}
          <div className="md:col-span-3 flex md:justify-end">
            <button
              type="button"
              onClick={scrollToTop}
              className="px-4 py-2.5 border border-ink-3 bg-ink-2 hover:border-lav text-xs font-tech uppercase tracking-wider text-paper-dim hover:text-paper flex items-center gap-2 cursor-pointer transition-colors duration-200"
            >
              <span>Back to top ↑</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Legal & Copyright Bar */}
        <div className="pt-8 border-t border-ink-3 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm font-tech text-paper-dim">
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => {
                soundFx.playTick();
                onOpenPrivacy();
              }}
              className="hover:text-lav transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => {
                soundFx.playTick();
                onOpenTerms();
              }}
              className="hover:text-lav transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => {
                soundFx.playTick();
                onOpenRefund();
              }}
              className="hover:text-lav transition-colors cursor-pointer"
            >
              Return & Refund Policy
            </button>
          </div>

          <div>
            <span>© 2026 Creator Hub. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
