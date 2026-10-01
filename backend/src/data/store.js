import { randomUUID } from 'crypto';
import { hashPassword } from '../utils/authUtils.js';

/**
 * Lumina Enterprise In-Memory Data Store
 * Initialized with curated enterprise sales pipeline and telemetry data
 */

const initialActivities = [
  {
    id: 'act-1',
    title: 'TechNova Enterprise Deal',
    subtitle: 'Moved to Negotiation ($180k ARR)',
    timeAgo: '2h ago',
    type: 'deal',
    statusColor: 'secondary',
    icon: 'handshake',
    amount: '$180,000',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'act-2',
    title: 'Discovery Call - Vertex Labs',
    subtitle: 'Logged by Sarah Jenkins (VP Sales)',
    timeAgo: '5h ago',
    type: 'call',
    statusColor: 'primary',
    icon: 'call',
    amount: '$95,000',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'act-3',
    title: 'Global Logistics RFP',
    subtitle: 'Competitor selected - Closed Lost',
    timeAgo: '1d ago',
    type: 'lost',
    statusColor: 'error',
    icon: 'cancel',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'act-4',
    title: 'CyberGuard Systems Contract',
    subtitle: 'Signed by CEO • Payment verified',
    timeAgo: '1d ago',
    type: 'deal',
    statusColor: 'secondary',
    icon: 'verified',
    amount: '$240,000',
    createdAt: new Date(Date.now() - 28 * 60 * 60 * 1000).toISOString(),
  },
];

const initialLeads = [
  {
    id: 'lead-1',
    company: 'Vertex Robotics',
    score: '98%',
    contact: 'David Vance (CTO)',
    val: '$140k',
    stage: 'Hot',
    employees: '250-500',
    location: 'San Francisco, CA',
  },
  {
    id: 'lead-2',
    company: 'CloudWave Global',
    score: '95%',
    contact: 'Elena Rostova (VP Sales)',
    val: '$90k',
    stage: 'Qualified',
    employees: '100-250',
    location: 'Austin, TX',
  },
  {
    id: 'lead-3',
    company: 'NextGen Financial',
    score: '92%',
    contact: 'Marcus Thorne (CFO)',
    val: '$210k',
    stage: 'Discovery',
    employees: '500-1000',
    location: 'New York, NY',
  },
  {
    id: 'lead-4',
    company: 'BioTech Synergy',
    score: '89%',
    contact: 'Claire Zhao (Head of Ops)',
    val: '$65k',
    stage: 'Nurturing',
    employees: '50-100',
    location: 'Boston, MA',
  },
];

const initialDealsByStage = {
  discovery: {
    stage: 'Discovery',
    amount: '$920,000',
    count: 6,
    deals: [
      { id: 'd-1', name: 'NextGen Core Modernization', company: 'NextGen Financial', amount: '$210,000', probability: 45 },
      { id: 'd-2', name: 'OmniHealth EHR Cloud', company: 'OmniHealth Inc', amount: '$310,000', probability: 40 },
      { id: 'd-3', name: 'Strata Energy Telemetry', company: 'Strata Energy', amount: '$400,000', probability: 50 },
    ],
  },
  proposal: {
    stage: 'Proposal',
    amount: '$1,480,000',
    count: 4,
    deals: [
      { id: 'd-4', name: 'CloudWave Intelligence Suite', company: 'CloudWave Global', amount: '$90,000', probability: 70 },
      { id: 'd-5', name: 'AeroDynamics Autonomous Fleet', company: 'AeroDynamics Corp', amount: '$850,000', probability: 65 },
      { id: 'd-6', name: 'BioTech Precision Data Mesh', company: 'BioTech Synergy', amount: '$540,000', probability: 60 },
    ],
  },
  negotiation: {
    stage: 'Negotiation',
    amount: '$1,020,000',
    count: 2,
    deals: [
      { id: 'd-7', name: 'TechNova Enterprise Multi-Seat', company: 'TechNova Inc', amount: '$180,000', probability: 90 },
      { id: 'd-8', name: 'Vertex Robotics Global Deploy', company: 'Vertex Robotics', amount: '$840,000', probability: 85 },
    ],
  },
};

const initialAnalytics = {
  totalRevenue: '$1,248,000',
  growthRate: '+14.2%',
  pipelineGauge: {
    percentage: 75,
    totalPipeline: '$3.4M',
    target: '$4.5M',
  },
  winRate: {
    rate: 42,
    change: 2.1,
    isNegative: false,
  },
  avgDealCycle: {
    days: 18.4,
    comparison: '↓ 32% faster vs Q2',
  },
  quotaAttainment: {
    percentage: 118,
    repsAboveQuota: '14 of 16 reps above quota',
  },
  monthlyRevenueSeries: [
    { month: 'Jan', revenue: 680000, projected: 650000 },
    { month: 'Feb', revenue: 740000, projected: 710000 },
    { month: 'Mar', revenue: 890000, projected: 820000 },
    { month: 'Apr', revenue: 1020000, projected: 950000 },
    { month: 'May', revenue: 1150000, projected: 1080000 },
    { month: 'Jun', revenue: 1248000, projected: 1200000 },
  ],
};

