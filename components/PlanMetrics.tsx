"use client";

import React from "react";
import { useWorkoutPlan } from "@/context/WorkoutPlanContext";

export const PlanMetrics: React.FC = () => {
  const { todayPlanMetrics, isHydrated } = useWorkoutPlan();

  const exercises = isHydrated ? todayPlanMetrics.totalExercises : 0;
  const minutes = isHydrated ? todayPlanMetrics.totalMinutes : 0;
  const calories = isHydrated ? todayPlanMetrics.totalCalories : 0;

  const metrics = [
    {
      label: "Exercises",
      value: exercises,
      highlight: true,
    },
    {
      label: "Minutes",
      value: minutes,
      highlight: false,
    },
    {
      label: "Calories",
      value: calories,
      highlight: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      {metrics.map((item) => (
        <div
          key={item.label}
          className="p-5 sm:p-6 rounded-2xl bg-[#14161E] border border-zinc-800/80 shadow-md"
        >
          {/* Label */}
          <p className="text-xs uppercase tracking-wider text-zinc-400 font-display font-bold mb-2">
            {item.label}
          </p>

          {/* Value */}
          <span
            className={`font-display text-4xl sm:text-5xl font-extrabold tracking-tight ${
              item.highlight ? "text-gym-accent" : "text-white"
            }`}
          >
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
};
