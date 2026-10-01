import React, { useState, useRef, useEffect } from 'react';
import { NavigationPage } from '../../types';
import { useAuth } from '../../context/AuthContext';

interface NavbarProps {
  currentPage: NavigationPage;
  onNavigate: (page: NavigationPage) => void;
  onOpenDemo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, onOpenDemo }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks: { id: NavigationPage; label: string; icon: string }[] = [
    { id: 'home', label: 'Platform', icon: 'home' },
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'features', label: 'Capabilities', icon: 'schema' },
    { id: 'pricing', label: 'Pricing', icon: 'payments' },
    { id: 'shader', label: 'Shader Lab', icon: 'auto_awesome' },
  ];

  const handleNavClick = (page: NavigationPage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-[#0b1326]/60 backdrop-blur-2xl border-b border-white/10 shadow-2xl transition-all duration-300">
      <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-3 max-w-container-max mx-auto">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg glass-panel text-on-surface-variant hover:text-white glass-hover transition-colors"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-[22px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
          
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_15px_rgba(77,142,255,0.4)] group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[#002e6a] text-[20px] font-bold">
                scatter_plot
              </span>
            </div>
            <div>
              <span className="font-headline-md text-[20px] font-extrabold text-on-surface tracking-tight block leading-tight">
                LUMINA <span className="text-secondary font-mono text-[13px] font-normal tracking-wider uppercase ml-1">Pilot</span>
              </span>
            </div>
          </button>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-full glass-panel border border-white/10">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-4 py-1.5 rounded-full font-label-md text-label-md transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-primary/20 text-primary border border-primary/30 shadow-[0_0_12px_rgba(173,198,255,0.25)]'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-white/5'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">{link.icon}</span>
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          {isAuthenticated && user ? (
            /* Authenticated User Menu */
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1.5 pr-3 rounded-full glass-panel hover:bg-white/10 border border-white/15 transition-all text-left"
              >
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.fullName}
                    className="w-7 h-7 rounded-full object-cover border border-primary/40 shadow-sm"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold font-mono">
                    {user.fullName.substring(0, 2).toUpperCase()}
                  </div>
                )}
                <div className="hidden sm:block text-left">
                  <div className="text-xs font-semibold text-white leading-tight truncate max-w-[120px]">
                    {user.fullName}
                  </div>
                  <div className="text-[10px] text-secondary font-mono leading-none truncate max-w-[120px]">
                    {user.role}
                  </div>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant text-base">
                  {userDropdownOpen ? 'expand_less' : 'expand_more'}
                </span>
              </button>

              {/* Dropdown Menu */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 glass-modal rounded-2xl border border-white/15 shadow-2xl p-2 z-50 animate-fadeIn">
                  <div className="px-3 py-2.5 border-b border-white/10 mb-1">
                    <div className="text-xs font-bold text-white truncate">{user.fullName}</div>
                    <div className="text-[11px] text-on-surface-variant truncate">{user.email}</div>
                    <div className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {user.company}
                    </div>
                  </div>

                  <button
                    onClick={() => handleNavClick('dashboard')}
                    className="w-full px-3 py-2 rounded-xl text-xs text-on-surface hover:text-white hover:bg-white/10 flex items-center gap-2 transition-colors text-left"
                  >
                    <span className="material-symbols-outlined text-base text-primary">dashboard</span>
                    <span>Executive Dashboard</span>
                  </button>

                  <button
                    onClick={() => {
                      logout();
                      setUserDropdownOpen(false);
                      onNavigate('home');
                    }}
                    className="w-full px-3 py-2 rounded-xl text-xs text-error hover:bg-error-container/20 flex items-center gap-2 transition-colors text-left mt-1"
                  >
                    <span className="material-symbols-outlined text-base">logout</span>
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Unauthenticated: Sign In button */
            <button
              onClick={() => handleNavClick('login')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                currentPage === 'login' || currentPage === 'signup'
                  ? 'bg-primary text-[#002e6a] font-bold shadow'
                  : 'btn-secondary text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">login</span>
              <span>Sign In</span>
            </button>
          )}

          {/* Book a Demo Button */}
          <button
            onClick={onOpenDemo}
            className="btn-primary px-3.5 md:px-4 py-1.5 rounded-full font-label-md text-xs active:scale-95 transition-transform flex items-center gap-1 font-medium"
          >
            <span>Demo</span>
            <span className="material-symbols-outlined text-[14px] hidden sm:inline">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-modal border-t border-white/10 px-margin-mobile py-4 flex flex-col gap-2 animate-fadeIn">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full px-4 py-3 rounded-xl font-label-md text-label-md flex items-center gap-3 transition-colors ${
                  isActive
                    ? 'bg-primary/20 text-primary border border-primary/30 font-semibold'
                    : 'glass-panel text-on-surface-variant hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{link.icon}</span>
                <span>{link.label}</span>
              </button>
            );
          })}

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            {isAuthenticated && user ? (
              <>
                <div className="px-4 py-2 glass-panel rounded-xl flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs font-mono">
                    {user.fullName.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{user.fullName}</div>
                    <div className="text-[10px] text-on-surface-variant">{user.role} • {user.company}</div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                    onNavigate('home');
                  }}
                  className="w-full px-4 py-2.5 rounded-xl bg-error-container/30 text-error flex items-center justify-center gap-2 text-xs font-medium"
                >
                  <span className="material-symbols-outlined text-base">logout</span>
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleNavClick('login')}
                  className="w-full py-2.5 rounded-xl btn-secondary text-xs font-medium flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-base">login</span>
                  <span>Sign In</span>
                </button>
                <button
                  onClick={() => handleNavClick('signup')}
                  className="w-full py-2.5 rounded-xl btn-primary text-xs font-medium flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-base">person_add</span>
                  <span>Sign Up</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
