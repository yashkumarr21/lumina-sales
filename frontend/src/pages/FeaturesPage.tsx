import React, { useState, useEffect } from 'react';
import { CapabilityDetailCard } from '../components/features/CapabilityDetailCard';
import { CAPABILITIES } from '../data/mockData';
import { FeatureCapability } from '../types';
import { api } from '../services/api';

interface FeaturesPageProps {
  onOpenDemo: () => void;
}

export const FeaturesPage: React.FC<FeaturesPageProps> = ({ onOpenDemo }) => {
  const [capabilitiesList, setCapabilitiesList] = useState<FeatureCapability[]>(CAPABILITIES);

  useEffect(() => {
    let isMounted = true;
    api.getCapabilities().then((caps) => {
      if (isMounted && caps && caps.length > 0) {
        setCapabilitiesList(caps);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="relative z-10 pt-[80px] pb-32 px-margin-mobile md:px-margin-desktop flex flex-col gap-stack-xl max-w-container-max mx-auto w-full">
      {/* Header */}
      <header className="text-center pt-6 md:pt-10 max-w-3xl mx-auto">
        <span className="font-label-sm text-label-sm text-secondary uppercase font-mono tracking-widest bg-secondary/10 px-3 py-1 rounded-full border border-secondary/30">
          Modular Intelligence Architecture
        </span>
        <h1 className="font-headline-lg-mobile md:font-display-lg text-headline-lg-mobile md:text-display-lg font-extrabold text-primary-fixed mt-3 drop-shadow-[0_0_20px_rgba(173,198,255,0.4)]">
          Core Capabilities
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mt-3 leading-relaxed">
          Discover the intelligent autonomous models powering the next generation of enterprise revenue operations.
        </p>
      </header>

      {/* Capabilities Vertical Stack */}
      <section className="flex flex-col gap-stack-md max-w-4xl mx-auto w-full">
        {capabilitiesList.map((capability, index) => (
          <CapabilityDetailCard
            key={capability.id}
            capability={capability}
            index={index}
          />
        ))}
      </section>

      {/* Technical Spec Glass Grid */}
      <section className="glass-card-dark rounded-2xl p-8 max-w-4xl mx-auto w-full border border-white/10">
        <h3 className="font-headline-md text-headline-md font-bold text-on-surface text-center mb-6">
          Enterprise Security & Model Specifications
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center">
            <span className="material-symbols-outlined text-secondary text-3xl mb-2">lock</span>
            <h4 className="font-bold text-on-surface">SOC2 Type II Certified</h4>
            <p className="text-xs text-on-surface-variant mt-1">Full end-to-end encrypted storage & isolation</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="material-symbols-outlined text-primary text-3xl mb-2">sync_alt</span>
            <h4 className="font-bold text-on-surface">&lt; 150ms Latency</h4>
            <p className="text-xs text-on-surface-variant mt-1">Real-time edge telemetry and CRM synchronization</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="material-symbols-outlined text-tertiary text-3xl mb-2">shield_with_heart</span>
            <h4 className="font-bold text-on-surface">Zero Data Training</h4>
            <p className="text-xs text-on-surface-variant mt-1">Your confidential CRM data is never retained for LLM fine-tuning</p>
          </div>
        </div>
      </section>

      {/* Floating Action Button (Mobile) */}
      <div className="fixed bottom-6 left-margin-mobile right-margin-mobile z-50 md:hidden">
        <button
          onClick={onOpenDemo}
          className="w-full bg-gradient-to-r from-inverse-primary to-secondary text-white font-label-md text-label-md py-4 rounded-xl shadow-[0_10px_30px_rgba(0,90,194,0.5)] hover:shadow-[0_15px_40px_rgba(76,215,246,0.6)] transition-all flex items-center justify-center gap-2 font-bold"
        >
          <span>Request Enterprise Demo</span>
          <span className="material-symbols-outlined text-xl">arrow_forward</span>
        </button>
      </div>
    </main>
  );
};
