// src/app/projects/[slug]/page.jsx
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { ExternalLinkIcon, GithubIcon, ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import OptimizedImage from '@/components/ui/OptimizedImage';
import projectsData from '@/data/projects.json';
import ProjectPageClient from './ProjectPageClient';

// Generate metadata for each project
export async function generateMetadata({ params }) {
  const project = projectsData.projects.find(p => 
    p.title.toLowerCase().replace(/\s+/g, '-') === params.slug
  );
  
  if (!project) {
    return {
      title: 'Project Not Found | Pranshu Rastogi',
      description: 'The requested blockchain project could not be found.'
    };
  }

  return {
    title: `${project.title} | Blockchain Project by Pranshu Rastogi`,
    description: `${project.description} - ${project.subtitle}. Explore this ${project.category.toLowerCase()} project built with ${project.technologies.join(', ')}.`,
    keywords: [
      'blockchain',
      'web3',
      'decentralized',
      project.category.toLowerCase(),
      ...project.technologies.map(tech => tech.toLowerCase()),
      'pranshu rastogi',
      'blockchain engineer'
    ].join(', '),
    openGraph: {
      title: `${project.title} | Blockchain Project`,
      description: project.description,
      type: 'website',
      url: `https://pranshurastogi.com/projects/${params.slug}`,
      images: [
        {
          url: project.images[0],
          width: 1200,
          height: 630,
          alt: `${project.title} - ${project.subtitle}`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | Blockchain Project`,
      description: project.description,
      images: [project.images[0]]
    }
  };
}

export default function ProjectPage({ params }) {
  const project = projectsData.projects.find(p => 
    p.title.toLowerCase().replace(/\s+/g, '-') === params.slug
  );

  if (!project) {
    notFound();
  }

  return <ProjectPageClient project={project} />;
}
