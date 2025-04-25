import Hero from "@/components/Hero";
import BlogSection from "@/components/BlogSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <BlogSection />
      {/* ⇢ Later you can add <Experience />, <Projects />, etc. here */}
    </main>
  );
}
