import React, { useState, useEffect } from 'react';
import { TabNavigation } from '../components/dashboard/TabNavigation';
import { RevenueWidget } from '../components/dashboard/RevenueWidget';
import { PipelineGaugeWidget } from '../components/dashboard/PipelineGaugeWidget';
import { WinRateWidget } from '../components/dashboard/WinRateWidget';
import { ActivityFeed } from '../components/dashboard/ActivityFeed';
import { FloatingActionButton } from '../components/common/FloatingActionButton';
import { ACTIVITIES } from '../data/mockData';
import { DealActivity, PageTab } from '../types';
import { api } from '../services/api';

interface DashboardPageProps {
  onOpenDemo: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onOpenDemo }) => {
  const [activeTab, setActiveTab] = useState<PageTab>('overview');
  const [activitiesList, setActivitiesList] = useState<DealActivity[]>(ACTIVITIES);
  const [leadsList, setLeadsList] = useState<any[]>([
    { company: 'Vertex Robotics', score: '98%', contact: 'David Vance (CTO)', val: '$140k' },
    { company: 'CloudWave Global', score: '95%', contact: 'Elena Rostova (VP Sales)', val: '$90k' },
    { company: 'NextGen Financial', score: '92%', contact: 'Marcus Thorne (CFO)', val: '$210k' },
    { company: 'BioTech Synergy', score: '89%', contact: 'Claire Zhao (Head of Ops)', val: '$65k' },
  ]);
  const [notificationOpen, setNotificationOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;
    api.getActivities().then((data) => {
      if (isMounted && data && data.length > 0) {
        setActivitiesList(data);
      }
    });
    api.getLeads().then((data) => {
      if (isMounted && data && data.length > 0) {
        setLeadsList(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleAddRecord = async (title: string, value: string) => {
    const createdActivity = await api.createActivity({
      title,
      amount: value,
      subtitle: `New inbound pipeline created (${value})`,
      type: 'deal',
    });
    setActivitiesList((prev) => [createdActivity, ...prev]);
  };

  return (
    <main className="relative z-10 pt-[76px] pb-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full flex flex-col gap-stack-md">
      {/* Header */}
      <header className="flex justify-between items-center py-4 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
            <h1 className="font-headline-md text-headline-md text-on-surface font-extrabold tracking-tight">
              Sales Pilot Intelligence
            </h1>
          </div>
          <p className="font-label-md text-label-md text-on-surface-variant">
            Ambient Executive Overview & Real-Time Deal Telemetry
          </p>
        </div>

        {/* Notifications & Action */}
        <div className="relative">
          <button
            onClick={() => setNotificationOpen(!notificationOpen)}
            className="w-10 h-10 rounded-full glass-panel flex items-center justify-center glass-hover transition-all text-on-surface hover:text-primary relative"
            aria-label="View notifications"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full ring-2 ring-[#0b1326]" />
          </button>

          {notificationOpen && (
            <div className="absolute right-0 mt-2 w-80 glass-modal rounded-xl p-4 border border-white/20 shadow-2xl z-50 animate-fadeIn">
              <div className="flex justify-between items-center pb-2 border-b border-white/10 mb-2">
                <span className="font-label-sm font-bold text-on-surface">Intelligence Alerts</span>
                <span className="font-mono text-[11px] text-secondary">3 New</span>
              </div>
              <div className="flex flex-col gap-2 text-xs">
                <div className="p-2 rounded bg-white/5 border border-white/5">
                  <p className="text-on-surface font-semibold">⚡ Vertex Labs Lead Surge</p>
                  <p className="text-on-surface-variant text-[11px]">Score increased to 98% based on website telemetry.</p>
                </div>
                <div className="p-2 rounded bg-white/5 border border-white/5">
                  <p className="text-on-surface font-semibold">🤝 TechNova In Negotiation</p>
                  <p className="text-on-surface-variant text-[11px]">AE Sarah requested executive pricing signoff.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Tabs */}
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Grid View */}
      {activeTab === 'overview' && (
        <div className="flex flex-col gap-stack-md">
          {/* Revenue Chart Widget */}
          <RevenueWidget totalRevenue="$1,248,000" growthRate="+14.2%" />

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-stack-sm md:gap-gutter">
            <PipelineGaugeWidget percentage={75} totalPipeline="$3.4M" />
            <WinRateWidget winRate={42} change={2.1} isNegative={false} />
          </div>

          {/* Recent Activity List */}
          <ActivityFeed
            activities={activitiesList}
            onViewAll={() => setActiveTab('deals')}
          />
        </div>
      )}

      {activeTab === 'leads' && (
        <div className="glass-panel rounded-2xl p-6 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h3 className="font-headline-md text-headline-md font-bold text-on-surface">
              Autonomous AI Leads (48)
            </h3>
            <button onClick={onOpenDemo} className="btn-primary px-4 py-1.5 rounded-lg text-sm font-medium">
              Export Enriched List
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {leadsList.map((lead, idx) => (
              <div key={idx} className="glass-inner p-4 rounded-xl border border-white/10 flex justify-between items-center">
                <div>
                  <h4 className="font-semibold text-on-surface">{lead.company}</h4>
                  <p className="text-xs text-on-surface-variant">{lead.contact}</p>
                </div>
                <div className="text-right">
                  <span className="font-mono text-sm font-bold text-secondary bg-secondary/15 px-2 py-0.5 rounded">
                    {lead.score} Fit
                  </span>
                  <p className="text-xs font-mono text-outline mt-1">{lead.val} Est.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'deals' && (
        <div className="glass-panel rounded-2xl p-6 flex flex-col gap-4">
          <h3 className="font-headline-md text-headline-md font-bold text-on-surface">
            Active Deal Pipelines
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
            <div className="glass-inner p-4 rounded-xl">
              <span className="text-xs text-on-surface-variant uppercase">Discovery</span>
              <p className="text-2xl font-bold text-primary mt-1">$920K</p>
              <span className="text-xs text-outline">6 Deals</span>
            </div>
            <div className="glass-inner p-4 rounded-xl">
              <span className="text-xs text-on-surface-variant uppercase">Proposal</span>
              <p className="text-2xl font-bold text-secondary mt-1">$1.48M</p>
              <span className="text-xs text-outline">4 Deals</span>
            </div>
            <div className="glass-inner p-4 rounded-xl">
              <span className="text-xs text-on-surface-variant uppercase">Negotiation</span>
              <p className="text-2xl font-bold text-tertiary mt-1">$1.02M</p>
              <span className="text-xs text-outline">2 Deals</span>
            </div>
          </div>
          <ActivityFeed activities={activitiesList} />
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="glass-panel rounded-2xl p-6 flex flex-col gap-6">
          <h3 className="font-headline-md text-headline-md font-bold text-on-surface">
            Revenue Predictive Telemetry
          </h3>
          <RevenueWidget totalRevenue="$1.248M" growthRate="+14.2%" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="glass-inner p-4 rounded-xl">
              <span className="text-xs text-on-surface-variant uppercase font-mono">Avg Deal Cycle</span>
              <p className="text-3xl font-extrabold text-on-surface mt-1">18.4 Days</p>
              <p className="text-xs text-secondary mt-1">↓ 32% faster vs Q2</p>
            </div>
            <div className="glass-inner p-4 rounded-xl">
              <span className="text-xs text-on-surface-variant uppercase font-mono">Quota Attainment</span>
              <p className="text-3xl font-extrabold text-on-surface mt-1">118%</p>
              <p className="text-xs text-primary mt-1">14 of 16 reps above quota</p>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <FloatingActionButton onAddRecord={handleAddRecord} />
    </main>
  );
};
