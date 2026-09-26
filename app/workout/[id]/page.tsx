import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchWorkoutById } from "@/lib/api";
import { ArrowLeft, Plus, Bookmark } from "lucide-react";

interface WorkoutDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function WorkoutDetailsPage({ params }: WorkoutDetailsPageProps) {
  const { id } = await params;
  const workout = await fetchWorkoutById(id);

  if (!workout) {
    notFound();
  }

  const specs = [
    { label: "EQUIPMENT", value: workout.equipment },
    { label: "DIFFICULTY", value: workout.difficulty },
    { label: "SETS", value: workout.sets },
    { label: "REPS", value: workout.reps },
    { label: "DURATION", value: `${workout.duration} min` },
    { label: "CALORIES", value: `${workout.caloriesBurned} kcal` },
    { label: "RATING", value: workout.rating.toFixed(1) },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      
      {/* Back Navigation */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-medium text-zinc-500 hover:text-black mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Workouts</span>
      </Link>

      {/* Main Details Grid */}
      <div className="rounded-[24px] md:rounded-[32px] bg-[#0E1015] border border-zinc-800/80 p-6 sm:p-8 md:p-12 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Visual */}
          <div className="lg:col-span-5 w-full">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-black/60 border border-zinc-800">
              <Image
                src={workout.image}
                alt={workout.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Column: Info & Specs */}
          <div className="lg:col-span-7 flex flex-col text-white">
            
            {/* Title & Description */}
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white mb-2">
              {workout.name}
            </h1>

            <p className="text-sm sm:text-base text-zinc-400 font-sans leading-relaxed mb-4">
              {workout.description}
            </p>

            {/* Category Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {workout.muscleGroups?.map((group) => (
                <span
                  key={group}
                  className="px-3 py-1 rounded-full text-xs font-display font-extrabold uppercase tracking-wider bg-gym-accent text-black"
                >
                  {group}
                </span>
              ))}
            </div>

            {/* Key Specs Table */}
            <div className="rounded-xl bg-[#14161E] border border-zinc-800/80 divide-y divide-zinc-800/80 mb-8">
              {specs.map((spec) => (
                <div key={spec.label} className="flex items-center justify-between px-5 py-3 text-xs sm:text-sm">
                  <span className="font-display uppercase tracking-wider text-zinc-400 font-bold text-xs">
                    {spec.label}
                  </span>
                  <span className="font-sans font-medium text-white">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Instructions */}
            <div className="mb-8">
              <h2 className="font-display text-lg font-bold uppercase tracking-wide text-white mb-3">
                INSTRUCTIONS
              </h2>
              <ol className="space-y-2 text-xs sm:text-sm text-zinc-400 font-sans list-none">
                {workout.instructions?.map((instruction, index) => (
                  <li key={index} className="flex gap-2.5">
                    <span className="text-zinc-500 font-semibold">{index + 1}.</span>
                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-zinc-800/80">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gym-accent hover:bg-gym-accentHover text-black font-display font-bold text-xs uppercase tracking-wider transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(204,255,0,0.25)]"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Add to today&apos;s plan</span>
              </button>

              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-transparent border border-zinc-700 hover:border-zinc-500 hover:bg-zinc-800/60 text-white font-display font-semibold text-xs uppercase tracking-wider transition-all duration-200 active:scale-95"
              >
                <Bookmark className="w-4 h-4" />
                <span>Save for later</span>
              </button>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
