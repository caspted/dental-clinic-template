import React from "react";
import { ghlCustomValues } from "../config/ghlConfig";

export default function ContactLocation() {
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.1712470559775!2d120.9801602758457!3d14.577963877993077!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397ca268fc330e7%3A0xe54b9d0360a0a54e!2sBocobo%20St%20%26%20Padre%20Faura%20St%2C%20Ermita%2C%20Manila%2C%201004%20Metro%20Manila%2C%20Philippines!5e0!3m2!1sen!2sph!4v1717989500000!5m2!1sen!2sph";

  return (
    <section id="contact-location" className="py-16 md:py-24 bg-[#F8FAFC] border-t border-black/5 scroll-mt-[72px]">
      <div className="w-full max-w-[1200px] mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-[650px] mx-auto mb-16">
          <span className="inline-block text-[13px] font-bold tracking-[1.5px] uppercase text-accent mb-2">
            Find Our Practice
          </span>
          <h2 className="font-heading text-3xl md:text-[2.25rem] font-bold leading-tight tracking-tight text-text-primary mb-4">
            Contact & Location
          </h2>
          <div className="w-4 h-4 bg-accent mx-auto" />
        </div>

        {/* 2-Column Location details vs Maps Embed */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Opening hours & Details card */}
          <div className="bg-white border border-black/5 rounded-xl p-8 lg:p-10 flex flex-col justify-between shadow-sm">
            <div>
              {/* Address details */}
              <div className="mb-8 border-b border-black/5 pb-8">
                <h3 className="font-heading text-sm font-extrabold text-text-secondary uppercase tracking-wider mb-3">
                  Our Address
                </h3>
                <p className="text-lg font-bold text-text-primary mb-2">
                  {ghlCustomValues.practice_name}
                </p>
                <p className="text-[15px] text-text-secondary leading-relaxed mb-4">
                  {ghlCustomValues.practice_address}
                </p>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(ghlCustomValues.practice_address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[13.6px] font-bold text-accent hover:text-accent-hover transition-colors duration-200"
                >
                  View on Google Maps ↗
                </a>
              </div>

              {/* Opening Hours list */}
              <div className="mb-8 border-b border-black/5 pb-8">
                <h3 className="font-heading text-sm font-extrabold text-text-secondary uppercase tracking-wider mb-4">
                  Opening Hours
                </h3>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center text-[14.5px]">
                    <span className="font-semibold text-text-secondary">Monday - Saturday</span>
                    <span className="font-bold text-text-primary">8:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center text-[14.5px]">
                    <span className="font-semibold text-text-secondary">Sunday</span>
                    <span className="font-bold text-accent bg-category-blue-bg px-2.5 py-0.5 rounded-sm">By Appointment</span>
                  </div>
                </div>
              </div>

              {/* Get in touch details */}
              <div>
                <h3 className="font-heading text-sm font-extrabold text-text-secondary uppercase tracking-wider mb-3">
                  Get In Touch
                </h3>
                <p className="text-[14.5px] text-text-secondary leading-relaxed">
                  Phone: <strong className="text-text-primary">{ghlCustomValues.practice_phone}</strong>
                  <br />
                  Email: <strong className="text-text-primary">{ghlCustomValues.doctor_email}</strong>
                </p>
              </div>
            </div>

            {/* Quick action button */}
            <a
              href="#booking"
              className="inline-flex items-center justify-center h-[48px] w-full text-[13.6px] font-bold text-white bg-accent hover:bg-accent-hover rounded-md transition-all duration-200 uppercase mt-8 shadow-sm active:scale-[0.98]"
            >
              Book My Consultation
            </a>
          </div>

          {/* Right Column: Google Maps Interactive Embed Card */}
          <div className="relative border border-black/5 rounded-xl overflow-hidden shadow-sm bg-slate-50 min-h-[350px] lg:min-h-full aspect-video lg:aspect-auto">
            <iframe
              src={mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full"
              title={`${ghlCustomValues.practice_name} Location Map`}
            />
          </div>

        </div>

      </div>
    </section>
  );
}
