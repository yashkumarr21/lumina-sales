import React, { useState } from 'react';
import { api } from '../../services/api';

interface BookDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookDemoModal: React.FC<BookDemoModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    company: '',
    teamSize: '10-50',
    interest: 'Autonomous Pipeline Automation',
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.submitDemoBooking(formData);
    } catch (err) {
      console.warn('Demo booking submission warning (proceeding):', err);
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="glass-modal rounded-2xl w-full max-w-lg p-6 md:p-8 relative overflow-hidden border border-white/20 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle background glow */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex justify-between items-center pb-4 border-b border-white/10 relative z-10">
          <div>
            <h3 className="font-headline-md text-headline-md font-bold text-on-surface">
              Schedule an Executive Briefing
            </h3>
            <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">
              Experience Lumina's Ambient Intelligence firsthand
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full glass-panel flex items-center justify-center text-on-surface-variant hover:text-white glass-hover transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {submitted ? (
          <div className="py-12 flex flex-col items-center justify-center text-center gap-3 relative z-10">
            <div className="w-16 h-16 rounded-full bg-secondary/20 border border-secondary/40 flex items-center justify-center text-secondary text-3xl mb-2 animate-bounce">
              <span className="material-symbols-outlined text-[32px]">check_circle</span>
            </div>
            <h4 className="font-headline-md text-headline-md text-on-surface font-bold">Briefing Requested!</h4>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xs">
              A Lumina Enterprise Specialist will contact <span className="text-primary font-mono">{formData.workEmail}</span> within 15 minutes.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4 relative z-10">
            <div>
              <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Sarah Connor"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/15 text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body-md"
              />
            </div>

            <div>
              <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">
                Work Email
              </label>
              <input
                type="email"
                required
                value={formData.workEmail}
                onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                placeholder="sarah@enterprise.com"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/15 text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body-md"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">
                  Company
                </label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Apex Logic"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/15 text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body-md"
                />
              </div>
              <div>
                <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">
                  Sales Team Size
                </label>
                <select
                  value={formData.teamSize}
                  onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-[#131b2e] border border-white/15 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body-md"
                >
                  <option value="1-10">1 - 10 Reps</option>
                  <option value="10-50">10 - 50 Reps</option>
                  <option value="50-200">50 - 200 Reps</option>
                  <option value="200+">200+ Enterprise</option>
                </select>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="btn-primary w-full py-3.5 rounded-xl font-label-md text-label-md font-bold flex items-center justify-center gap-2"
              >
                <span>Confirm Demo Booking</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
