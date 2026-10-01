import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { NavigationPage } from '../types';

interface AuthPageProps {
  initialMode?: 'login' | 'signup';
  onNavigate: (page: NavigationPage) => void;
  onSuccessRedirect?: (page: NavigationPage) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({
  initialMode = 'login',
  onNavigate,
  onSuccessRedirect,
}) => {
  const { login, register, demoLogin, isLoading } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('VP of Sales');
  const [rememberMe, setRememberMe] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(true);

  // UI helpers
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Password strength calculation
  const getPasswordStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return score; // 0 - 4
  };

  const passwordScore = getPasswordStrength(password);
  const strengthLabels = ['Too weak', 'Weak', 'Fair', 'Strong', 'Enterprise Grade'];
  const strengthColors = [
    'bg-red-500/80 text-red-300',
    'bg-orange-500/80 text-orange-300',
    'bg-yellow-500/80 text-yellow-300',
    'bg-blue-500/80 text-blue-300',
    'bg-emerald-500/80 text-emerald-300',
  ];

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!email || !password) {
      setErrorMessage('Please enter both your work email and password.');
      return;
    }

    setSubmitting(true);
    try {
      await login({ email, password });
      setSuccessMessage('Welcome back! Initializing executive dashboard...');
      setTimeout(() => {
        if (onSuccessRedirect) onSuccessRedirect('dashboard');
        else onNavigate('dashboard');
      }, 700);
    } catch (err: any) {
      setErrorMessage(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!fullName.trim() || !email.trim() || !password) {
      setErrorMessage('Please fill out all required fields.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    if (!agreeTerms) {
      setErrorMessage('Please agree to the Master Enterprise Service Agreement.');
      return;
    }

    setSubmitting(true);
    try {
      await register({
        fullName,
        email,
        password,
        company: company || 'Enterprise Org',
        role,
      });
      setSuccessMessage('Account created successfully! Redirecting to dashboard...');
      setTimeout(() => {
        if (onSuccessRedirect) onSuccessRedirect('dashboard');
        else onNavigate('dashboard');
      }, 700);
    } catch (err: any) {
      setErrorMessage(err.message || 'Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDemoPersona = async (persona: 'vp' | 'ae') => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setSubmitting(true);
    try {
      await demoLogin(persona);
      const personaTitle = persona === 'vp' ? 'Alex Morgan (VP of Sales)' : 'Elena Rostova (Enterprise AE)';
      setSuccessMessage(`Authenticated as ${personaTitle}! Launching workspace...`);
      setTimeout(() => {
        if (onSuccessRedirect) onSuccessRedirect('dashboard');
        else onNavigate('dashboard');
      }, 600);
    } catch (err: any) {
      setErrorMessage(err.message || 'Demo login failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative pt-24 pb-16 px-margin-mobile md:px-margin-desktop min-h-[calc(100vh-64px)] flex items-center justify-center">
      {/* Ambient background glow elements */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/15 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-subtle" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-secondary/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: Enterprise Branding & Showcase (Desktop) */}
        <div className="hidden lg:flex lg:col-span-5 flex-col justify-between p-8 rounded-2xl glass-card-dark border border-white/15 relative overflow-hidden shadow-2xl">
          {/* Subtle aurora sheen */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 pointer-events-none" />

          {/* Top Branding */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary font-label-sm text-label-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-secondary animate-ping" />
              <span>Enterprise Single Sign-On</span>
            </div>

            <h2 className="text-3xl font-extrabold text-on-surface tracking-tight leading-tight mb-4">
              Autonomous Sales <br />
              <span className="gradient-text">Intelligence Engine</span>
            </h2>

            <p className="text-on-surface-variant text-body-md leading-relaxed mb-8">
              Empower your revenue team with predictive deal graphs, real-time objection battlecards, and ambient CRM telemetry.
            </p>

            {/* Metrics Mini-Grid */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              <div className="glass-panel p-3.5 rounded-xl border border-white/10">
                <div className="text-2xl font-mono font-bold text-primary">94%</div>
                <div className="text-xs text-on-surface-variant mt-0.5">Forecast Precision</div>
              </div>
              <div className="glass-panel p-3.5 rounded-xl border border-white/10">
                <div className="text-2xl font-mono font-bold text-secondary">3.2x</div>
                <div className="text-xs text-on-surface-variant mt-0.5">Reply Conversion</div>
              </div>
            </div>

            {/* Executive Quote Card */}
            <div className="p-4 rounded-xl bg-surface-container/60 border border-white/10 relative">
              <span className="material-symbols-outlined text-primary/40 text-3xl absolute top-3 right-3 select-none">
                format_quote
              </span>
              <p className="text-sm text-on-surface-variant italic mb-3 relative z-10">
                "Lumina accelerated our enterprise sales velocity by 32% within 60 days of rollout. The deal intelligence is remarkable."
              </p>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center font-bold text-xs text-[#002e6a]">
                  SM
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Sarah Miller</div>
                  <div className="text-[11px] text-on-surface-variant">CRO, NextGen Global</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Security Compliance Badges */}
          <div className="relative z-10 pt-6 border-t border-white/10 flex items-center justify-between text-on-surface-variant text-xs">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-emerald-400 text-base">verified_user</span>
              <span>SOC2 Type II</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-cyan-400 text-base">lock</span>
              <span>AES-256 TLS 1.3</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-purple-400 text-base">shield</span>
              <span>HIPAA Ready</span>
            </div>
          </div>
        </div>

        {/* Right Column: Authentication Card */}
        <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 rounded-2xl glass-modal border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative">
          
          {/* Top Tab Switcher */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                {mode === 'login' ? 'Sign In to Lumina' : 'Create Enterprise Account'}
              </h1>
              <p className="text-sm text-on-surface-variant mt-1">
                {mode === 'login'
                  ? 'Access your intelligent pipeline dashboard'
                  : 'Start your 14-day full enterprise trial with zero commitments'}
              </p>
            </div>

            <div className="flex p-1 rounded-xl bg-surface-container-high/80 border border-white/10">
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setErrorMessage(null);
                  setSuccessMessage(null);
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  mode === 'login'
                    ? 'bg-primary text-[#002e6a] shadow font-bold'
                    : 'text-on-surface-variant hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setErrorMessage(null);
                  setSuccessMessage(null);
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  mode === 'signup'
                    ? 'bg-primary text-[#002e6a] shadow font-bold'
                    : 'text-on-surface-variant hover:text-white'
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>

          {/* Quick 1-Click Persona Evaluation Buttons */}
          <div className="mb-6 p-3.5 rounded-xl bg-gradient-to-r from-primary/10 via-surface-container/50 to-secondary/10 border border-primary/25">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-primary">
                <span className="material-symbols-outlined text-[16px]">bolt</span>
                <span>1-Click Executive Demo Access</span>
              </div>
              <span className="text-[10px] uppercase font-mono text-on-surface-variant tracking-wider">No password needed</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                disabled={submitting || isLoading}
                onClick={() => handleDemoPersona('vp')}
                className="flex items-center gap-2 p-2 rounded-lg bg-surface-container-high/90 hover:bg-surface-container-highest border border-white/10 hover:border-primary/40 transition-all text-left group active:scale-[0.98]"
              >
                <div className="w-7 h-7 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold font-mono">
                  AM
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-white group-hover:text-primary transition-colors truncate">
                    Alex Morgan
                  </div>
                  <div className="text-[10px] text-on-surface-variant truncate">VP of Sales</div>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary text-sm transition-colors">
                  login
                </span>
              </button>

              <button
                type="button"
                disabled={submitting || isLoading}
                onClick={() => handleDemoPersona('ae')}
                className="flex items-center gap-2 p-2 rounded-lg bg-surface-container-high/90 hover:bg-surface-container-highest border border-white/10 hover:border-secondary/40 transition-all text-left group active:scale-[0.98]"
              >
                <div className="w-7 h-7 rounded-full bg-secondary/20 text-secondary flex items-center justify-center text-xs font-bold font-mono">
                  ER
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-white group-hover:text-secondary transition-colors truncate">
                    Elena Rostova
                  </div>
                  <div className="text-[10px] text-on-surface-variant truncate">Enterprise AE</div>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-secondary text-sm transition-colors">
                  login
                </span>
              </button>
            </div>
          </div>

          {/* Social SSO Options */}
          <div className="mb-6">
            <div className="grid grid-cols-3 gap-2.5">
              {/* Google Workspace */}
              <button
                type="button"
                onClick={() => handleDemoPersona('vp')}
                className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl glass-panel hover:bg-white/10 border border-white/10 transition-all text-xs font-medium text-on-surface active:scale-95"
                title="Continue with Google Workspace"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span className="hidden sm:inline">Google</span>
              </button>

              {/* Microsoft Azure AD */}
              <button
                type="button"
                onClick={() => handleDemoPersona('vp')}
                className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl glass-panel hover:bg-white/10 border border-white/10 transition-all text-xs font-medium text-on-surface active:scale-95"
                title="Continue with Microsoft Entra ID"
              >
                <svg className="w-4 h-4" viewBox="0 0 21 21">
                  <rect x="1" y="1" width="9" height="9" fill="#f25022" />
                  <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
                  <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
                  <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
                </svg>
                <span className="hidden sm:inline">Microsoft</span>
              </button>

              {/* Okta SAML */}
              <button
                type="button"
                onClick={() => handleDemoPersona('ae')}
                className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl glass-panel hover:bg-white/10 border border-white/10 transition-all text-xs font-medium text-on-surface active:scale-95"
                title="Continue with Okta SAML 2.0"
              >
                <span className="material-symbols-outlined text-[#007dc1] text-base">vpn_key</span>
                <span className="hidden sm:inline">Okta SSO</span>
              </button>
            </div>

            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#171f33] px-3 text-on-surface-variant font-mono text-[11px]">
                  Or continue with enterprise credentials
                </span>
              </div>
            </div>
          </div>

          {/* Feedback Messages */}
          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-error-container/40 border border-error/50 text-error flex items-start gap-2.5 text-xs animate-fadeIn">
              <span className="material-symbols-outlined text-base mt-0.5">error</span>
              <span className="flex-1">{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 flex items-start gap-2.5 text-xs animate-fadeIn">
              <span className="material-symbols-outlined text-base mt-0.5">check_circle</span>
              <span className="flex-1">{successMessage}</span>
            </div>
          )}

          {/* Form */}
          {mode === 'login' ? (
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-xs font-label-sm font-medium text-on-surface-variant mb-1.5">
                  Work Email Address
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">
                    mail
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low/90 border border-white/15 rounded-xl text-sm text-white placeholder-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-label-sm font-medium text-on-surface-variant">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      alert('Password reset link has been dispatched to your corporate security admin.');
                    }}
                    className="text-xs text-primary hover:underline transition-all"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">
                    lock
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-10 py-2.5 bg-surface-container-low/90 border border-white/15 rounded-xl text-sm text-white placeholder-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-white transition-colors"
                  >
                    <span className="material-symbols-outlined text-lg">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded bg-surface-container border-white/20 text-primary focus:ring-primary/50 w-4 h-4 cursor-pointer"
                  />
                  <span className="text-xs text-on-surface-variant">Remember this workstation for 30 days</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={submitting || isLoading}
                className="w-full btn-primary py-3 rounded-xl font-label-md text-sm font-semibold flex items-center justify-center gap-2 transition-all mt-6 cursor-pointer"
              >
                {submitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Verifying Session...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Executive Pilot</span>
                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignUp} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-label-sm font-medium text-on-surface-variant mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-base">
                      person
                    </span>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Alex Morgan"
                      className="w-full pl-9 pr-3 py-2 bg-surface-container-low/90 border border-white/15 rounded-xl text-sm text-white placeholder-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-label-sm font-medium text-on-surface-variant mb-1">
                    Company Name *
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-base">
                      domain
                    </span>
                    <input
                      type="text"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Acme Enterprise"
                      className="w-full pl-9 pr-3 py-2 bg-surface-container-low/90 border border-white/15 rounded-xl text-sm text-white placeholder-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-label-sm font-medium text-on-surface-variant mb-1">
                    Work Email Address *
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-base">
                      mail
                    </span>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@acme.com"
                      className="w-full pl-9 pr-3 py-2 bg-surface-container-low/90 border border-white/15 rounded-xl text-sm text-white placeholder-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-label-sm font-medium text-on-surface-variant mb-1">
                    Primary Sales Role
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-base">
                      badge
                    </span>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-surface-container-low/90 border border-white/15 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all appearance-none cursor-pointer"
                    >
                      <option value="VP of Sales" className="bg-[#171f33] text-white">VP of Sales</option>
                      <option value="Enterprise Account Executive" className="bg-[#171f33] text-white">Enterprise AE</option>
                      <option value="Chief Revenue Officer (CRO)" className="bg-[#171f33] text-white">Chief Revenue Officer</option>
                      <option value="Head of Revenue Operations" className="bg-[#171f33] text-white">Head of RevOps</option>
                      <option value="Sales Development Rep" className="bg-[#171f33] text-white">SDR / BDR</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-label-sm font-medium text-on-surface-variant mb-1">
                  Create Master Password *
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-base">
                    lock
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min 8 characters with upper & symbol"
                    className="w-full pl-9 pr-10 py-2 bg-surface-container-low/90 border border-white/15 rounded-xl text-sm text-white placeholder-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-white transition-colors"
                  >
                    <span className="material-symbols-outlined text-base">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {password.length > 0 && (
                  <div className="mt-2 p-2 rounded-lg bg-surface-container/60 border border-white/10">
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="text-on-surface-variant">Entropy Score:</span>
                      <span className={`px-1.5 py-0.5 rounded font-mono font-bold ${strengthColors[passwordScore]}`}>
                        {strengthLabels[passwordScore]}
                      </span>
                    </div>
                    <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden flex gap-1">
                      {[0, 1, 2, 3].map((step) => (
                        <div
                          key={step}
                          className={`flex-1 h-full rounded-full transition-all duration-300 ${
                            step < passwordScore
                              ? passwordScore === 4
                                ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]'
                                : passwordScore >= 2
                                ? 'bg-primary'
                                : 'bg-red-400'
                              : 'bg-white/10'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-1">
                <label className="flex items-start gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-0.5 rounded bg-surface-container border-white/20 text-primary focus:ring-primary/50 w-4 h-4 cursor-pointer"
                  />
                  <span className="text-[11px] text-on-surface-variant leading-tight">
                    I agree to the Lumina{' '}
                    <span className="text-primary underline">Enterprise Terms of Service</span>,{' '}
                    <span className="text-primary underline">Data Processing Agreement (DPA)</span>, and SOC2 Privacy Standards.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={submitting || isLoading}
                className="w-full btn-primary py-3 rounded-xl font-label-md text-sm font-semibold flex items-center justify-center gap-2 transition-all mt-4 cursor-pointer"
              >
                {submitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Provisioning Workspace...</span>
                  </>
                ) : (
                  <>
                    <span>Create Enterprise Account</span>
                    <span className="material-symbols-outlined text-lg">rocket_launch</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Switch Prompt */}
          <div className="text-center mt-6 pt-4 border-t border-white/10 text-xs text-on-surface-variant">
            {mode === 'login' ? (
              <span>
                New enterprise workspace?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('signup');
                    setErrorMessage(null);
                    setSuccessMessage(null);
                  }}
                  className="text-primary hover:underline font-semibold ml-1"
                >
                  Create an account
                </button>
              </span>
            ) : (
              <span>
                Already have an active seat?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setErrorMessage(null);
                    setSuccessMessage(null);
                  }}
                  className="text-primary hover:underline font-semibold ml-1"
                >
                  Sign In instead
                </button>
              </span>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
