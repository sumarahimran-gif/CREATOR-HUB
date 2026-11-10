import React from 'react';
import { BookOpen, Wrench, BarChart3, TrendingUp, ShieldAlert } from 'lucide-react';
import { PrimaryCta } from './CtaButtons';
import { FadeUp } from './FadeUp';
import { RevealText } from './RevealText';
import { ScrubText } from './ScrubText';
import { motion } from 'motion/react';

interface AboutSectionProps {
  onOpenApply?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenApply }) => {
  const steps = [
    {
      step: '01',
      action: 'Learn',
      focus: 'Positioning & systems',
      description: 'Master the principles of channel positioning, algorithmic packaging, and scalable workflows.',
      icon: BookOpen,
    },
    {
      step: '02',
      action: 'Implement',
      focus: 'Production & delegation',
      description: 'Deploy battle-tested production frameworks, thumbnail briefs, and editor handoff standard operating procedures.',
      icon: Wrench,
    },
    {
      step: '03',
      action: 'Improve',
      focus: 'Analytics & iteration',
      description: 'Audit audience retention curves, calibrate hooks, and refine content based on empirical performance.',
      icon: BarChart3,
    },
    {
      step: '04',
      action: 'Grow',
      focus: 'Sustainable channel scale',
      description: 'Expand operations into a durable digital media business that compounds in value over time.',
      icon: TrendingUp,
    },
  ];

  return (
    <section
      id="about"
      className="relative py-24 lg:py-32 px-5 md:px-8 lg:px-16 bg-ink border-t border-ink-3 overflow-hidden"
    >
      <div className="mx-auto w-full max-w-7xl space-y-16 sm:space-y-20">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <FadeUp>
            <div className="flex items-center gap-3 text-xs sm:text-sm font-tech tracking-[0.25em] text-lav uppercase">
              <span className="w-5 h-[1px] bg-lav-soft inline-block shrink-0" />
              <span>About Creator Hub</span>
            </div>
          </FadeUp>

          <RevealText
            text="More than just another course."
            as="h2"
            direction="left"
            className="font-editorial font-bold text-2xl sm:text-3xl lg:text-4xl text-paper tracking-[-0.02em] leading-[1.15] uppercase"
          />

          <FadeUp delay={0.1}>
            <div className="border-l border-ink-3 pl-5 py-1">
              <ScrubText
                className="text-base text-paper-dim font-sans leading-relaxed"
                text="Creator Hub is a private community for individuals interested in YouTube Automation and digital content creation. Rather than providing a collection of pre-recorded lessons without ongoing support, Creator Hub offers a continuous environment where members can learn, ask questions, exchange ideas, access resources, and connect with other creators."
              />
            </div>
          </FadeUp>
        </div>

        {/* The Methodology */}
        <div className="space-y-10">
          <div>
            <FadeUp>
              <span className="text-xs sm:text-sm font-tech text-lav uppercase tracking-widest block">
                The Methodology
              </span>
            </FadeUp>

            <RevealText
              text="The Objective is Straightforward:"
              as="h3"
              direction="left"
              className="font-editorial font-bold text-xl sm:text-2xl text-paper uppercase tracking-[-0.02em] mt-1"
            />
          </div>

          {/* Sibling Staggered Grid */}
          <FadeUp className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10" stagger={0.1}>
            {steps.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.step}
                  className="border-t border-ink-3 pt-6 space-y-4 group hover:border-lav/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-editorial font-bold text-2xl text-paper-dim group-hover:text-lav transition-colors">
                      {item.step}
                    </span>
                    <Icon className="w-4 h-4 text-paper-dim group-hover:text-lav transition-colors" />
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs sm:text-sm font-tech text-lav uppercase tracking-wider block transition-colors">
                      Step {item.step} // {item.action}
                    </span>
                    <h4 className="font-editorial font-semibold text-base sm:text-lg text-paper transition-colors duration-200 group-hover:text-lav-soft motion-reduce:transition-none">
                      {item.focus}
                    </h4>
                  </div>

                  <p className="text-base text-paper-dim font-sans leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </FadeUp>
        </div>

        {/* Philosophy Callout & Disclaimer Note */}
        <FadeUp className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-stretch pt-6 border-t border-ink-3" stagger={0.1}>
          <motion.div
            className="redesign-card md:col-span-7 bg-ink-2/60 flex flex-col justify-between group"
          >
            <div className="space-y-3.5">
              <span className="text-xs sm:text-sm font-tech text-lav uppercase tracking-widest block">
                Core Philosophy
              </span>
              <ScrubText
                className="font-editorial text-lg sm:text-xl text-paper font-bold leading-snug group-hover:text-lav-soft transition-colors duration-200"
                text="Creator Hub is designed for individuals who are prepared to take action and apply what they learn, rather than simply consume information."
              />
            </div>

            {onOpenApply && (
              <div className="pt-6">
                <PrimaryCta onClick={onOpenApply} label="Request Access" />
              </div>
            )}
          </motion.div>

          <motion.div
            className="redesign-card md:col-span-5 bg-ink-2/40 flex flex-col justify-between"
          >
            <div className="space-y-3.5">
              <div className="flex items-center gap-2 text-paper-dim">
                <ShieldAlert className="w-4 h-4 text-lav" />
                <span className="text-xs sm:text-sm font-tech uppercase tracking-widest text-paper">
                  Important Note
                </span>
              </div>
              <p className="text-base text-paper-dim font-sans leading-relaxed">
                Creator Hub is an educational and community-based service. It is not a get-rich-quick scheme, investment opportunity, or done-for-you agency. No specific income, views, subscribers, or monetization results are guaranteed.
              </p>
            </div>
            <div className="pt-4 text-xs font-tech text-paper-dim uppercase tracking-wider">
              Policy & Transparency
            </div>
          </motion.div>
        </FadeUp>

      </div>
    </section>
  );
};
