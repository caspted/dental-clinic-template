import React from "react";
import Image from "next/image";
import { ghlCustomValues } from "../config/ghlConfig";

export default function Reviews() {
  return (
    <section id="testimonials" className="py-12 md:py-24 bg-bg-secondary border-t border-b border-black/5">
      <div className="w-full max-w-[1200px] mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-[650px] mx-auto mb-12">
          <span className="inline-block text-[13px] font-bold tracking-[1.5px] uppercase text-accent mb-2">
            Success Stories
          </span>
          <h2 className="font-heading text-3xl md:text-[2.25rem] font-bold leading-tight tracking-tight text-text-primary mb-4">
            What Our Patients Say
          </h2>
          <p className="text-[17px] text-text-secondary">
            Real transformations from real {ghlCustomValues.practice_city} neighbors who discovered comfortable dentistry.
          </p>
        </div>

        {/* Testimonials Grid (Technique 4 Alternating Card Styling) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1000px] mx-auto">
          {/* Review 1: Card 1 (White Background) */}
          <div className="bg-white border border-black/8 rounded-xl p-8 md:p-10 hover:translate-y-[-2px] hover:shadow-md transition-all duration-300 flex flex-col justify-between shadow-sm">
            <div>
              <div className="text-[#FBBF24] text-lg tracking-wider mb-5">★★★★★</div>
              <p className="text-lg text-text-primary italic leading-relaxed mb-8">
                &ldquo;I was terrified of the dentist for years. {ghlCustomValues.practice_name} completely changed my perspective: they walked me through every step and the treatment was literally 100% painless. My Invisalign results are absolutely flawless.&rdquo;
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Image
                src="/assets/avatar_female.webp"
                alt="Patient Sarah M."
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                width={48}
                height={48}
              />
              <div className="flex flex-col">
                <span className="font-heading font-bold text-[17px] text-text-primary">
                  Sarah M.
                </span>
                <span className="text-[13.6px] text-text-secondary">
                  Invisalign & Whitening Patient
                </span>
              </div>
            </div>
          </div>

          {/* Review 2: Card 2 (Light Slate Background) */}
          <div className="bg-bg-secondary border border-black/8 rounded-xl p-8 md:p-10 hover:translate-y-[-2px] hover:shadow-md transition-all duration-300 flex flex-col justify-between shadow-sm">
            <div>
              <div className="text-[#FBBF24] text-lg tracking-wider mb-5">★★★★★</div>
              <p className="text-lg text-text-primary italic leading-relaxed mb-8">
                &ldquo;The implants look and feel exactly like my natural teeth. From the premium clinic vibe to the ultra-modern technology, the entire experience was premium and outstanding. I highly recommend {ghlCustomValues.practice_name}.&rdquo;
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Image
                src="/assets/avatar_male.webp"
                alt="Patient David K."
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                width={48}
                height={48}
              />
              <div className="flex flex-col">
                <span className="font-heading font-bold text-[17px] text-text-primary">
                  David K.
                </span>
                <span className="text-[13.6px] text-text-secondary">
                  Dental Implants Patient
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
