import React from "react";
import { ghlCustomValues } from "../config/ghlConfig";

export default function Navbar() {
  const telLink = `tel:${ghlCustomValues.practice_phone.replace(/\D/g, "")}`;

  return (
    <header className="sticky top-0 z-50 h-[72px] flex items-center bg-white/95 backdrop-blur-md border-b border-black/5 px-4 md:px-0 shadow-sm">
      <div className="w-full max-w-[1200px] mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {/* Custom Stylized Tooth-Heart Logo */}
          <div className="flex items-center justify-center w-9 h-9">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              {/* Tooth outer path (heart-like shape) */}
              <path 
                d="M 100,55 C 75,10 20,35 25,90 C 29,130 50,150 100,185 C 150,150 171,130 175,90 C 180,35 125,10 100,55 Z" 
                fill="none" 
                stroke="#6BA60B" 
                strokeWidth="12" 
                strokeLinejoin="round"
              />
              {/* Inner details / healing cross */}
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
        
        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#services"
            className="text-[14px] font-bold text-brand-neutral hover:text-accent h-[44px] flex items-center transition-colors duration-200"
          >
            Services
          </a>
          <a
            href="#about"
            className="text-[14px] font-bold text-brand-neutral hover:text-accent h-[44px] flex items-center transition-colors duration-200"
          >
            About Us
          </a>
          <a
            href="#contact-location"
            className="text-[14px] font-bold text-brand-neutral hover:text-accent h-[44px] flex items-center transition-colors duration-200"
          >
            Contact
          </a>
        </nav>

        {/* CTA Button */}
        <div className="flex items-center">
          <a
            href="#booking"
            className="inline-flex items-center justify-center h-[44px] px-6 text-[13px] font-bold bg-brand-tertiary hover:bg-brand-tertiary/90 text-white uppercase rounded-sm transition-all duration-200 shadow-sm"
          >
            Book Appointment
          </a>
        </div>
      </div>
    </header>
  );
}
