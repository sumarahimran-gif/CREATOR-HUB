import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ExternalLink,
  Instagram,
  Mail,
  ShieldCheck,
} from 'lucide-react';
import { ModalType } from '../types';
import { soundFx } from '../utils/audio';

interface ModalsProps {
  activeModal: ModalType;
  onClose: () => void;
  onOpenRazorpay: () => void;
}

export const Modals: React.FC<ModalsProps> = ({
  activeModal,
  onClose,
  onOpenRazorpay,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const resetAndClose = () => {
    soundFx.playTick();
    onClose();
  };

  // 1. Remember previously focused element and return focus on close
  useEffect(() => {
    if (activeModal) {
      previousActiveElement.current = document.activeElement as HTMLElement | null;
    } else if (previousActiveElement.current) {
      previousActiveElement.current.focus?.();
    }
  }, [activeModal]);

  // 2. Scroll lock with 5px scrollbar-gutter preservation fix
  useEffect(() => {
    if (!activeModal) return;
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.paddingRight = '5px';
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [activeModal]);

  // 3. Escape key handler
  useEffect(() => {
    if (!activeModal) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        resetAndClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModal]);

  // 4. Focus trap and initial focus on modal open
  useEffect(() => {
    if (!activeModal) return;

    const timer = setTimeout(() => {
      if (modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length > 0) {
          focusableElements[0].focus();
        } else {
          modalRef.current.focus();
        }
      }
    }, 50);

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !modalRef.current) return;
      const focusables = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          last.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    };

    window.addEventListener('keydown', handleTabKey);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleTabKey);
    };
  }, [activeModal]);

  if (!activeModal) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-hidden"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            resetAndClose();
          }
        }}
      >
        <motion.div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          tabIndex={-1}
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className={`relative w-full max-h-[92vh] overflow-y-auto bg-ink-2 border border-ink-3 p-6 sm:p-8 text-paper shadow-[0_25px_70px_rgba(0,0,0,0.95)] outline-none ${
            activeModal === 'apply' ? 'max-w-3xl' : 'max-w-2xl'
          }`}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={resetAndClose}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 text-paper-dim hover:text-paper hover:bg-ink-3/80 transition-colors border border-ink-3 bg-ink cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-lav z-20"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          {/* 1. APPLICATION FORM MODAL (Official Google Form Embed + Fallback) */}
          {activeModal === 'apply' && (
            <div className="space-y-4">
              <div className="space-y-1.5 pr-8">
                <span className="text-xs font-tech uppercase tracking-[0.25em] text-lav block font-medium">
                  Admissions Application
                </span>
                <h3 id="modal-title" className="font-editorial font-bold text-2xl sm:text-3xl text-paper tracking-tight">
                  Request Creator Hub Access
                </h3>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 text-xs text-paper-dim font-sans">
                  <span>Complete the admissions form below. Our team reviews all applications.</span>
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSf-KNs5Nmu_3A0_vx06ZTpPqbeC9lelnbOsqNaQ954Vf00HMA/viewform"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-lav underline underline-offset-4 hover:text-paper font-tech text-xs shrink-0 cursor-pointer"
                  >
                    <span>Open in new tab</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Embedded Google Form */}
              <div className="w-full h-[65vh] border border-ink-3 bg-ink relative overflow-hidden rounded-sm">
                <iframe
                  src="https://docs.google.com/forms/d/e/1FAIpQLSf-KNs5Nmu_3A0_vx06ZTpPqbeC9lelnbOsqNaQ954Vf00HMA/viewform?embedded=true"
                  title="Creator Hub Application Form"
                  className="w-full h-full border-0"
                >
                  Loading admissions application…
                </iframe>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs font-tech text-paper-dim border-t border-ink-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-lav" />
                  <span>Submissions are kept strictly private</span>
                </div>
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="text-xs font-tech text-paper-dim hover:text-paper underline cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          )}

          {/* 2. CONTACT MODAL (Instagram & Mailto Direct Buttons) */}
          {activeModal === 'contact' && (
            <div className="space-y-6">
              <div className="space-y-1.5 pr-8">
                <span className="text-xs font-tech uppercase tracking-[0.25em] text-lav block font-medium">
                  Direct Inquiries
                </span>
                <h3 id="modal-title" className="font-editorial font-bold text-2xl sm:text-3xl text-paper tracking-tight">
                  Contact Our Team
                </h3>
                <p className="text-sm text-paper-dim font-sans leading-relaxed">
                  Have a question about Creator Hub, YouTube Automation, or admissions? Reach out directly via Instagram or email for assistance.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {/* Instagram Direct Link */}
                <a
                  href="https://instagram.com/mani_singh_yt"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.playAction()}
                  className="p-5 border border-ink-3 bg-ink hover:border-lav/50 flex flex-col justify-between space-y-4 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-full border border-ink-3 bg-ink-2 flex items-center justify-center text-lav group-hover:border-lav/50 transition-colors">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <ExternalLink className="w-4 h-4 text-paper-dim group-hover:text-lav transition-colors" />
                  </div>
                  <div>
                    <span className="text-xs font-tech text-lav uppercase tracking-wider block font-medium">
                      Instagram DM
                    </span>
                    <span className="font-editorial font-bold text-lg text-paper">
                      @mani_singh_yt
                    </span>
                    <p className="text-xs text-paper-dim font-sans mt-1">
                      Fastest response for quick questions
                    </p>
                  </div>
                </a>

                {/* Mailto Direct Link */}
                <a
                  href="mailto:drxversion1997@gmail.com"
                  onClick={() => soundFx.playAction()}
                  className="p-5 border border-ink-3 bg-ink hover:border-lav/50 flex flex-col justify-between space-y-4 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-full border border-ink-3 bg-ink-2 flex items-center justify-center text-lav group-hover:border-lav/50 transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <ExternalLink className="w-4 h-4 text-paper-dim group-hover:text-lav transition-colors" />
                  </div>
                  <div>
                    <span className="text-xs font-tech text-lav uppercase tracking-wider block font-medium">
                      Official Email
                    </span>
                    <span className="font-editorial font-bold text-base text-paper break-all">
                      drxversion1997@gmail.com
                    </span>
                    <p className="text-xs text-paper-dim font-sans mt-1">
                      Mon – Sat | 10:00 AM – 6:00 PM IST
                    </p>
                  </div>
                </a>
              </div>

              <div className="pt-4 border-t border-ink-3 flex items-center justify-between text-xs font-tech text-paper-dim">
                <span>Admissions & Support</span>
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="text-xs font-tech text-paper-dim hover:text-paper underline cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          )}

          {/* 3. TERMS & CONDITIONS */}
          {activeModal === 'terms' && (
            <div className="space-y-4">
              <div className="space-y-1.5 border-b border-ink-3 pb-3 pr-8">
                <span className="text-xs font-tech uppercase tracking-[0.25em] text-lav block font-medium">
                  Legal Policies
                </span>
                <h3 id="modal-title" className="font-editorial font-bold text-2xl text-paper">
                  Terms & Conditions
                </h3>
              </div>
              <div className="text-sm text-paper-dim font-sans space-y-4 max-h-[60vh] overflow-y-auto pr-2 leading-relaxed">
                <p>
                  Welcome to Creator Hub. By accessing or enrolling in Creator Hub, you agree to comply with and be bound by the following terms and conditions.
                </p>
                <h4 className="font-bold text-paper uppercase text-xs font-tech pt-2">
                  1. Educational Nature of Community
                </h4>
                <p>
                  Creator Hub is a structured digital community providing educational resources, production frameworks, and peer networking. It does not constitute investment, financial, or legal counsel.
                </p>
                <h4 className="font-bold text-paper uppercase text-xs font-tech pt-2">
                  2. Individual License & Intellectual Property
                </h4>
                <p>
                  All proprietary Standard Operating Procedures (SOPs), templates, guidelines, and curriculum provided within Creator Hub are protected intellectual property. Access is licensed strictly to a single individual. Unauthorized sharing, reproduction, or distribution results in immediate revocation of access without refund.
                </p>
                <h4 className="font-bold text-paper uppercase text-xs font-tech pt-2">
                  3. Conduct & Community Rules
                </h4>
                <p>
                  Members are expected to treat peers with professionalism and respect. Harassment, spam, unsolicited self-promotion, or deceptive practices will result in immediate removal from all community channels.
                </p>
              </div>
            </div>
          )}

          {/* 4. PRIVACY POLICY */}
          {activeModal === 'privacy' && (
            <div className="space-y-4">
              <div className="space-y-1.5 border-b border-ink-3 pb-3 pr-8">
                <span className="text-xs font-tech uppercase tracking-[0.25em] text-lav block font-medium">
                  Privacy & Security
                </span>
                <h3 id="modal-title" className="font-editorial font-bold text-2xl text-paper">
                  Privacy Policy
                </h3>
              </div>
              <div className="text-sm text-paper-dim font-sans space-y-4 max-h-[60vh] overflow-y-auto pr-2 leading-relaxed">
                <p>
                  Creator Hub is committed to protecting your personal information. This Privacy Policy describes how we collect, use, and protect your information when you apply or join.
                </p>
                <h4 className="font-bold text-paper uppercase text-xs font-tech pt-2">
                  1. Information Collected
                </h4>
                <p>
                  We collect information provided during application and checkout, including your name, email address, social handles, and channel information, solely to administer your membership.
                </p>
                <h4 className="font-bold text-paper uppercase text-xs font-tech pt-2">
                  2. Payment Security
                </h4>
                <p>
                  Payment processing is handled securely by Razorpay. We do not store or process your sensitive credit/debit card details or banking credentials on our servers.
                </p>
                <h4 className="font-bold text-paper uppercase text-xs font-tech pt-2">
                  3. Data Sharing
                </h4>
                <p>
                  We never sell, rent, or trade your personal information to third parties. Data is used exclusively for community administration and direct communications.
                </p>
              </div>
            </div>
          )}

          {/* 5. RETURN & REFUND POLICY */}
          {activeModal === 'refund' && (
            <div className="space-y-4">
              <div className="space-y-1.5 border-b border-ink-3 pb-3 pr-8">
                <span className="text-xs font-tech uppercase tracking-[0.25em] text-lav block font-medium">
                  Commerce Policy
                </span>
                <h3 id="modal-title" className="font-editorial font-bold text-2xl text-paper">
                  Return & Refund Policy
                </h3>
              </div>
              <div className="text-sm text-paper-dim font-sans space-y-4 max-h-[60vh] overflow-y-auto pr-2 leading-relaxed">
                <p>
                  Please review our Return and Refund Policy thoroughly prior to purchasing membership.
                </p>
                <div className="p-4 border border-ink-3 bg-ink space-y-1.5">
                  <span className="font-tech text-paper font-bold uppercase text-xs block">
                    Digital Deliverables — Strict Non-Refundable Terms
                  </span>
                  <p className="text-xs text-paper-dim">
                    Because membership grants immediate access to intellectual property, downloadable SOPs, production templates, and proprietary community channels, all sales are final and strictly non-refundable once payment is completed.
                  </p>
                </div>
                <p>
                  If you encounter any difficulty accessing community channels or digital resources following checkout, please reach out to our team at <strong className="text-paper">drxversion1997@gmail.com</strong> for assistance.
                </p>
              </div>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
