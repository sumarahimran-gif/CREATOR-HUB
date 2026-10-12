import React from 'react';
import { Check, ShieldCheck } from 'lucide-react';
import { PrimaryCta, SecondaryCta } from './CtaButtons';
import { RevealHeading, RevealItem, RevealGroup, revealChildVariants } from './ScrollReveal';
import { motion } from 'motion/react';

interface MembershipAndCTASectionProps {
  onOpenApply: () => void;
  onOpenRazorpay?: () => void;
  onOpenContact: () => void;
}

export const MembershipAndCTASection: React.FC<MembershipAndCTASectionProps> = ({
  onOpenApply,
  onOpenContact,
}) => {
  const inclusions = [
    'Private Discord community access',
    'YouTube Automation discussions and guidance',
    'Digital resources, templates, and standard operating procedures',
    'Channel strategy discussions and audits',
    'Community networking with active builders',
    'Peer support and workflow reviews',
    'Ongoing curriculum updates and resources',
  ];

  return (
    <section
      id="membership"
      className="relative py-20 sm:py-24 lg:py-28 px-6 sm:px-10 lg:px-16 bg-paper text-ink border-t border-ink/10 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto space-y-16 sm:space-y-20">
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <RevealItem>
            <div className="flex items-center gap-3 text-xs sm:text-sm font-tech tracking-[0.25em] text-ink uppercase">
              <span className="w-5 h-[1.5px] bg-lav-deep inline-block shrink-0" />
              <span>What's included</span>
            </div>
          </RevealItem>

          <RevealHeading
            text="One community. Everything you need in one place."
            as="h2"
            className="font-editorial font-bold text-2xl sm:text-3xl lg:text-4xl text-ink tracking-tight leading-[1.15] uppercase"
          />

          <RevealItem delay={0.1}>
            <div className="border-l border-ink/20 pl-5 py-1">
              <p className="text-sm sm:text-base text-ink/75 font-sans leading-relaxed">
                A unified private environment built for continuous execution and peer collaboration.
              </p>
            </div>
          </RevealItem>
        </div>

        {/* Minimal High-Contrast Membership Panel (Light Architectural Surface) */}
        <RevealItem delay={0.1}>
          <div className="border border-ink/15 bg-white p-8 sm:p-12 lg:p-14 shadow-lg hover:border-ink/30 transition-colors">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              
              {/* Left Column: Details & Inclusions */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-2">
                  <span className="text-xs sm:text-sm font-tech text-ink/70 uppercase tracking-widest block font-medium">
                    All-Inclusive Membership
                  </span>
                  <h3 className="font-editorial font-bold text-xl sm:text-2xl text-ink uppercase tracking-tight">
                    Your Creator Hub membership includes:
                  </h3>
                </div>

                <div className="space-y-4 pt-3">
                  {inclusions.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3.5 text-base text-ink/85 font-sans leading-relaxed group">
                      <div className="w-5 h-5 rounded-sm bg-ink text-paper flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-ink/85 group-hover:text-ink transition-colors">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-5 border-t border-ink/10">
                  <p className="text-sm text-ink/60 font-sans italic">
                    Digital access only. No physical products are shipped.
                  </p>
                </div>
              </div>

              {/* Right Column: Direct CTA & What It Costs */}
              <div className="lg:col-span-5 p-8 sm:p-10 border border-ink/15 bg-paper space-y-6 flex flex-col justify-between">
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between text-xs sm:text-sm font-tech uppercase tracking-widest text-ink/60 border-b border-ink/10 pb-3.5">
                    <span>Admissions</span>
                    <span className="text-ink font-semibold">Limited Intake</span>
                  </div>

                  <div className="space-y-2 pt-1">
                    <h4 className="font-editorial font-bold text-xl text-ink uppercase tracking-tight">
                      Private Admissions
                    </h4>
                    <p className="text-base text-ink/75 font-sans leading-relaxed">
                      Access is granted upon review to ensure mutual alignment with our community standards and execution pace.
                    </p>
                  </div>

                  {/* "What it costs" line near Membership CTA */}
                  <div className="p-3.5 border border-ink/15 bg-white/70 space-y-1">
                    <span className="text-xs font-tech text-ink/60 uppercase tracking-wider block">
                      What it costs
                    </span>
                    <p className="text-sm font-sans font-medium text-ink">
                      Pricing details are shared during the application process.
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <PrimaryCta
                    inverted
                    onClick={onOpenApply}
                    label="Request Access"
                    className="w-full"
                  />

                  <SecondaryCta
                    inverted
                    onClick={onOpenContact}
                    label="Have a question? Speak with us"
                    className="w-full"
                  />
                </div>

                <div className="pt-3.5 border-t border-ink/10 text-xs font-sans text-ink/65 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-ink shrink-0" />
                  <span>Private Community Membership</span>
                </div>
              </div>

            </div>
          </div>
        </RevealItem>
      </div>
    </section>
  );
};
