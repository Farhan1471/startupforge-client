import Hero from "@/components/Hero";
import StatsSection from "@/components/StatsSection";
import WhyJoinSection from "@/components/WhyJoinSection";
import FeaturedStartupsSection from "@/components/FeaturedStartupsSection";
import FeaturedOpportunitiesSection from "@/components/FeaturedOpportunitiesSection";

export default function Home() {
  return (
    <div className="bg-zinc-50 font-sans dark:bg-black">
      <Hero />
      <StatsSection />
      <FeaturedStartupsSection />
      <FeaturedOpportunitiesSection />
      <WhyJoinSection />
    </div>
  );
}
