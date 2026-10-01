import React from 'react';

export const SocialProofMarquee: React.FC = () => {
  const partners = [
    { name: 'Acme Corp', icon: 'rocket_launch' },
    { name: 'GlobalNet Systems', icon: 'language' },
    { name: 'DataSynergy AI', icon: 'pie_chart' },
    { name: 'Apex Logic', icon: 'moving' },
    { name: 'Shield AI Security', icon: 'security' },
    { name: 'Vanguard Dynamics', icon: 'hub' },
    { name: 'Vertex Cloud', icon: 'cloud_sync' },
    { name: 'Quantum Core', icon: 'memory' },
  ];

  return (
    <section className="mb-stack-xl overflow-hidden w-full relative z-10">
      <p className="text-center font-label-sm text-label-sm text-outline mb-stack-sm uppercase tracking-widest font-mono">
        Trusted by 10,000+ Revenue Teams Worldwide
      </p>

      {/* Marquee Container with Linear Gradient Masks */}
      <div className="relative flex overflow-x-hidden w-full mask-image-linear-gradient">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-4 md:gap-6 py-4">
          {/* First sequence */}
          {partners.map((partner, index) => (
            <div
              key={`p1-${index}`}
              className="glass-panel px-6 py-3 rounded-full flex items-center gap-2.5 shrink-0 border border-white/10 hover:border-white/25 transition-colors cursor-default"
            >
              <span className="material-symbols-outlined text-secondary text-[20px]">
                {partner.icon}
              </span>
              <span className="font-label-md text-label-md text-on-surface font-semibold">
                {partner.name}
              </span>
            </div>
          ))}

          {/* Duplicated sequence for infinite smooth loop */}
          {partners.map((partner, index) => (
            <div
              key={`p2-${index}`}
              className="glass-panel px-6 py-3 rounded-full flex items-center gap-2.5 shrink-0 border border-white/10 hover:border-white/25 transition-colors cursor-default"
            >
              <span className="material-symbols-outlined text-secondary text-[20px]">
                {partner.icon}
              </span>
              <span className="font-label-md text-label-md text-on-surface font-semibold">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
