import React, { useState } from 'react';
import { FaqItem } from '../../types';

interface FaqAccordionProps {
  faqs: FaqItem[];
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({ faqs }) => {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({ 'faq-1': true });

  const toggleFaq = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="flex flex-col gap-stack-md pt-stack-lg max-w-3xl mx-auto w-full">
      <div className="text-center">
        <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
          Frequently Asked Questions
        </h3>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">
          Everything you need to know about Lumina billing and deployment
        </p>
      </div>

      <div className="flex flex-col gap-3 mt-4">
        {faqs.map((faq) => {
          const isOpen = Boolean(openIds[faq.id]);
          return (
            <div
              key={faq.id}
              className={`glass-panel rounded-xl border transition-all duration-300 overflow-hidden ${
                isOpen ? 'border-primary/40 bg-white/10' : 'border-white/10 hover:border-white/20'
              }`}
            >
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full p-4 md:p-5 flex justify-between items-center text-left cursor-pointer"
                aria-expanded={isOpen}
              >
                <h4 className="font-label-md text-[15px] text-on-surface font-semibold pr-4">
                  {faq.question}
                </h4>
                <span
                  className={`material-symbols-outlined text-on-surface-variant transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-primary' : ''
                  }`}
                >
                  expand_more
                </span>
              </button>

              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-4 md:p-5 pt-0 font-body-md text-[14.5px] text-on-surface-variant leading-relaxed bg-[rgba(15,23,42,0.4)] border-t border-white/5">
                  {faq.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
