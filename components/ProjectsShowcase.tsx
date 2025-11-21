import React, { useState } from 'react';
import { Project } from '../types';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Layers, ExternalLink, Github, Zap, ShieldCheck, Globe, Database, Terminal } from 'lucide-react';

interface ProjectsShowcaseProps {
  projects: Project[];
}

const PROJECT_ICONS = [
  { 
    icon: Zap, 
    baseColor: "amber",
    color: "text-amber-600 dark:text-amber-400", 
    bg: "bg-amber-100 dark:bg-amber-500/20",
    border: "group-hover:border-amber-500/50",
    label: "High Load"
  },
  { 
    icon: ShieldCheck, 
    baseColor: "emerald",
    color: "text-emerald-600 dark:text-emerald-400", 
    bg: "bg-emerald-100 dark:bg-emerald-500/20",
    border: "group-hover:border-emerald-500/50",
    label: "Security"
  },
  { 
    icon: Globe, 
    baseColor: "purple",
    color: "text-purple-600 dark:text-purple-400", 
    bg: "bg-purple-100 dark:bg-purple-500/20",
    border: "group-hover:border-purple-500/50",
    label: "Infrastructure"
  },
  { 
    icon: Database, 
    baseColor: "blue",
    color: "text-blue-600 dark:text-blue-400", 
    bg: "bg-blue-100 dark:bg-blue-500/20",
    border: "group-hover:border-blue-500/50",
    label: "Data Systems"
  },
  { 
    icon: Terminal, 
    baseColor: "pink",
    color: "text-pink-600 dark:text-pink-400", 
    bg: "bg-pink-100 dark:bg-pink-500/20",
    border: "group-hover:border-pink-500/50",
    label: "Backend"
  }
];

const getTechCategoryColor = (tech: string) => {
    const t = tech.toLowerCase();
    
    // Languages -> Blue
    if (['java', 'kotlin', 'sql', 'javascript', 'typescript', 'lua', 'python'].some(x => t.includes(x))) {
        return 'hover:bg-blue-100 dark:hover:bg-blue-900/40 hover:text-blue-700 dark:hover:text-blue-300 hover:border-blue-300 dark:hover:border-blue-700';
    }
    
    // Frameworks -> Green (Emerald)
    if (['spring', 'react', 'quarkus', 'hibernate', 'netty', 'tailwind', 'jpa', 'aop'].some(x => t.includes(x))) {
        return 'hover:bg-emerald-100 dark:hover:bg-emerald-900/40 hover:text-emerald-700 dark:hover:text-emerald-300 hover:border-emerald-300 dark:hover:border-emerald-700';
    }
    
    // DevOps / Tools -> Yellow (Amber)
    if (['docker', 'kubernetes', 'jenkins', 'ci/cd', 'aws', 'gcp', 'cloud', 'oauth2'].some(x => t.includes(x))) {
        return 'hover:bg-amber-100 dark:hover:bg-amber-900/40 hover:text-amber-700 dark:hover:text-amber-300 hover:border-amber-300 dark:hover:border-amber-700';
    }
    
    // Data / Queues -> Purple
    if (['kafka', 'redis', 'postgres', 'database', 'mongo', 'elasticsearch', 'protobuf', 'avro'].some(x => t.includes(x))) {
        return 'hover:bg-purple-100 dark:hover:bg-purple-900/40 hover:text-purple-700 dark:hover:text-purple-300 hover:border-purple-300 dark:hover:border-purple-700';
    }
    
    // Default
    return 'hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-200';
};

interface ProjectMainCardProps {
    project: Project;
    styleDef: typeof PROJECT_ICONS[0];
}

