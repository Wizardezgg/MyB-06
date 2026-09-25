"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { Workout } from "@/types/workout";

interface WorkoutPlanContextType {
  todayPlan: Workout[];
  savedWorkouts: Workout[];
  completedWorkoutIds: number[];
  isHydrated: boolean;
  addToTodayPlan: (workout: Workout) => boolean;
  removeFromTodayPlan: (workoutId: number) => void;
  saveWorkout: (workout: Workout) => boolean;
  removeFromSaved: (workoutId: number) => void;
  toggleMarkAsDone: (workoutId: number) => void;
  isWorkoutDone: (workoutId: number) => boolean;
  isInTodayPlan: (workoutId: number) => boolean;
  isSaved: (workoutId: number) => boolean;
  todayPlanMetrics: {
    totalExercises: number;
    totalMinutes: number;
    totalCalories: number;
  };
}

const WorkoutPlanContext = createContext<WorkoutPlanContextType | undefined>(undefined);

export const MAX_PLAN_LIFTS = 5;

export const WorkoutPlanProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todayPlan, setTodayPlan] = useState<Workout[]>([]);
  const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>([]);
  const [completedWorkoutIds, setCompletedWorkoutIds] = useState<number[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // --- LocalStorage Hydration ---
  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem("fitlog_today_plan");
      const storedSaved = localStorage.getItem("fitlog_saved");
      const storedCompleted = localStorage.getItem("fitlog_completed");

      if (storedPlan) setTodayPlan(JSON.parse(storedPlan));
      if (storedSaved) setSavedWorkouts(JSON.parse(storedSaved));
      if (storedCompleted) setCompletedWorkoutIds(JSON.parse(storedCompleted));
    } catch (e) {
      console.error("Error reading localStorage", e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // --- LocalStorage Sync ---
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem("fitlog_today_plan", JSON.stringify(todayPlan));
    } catch (e) {
      console.error("Error saving plan to localStorage", e);
    }
  }, [todayPlan, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem("fitlog_saved", JSON.stringify(savedWorkouts));
    } catch (e) {
      console.error("Error saving saved list to localStorage", e);
    }
  }, [savedWorkouts, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem("fitlog_completed", JSON.stringify(completedWorkoutIds));
    } catch (e) {
      console.error("Error saving completed list to localStorage", e);
    }
  }, [completedWorkoutIds, isHydrated]);

  // --- Status Checks ---
  const isInTodayPlan = (workoutId: number) => todayPlan.some((w) => w.id === workoutId);
  const isSaved = (workoutId: number) => savedWorkouts.some((w) => w.id === workoutId);
  const isWorkoutDone = (workoutId: number) => completedWorkoutIds.includes(workoutId);

  // --- Plan Actions ---
  const addToTodayPlan = (workout: Workout): boolean => {
    if (isInTodayPlan(workout.id)) return false;
    if (todayPlan.length >= MAX_PLAN_LIFTS) return false;
    setTodayPlan((prev) => [...prev, workout]);
    return true;
  };

  const removeFromTodayPlan = (workoutId: number) => {
    setTodayPlan((prev) => prev.filter((w) => w.id !== workoutId));
    setCompletedWorkoutIds((prev) => prev.filter((id) => id !== workoutId));
  };

  const saveWorkout = (workout: Workout): boolean => {
    if (isSaved(workout.id)) return false;
    setSavedWorkouts((prev) => [...prev, workout]);
    return true;
  };

  const removeFromSaved = (workoutId: number) => {
    setSavedWorkouts((prev) => prev.filter((w) => w.id !== workoutId));
  };

  const toggleMarkAsDone = (workoutId: number) => {
    if (completedWorkoutIds.includes(workoutId)) {
      setCompletedWorkoutIds((prev) => prev.filter((id) => id !== workoutId));
    } else {
      setCompletedWorkoutIds((prev) => [...prev, workoutId]);
    }
  };

  // --- Metrics ---
  const todayPlanMetrics = useMemo(() => {
    const totalExercises = todayPlan.length;
    const totalMinutes = todayPlan.reduce((acc, curr) => acc + (Number(curr.duration) || 0), 0);
    const totalCalories = todayPlan.reduce((acc, curr) => acc + (Number(curr.caloriesBurned) || 0), 0);
    return { totalExercises, totalMinutes, totalCalories };
  }, [todayPlan]);

  return (
    <WorkoutPlanContext.Provider
      value={{
        todayPlan,
        savedWorkouts,
        completedWorkoutIds,
        isHydrated,
        addToTodayPlan,
        removeFromTodayPlan,
        saveWorkout,
        removeFromSaved,
        toggleMarkAsDone,
        isWorkoutDone,
        isInTodayPlan,
        isSaved,
        todayPlanMetrics,
      }}
    >
      {children}
    </WorkoutPlanContext.Provider>
  );
};

export const useWorkoutPlan = () => {
  const context = useContext(WorkoutPlanContext);
  if (!context) {
    throw new Error("useWorkoutPlan must be used within a WorkoutPlanProvider");
  }
  return context;
};
