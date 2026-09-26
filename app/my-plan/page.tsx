"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useWorkoutPlan } from "@/context/WorkoutPlanContext";
import { PlanMetrics } from "@/components/PlanMetrics";
import { PlanWorkoutCard } from "@/components/PlanWorkoutCard";
import { PlanEmptyState } from "@/components/PlanEmptyState";

function MyPlanContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") === "saved" ? "saved" : "today";
  const [activeTab, setActiveTab] = useState<"today" | "saved">(initialTab);

  const { todayPlan, savedWorkouts, isHydrated } = useWorkoutPlan();

  // --- URL Search Params Sync ---
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "saved") {
      setActiveTab("saved");
    } else {
      setActiveTab("today");
    }
  }, [searchParams]);

  const todayCount = isHydrated ? todayPlan.length : 0;
  const savedCount = isHydrated ? savedWorkouts.length : 0;

  const currentList = activeTab === "today" ? todayPlan : savedWorkouts;

  return (
    <div className="w-full min-h-[calc(100vh-8rem)] bg-[#0B0C0E] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold uppercase tracking-tight text-white mb-1">
            MY PLAN
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 font-sans">
            Track your scheduled workouts and saved exercises.
          </p>
        </div>

        {/* Metrics Summary Row */}
        <PlanMetrics />

        {/* Tabs */}
        <div className="flex items-center gap-2 border-b border-zinc-800 pb-3 mb-6">
          <button
            type="button"
            onClick={() => setActiveTab("today")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-display font-bold uppercase tracking-wider transition-all ${
              activeTab === "today"
                ? "bg-[#14161E] text-gym-accent border border-zinc-700 shadow-md"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
            }`}
          >
            <span>Today&apos;s Plan</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                activeTab === "today"
                  ? "bg-gym-accent text-black"
                  : "bg-zinc-800 text-zinc-300"
              }`}
            >
              {todayCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("saved")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-display font-bold uppercase tracking-wider transition-all ${
              activeTab === "saved"
                ? "bg-[#14161E] text-gym-accent border border-zinc-700 shadow-md"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
            }`}
          >
            <span>Saved</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                activeTab === "saved"
                  ? "bg-gym-accent text-black"
                  : "bg-zinc-800 text-zinc-300"
              }`}
            >
              {savedCount}
            </span>
          </button>
        </div>

        {/* List / Empty State */}
        {!isHydrated ? (
          <div className="py-12 text-center text-xs text-zinc-400 font-sans">
            Loading workouts…
          </div>
        ) : currentList.length === 0 ? (
          <PlanEmptyState tab={activeTab} />
        ) : (
          <div className="space-y-4">
            {currentList.map((workout) => (
              <PlanWorkoutCard
                key={`${activeTab}-${workout.id}`}
                workout={workout}
                tab={activeTab}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default function MyPlanPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto p-8 text-zinc-400">Loading workouts…</div>}>
      <MyPlanContent />
    </Suspense>
  );
}
