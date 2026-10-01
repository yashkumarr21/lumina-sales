import React from 'react';
import { NavigationPage } from '../../types';

interface FooterProps {
  onNavigate: (page: NavigationPage) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full py-stack-xl border-t border-white/10 bg-[#0b1326]/80 backdrop-blur-xl z-10 relative mt-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="col-span-2 md:col-span-1 mb-stack-md md:mb-0">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="material-symbols-outlined text-[#002e6a] text-[16px]">scatter_plot</span>
            </div>
            <span className="font-headline-md text-headline-md font-extrabold text-on-background">
              LUMINA
            </span>
          </div>
          <p className="font-label-sm text-label-sm text-on-surface-variant leading-relaxed">
            Ambient intelligence platform engineered for modern enterprise sales organizations.
          </p>
          <p className="font-label-sm text-label-sm text-outline mt-3">
            © {new Date().getFullYear()} Lumina Intelligence Inc.<br />All rights reserved.
          </p>
        </div>

        <div className="flex flex-col gap-2.5 font-body-md text-body-md">
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider mb-1 font-bold">Platform</span>
          <button onClick={() => onNavigate('home')} className="text-left text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
            AI Sales Automation
          </button>
          <button onClick={() => onNavigate('dashboard')} className="text-left text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
            Executive Dashboard
          </button>
          <button onClick={() => onNavigate('features')} className="text-left text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
            Capabilities & Models
          </button>
          <button onClick={() => onNavigate('pricing')} className="text-left text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
            Pricing & ROI
          </button>
          <button onClick={() => onNavigate('login')} className="text-left text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
            Sign In to Workspace
          </button>
          <button onClick={() => onNavigate('signup')} className="text-left text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
            Create Enterprise Account
          </button>
        </div>

        <div className="flex flex-col gap-2.5 font-body-md text-body-md">
          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider mb-1 font-bold">Solutions</span>
          <a href="#enterprise" className="text-on-surface-variant hover:text-secondary transition-colors cursor-pointer">
            Enterprise Pipeline
          </a>
          <a href="#b2b" className="text-on-surface-variant hover:text-secondary transition-colors cursor-pointer">
            B2B Outbound Scale
          </a>
          <a href="#forecast" className="text-on-surface-variant hover:text-secondary transition-colors cursor-pointer">
            Revenue Forecasting
          </a>
          <a href="#security" className="text-on-surface-variant hover:text-secondary transition-colors cursor-pointer">
            SOC2 & Compliance
          </a>
        </div>

        <div className="flex flex-col gap-2.5 font-body-md text-body-md">
          <span className="font-label-sm text-label-sm text-tertiary uppercase tracking-wider mb-1 font-bold">Resources</span>
          <button onClick={() => onNavigate('shader')} className="text-left text-on-surface-variant hover:text-tertiary transition-colors cursor-pointer">
            Shader Lab Playground
          </button>
          <a href="#docs" className="text-on-surface-variant hover:text-tertiary transition-colors cursor-pointer">
            Developer Documentation
          </a>
          <a href="#changelog" className="text-on-surface-variant hover:text-tertiary transition-colors cursor-pointer">
            Release Notes
          </a>
          <a href="#status" className="text-on-surface-variant hover:text-tertiary transition-colors cursor-pointer">
            System Status (99.99%)
          </a>
        </div>
      </div>
    </footer>
  );
};
