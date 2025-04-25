import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TweetsSection from "@/components/TweetSection";
import BlogSection from "@/components/BlogSection";
import YouTubeSection from "@/components/YouTubeSection";
import SpeakerGallery from "@/components/SpeakerGallery";


export default function Home() {
  const tweetLinks = [
    // Replace these with your actual tweet URLs
    "https://twitter.com/pranshurastogii/status/1896185004666814791",
    "https://twitter.com/pranshurastogii/status/1912881709705748722",
    "https://twitter.com/pranshurastogii/status/1833831369333469401",
    "https://twitter.com/ETHCluj/status/1902331148891553879",
    "https://twitter.com/pranshurastogii/status/1705287298101698736",
    "https://twitter.com/pranshurastogii/status/1894254871517511902"

  ];

  return (
    <>
      <Header />
      <Hero />
      <BlogSection />
      <SpeakerGallery/>
      <YouTubeSection />
      <TweetsSection tweets={tweetLinks} limit={6} />
      {/* future sections */}
    </>
  );
}
