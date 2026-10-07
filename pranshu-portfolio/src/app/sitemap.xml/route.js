// src/app/sitemap.xml/route.js
// Single source of truth for the sitemap: project pages are generated from
// src/data/projects.json, so adding a project there is enough to list it here.
import projectsData from '@/data/projects.json';
import { absoluteUrl } from '@/lib/site-assets';
import { projectSlug, SITE_URL } from '@/lib/site-seo';

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Google image sitemaps accept stills and GIFs; videos need a separate schema
const isImage = (src) => /\.(png|jpe?g|webp|avif|gif)$/i.test(src);

export async function GET() {
  const baseUrl = SITE_URL;
  const now = new Date().toISOString();

  const staticPages = [
    { url: `${baseUrl}/`, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/poaps`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/llms.txt`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/ai.txt`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/documents/resume.pdf`, changeFrequency: 'monthly', priority: 0.8 },
  ];

  // Projects are listed in display order; the first (featured) ones rank highest
  const projectPages = projectsData.projects.map((project, i) => ({
    url: `${baseUrl}/projects/${projectSlug(project.title)}`,
    changeFrequency: 'monthly',
    priority: i < 2 ? 0.9 : 0.8,
    images: project.images.filter(isImage).map((src) => ({
      loc: src.startsWith('http') ? src : absoluteUrl(src),
      title: `${project.title} — ${project.subtitle}`,
    })),
  }));

  const allPages = [...staticPages, ...projectPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allPages.map((page) => `  <url>
    <loc>${escapeXml(page.url)}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changeFrequency}</changefreq>
    <priority>${page.priority.toFixed(1)}</priority>${(page.images || []).map((img) => `
    <image:image>
      <image:loc>${escapeXml(img.loc)}</image:loc>
      <image:title>${escapeXml(img.title)}</image:title>
    </image:image>`).join('')}
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
