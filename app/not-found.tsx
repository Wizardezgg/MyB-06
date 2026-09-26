import React from "react";
import Link from "next/link";
import { ArrowLeft, Dumbbell } from "lucide-react";

export default function NotFound() {
  return (
    <div className="w-full min-h-[calc(100vh-8rem)] bg-[#0B0C0E] text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center py-16">
        
        {/* Visual Icon */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[#14161E] border border-zinc-800 flex items-center justify-center text-gym-accent shadow-xl">
          <Dumbbell className="w-10 h-10" />
        </div>

        {/* 404 Header */}
        <span className="font-display text-7xl font-extrabold tracking-tight text-gym-accent block mb-2">
          404
        </span>

        {/* Title & Description */}
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white mb-3">
          Lost In The Gym?
        </h1>
        <p className="text-sm text-zinc-400 font-sans mb-8">
          The workout or page you are looking for doesn&apos;t exist or was relocated.
        </p>

        {/* Return CTA */}
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gym-accent hover:bg-gym-accentHover text-black font-display font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-[0_0_20px_rgba(204,255,0,0.25)]"
        >
          <ArrowLeft className="w-4 h-4 stroke-[3]" />
          <span>Back to Workouts</span>
        </Link>

      </div>
    </div>
  );
}
