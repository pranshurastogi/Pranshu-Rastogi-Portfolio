// src/app/blog/page.jsx
import Parser from "rss-parser";
import Image from "next/image";
import Link from "next/link";

// Helper: pull the first <img> src from the post HTML
function extractFirstImage(html = "") {
  const match = html.match(/<img.*?src=["']([^"']+)["']/i);
  return match ? match[1] : null;
}

// Helper: strip HTML and take the first 30 words as a snippet
function extractSnippet(html = "", wordCount = 30) {
  const text = html.replace(/<[^>]+>/g, "");
  return text.split(/\s+/).slice(0, wordCount).join(" ") + "…";
}

export default async function BlogPage() {
  const parser = new Parser({
    customFields: { item: [["content:encoded", "content"]] },
  });

  // Fetch your Medium RSS
  const feed = await parser.parseURL(
    "https://pranshurastogi.medium.com/feed"
  );

  return (
    <main className="pt-20 bg-base-100 min-h-screen">
      <section className="py-16 container mx-auto px-4">
        <h1 className="text-4xl font-bold text-primary mb-8">
          All Blog Posts
        </h1>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {feed.items.map((post) => {
            const imgUrl =
              post.enclosure?.url || extractFirstImage(post.content);
            return (
              <article
                key={post.link}
                className="card bg-white shadow hover:shadow-lg overflow-hidden transition"
              >
                {imgUrl && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={imgUrl}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="card-body p-6">
                  <h2 className="card-title text-lg font-medium text-secondary mb-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-500 mb-4">
                    {new Date(post.isoDate).toLocaleDateString()}
                  </p>
                  <p className="text-base-content">
                    {extractSnippet(post.content, 35)}
                  </p>
                  <Link
                    href={post.link}
                    className="mt-4 btn btn-secondary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read Full Post &rarr;
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
