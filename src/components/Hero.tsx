import React from "react";
import Image from "next/image";
import { ghlCustomValues } from "../config/ghlConfig";

export default function Hero() {
  return (
    <section className="relative min-h-[600px] md:min-h-[700px] flex items-center bg-black/10 overflow-hidden">
      {/* Background Image of Premium Clinic */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/hero.webp"
          alt="Premium Bocobo Dental Clinic Interior"
          width={1400}
          height={800}
          priority
          className="w-full h-full object-cover object-center"
        />
        {/* Soft dark overlay to ensure readability */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 md:px-6">
        {/* Left Aligned Glassmorphic Card */}
        <div className="w-full max-w-[540px] bg-white/80 backdrop-blur-md border border-white/40 shadow-2xl rounded-lg p-8 md:p-12 animate-fade-in">
          {/* Green Pill Badge */}
          <span className="inline-block text-[11px] font-extrabold tracking-wider uppercase bg-brand-secondary text-white px-3 py-1.5 rounded-sm mb-6">
            Excellence in Dentistry
          </span>
          
          <h1 className="font-heading text-4xl md:text-5xl font-black leading-[1.15] text-brand-tertiary tracking-tight mb-5">
            Get the Confident, Healthy Smile You Deserve
          </h1>
          
          <p className="text-base md:text-lg font-medium text-brand-neutral mb-8 leading-relaxed">
            Experience world-class dental care in a boutique environment designed for your comfort and absolute well-being.
          </p>
          
          {/* Twin CTA Buttons */}
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <a
              href="#booking"
              className="w-full md:w-auto inline-flex items-center justify-center min-h-[50px] py-3.5 px-6 text-[14px] font-extrabold text-white bg-brand-tertiary hover:bg-brand-tertiary/90 rounded-sm transition-all duration-200 shadow-md shadow-brand-tertiary/10 uppercase text-center leading-snug"
            >
              Book My Smile Assessment
            </a>
            <a
              href="#services"
              className="w-full md:w-auto inline-flex items-center justify-center min-h-[50px] py-3.5 px-6 text-[14px] font-extrabold text-brand-tertiary border-2 border-brand-tertiary hover:bg-brand-tertiary/5 rounded-sm transition-all duration-200 uppercase text-center leading-snug"
            >
              View Services
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
