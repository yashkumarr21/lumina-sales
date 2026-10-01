import React from 'react';

interface HeroSectionProps {
  onBookDemo: () => void;
  onWatchDemo: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onBookDemo, onWatchDemo }) => {
  return (
    <section className="flex flex-col items-center justify-center text-center mt-6 md:mt-12 mb-stack-xl relative z-10">
      {/* Top pill badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-primary/30 mb-6 animate-pulse-subtle">
        <span className="w-2 h-2 rounded-full bg-secondary animate-ping" />
        <span className="font-label-sm text-label-sm text-primary font-mono tracking-wide uppercase">
          Lumina 2.0 Autonomous AI Suite
        </span>
      </div>

      {/* Main Headline */}
      <h1 className="font-display-lg text-[42px] sm:text-[56px] md:text-[80px] leading-[1.08] font-extrabold mb-stack-md max-w-4xl tracking-tighter text-on-surface">
        Scale Sales with <br />
        <span className="gradient-text">AI-Driven Intelligence</span>
      </h1>

      {/* Subtitle */}
      <p className="font-body-lg text-body-lg text-on-surface-variant mb-stack-lg max-w-2xl text-[17px] md:text-[20px] leading-relaxed">
        The executive-level platform for lead gen, pipeline automation, and closing high-ticket enterprise contracts with ambient speed.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col w-full gap-stack-sm sm:flex-row sm:w-auto sm:gap-gutter">
        <button
          onClick={onBookDemo}
          className="btn-primary w-full sm:w-auto px-8 py-4 rounded-xl font-label-md text-label-md font-bold flex items-center justify-center gap-2"
        >
          <span>Book Executive Demo</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>

        <button
          onClick={onWatchDemo}
          className="btn-secondary w-full sm:w-auto px-8 py-4 rounded-xl font-label-md text-label-md font-semibold flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-secondary text-[20px]">play_circle</span>
          <span>Watch Product Tour</span>
        </button>
      </div>

      {/* Trust Stats Bar */}
      <div className="mt-12 grid grid-cols-3 gap-4 md:gap-12 pt-8 border-t border-white/10 max-w-2xl w-full">
        <div>
          <div className="font-headline-lg-mobile md:font-headline-md text-on-surface font-extrabold">
            $1.8B+
          </div>
          <p className="font-label-sm text-[12px] text-on-surface-variant uppercase mt-0.5">
            Pipeline Influenced
          </p>
        </div>
        <div>
          <div className="font-headline-lg-mobile md:font-headline-md text-secondary font-extrabold">
            94.2%
          </div>
          <p className="font-label-sm text-[12px] text-on-surface-variant uppercase mt-0.5">
            Model Accuracy
          </p>
        </div>
        <div>
          <div className="font-headline-lg-mobile md:font-headline-md text-primary font-extrabold">
            10,000+
          </div>
          <p className="font-label-sm text-[12px] text-on-surface-variant uppercase mt-0.5">
            Sales Leaders
          </p>
        </div>
      </div>
    </section>
  );
};
