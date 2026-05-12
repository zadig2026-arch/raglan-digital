import { AppleStickyShowcase, AppleCta } from "@/components/axes/apple";
import { WorkHero } from "@/components/home/work-hero";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { AboutTeaser } from "@/components/home/about-teaser";
import { ProcessTimeline } from "@/components/process-timeline";

export default function Home() {
  return (
    <>
      <WorkHero />
      <FeaturedProjects />
      <AppleStickyShowcase />
      <AboutTeaser />
      <ProcessTimeline />
      <AppleCta />
    </>
  );
}
