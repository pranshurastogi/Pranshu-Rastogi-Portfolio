import { Suspense, lazy } from "react";
import Header from "@/components/layout/Header";
import Hero from "@/components/hero/Hero";
import tweetsData from "@/data/tweets.json";

// Lazy load heavy components
const ProjectShowcase = lazy(() => import("@/components/projects/ProjectShowcase"));
const BlogSection = lazy(() => import("@/components/content/BlogSection"));
const YouTubeSectionWrapper = lazy(() => import("@/components/content/YouTubeSectionWrapper"));
const SpeakerGallery = lazy(() => import("@/components/content/SpeakerGallery"));
const CareerTimeline = lazy(() => import("@/components/content/CareerTimeline"));
const ContactForm = lazy(() => import("@/components/forms/ContactForm"));
const MediaSection = lazy(() => import("@/components/projects/MediaSection"));
const TweetsSection = lazy(() => import("@/components/content/TweetSection"));
// import PoapSection from "@/components/blockchain/PoapSection";

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
  // Get tweets from data file with fallback
  const tweetLinks = tweetsData?.tweets || [];
  
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
          <TweetsSection tweets={tweetLinks} minCount={6} maxCount={9} />
        </Suspense>
      </section>
      
      {/* <PoapSection/> */}
      {/* future sections */}
    </>
  );
}
