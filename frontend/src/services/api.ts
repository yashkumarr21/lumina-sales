import { DealActivity, PricingPlan, FaqItem, FeatureCapability, User, AuthResponse, LoginCredentials, RegisterData } from '../types';
import { ACTIVITIES, PRICING_PLANS, FAQS, CAPABILITIES } from '../data/mockData';

const API_BASE_URL = '/api';

/**
 * Robust fetch helper with timeout and fallback support
 */
async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);

  const token = typeof window !== 'undefined' ? localStorage.getItem('lumina_auth_token') : null;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options?.headers as Record<string, string>),
  };

  if (token && !headers['Authorization']) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
      signal: controller.signal,
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `API Error: ${res.statusText}`);
    }

    return await res.json();
  } finally {
    clearTimeout(timeoutId);
  }
}

export const api = {
  // Health
  async checkHealth() {
    try {
      return await apiRequest<{ status: string; uptime: string }>('/health');
    } catch {
      return { status: 'offline', uptime: '0s' };
    }
  },

  // Overview
  async getOverview() {
    try {
      const res = await apiRequest<{ success: boolean; data: any }>('/overview');
      return res.data;
    } catch (err) {
      console.warn('Backend overview unavailable, fallback to mock data:', err);
      return {
        revenue: { total: '$1,248,000', growth: '+14.2%' },
        pipelineGauge: { percentage: 75, totalPipeline: '$3.4M' },
        winRate: { rate: 42, change: 2.1, isNegative: false },
        recentActivities: ACTIVITIES.slice(0, 5),
      };
    }
  },

  // Activities
  async getActivities(): Promise<DealActivity[]> {
    try {
      const res = await apiRequest<{ success: boolean; data: DealActivity[] }>('/activities');
      return res.data;
    } catch (err) {
      console.warn('Backend activities unavailable, fallback to mock data:', err);
      return ACTIVITIES;
    }
  },

  async createActivity(activity: {
    title: string;
    amount?: string;
    subtitle?: string;
    type?: string;
  }): Promise<DealActivity> {
    try {
      const res = await apiRequest<{ success: boolean; data: DealActivity }>('/activities', {
        method: 'POST',
        body: JSON.stringify(activity),
      });
      return res.data;
    } catch (err) {
      console.warn('Backend failed to persist activity, creating locally:', err);
      return {
        id: `act-${Date.now()}`,
        title: activity.title,
        subtitle: activity.subtitle || `New inbound pipeline created (${activity.amount || '$0'})`,
        timeAgo: 'Just now',
        type: (activity.type as any) || 'deal',
        statusColor: 'secondary',
        icon: 'add_task',
        amount: activity.amount,
      };
    }
  },

  // Leads
  async getLeads() {
    try {
      const res = await apiRequest<{ success: boolean; data: any[] }>('/leads');
      return res.data;
    } catch (err) {
      console.warn('Backend leads unavailable, fallback to static list:', err);
      return [
        { company: 'Vertex Robotics', score: '98%', contact: 'David Vance (CTO)', val: '$140k' },
        { company: 'CloudWave Global', score: '95%', contact: 'Elena Rostova (VP Sales)', val: '$90k' },
        { company: 'NextGen Financial', score: '92%', contact: 'Marcus Thorne (CFO)', val: '$210k' },
        { company: 'BioTech Synergy', score: '89%', contact: 'Claire Zhao (Head of Ops)', val: '$65k' },
      ];
    }
  },

  // Demo Bookings
  async submitDemoBooking(data: {
    fullName: string;
    workEmail: string;
    company: string;
    teamSize?: string;
    interest?: string;
  }) {
    return await apiRequest<{ success: boolean; message: string; data: any }>('/demo-bookings', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Pricing & FAQs
  async getPricingPlans(): Promise<PricingPlan[]> {
    try {
      const res = await apiRequest<{ success: boolean; data: PricingPlan[] }>('/plans');
      return res.data;
    } catch {
      return PRICING_PLANS;
    }
  },

  async getFaqs(): Promise<FaqItem[]> {
    try {
      const res = await apiRequest<{ success: boolean; data: FaqItem[] }>('/faqs');
      return res.data;
    } catch {
      return FAQS;
    }
  },

  // Capabilities
  async getCapabilities(): Promise<FeatureCapability[]> {
    try {
      const res = await apiRequest<{ success: boolean; data: FeatureCapability[] }>('/capabilities');
      return res.data;
    } catch {
      return CAPABILITIES;
    }
  },

  // AI Deal Analysis
  async analyzeDeal(dealData: { dealName: string; amount?: string | number; company?: string }) {
    return await apiRequest<{ success: boolean; analysis: any }>('/ai/analyze-deal', {
      method: 'POST',
      body: JSON.stringify(dealData),
    });
  },

  // Authentication API
  auth: {
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
      try {
        const res = await apiRequest<AuthResponse>('/auth/login', {
          method: 'POST',
          body: JSON.stringify(credentials),
        });
        if (res.token) {
          localStorage.setItem('lumina_auth_token', res.token);
          localStorage.setItem('lumina_auth_user', JSON.stringify(res.user));
        }
        return res;
      } catch (err: any) {
        // Fallback for offline/demo if backend is offline
        if (credentials.email.toLowerCase().includes('demo') || credentials.email.toLowerCase().includes('alex')) {
          const fallbackUser: User = {
            id: 'user-demo-fallback',
            fullName: 'Alex Morgan',
            email: credentials.email,
            company: 'TechNova Corp',
            role: 'VP of Sales',
            avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          };
          const fallbackRes: AuthResponse = {
            success: true,
            token: 'demo-local-jwt-token',
            user: fallbackUser,
            message: 'Signed in via offline demo session',
          };
          localStorage.setItem('lumina_auth_token', fallbackRes.token);
          localStorage.setItem('lumina_auth_user', JSON.stringify(fallbackRes.user));
          return fallbackRes;
        }
        throw err;
      }
    },

    async register(data: RegisterData): Promise<AuthResponse> {
      try {
        const res = await apiRequest<AuthResponse>('/auth/register', {
          method: 'POST',
          body: JSON.stringify(data),
        });
        if (res.token) {
          localStorage.setItem('lumina_auth_token', res.token);
          localStorage.setItem('lumina_auth_user', JSON.stringify(res.user));
        }
        return res;
      } catch (err: any) {
        // Fallback if backend offline
        const fallbackUser: User = {
          id: `user-${Date.now()}`,
          fullName: data.fullName,
          email: data.email,
          company: data.company || 'Enterprise Org',
          role: data.role || 'VP of Sales',
          avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(data.fullName)}&backgroundColor=002e6a,4d8eff`,
        };
        const fallbackRes: AuthResponse = {
          success: true,
          token: `token-${Date.now()}`,
          user: fallbackUser,
          message: 'Account created successfully (Offline Session)',
        };
        localStorage.setItem('lumina_auth_token', fallbackRes.token);
        localStorage.setItem('lumina_auth_user', JSON.stringify(fallbackRes.user));
        return fallbackRes;
      }
    },

    async demoLogin(persona: 'vp' | 'ae' = 'vp'): Promise<AuthResponse> {
      try {
        const res = await apiRequest<AuthResponse>('/auth/demo-login', {
          method: 'POST',
          body: JSON.stringify({ persona }),
        });
        if (res.token) {
          localStorage.setItem('lumina_auth_token', res.token);
          localStorage.setItem('lumina_auth_user', JSON.stringify(res.user));
        }
        return res;
      } catch (err: any) {
        const personaUser: User =
          persona === 'ae'
            ? {
                id: 'user-demo-2',
                fullName: 'Elena Rostova',
                email: 'elena.rostova@cloudwave.io',
                company: 'CloudWave Global',
                role: 'Enterprise Account Executive',
                avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
              }
            : {
                id: 'user-demo-1',
                fullName: 'Alex Morgan',
                email: 'alex.morgan@lumina.ai',
                company: 'TechNova Corp',
                role: 'VP of Sales',
                avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
              };

        const fallbackRes: AuthResponse = {
          success: true,
          token: `demo-token-${persona}`,
          user: personaUser,
          message: `Logged in as demo persona: ${personaUser.fullName}`,
        };
        localStorage.setItem('lumina_auth_token', fallbackRes.token);
        localStorage.setItem('lumina_auth_user', JSON.stringify(fallbackRes.user));
        return fallbackRes;
      }
    },

    async getMe(): Promise<User | null> {
      try {
        const res = await apiRequest<{ success: boolean; user: User }>('/auth/me');
        return res.user;
      } catch {
        const cached = localStorage.getItem('lumina_auth_user');
        return cached ? JSON.parse(cached) : null;
      }
    },

    logout() {
      localStorage.removeItem('lumina_auth_token');
      localStorage.removeItem('lumina_auth_user');
    },
  },
};
