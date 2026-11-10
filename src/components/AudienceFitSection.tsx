import React from 'react';
import { Check, X } from 'lucide-react';
import { FadeUp } from './FadeUp';
import { RevealText } from './RevealText';
import { Reveal } from './Reveal';

export const AudienceFitSection: React.FC = () => {
  const forYouList = [
    {
      highlight: 'Beginner Creators',
      text: "You're a beginner seeking a structured environment to learn YouTube Automation.",
    },
    {
      highlight: 'Active Channels',
      text: "You're already creating content and want to improve your workflow.",
    },
    {
      highlight: 'Practical Builders',
      text: 'You value practical resources over excessive theory.',
    },
    {
      highlight: 'Action-Oriented',
      text: "You're prepared to take action and learn through implementation.",
    },
    {
      highlight: 'Peer Network',
      text: 'You want to connect with other creators.',
    },
    {
      highlight: 'Long-Term Scale',
      text: "You're focused on building something sustainable over the long term.",
    },
  ];

  const notForYouList = [
    {
      highlight: 'Instant Virality',
      text: "You're expecting overnight success.",
    },
    {
      highlight: 'Guaranteed Outcomes',
      text: 'You want guaranteed income or guaranteed views.',
    },
    {
      highlight: 'Passive Hands-off',
      text: 'You expect someone else to build and operate your channel for you.',
    },
    {
      highlight: 'Agency Clients',
      text: "You're looking for a done-for-you agency.",
    },
    {
      highlight: 'Passive Observers',
      text: "You don't intend to implement what you learn.",
    },
    {
      highlight: 'Quick Shortcuts',
      text: "You're seeking a quick shortcut without sustained effort.",
    },
  ];

  return (
    <section
      id="who-its-for"
      className="relative py-24 lg:py-32 px-5 md:px-8 lg:px-16 bg-sand text-ink border-t border-sand-border overflow-hidden"
    >
      <div className="mx-auto w-full max-w-7xl space-y-16 sm:space-y-20">
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <FadeUp>
            <div className="flex items-center gap-3 text-xs sm:text-sm font-tech tracking-[0.25em] text-ink uppercase">
              <span className="w-5 h-[1.5px] bg-lav-soft inline-block shrink-0" />
              <span>Is this for you?</span>
            </div>
          </FadeUp>

          <RevealText
            text="Who this community is for — and who it isn't."
            as="h2"
            direction="left"
            className="font-editorial font-bold text-2xl sm:text-3xl lg:text-4xl text-ink tracking-[-0.02em] leading-[1.15] uppercase"
          />

          <FadeUp delay={0.1}>
            <div className="border-l border-ink/20 pl-5 py-1">
              <p className="text-sm sm:text-base text-sand-ink font-sans leading-relaxed">
                Mutual alignment ensures a focused, action-oriented environment for everyone involved.
              </p>
            </div>
          </FadeUp>
        </div>

        {/* 2-Column Comparison Layout (Light Theme, High-Contrast Architectural) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-stretch">
          
          {/* Column 1: This is for you if */}
          <FadeUp delay={0.05} className="group border-t-2 border-ink pt-8 space-y-7">
            <div className="flex items-center justify-between border-b border-ink/15 pb-4">
              <div className="space-y-1">
                <h3 className="font-editorial font-semibold text-xl sm:text-2xl text-ink uppercase tracking-[-0.02em] transition-colors duration-200 group-hover:text-blue-ink motion-reduce:transition-none">
                  This is for you if:
                </h3>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-lav-deep" />
            </div>

            <Reveal as="ul" className="space-y-5 pt-2" stagger={0.1}>
              {forYouList.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3.5 text-base text-sand-ink font-sans leading-relaxed group">
                  <div className="w-5 h-5 rounded-sm bg-ink text-paper flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-tech text-ink font-bold text-sm mr-2">
                      [{item.highlight}]
                    </span>
                    <span className="text-sand-ink text-base">
                      {item.text}
                    </span>
                  </div>
                </li>
              ))}
            </Reveal>
          </FadeUp>

          {/* Column 2: Not a fit if */}
          <FadeUp delay={0.12} className="group border-t-2 border-ink/30 pt-8 space-y-7">
            <div className="flex items-center justify-between border-b border-ink/15 pb-4">
              <div className="space-y-1">
                <h3 className="font-editorial font-semibold text-xl sm:text-2xl text-sand-ink uppercase tracking-[-0.02em] transition-colors duration-200 group-hover:text-blue-ink motion-reduce:transition-none">
                  Not a fit if:
                </h3>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-ink/30" />
            </div>

            <Reveal as="ul" className="space-y-5 pt-2" stagger={0.1}>
              {notForYouList.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3.5 text-base text-sand-ink font-sans leading-relaxed">
                  <div className="w-5 h-5 rounded-sm border border-ink/30 bg-ink/5 text-sand-ink flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-tech text-sand-ink font-bold text-sm mr-2">
                      [{item.highlight}]
                    </span>
                    <span className="text-sand-ink text-base">
                      {item.text}
                    </span>
                  </div>
                </li>
              ))}
            </Reveal>
          </FadeUp>

        </div>
      </div>
    </section>
  );
};
