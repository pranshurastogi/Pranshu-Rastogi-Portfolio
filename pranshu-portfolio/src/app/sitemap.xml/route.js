// src/app/sitemap.xml/route.js
import projectsData from '@/data/projects.json';

export async function GET() {
  const baseUrl = 'https://pranshurastogi.com';
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 1.0
    },
    {
      url: `${baseUrl}/poaps`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.8
    }
  ];

  // Dynamic project pages
  const projectPages = projectsData.projects.map(project => ({
    url: `${baseUrl}/projects/${project.title.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.9
  }));

  const allPages = [...staticPages, ...projectPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastModified}</lastmod>
    <changefreq>${page.changeFrequency}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400' // Cache for 24 hours
    }
  });
}
