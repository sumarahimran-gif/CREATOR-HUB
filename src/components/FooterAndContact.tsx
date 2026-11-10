import React from 'react';
import { ArrowUp, Instagram, Mail } from 'lucide-react';
import { soundFx } from '../utils/audio';
import { PrimaryCta, SecondaryCta } from './CtaButtons';
import { PressFeedbackButton } from './PressFeedbackButton';
import { PressFeedbackLink } from './PressFeedbackLink';
import { FadeUp } from './FadeUp';
import { RevealText } from './RevealText';

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
    window.scrollTo({ top: 0, behavior: 'auto' });
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
    if (el) el.scrollIntoView({ behavior: 'auto' });
  };

  return (
    <footer className="relative bg-ink border-t border-ink-3 overflow-hidden">
      
      {/* ========================================================= */}
      {/* 1. CONTACT SECTION                                        */}
      {/* ========================================================= */}
      <section id="contact" className="py-24 lg:py-32 px-5 md:px-8 lg:px-16 border-b border-ink-3">
        <div className="mx-auto w-full max-w-7xl">
          <FadeUp delay={0.05}>
            <div className="border border-ink-3 bg-ink-2/90 p-8 sm:p-12 lg:p-14 shadow-2xl hover:border-lav/40 transition-colors">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                
                <FadeUp className="lg:col-span-8 space-y-4">
                  <span className="text-xs sm:text-sm font-tech tracking-[0.25em] text-lav uppercase block">
                    Have Questions?
                  </span>

                  <RevealText
                    text="Speak with us before joining."
                    as="h3"
                    direction="left"
                    className="font-editorial font-semibold text-2xl sm:text-3xl lg:text-4xl text-paper tracking-[-0.02em] leading-[1.15] uppercase"
                  />

                  <FadeUp>
                    <p className="text-base text-paper-dim font-sans leading-relaxed max-w-xl">
                      If you have questions about Creator Hub, YouTube Automation, membership, or the joining process, please contact us before purchasing.
                    </p>
                  </FadeUp>

                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center flex-wrap gap-2 sm:gap-4 text-sm font-tech text-paper-dim tracking-wider">
                    <a
                      href="mailto:drxversion1997@gmail.com"
                      className="group flex items-center gap-2 text-paper font-bold hover:text-lav transition-colors cursor-pointer"
                    >
                      <Mail className="w-4 h-4 text-lav" />
                      <span className="relative">
                        drxversion1997@gmail.com
                        <span aria-hidden="true" className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-lav transition-transform duration-[250ms] group-hover:scale-x-100 motion-reduce:transition-none" />
                      </span>
                    </a>
                    <span className="hidden sm:inline text-ink-3">•</span>
                    <a
                      href="https://instagram.com/mani_singh_yt"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 text-paper font-bold hover:text-lav transition-colors cursor-pointer uppercase"
                    >
                      <Instagram className="w-4 h-4 text-lav" />
                      <span className="relative">
                        @mani_singh_yt
                        <span aria-hidden="true" className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-lav transition-transform duration-[250ms] group-hover:scale-x-100 motion-reduce:transition-none" />
                      </span>
                    </a>
                    <span className="hidden sm:inline text-ink-3">•</span>
                    <span className="text-xs uppercase">Mon – Sat | 10:00 AM – 6:00 PM IST</span>
                  </div>
                </FadeUp>

                <FadeUp className="lg:col-span-4 flex flex-col gap-3 justify-end">
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
                </FadeUp>

              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. PRE-FOOTER CALL TO ACTION                              */}
      {/* ========================================================= */}
      <section className="py-24 lg:py-32 px-5 md:px-8 lg:px-16 text-center border-b border-ink-3">
        <div className="mx-auto w-full max-w-7xl space-y-6">
          <RevealText
            text="Ready to start building?"
            as="h2"
            direction="right"
            className="font-editorial font-bold text-2xl sm:text-3xl lg:text-4xl text-paper tracking-[-0.02em] leading-[1.15] uppercase"
          />

          <FadeUp delay={0.1}>
            <p className="text-base text-paper-dim font-sans tracking-wide max-w-2xl mx-auto leading-relaxed">
              Join a community of creators who are learning, experimenting, and building together.
            </p>
          </FadeUp>

          <FadeUp delay={0.18}>
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
          </FadeUp>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. FOOTER INFO & POLICIES                                 */}
      {/* ========================================================= */}
      <div className="mx-auto w-full max-w-7xl space-y-12 px-5 py-24 md:px-8 lg:px-16 lg:py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand & Description */}
          <FadeUp className="md:col-span-4 space-y-3">
            <div className="flex items-center gap-2">
              <PressFeedbackLink
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToTop();
                }}
                className="font-editorial font-bold text-lg text-paper tracking-widest uppercase"
              >
                Creator Hub
              </PressFeedbackLink>
              <span className="font-tech text-xs text-lav tracking-wider">
                (YT Automation)
              </span>
            </div>

            <p className="text-base text-paper-dim font-sans leading-relaxed max-w-sm">
              Helping digital creators learn, connect, and build through practical guidance and a structured community.
            </p>
          </FadeUp>

          {/* Navigation Links */}
          <FadeUp className="md:col-span-5 space-y-2">
            <span className="text-xs font-tech text-paper-dim uppercase tracking-widest block mb-2 font-medium">
              Navigation
            </span>
            <FadeUp className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 2xl:gap-x-6 gap-y-2 text-sm font-tech text-paper-dim uppercase" stagger={0.1}>
              {navLinks.map((link) => (
                <PressFeedbackLink
                  origin="left"
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="group relative whitespace-nowrap hover:text-lav transition-colors py-0.5"
                >
                  {link.label}
                  <span aria-hidden="true" className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-lav transition-transform duration-[250ms] ease-out group-hover:scale-x-100 motion-reduce:transition-none" />
                </PressFeedbackLink>
              ))}
            </FadeUp>
          </FadeUp>

          {/* Back to Top */}
          <FadeUp className="md:col-span-3 flex md:justify-end">
            <PressFeedbackButton
              size="link"
              type="button"
              onClick={scrollToTop}
              className="px-4 py-2.5 border border-ink-3 bg-ink-2 text-xs font-tech uppercase tracking-wider text-paper-dim hover:text-paper cursor-pointer transition-colors duration-200"
            >
              <span className="inline-flex items-center gap-2">
                <span>Back to top</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </span>
            </PressFeedbackButton>
          </FadeUp>
        </div>

        {/* Legal & Copyright Bar */}
        <div className="pt-8 border-t border-ink-3 flex flex-col gap-4 text-sm font-tech text-paper-dim">
          <FadeUp className="flex flex-wrap items-center gap-x-4 gap-y-2" stagger={0.1}>
            {[
              { label: 'Privacy Policy', onClick: onOpenPrivacy },
              { label: 'Terms & Conditions', onClick: onOpenTerms },
              { label: 'Return & Refund Policy', onClick: onOpenRefund },
            ].map((link, index) => (
              <span key={link.label} className="inline-flex items-center gap-4 whitespace-nowrap">
                <PressFeedbackButton
                  size="link"
                  type="button"
                  onClick={() => {
                    soundFx.playTick();
                    link.onClick();
                  }}
                  className="group relative hover:text-lav transition-colors cursor-pointer"
                >
                  {link.label}
                  <span aria-hidden="true" className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-lav transition-transform duration-[250ms] ease-out group-hover:scale-x-100 motion-reduce:transition-none" />
                </PressFeedbackButton>
                {index < 2 && <span aria-hidden="true">•</span>}
              </span>
            ))}
          </FadeUp>

          <FadeUp className="w-full text-left sm:text-right">
            <span>© 2026 Creator Hub. All rights reserved.</span>
          </FadeUp>
        </div>
      </div>
    </footer>
  );
};
