import { HeroBanner } from "@/components/HeroBanner";
import { LibrarySection } from "@/components/LibrarySection";

export default function HomePage() {
  return (
    <div className="w-full">
      <HeroBanner />
      <LibrarySection />
    </div>
  );
}