const initialPricingPlans = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Essential tools for small agile sales teams.',
    priceMonthly: 49,
    priceAnnual: 39,
    ctaText: 'Get Started',
    features: [
      'Up to 5 active users',
      'Basic AI pipeline analytics',
      'Standard CRM sync (HubSpot, Salesforce)',
      'Community & email support',
      '500 monthly AI lead enrichments',
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Advanced AI autonomy for high-growth enterprise scale.',
    priceMonthly: 149,
    priceAnnual: 119,
    highlighted: true,
    badge: 'Best Value',
    ctaText: 'Start Free Trial',
    features: [
      'Up to 20 active users',
      'Advanced AI predictive insights & scoring',
      'Priority 24/7 dedicated support',
      'Unlimited zero-touch custom integrations',
      '10,000 monthly AI lead enrichments',
      'Automated email sequence co-pilot',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Custom security, LLM fine-tuning, and global infrastructure.',
    priceMonthly: 399,
    priceAnnual: 329,
    badge: 'Custom SLA',
    ctaText: 'Contact Sales',
    features: [
      'Unlimited users & workspaces',
      'Dedicated Customer Success Architect',
      'On-Premise & Private Cloud deployment',
      'SOC2 Type II & HIPAA compliance',
      'Custom LLM fine-tuning on sales transcripts',
      'Real-time Webhook & API access',
    ],
  },
];

const initialFaqs = [
  {
    id: 'faq-1',
    question: 'Can I change or upgrade plans later?',
    answer:
      'Yes, you can upgrade, downgrade, or change your billing cadence at any time from your account settings. Prorated credits will automatically apply to your subsequent invoice.',
  },
  {
    id: 'faq-2',
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit cards (Visa, MasterCard, American Express), SEPA direct debit, PayPal, and ACH/wire invoicing for annual Professional and Enterprise tiers.',
  },
  {
    id: 'faq-3',
    question: 'Is there a discount for annual billing?',
    answer:
      'Yes! Selecting annual billing provides 2 months free, delivering an immediate ~20% reduction across all plans with lock-in price protection.',
  },
  {
    id: 'faq-4',
    question: 'How does Lumina integrate with existing CRMs?',
    answer:
      'Lumina offers bi-directional instant synchronization with Salesforce, HubSpot, Close, Pipedrive, and Slack. Setup takes less than 3 minutes via secure OAuth2.',
  },
  {
    id: 'faq-5',
    question: 'Is our enterprise customer data safe and confidential?',
    answer:
      'Absolutely. All data is encrypted at rest (AES-256) and in transit (TLS 1.3). We never use your confidential CRM data or sales call recordings to train public foundation models.',
  },
];

const initialCapabilities = [
  {
    id: 'ai-lead-scoring',
    title: 'AI Lead Scoring',
    description:
      'Predictive algorithms analyze 150+ multi-dimensional data points to identify high-probability accounts with 94% forecast precision.',
    icon: 'target',
    glowColor: 'primary',
    highlightStat: {
      label: 'Top Prospect Match',
      value: '98%',
      sublabel: 'High Conversion Signal',
    },
    metrics: {
      primary: { value: '94%', label: 'Prediction Accuracy' },
      secondary: { value: '+48%', label: 'Pipeline Velocity' },
    },
  },
  {
    id: 'automated-outreach',
    title: 'Autonomous Outreach Engine',
    description:
      'Deploy hyper-personalized contextual messaging at enterprise scale. Lumina learns prospect communication preferences to trigger outreach at peak engagement hours.',
    icon: 'send',
    glowColor: 'secondary',
    highlightStat: {
      label: 'Engagement Surge',
      value: '3.2x',
      sublabel: 'Higher Response Ratio',
    },
    metrics: {
      primary: { value: '3.2x', label: 'Reply Rate' },
      secondary: { value: '40%', label: 'Time Saved Daily' },
    },
  },
  {
    id: 'deal-intelligence',
    title: 'Real-time Deal Telemetry',
    description:
      'Ambient intelligence listens to objection signals during demo calls, generates battlecards in real-time, and recommends next-best actions for deal closure.',
    icon: 'psychology',
    glowColor: 'tertiary',
    highlightStat: {
      label: 'Close Ratio',
      value: '+38%',
      sublabel: 'Vs Industry Baseline',
    },
    metrics: {
      primary: { value: '$3.4M', label: 'Active Pipeline' },
      secondary: { value: '8.4 days', label: 'Shorter Sales Cycle' },
    },
  },
];

const demoBookings = [];

