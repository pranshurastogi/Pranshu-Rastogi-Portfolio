// src/app/projects/[slug]/page.jsx
import { notFound } from "next/navigation";
import projectsData from "@/data/projects.json";
import ProjectPageClient from "./ProjectPageClient";
import { BreadcrumbJsonLd, ProjectJsonLd } from "@/components/seo/JsonLd";
import { projectSlug, projectStillImage, projectUrl, SITE_URL } from "@/lib/site-seo";

// Pre-render every project page at build time
export function generateStaticParams() {
  return projectsData.projects.map((p) => ({ slug: projectSlug(p.title) }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = projectsData.projects.find(
    (p) => projectSlug(p.title) === slug
  );

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested blockchain project could not be found.",
    };
  }

  const pageUrl = projectUrl(project.title);
  // OG cards need a still image, so skip any leading GIF/video
  const ogImage = projectStillImage(project);

  const title = project.tagline
    ? `${project.title} — ${project.tagline}`
    : `${project.title} — ${project.category} Project`;
  const description = `${project.description} Built with ${project.technologies.slice(0, 5).join(", ")}. By Pranshu Rastogi, blockchain & ecosystem engineer.`;

  return {
    title,
    description,
    keywords: [project.title, project.category, ...project.technologies],
    alternates: { canonical: pageUrl },
    openGraph: {
      title: `${project.title} | Pranshu Rastogi`,
      description: project.description,
      type: "website",
      url: pageUrl,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${project.title} — ${project.subtitle}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Blockchain Project`,
      description: project.description,
      images: [ogImage],
    },
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = projectsData.projects.find(
    (p) => projectSlug(p.title) === slug
  );

  if (!project) {
    notFound();
  }

  const pageUrl = projectUrl(project.title);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${SITE_URL}/` },
          { name: project.title, url: pageUrl },
        ]}
      />
      <ProjectJsonLd project={project} />
      <ProjectPageClient project={project} />
    </>
  );
}
