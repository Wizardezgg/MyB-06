import { Workout } from "@/types/workout";

const PRIMARY_API_URL = "https://api.api-store.workers.dev/api/fitlog";
const FALLBACK_API_URL = "https://api.abcz.workers.dev/api/fitlog";

// --- API Client ---
export async function fetchAllWorkouts(): Promise<Workout[]> {
  for (const url of [PRIMARY_API_URL, FALLBACK_API_URL]) {
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) return data;
        if (data && Array.isArray(data.data)) return data.data;
        if (data && Array.isArray(data.workouts)) return data.workouts;
      }
    } catch {
      // Try next URL
    }
  }
  return [];
}

export async function fetchWorkoutById(id: string | number): Promise<Workout | null> {
  for (const baseUrl of [PRIMARY_API_URL, FALLBACK_API_URL]) {
    try {
      const res = await fetch(`${baseUrl}/${id}`, { cache: "no-store" });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Try next URL
    }
  }
  return null;
}
