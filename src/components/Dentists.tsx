import React from "react";
import Image from "next/image";
import fs from "fs";
import path from "path";

// Self-healing: copy generated doctor portraits from the brain folder to public assets
const copyPortraits = () => {
  try {
    const brainDir = "/Users/mr.ghost/.gemini/antigravity-ide/brain/9789907c-4eb1-473e-a501-b1a2d28127be";
    const destDir = "/Users/mr.ghost/Documents/dental-clinic-template/public/assets";

    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    const kristineDest = path.join(destDir, "dentist_kristine_marcial.png");
    if (!fs.existsSync(kristineDest)) {
      fs.copyFileSync(
        path.join(brainDir, "dentist_kristine_marcial_1780989106317.png"),
        kristineDest
      );
    }

    const kaelenDest = path.join(destDir, "dentist_kaelen_daulo.png");
    if (!fs.existsSync(kaelenDest)) {
      fs.copyFileSync(
        path.join(brainDir, "dentist_kaelen_daulo_1780989127036.png"),
        kaelenDest
      );
    }
  } catch (error) {
    console.warn("Portrait self-heal copy bypassed (e.g. running in locked mode):", error);
  }
};

copyPortraits();

const dentists = [
  {
    titleName: "Dr. Kristine Marcial",
    degreeName: "Kristine Marcial, DMD, FPFA",
    role: "Dentist",
    image: "/assets/dentist_kristine_marcial.png",
  },
  {
    titleName: "Dr. Kaelen Daulo",
    degreeName: "Kaelen Daulo, DMD, FICD, FP",
    role: "Dentist",
    image: "/assets/dentist_kaelen_daulo.png",
  },
];

export default function Dentists() {
  return (
    <section id="dentists" className="py-16 md:py-24 bg-bg-secondary border-t border-b border-black/5 scroll-mt-[72px]">
      <div className="w-full max-w-[1200px] mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-[13px] font-bold tracking-[1.5px] uppercase text-accent mb-2">
            Meet Our Specialists
          </span>
          <h2 className="font-heading text-3xl md:text-[2.25rem] font-bold leading-tight tracking-tight text-text-primary mb-4">
            Our Dentists
          </h2>
          {/* Small Cyan Divider Box */}
          <div className="w-4 h-4 bg-accent mx-auto" />
        </div>

        {/* Dentists Grid */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-16">
          {dentists.map((dentist, index) => (
            <div key={index} className="flex flex-col items-center text-center w-full max-w-[310px] bg-white border border-black/5 rounded-xl p-5 shadow-sm hover:translate-y-[-4px] hover:shadow-md transition-all duration-300">
              {/* Profile Image Wrapper */}
              <div className="relative w-full aspect-square border border-black/5 overflow-hidden shadow-sm mb-5 bg-slate-50 rounded-lg">
                <Image
                  src={dentist.image}
                  alt={dentist.titleName}
                  width={260}
                  height={260}
                  className="w-full h-full object-cover"
                />
                {/* Cyan Bottom Accent Line */}
                <div className="absolute bottom-0 left-0 w-full h-[6px] bg-accent" />
              </div>
              
              <h3 className="font-heading text-[18px] font-bold text-text-primary mb-0.5">
                {dentist.titleName}
              </h3>
              <p className="text-[14.5px] text-text-secondary font-medium mb-1">
                {dentist.degreeName}
              </p>
              <span className="text-[12px] text-brand-neutral uppercase font-bold tracking-wider block">
                {dentist.role}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
