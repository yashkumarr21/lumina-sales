import React from 'react';
import { PageTab } from '../../types';

interface TabNavigationProps {
  activeTab: PageTab;
  onTabChange: (tab: PageTab) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs: { id: PageTab; label: string; count?: number }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'leads', label: 'Leads', count: 48 },
    { id: 'deals', label: 'Deals', count: 12 },
    { id: 'analytics', label: 'Analytics' },
  ];

  return (
    <nav className="flex gap-2 overflow-x-auto no-scrollbar pb-2 snap-x">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`snap-start shrink-0 px-4 py-2 rounded-full font-label-md text-label-md transition-all duration-200 flex items-center gap-2 ${
              isActive
                ? 'bg-primary/20 text-primary border border-primary/40 shadow-[0_0_15px_rgba(173,198,255,0.25)] font-semibold'
                : 'glass-panel text-on-surface-variant hover:text-on-surface hover:bg-white/15'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={`text-[11px] px-1.5 py-0.2 rounded-full font-mono ${
                  isActive ? 'bg-primary text-[#002e6a] font-bold' : 'bg-white/10 text-on-surface-variant'
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
};
