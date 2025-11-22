
import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExperienceItem } from '../types.ts';
import { Calendar, ArrowRight, Code2, Building2, Briefcase } from 'lucide-react';

interface ExperienceTabsProps {
  data: ExperienceItem[];
  labels: {
    technologies: string;
  };
}

// Define color themes for different experiences to make them distinct
// Adjusted borders and shadows to match TechStack transparency and subtlety
const THEMES = [
    {
        id: "vk",
        gradient: "from-blue-500/[0.1] via-cyan-500/[0.05] to-transparent",
        activeBorder: "border-blue-200 dark:border-blue-500/30",
        hoverBorder: "hover:border-blue-500/50 dark:hover:border-blue-400/50",
        activeText: "text-blue-600 dark:text-blue-400",
        activeBg: "bg-blue-50 dark:bg-blue-500/10",
        dotColor: "bg-blue-500",
        glow: "shadow-[0_0_20px_-5px_rgba(59,130,246,0.2)]",
        titleColor: "text-slate-900 dark:text-slate-100"
    },
    {
        id: "nda",
        gradient: "from-emerald-500/[0.1] via-teal-500/[0.05] to-transparent",
        activeBorder: "border-emerald-200 dark:border-emerald-500/30",
        hoverBorder: "hover:border-emerald-500/50 dark:hover:border-emerald-400/50",
        activeText: "text-emerald-600 dark:text-emerald-400",
        activeBg: "bg-emerald-50 dark:bg-emerald-500/10",
        dotColor: "bg-emerald-500",
        glow: "shadow-[0_0_20px_-5px_rgba(16,185,129,0.2)]",
        titleColor: "text-slate-900 dark:text-slate-100"
    },
    {
        id: "citi",
        gradient: "from-indigo-500/[0.1] via-purple-500/[0.05] to-transparent",
        activeBorder: "border-indigo-200 dark:border-indigo-500/30",
        hoverBorder: "hover:border-indigo-500/50 dark:hover:border-indigo-400/50",
        activeText: "text-indigo-600 dark:text-indigo-400",
        activeBg: "bg-indigo-50 dark:bg-indigo-500/10",
        dotColor: "bg-indigo-500",
        glow: "shadow-[0_0_20px_-5px_rgba(99,102,241,0.2)]",
        titleColor: "text-slate-900 dark:text-slate-100"
    }
];

const getTechCategoryColor = (tech: string) => {
    const t = tech.toLowerCase();
    
    // Languages -> Blue
    if (['java', 'kotlin', 'sql', 'javascript', 'typescript', 'lua', 'python', 'jee', 'java ee'].some(x => t.includes(x))) {
        return 'hover:bg-blue-100 dark:hover:bg-blue-900/40 hover:text-blue-700 dark:hover:text-blue-300 hover:border-blue-300 dark:hover:border-blue-700';
    }
    
    // Frameworks -> Green (Emerald)
    if (['spring', 'react', 'quarkus', 'hibernate', 'netty', 'tailwind', 'jpa', 'aop', 'rest'].some(x => t.includes(x))) {
        return 'hover:bg-emerald-100 dark:hover:bg-emerald-900/40 hover:text-emerald-700 dark:hover:text-emerald-300 hover:border-emerald-300 dark:hover:border-emerald-700';
    }
    
    // DevOps / Tools -> Yellow (Amber)
    if (['docker', 'kubernetes', 'jenkins', 'ci/cd', 'aws', 'gcp', 'cloud', 'oauth', 'security'].some(x => t.includes(x))) {
        return 'hover:bg-amber-100 dark:hover:bg-amber-900/40 hover:text-amber-700 dark:hover:text-amber-300 hover:border-amber-300 dark:hover:border-amber-700';
    }
    
    // Data / Queues -> Purple
    if (['kafka', 'redis', 'postgres', 'database', 'mongo', 'elasticsearch', 'protobuf', 'avro', 'oracle', 'db'].some(x => t.includes(x))) {
        return 'hover:bg-purple-100 dark:hover:bg-purple-900/40 hover:text-purple-700 dark:hover:text-purple-300 hover:border-purple-300 dark:hover:border-purple-700';
    }
    
    // Default
    return 'hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-200 hover:border-slate-400';
};

