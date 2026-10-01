import React, { useState } from 'react';

interface FloatingActionButtonProps {
  onAddRecord?: (title: string, value: string) => void;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onAddRecord }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dealName, setDealName] = useState('');
  const [dealValue, setDealValue] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  const handleQuickAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dealName.trim()) return;
    if (onAddRecord) {
      onAddRecord(dealName, dealValue || '$50,000');
    }
    setToast(`Deal "${dealName}" added to pipeline!`);
    setDealName('');
    setDealValue('');
    setIsOpen(false);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <>
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-24 right-6 z-50 glass-modal border border-secondary/40 text-on-surface px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-secondary">check_circle</span>
          <span className="font-label-sm text-label-sm">{toast}</span>
        </div>
      )}

      {/* Floating Action Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass-modal rounded-2xl p-6 w-full max-w-md border border-white/20 shadow-2xl relative animate-fadeIn">
            <div className="flex justify-between items-center pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">add_circle</span>
                <h3 className="font-headline-md text-headline-md font-bold text-on-surface">
                  Log New Opportunity
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full glass-panel flex items-center justify-center text-on-surface-variant hover:text-white"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <form onSubmit={handleQuickAdd} className="mt-4 flex flex-col gap-3">
              <div>
                <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">
                  Account Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. NextGen Robotics Ltd"
                  value={dealName}
                  onChange={(e) => setDealName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/15 text-on-surface placeholder:text-outline focus:outline-none focus:border-primary text-sm font-body-md"
                />
              </div>

              <div>
                <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">
                  Expected Deal Value ($)
                </label>
                <input
                  type="text"
                  placeholder="$120,000"
                  value={dealValue}
                  onChange={(e) => setDealValue(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/15 text-on-surface placeholder:text-outline focus:outline-none focus:border-primary text-sm font-body-md"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="btn-secondary px-4 py-2 rounded-lg font-label-md text-label-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary px-5 py-2 rounded-lg font-label-md text-label-md font-bold flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[18px]">add</span>
                  <span>Create Deal</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-primary-container via-primary to-secondary flex items-center justify-center shadow-[0_0_25px_rgba(77,142,255,0.5)] hover:scale-110 active:scale-95 transition-all duration-300 group"
        aria-label="Add new sales record"
        title="Add New Opportunity"
      >
        <span className="material-symbols-outlined text-[#002e6a] text-[28px] font-bold group-hover:rotate-90 transition-transform duration-300">
          add
        </span>
      </button>
    </>
  );
};
