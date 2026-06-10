"use client";

import React, { useEffect, useState } from "react";
import { ghlCustomValues } from "../config/ghlConfig";

export default function Footer() {
  const [isStickyVisible, setIsStickyVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Find the hero or top buttons to trigger the sticky bottom bar
      const isMobile = window.innerWidth < 768;
      // Trigger when scroll exceeds 400px on mobile
      if (isMobile && window.scrollY > 400) {
        setIsStickyVisible(true);
      } else {
        setIsStickyVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <>
      <footer className="bg-bg-secondary text-text-primary py-12 px-4 md:px-0 border-t border-black/5">
        <div className="w-full max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left side: Brand info with stylized logo */}
          <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left">
            <div className="flex items-center gap-2.5">
              {/* Custom Stylized Tooth-Heart Logo */}
              <div className="flex items-center justify-center w-9 h-9">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <path 
                    d="M 100,55 C 75,10 20,35 25,90 C 29,130 50,150 100,185 C 150,150 171,130 175,90 C 180,35 125,10 100,55 Z" 
                    fill="none" 
                    stroke="#6BA60B" 
                    strokeWidth="12" 
                    strokeLinejoin="round"
                  />
                  <path 
                    d="M 100,75 L 100,125 M 75,100 L 125,100" 
                    stroke="#00B2BB" 
                    strokeWidth="10" 
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-base font-extrabold tracking-tight text-brand-tertiary uppercase leading-none">
                  Bocobo
                </span>
                <span className="text-[10px] font-bold tracking-widest text-[#6BA60B] uppercase leading-none mt-1">
                  Dental Care
                </span>
              </div>
            </div>
            <p className="text-text-secondary text-[13.6px] leading-relaxed max-w-[360px]">
              Providing premium, tech-forward, and comfortable dental care in Ermita, Manila.
            </p>
          </div>

          {/* Right side: Navigation & legal links */}
          <div className="flex flex-col items-center md:items-end gap-4">
            {/* Quick navigation */}
            <div className="flex items-center gap-6 text-[13.6px] font-bold text-text-secondary">
              <a href="#services" className="hover:text-accent transition-colors">Services</a>
              <a href="#about" className="hover:text-accent transition-colors">About Us</a>
              <a href="#booking" className="hover:text-accent transition-colors">Booking</a>
              <a href="#contact-location" className="hover:text-accent transition-colors">Location</a>
            </div>
            
            {/* Legal and Copyright */}
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-[12.8px] text-text-muted">
              <span>&copy; {new Date().getFullYear()} {ghlCustomValues.practice_name}. All rights reserved.</span>
              <div className="flex items-center gap-4 font-semibold">
                <a href="#" className="hover:text-text-secondary transition-colors h-[44px] flex items-center">Privacy Policy</a>
                <a href="#" className="hover:text-text-secondary transition-colors h-[44px] flex items-center">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Sticky Bottom Mobile CTA Bar */}
      <div
        className={`fixed bottom-0 left-0 w-full bg-white/92 backdrop-blur-md border-t border-black/8 shadow-2xl z-40 px-4 py-3 transition-transform duration-300 md:hidden ${
          isStickyVisible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between max-w-[600px] mx-auto gap-4">
          <div className="flex flex-col">
            <span className="font-heading font-bold text-[15px] text-text-primary leading-tight">
              {ghlCustomValues.practice_name}
            </span>
            <span className="text-[12px] text-accent font-semibold">
              5.0 ★ Google Rated
            </span>
          </div>
          <a
            href="#booking"
            className="inline-flex items-center justify-center h-[44px] px-[18px] text-[13.6px] font-semibold text-white bg-accent hover:bg-accent-hover active:scale-[0.98] rounded-md transition-all duration-200 shadow-sm"
          >
            Book Smile Assessment
          </a>
        </div>
      </div>
    </>
  );
}
