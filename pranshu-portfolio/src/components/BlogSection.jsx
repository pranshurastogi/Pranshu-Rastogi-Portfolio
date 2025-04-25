"use client";
import Link from "next/link";

// dummy data — replace with CMS/MDX later
const posts = [
  { id: 1, title: "How to Build a Modular Web3 App", href: "#" },
  { id: 2, title: "Understanding Privacy in Blockchain", href: "#" },
  { id: 3, title: "Top 5 Tools for Ethereum Analytics", href: "#" },
];

export default function BlogSection() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-semibold mb-8 text-center">
          Latest Blog Posts
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <h4 className="text-xl font-medium mb-2">{post.title}</h4>
              <Link
                href={post.href}
                className="text-blue-600 hover:underline"
              >
                Read More &rarr;
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
