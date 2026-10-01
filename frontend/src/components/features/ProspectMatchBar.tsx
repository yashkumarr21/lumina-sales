import React, { useState } from 'react';

interface ProspectMatchBarProps {
  initialScore?: number;
}

export const ProspectMatchBar: React.FC<ProspectMatchBarProps> = ({ initialScore = 98 }) => {
  const [score, setScore] = useState(initialScore);

  return (
    <div className="glass-inner rounded-xl p-4 mt-3 border border-white/10 relative z-10">
      <div className="flex justify-between items-center mb-2.5">
        <div className="flex items-center gap-2">
          <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">
            Prospect Fit Simulator:
          </span>
          <span className="font-mono text-xs px-2 py-0.5 rounded bg-primary/20 text-primary border border-primary/30">
            Fortune 500 Model
          </span>
        </div>
        <span className="font-mono text-sm font-bold text-secondary">{score}% Fit</span>
      </div>

      {/* Progress Bar with glowing gradient */}
      <div className="w-full bg-surface-container-high rounded-full h-3 p-0.5 overflow-hidden">
        <div
          className="bg-gradient-to-r from-primary-container via-primary to-secondary h-full rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(76,215,246,0.6)]"
          style={{ width: `${score}%` }}
        />
      </div>

      {/* Interactive slider */}
      <div className="mt-3 flex items-center justify-between text-xs text-on-surface-variant">
        <span>Adjust Account Signals:</span>
        <input
          type="range"
          min="50"
          max="100"
          value={score}
          onChange={(e) => setScore(Number(e.target.value))}
          className="w-32 accent-secondary cursor-pointer"
        />
      </div>
    </div>
  );
};
