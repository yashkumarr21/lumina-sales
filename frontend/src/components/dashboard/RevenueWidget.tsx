import React from 'react';

interface RevenueWidgetProps {
  totalRevenue?: string;
  growthRate?: string;
}

export const RevenueWidget: React.FC<RevenueWidgetProps> = ({
  totalRevenue = '$1.2M',
  growthRate = '+14.2%',
}) => {
  return (
    <section className="glass-panel rounded-xl p-5 md:p-6 flex flex-col gap-4 relative overflow-hidden group">
      {/* Background glow */}
      <div className="absolute -top-16 -right-16 w-44 h-44 bg-primary/15 rounded-full blur-3xl group-hover:bg-primary/25 transition-all duration-500 pointer-events-none" />

      <div className="flex justify-between items-start relative z-10">
        <div>
          <h2 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
            Total Revenue
          </h2>
          <div className="flex items-baseline gap-2 mt-1">
            <p className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface font-extrabold tracking-tight">
              {totalRevenue}
            </p>
            <span className="font-label-sm text-label-sm text-outline">ARR</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-secondary-container/20 text-secondary px-3 py-1.5 rounded-full border border-secondary/30 shadow-[0_0_12px_rgba(76,215,246,0.2)]">
          <span className="material-symbols-outlined text-[16px]">trending_up</span>
          <span className="font-label-sm text-label-sm font-semibold">{growthRate}</span>
        </div>
      </div>

      {/* SVG Interactive Wave Chart Area */}
      <div className="h-36 md:h-44 w-full mt-2 relative">
        <svg className="w-full h-full preserve-3d" preserveAspectRatio="none" viewBox="0 0 100 50">
          <defs>
            <linearGradient id="chartGradient" x1="0%" x2="0%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#4D8EFF" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#4D8EFF" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="lineGrad" x1="0%" x2="100%" y1="0%" y2="0%">
              <stop offset="0%" stopColor="#4D8EFF" />
              <stop offset="50%" stopColor="#4CD7F6" />
              <stop offset="100%" stopColor="#D0BCFF" />
            </linearGradient>
          </defs>
          <path
            d="M0,40 C15,36 28,12 50,22 C68,30 82,6 100,10 L100,50 L0,50 Z"
            fill="url(#chartGradient)"
          />
          <path
            d="M0,40 C15,36 28,12 50,22 C68,30 82,6 100,10"
            fill="none"
            stroke="url(#lineGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="50" cy="22" r="3" fill="#4CD7F6" className="animate-ping" opacity="0.6" />
          <circle cx="50" cy="22" r="2.5" fill="#FFFFFF" stroke="#4CD7F6" strokeWidth="1" />
          <circle cx="100" cy="10" r="3" fill="#D0BCFF" />
        </svg>

        {/* Floating Pulse Toast on Chart */}
        <div className="absolute bottom-3 right-2 md:right-4 glass-modal rounded-xl p-2.5 md:p-3 flex items-center gap-3 border border-secondary/30 shadow-xl animate-pulse-subtle">
          <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center shrink-0 border border-secondary/30">
            <span className="material-symbols-outlined text-secondary text-[18px]">check_circle</span>
          </div>
          <div>
            <p className="font-label-sm text-label-sm font-bold text-on-surface">Deal Closed</p>
            <p className="font-label-sm text-label-sm text-secondary font-mono text-[11px]">$45,000 • Acme Corp</p>
          </div>
        </div>
      </div>
    </section>
  );
};
