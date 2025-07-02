import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BlogSection from "@/components/BlogSection";
import YouTubeSectionWrapper from "@/components/YouTubeSectionWrapper";
import SpeakerGallery from "@/components/SpeakerGallery";
import CareerTimeline from "@/components/CareerTimeline";
import ContactForm from "@/components/ContactForm";
import MediaSection from "@/components/MediaSection";
import TweetsSection from "@/components/TweetSection";
// import PoapSection from "@/components/PoapSection";

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
      <section id="career"><CareerTimeline /></section>
      <section id="blog"><BlogSection /></section>
      <section id="gallery"><SpeakerGallery/></section>
      <section id="youtube"><YouTubeSectionWrapper /></section>
      <section id="featured"><MediaSection/></section>
      <section id="tweets"><TweetsSection tweets={tweetLinks} limit={6} /></section>
      {/* <PoapSection/> */}
      <ContactForm/>
      {/* future sections */}
    </>
  );
}
