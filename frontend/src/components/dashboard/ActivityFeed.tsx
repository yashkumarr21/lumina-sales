import React, { useState } from 'react';
import { DealActivity } from '../../types';

interface ActivityFeedProps {
  activities: DealActivity[];
  onViewAll?: () => void;
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities, onViewAll }) => {
  const [filter, setFilter] = useState<'all' | 'deal' | 'call' | 'lost'>('all');

  const filtered = activities.filter((act) => filter === 'all' || act.type === filter);

  return (
    <section className="glass-panel rounded-xl p-5 md:p-6 flex flex-col gap-4">
      <div className="flex justify-between items-center border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[20px]">history</span>
          <h2 className="font-headline-md text-[18px] font-bold text-on-surface">
            Live Opportunity Stream
          </h2>
        </div>
        <button
          onClick={onViewAll}
          className="font-label-sm text-label-sm text-primary hover:text-primary-fixed transition-colors flex items-center gap-1 cursor-pointer"
        >
          <span>View All Stream</span>
          <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
        </button>
      </div>

      {/* Quick Filter Badges */}
      <div className="flex gap-2 text-[12px] font-mono">
        {(['all', 'deal', 'call', 'lost'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-2.5 py-1 rounded-full uppercase transition-all ${
              filter === f
                ? 'bg-primary/20 text-primary border border-primary/40'
                : 'bg-white/5 text-on-surface-variant hover:text-white border border-white/10'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Activity List */}
      <div className="flex flex-col gap-2.5 mt-1">
        {filtered.map((item) => {
          let iconBg = 'bg-primary/15 text-primary border-primary/30';
          if (item.type === 'deal') iconBg = 'bg-secondary/15 text-secondary border-secondary/30';
          if (item.type === 'lost') iconBg = 'bg-error/15 text-error border-error/30';

          return (
            <div
              key={item.id}
              className="flex items-center gap-3.5 p-3 rounded-xl glass-inner hover:bg-white/10 border border-white/5 hover:border-white/15 transition-all cursor-pointer group"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border ${iconBg} group-hover:scale-105 transition-transform`}
              >
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-body-md text-on-surface font-semibold truncate group-hover:text-primary transition-colors text-[15px]">
                    {item.title}
                  </p>
                  {item.amount && (
                    <span className="font-mono text-[13px] font-bold text-secondary shrink-0">
                      {item.amount}
                    </span>
                  )}
                </div>
                <p className="font-label-sm text-label-sm text-on-surface-variant truncate">
                  {item.subtitle}
                </p>
              </div>

              <span className="font-mono text-[12px] text-outline shrink-0">{item.timeAgo}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};
