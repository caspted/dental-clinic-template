"use client";

import React, { useState } from "react";
import { ShieldIcon, SparklesIcon, ImplantIcon } from "./Icons";

interface Treatment {
  title: string;
  duration: string;
  price: string;
  description: string;
  ctaText: string;
}

interface Pillar {
  id: string;
  title: string;
  badge: string;
  icon: React.ReactNode;
  description: string;
  colorClass: string;
  bgClass: string;
  borderClass: string;
  accentHex: string;
  treatments: Treatment[];
}

export default function ServicesPillars() {
  const [activeTab, setActiveTab] = useState<string>("preventive");

  const pillars: Pillar[] = [
    {
      id: "preventive",
      title: "Preventive Care",
      badge: "Routine & Hygiene",
      icon: <ShieldIcon className="w-8 h-8" strokeWidth={1.5} />,
      description: "Ensure a lifetime of healthy, pain-free smiles through proactive, gentle diagnostics and professional hygiene maintenance.",
      colorClass: "text-category-blue-txt",
      bgClass: "bg-category-blue-bg",
      borderClass: "border-category-blue-txt",
      accentHex: "#00B2BB",
      treatments: [
        {
          title: "Oral Prophylaxis (Teeth Cleaning)",
          duration: "1 hr",
          price: "Starts at Php 1,000",
          description: "Gentle, thorough scaling and polishing to keep plaque, tartar, and gum disease away.",
          ctaText: "Book My Cleaning"
        },
        {
          title: "Routine Dental Consultation",
          duration: "15 min",
          price: "₱800",
          description: "Comprehensive oral exam, digital diagnostics, and a customized healthy smile roadmap.",
          ctaText: "Book My Consultation"
        },
        {
          title: "Preventive Hygiene & Check-up",
          duration: "1 hr",
          price: "Starts at Php 1,000",
          description: "Complete hygiene evaluation, deep scaling, and protective fluoride application.",
          ctaText: "Book My Check-up"
        }
      ]
    },
    {
      id: "cosmetic",
      title: "Cosmetic Artistry",
      badge: "Esthetics & Design",
      icon: <SparklesIcon className="w-8 h-8" strokeWidth={1.5} />,
      description: "Enhance the natural brilliance of your smile with custom veneers, advanced teeth whitening, and clear aligners.",
      colorClass: "text-category-emerald-txt",
      bgClass: "bg-category-emerald-bg",
      borderClass: "border-category-emerald-txt",
      accentHex: "#6BA60B",
      treatments: [
        {
          title: "Professional Teeth Whitening",
          duration: "1 hr 30 min",
          price: "Starts at Php 16,000",
          description: "Safe, in-office laser whitening designed to brighten your smile by up to 8 shades.",
          ctaText: "Brighten My Smile"
        },
        {
          title: "Invisalign Clear Aligners",
          duration: "1 hr",
          price: "Starts at Php 80,000",
          description: "Virtually invisible, comfortable orthodontic alignment to give you a straight, confident smile.",
          ctaText: "Claim My Invisalign Consult"
        },
        {
          title: "Dentures & Porcelain Veneers",
          duration: "1 hr",
          price: "Starts at Php 15,000",
          description: "Bespoke porcelain restorations custom-shaded to improve your bite, speech, and natural aesthetics.",
          ctaText: "Book My Veneer Consult"
        }
      ]
    },
    {
      id: "restorative",
      title: "Advanced Restoration",
      badge: "Implants & Surgery",
      icon: <ImplantIcon className="w-8 h-8" strokeWidth={1.5} />,
      description: "Restore complete functionality and confidence with high-end, 3D guided implants, orthodontics, and comfort therapy.",
      colorClass: "text-category-indigo-txt",
      bgClass: "bg-category-indigo-bg",
      borderClass: "border-category-indigo-txt",
      accentHex: "#006894",
      treatments: [
        {
          title: "3D Guided Dental Implants",
          duration: "1 hr",
          price: "Starts at Php 130,000",
          description: "Ultra-precise titanium implants that look, feel, and function exactly like your natural teeth.",
          ctaText: "Book My Implant Consult"
        },
        {
          title: "Orthodontics (Metal & Ceramic Braces)",
          duration: "1 hr",
          price: "Starts at Php 80,000",
          description: "Traditional and aesthetic braces to resolve complex crowding, spacing, and structural alignment issues.",
          ctaText: "Book My Braces Consult"
        },
        {
          title: "Comfort Root Canal Treatment",
          duration: "1 hr",
          price: "Starts at Php 12,000",
          description: "Gentle therapy designed to save severely decayed teeth and relieve persistent dental pain.",
          ctaText: "Book Comfort Therapy"
        },
        {
          title: "Gentle Tooth Extraction & Surgery",
          duration: "1 hr",
          price: "Starts at Php 1,000",
          description: "Safe and painless surgical extraction for compromised, broken, or symptomatic wisdom teeth.",
          ctaText: "Book My Appointment"
        }
      ]
    }
  ];

  const activePillar = pillars.find((p) => p.id === activeTab) || pillars[0];

  return (
    <section id="services" className="bg-white py-16 md:py-24 scroll-mt-[72px]">
      <div className="w-full max-w-[1200px] mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-[650px] mx-auto mb-16">
          <span className="inline-block text-[13px] font-bold tracking-[1.5px] uppercase text-accent mb-2">
            World-Class Treatments
          </span>
          <h2 className="font-heading text-3xl md:text-[2.25rem] font-bold leading-tight tracking-tight text-text-primary mb-4">
            Our Dental Services
          </h2>
          <p className="text-[17px] text-text-secondary leading-relaxed">
            We showcase three core pillars of care, providing premium, comfort-driven dentistry tailored to your unique smile goals.
          </p>
        </div>

        {/* 1. Three Pillars of Care Grid (Technique 3) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pillars.map((pillar) => (
            <div
              key={pillar.id}
              onClick={() => setActiveTab(pillar.id)}
              className={`cursor-pointer border-t-[3px] bg-white rounded-lg p-8 shadow-sm transition-all duration-300 hover:shadow-md hover:translate-y-[-2px] flex flex-col items-start ${
                activeTab === pillar.id
                  ? `${pillar.borderClass} ring-1 ring-black/5 scale-[1.01]`
                  : "border-transparent opacity-85 hover:opacity-100"
              }`}
            >
              {/* Category Badge & Icon */}
              <div className="w-full flex items-center justify-between mb-6">
                <span className={`inline-block text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-sm ${pillar.bgClass} ${pillar.colorClass}`}>
                  {pillar.badge}
                </span>
                <span className={pillar.colorClass}>
                  {pillar.icon}
                </span>
              </div>

              {/* Title & Copy */}
              <h3 className="font-heading text-xl font-bold text-text-primary mb-3">
                {pillar.title}
              </h3>
              <p className="text-[14.5px] text-text-secondary leading-relaxed mb-6 flex-grow">
                {pillar.description}
              </p>

              {/* Interactive Indicator */}
              <button
                type="button"
                className={`text-[13.6px] font-bold flex items-center gap-1.5 transition-all duration-200 mt-auto ${pillar.colorClass} hover:opacity-80`}
              >
                {activeTab === pillar.id ? "Viewing Menu" : "View Treatment Menu"}
                <span className="text-xs">➔</span>
              </button>
            </div>
          ))}
        </div>

        {/* 2. Interactive Menu Tabs & Grid (Technique 4 Alternating Card Styling) */}
        <div className="bg-white border border-black/5 rounded-xl p-6 md:p-10 shadow-sm">
          
          {/* Tab Selector Headers */}
          <div className="flex flex-col sm:flex-row gap-2 border-b border-black/5 pb-6 mb-8">
            {pillars.map((pillar) => {
              const isActive = activeTab === pillar.id;
              return (
                <button
                  key={pillar.id}
                  type="button"
                  onClick={() => setActiveTab(pillar.id)}
                  style={{ 
                    borderColor: isActive ? pillar.accentHex : "transparent",
                    color: isActive ? pillar.accentHex : undefined
                  }}
                  className={`flex-1 min-h-[44px] px-6 py-3 text-[14.4px] font-bold text-center border-b-2 transition-all duration-200 cursor-pointer ${
                    isActive 
                      ? "bg-slate-50/50" 
                      : "text-text-secondary border-transparent hover:text-text-primary hover:bg-slate-50/20"
                  }`}
                >
                  {pillar.title}
                </button>
              );
            })}
          </div>

          {/* Treatment List (Technique 4 Grid Alternate Card Styling) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activePillar.treatments.map((treatment, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className={`border border-black/5 rounded-lg p-6 md:p-8 flex flex-col justify-between transition-all duration-200 hover:shadow-sm ${
                    isEven ? "bg-white" : "bg-[#F8FAFC]"
                  }`}
                >
                  <div>
                    {/* Title and Duration Badge */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                      <h4 className="font-heading text-[17px] font-bold text-text-primary leading-snug">
                        {treatment.title}
                      </h4>
                      <span className="inline-flex items-center justify-center self-start sm:self-center bg-slate-100 text-text-secondary text-[12px] font-medium px-2.5 py-1 rounded-sm shrink-0">
                        {treatment.duration}
                      </span>
                    </div>

                    {/* Price Tag */}
                    <span className="inline-block text-accent font-bold text-[15px] mb-3">
                      {treatment.price}
                    </span>

                    {/* Description */}
                    <p className="text-[14px] text-text-secondary leading-relaxed mb-6">
                      {treatment.description}
                    </p>
                  </div>

                  {/* Primary CTA - First-person, action-oriented, height 48px */}
                  <a
                    href="#booking"
                    style={{ 
                      backgroundColor: activePillar.accentHex,
                    }}
                    className="w-full inline-flex items-center justify-center h-[48px] px-6 text-[13.6px] font-bold text-white uppercase rounded-md transition-all duration-200 hover:brightness-95 active:scale-[0.98] shadow-sm select-none"
                  >
                    {treatment.ctaText}
                  </a>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
