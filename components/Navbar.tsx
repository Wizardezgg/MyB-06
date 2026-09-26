"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useWorkoutPlan } from "@/context/WorkoutPlanContext";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { todayPlan, savedWorkouts, isHydrated } = useWorkoutPlan();

  const isWorkoutsActive = pathname === "/" || pathname.startsWith("/workout");
  const isMyPlanActive = pathname === "/my-plan";

  const planCount = isHydrated ? todayPlan.length : 0;
  const savedCount = isHydrated ? savedWorkouts.length : 0;

  return (
    <header className="w-full bg-[#0B0C0E] border-b border-zinc-900 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-6 h-6 flex items-center justify-center">
            <Image
              src="/assets/logo.png"
              alt="FitLog Logo"
              width={22}
              height={22}
              className="object-contain"
            />
          </div>
          <span className="font-display text-xl font-bold tracking-wider text-white">
            FITLOG
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-3">
          <Link
            href="/"
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              isWorkoutsActive
                ? "bg-[#182313] text-gym-accent font-semibold"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              isMyPlanActive
                ? "bg-[#182313] text-gym-accent font-semibold"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* Status Counters */}
        <div className="flex items-center gap-4 text-xs font-medium">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors"
          >
            <span>Plan</span>
            <span className="w-5 h-5 rounded-full bg-gym-accent text-black font-bold text-[11px] flex items-center justify-center">
              {planCount}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors"
          >
            <span>Saved</span>
            <span className="w-5 h-5 rounded-full border border-zinc-600 text-zinc-300 text-[11px] font-semibold flex items-center justify-center">
              {savedCount}
            </span>
          </Link>
        </div>

      </div>
    </header>
  );
};
