"use client";

import React, { useState } from "react";
import { ghlCustomValues } from "../config/ghlConfig";

interface FaqItem {
  question: string;
  answer: React.ReactNode;
}

export default function AccordionFAQ() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs: FaqItem[] = [
    {
      question: "Do you accept my PPO dental insurance?",
      answer: (
        <p>
          Yes, {ghlCustomValues.practice_name} is an in-network provider with the vast majority of PPO insurance plans, including Delta Dental, Cigna, MetLife, Aetna, and Guardian. Our experienced staff takes care of all billing paperwork and verifies benefits in real time to ensure you pay the lowest possible out-of-pocket amount.
        </p>
      )
    },
    {
      question: "What if I do not have dental insurance?",
      answer: (
        <p>
          If you don&apos;t have insurance, you are definitely not alone. We offer affordable custom self-funding options, including our Membership Club which includes all cleanings, exams, X-rays, and significant savings on cosmetic/restorative treatments. We proudly support {ghlCustomValues.financing_options}.
        </p>
      )
    },
    {
      question: "Is the treatment actually pain-free?",
      answer: (
        <p>
          Absolutely. We specialize in catering to patients with dental anxiety. We combine warm clinical styling, ultra-gentle micro-needling anesthesia techniques, noise-canceling headphones, and mild conscious sedation options if requested. We promise a completely painless, premium experience.
        </p>
      )
    },
    {
      question: "Is parking available at the clinic?",
      answer: (
        <p>
          Yes, we provide 2 hours of complimentary secure underground parking right in our medical building. The parking entrance is fully labeled and accessible via the side driveway, with an elevator taking you straight to our reception room floor.
        </p>
      )
    }
  ];

  return (
    <section id="faq" className="py-12 md:py-24">
      <div className="w-full max-w-[1200px] mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-[650px] mx-auto mb-12">
          <span className="inline-block text-[13px] font-bold tracking-[1.5px] uppercase text-accent mb-2">
            Common Questions
          </span>
          <h2 className="font-heading text-3xl md:text-[2.25rem] font-bold leading-tight tracking-tight text-text-primary mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-[17px] text-text-secondary">
            We transparently address pricing, insurance, comfort, and safety so you can book with clarity.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="max-w-[760px] mx-auto flex flex-col gap-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className={`border border-black/8 bg-white rounded-lg overflow-hidden transition-all duration-200 ${
                  isOpen ? "border-accent shadow-sm" : "hover:border-black/15"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 flex items-center justify-between cursor-pointer text-left select-none min-h-[52px]"
                >
                  <span className="font-heading text-base md:text-lg font-semibold text-text-primary">
                    {faq.question}
                  </span>
                  <span
                    className={`text-xl font-medium text-text-secondary transition-transform duration-300 flex items-center justify-center w-6 h-6 ${
                      isOpen ? "rotate-45 text-accent" : "text-text-secondary"
                    }`}
                  >
                    ＋
                  </span>
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-[300px]" : "max-h-0"
                  }`}
                >
                  <div className="px-6 pb-5 text-[15px] text-text-secondary leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
