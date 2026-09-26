"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Workout } from "@/types/workout";
import { useWorkoutPlan } from "@/context/WorkoutPlanContext";
import { Clock, Flame, Star, Check, X, ArrowUpRight } from "lucide-react";

interface PlanWorkoutCardProps {
  workout: Workout;
  tab: "today" | "saved";
}

const FALLBACK_IMAGE = "https://img.magnific.com/free-photo/portrait-anime-character-doing-fitness-exercising_23-2151666664.jpg?w=740";

export const PlanWorkoutCard: React.FC<PlanWorkoutCardProps> = ({ workout, tab }) => {
  const {
    removeFromTodayPlan,
    removeFromSaved,
    toggleMarkAsDone,
    isWorkoutDone,
    addToTodayPlan,
    isInTodayPlan,
  } = useWorkoutPlan();

  const isDone = isWorkoutDone(workout.id);
  const inToday = isInTodayPlan(workout.id);

  return (
    <div
      className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-5 rounded-2xl bg-[#14161E] border transition-all duration-200 gap-4 ${
        isDone
          ? "border-emerald-500/50 bg-[#14161E]/80 shadow-[0_0_15px_rgba(34,197,94,0.1)]"
          : "border-zinc-800/80 hover:border-zinc-700"
      }`}
    >
      {/* Left Info: Thumbnail, Title, Equipment, Stats */}
      <div className="flex items-center gap-4 w-full sm:w-auto">
        
        {/* Thumbnail */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-black/50 shrink-0 border border-zinc-800">
          <Image
            src={workout.image || FALLBACK_IMAGE}
            alt={workout.name}
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>

        {/* Details & Stats */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4
              className={`font-display text-base sm:text-lg font-extrabold uppercase tracking-wide truncate ${
                isDone ? "line-through text-zinc-400" : "text-white"
              }`}
            >
              {workout.name}
            </h4>
            {isDone && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-display font-bold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Done
              </span>
            )}
          </div>

          <p className="text-xs text-zinc-400 font-sans truncate mb-2">
            {workout.equipment}
          </p>

          {/* Stats Row */}
          <div className="flex items-center gap-3 text-xs text-zinc-400 font-sans">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-zinc-500" />
              <span>{workout.duration}m</span>
            </div>
            <div className="flex items-center gap-1">
              <Flame className="w-3 h-3 text-zinc-500" />
              <span>{workout.caloriesBurned} kcal</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-zinc-500" />
              <span>{workout.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Right Actions: View Details, Mark as Done, Remove */}
      <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-3 sm:pt-0 border-t sm:border-t-0 border-zinc-800/80">
        
        {/* View Details Button */}
        <Link
          href={`/workout/${workout.id}`}
          className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 text-xs font-display font-semibold uppercase tracking-wider transition-colors"
        >
          <span>Details</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>

        {/* Move to Plan (for Saved tab) */}
        {tab === "saved" && !inToday && (
          <button
            type="button"
            onClick={() => addToTodayPlan(workout)}
            className="px-3 py-2 rounded-lg bg-gym-accent hover:bg-gym-accentHover text-black text-xs font-display font-bold uppercase tracking-wider transition-all"
          >
            Add to Plan
          </button>
        )}

        {/* Mark As Done Button (Today's Plan) */}
        {tab === "today" && (
          <button
            type="button"
            onClick={() => toggleMarkAsDone(workout.id)}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-display font-bold uppercase tracking-wider transition-all ${
              isDone
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30"
                : "bg-zinc-800 hover:bg-zinc-700 text-zinc-200"
            }`}
          >
            <Check className="w-3.5 h-3.5 stroke-[3]" />
            <span>{isDone ? "Done" : "Mark as Done"}</span>
          </button>
        )}

        {/* Remove Button */}
        <button
          type="button"
          onClick={() => {
            if (tab === "today") removeFromTodayPlan(workout.id);
            else removeFromSaved(workout.id);
          }}
          title="Remove workout"
          className="p-2 rounded-lg text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

      </div>

    </div>
  );
};
