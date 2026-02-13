import { Suspense } from "react";
import dynamic from "next/dynamic";
import Hero from "@/components/hero/Hero";
import YouTubeSectionWrapper from "@/components/content/YouTubeSectionWrapper";
import tweetsData from "@/data/tweets.json";

const ProjectShowcase = dynamic(() => import("@/components/projects/ProjectShowcase"));
const BlogSection = dynamic(() => import("@/components/content/BlogSection"));
const SpeakerGallery = dynamic(() => import("@/components/content/SpeakerGallery"));
const CareerTimeline = dynamic(() => import("@/components/content/CareerTimeline"));
const MediaSection = dynamic(() => import("@/components/projects/MediaSection"));
const TweetsSection = dynamic(() => import("@/components/content/TweetSection"));

const LoadingFallback = ({ sectionName }) => (
  <div className="min-h-[400px] flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#AEEA00] mx-auto mb-4"></div>
      <p className="text-[#AEEA00] font-mono">Loading {sectionName}...</p>
    </div>
  </div>
);

export default function Home() {
  const tweetLinks = tweetsData?.tweets || [];

  return (
    <>
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
          <SpeakerGallery />
        </Suspense>
      </section>

      <section id="youtube">
        <Suspense fallback={<LoadingFallback sectionName="YouTube Content" />}>
          <YouTubeSectionWrapper />
        </Suspense>
      </section>

      <section id="featured">
        <Suspense fallback={<LoadingFallback sectionName="Media" />}>
          <MediaSection />
        </Suspense>
      </section>

      <section id="tweets">
        <Suspense fallback={<LoadingFallback sectionName="Tweets" />}>
          <TweetsSection tweets={tweetLinks} minCount={6} maxCount={9} />
        </Suspense>
      </section>
    </>
  );
}
