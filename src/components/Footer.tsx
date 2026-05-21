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
      <footer className="bg-[#0F172A] text-white pt-16 pb-8 px-4 md:px-0">
        <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-12 md:gap-24">
          {/* Footer Top Grid */}
          <div className="grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-12 md:gap-24">
            {/* Brand column */}
            <div className="flex flex-col items-start gap-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl text-accent font-extrabold">✦</span>
                <span className="font-heading text-xl font-bold tracking-tight text-white">
                  {ghlCustomValues.practice_name}
                </span>
              </div>
              <p className="text-[#94A3B8] text-[15px] leading-relaxed max-w-[320px]">
                Providing premium, tech-forward, and comfortable dental care in {ghlCustomValues.practice_city}.
              </p>
            </div>

            {/* Info Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {/* Col 1: Office Address */}
              <div className="flex flex-col gap-3">
                <h4 className="text-white text-[15.2px] font-bold uppercase tracking-wider">
                  Our Office
                </h4>
                <p className="text-[#94A3B8] text-[14.4px] leading-relaxed">
                  {ghlCustomValues.practice_address}
                  <br />
                  {ghlCustomValues.practice_city}, {ghlCustomValues.practice_state}
                </p>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(
                    `${ghlCustomValues.practice_address}, ${ghlCustomValues.practice_city}, ${ghlCustomValues.practice_state}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent text-[13.6px] font-semibold hover:text-[#38BDF8] h-[44px] flex items-center transition-colors duration-200"
                >
                  Get Directions on Google Maps ↗
                </a>
              </div>

              {/* Col 2: Clinic Hours */}
              <div className="flex flex-col gap-3">
                <h4 className="text-white text-[15.2px] font-bold uppercase tracking-wider">
                  Clinic Hours
                </h4>
                <p className="text-[#94A3B8] text-[14.4px] leading-relaxed">
                  Mon - Fri: 8:00 AM - 6:00 PM
                  <br />
                  Saturday: 9:00 AM - 3:00 PM
                  <br />
                  Sunday: Closed
                </p>
              </div>

              {/* Col 3: Get in Touch */}
              <div className="flex flex-col gap-3">
                <h4 className="text-white text-[15.2px] font-bold uppercase tracking-wider">
                  Get In Touch
                </h4>
                <p className="text-[#94A3B8] text-[14.4px] leading-relaxed">
                  Email: {ghlCustomValues.doctor_email}
                  <br />
                  Phone: {ghlCustomValues.practice_phone}
                </p>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-[#1E293B] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[#64748B] text-[13.6px] text-center md:text-left">
              &copy; {new Date().getFullYear()} {ghlCustomValues.practice_name}. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-[12px] text-[#64748B] hover:text-[#94A3B8] h-[44px] flex items-center transition-colors duration-200"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-[12px] text-[#64748B] hover:text-[#94A3B8] h-[44px] flex items-center transition-colors duration-200"
              >
                Terms of Service
              </a>
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
