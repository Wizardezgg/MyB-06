"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Workout } from "@/types/workout";
import { fetchAllWorkouts } from "@/lib/api";
import { WorkoutCard } from "@/components/WorkoutCard";
import { ChevronDown } from "lucide-react";

type SortField = "duration" | "caloriesBurned" | "rating";

export const LibrarySection: React.FC = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortField>("duration");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // --- Data Fetching ---
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await fetchAllWorkouts();
      setWorkouts(data);
      setLoading(false);
    }
    loadData();
  }, []);

  // --- Sorting Logic ---
  const sortedWorkouts = useMemo(() => {
    return [...workouts].sort((a, b) => {
      if (sortBy === "duration") return a.duration - b.duration;
      if (sortBy === "caloriesBurned") return b.caloriesBurned - a.caloriesBurned;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });
  }, [workouts, sortBy]);

  const sortLabels: Record<SortField, string> = {
    duration: "Duration",
    caloriesBurned: "Calories",
    rating: "Rating",
  };

  return (
    <section id="library" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      
      {/* Section Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
            THE LIBRARY
          </h2>
          <p className="mt-1 text-sm text-zinc-400 font-sans">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#14161E] border border-zinc-800 text-xs font-medium text-zinc-200 hover:border-zinc-700 transition-all"
          >
            <span className="text-zinc-400">Sort By:</span>
            <span className="font-semibold text-white">{sortLabels[sortBy]}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-36 rounded-lg bg-[#14161E] border border-zinc-800 shadow-xl py-1 z-20">
              {(["duration", "caloriesBurned", "rating"] as SortField[]).map((field) => (
                <button
                  key={field}
                  onClick={() => {
                    setSortBy(field);
                    setDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 text-xs transition-colors ${
                    sortBy === field
                      ? "text-gym-accent font-semibold bg-[#182313]"
                      : "text-zinc-300 hover:bg-zinc-800/60 hover:text-white"
                  }`}
                >
                  {sortLabels[field]}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Loading Skeleton */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl bg-[#14161E] border border-zinc-800/80 p-4 space-y-4 animate-pulse"
            >
              <div className="aspect-[16/10] w-full rounded-xl bg-zinc-800/60" />
              <div className="h-4 w-1/3 rounded bg-zinc-800" />
              <div className="h-5 w-2/3 rounded bg-zinc-800" />
              <div className="h-3 w-1/2 rounded bg-zinc-800/60" />
              <div className="h-px bg-zinc-800" />
              <div className="flex justify-between">
                <div className="h-3 w-12 rounded bg-zinc-800" />
                <div className="h-3 w-12 rounded bg-zinc-800" />
                <div className="h-3 w-12 rounded bg-zinc-800" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Workout Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedWorkouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}

    </section>
  );
};
