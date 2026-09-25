import { Workout } from "@/types/workout";

const API_BASE_URL = "https://api.abcz.workers.dev/api/fitlog";

// --- API Client ---
export async function fetchAllWorkouts(): Promise<Workout[]> {
  try {
    const res = await fetch(API_BASE_URL, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch workouts: ${res.statusText}`);
    }

    const data = await res.json();
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.data)) return data.data;
    if (data && Array.isArray(data.workouts)) return data.workouts;
    return [];
  } catch (error) {
    console.error("API error:", error);
    return [];
  }
}

export async function fetchWorkoutById(id: string | number): Promise<Workout | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch workout #${id}: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("API error:", error);
    return null;
  }
}
