"use client";

import { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;
  tags: string[];
}

const projects: Project[] = [
  {
    id: "gamecup",
    title: "GameCup.io",
    description: "The ultimate Web3 platform for competitive gamers to join tournaments and win crypto rewards. Built with real-time tournament system and Solana blockchain integration.",
    image: "/projects/gamecup.png",
    url: "https://gamecup.io/",
    tags: ["Web3", "Solana", "Gaming", "Tournaments", "Crypto Rewards", "Real-time"],
  },
  {
    id: "oxskyt",
    title: "OXS KYT",
    description: "Advanced crypto wallet risk assessment platform with real-time blockchain analysis. Provides detailed risk scoring for cryptocurrency wallets with multi-chain support.",
    image: "/projects/oxskyt.png",
    url: "https://oxskyt.com/",
    tags: ["Web3", "Blockchain", "Risk Assessment", "Crypto Analytics", "Multi-chain", "Security"],
  },
  {
    id: "oxs-games",
    title: "OXS Games Dashboard",
    description: "A feature-rich gaming dashboard with asset management and game analytics. Built with Next.js and integrated blockchain functionalities.",
    image: "/projects/speedverse-dashboard-banner.png",
    url: "https://dashboard.oxs.games/login",
    tags: ["Next.js", "Dashboard", "Blockchain", "Web3"],
  },
  {
    id: "rudolph-ai",
    title: "Rudolph Web3 Game",
    description: "Interactive leaderboard system for a Web3 game, showcasing real-time data and user engagement. Built with React and integrated with Solana blockchain.",
    image: "/projects/rudolph-banner.png",
    url: "https://rudolphai.com/leaderboard",
    tags: ["React", "Web3", "Dashboard", "dApp","Solana","Blockchain"],
  },
  {
    id: "vaultech",
    title: "Vaultech Digital",
    description: "Premium website with modern UI/UX design for a game development and blockchain company",
    image: "/projects/vaultech.png",
    url: "https://vaultechdigital.com/",
    tags: ["Animation", "Corporate"],
  },
  {
    id: "mako-food",
    title: "Mako Food Trading",
    description: "Professional website for an international food distribution company with elegant animations and responsive design.",
    image: "/projects/makofood-banner.png",
    url: "https://makofood.com/",
    tags: ["E-commerce", "Animation", "Responsive", "Business"],
  },
];

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values for tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Transform values based on mouse position
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent) => {
    // Only enable 3D effect on larger screens
    if (window.innerWidth < 768 || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <motion.a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.02 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative bg-gradient-to-br from-gray-900/80 via-gray-900 to-black/90 rounded-2xl border border-purple-500/10 overflow-hidden h-full shadow-xl">
          {/* Project Image */}
          <div className="relative h-48 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-600/20 to-transparent mix-blend-overlay z-10" />
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
              <div className="w-16 h-16 rounded-full bg-purple-600/20 animate-pulse" />
            </div>
            {project.image && (
              <div
                className="relative h-full w-full"
                style={{ transform: "translateZ(10px)" }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${project.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
              </div>
            )}
          </div>

          {/* Project Content */}
          <div className="p-6" style={{ transform: "translateZ(20px)" }}>
            <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
            <p className="text-gray-400 text-sm mb-4">{project.description}</p>

            <div className="flex flex-wrap gap-2 mt-auto">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-purple-900/30 rounded-full text-xs text-purple-300 border border-purple-500/20"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-5 flex justify-between items-center">
              <motion.span
                className="inline-flex items-center text-sm text-purple-400 font-medium"
                whileHover={{ x: 3 }}
              >
                Visit Project
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </motion.span>
            </div>
          </div>

          {/* Overlay for hover effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/10 via-transparent to-blue-600/5 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
        </div>
      </motion.a>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-16 sm:py-24 bg-gradient-to-b from-black/90 to-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-purple-700/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-blue-700/10 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold inline-block bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent mb-2">Projects</h2>
          <motion.div
            className="h-0.5 sm:h-1 w-0 bg-gradient-to-r from-purple-400 to-blue-500 mx-auto"
            animate={{ width: "100px" }}
            transition={{ duration: 1, delay: 0.3 }}
          />
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto text-base sm:text-lg">
            Explore some of my recent work across different technologies and industries
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <a
            href="https://github.com/erayucar"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600/80 to-blue-600/80 rounded-xl text-white font-medium transition-all hover:from-purple-600 hover:to-blue-600"
          >
            <span>See More on GitHub</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;