'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, ExternalLinkIcon, GithubIcon, EyeIcon, ZapIcon, CubeIcon, LinkIcon, MailIcon, MessageCircleIcon, XIcon } from 'lucide-react';
import { FaEthereum, FaBitcoin, FaCube, FaLink, FaCode, FaStar, FaTwitter } from 'react-icons/fa';
import { SiPolygon, SiSolana } from 'react-icons/si';
import { useRouter } from 'next/navigation';
import projectsData from '../data/projects.json';
import OptimizedImage from './OptimizedImage';

// Blockchain-themed floating icons
const BlockchainIcon = ({ icon, delay = 0 }) => (
  <motion.div
    className="absolute text-[#AEEA00]/20 text-4xl"
    initial={{ opacity: 0, y: 50, rotate: 0 }}
    animate={{ 
      opacity: [0.2, 0.4, 0.2], 
      y: [-20, -80, -20], 
      rotate: [0, 180, 360] 
    }}
    transition={{ 
      duration: 8, 
      delay, 
      repeat: Infinity, 
      ease: "easeInOut" 
    }}
  >
    {icon}
  </motion.div>
);

// Matrix-style binary rain for blockchain theme
const BinaryRain = () => {
  const binaryChars = ['0', '1', '⬡', '⬢', '◊', '◈'];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-[#AEEA00]/10 font-mono text-sm"
          style={{ left: `${(i / 20) * 100}%` }}
          initial={{ y: -100, opacity: 0 }}
          animate={{ 
            y: '100vh', 
            opacity: [0, 0.3, 0] 
          }}
          transition={{
            duration: 10 + Math.random() * 5,
            delay: Math.random() * 5,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {Array.from({ length: 8 }).map((_, j) => (
            <div key={j} className="mb-4">
              {binaryChars[Math.floor(Math.random() * binaryChars.length)]}
            </div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

// Icon mapping function
const getProjectIcon = (iconName) => {
  const iconMap = {
    ethereum: <FaEthereum className="text-[#627EEA]" />,
    bitcoin: <FaBitcoin className="text-[#F7931A]" />,
    polygon: <SiPolygon className="text-[#a259ff]" />,
    solana: <SiSolana className="text-[#00FFA3]" />,
    zap: <ZapIcon className="text-[#AEEA00]" />,
    cube: <FaCube className="text-[#39FF14]" />,
    link: <FaLink className="text-[#2A5ADA]" />,
    code: <FaCode className="text-[#AEEA00]" />,
    star: <FaStar className="text-[#FFD700]" />
  };
  return iconMap[iconName] || <FaCube className="text-[#AEEA00]" />;
};

const ProjectShowcase = () => {
  const router = useRouter();
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [showCollaborationModal, setShowCollaborationModal] = useState(false);

  // Load projects from JSON data
  const projects = projectsData.projects;

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  };

  const openProject = (project) => {
    // Navigate to individual project page
    const slug = project.title.toLowerCase().replace(/\s+/g, '-');
    router.push(`/projects/${slug}`);
  };

  const closeProject = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  return (
    <>
      {/* Top blockchain transition */}
      <div className="relative h-8 overflow-hidden" style={{ background: "#070f09" }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex gap-6 text-[#AEEA00]/20 text-xl animate-pulse">
            <span>⬡</span><span>⬢</span><span>◊</span><span>⬡</span><span>⬢</span><span>◊</span><span>⬡</span>
          </div>
        </div>
        <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-[#AEEA00]/30 to-transparent"></div>
      </div>

      <section 
        className="py-6 relative overflow-hidden font-mono"
        style={{ 
          background: "linear-gradient(180deg, #070f09 0%, #0a1a0d 50%, #070f09 100%)",
          fontFamily: "'JetBrains Mono', 'Fira Mono', 'Cascadia Code', 'Consolas', monospace"
        }}
      >
      {/* Matrix Binary Rain Background */}
      <BinaryRain />
      
      {/* Blockchain Floating Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <BlockchainIcon icon={<FaEthereum />} delay={0} />
        <BlockchainIcon icon={<FaBitcoin />} delay={2} />
        <BlockchainIcon icon={<SiPolygon />} delay={4} />
        <BlockchainIcon icon={<FaCube />} delay={6} />
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#AEEA00]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-40 h-40 bg-[#39FF14]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-[#627EEA]/5 rounded-full blur-3xl"></div>
      </div>
      
      {/* Scanline overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-10">
        <div 
          className="w-full h-full" 
          style={{ 
            background: "repeating-linear-gradient(0deg, transparent, transparent 2px, #AEEA00 2.5px, transparent 3px)" 
          }} 
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-20">
        {/* Hacker-style Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <div className="mb-6">
            <span className="text-[#39FF14] text-xl">$</span>
            <span className="text-[#AEEA00] ml-2 text-xl">cat projects.json</span>
            <span className="animate-pulse text-[#AEEA00] ml-2">█</span>
          </div>
          

          
          <h2 
            className="text-4xl md:text-5xl font-bold mb-6 neon-glow glitch-text"
            data-text="&lt;Projects /&gt;"
            style={{ 
              color: "#AEEA00",
              textShadow: "0 0 10px #AEEA00, 0 0 40px #AFEA00, 0 0 40px #AEEA00"
            }}
          >
             &lt; Projects/ &gt;
          </h2>
          
          {/* Hacker-style status indicators */}
          <div className="flex items-center justify-center gap-6 mb-4 text-sm font-mono">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#39FF14] rounded-full animate-pulse"></div>
              <span className="text-[#39FF14]">SYSTEM_ACTIVE</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#AEEA00] rounded-full animate-pulse"></div>
              <span className="text-[#AEEA00]">BLOCKCHAIN_SYNC</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#627EEA] rounded-full animate-pulse"></div>
              <span className="text-[#627EEA]">WEB3_READY</span>
            </div>
          </div>
          
          <p className="text-lg text-[#80CBC4] max-w-2xl mx-auto leading-relaxed">
            <span className="text-[#39FF14]">// </span>
            Deploying smart contracts, building Ecosystem, and hacking the future of web3
            <span className="animate-pulse text-[#AEEA00]">█</span>
          </p>
        </motion.div>

        {/* Terminal-style Projects Grid Header */}
        <div className="mb-6">
          <div className="bg-black/50 border border-[#AEEA00]/30 rounded-lg p-4 font-mono">
            <div className="flex items-center gap-4 mb-3">
              <span className="text-[#39FF14]">$</span>
              <span className="text-[#AEEA00]">ls -la projects/</span>
              <span className="animate-pulse text-[#AEEA00]">█</span>
            </div>
            <div className="text-[#80CBC4] text-sm mb-2">
              Found {projects.length} projects | Total size: {projects.reduce((acc, p) => acc + p.technologies.length, 0)} technologies
            </div>
            <div className="text-[#39FF14] text-xs">
              <span className="animate-pulse">█</span> Scanning blockchain networks... <span className="text-[#AEEA00]">✓</span>
            </div>
            <div className="text-[#39FF14] text-xs">
              <span className="animate-pulse">█</span> Smart contracts verified... <span className="text-[#AEEA00]">✓</span>
            </div>
            <div className="text-[#39FF14] text-xs">
              <span className="animate-pulse">█</span> Gas optimization complete... <span className="text-[#AEEA00]">✓</span>
            </div>
          </div>
        </div>

        {/* Compact Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                y: -8, 
                scale: 1.02,
                boxShadow: `0 20px 40px rgba(174, 234, 0, 0.15)` 
              }}
              className="group cursor-pointer"
              onClick={() => openProject(project)}
              onMouseEnter={() => setHoveredCard(project.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div 
                className={`
                  bg-black/80 backdrop-blur-xl border-2 rounded-2xl p-5 h-full 
                  transition-all duration-300 relative overflow-hidden
                  ${hoveredCard === project.id 
                    ? 'border-[#AEEA00] shadow-2xl' 
                    : 'border-[#AEEA00]/30 hover:border-[#39FF14]/50'
                  }
                `}
                style={{ 
                  boxShadow: hoveredCard === project.id 
                    ? '0 0 30px rgba(174, 234, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)' 
                    : '0 0 20px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
                }}
              >
                {/* Blockchain-themed background pattern */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20`}></div>
                
                                    {/* Project Icon & Media */}
                    <div className="relative mb-4 overflow-hidden rounded-xl">
                      <div className="aspect-video bg-gradient-to-br from-[#AEEA00]/10 to-black/50 flex items-center justify-center relative">
                        {project.images[0]?.endsWith('.mov') || project.images[0]?.endsWith('.mp4') || project.images[0]?.endsWith('.webm') ? (
                          <video 
                            src={project.images[0]} 
                            className="w-full h-full object-cover opacity-80"
                            muted
                            loop
                            playsInline
                            autoPlay
                          />
                        ) : (
                          <OptimizedImage 
                            src={project.images[0]} 
                            alt={`${project.title} - ${project.subtitle} blockchain project showcase`}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover opacity-80"
                            priority={false}
                          />
                        )}
                        {/* Blockchain icon overlay */}
                        <div className="absolute top-3 right-3 text-2xl">
                          {getProjectIcon(project.icon)}
                        </div>
                      </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-[#AEEA00]/20 backdrop-blur-sm rounded-full p-3 border border-[#AEEA00]/50">
                      <EyeIcon className="w-5 h-5 text-[#AEEA00]" />
                    </div>
                  </div>
                </div>

                {/* Compact Project Info */}
                <div className="space-y-3 relative z-10">
                  <div>
                    <h3 
                      className={`
                        text-lg font-bold mb-1 transition-colors duration-300
                        ${hoveredCard === project.id ? 'text-[#39FF14]' : 'text-[#AEEA00]'}
                      `}
                    >
                      {project.title}
                    </h3>
                    <p className="text-[#80CBC4] text-sm font-medium">{project.subtitle}</p>
                  </div>
                  
                  <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  {/* Compact Technologies */}
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 2).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-[#AEEA00]/10 text-[#AEEA00] text-xs rounded-md border border-[#AEEA00]/30 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 2 && (
                      <span className="px-2 py-1 bg-black/50 text-gray-400 text-xs rounded-md font-mono">
                        +{project.technologies.length - 2}
                      </span>
                    )}
                  </div>

                  {/* Category & Launch Demo Button */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2 py-1 bg-[#39FF14]/10 text-[#39FF14] rounded-md border border-[#39FF14]/30 font-mono">
                      {project.category}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.live, '_blank');
                      }}
                      className="px-3 py-1 bg-[#AEEA00]/20 hover:bg-[#AEEA00]/30 text-[#AEEA00] rounded-md border border-[#AEEA00]/50 hover:border-[#39FF14] hover:text-[#39FF14] transition-all duration-200 font-mono text-xs hover:scale-105"
                    >
                      🚀 Launch Demo
                    </button>
                  </div>
                </div>

                {/* Hover effect: terminal cursor and hacker info */}
                {hoveredCard === project.id && (
                  <>
                    <div className="absolute bottom-2 right-2 text-[#AEEA00] animate-pulse">
                      <span className="font-mono text-sm">█</span>
                    </div>
                    {/* Terminal-style project info overlay */}
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-center p-4">
                        <div className="text-[#39FF14] font-mono text-sm mb-2">
                          <span className="animate-pulse">█</span> ./project-info.sh
                        </div>
                        <div className="text-[#AEEA00] font-mono text-xs space-y-1">
                          <div>ID: {project.id}</div>
                          <div>STATUS: ACTIVE</div>
                          <div>BLOCKCHAIN: {project.category}</div>
                          <div>COMPLEXITY: {project.technologies.length} techs</div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Hacker-style Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <div className="bg-black/50 border border-[#AEEA00]/30 rounded-2xl p-6 backdrop-blur-xl">
            {/* Terminal-style header */}
            <div className="mb-4">
              <div className="flex items-center justify-center gap-2 text-[#39FF14] font-mono text-sm">
                <span className="animate-pulse">█</span>
                <span>./status.sh</span>
                <span className="animate-pulse">█</span>
              </div>
            </div>
            
            <p className="text-[#80CBC4] mb-4 font-mono">
              <span className="text-[#39FF14]">// </span>
              Ready to build the decentralized future together?
            </p>
            
            {/* Hacker-style button with terminal effects */}
            <button 
              onClick={() => setShowCollaborationModal(true)}
              className="group relative px-8 py-3 bg-[#AEEA00]/10 border-2 border-[#AEEA00] text-[#AEEA00] font-mono font-bold rounded-xl hover:bg-[#AEEA00]/20 hover:text-[#39FF14] hover:border-[#39FF14] transition-all duration-300 transform hover:scale-105 hover:shadow-2xl overflow-hidden"
              style={{ 
                boxShadow: '0 0 20px rgba(174, 234, 0, 0.3)',
                textShadow: '0 0 10px #AEEA00'
              }}
            >
              {/* Terminal scanline effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#AEEA00]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12 -translate-x-full group-hover:translate-x-full"></div>
              
              <span className="text-[#39FF14]">$</span> ./collaborate.sh
              <span className="animate-pulse ml-2">█</span>
            </button>
            
            {/* Terminal-style footer */}
            <div className="mt-4 text-center">
              <div className="text-[#80CBC4] font-mono text-xs">
                <span className="text-[#39FF14]">// </span>
                <span className="animate-pulse text-[#AEEA00]">█</span> Press any key to continue...
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Blockchain-themed Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
            onClick={closeProject}
            style={{ fontFamily: "'JetBrains Mono', 'Fira Mono', 'Cascadia Code', 'Consolas', monospace" }}
          >
            {/* Matrix overlay for modal */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="w-full h-full opacity-5" style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 2px, #AEEA00 2.5px, transparent 3px)" }} />
            </div>
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotateX: -15 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateX: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-black/95 backdrop-blur-xl rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto border-2 border-[#AEEA00]/50 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
              style={{ 
                boxShadow: '0 0 50px rgba(174, 234, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)' 
              }}
            >
              {/* Hacker-style Modal Header */}
              <div className="p-8 border-b border-[#AEEA00]/30">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">
                      {getProjectIcon(selectedProject.icon)}
                    </div>
                    <div>
                      <div className="mb-2">
                        <span className="text-[#39FF14] text-sm">$</span>
                        <span className="text-[#AEEA00] ml-2 text-sm">cat {selectedProject.title.toLowerCase().replace(/\s+/g, '-')}.json</span>
                      </div>
                      <h2 
                        className="text-3xl font-bold mb-2"
                        style={{ 
                          color: "#AEEA00",
                          textShadow: "0 0 10px #AEEA00"
                        }}
                      >
                        {selectedProject.title}
                      </h2>
                      <p className="text-lg text-[#80CBC4]">{selectedProject.subtitle}</p>
                    </div>
                  </div>
                  <button
                    onClick={closeProject}
                    className="p-3 hover:bg-[#AEEA00]/10 rounded-full transition-colors duration-200 border border-[#AEEA00]/30"
                  >
                    <div className="w-5 h-5 text-[#AEEA00] hover:text-[#39FF14] font-mono font-bold">✕</div>
                  </button>
                </div>
                
                <div className="bg-black/50 border border-[#AEEA00]/20 rounded-xl p-4">
                  <p className="text-[#80CBC4] text-base leading-relaxed">
                    <span className="text-[#39FF14]">// </span>
                    {selectedProject.longDescription}
                  </p>
                </div>
              </div>

              {/* Blockchain-themed Image Carousel */}
              <div className="p-8 border-b border-[#AEEA00]/30">
                <div className="mb-4">
                  <span className="text-[#39FF14] text-sm">$</span>
                  <span className="text-[#AEEA00] ml-2 text-sm">display --preview {selectedProject.title.toLowerCase().replace(/\s+/g, '-')}</span>
                </div>
                <div className="relative">
                  <div className="aspect-video bg-gradient-to-br from-[#AEEA00]/10 to-black/80 rounded-2xl overflow-hidden mb-4 border border-[#AEEA00]/30">
                    {selectedProject.images[currentImageIndex]?.endsWith('.mov') || selectedProject.images[currentImageIndex]?.endsWith('.mp4') || selectedProject.images[currentImageIndex]?.endsWith('.webm') ? (
                      <video 
                        src={selectedProject.images[currentImageIndex]} 
                        className="w-full h-full object-cover opacity-90"
                        muted
                        loop
                        playsInline
                        autoPlay
                        controls
                      />
                    ) : (
                      <OptimizedImage 
                        src={selectedProject.images[currentImageIndex]} 
                        alt={`${selectedProject.title} blockchain project - ${selectedProject.subtitle} - Image ${currentImageIndex + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 60vw"
                        className="object-cover opacity-90"
                        priority={false}
                      />
                    )}
                    {/* Blockchain overlay effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <div className="absolute top-4 left-4 text-[#AEEA00] font-mono text-sm bg-black/60 px-2 py-1 rounded">
                      {currentImageIndex + 1} / {selectedProject.images.length}
                    </div>
                  </div>
                  
                  {/* Hacker-style Carousel Navigation */}
                  <div className="flex items-center justify-between absolute top-1/2 -translate-y-1/2 w-full px-4">
                    <button
                      onClick={prevImage}
                      className="p-3 bg-black/70 hover:bg-[#AEEA00]/20 backdrop-blur-sm rounded-full border border-[#AEEA00]/50 text-[#AEEA00] hover:text-[#39FF14] transition-all duration-200 hover:scale-110"
                    >
                      <ChevronLeftIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="p-3 bg-black/70 hover:bg-[#AEEA00]/20 backdrop-blur-sm rounded-full border border-[#AEEA00]/50 text-[#AEEA00] hover:text-[#39FF14] transition-all duration-200 hover:scale-110"
                    >
                      <ChevronRightIcon className="w-5 h-5" />
                    </button>
                  </div>
                  
                  {/* Blockchain-themed Image Indicators */}
                  <div className="flex items-center justify-center gap-3 mt-4">
                    {selectedProject.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 transition-all duration-200 font-mono ${
                          index === currentImageIndex
                            ? 'text-[#AEEA00] scale-125'
                            : 'text-[#AEEA00]/50 hover:text-[#AEEA00]'
                        }`}
                      >
                        ⬡
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hacker-style Project Details */}
              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Technologies */}
                  <div>
                    <div className="mb-4">
                      <span className="text-[#39FF14] text-sm">$</span>
                      <span className="text-[#AEEA00] ml-2 text-sm">list --dependencies</span>
                    </div>
                    <h3 className="text-xl font-bold text-[#AEEA00] mb-4">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-2 bg-[#AEEA00]/10 text-[#AEEA00] rounded-lg border border-[#AEEA00]/30 font-mono text-sm hover:bg-[#AEEA00]/20 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <div className="mb-4">
                      <span className="text-[#39FF14] text-sm">$</span>
                      <span className="text-[#AEEA00] ml-2 text-sm">cat features.txt</span>
                    </div>
                    <h3 className="text-xl font-bold text-[#AEEA00] mb-4">Core Features</h3>
                    <ul className="space-y-3">
                      {selectedProject.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3 text-[#80CBC4]">
                          <span className="text-[#39FF14] font-mono mt-1">▶</span>
                          <span className="font-mono text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Hacker-style Action Buttons */}
                <div className="flex items-center gap-4 mt-8 pt-8 border-t border-[#AEEA00]/30">
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-6 py-3 bg-black/50 hover:bg-[#AEEA00]/10 text-[#AEEA00] font-mono font-semibold rounded-xl border border-[#AEEA00]/50 hover:border-[#39FF14] hover:text-[#39FF14] transition-all duration-200 hover:scale-105"
                    style={{ boxShadow: '0 0 20px rgba(174, 234, 0, 0.2)' }}
                  >
                    <GithubIcon className="w-5 h-5" />
                    ./view-source.sh
                  </a>
                  <a
                    href={selectedProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-6 py-3 bg-[#AEEA00]/10 hover:bg-[#AEEA00]/20 text-[#AEEA00] font-mono font-semibold rounded-xl border border-[#AEEA00] hover:border-[#39FF14] hover:text-[#39FF14] transition-all duration-200 hover:scale-105"
                    style={{ boxShadow: '0 0 20px rgba(174, 234, 0, 0.3)' }}
                  >
                    <ExternalLinkIcon className="w-5 h-5" />
                    ./launch-demo.sh
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collaboration Modal */}
      <AnimatePresence>
        {showCollaborationModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
            onClick={() => setShowCollaborationModal(false)}
            style={{ fontFamily: "'JetBrains Mono', 'Fira Mono', 'Cascadia Code', 'Consolas', monospace" }}
          >
            {/* Matrix overlay for modal */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="w-full h-full opacity-5" style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 2px, #AEEA00 2.5px, transparent 3px)" }} />
            </div>
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotateX: -15 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateX: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-black/95 backdrop-blur-xl rounded-lg max-w-2xl w-full border-2 border-[#AEEA00]/50 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
              style={{ 
                boxShadow: '0 0 50px rgba(174, 234, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)' 
              }}
            >
              {/* Hacker-style Modal Header */}
              <div className="p-8 border-b border-[#AEEA00]/30">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="mb-2">
                      <span className="text-[#39FF14] text-sm">$</span>
                      <span className="text-[#AEEA00] ml-2 text-sm">./collaborate.sh --init</span>
                    </div>
                    <h2 
                      className="text-3xl font-bold mb-2"
                      style={{ 
                        color: "#AEEA00",
                        textShadow: "0 0 10px #AEEA00"
                      }}
                    >
                      Let's Build Together
                    </h2>
                    <p className="text-lg text-[#80CBC4]">Ready to hack the future?</p>
                  </div>
                  <button
                    onClick={() => setShowCollaborationModal(false)}
                    className="p-3 hover:bg-[#AEEA00]/10 rounded-full transition-colors duration-200 border border-[#AEEA00]/30"
                  >
                    <XIcon className="w-5 h-5 text-[#AEEA00] hover:text-[#39FF14]" />
                  </button>
                </div>
                
                <div className="bg-black/50 border border-[#AEEA00]/20 rounded-xl p-4">
                  <p className="text-[#80CBC4] text-base leading-relaxed">
                    <span className="text-[#39FF14]">// </span>
                    Connect with me to discuss blockchain projects, DeFi innovations, or just geek out about the future of web3!
                  </p>
                </div>
              </div>

              {/* Collaboration Options */}
              <div className="p-8">
                <div className="space-y-6">
                  {/* X (Twitter) Connection */}
                  <div className="bg-black/50 border border-[#AEEA00]/20 rounded-lg p-6 hover:border-[#39FF14]/50 transition-all duration-200">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-[#AEEA00]/20 rounded-full">
                        <FaTwitter className="w-6 h-6 text-[#AEEA00]" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-[#AEEA00]">Connect on X</h3>
                        <p className="text-[#80CBC4] text-sm">Follow and DM me for real-time updates</p>
                      </div>
                    </div>
                                         <a
                       href="https://x.com/pranshurastogii"
                       target="_blank"
                       rel="noopener noreferrer"
                       className="inline-flex items-center gap-3 px-6 py-3 bg-[#AEEA00]/10 hover:bg-[#AEEA00]/20 text-[#AEEA00] font-mono font-semibold rounded-lg border border-[#AEEA00]/50 hover:border-[#39FF14] hover:text-[#39FF14] transition-all duration-200 hover:scale-105"
                       style={{ boxShadow: '0 0 20px rgba(174, 234, 0.2)' }}
                     >
                       <MessageCircleIcon className="w-5 h-5" />
                       ./connect-x.sh
                     </a>
                  </div>

                  {/* Email Contact */}
                  <div className="bg-black/50 border border-[#AEEA00]/20 rounded-lg p-6 hover:border-[#39FF14]/50 transition-all duration-200">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-[#39FF14]/20 rounded-full">
                        <MailIcon className="w-6 h-6 text-[#39FF14]" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-[#39FF14]">Email Me</h3>
                        <p className="text-[#80CBC4] text-sm">pranshurastogi.eth@gmail.com </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-black/30 border border-[#AEEA00]/30 rounded-lg p-3">
                        <p className="text-[#AEEA00] font-mono text-sm">
                          <span className="text-[#39FF14]">$</span> echo "pranshurastogi.eth@gmail.com"
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText('pranshurastogi.eth@gmail.com');
                          // You could add a toast notification here
                        }}
                        className="inline-flex items-center gap-3 px-6 py-3 bg-[#39FF14]/10 hover:bg-[#39FF14]/20 text-[#39FF14] font-mono font-semibold rounded-xl border border-[#39FF14]/50 hover:border-[#AEEA00] hover:text-[#AEEA00] transition-all duration-200 hover:scale-105"
                        style={{ boxShadow: '0 0 20px rgba(57, 255, 20, 0.2)' }}
                      >
                        <MailIcon className="w-5 h-5" />
                        ./copy-email.sh
                      </button>
                    </div>
                  </div>


                </div>

                {/* Hacker-style Footer */}
                <div className="mt-8 pt-6 border-t border-[#AEEA00]/30 text-center">
                  <p className="text-[#80CBC4] text-sm font-mono">
                    <span className="text-[#39FF14]">// </span>
                    <span className="animate-pulse text-[#AEEA00]">█</span> Ready to deploy? Let's build something amazing together!
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Custom CSS for unique effects */}
      <style jsx>{`
        .neon-glow {
          animation: neon-pulse 2s ease-in-out infinite alternate;
        }
        
        @keyframes neon-pulse {
          0% { 
            text-shadow: 0 0 10px #AEEA00, 0 0 20px #AEEA00, 0 0 40px #AEEA00;
          }
          100% { 
            text-shadow: 0 0 5px #AEEA00, 0 0 10px #AEEA00, 0 0 20px #AEEA00, 0 0 40px #39FF14;
          }
        }
        
        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        
        /* Blockchain hexagon pattern overlay */
        .blockchain-pattern {
          background-image: 
            radial-gradient(circle at 25% 25%, rgba(174, 234, 0, 0.1) 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, rgba(57, 255, 20, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        
        /* Terminal cursor blink */
        @keyframes terminal-blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        .terminal-cursor {
          animation: terminal-blink 1s infinite;
        }
        
        /* Glitch effect for extra uniqueness */
        .glitch-text {
          position: relative;
        }
        
        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
        }
        
        .glitch-text::before {
          animation: glitch-1 0.5s infinite linear alternate-reverse;
          color: #39FF14;
          z-index: -1;
        }
        
        .glitch-text::after {
          animation: glitch-2 0.5s infinite linear alternate-reverse;
          color: #AEEA00;
          z-index: -2;
        }
        
        @keyframes glitch-1 {
          0% { transform: translateX(0); }
          20% { transform: translateX(-2px); }
          40% { transform: translateX(-2px); }
          60% { transform: translateX(2px); }
          80% { transform: translateX(2px); }
          100% { transform: translateX(0); }
        }
        
        @keyframes glitch-2 {
          0% { transform: translateX(0); }
          20% { transform: translateX(2px); }
          40% { transform: translateX(2px); }
          60% { transform: translateX(-2px); }
          80% { transform: translateX(-2px); }
          100% { transform: translateX(0); }
        }
      `}</style>
      </section>

      {/* Bottom blockchain transition */}
      <div className="relative h-8 overflow-hidden" style={{ background: "#070f09" }}>
        <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-[#AEEA00]/30 to-transparent"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex gap-4 text-[#39FF14]/30 text-lg">
            <motion.span
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              ⬡
            </motion.span>
            <motion.span
              animate={{ rotate: [360, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              ⬢
            </motion.span>
            <motion.span
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            >
              ◊
            </motion.span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectShowcase;
