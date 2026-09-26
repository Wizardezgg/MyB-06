import { HeroBanner } from "@/components/HeroBanner";
import { LibrarySection } from "@/components/LibrarySection";

export default function HomePage() {
  return (
    <div className="w-full bg-[#0B0C0E] text-zinc-100">
      <HeroBanner />
      <LibrarySection />
    </div>
  );
}
