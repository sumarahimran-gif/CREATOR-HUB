import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroScrollStoryboard } from './components/HeroScrollStoryboard';
import { AboutSection } from './components/AboutSection';
import { PillarsSection } from './components/PillarsSection';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { ResultsSection } from './components/ResultsSection';
import { AudienceFitSection } from './components/AudienceFitSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { MembershipAndCTASection } from './components/MembershipAndCTASection';
import { FaqSection } from './components/FaqSection';
import { FooterAndContact } from './components/FooterAndContact';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { Modals } from './components/Modals';
import { BackToTopButton } from './components/BackToTopButton';
import { ModalType } from './types';
import { soundFx } from './utils/audio';
import { ImageViewerProvider } from './components/ImageViewer';

export default function App() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  // High-performance scroll threshold listener for BackToTop only (no state updates on every pixel scroll)
  useEffect(() => {
    const handleScroll = () => {
      const isPast = window.scrollY > 450;
      setShowBackToTop((prev) => (prev !== isPast ? isPast : prev));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSound = () => {
    const newState = soundFx.toggle();
    setSoundEnabled(newState);
  };

  const handleOpenRazorpay = () => {
    soundFx.playAction();
    window.open('https://rzp.io/rzp/sKzhFuMF', '_blank', 'noopener,noreferrer');
  };

  return (
    <ImageViewerProvider>
    <div className="relative min-h-screen bg-ink text-paper selection:bg-lav/30 selection:text-paper font-sans antialiased">
      {/* Subtle, High-Performance Scroll Depth Progress Bar (z-index 30, lower than modals) */}
      <ScrollProgressBar />

      {/* Persistent Minimal Architectural Navigation Bar */}
      <Navbar
        visible={true}
        onOpenApply={() => setActiveModal('apply')}
        onOpenContact={() => setActiveModal('contact')}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      {/* Main Architectural Website Design */}
      <main className="relative z-10">
        {/* Hero: Orchestrated entrance animation, 3D mouse parallax, line-by-line reveals, scroll-out transforms */}
        <HeroScrollStoryboard
          onOpenApply={() => setActiveModal('apply')}
          onOpenContact={() => setActiveModal('contact')}
          onNavbarShow={() => {}}
        />

        {/* About & The Objective */}
        <AboutSection onOpenApply={() => setActiveModal('apply')} />

        {/* 3 Foundational Pillars */}
        <PillarsSection onOpenApply={() => setActiveModal('apply')} />

        {/* What Members Get (Balanced 6-column centered layout) */}
        <ProjectsShowcase />

        <ResultsSection />

        {/* Who This Is For — and Who It Isn't (Light Section 1: paper background with ink text) */}
        <AudienceFitSection />

        {/* How It Works (4-Step Sequential Roadmap with consistent payment copy) */}
        <HowItWorksSection
          onOpenApply={() => setActiveModal('apply')}
          onOpenRazorpay={handleOpenRazorpay}
        />

        {/* Membership Inclusions & Direct Enrollment (Light Section 2: paper background with ink text) */}
        <MembershipAndCTASection
          onOpenApply={() => setActiveModal('apply')}
          onOpenRazorpay={handleOpenRazorpay}
          onOpenContact={() => setActiveModal('contact')}
        />

        {/* Frequently Asked Questions (Merged duplicate guarantees & isolated refund policy link) */}
        <FaqSection
          onOpenRefundPolicy={() => setActiveModal('refund')}
          onOpenContact={() => setActiveModal('contact')}
        />
      </main>

      {/* Contact, Final CTA & Footer */}
      <FooterAndContact
        onOpenTerms={() => setActiveModal('terms')}
        onOpenPrivacy={() => setActiveModal('privacy')}
        onOpenRefund={() => setActiveModal('refund')}
        onOpenApply={() => setActiveModal('apply')}
        onOpenRazorpay={handleOpenRazorpay}
        onOpenContact={() => setActiveModal('contact')}
      />

      {/* Interactive Modals (Embedded Google Form & Direct Contact) */}
      <Modals
        activeModal={activeModal}
        onClose={() => setActiveModal(null)}
        onOpenRazorpay={handleOpenRazorpay}
      />

      {/* Floating Back-To-Top Action Button (Appears past Hero section) */}
      <BackToTopButton show={showBackToTop} />
    </div>
    </ImageViewerProvider>
  );
}
