"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getProjectById, Project } from "@/data/projects";

/**
 * Project Detail Page
 * 
 * Displays comprehensive information about a single project.
 * Includes hero image, description, features, tech stack, and external links.
 * Follows Apple Human Interface Guidelines for a clean, modern aesthetic.
 */
export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Fetch project data on mount
  useEffect(() => {
    const id = params.id as string;
    const foundProject = getProjectById(id);
    
    if (foundProject) {
      setProject(foundProject);
    } else {
      // Redirect to home if project not found
      router.push("/#projects");
    }
  }, [params.id, router]);

  // Loading state
  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <motion.div
          className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  // Status badge color mapping
  const statusColors = {
    live: "bg-green-500/20 text-green-400 border-green-500/30",
    development: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    archived: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  };

  // Status display text
  const statusText = {
    live: "Live",
    development: "In Development",
    archived: "Archived",
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-700/10 rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-blue-700/10 rounded-full filter blur-3xl" />
      </div>

      {/* Navigation bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/5">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Back button */}
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
            >
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                whileHover={{ x: -3 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </motion.svg>
              <span className="font-medium">Back to Projects</span>
            </Link>

            {/* Project title (hidden on mobile) */}
            <span className="hidden sm:block text-sm text-gray-500 font-medium">
              {project.title}
            </span>

            {/* External link (if available) */}
            {project.url && project.url !== "#" && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600/20 hover:bg-purple-600/40 rounded-lg text-purple-300 hover:text-white transition-all border border-purple-500/20"
              >
                <span className="hidden sm:inline">Visit Site</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            )}
          </div>
        </div>
      </nav>

      {/* Hero section with project image */}
      <section className="pt-20 relative">
        <motion.div
          className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-purple-900/10 to-transparent z-10" />
          
          {/* Placeholder while image loads */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-purple-600/20 animate-pulse" />
            </div>
          )}

          {/* Project image */}
          {project.image && (
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-center"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              onLoad={() => setImageLoaded(true)}
            />
          )}
        </motion.div>
      </section>

      {/* Content section */}
      <section className="relative z-20 -mt-20 sm:-mt-32">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          {/* Title and metadata card */}
          <motion.div
            className="bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-purple-500/10 p-6 sm:p-8 shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Header row with title and status */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                {project.title}
              </h1>
              
              {/* Status and year badges */}
              <div className="flex items-center gap-3">
                {project.status && (
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[project.status]}`}>
                    {statusText[project.status]}
                  </span>
                )}
                {project.year && (
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-800 text-gray-400 border border-gray-700">
                    {project.year}
                  </span>
                )}
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-purple-900/30 rounded-full text-sm text-purple-300 border border-purple-500/20"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Short description */}
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
              {project.description}
            </p>
          </motion.div>

          {/* Long description */}
          {project.longDescription && (
            <motion.div
              className="mt-8 bg-gray-900/60 backdrop-blur-xl rounded-2xl border border-purple-500/10 p-6 sm:p-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                About This Project
              </h2>
              <div className="text-gray-400 leading-relaxed whitespace-pre-line">
                {project.longDescription}
              </div>
            </motion.div>
          )}

          {/* Features and Tech Stack grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* Features */}
            {project.features && project.features.length > 0 && (
              <motion.div
                className="bg-gray-900/60 backdrop-blur-xl rounded-2xl border border-purple-500/10 p-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Key Features
                </h2>
                <ul className="space-y-3">
                  {project.features.map((feature, index) => (
                    <motion.li
                      key={feature}
                      className="flex items-start gap-3 text-gray-400"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Tech Stack */}
            {project.techStack && project.techStack.length > 0 && (
              <motion.div
                className="bg-gray-900/60 backdrop-blur-xl rounded-2xl border border-purple-500/10 p-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  Tech Stack
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, index) => (
                    <motion.span
                      key={tech}
                      className="px-3 py-2 bg-gray-800/80 rounded-lg text-sm text-gray-300 border border-gray-700/50"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Call to action buttons */}
          <motion.div
            className="mt-8 mb-16 flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {/* Visit site button (if available) */}
            {project.url && project.url !== "#" && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-xl text-white font-medium transition-all shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
              >
                <span>Visit Live Site</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            )}

            {/* Back to all projects */}
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gray-800/80 hover:bg-gray-700/80 rounded-xl text-gray-300 hover:text-white font-medium transition-all border border-gray-700/50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
              <span>All Projects</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
