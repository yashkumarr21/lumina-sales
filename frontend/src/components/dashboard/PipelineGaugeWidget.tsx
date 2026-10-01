import React from 'react';

interface PipelineGaugeWidgetProps {
  percentage?: number;
  totalPipeline?: string;
}

export const PipelineGaugeWidget: React.FC<PipelineGaugeWidgetProps> = ({
  percentage = 75,
  totalPipeline = '$3.4M',
}) => {
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="glass-panel rounded-xl p-5 flex flex-col items-center justify-between aspect-square relative overflow-hidden group hover:border-white/30 transition-all">
      <div className="w-full flex justify-between items-center">
        <h3 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
          Pipeline
        </h3>
        <span className="font-label-sm text-label-sm text-secondary bg-secondary/10 px-2 py-0.5 rounded-full border border-secondary/20 font-mono">
          Active
        </span>
      </div>

      {/* Circular SVG Gauge */}
      <div className="relative w-28 h-28 my-auto flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            className="text-surface-container-highest"
            cx="50"
            cy="50"
            fill="none"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
          />
          <circle
            className="text-secondary transition-all duration-1000 ease-out"
            cx="50"
            cy="50"
            fill="none"
            r={radius}
            stroke="currentColor"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            strokeWidth="8"
            style={{
              filter: 'drop-shadow(0 0 6px rgba(76, 215, 246, 0.6))',
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-headline-md text-headline-md text-on-surface font-extrabold tracking-tight">
            {percentage}%
          </span>
          <span className="font-label-sm text-[10px] text-on-surface-variant uppercase">Capacity</span>
        </div>
      </div>

      <div className="w-full text-center border-t border-white/10 pt-2.5 mt-1">
        <p className="font-headline-md text-[22px] font-bold text-on-surface tracking-tight">
          {totalPipeline}
        </p>
      </div>
    </div>
  );
};
