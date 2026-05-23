import React from "react";

export default function StatsRow() {
  return (
    <section className="py-6 bg-bg-secondary border-t border-b border-black/8">
      <div className="w-full max-w-[1200px] mx-auto px-4 flex flex-col md:flex-row items-center justify-around gap-6 md:gap-4">
        {/* Stat Item 1 */}
        <div className="flex flex-col items-center text-center">
          <span className="font-heading text-4xl md:text-[2.2rem] font-extrabold text-accent leading-none">
            15+
          </span>
          <span className="text-sm font-semibold tracking-wider uppercase text-text-secondary mt-1">
            Years Experience
          </span>
        </div>

        {/* Divider 1 */}
        <div className="hidden md:block w-[1px] h-10 bg-black/8" />

        {/* Stat Item 2 */}
        <div className="flex flex-col items-center text-center">
          <span className="font-heading text-4xl md:text-[2.2rem] font-extrabold text-accent leading-none">
            10k+
          </span>
          <span className="text-sm font-semibold tracking-wider uppercase text-text-secondary mt-1">
            Smiles Restored
          </span>
        </div>

        {/* Divider 2 */}
        <div className="hidden md:block w-[1px] h-10 bg-black/8" />

        {/* Stat Item 3 */}
        <div className="flex flex-col items-center text-center">
          <span className="font-heading text-4xl md:text-[2.2rem] font-extrabold text-accent leading-none">
            0%
          </span>
          <span className="text-sm font-semibold tracking-wider uppercase text-text-secondary mt-1">
            Pain Guarantee
          </span>
        </div>
      </div>
    </section>
  );
}
