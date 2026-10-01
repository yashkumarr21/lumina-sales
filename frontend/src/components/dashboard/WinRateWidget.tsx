import React from 'react';

interface WinRateWidgetProps {
  winRate?: number;
  change?: number;
  isNegative?: boolean;
}

export const WinRateWidget: React.FC<WinRateWidgetProps> = ({
  winRate = 42,
  change = 2.1,
  isNegative = true,
}) => {
  return (
    <div className="glass-panel rounded-xl p-5 flex flex-col justify-between aspect-square relative overflow-hidden group hover:border-white/30 transition-all">
      <div className="flex justify-between items-center">
        <h3 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
          Win Rate
        </h3>
        <span className="font-label-sm text-label-sm text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20 font-mono">
          Q3
        </span>
      </div>

      <div className="flex flex-col my-auto">
        <div className="flex items-baseline gap-1">
          <span className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg font-black text-on-surface tracking-tight">
            {winRate}%
          </span>
          <span className="font-label-sm text-label-sm text-outline">closed</span>
        </div>

        <div className="flex items-center gap-1.5 mt-2">
          <span
            className={`font-label-sm text-label-sm flex items-center gap-0.5 px-2 py-0.5 rounded-md ${
              isNegative
                ? 'text-error bg-error/15 border border-error/25'
                : 'text-secondary bg-secondary/15 border border-secondary/25'
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">
              {isNegative ? 'arrow_downward' : 'arrow_upward'}
            </span>
            <span>{change}% vs last mo</span>
          </span>
        </div>
      </div>

      <div className="w-full border-t border-white/10 pt-2.5 flex justify-between items-center text-[12px] font-label-sm text-on-surface-variant">
        <span>Benchmark: 38%</span>
        <span className="text-primary font-semibold">+4% Ahead</span>
      </div>
    </div>
  );
};
