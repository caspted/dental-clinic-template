import React from "react";
import { ghlCustomValues } from "../config/ghlConfig";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-16 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.05),transparent_60%)]">
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-8 md:gap-12 items-center">
        {/* Left Side Content */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <span className="inline-block text-[13px] font-semibold tracking-wider uppercase text-accent bg-accent/20 px-3 py-1.5 rounded-sm mb-4">
            For Families Seeking Premium Dental Care in {ghlCustomValues.practice_city}
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] text-text-primary tracking-tight mb-4">
            {ghlCustomValues.practice_tagline}
          </h1>
          <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-[500px] leading-relaxed">
            Advanced oral healthcare provided by {ghlCustomValues.doctor_name} ({ghlCustomValues.doctor_specialty}).
          </p>
          <div className="w-full sm:w-auto mb-6">
            <a
              href="#booking"
              className="inline-flex items-center justify-center w-full sm:w-auto h-[52px] px-8 text-base font-semibold text-white bg-accent hover:bg-accent-hover active:scale-[0.98] rounded-lg transition-all duration-200 shadow-md shadow-accent/20"
            >
              Get My Free Smile Assessment
            </a>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-[#FBBF24] text-lg tracking-wider">★★★★★</div>
            <span className="text-sm font-medium text-text-secondary">
              5.0 Rated (500+ Google Reviews)
            </span>
          </div>
        </div>

        {/* Right Side Image */}
        <div className="relative group rounded-xl overflow-hidden shadow-xl border border-black/5 aspect-[4/3] md:aspect-auto">
          <img
            src="/assets/hero.webp"
            alt={`Premium ${ghlCustomValues.practice_name} Clinic Interior`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02] min-h-[300px] md:min-h-[400px]"
            loading="eager"
          />
          <div className="absolute inset-0 bg-[inset_0_0_100px_rgba(255,255,255,0.1)] pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
