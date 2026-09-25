# FitLog — Train With Intent. Log Every Set.

A no-nonsense gym companion application built with Next.js App Router and Tailwind CSS. Pick your lifts, lock them into today's plan, track real-time training volume, and crush your fitness goals.

---

## Live Links

- Live Demo:
- GitHub Repository:

---

## Project Overview

FitLog is built for lifters who prioritize intensity, discipline, and efficiency. Featuring a clean, modern dark gym aesthetic and bold athletic typography, FitLog empowers users to explore a comprehensive exercise library, inspect key specs and step-by-step instructions, craft a focused 5-lift daily workout plan, save lifts for later, and monitor their training session metrics live.

---

## Technologies Used

| Technology              | Purpose                                                                           |
| ----------------------- | --------------------------------------------------------------------------------- |
| Next.js 15 (App Router) | React framework for server and client components, routing, and image optimization |
| React 19                | Core user interface library with modern hooks and state management                |
| Tailwind CSS            | Utility-first CSS framework for responsive styling                                |
| TypeScript              | Type safety, enhanced developer experience, and robust data modeling              |
| Sonner                  | Toast notifications for user interactions                                         |

---

## Key Features

### 1. Dynamic Workout Library and Live API Integration

- Real-time workout library powered by the remote FitLog REST API: https://api.abcz.workers.dev/api/fitlog
- Rendered in a clean 3x4 responsive grid on desktop screens with animated loading skeleton states.
- Each exercise card displays high-resolution thumbnails, difficulty badges, muscle group tags, equipment details, and quick stat badges for duration, calories, and rating.

### 2. Advanced Sorting and Filtering (Challenge Requirement C1)

- Interactive Sort By dropdown allowing users to re-order workouts by:
  - Duration (default)
  - Calories Burned
  - Rating
- Instant client-side search and muscle group category pills (Chest, Back, Legs, Arms, Core, Full Body, Shoulders) to quickly locate any exercise.

### 3. Comprehensive Workout Details View

- Dynamic two-column layout (/workout/:id) highlighting:
  - Full-size workout illustration and difficulty indicators.
  - Key Specs Table: Equipment, Difficulty, Sets, Reps, Duration, Calories Burned, and Rating.
  - Step-by-Step Instructions: Clean numbered guide explaining proper biomechanics and exercise form.
  - Direct action triggers to add to today's plan or save for later.

### 4. Smart Daily Plan with 5-Lift Cap

- Curate a focused daily routine adhering to the 5-lift maximum cap.
- Real-time navbar pill counters (Plan filled pill, Saved outline pill) that automatically sync across all pages.
- Action validation with descriptive toast alerts informing the user when the daily limit has been reached.

### 5. Real-Time Metrics Summary and Interactive Logging (Challenge Requirement C3)

- Dedicated /my-plan view displaying a 3-card live metrics dashboard:
  - Total Exercises planned
  - Total Training Minutes
  - Total Estimated Calories Burned
- Mark as Done: Toggle completed status with visual feedback and toast notifications.
- Remove Workout: Instantly purge lifts from the plan or saved list with live metric recalculation.
- Seamless tab switching between Today's Plan and Saved Workouts, complete with empty states.

### 6. Reliable LocalStorage Persistence

- All user plans, saved items, and completion states are automatically persisted to the browser's localStorage.
- Safely rehydrated on page load without hydration flicker or data loss.

### 7. Fully Responsive and Custom 404

- Pixel-perfect experience across mobile, tablet, and widescreen desktop displays.
- Custom branded 404 page for non-existent routes.

---

## API Reference

- Get All Workouts: https://api.abcz.workers.dev/api/fitlog
- Get Single Workout: https://api.abcz.workers.dev/api/fitlog/:id

---