interface ExperienceCard3DProps {
    item: ExperienceItem;
    labels: { technologies: string };
    theme: typeof THEMES[0];
}

const ExperienceCard3D: React.FC<ExperienceCard3DProps> = ({ item, labels, theme }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });
  
    // Reduced tilt significantly as requested (approx 1 degree)
    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["2deg", "-2deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-2deg", "2deg"]);
  
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

    return (
        <motion.div 
            style={{ perspective: 1000 }} 
            className="w-full h-full"
            initial={{ opacity: 0, scale: 0.95, rotateY: 5 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.95, rotateY: -5, transition: { duration: 0.2 } }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className={`
                    relative w-full h-full rounded-3xl border 
                    bg-white dark:bg-slate-800/60 backdrop-blur-xl
                    ${theme.activeBorder}
                    ${theme.hoverBorder}
                    p-6 sm:p-8 shadow-xl dark:shadow-[0_0_40px_-10px_rgba(0,0,0,0.3)] 
                    flex flex-col overflow-hidden transition-colors duration-500
                `}
            >
                {/* Colorful Gradient Background (Reduced opacity) */}
                <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-100 transition-colors duration-500 -z-10`} />
                
                {/* Decorative Glow (Reduced opacity from 10 to 5) */}
                <div className={`absolute -top-20 -right-20 w-64 h-64 rounded-full blur-[100px] opacity-10 pointer-events-none ${theme.dotColor}`} />

                {/* Header */}
                <div className="mb-8 border-b border-slate-100 dark:border-slate-700/50 pb-6 relative" style={{ transform: "translateZ(20px)" }}>
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                            <div className="relative group">
                                <div className={`absolute -inset-2 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity ${theme.dotColor}`} />
                                <img 
                                    src={item.logo} 
                                    alt={item.company} 
                                    className="relative w-14 h-14 rounded-xl object-cover shadow-lg border border-slate-100 dark:border-slate-700 bg-white"
                                />
                            </div>
                            <div>
                                <h3 className={`text-2xl font-bold leading-tight mb-1 ${theme.titleColor}`}>
                                    {item.role}
                                </h3>
                                <div className={`flex items-center gap-2 font-bold ${theme.activeText}`}>
                                    <Building2 className="w-4 h-4" />
                                    <span>{item.company}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex self-start items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 dark:bg-slate-700/40 text-xs font-bold text-slate-500 dark:text-slate-300 uppercase tracking-wider border border-slate-200 dark:border-slate-600 shadow-sm backdrop-blur-sm">
                            <Calendar className="w-3.5 h-3.5" />
                            {item.duration}
                        </div>
                    </div>
                </div>

                {/* Body */}
                <div className="flex-1 mb-8 relative" style={{ transform: "translateZ(30px)" }}>
                    <ul className="space-y-4">
                        {item.description.split('. ').filter(Boolean).map((sentence, i) => (
                            <motion.li 
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 + (i * 0.1), duration: 0.3 }}
                                className="flex items-start gap-3 text-slate-600 dark:text-slate-300 leading-relaxed font-medium"
                            >
                                <div className={`mt-2.5 min-w-[6px] h-[6px] rounded-full ${theme.dotColor} shadow-sm`} />
                                <span>{sentence.trim()}{sentence.trim().endsWith('.') ? '' : '.'}</span>
                            </motion.li>
                        ))}
                    </ul>
                </div>

                {/* Footer: Tech Stack */}
                <div className="mt-auto" style={{ transform: "translateZ(25px)" }}>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                        <Code2 className="w-4 h-4" />
                        <span>{labels.technologies}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {item.skills.map((skill, i) => (
                            <motion.span 
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 + (i * 0.05) }}
                                className={`
                                    px-3 py-1.5 text-xs font-bold rounded-lg border transition-all duration-300 hover:scale-105 cursor-default
                                    bg-white/50 dark:bg-white/5 backdrop-blur-sm
                                    border-slate-200 dark:border-slate-700/50
                                    text-slate-600 dark:text-slate-400
                                    ${getTechCategoryColor(skill)}
                                `}
                            >
                                {skill}
                            </motion.span>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}

const ExperienceTabs: React.FC<ExperienceTabsProps> = ({ data, labels }) => {
  const [selected, setSelected] = useState(0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
      {/* Navigation (Timeline) */}
      <div className="lg:col-span-4 flex flex-col order-2 lg:order-1">
         {/* Timeline Container */}
         <div className="relative pl-8 lg:pl-0 lg:pr-8 space-y-2 lg:space-y-4 border-l-2 border-slate-200 dark:border-slate-800 lg:border-l-0 lg:border-r-2">
             {data.map((item, idx) => {
                 const isActive = selected === idx;
                 const theme = THEMES[idx % THEMES.length];
                 
                 return (
                     <button
                        key={idx}
                        onClick={() => setSelected(idx)}
                        className={`group relative w-full text-left p-4 rounded-2xl transition-all duration-300 border outline-none overflow-hidden
                            ${isActive 
                                ? `bg-white dark:bg-slate-800 shadow-lg ${theme.activeBorder} lg:translate-x-2` 
                                : 'bg-transparent border-transparent hover:bg-slate-100 dark:hover:bg-slate-800/30'
                            }
                        `}
                     >
                         {/* Background Highlight for Active State */}
                         {isActive && (
                            <div className={`absolute inset-0 opacity-5 ${theme.dotColor}`} />
                         )}

                        {/* Timeline Dot */}
                        <div className={`
                            absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-[3px] transition-all duration-500 z-10
                            -left-[41px] lg:left-auto lg:-right-[41px]
                            ${isActive 
                                ? `${theme.dotColor} border-white dark:border-slate-900 scale-110 ${theme.glow}` 
                                : 'bg-slate-200 dark:bg-slate-800 border-slate-300 dark:border-slate-600 group-hover:border-slate-400'
                            }
                        `} />

                        {/* Connector Line */}
                        <AnimatePresence>
                            {isActive && (
                                <motion.div 
                                    layoutId="activeConnector"
                                    className={`absolute top-1/2 -translate-y-1/2 h-[2px] z-0
                                        -left-[35px] w-[35px] lg:left-auto lg:-right-[35px] lg:w-[35px]
                                        ${theme.dotColor}
                                    `}
                                    initial={{ scaleX: 0, opacity: 0 }}
                                    animate={{ scaleX: 1, opacity: 1 }}
                                    exit={{ scaleX: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                />
                            )}
                        </AnimatePresence>

                         <div className="relative z-10">
                            <div className="flex items-center justify-between mb-1">
                                <span className={`font-bold text-xs uppercase tracking-wider transition-colors ${isActive ? theme.activeText : 'text-slate-500'}`}>
                                    {item.duration.split('—')[0].trim()}
                                </span>
                                {isActive && (
                                    <motion.div 
                                        layoutId="activeArrow" 
                                        className={theme.activeText}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <ArrowRight className="w-4 h-4" />
                                    </motion.div>
                                )}
                            </div>
                            
                            <div className={`font-bold text-lg mb-1 transition-colors ${isActive ? theme.titleColor : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200'}`}>
                                {item.company}
                            </div>

                            <div className="text-xs font-medium text-slate-500 dark:text-slate-500 truncate flex items-center gap-1.5">
                                <Briefcase className="w-3 h-3" />
                                {item.role}
                            </div>
                         </div>
                     </button>
                 )
             })}
         </div>
      </div>

      {/* Content Panel */}
      <div className="lg:col-span-8 min-h-[500px] order-1 lg:order-2 mb-8 lg:mb-0">
        <AnimatePresence mode="wait">
            <ExperienceCard3D 
                key={selected} 
                item={data[selected]} 
                labels={labels} 
                theme={THEMES[selected % THEMES.length]} 
            />
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ExperienceTabs;