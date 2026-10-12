import React from 'react';
import { Compass, FileText, Users, RefreshCw, Network, ArrowRight } from 'lucide-react';
import { RevealHeading, RevealItem, RevealGroup, revealChildVariants } from './ScrollReveal';
import { motion } from 'motion/react';

export const ProjectsShowcase: React.FC = () => {
  const deliverables = [
    {
      num: '01',
      title: 'YouTube Automation Guidance',
      category: 'Strategic Architecture',
      description:
        'Develop a practical understanding of channel positioning, content workflows, production systems, delegation, publishing, and analytics.',
      icon: Compass,
    },
    {
      num: '02',
      title: 'Resources & SOPs',
      category: 'Operational Toolkit',
      description:
        'Access templates, standard operating procedures, workflow resources, tool recommendations, and other materials designed to support efficient execution.',
      icon: FileText,
    },
    {
      num: '03',
      title: 'Community Support',
      category: 'Collaborative Network',
      description:
        'Connect with creators pursuing similar objectives. Share ideas, ask questions, and receive feedback on content, scripts, thumbnails, workflows, and strategy.',
      icon: Users,
    },
    {
      num: '04',
      title: 'Ongoing Updates',
      category: 'Continuous Intelligence',
      description:
        'YouTube is constantly evolving. Creator Hub facilitates ongoing discussions and provides updates regarding tools, workflows, platform changes, and strategies relevant to creators.',
      icon: RefreshCw,
    },
    {
      num: '05',
      title: 'Networking & Relationships',
      category: 'Ecosystem Connections',
      description:
        'Build meaningful professional relationships with creators who are actively learning and working in the digital content creation space.',
      icon: Network,
    },
  ];

  return (
    <section
      id="what-you-get"
      className="relative py-20 sm:py-24 lg:py-28 px-6 sm:px-10 lg:px-16 bg-ink border-t border-ink-3 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto space-y-16 sm:space-y-20">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <RevealItem>
            <div className="flex items-center gap-3 text-xs sm:text-sm font-tech tracking-[0.25em] text-lav uppercase">
              <span className="w-5 h-[1px] bg-lav/40 inline-block shrink-0" />
              <span>Member Deliverables</span>
            </div>
          </RevealItem>

          <RevealHeading
            text="The resources and support you need to move forward with confidence."
            as="h2"
            className="font-editorial font-bold text-2xl sm:text-3xl lg:text-4xl text-paper tracking-tight leading-[1.15] uppercase"
          />

          <RevealItem delay={0.1}>
            <div className="border-l border-ink-3 pl-5 py-1">
              <p className="text-sm font-tech uppercase tracking-[0.15em] text-paper-dim">
                Comprehensive member infrastructure for systemic channel execution
              </p>
            </div>
          </RevealItem>
        </div>

        {/* Deliverables Grid: 6-column grid with 3 top items (span 2) and 2 bottom items (span 3) - Centered with no grid hole! */}
        <RevealGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 sm:gap-8" stagger={0.08}>
          {deliverables.map((item, idx) => {
            const Icon = item.icon;
            const isBottomRow = idx >= 3;
            return (
              <motion.div
                key={item.num}
                variants={revealChildVariants}
                className={`p-8 sm:p-9 border border-ink-3 bg-ink-2/60 flex flex-col justify-between hover:border-lav/50 transition-colors duration-200 group ${
                  isBottomRow ? 'lg:col-span-3' : 'lg:col-span-2'
                }`}
              >
                <div className="space-y-6">
                  {/* Top Metadata Bar */}
                  <div className="flex items-center justify-between border-b border-ink-3 pb-3.5">
                    <span className="font-editorial font-black text-2xl text-paper-dim group-hover:text-lav transition-colors">
                      {item.num}
                    </span>
                    <div className="w-8 h-8 border border-ink-3 bg-ink flex items-center justify-center group-hover:border-lav/50 transition-all">
                      <Icon className="w-4 h-4 text-lav" />
                    </div>
                  </div>

                  <span className="text-xs sm:text-sm font-tech text-lav uppercase tracking-widest block">
                    {item.category}
                  </span>

                  <h3 className="font-editorial font-bold text-lg sm:text-xl text-paper tracking-tight group-hover:text-lav-soft transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-base text-paper-dim font-sans leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-7 border-t border-ink-3 flex items-center justify-between text-xs font-tech text-paper-dim uppercase tracking-wider">
                  <span>Deliverable // 0{idx + 1}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-paper-dim group-hover:text-lav transition-colors" />
                </div>
              </motion.div>
            );
          })}
        </RevealGroup>

      </div>
    </section>
  );
};
