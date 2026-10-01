import React from 'react';

interface BillingToggleProps {
  isAnnual: boolean;
  onChange: (annual: boolean) => void;
}

export const BillingToggle: React.FC<BillingToggleProps> = ({ isAnnual, onChange }) => {
  return (
    <div className="flex items-center justify-center gap-3 my-4">
      <span
        className={`font-label-md text-label-md cursor-pointer transition-colors ${
          !isAnnual ? 'text-on-surface font-bold' : 'text-on-surface-variant'
        }`}
        onClick={() => onChange(false)}
      >
        Monthly Billing
      </span>

      <button
        onClick={() => onChange(!isAnnual)}
        className="w-14 h-8 rounded-full glass-panel p-1 border border-white/20 relative transition-colors focus:outline-none"
        aria-label="Toggle annual or monthly billing"
      >
        <div
          className={`w-6 h-6 rounded-full bg-gradient-to-r from-primary to-secondary shadow-md transform transition-transform duration-300 ${
            isAnnual ? 'translate-x-6' : 'translate-x-0'
          }`}
        />
      </button>

      <span
        className={`font-label-md text-label-md cursor-pointer flex items-center gap-1.5 transition-colors ${
          isAnnual ? 'text-on-surface font-bold' : 'text-on-surface-variant'
        }`}
        onClick={() => onChange(true)}
      >
        <span>Annual Billing</span>
        <span className="bg-secondary/20 text-secondary border border-secondary/30 text-[11px] px-2 py-0.5 rounded-full font-mono font-bold uppercase">
          Save ~20%
        </span>
      </span>
    </div>
  );
};
