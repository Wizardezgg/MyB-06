import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchWorkoutById } from "@/lib/api";
import { WorkoutDetailActions } from "@/components/WorkoutDetailActions";
import { ArrowLeft } from "lucide-react";

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
    <div className="w-full min-h-[calc(100vh-8rem)] bg-[#0B0C0E] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        
        {/* Back Navigation */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Workouts</span>
        </Link>

        {/* Main Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Visual */}
          <div className="lg:col-span-6 w-full flex flex-col">
            <div className="relative w-full aspect-[4/5] lg:aspect-auto lg:h-full min-h-[480px] sm:min-h-[560px] lg:min-h-[640px] rounded-2xl md:rounded-3xl overflow-hidden bg-[#14161E] border border-zinc-800 shadow-2xl">
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
          <div className="lg:col-span-6 flex flex-col justify-between text-white">
            
            <div>
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
              <div className="rounded-xl bg-[#14161E] border border-zinc-800/80 divide-y divide-zinc-800/80 mb-6">
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
              <div className="mb-6">
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
            </div>

            {/* Action Buttons */}
            <WorkoutDetailActions workout={workout} />

          </div>

        </div>

      </div>
    </div>
  );
}
