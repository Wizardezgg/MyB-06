"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useWorkoutPlan } from "@/context/WorkoutPlanContext";
import { PlanMetrics } from "@/components/PlanMetrics";

function MyPlanContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") === "saved" ? "saved" : "today";
  const [activeTab, setActiveTab] = useState<"today" | "saved">(initialTab);

  const { todayPlan, savedWorkouts, isHydrated } = useWorkoutPlan();

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "saved") {
      setActiveTab("saved");
    } else if (tabParam === "today") {
      setActiveTab("today");
    }
  }, [searchParams]);

  const todayCount = isHydrated ? todayPlan.length : 0;
  const savedCount = isHydrated ? savedWorkouts.length : 0;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold uppercase tracking-tight text-zinc-950 mb-1">
          MY PLAN
        </h1>
        <p className="text-sm sm:text-base text-zinc-500 font-sans">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* Metrics Summary Row */}
      <PlanMetrics />

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-200 pb-3 mb-8">
        <button
          onClick={() => setActiveTab("today")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-display font-bold uppercase tracking-wider transition-all ${
            activeTab === "today"
              ? "bg-[#14161E] text-gym-accent shadow-md"
              : "text-zinc-600 hover:text-black hover:bg-zinc-100"
          }`}
        >
          <span>Today&apos;s Plan</span>
          <span
            className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
              activeTab === "today"
                ? "bg-gym-accent text-black"
                : "bg-zinc-200 text-zinc-700"
            }`}
          >
            {todayCount}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("saved")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-display font-bold uppercase tracking-wider transition-all ${
            activeTab === "saved"
              ? "bg-[#14161E] text-gym-accent shadow-md"
              : "text-zinc-600 hover:text-black hover:bg-zinc-100"
          }`}
        >
          <span>Saved</span>
          <span
            className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
              activeTab === "saved"
                ? "bg-zinc-800 text-zinc-200 border border-zinc-700"
                : "bg-zinc-200 text-zinc-700"
            }`}
          >
            {savedCount}
          </span>
        </button>
      </div>

      {/* Tab Content Placeholder */}
      <div className="py-6 text-center text-xs text-zinc-400 font-sans">
        {activeTab === "today" ? (
          <p>{todayCount} exercise{todayCount === 1 ? "" : "s"} loaded in today&apos;s plan</p>
        ) : (
          <p>{savedCount} exercise{savedCount === 1 ? "" : "s"} saved for later</p>
        )}
      </div>

    </div>
  );
}

export default function MyPlanPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto p-8 text-zinc-400">Loading plan...</div>}>
      <MyPlanContent />
    </Suspense>
  );
}
