"use client";

import React from "react";
import { ghlCustomValues } from "../config/ghlConfig";
import { ShieldIcon, SparklesIcon, ImplantIcon } from "./Icons";

export default function ServicesPillars() {
  return (
    <section id="services" className="py-12 md:py-24">
      <div className="w-full max-w-[1200px] mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-[650px] mx-auto mb-12">
          <span className="inline-block text-[13px] font-bold tracking-[1.5px] uppercase text-accent mb-2">
            Advanced Treatments
          </span>
          <h2 className="font-heading text-3xl md:text-[2.25rem] font-bold leading-tight tracking-tight text-text-primary mb-4">
            Our Premium Dental Pillars
          </h2>
          <p className="text-[17px] text-text-secondary">
            Tailored treatments utilizing cutting-edge dental technology for comfort and precision.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1: Preventive Care */}
          <div className="bg-white border border-black/8 rounded-xl p-8 hover:translate-y-[-4px] hover:border-black/15 hover:shadow-md transition-all duration-300 flex flex-col items-start shadow-sm">
            <div className="w-14 h-14 bg-bg-secondary rounded-lg flex items-center justify-center text-[#0284C7] mb-5">
              <ShieldIcon className="w-7 h-7" strokeWidth={1.75} />
            </div>
            <span className="text-[12px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full mb-4 inline-block bg-[#0EA5E9]/8 text-[#0284C7]">
              Preventive Care
            </span>
            <h3 className="font-heading text-[1.35rem] font-bold text-text-primary mb-3">
              Checkups & Cleaning
            </h3>
            <p className="text-[15px] text-text-secondary leading-relaxed mb-6">
              Comprehensive exams, gentle ultrasonic scaling, and deep cleaning to protect your natural smile and maintain peak oral health.
            </p>
            <ul className="w-full list-none mt-auto">
              <li className="text-[14px] text-text-secondary py-1.5 border-t border-dashed border-black/8 flex items-center gap-2">
                <span className="text-accent font-bold">✦</span>
                {ghlCustomValues.imaging_type}
              </li>
              <li className="text-[14px] text-text-secondary py-1.5 border-t border-dashed border-black/8 flex items-center gap-2">
                <span className="text-accent font-bold">✦</span>
                Precision Fluoride Treatment
              </li>
              <li className="text-[14px] text-text-secondary py-1.5 border-t border-dashed border-black/8 flex items-center gap-2">
                <span className="text-accent font-bold">✦</span>
                Oral Cancer Screening
              </li>
            </ul>
          </div>

          {/* Pillar 2: Cosmetic Artistry */}
          <div className="bg-white border border-black/8 rounded-xl p-8 hover:translate-y-[-4px] hover:border-black/15 hover:shadow-md transition-all duration-300 flex flex-col items-start shadow-sm">
            <div className="w-14 h-14 bg-bg-secondary rounded-lg flex items-center justify-center text-[#059669] mb-5">
              <SparklesIcon className="w-7 h-7" strokeWidth={1.75} />
            </div>
            <span className="text-[12px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full mb-4 inline-block bg-[#10B981]/8 text-[#059669]">
              Cosmetic Artistry
            </span>
            <h3 className="font-heading text-[1.35rem] font-bold text-text-primary mb-3">
              Smile Design & Veneers
            </h3>
            <p className="text-[15px] text-text-secondary leading-relaxed mb-4">
              State-of-the-art porcelain veneers and rapid-acting teeth whitening customized to deliver a natural, photogenic smile transformation.
            </p>

            <ul className="w-full list-none mt-auto">
              <li className="text-[14px] text-text-secondary py-1.5 border-t border-dashed border-black/8 flex items-center gap-2">
                <span className="text-accent font-bold">✦</span>
                Custom Porcelain Veneers
              </li>
              <li className="text-[14px] text-text-secondary py-1.5 border-t border-dashed border-black/8 flex items-center gap-2">
                <span className="text-accent font-bold">✦</span>
                Professional Laser Whitening
              </li>
              <li className="text-[14px] text-text-secondary py-1.5 border-t border-dashed border-black/8 flex items-center gap-2">
                <span className="text-accent font-bold">✦</span>
                Invisalign Clear Aligners
              </li>
            </ul>
          </div>

          {/* Pillar 3: Restoration */}
          <div className="bg-white border border-black/8 rounded-xl p-8 hover:translate-y-[-4px] hover:border-black/15 hover:shadow-md transition-all duration-300 flex flex-col items-start shadow-sm">
            <div className="w-14 h-14 bg-bg-secondary rounded-lg flex items-center justify-center text-[#4F46E5] mb-5">
              <ImplantIcon className="w-7 h-7" strokeWidth={1.75} />
            </div>
            <span className="text-[12px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full mb-4 inline-block bg-[#6366F1]/8 text-[#4F46E5]">
              Restoration
            </span>
            <h3 className="font-heading text-[1.35rem] font-bold text-text-primary mb-3">
              Implants & Crowns
            </h3>
            <p className="text-[15px] text-text-secondary leading-relaxed mb-6">
              Premium dental restorations matching full structural alignment. Implants starting from {ghlCustomValues.implant_price_low} up to {ghlCustomValues.implant_price_high}.
            </p>
            <ul className="w-full list-none mt-auto">
              <li className="text-[14px] text-text-secondary py-1.5 border-t border-dashed border-black/8 flex items-center gap-2">
                <span className="text-accent font-bold">✦</span>
                Single & Multi-Tooth Implants
              </li>
              <li className="text-[14px] text-text-secondary py-1.5 border-t border-dashed border-black/8 flex items-center gap-2">
                <span className="text-accent font-bold">✦</span>
                Same-Day Durable Crowns
              </li>
              <li className="text-[14px] text-text-secondary py-1.5 border-t border-dashed border-black/8 flex items-center gap-2">
                <span className="text-accent font-bold">✦</span>
                Full Smile Reconstruction
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
