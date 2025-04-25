// src/app/tweets/page.jsx
import Header from "@/components/Header";
import TweetsSection from "@/components/TweetSection";


export default function TweetsPage() {
  const tweetLinks = [
    "https://twitter.com/pranshurastogii/status/1896185004666814791",
    "https://twitter.com/pranshurastogii/status/1912881709705748722",
    "https://twitter.com/pranshurastogii/status/1833831369333469401",
    "https://twitter.com/ETHCluj/status/1902331148891553879",
    "https://twitter.com/pranshurastogii/status/1705287298101698736",
    "https://twitter.com/pranshurastogii/status/1894254871517511902"
    // …add as many as you want here
  ];

  return (
    <>
      <Header />
      <main className="pt-16">
        <TweetsSection tweets={tweetLinks} limit={tweetLinks.length} />
      </main>
    </>
  );
}
