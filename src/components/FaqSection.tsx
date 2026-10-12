import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, ArrowUpRight } from 'lucide-react';
import { soundFx } from '../utils/audio';
import { SecondaryCta } from './CtaButtons';
import { RevealHeading, RevealItem, RevealGroup, revealChildVariants } from './ScrollReveal';

interface FaqSectionProps {
  onOpenRefundPolicy: () => void;
  onOpenContact: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  onOpenRefundPolicy,
  onOpenContact,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Is Creator Hub a course?',
      answer:
        'No. Creator Hub is primarily a private community focused on practical guidance, resources, discussions, and networking related to YouTube Automation and digital content creation.',
      category: 'COMMUNITY',
      isRefund: false,
    },
    {
      question: 'What do I get after joining?',
      answer:
        "You'll receive access to the private Creator Hub community, along with the resources, standard operating procedures, and member benefits described on this website.",
      category: 'DELIVERABLES',
      isRefund: false,
    },
    {
      question: 'Do you guarantee views, subscribers, or income?',
      answer:
        'No. Creator Hub does not guarantee income, views, subscribers, monetization, or any specific financial outcome. Your results depend entirely on factors including your effort, execution, content quality, market conditions, platform policies, and factors outside our control.',
      category: 'RESULTS',
      isRefund: false,
    },
    {
      question: 'Is this a done-for-you service?',
      answer:
        'No. Creator Hub is an educational and community platform. We do not build, script, edit, or manage channels for you. We provide the guidance, systems, SOPs, and community feedback so you can operate your own channels.',
      category: 'OPERATIONS',
      isRefund: false,
    },
    {
      question: 'How do I join?',
      answer:
        "Begin by submitting the application form. After submitting your application, follow the official instructions provided regarding membership and payment. If you are instructed to proceed with payment, you'll use the secure Razorpay payment page.",
      category: 'ONBOARDING',
      isRefund: false,
    },
    {
      question: 'How do I book my call?',
      answer:
        "After completing the required joining and payment process, you'll receive access to the booking process for scheduling your call. The booking link will be provided once the official booking system is available.",
      category: 'CALLS',
      isRefund: false,
    },
    {
      question: 'Is the payment refundable?',
      answer:
        'No. All sales are final and there are strictly no refunds or returns. Because Creator Hub grants immediate digital access to private community channels, proprietary SOPs, templates, and operational workflows, we operate a strict non-refundable policy once payment is completed.',
      category: 'POLICY',
      isRefund: true, // Only show refund link here
    },
    {
      question: 'Can I share my membership?',
      answer:
        'No. Membership is intended for the individual purchaser. Sharing access, invitation links, or internal resources with non-members is strictly prohibited.',
      category: 'ACCESS',
      isRefund: false,
    },
  ];

  const toggleFaq = (index: number) => {
    soundFx.playTick();
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="relative py-20 sm:py-24 lg:py-28 px-6 sm:px-10 lg:px-16 bg-ink border-t border-ink-3 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto space-y-16 sm:space-y-20">
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <RevealItem>
            <div className="flex items-center gap-3 text-xs sm:text-sm font-tech tracking-[0.25em] text-lav uppercase">
              <span className="w-5 h-[1px] bg-lav/40 inline-block shrink-0" />
              <span>FAQ</span>
            </div>
          </RevealItem>

          <RevealHeading
            text="Frequently Asked Questions"
            as="h2"
            className="font-editorial font-bold text-2xl sm:text-3xl lg:text-4xl text-paper tracking-tight leading-[1.15] uppercase"
          />

          <RevealItem delay={0.1}>
            <div className="border-l border-ink-3 pl-5 py-1">
              <p className="text-sm font-tech uppercase tracking-[0.15em] text-paper-dim">
                Everything you need to know about Creator Hub, YouTube Automation, and admissions.
              </p>
            </div>
          </RevealItem>
        </div>

        {/* Accordion List with Shared Reveal System */}
        <RevealGroup className="border-t border-ink-3 divide-y divide-ink-3" stagger={0.06}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                variants={revealChildVariants}
                className="transition-colors hover:bg-paper/[0.02]"
              >
                <div>
                  <button
                    type="button"
                    id={`faq-question-${index}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    onClick={() => toggleFaq(index)}
                    className="w-full py-6 sm:py-7 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-lav group"
                  >
                    <span className={`font-editorial font-bold text-lg sm:text-xl tracking-tight pr-4 transition-colors ${isOpen ? 'text-lav-soft' : 'text-paper group-hover:text-paper-dim'}`}>
                      {faq.question}
                    </span>
                    <div className={`w-8 h-8 border flex items-center justify-center shrink-0 transition-colors ${isOpen ? 'border-lav bg-lav-deep/20 text-lav' : 'border-ink-3 text-paper-dim bg-ink-2 group-hover:border-paper-dim'}`}>
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${index}`}
                        role="region"
                        aria-labelledby={`faq-question-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="pb-6 sm:pb-7 pr-6 text-base text-paper-dim font-sans leading-relaxed space-y-3">
                          <p>{faq.answer}</p>
                          {faq.isRefund && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                soundFx.playTick();
                                onOpenRefundPolicy();
                              }}
                              className="inline-flex items-center gap-1.5 text-sm font-tech text-lav underline underline-offset-4 hover:text-paper pt-1 cursor-pointer"
                            >
                              <span>Read full Return & Refund Policy</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </RevealGroup>

        {/* Support Callout - Plain language "our team" */}
        <RevealItem delay={0.1}>
          <div className="p-8 sm:p-9 border border-ink-3 bg-ink-2/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-lg hover:border-lav/40 transition-colors">
            <div>
              <span className="font-editorial font-bold text-lg sm:text-xl text-paper block">
                Still have questions about admissions?
              </span>
              <span className="text-base text-paper-dim font-sans">
                Our team is available to review your channel alignment before you apply.
              </span>
            </div>

            <SecondaryCta
              onClick={onOpenContact}
              label="Ask a Question"
              className="shrink-0 w-full sm:w-auto"
            />
          </div>
        </RevealItem>
      </div>
    </section>
  );
};
