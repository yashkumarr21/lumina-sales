export type PageTab = 'overview' | 'leads' | 'deals' | 'analytics';

export type NavigationPage = 'home' | 'dashboard' | 'features' | 'pricing' | 'shader' | 'login' | 'signup';

export interface User {
  id: string;
  fullName: string;
  email: string;
  company: string;
  role: string;
  avatarUrl?: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  token: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  company: string;
  role?: string;
}

export interface DealActivity {
  id: string;
  title: string;
  subtitle: string;
  timeAgo: string;
  type: 'deal' | 'call' | 'lost' | 'lead';
  statusColor: string;
  icon: string;
  amount?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  priceMonthly: number;
  priceAnnual: number;
  highlighted?: boolean;
  badge?: string;
  ctaText: string;
  features: string[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FeatureCapability {
  id: string;
  title: string;
  description: string;
  icon: string;
  glowColor: string;
  highlightStat: {
    label: string;
    value: string;
    sublabel?: string;
  };
  metrics?: {
    primary: { value: string; label: string };
    secondary: { value: string; label: string };
  };
}
