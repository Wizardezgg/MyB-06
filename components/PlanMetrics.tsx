"use client";

import React from "react";
import { useWorkoutPlan } from "@/context/WorkoutPlanContext";
import { Dumbbell, Clock, Flame } from "lucide-react";

export const PlanMetrics: React.FC = () => {
  const { todayPlanMetrics, isHydrated } = useWorkoutPlan();

  const exercises = isHydrated ? todayPlanMetrics.totalExercises : 0;
  const minutes = isHydrated ? todayPlanMetrics.totalMinutes : 0;
  const calories = isHydrated ? todayPlanMetrics.totalCalories : 0;

  const metrics = [
    {
      label: "Exercises",
      value: exercises,
      unit: "/ 5 max",
      icon: Dumbbell,
      highlight: true,
    },
    {
      label: "Minutes",
      value: minutes,
      unit: "min",
      icon: Clock,
      highlight: false,
    },
    {
      label: "Calories",
      value: calories,
      unit: "kcal",
      icon: Flame,
      highlight: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      {metrics.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.label}
            className="flex items-center justify-between p-5 rounded-2xl bg-[#14161E] border border-zinc-800/80 shadow-md"
          >
            {/* Metric Value & Label */}
            <div>
              <p className="text-xs uppercase tracking-wider text-zinc-400 font-display font-semibold mb-1">
                {item.label}
              </p>
              <div className="flex items-baseline gap-1.5">
                <span
                  className={`font-display text-3xl sm:text-4xl font-extrabold tracking-tight ${
                    item.highlight ? "text-gym-accent" : "text-white"
                  }`}
                >
                  {item.value}
                </span>
                <span className="text-xs font-sans text-zinc-500 font-medium">
                  {item.unit}
                </span>
              </div>
            </div>

            {/* Metric Icon */}
            <div className="w-10 h-10 rounded-xl bg-zinc-800/50 border border-zinc-700/50 flex items-center justify-center text-zinc-400">
              <Icon className="w-5 h-5 text-gym-accent" />
            </div>
          </div>
        );
      })}
    </div>
  );
};
