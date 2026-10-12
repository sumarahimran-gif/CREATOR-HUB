import React from 'react';
import { TrendingUp, Brain, Cpu, CheckCircle2 } from 'lucide-react';
import { CorePillar } from '../types';
import { PrimaryCta } from './CtaButtons';
import { RevealHeading, RevealItem, RevealGroup, revealChildVariants } from './ScrollReveal';
import { motion } from 'motion/react';

interface PillarsSectionProps {
  onOpenApply: () => void;
}

export const PillarsSection: React.FC<PillarsSectionProps> = ({ onOpenApply }) => {
  const pillars: CorePillar[] = [
    {
      id: 'growth',
      number: '01',
      title: 'YouTube Growth',
      subtitle: 'Audience Acquisition Systems',
      description:
        'Retention pacing curves, hook architecture, and algorithmic positioning engineered for consistent, non-lottery reach across target media demographics.',
      highlight: 'Audience Math',
      deliverables: [
        'Retention pacing algorithms and hook blueprints',
        'Systemic packaging and click-through rate (CTR) optimization',
        'Channel positioning and compounding authority',
      ],
      visualType: 'neural',
    },
    {
      id: 'mindset',
      number: '02',
      title: 'Operator Mindset',
      subtitle: 'Professional Discipline & Focus',
      description:
        'Shift from an exhausted gig-worker into an indispensable growth partner commanding high-value authority, professional leverage, and predictable execution.',
      highlight: 'Operator Identity',
      deliverables: [
        'High-ticket positioning and boundary frameworks',
        'Ruthless execution over passive consumer theory',
      ],
      visualType: 'code',
    },
    {
      id: 'automation',
      number: '03',
      title: 'Automation System',
      subtitle: 'Delegation & Infrastructure',
      description:
        'Tested production frameworks, thumbnail briefs, and delegation templates that decouple your personal time from channel production.',
      highlight: 'Structured Environment',
      deliverables: [
        'Standard Operating Procedures: Tested production frameworks, thumbnail briefs, and delegation templates.',
        'Active Peer Network: Connect with creators sharing real feedback on scripts, edits, and retention.',
        'Continuous Execution: A structured environment focused on implementation rather than passive theory.',
      ],
      visualType: 'laptop',
    },
  ];

  const getIcon = (id: string) => {
    switch (id) {
      case 'growth':
        return <TrendingUp className="w-4 h-4 text-lav" />;
      case 'mindset':
        return <Brain className="w-4 h-4 text-lav" />;
      case 'automation':
      default:
        return <Cpu className="w-4 h-4 text-lav" />;
    }
  };

  return (
    <section
      id="pillars"
      className="relative py-20 sm:py-24 lg:py-28 px-6 sm:px-10 lg:px-16 bg-ink border-t border-ink-3 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto space-y-16 sm:space-y-20">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <RevealItem>
            <div className="flex items-center gap-3 text-xs sm:text-sm font-tech tracking-[0.25em] text-lav uppercase">
              <span className="w-5 h-[1px] bg-lav/40 inline-block shrink-0" />
              <span>Core Infrastructure</span>
            </div>
          </RevealItem>

          <RevealHeading
            text="Three foundational pillars."
            as="h2"
            className="font-editorial font-bold text-2xl sm:text-3xl lg:text-4xl text-paper tracking-tight leading-[1.15] uppercase"
          />

          <RevealItem delay={0.1}>
            <div className="border-l border-ink-3 pl-5 py-1">
              <p className="text-sm font-tech uppercase tracking-[0.15em] text-paper-dim">
                A balanced operating triad designed for sustained digital scale
              </p>
            </div>
          </RevealItem>
        </div>

        {/* 3 Pillars Grid */}
        <RevealGroup className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10" stagger={0.09}>
          {pillars.map((pillar) => (
            <motion.div
              key={pillar.id}
              variants={revealChildVariants}
              className="border-t border-ink-3 pt-8 flex flex-col justify-between group hover:border-lav/50 transition-colors"
            >
              <div className="space-y-6">
                {/* Header Metadata */}
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-tech text-lav uppercase tracking-widest transition-colors">
                    Pillar // {pillar.number}
                  </span>
                  <div className="w-8 h-8 border border-ink-3 bg-ink-2 flex items-center justify-center group-hover:border-lav/50 transition-all">
                    {getIcon(pillar.id)}
                  </div>
                </div>

                {/* Title & Subtitle */}
                <div className="space-y-1.5">
                  <h3 className="font-editorial font-bold text-xl sm:text-2xl text-paper tracking-tight uppercase group-hover:text-lav-soft transition-colors">
                    {pillar.title}
                  </h3>
                  <span className="text-xs sm:text-sm font-tech text-paper-dim tracking-[0.1em] uppercase block">
                    {pillar.subtitle}
                  </span>
                </div>

                {/* Description */}
                <p className="text-base text-paper-dim font-sans leading-relaxed">
                  {pillar.description}
                </p>

                {/* Deliverables List */}
                <div className="space-y-3.5 pt-5 border-t border-ink-3">
                  {pillar.deliverables.map((item, dIdx) => (
                    <div
                      key={dIdx}
                      className="flex items-start gap-3 text-base text-paper font-sans leading-relaxed"
                    >
                      <CheckCircle2 className="w-4 h-4 text-lav mt-1 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button for Automation Pillar */}
              {pillar.id === 'automation' && (
                <div className="pt-6 mt-8 border-t border-ink-3">
                  <PrimaryCta
                    onClick={onOpenApply}
                    label="Request Access"
                    className="w-full"
                  />
                </div>
              )}
            </motion.div>
          ))}
        </RevealGroup>

      </div>
    </section>
  );
};
