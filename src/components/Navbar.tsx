"use client";

import React from "react";
import { ghlCustomValues } from "../config/ghlConfig";

export default function Navbar() {
  const telLink = `tel:${ghlCustomValues.practice_phone.replace(/\D/g, "")}`;

  return (
    <header className="sticky top-0 z-50 h-[72px] flex items-center bg-white/85 backdrop-blur-md border-b border-black/8 px-4 md:px-0">
      <div className="w-full max-w-[1200px] mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl text-accent font-extrabold">✦</span>
          <span className="font-heading text-xl font-bold tracking-tight text-text-primary">
            {ghlCustomValues.practice_name}
          </span>
        </div>
        
        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#services"
            className="text-[15px] font-medium text-text-secondary hover:text-accent h-[44px] flex items-center transition-colors duration-200"
          >
            Services
          </a>
          <a
            href="#testimonials"
            className="text-[15px] font-medium text-text-secondary hover:text-accent h-[44px] flex items-center transition-colors duration-200"
          >
            Reviews
          </a>
          <a
            href="#booking"
            className="text-[15px] font-medium text-text-secondary hover:text-accent h-[44px] flex items-center transition-colors duration-200"
          >
            Book Assessment
          </a>
          <a
            href="#faq"
            className="text-[15px] font-medium text-text-secondary hover:text-accent h-[44px] flex items-center transition-colors duration-200"
          >
            FAQs
          </a>
        </nav>

        {/* CTA Button */}
        <div className="flex items-center">
          <a
            href={telLink}
            className="inline-flex items-center justify-center h-[48px] px-6 text-[15px] font-semibold border border-black/8 rounded-md hover:border-black/15 hover:bg-bg-secondary text-text-primary transition-all duration-200 shadow-sm"
          >
            Call: {ghlCustomValues.practice_phone}
          </a>
        </div>
      </div>
    </header>
  );
}
