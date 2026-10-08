import React, { useState, useEffect } from 'react';
import { BillingToggle } from '../components/pricing/BillingToggle';
import { PricingCard } from '../components/pricing/PricingCard';
import { FaqAccordion } from '../components/pricing/FaqAccordion';
import { FAQS, PRICING_PLANS } from '../data/mockData';
import { PricingPlan, FaqItem } from '../types';
import { api } from '../services/api';

interface PricingPageProps {
  onOpenDemo: () => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onOpenDemo }) => {
  const [isAnnual, setIsAnnual] = useState(true);
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>(PRICING_PLANS);
  const [faqsList, setFaqsList] = useState<FaqItem[]>(FAQS);

  useEffect(() => {
    let isMounted = true;
    api.getPricingPlans().then((plans) => {
      if (isMounted && plans && plans.length > 0) {
        setPricingPlans(plans);
      }
    });
    api.getFaqs().then((faqs) => {
      if (isMounted && faqs && faqs.length > 0) {
        setFaqsList(faqs);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSelectPlan = (_plan: PricingPlan) => {
    onOpenDemo();
  };

  return (
    <main className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto flex flex-col gap-stack-xl pb-stack-xl pt-[84px]">
      {/* Hero Section */}
      <section className="text-center flex flex-col gap-stack-sm pt-stack-md max-w-3xl mx-auto">
        <span className="font-label-sm text-label-sm text-secondary uppercase font-mono tracking-widest bg-secondary/10 px-3 py-1 rounded-full border border-secondary/30 w-fit mx-auto">
          Transparent & Predictable
        </span>
        <h1 className="font-headline-lg-mobile md:font-display-lg text-headline-lg-mobile md:text-display-lg font-extrabold text-on-surface tracking-tight">
          Pricing for{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-container to-secondary">
            Limitless Scale
          </span>
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
          Choose the plan that fits your technical velocity. No hidden seats or surprise usage bills, just pure ambient intelligence.
        </p>

        {/* Billing Switch */}
        <BillingToggle isAnnual={isAnnual} onChange={setIsAnnual} />
      </section>

      {/* Pricing Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch max-w-6xl mx-auto w-full">
        {pricingPlans.map((plan) => (
          <PricingCard
            key={plan.id}
            plan={plan}
            isAnnual={isAnnual}
            onSelectPlan={handleSelectPlan}
          />
        ))}
      </section>

      {/* FAQ Accordion */}
      <FaqAccordion faqs={faqsList} />

      {/* Final CTA Banner */}
      <section className="glass-panel-highlight rounded-2xl p-8 md:p-12 text-center flex flex-col gap-4 items-center max-w-4xl mx-auto w-full border border-primary/30 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />
        <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface font-black">
          Start Your Sales Transformation Today
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md mx-auto">
          Join thousands of forward-thinking enterprise revenue teams optimizing their pipelines with Lumina.
        </p>
        <button
          onClick={onOpenDemo}
          className="btn-primary py-4 px-8 rounded-full font-label-md text-label-md font-bold mt-2 hover:shadow-[0_0_25px_rgba(77,142,255,0.6)] transition-all cursor-pointer"
        >
          Deploy Lumina Enterprise
        </button>
      </section>
    </main>
  );
};
