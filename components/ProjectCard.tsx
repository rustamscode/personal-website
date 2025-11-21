import React from 'react';
import { Project } from '../types';
import { motion } from 'framer-motion';
import { ArrowUpRight, FolderGit2 } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative flex flex-col h-full overflow-hidden rounded-2xl bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 transition-all duration-300 hover:shadow-2xl dark:hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.15)] hover:-translate-y-2 lg:hover:!opacity-100 lg:group-hover/list:opacity-50"
    >
      {/* Image Section */}
      <div className="relative w-full aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700/50">
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300 dark:text-slate-600 bg-slate-50 dark:bg-slate-900/50">
             <FolderGit2 className="w-16 h-16 opacity-20" />
          </div>
        )}
        
        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors duration-300" />
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {project.title}
            </h3>
            <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors group-hover:translate-x-1 group-hover:-translate-y-1 shrink-0" />
        </div>

        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 line-clamp-3 mb-6">
          {project.description}
        </p>

        {/* Tech Stack - Pushed to bottom */}
        <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-700/50">
           <div className="flex flex-wrap gap-2">
             {project.tech.map((tech, i) => (
               <span 
                 key={i} 
                 className="px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700/50 group-hover:border-blue-500/30 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors"
               >
                 {tech}
               </span>
             ))}
           </div>
        </div>
      </div>
    </motion.a>
  );
};

export default ProjectCard;