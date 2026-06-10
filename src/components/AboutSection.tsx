import React from "react";
import { ghlCustomValues } from "../config/ghlConfig";
import { CheckIcon } from "./Icons";

export default function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-white border-t border-black/5 scroll-mt-[72px]">
      <div className="w-full max-w-[1200px] mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-[650px] mx-auto mb-16">
          <span className="inline-block text-[13px] font-bold tracking-[1.5px] uppercase text-accent mb-2">
            Your Smile Is In Good Hands
          </span>
          <h2 className="font-heading text-3xl md:text-[2.25rem] font-bold leading-tight tracking-tight text-text-primary mb-4">
            About Us
          </h2>
          <div className="w-4 h-4 bg-accent mx-auto" />
        </div>

        {/* Narrative & Credentials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-stretch">
          
          {/* Left Side: Copy Narrative (Two sub-columns for clean desktop layout) */}
          <div className="flex flex-col justify-center gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              
              {/* History column */}
              <div className="flex flex-col gap-4">
                <h3 className="font-heading text-lg font-bold text-text-primary border-l-2 border-accent pl-3">
                  Our History & Growth
                </h3>
                <p className="text-[14.5px] text-text-secondary leading-relaxed">
                  Since our founding in 2007, {ghlCustomValues.practice_name} has been the dental clinic of choice in the Ermita, Manila area. What started off as a small dental clinic in Pasay City has since grown into a premier Implant, Esthetic, and Diagnostic Center. We offer patients all the attention and care they deserve to get them smiling confidently again.
                </p>
                <p className="text-[14.5px] text-text-secondary leading-relaxed">
                  We are always accepting new patients and offer a full range of general, orthodontic, and cosmetic dental services, as well as emergency treatments. We are conveniently located at the corner of J. Bocobo and Padre Faura St., near Robinsons Mall in Ermita.
                </p>
              </div>

              {/* Commitment Column */}
              <div className="flex flex-col gap-4">
                <h3 className="font-heading text-lg font-bold text-text-primary border-l-2 border-[#6BA60B] pl-3">
                  Our Commitment to You
                </h3>
                <p className="text-[14.5px] text-text-secondary leading-relaxed">
                  Our friendly, knowledgeable, and skilled team offers excellent customer service and high-quality dental treatments to give you globally competitive dental care. We pride ourselves in our ability to see every member of your family. Our first priority is your complete comfort.
                </p>
                <p className="text-[14.5px] text-text-secondary leading-relaxed">
                  To ensure a safe, comfortable, and uncrowded environment, we strictly prioritize scheduled visits. Please understand that walk-in availability is limited. For appointment requests, you can call us directly or use our online smile assessment quiz.
                </p>
              </div>

            </div>
          </div>

          {/* Right Side: Visual Credentials Panel (Technique 4 Grid Card Styling) */}
          <div className="bg-[#F8FAFC] border border-black/5 rounded-xl p-8 lg:p-10 flex flex-col justify-between shadow-sm">
            <div>
              <span className="inline-block text-[11px] font-bold uppercase tracking-wider bg-category-blue-bg text-category-blue-txt px-3 py-1 rounded-sm mb-6">
                Accredited Diagnostic & Implant Center
              </span>
              
              <h4 className="font-heading text-xl font-bold text-text-primary mb-6">
                Why Patients Trust Our Dentists
              </h4>

              <div className="flex flex-col gap-4.5 mb-8">
                {[
                  "Serving the Manila community since 2007",
                  "Specialized in Implant, Esthetic & Diagnostic Care",
                  "Strict safety protocols and controlled patient spacing",
                  "Convenient location corner of Bocobo & Padre Faura St.",
                  "Affordable custom-tailored self-funding options"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3 text-[14.5px] text-text-secondary">
                    <span className="text-accent mt-1 shrink-0">
                      <CheckIcon className="w-4.5 h-4.5" strokeWidth={2.5} />
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="#booking"
              className="inline-flex items-center justify-center h-[48px] w-full text-[13.6px] font-bold text-white bg-accent hover:bg-accent-hover rounded-md transition-all duration-200 uppercase shadow-sm active:scale-[0.98]"
            >
              Start My Smile Assessment
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
