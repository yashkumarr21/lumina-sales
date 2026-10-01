import React from 'react';
import { PricingPlan } from '../../types';

interface PricingCardProps {
  plan: PricingPlan;
  isAnnual: boolean;
  onSelectPlan: (plan: PricingPlan) => void;
}

export const PricingCard: React.FC<PricingCardProps> = ({ plan, isAnnual, onSelectPlan }) => {
  const price = isAnnual ? plan.priceAnnual : plan.priceMonthly;

  if (plan.highlighted) {
    return (
      <div className="glass-panel-highlight rounded-2xl p-7 md:p-8 flex flex-col gap-6 relative overflow-hidden md:scale-105 z-10 shadow-2xl transition-all duration-300">
        {/* Glow & Badge */}
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-primary/25 rounded-full blur-3xl pointer-events-none" />
        
        {plan.badge && (
          <div className="absolute top-0 right-0 bg-gradient-to-r from-primary-container to-secondary text-[#002e6a] font-mono text-xs px-3.5 py-1.5 rounded-bl-xl rounded-tr-2xl font-black uppercase tracking-wider">
            {plan.badge}
          </div>
        )}

        <div className="flex flex-col gap-1.5 relative z-10">
          <h3 className="font-headline-md text-headline-md text-primary-fixed font-bold">
            {plan.name}
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant">
            {plan.description}
          </p>
        </div>

        <div className="flex items-baseline gap-1.5 relative z-10">
          <span className="font-display-lg text-[42px] md:text-[52px] leading-none text-on-surface font-extrabold tracking-tight">
            ${price}
          </span>
          <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">
            /user/mo
          </span>
          {isAnnual && (
            <span className="text-[11px] font-mono text-secondary ml-1 bg-secondary/10 px-2 py-0.5 rounded">
              Billed yearly
            </span>
          )}
        </div>

        <ul className="flex flex-col gap-3.5 font-body-md text-body-md text-on-surface relative z-10 my-2">
          {plan.features.map((feature, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 border-b border-white/10 pb-2.5 hover:bg-white/5 transition-colors p-1 rounded"
            >
              <span
                className="material-symbols-outlined text-primary-container text-[18px] shrink-0 mt-0.5"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
              <span className="text-[14px] leading-snug">{feature}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={() => onSelectPlan(plan)}
          className="w-full mt-auto bg-gradient-to-r from-primary-container to-secondary text-white font-label-md text-label-md py-3.5 rounded-xl hover:opacity-95 shadow-[0_0_20px_rgba(77,142,255,0.4)] transition-all font-bold cursor-pointer"
        >
          {plan.ctaText}
        </button>
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-2xl p-6 md:p-7 flex flex-col gap-6 relative overflow-hidden group hover:bg-white/15 transition-all duration-300 border border-white/10">
      {plan.badge && (
        <div className="absolute top-0 right-0 bg-white/10 text-on-surface font-mono text-xs px-3 py-1 rounded-bl-xl rounded-tr-2xl font-bold uppercase tracking-wider">
          {plan.badge}
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
          {plan.name}
        </h3>
        <p className="font-body-md text-body-md text-on-surface-variant">
          {plan.description}
        </p>
      </div>

      <div className="flex items-baseline gap-1.5">
        <span className="font-display-lg text-[38px] md:text-[46px] leading-none text-on-surface font-extrabold tracking-tight">
          {plan.priceMonthly === 399 && plan.name === 'Enterprise' ? 'Custom' : `$${price}`}
        </span>
        {plan.name !== 'Enterprise' && (
          <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">
            /user/mo
          </span>
        )}
      </div>

      <ul className="flex flex-col gap-3 font-body-md text-body-md text-on-surface-variant my-2">
        {plan.features.map((feature, idx) => (
          <li
            key={idx}
            className="flex items-start gap-3 border-b border-white/10 pb-2 hover:bg-white/5 transition-colors p-1 rounded"
          >
            <span
              className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check
            </span>
            <span className="text-[14px] leading-snug">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => onSelectPlan(plan)}
        className="w-full mt-auto bg-white/10 backdrop-blur-3xl border border-white/20 text-on-surface font-label-md text-label-md py-3 rounded-xl hover:bg-white/20 hover:border-white/30 transition-all font-semibold cursor-pointer"
      >
        {plan.ctaText}
      </button>
    </div>
  );
};
