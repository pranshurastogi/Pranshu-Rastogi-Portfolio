import { Suspense } from "react";
import dynamic from "next/dynamic";
import Hero from "@/components/hero/Hero";
import YouTubeSectionWrapper from "@/components/content/YouTubeSectionWrapper";
import tweetsData from "@/data/tweets.json";
import { FaqJsonLd } from "@/components/seo/JsonLd";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  HIRING_ROLES,
  SITE_URL,
} from "@/lib/site-seo";

const ProjectShowcase = dynamic(() => import("@/components/projects/ProjectShowcase"));
const BlogSection = dynamic(() => import("@/components/content/BlogSection"));
const SpeakerGallery = dynamic(() => import("@/components/content/SpeakerGallery"));
const CareerTimeline = dynamic(() => import("@/components/content/CareerTimeline"));
const MediaSection = dynamic(() => import("@/components/projects/MediaSection"));
const TweetsSection = dynamic(() => import("@/components/content/TweetSection"));

export const metadata = {
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
  },
};

const LoadingFallback = ({ sectionName }) => (
  <div className="min-h-[400px] flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-10 w-10 border-2 border-[var(--accent-purple)] border-t-transparent mx-auto mb-4" />
      <p className="text-[var(--text-muted)] text-sm">Loading {sectionName}…</p>
    </div>
  </div>
);

export default function Home() {
  const tweetLinks = tweetsData?.tweets || [];

  return (
    <>
      <FaqJsonLd />
      {/* Crawlable summary for search engines & AI — complements JSON-LD */}
      <section aria-label="Professional summary" className="sr-only">
        <p>
          <strong>Pranshu Rastogi</strong> — DevRel, Ecosystem, Backend &amp; Blockchain Engineer.
          {" "}{DEFAULT_DESCRIPTION}
        </p>
        <p>
          Open to hiring for: {HIRING_ROLES.join(", ")}.
          Portfolio at {SITE_URL} with projects, talks, career history, and resume.
        </p>
      </section>

      <Hero />

      <section id="career">
        <Suspense fallback={<LoadingFallback sectionName="Career" />}>
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
        <Suspense fallback={<LoadingFallback sectionName="Gallery" />}>
          <SpeakerGallery />
        </Suspense>
      </section>

      <section id="youtube">
        <Suspense fallback={<LoadingFallback sectionName="Videos" />}>
          <YouTubeSectionWrapper />
        </Suspense>
      </section>

      <section id="featured">
        <Suspense fallback={<LoadingFallback sectionName="Featured" />}>
          <MediaSection />
        </Suspense>
      </section>

      <section id="tweets">
        <Suspense fallback={<LoadingFallback sectionName="Tweets" />}>
          <TweetsSection tweets={tweetLinks} />
        </Suspense>
      </section>
    </>
  );
}
