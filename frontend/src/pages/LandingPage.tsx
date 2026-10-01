import React from 'react';
import { HeroSection } from '../components/landing/HeroSection';
import { SocialProofMarquee } from '../components/landing/SocialProofMarquee';
import { FeaturePreviewCard } from '../components/landing/FeaturePreviewCard';
import { NavigationPage } from '../types';

interface LandingPageProps {
  onNavigate: (page: NavigationPage) => void;
  onOpenDemo: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, onOpenDemo }) => {
  return (
    <div className="flex-grow pt-[80px] pb-stack-xl flex flex-col px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full z-10 relative">
      {/* Hero Section */}
      <HeroSection
        onBookDemo={onOpenDemo}
        onWatchDemo={() => onNavigate('dashboard')}
      />

      {/* Social Proof Infinite Marquee */}
      <SocialProofMarquee />

      {/* Features Preview Section */}
      <section className="flex flex-col gap-stack-md mt-6">
        <div className="text-center mb-4">
          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-mono">
            Autonomous Capabilities
          </span>
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg font-bold text-on-surface mt-1">
            Engineered for Modern Revenue Engines
          </h2>
        </div>

        {/* Feature 1: AI Lead Scoring */}
        <FeaturePreviewCard
          title="AI Lead Scoring & Intent Signals"
          badge="94% Accuracy"
          description="Predictive neural models evaluate 150+ behavioral and firmographic data points in real-time to identify high-probability enterprise accounts, maximizing AE closing velocity."
          icon="target"
          glowColor="primary"
          glowPosition="top-right"
          imageUrl="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
        />

        {/* Feature 2: Pipeline Automation */}
        <FeaturePreviewCard
          title="Zero-Touch Pipeline Automation"
          badge="3.2x Reply Surge"
          description="Automate bespoke outreach, trigger executive battlecards, and progress deals through complex multi-stage approvals with contextual AI co-pilots."
          icon="schema"
          glowColor="secondary"
          glowPosition="bottom-left"
          imageUrl="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80"
        />
      </section>

      {/* Bottom CTA Banner */}
      <section className="glass-panel-highlight rounded-2xl p-8 md:p-12 text-center flex flex-col gap-4 items-center mt-stack-xl border border-primary/40 relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-52 h-52 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-52 h-52 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

        <span className="font-mono text-xs text-secondary tracking-widest uppercase bg-secondary/10 px-3 py-1 rounded-full border border-secondary/30">
          Ready for Ambient Acceleration?
        </span>
        <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface font-black max-w-2xl">
          Accelerate Your Sales Pipeline with Lumina AI
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg mx-auto">
          Deploy within minutes. Integrate your CRM. Experience immediate pipeline clarity.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mt-2 w-full sm:w-auto">
          <button
            onClick={() => onNavigate('signup')}
            className="btn-primary px-8 py-4 rounded-xl font-label-md text-label-md font-bold"
          >
            Create Enterprise Account
          </button>
          <button
            onClick={() => onNavigate('pricing')}
            className="btn-secondary px-8 py-4 rounded-xl font-label-md text-label-md font-semibold"
          >
            View Pricing Plans
          </button>
        </div>
      </section>
    </div>
  );
};
