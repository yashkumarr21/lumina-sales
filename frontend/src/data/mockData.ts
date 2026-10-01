import { DealActivity, FaqItem, FeatureCapability, PricingPlan } from '../types';

export const ACTIVITIES: DealActivity[] = [
  {
    id: 'act-1',
    title: 'TechNova Enterprise Deal',
    subtitle: 'Moved to Negotiation ($180k ARR)',
    timeAgo: '2h ago',
    type: 'deal',
    statusColor: 'secondary',
    icon: 'handshake',
    amount: '$180,000',
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
  },
  {
    id: 'act-3',
    title: 'Global Logistics RFP',
    subtitle: 'Competitor selected - Closed Lost',
    timeAgo: '1d ago',
    type: 'lost',
    statusColor: 'error',
    icon: 'cancel',
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
  },
];

export const PRICING_PLANS: PricingPlan[] = [
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

export const FAQS: FaqItem[] = [
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

export const CAPABILITIES: FeatureCapability[] = [
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
