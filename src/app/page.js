import Hero from "@/components/Hero";
import StatsSection from "@/components/StatsSection";
import WhyJoinSection from "@/components/WhyJoinSection";

export default function Home() {
  return (
    <div className="bg-zinc-50 font-sans dark:bg-black">
      <Hero />
      <StatsSection />
      <WhyJoinSection />
    </div>
  );
}
