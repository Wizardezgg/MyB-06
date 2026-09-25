import React from "react";
import Image from "next/image";

export const HeroBanner: React.FC = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      <div className="relative overflow-hidden rounded-[24px] md:rounded-[32px] bg-[#14161E] border border-zinc-800/80 px-6 py-10 sm:px-10 sm:py-14 md:px-14 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            <span className="text-gym-accent font-display text-xs md:text-sm font-bold uppercase tracking-widest mb-4">
              WORKOUT LIBRARY
            </span>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase text-white tracking-tight leading-[1.05] mb-6">
              TRAIN WITH INTENT. LOG<br />EVERY SET.
            </h1>

            <p className="text-zinc-400 font-sans text-sm sm:text-base max-w-md leading-relaxed mb-8">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            <a
              href="#library"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gym-accent hover:bg-gym-accentHover text-black font-display font-bold text-xs uppercase tracking-wider transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(204,255,0,0.25)]"
            >
              BROWSE WORKOUTS
            </a>
          </div>

          {/* Hero Visual */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md h-[280px] sm:h-[340px] md:h-[380px]">
              <Image
                src="/assets/banner.png"
                alt="FitLog Training Illustration"
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
