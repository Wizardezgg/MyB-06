"use client";

import React from "react";
import { Workout } from "@/types/workout";
import { useWorkoutPlan } from "@/context/WorkoutPlanContext";
import { Plus, Bookmark, Check } from "lucide-react";

interface WorkoutDetailActionsProps {
  workout: Workout;
}

export const WorkoutDetailActions: React.FC<WorkoutDetailActionsProps> = ({ workout }) => {
  const { addToTodayPlan, saveWorkout, isInTodayPlan, isSaved } = useWorkoutPlan();

  const inPlan = isInTodayPlan(workout.id);
  const saved = isSaved(workout.id);

  return (
    <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-zinc-800/80">
      
      {/* Add To Plan Button */}
      <button
        type="button"
        onClick={() => addToTodayPlan(workout)}
        className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-display font-bold text-xs uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-[0_0_20px_rgba(204,255,0,0.25)] ${
          inPlan
            ? "bg-gym-accent text-black hover:bg-gym-accentHover"
            : "bg-gym-accent hover:bg-gym-accentHover text-black hover:scale-[1.02]"
        }`}
      >
        {inPlan ? <Check className="w-4 h-4 stroke-[3]" /> : <Plus className="w-4 h-4 stroke-[3]" />}
        <span>{inPlan ? "In Today's Plan" : "Add to today's plan"}</span>
      </button>

      {/* Save For Later Button */}
      <button
        type="button"
        onClick={() => saveWorkout(workout)}
        className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border font-display font-semibold text-xs uppercase tracking-wider transition-all duration-200 active:scale-95 ${
          saved
            ? "bg-zinc-800/80 border-amber-400/80 text-amber-400"
            : "bg-transparent border-zinc-700 hover:border-zinc-500 hover:bg-zinc-800/60 text-white"
        }`}
      >
        <Bookmark className={`w-4 h-4 ${saved ? "fill-current" : ""}`} />
        <span>{saved ? "Saved" : "Save for later"}</span>
      </button>

    </div>
  );
};
