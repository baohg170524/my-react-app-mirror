import { Navbar } from "@/components/Navbar";
import { UserProfileHeader } from "@/features/user/components/UserProfileHeader";
import { AnnouncementBanner } from "@/features/user/components/AnnouncementBanner";
import { ProjectSummaryCard } from "@/features/user/components/ProjectSummaryCard";
import { EventSection } from "@/features/events/components/EventSection";

export default function HomePage() {
  return (
    <>
      <Navbar />
      {/* tabIndex=-1 allows programmatic focus on route change (a11y) */}
      <main tabIndex={-1} style={{ outline: "none", minHeight: "100vh" }}>
        <UserProfileHeader />
        <AnnouncementBanner />
        <EventSection />
      </main>
    </>
  );
}
