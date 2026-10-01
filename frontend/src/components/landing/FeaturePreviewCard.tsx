import React from 'react';

interface FeaturePreviewCardProps {
  title: string;
  description: string;
  icon: string;
  glowPosition?: 'top-right' | 'bottom-left';
  glowColor?: 'primary' | 'secondary' | 'tertiary';
  imageUrl?: string;
  badge?: string;
}

export const FeaturePreviewCard: React.FC<FeaturePreviewCardProps> = ({
  title,
  description,
  icon,
  glowPosition = 'top-right',
  glowColor = 'primary',
  imageUrl,
  badge,
}) => {
  const glowClasses =
    glowPosition === 'top-right' ? '-right-12 -top-12' : '-left-12 -bottom-12';

  let glowBg = 'bg-primary-container/20 group-hover:bg-primary-container/40';
  let iconColor = 'text-secondary';
  if (glowColor === 'secondary') {
    glowBg = 'bg-secondary-container/20 group-hover:bg-secondary-container/40';
    iconColor = 'text-primary';
  } else if (glowColor === 'tertiary') {
    glowBg = 'bg-tertiary-container/20 group-hover:bg-tertiary-container/40';
    iconColor = 'text-tertiary';
  }

  return (
    <div className="glass-card-dark rounded-2xl p-6 md:p-8 flex flex-col gap-4 relative overflow-hidden group border border-white/10 transition-all duration-500 hover:border-white/30 hover:shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
      {/* Background Radial Glow */}
      <div
        className={`absolute ${glowClasses} w-56 h-56 ${glowBg} rounded-full blur-3xl transition-all duration-700 pointer-events-none`}
      />

      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-105 transition-transform">
            <span className={`material-symbols-outlined ${iconColor} text-[26px]`}>
              {icon}
            </span>
          </div>
          <h3 className="font-headline-md text-headline-md font-bold text-on-surface">
            {title}
          </h3>
        </div>

        {badge && (
          <span className="font-mono text-[11px] px-2.5 py-1 rounded-full uppercase tracking-wider bg-white/10 text-on-surface-variant border border-white/15">
            {badge}
          </span>
        )}
      </div>

      <p className="font-body-md text-body-md text-on-surface-variant relative z-10 leading-relaxed">
        {description}
      </p>

      {imageUrl && (
        <div className="mt-3 relative z-10 rounded-xl overflow-hidden border border-white/10 group-hover:border-white/20 transition-all">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-52 object-cover opacity-85 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1326] via-transparent to-transparent opacity-60 pointer-events-none" />
        </div>
      )}
    </div>
  );
};
