import React, { useState } from 'react';
import { ShaderBackground } from '../components/common/ShaderBackground';

export const ShaderSandboxPage: React.FC = () => {
  const [speed, setSpeed] = useState(1.0);
  const [opacity, setOpacity] = useState(0.85);
  const [interactive, setInteractive] = useState(true);

  return (
    <div className="relative min-h-[calc(100vh-80px)] pt-[80px] pb-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto flex flex-col justify-between">
      {/* Dynamic Background */}
      <ShaderBackground
        speedMultiplier={speed}
        opacity={opacity}
        interactive={interactive}
        className="fixed inset-0 w-full h-full -z-10"
      />

      {/* Top Banner */}
      <div className="max-w-xl glass-modal rounded-2xl p-6 md:p-8 mt-4 border border-white/20 shadow-2xl relative z-10 animate-fadeIn">
        <div className="flex items-center gap-2 mb-2">
          <span className="material-symbols-outlined text-secondary text-2xl">auto_awesome</span>
          <h1 className="font-headline-md text-headline-md font-bold text-on-surface">
            WebGL Aurora Shader Lab
          </h1>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-6">
          High-refraction ambient WebGL shader engine built into the Aether Glass design system. Move your mouse across the canvas to interact with the gravitational aurora vortex.
        </p>

        {/* Real-time Shader Controls */}
        <div className="flex flex-col gap-4 border-t border-white/10 pt-4">
          <div>
            <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant mb-1">
              <span>Simulation Time Speed:</span>
              <span className="font-mono text-primary font-bold">{speed.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="3.0"
              step="0.1"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-full accent-primary cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant mb-1">
              <span>Aurora Luminosity Opacity:</span>
              <span className="font-mono text-secondary font-bold">{Math.round(opacity * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="1.0"
              step="0.05"
              value={opacity}
              onChange={(e) => setOpacity(Number(e.target.value))}
              className="w-full accent-secondary cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              Mouse Gravity Attractor:
            </span>
            <button
              onClick={() => setInteractive(!interactive)}
              className={`px-3 py-1 rounded-full font-mono text-xs uppercase font-bold transition-all ${
                interactive
                  ? 'bg-secondary/20 text-secondary border border-secondary/40'
                  : 'bg-white/10 text-outline border border-white/10'
              }`}
            >
              {interactive ? 'Active' : 'Disabled'}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Shader Stats */}
      <div className="glass-panel rounded-xl p-4 max-w-lg mt-8 flex justify-between items-center text-xs font-mono text-on-surface-variant border border-white/10 relative z-10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-secondary animate-ping" />
          <span>GPU WebGL Buffer 60 FPS</span>
        </div>
        <span className="text-primary font-semibold">ShaderToy Normalization</span>
      </div>
    </div>
  );
};
