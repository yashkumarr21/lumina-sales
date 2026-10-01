import React from 'react';
import { FeatureCapability } from '../../types';
import { ProspectMatchBar } from './ProspectMatchBar';

interface CapabilityDetailCardProps {
  capability: FeatureCapability;
  index: number;
}

export const CapabilityDetailCard: React.FC<CapabilityDetailCardProps> = ({ capability, index }) => {
  const isLeadScoring = capability.id === 'ai-lead-scoring';
  const hasOutreachStats = capability.id === 'automated-outreach' && capability.metrics;
  const isEven = index % 2 === 0;

  return (
    <div className="glass-panel rounded-2xl p-6 md:p-8 flex flex-col gap-4 relative overflow-hidden group hover:border-white/30 transition-all duration-300">
      {/* Aurora Ambient Glow Blob */}
      <div
        className={`absolute w-48 h-48 rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
          isEven
            ? '-top-16 -right-16 bg-primary/20 group-hover:bg-primary/35'
            : '-bottom-16 -left-16 bg-secondary/20 group-hover:bg-secondary/35'
        }`}
      />

      <div className="flex items-center gap-4 relative z-10">
        <div className="w-12 h-12 rounded-full glass-inner flex items-center justify-center border border-white/15 group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(77,142,255,0.2)]">
          <span
            className="material-symbols-outlined text-primary text-2xl drop-shadow-[0_0_8px_rgba(173,198,255,0.8)]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            {capability.icon}
          </span>
        </div>
        <div>
          <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
            {capability.title}
          </h2>
          <span className="font-label-sm text-label-sm text-secondary uppercase font-mono">
            {capability.highlightStat.sublabel || 'Enterprise AI Engine'}
          </span>
        </div>
      </div>

      <p className="font-body-md text-body-md text-on-surface-variant relative z-10 leading-relaxed">
        {capability.description}
      </p>

      {/* Interactive Simulation or Stats Metric Bar */}
      {isLeadScoring && <ProspectMatchBar initialScore={98} />}

      {hasOutreachStats && (
        <div className="glass-inner rounded-xl p-4 mt-2 border border-white/10 relative z-10 flex gap-4">
          <div className="flex-1 text-center py-1">
            <div className="font-headline-md text-headline-md text-primary font-black">
              {capability.metrics?.primary.value}
            </div>
            <div className="font-label-sm text-label-sm text-on-surface-variant uppercase mt-1">
              {capability.metrics?.primary.label}
            </div>
          </div>
          <div className="w-px bg-white/10" />
          <div className="flex-1 text-center py-1">
            <div className="font-headline-md text-headline-md text-secondary font-black">
              {capability.metrics?.secondary.value}
            </div>
            <div className="font-label-sm text-label-sm text-on-surface-variant uppercase mt-1">
              {capability.metrics?.secondary.label}
            </div>
          </div>
        </div>
      )}

      {capability.id === 'deal-intelligence' && capability.metrics && (
        <div className="glass-inner rounded-xl p-4 mt-2 border border-white/10 relative z-10 flex gap-4">
          <div className="flex-1 text-center py-1">
            <div className="font-headline-md text-headline-md text-tertiary font-black">
              {capability.metrics.primary.value}
            </div>
            <div className="font-label-sm text-label-sm text-on-surface-variant uppercase mt-1">
              {capability.metrics.primary.label}
            </div>
          </div>
          <div className="w-px bg-white/10" />
          <div className="flex-1 text-center py-1">
            <div className="font-headline-md text-headline-md text-secondary font-black">
              {capability.metrics.secondary.value}
            </div>
            <div className="font-label-sm text-label-sm text-on-surface-variant uppercase mt-1">
              {capability.metrics.secondary.label}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
