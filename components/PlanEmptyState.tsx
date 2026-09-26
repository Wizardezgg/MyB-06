import React from "react";
import Link from "next/link";
import { Dumbbell, ArrowRight } from "lucide-react";

interface PlanEmptyStateProps {
  tab: "today" | "saved";
}

export const PlanEmptyState: React.FC<PlanEmptyStateProps> = ({ tab }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 rounded-3xl bg-[#14161E] border border-zinc-800/80 text-center my-6">
      
      {/* Icon */}
      <div className="w-14 h-14 rounded-2xl bg-zinc-800/60 border border-zinc-700/60 flex items-center justify-center text-zinc-400 mb-4">
        <Dumbbell className="w-7 h-7 text-gym-accent" />
      </div>

      {/* Heading & Subtitle */}
      <h3 className="font-display text-2xl font-extrabold uppercase tracking-wide text-white mb-2">
        NOTHING HERE YET
      </h3>

      <p className="text-sm text-zinc-400 font-sans max-w-sm leading-relaxed mb-6">
        {tab === "today"
          ? "Browse the library and add a lift to get today moving."
          : "You haven't saved any workouts for later yet."}
      </p>

      {/* CTA Button */}
      <Link
        href="/#library"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gym-accent hover:bg-gym-accentHover text-black font-display font-bold text-xs uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-[0_0_15px_rgba(204,255,0,0.2)]"
      >
        <span>Go to workouts</span>
        <ArrowRight className="w-4 h-4" />
      </Link>

    </div>
  );
};