const ProjectMainCard: React.FC<ProjectMainCardProps> = ({ project, styleDef }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useSpring(x, { stiffness: 500, damping: 90 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 90 });

    // Tilt range
    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["8deg", "-8deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-8deg", "8deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const xPct = (e.clientX - rect.left) / width - 0.5;
        const yPct = (e.clientY - rect.top) / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const Icon = styleDef.icon;

    return (
        <motion.div
            style={{ perspective: 2000 }}
            className="relative w-full"
        >
             {/* Dynamic ambient glow based on category */}
            <div 
                className={`absolute -inset-4 bg-${styleDef.baseColor}-500/20 dark:bg-${styleDef.baseColor}-500/10 blur-3xl rounded-[3rem] transition-colors duration-500 -z-10 opacity-50 lg:opacity-70`} 
            />

            <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className={`
                    relative overflow-hidden rounded-3xl bg-white dark:bg-slate-800/80 backdrop-blur-xl
                    border border-slate-200 dark:border-slate-700/60 
                    shadow-2xl dark:shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)] 
                    transition-all duration-200 group
                `}
            >
                 {/* Grid Layout */}
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[450px]">
                    
                    {/* Text Content Side */}
                    <div className="p-8 lg:p-10 flex flex-col relative z-10" style={{ transform: "translateZ(20px)" }}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={project.title}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3 }}
                                className="flex flex-col h-full"
                            >
                                {/* Header Chip */}
                                <div className="flex items-center gap-3 mb-6" style={{ transform: "translateZ(20px)" }}>
                                    <div className={`flex items-center justify-center w-10 h-10 rounded-xl ${styleDef.bg} ${styleDef.color} transition-colors duration-300 shadow-sm ring-1 ring-inset ring-white/10`}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <span className="text-xs font-bold tracking-widest uppercase text-slate-500 dark:text-slate-400">
                                        {styleDef.label}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4 leading-tight" style={{ transform: "translateZ(30px)" }}>
                                    {project.title}
                                </h3>

                                {/* Description */}
                                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-8" style={{ transform: "translateZ(25px)" }}>
                                    {project.description}
                                </p>

                                {/* Tech Stack (Interactive) */}
                                <div className="mb-10" style={{ transform: "translateZ(40px)" }}>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map((tech, i) => {
                                            const hoverClass = getTechCategoryColor(tech);
                                            return (
                                                <span 
                                                    key={i} 
                                                    className={`
                                                        px-3 py-1.5 text-sm font-medium rounded-lg border border-slate-200 dark:border-slate-700/50
                                                        bg-slate-100/80 dark:bg-slate-700/30 text-slate-600 dark:text-slate-300
                                                        cursor-default transition-all duration-200
                                                        ${hoverClass}
                                                    `}
                                                >
                                                    {tech}
                                                </span>
                                            )
                                        })}
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-700/50 flex gap-4" style={{ transform: "translateZ(35px)" }}>
                                    {project.link && (
                                        <a 
                                            href={project.link} 
                                            target="_blank" 
                                            rel="noreferrer"
                                            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-600/20 active:scale-95"
                                        >
                                            <span>View Project</span>
                                            <ExternalLink className="w-4 h-4" />
                                        </a>
                                    )}
                                    <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-transparent border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95 hover:text-slate-900 dark:hover:text-white">
                                        <Github className="w-4 h-4" />
                                        <span>Source</span>
                                    </button>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Image Side */}
                    <div className="relative h-64 lg:h-auto overflow-hidden bg-slate-100 dark:bg-slate-900/50 border-b lg:border-b-0 lg:border-l border-slate-200 dark:border-slate-700/50 group-hover:border-blue-500/10 transition-colors">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={project.title}
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.4 }}
                                className="absolute inset-0"
                                style={{ transform: "translateZ(10px)" }}
                            >
                                {project.imageUrl ? (
                                    <div className="w-full h-full relative">
                                        <img 
                                            src={project.imageUrl} 
                                            alt={project.title} 
                                            className="w-full h-full object-cover"
                                        />
                                        {/* Subtle Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/20 to-transparent mix-blend-overlay" />
                                    </div>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <Layers className="w-20 h-20 text-slate-300 dark:text-slate-700 opacity-50" />
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                 </div>
            </motion.div>
        </motion.div>
    );
};

const ProjectsShowcase: React.FC<ProjectsShowcaseProps> = ({ projects }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeProject = projects[activeIndex];
  const activeStyle = PROJECT_ICONS[activeIndex % PROJECT_ICONS.length];

  return (
    <div className="space-y-8">
      {/* Enhanced 3D Card */}
      <ProjectMainCard project={activeProject} styleDef={activeStyle} />

      {/* Compact Project Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {projects.map((project, idx) => {
           const isActive = activeIndex === idx;
           const style = PROJECT_ICONS[idx % PROJECT_ICONS.length];
           const Icon = style.icon;
           
           return (
             <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`
                    group flex items-center gap-3 p-3 pr-4 rounded-xl border transition-all duration-300 outline-none
                    ${isActive 
                        ? `bg-white dark:bg-slate-800 shadow-lg ${style.border} ring-1 ring-${style.baseColor}-500/20 scale-[1.02]` 
                        : 'bg-white dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600'
                    }
                `}
             >
                <div className={`
                    flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 shrink-0
                    ${isActive 
                        ? `${style.bg} ${style.color} scale-105` 
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 group-hover:scale-105 group-hover:bg-slate-200 dark:group-hover:bg-slate-700'
                    }
                `}>
                    <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'rotate-0' : 'group-hover:-rotate-12'}`} />
                </div>

                <div className="text-left overflow-hidden">
                    <div className={`text-[10px] font-bold uppercase tracking-wider mb-0.5 transition-colors ${isActive ? style.color : 'text-slate-400 dark:text-slate-500'}`}>
                        {style.label}
                    </div>
                    <div className={`text-sm font-bold truncate transition-colors ${isActive ? 'text-slate-900 dark:text-slate-100' : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200'}`}>
                        {project.title}
                    </div>
                </div>
             </button>
           );
        })}
      </div>
    </div>
  );
};

export default ProjectsShowcase;