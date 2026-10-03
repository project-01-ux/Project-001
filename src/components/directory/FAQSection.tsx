import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import type { FAQItem } from '../../types';

interface FAQSectionProps {
  items?: FAQItem[];
  title?: string;
  subtitle?: string;
}

const DEFAULT_FAQS: FAQItem[] = [
  {
    question: 'How do I find call girls and companion services in Bangalore?',
    answer: 'You can browse verified 18+ independent companion and call girl profiles in Bangalore directly on our platform. Filter listings by area (Koramangala, BTM Layout, Madiwala, Indiranagar, JP Nagar, HSR Layout, DSR Orchid), age, and real-time availability.'
  },
  {
    question: 'How can I contact Koramangala call girls or Bangalore escorts directly?',
    answer: 'Every companion profile features a direct call button with exact phone numbers (+91), WhatsApp links, and Telegram handles. Click the call button on any card to connect directly on your mobile dialpad.'
  },
  {
    question: 'Are all call girl and companion profiles in Bangalore 18+ age verified?',
    answer: 'Yes. All profile holders are strictly required to verify adult status (18+). We maintain zero tolerance for fraudulent profiles or non-adult listings.'
  },
  {
    question: 'Which areas in Bangalore have active companion and call girl listings?',
    answer: 'Our directory features active independent listings across Koramangala (4th Block & 80 Feet Road), BTM Layout, Madiwala, Indiranagar (100 Feet Road), JP Nagar, HSR Layout, and DSR Orchid.'
  },
  {
    question: 'What safety guidelines should I follow when contacting Bangalore companions?',
    answer: 'Always verify companion details, agree on booking guidelines in advance, meet in well-lit public dining or lounge venues, and never transfer money to unverified advance requests.'
  }
];

export const FAQSection: React.FC<FAQSectionProps> = ({
  items = DEFAULT_FAQS,
  title = 'Frequently Asked Questions',
  subtitle = 'Everything you need to know about navigating verified Bangalore call girls & companion directory profiles.'
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
      <div className="space-y-2 max-w-2xl">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-full uppercase tracking-wider">
          <HelpCircle size={14} /> Help & FAQ
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {title}
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          {subtitle}
        </p>
      </div>

      <div className="space-y-3 pt-2">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="border border-slate-200 rounded-2xl overflow-hidden transition-colors"
            >
              <button
                onClick={() => toggleIndex(index)}
                className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-semibold text-slate-900 hover:text-rose-600 bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer text-sm sm:text-base"
                aria-expanded={isOpen}
              >
                <span>{item.question}</span>
                <ChevronDown
                  size={18}
                  className={`text-slate-400 shrink-0 transform transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-rose-600' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="p-4 sm:p-5 pt-0 text-sm text-slate-600 leading-relaxed bg-white border-t border-slate-100">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
