// src/app/projects/[slug]/ProjectPageClient.jsx
"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLinkIcon, GithubIcon, ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage';
import projectsData from '@/data/projects.json';

export default function ProjectPageClient({ project }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  return (
    <div className="min-h-screen pt-16 bg-base-100">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-8">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-[#AEEA00] hover:text-[#39FF14] transition-colors mb-8"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Back to Portfolio
        </Link>

        {/* Project Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Project Images */}
            <div className="lg:w-2/3">
              <div className="relative aspect-video bg-gradient-to-br from-[#AEEA00]/10 to-black/50 rounded-2xl overflow-hidden mb-4 border border-[#AEEA00]/30">
                {project.images[currentImageIndex]?.endsWith('.mov') || 
                 project.images[currentImageIndex]?.endsWith('.mp4') || 
                 project.images[currentImageIndex]?.endsWith('.webm') ? (
                  <video 
                    src={project.images[currentImageIndex]} 
                    className="w-full h-full object-cover opacity-90"
                    muted
                    loop
                    playsInline
                    autoPlay
                    controls
                  />
                ) : (
                  <OptimizedImage 
                    src={project.images[currentImageIndex]} 
                    alt={`${project.title} - ${project.subtitle} blockchain project showcase`}
                    fill
                    sizes="(max-width: 768px) 100vw, 60vw"
                    className="object-cover opacity-90"
                    priority
                  />
                )}
                
                {/* Image Navigation */}
                {project.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-colors"
                    >
                      ←
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-colors"
                    >
                      →
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                      {currentImageIndex + 1} / {project.images.length}
                    </div>
                  </>
                )}
              </div>

              {/* Image Thumbnails */}
              {project.images.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto">
                  {project.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-12 rounded-lg overflow-hidden border-2 transition-colors ${
                        currentImageIndex === index 
                          ? 'border-[#AEEA00]' 
                          : 'border-gray-600 hover:border-gray-400'
                      }`}
                    >
                      <OptimizedImage
                        src={image}
                        alt={`${project.title} thumbnail ${index + 1}`}
                        width={80}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Project Info */}
            <div className="lg:w-1/3">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-[#181a20] border border-[#AEEA00]/30 rounded-2xl p-8"
              >
                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-[#AEEA00] mb-2">{project.title}</h1>
                  <p className="text-[#39FF14] text-lg mb-4">{project.subtitle}</p>
                  <span className="inline-block bg-[#AEEA00]/20 text-[#AEEA00] px-3 py-1 rounded-full text-sm font-medium">
                    {project.category}
                  </span>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
                  <p className="text-gray-300 leading-relaxed">{project.longDescription}</p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="bg-[#232526] text-[#AEEA00] px-3 py-1 rounded-lg text-sm border border-[#AEEA00]/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3">Key Features</h3>
                  <ul className="space-y-2">
                    {project.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-300">
                        <span className="text-[#AEEA00] mt-1">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-4">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-[#AEEA00] text-black px-6 py-3 rounded-lg font-medium hover:bg-[#39FF14] transition-colors"
                    >
                      <ExternalLinkIcon className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-[#232526] text-[#AEEA00] px-6 py-3 rounded-lg font-medium border border-[#AEEA00]/30 hover:bg-[#AEEA00]/10 transition-colors"
                    >
                      <GithubIcon className="w-4 h-4" />
                      View Code
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Related Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold text-[#AEEA00] mb-8">Other Blockchain Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectsData.projects
              .filter(p => p.id !== project.id)
              .slice(0, 3)
              .map((relatedProject) => (
                <Link
                  key={relatedProject.id}
                  href={`/projects/${relatedProject.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="group bg-[#181a20] border border-[#AEEA00]/30 rounded-xl overflow-hidden hover:border-[#AEEA00] transition-colors"
                >
                  <div className="aspect-video bg-gradient-to-br from-[#AEEA00]/10 to-black/50 relative">
                    <OptimizedImage
                      src={relatedProject.images[0]}
                      alt={`${relatedProject.title} - ${relatedProject.subtitle}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-[#AEEA00] mb-1">{relatedProject.title}</h3>
                    <p className="text-gray-400 text-sm">{relatedProject.subtitle}</p>
                  </div>
                </Link>
              ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