const initialUsers = [
  {
    id: 'user-demo-1',
    fullName: 'Alex Morgan',
    email: 'alex.morgan@lumina.ai',
    passwordHash: hashPassword('password123'),
    company: 'TechNova Corp',
    role: 'VP of Sales',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'user-demo-2',
    fullName: 'Elena Rostova',
    email: 'elena.rostova@cloudwave.io',
    passwordHash: hashPassword('password123'),
    company: 'CloudWave Global',
    role: 'Enterprise Account Executive',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdAt: new Date().toISOString(),
  },
];

class DataStore {
  constructor() {
    this.activities = [...initialActivities];
    this.leads = [...initialLeads];
    this.dealsByStage = JSON.parse(JSON.stringify(initialDealsByStage));
    this.analytics = JSON.parse(JSON.stringify(initialAnalytics));
    this.pricingPlans = [...initialPricingPlans];
    this.faqs = [...initialFaqs];
    this.capabilities = [...initialCapabilities];
    this.demoBookings = [...demoBookings];
    this.users = [...initialUsers];
  }

  // Activities
  getActivities(filterType = null) {
    if (filterType) {
      return this.activities.filter(a => a.type === filterType);
    }
    return this.activities;
  }

  addActivity({ title, amount, subtitle, type = 'deal', icon = 'add_task', statusColor = 'secondary' }) {
    const newActivity = {
      id: `act-${randomUUID()}`,
      title,
      subtitle: subtitle || `New inbound pipeline created (${amount || 'Custom'})`,
      timeAgo: 'Just now',
      type,
      statusColor,
      icon,
      amount: amount || undefined,
      createdAt: new Date().toISOString(),
    };
    this.activities.unshift(newActivity);
    return newActivity;
  }

  deleteActivity(id) {
    const index = this.activities.findIndex(a => a.id === id);
    if (index === -1) return false;
    this.activities.splice(index, 1);
    return true;
  }

  // Leads
  getLeads() {
    return this.leads;
  }

  addLead(leadData) {
    const newLead = {
      id: `lead-${randomUUID()}`,
      stage: 'New',
      score: `${Math.floor(85 + Math.random() * 14)}%`,
      ...leadData,
      createdAt: new Date().toISOString(),
    };
    this.leads.unshift(newLead);
    return newLead;
  }

  // Deals
  getDeals() {
    return this.dealsByStage;
  }

  addDeal(stageKey, dealData) {
    if (!this.dealsByStage[stageKey]) {
      throw new Error(`Invalid stage key: ${stageKey}`);
    }
    const newDeal = {
      id: `d-${randomUUID()}`,
      ...dealData,
    };
    this.dealsByStage[stageKey].deals.unshift(newDeal);
    this.dealsByStage[stageKey].count += 1;
    return newDeal;
  }

  // Analytics
  getAnalytics() {
    return this.analytics;
  }

  // Overview
  getOverview() {
    return {
      revenue: {
        total: this.analytics.totalRevenue,
        growth: this.analytics.growthRate,
      },
      pipelineGauge: this.analytics.pipelineGauge,
      winRate: this.analytics.winRate,
      recentActivities: this.activities.slice(0, 5),
      leadCount: this.leads.length,
      activePipelineTotal: '$3.4M',
    };
  }

  // Demo Bookings
  addDemoBooking({ fullName, workEmail, company, teamSize, interest }) {
    const booking = {
      id: `booking-${randomUUID()}`,
      fullName,
      workEmail,
      company,
      teamSize: teamSize || '10-50',
      interest: interest || 'Autonomous Pipeline Automation',
      status: 'pending_contact',
      submittedAt: new Date().toISOString(),
    };
    this.demoBookings.unshift(booking);
    return booking;
  }

  getDemoBookings() {
    return this.demoBookings;
  }

  // Plans & FAQs
  getPricingPlans() {
    return this.pricingPlans;
  }

  getFaqs() {
    return this.faqs;
  }

  // Capabilities
  getCapabilities() {
    return this.capabilities;
  }

  // Users
  findUserByEmail(email) {
    if (!email) return null;
    return this.users.find(u => u.email.toLowerCase() === email.trim().toLowerCase()) || null;
  }

  findUserById(id) {
    if (!id) return null;
    return this.users.find(u => u.id === id) || null;
  }

  addUser({ fullName, email, passwordHash, company, role = 'VP of Sales', avatarUrl }) {
    const newUser = {
      id: `user-${randomUUID()}`,
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      passwordHash,
      company: company ? company.trim() : 'Enterprise Org',
      role: role ? role.trim() : 'VP of Sales',
      avatarUrl:
        avatarUrl ||
        `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(fullName)}&backgroundColor=002e6a,4d8eff`,
      createdAt: new Date().toISOString(),
    };
    this.users.unshift(newUser);
    return newUser;
  }

  getSafeUser(user) {
    if (!user) return null;
    const { passwordHash, ...safeUser } = user;
    return safeUser;
  }
}

export const store = new DataStore();
