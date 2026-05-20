// src/app/sitemap.xml/route.js
import projectsData from '@/data/projects.json';
import { projectSlug, SITE_URL } from '@/lib/site-seo';

export async function GET() {
  const baseUrl = SITE_URL;
  const now = new Date().toISOString();

  const staticPages = [
    { url: baseUrl, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/poaps`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/llms.txt`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/ai.txt`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/documents/resume.pdf`, changeFrequency: 'monthly', priority: 0.8 },
  ];

  const projectPages = projectsData.projects.map((project) => ({
    url: `${baseUrl}/projects/${projectSlug(project.title)}`,
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  const allPages = [...staticPages, ...projectPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map((page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changeFrequency}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
