import { Suspense, lazy } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";

// Lazy load heavy components
const ProjectShowcase = lazy(() => import("@/components/ProjectShowcase"));
const BlogSection = lazy(() => import("@/components/BlogSection"));
const YouTubeSectionWrapper = lazy(() => import("@/components/YouTubeSectionWrapper"));
const SpeakerGallery = lazy(() => import("@/components/SpeakerGallery"));
const CareerTimeline = lazy(() => import("@/components/CareerTimeline"));
const ContactForm = lazy(() => import("@/components/ContactForm"));
const MediaSection = lazy(() => import("@/components/MediaSection"));
const TweetsSection = lazy(() => import("@/components/TweetSection"));
// import PoapSection from "@/components/PoapSection";

// Loading fallback component
const LoadingFallback = ({ sectionName }) => (
  <div className="min-h-[400px] flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#AEEA00] mx-auto mb-4"></div>
      <p className="text-[#AEEA00] font-mono">Loading {sectionName}...</p>
    </div>
  </div>
);

export default function Home() {
  const tweetLinks = [
    "https://twitter.com/pranshurastogii/status/1896185004666814791",
    "https://twitter.com/pranshurastogii/status/1912881709705748722",
    "https://twitter.com/pranshurastogii/status/1833831369333469401",
    "https://twitter.com/ETHCluj/status/1902331148891553879",
    "https://twitter.com/pranshurastogii/status/1705287298101698736",
    "https://twitter.com/pranshurastogii/status/1894254871517511902",
    "https://twitter.com/pranshurastogii/status/1660440193499901953"
  ];
  
  return (
    <>
      <Header />
      <Hero />
      
      <section id="career">
        <Suspense fallback={<LoadingFallback sectionName="Career Timeline" />}>
          <CareerTimeline />
        </Suspense>
      </section>
      
      <section id="blog">
        <Suspense fallback={<LoadingFallback sectionName="Blog" />}>
          <BlogSection />
        </Suspense>
      </section>
      
      <section id="projects">
        <Suspense fallback={<LoadingFallback sectionName="Projects" />}>
          <ProjectShowcase />
        </Suspense>
      </section>
      
      <section id="gallery">
        <Suspense fallback={<LoadingFallback sectionName="Speaker Gallery" />}>
          <SpeakerGallery/>
        </Suspense>
      </section>
      
      <section id="youtube">
        <Suspense fallback={<LoadingFallback sectionName="YouTube Content" />}>
          <YouTubeSectionWrapper />
        </Suspense>
      </section>
      
      <section id="featured">
        <Suspense fallback={<LoadingFallback sectionName="Media" />}>
          <MediaSection/>
        </Suspense>
      </section>
      
      <section id="tweets">
        <Suspense fallback={<LoadingFallback sectionName="Tweets" />}>
          <TweetsSection tweets={tweetLinks} limit={6} />
        </Suspense>
      </section>
      
      {/* <PoapSection/> */}
      {/* future sections */}
    </>
  );
}
