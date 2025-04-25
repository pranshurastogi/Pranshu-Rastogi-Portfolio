// src/components/BlogSection.jsx
import Image from "next/image";
import Link from "next/link";
import Parser from "rss-parser";

// Regex helper to pull the first <img> src out of the post’s HTML content
function extractFirstImage(html = "") {
  const match = html.match(/<img.*?src=["']([^"']+)["']/i);
  return match ? match[1] : null;
}

export default async function BlogSection() {
  const parser = new Parser({
    customFields: {
      item: [["content:encoded", "content"]],
    },
  });

  // Fetch and parse your Medium RSS feed
  const feed = await parser.parseURL("https://pranshurastogi.medium.com/feed");
  const latest3 = feed.items.slice(0, 3);

  return (
    <section id="blog" className="py-16 bg-base-100">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-semibold text-center mb-8 text-primary">
          Latest Blog Posts
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latest3.map((post) => {
            const imgSrc =
              post.enclosure?.url || extractFirstImage(post.content);
            return (
              <Link
                key={post.link}
                href={post.link}
                className="card block bg-white shadow hover:shadow-lg overflow-hidden transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                {imgSrc && (
                  <div className="relative w-full h-48">
                    <Image
                      src={imgSrc}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="card-body p-6">
                  <h4 className="card-title text-lg font-medium text-secondary mb-2">
                    {post.title}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {new Date(post.isoDate).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
