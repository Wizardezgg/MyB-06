import React from "react";
import Image from "next/image";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#0B0C0E] border-t border-zinc-900 py-8 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-2.5">
          <div className="relative w-5 h-5 flex items-center justify-center">
            <Image
              src="/assets/logo.png"
              alt="FitLog Logo"
              width={18}
              height={18}
              className="object-contain"
            />
          </div>
          <span className="font-display text-lg font-bold tracking-wider text-white">
            FITLOG
          </span>
        </div>

        {/* Copyright */}
        <p className="text-xs text-zinc-500 font-sans text-center sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
};
