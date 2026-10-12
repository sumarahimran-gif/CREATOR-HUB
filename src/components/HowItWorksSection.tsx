import React from 'react';
import { Lock, Calendar, CheckCircle2 } from 'lucide-react';
import { PrimaryCta, SecondaryCta } from './CtaButtons';
import { RevealHeading, RevealItem, RevealGroup, revealChildVariants } from './ScrollReveal';
import { motion } from 'motion/react';

interface HowItWorksSectionProps {
  onOpenApply: () => void;
  onOpenRazorpay: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  onOpenApply,
  onOpenRazorpay,
}) => {
  const steps = [
    {
      step: 1,
      tag: 'Step 01 // Application',
      title: 'Apply',
      description: 'Submit your details through the Creator Hub application form.',
      buttonText: 'Request Access',
      actionType: 'apply',
    },
    {
      step: 2,
      tag: 'Step 02 // Payment',
      title: 'Complete Payment',
      description:
        "Apply first, pay once you're approved. Complete your membership payment securely through the official Razorpay checkout link.",
      buttonText: 'Razorpay Checkout',
      actionType: 'payment',
    },
    {
      step: 3,
      tag: 'Step 03 // Call Booking',
      title: 'Book Your Call',
      description:
        'After completing the required joining and payment process, use the provided booking link to schedule your strategy and onboarding call.',
      buttonText: 'Coming Soon',
      actionType: 'coming-soon',
    },
    {
      step: 4,
      tag: 'Step 04 // Onboarding',
      title: 'Get Started',
      description:
        'Complete the onboarding process and receive the instructions required to access the private Creator Hub community.',
      buttonText: 'Join Community',
      actionType: 'complete',
    },
  ];

  return (
    <section
      id="how-it-works"
      className="relative py-20 sm:py-24 lg:py-28 px-6 sm:px-10 lg:px-16 bg-ink border-t border-ink-3 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto space-y-16 sm:space-y-20">
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <RevealItem>
            <div className="flex items-center gap-3 text-xs sm:text-sm font-tech tracking-[0.25em] text-lav uppercase">
              <span className="w-5 h-[1px] bg-lav/40 inline-block shrink-0" />
              <span>How It Works</span>
            </div>
          </RevealItem>

          <RevealHeading
            text="From application to Creator Hub in a few straightforward steps."
            as="h2"
            className="font-editorial font-bold text-2xl sm:text-3xl lg:text-4xl text-paper tracking-tight leading-[1.15] uppercase"
          />

          <RevealItem delay={0.1}>
            <div className="border-l border-ink-3 pl-5 py-1">
              <p className="text-sm font-tech uppercase tracking-[0.15em] text-paper-dim">
                How joining works
              </p>
            </div>
          </RevealItem>
        </div>

        {/* 4 Sequential Columns with Unified Visual Treatment */}
        <RevealGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10" stagger={0.08}>
          {steps.map((item) => (
            <motion.div
              key={item.step}
              variants={revealChildVariants}
              className="border-t border-ink-3 pt-8 flex flex-col justify-between space-y-7 group hover:border-lav/50 transition-colors"
            >
              <div className="space-y-4">
                <span className="font-editorial font-black text-3xl text-paper-dim group-hover:text-lav transition-colors block">
                  0{item.step}
                </span>

                <span className="text-xs sm:text-sm font-tech text-lav uppercase tracking-widest block">
                  {item.tag}
                </span>

                <h3 className="font-editorial font-bold text-lg sm:text-xl text-paper uppercase tracking-tight group-hover:text-lav-soft transition-colors">
                  {item.title}
                </h3>

                <p className="text-base text-paper-dim font-sans leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Action Trigger - Consistent pill styling across all 4 steps */}
              <div className="pt-4 border-t border-ink-3">
                {item.actionType === 'apply' && (
                  <PrimaryCta
                    onClick={onOpenApply}
                    label={item.buttonText}
                    className="w-full"
                  />
                )}

                {item.actionType === 'payment' && (
                  <SecondaryCta
                    onClick={onOpenRazorpay}
                    label={item.buttonText}
                    icon={<Lock className="w-4 h-4 text-lav" />}
                    className="w-full"
                  />
                )}

                {item.actionType === 'coming-soon' && (
                  <SecondaryCta
                    label={item.buttonText}
                    icon={<Calendar className="w-4 h-4 text-lav" />}
                    disabled
                    className="w-full"
                  />
                )}

                {item.actionType === 'complete' && (
                  <SecondaryCta
                    onClick={onOpenApply}
                    label={item.buttonText}
                    icon={<CheckCircle2 className="w-4 h-4 text-lav" />}
                    className="w-full"
                  />
                )}
              </div>
            </motion.div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
};
