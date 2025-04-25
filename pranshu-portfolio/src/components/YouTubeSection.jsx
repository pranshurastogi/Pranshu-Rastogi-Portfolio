// src/components/YouTubeSection.jsx
import Parser from "rss-parser";

export default async function YouTubeSection({ limit = 3 }) {
  const parser = new Parser();

  // ⚠️ Use your channel ID, not the @handle
  // Found via channel page URL: https://www.youtube.com/channel/UC8INoQWXK5AwIe5Fdb0BO2Q :contentReference[oaicite:0]{index=0}
  const feed = await parser.parseURL(
    "https://www.youtube.com/feeds/videos.xml?channel_id=UC8INoQWXK5AwIe5Fdb0BO2Q"
  );

  const videos = feed.items.slice(0, limit).map((item) => {
    // extract the `v` query param
    const url = new URL(item.link);
    const videoId = url.searchParams.get("v");
    return { videoId, title: item.title };
  });

  return (
    <section id="youtube" className="py-16 bg-base-100">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-semibold text-primary text-center mb-8">
          Latest YouTube Videos
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map(({ videoId, title }) => (
            <div
              key={videoId}
              className="aspect-video w-full rounded-lg overflow-hidden shadow-lg"
            >
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title={title}
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
