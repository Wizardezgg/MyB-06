import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Workout } from "@/types/workout";
import { Clock, Flame, Star } from "lucide-react";

interface WorkoutCardProps {
  workout: Workout;
}

// --- Fallback Image ---
const FALLBACK_IMAGE = "https://img.magnific.com/free-photo/portrait-anime-character-doing-fitness-exercising_23-2151666664.jpg?w=740";

export const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout }) => {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group flex flex-col rounded-2xl bg-[#14161E] border border-zinc-800 overflow-hidden transition-all duration-300 hover:border-zinc-700 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Card Visual */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/60">
        <Image
          src={workout.image || FALLBACK_IMAGE}
          alt={workout.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {/* Category Tags */}
        <div className="flex flex-wrap gap-1.5 mb-2.5">
          {workout.muscleGroups?.map((group) => (
            <span
              key={group}
              className="px-2.5 py-0.5 rounded-full text-[10px] font-display font-extrabold uppercase tracking-wider bg-gym-accent text-black"
            >
              {group}
            </span>
          ))}
        </div>

        {/* Title & Equipment */}
        <h3 className="font-display text-base sm:text-lg font-extrabold uppercase tracking-wide text-white group-hover:text-gym-accent transition-colors line-clamp-1">
          {workout.name}
        </h3>

        <p className="mt-0.5 text-xs text-zinc-400 font-sans truncate">
          {workout.equipment}
        </p>

        {/* Stats Row */}
        <div className="mt-5 pt-3.5 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400 font-sans">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-zinc-500" />
            <span>{workout.duration} min</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-zinc-500 fill-zinc-500" />
            <span>{workout.caloriesBurned} kcal</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-zinc-500" />
            <span>{workout.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
