import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, Users, Globe, Briefcase, Sparkles } from 'lucide-react';

interface Highlight {
    title: string;
    value: string;
    desc: string;
    icon: string;
}

interface AboutSectionProps {
    bio: string[];
    highlights: Highlight[];
}

const ICON_MAP: Record<string, React.ElementType> = {
    "Briefcase": Briefcase,
    "Users": Users,
    "Server": Server,
    "Globe": Globe
};

// Colorful themes for each highlight category
const THEME_MAP: Record<string, { 
    bg: string; 
    hoverBg: string; 
    border: string; 
    hoverBorder: string;
    iconBg: string;
    iconColor: string;
    valueColor: string;
}> = {
    "Briefcase": {
        bg: "bg-blue-50 dark:bg-blue-500/5",
        hoverBg: "hover:bg-blue-100 dark:hover:bg-blue-500/20",
        border: "border-blue-100 dark:border-blue-500/20",
        hoverBorder: "hover:border-blue-300 dark:hover:border-blue-500/40",
        iconBg: "bg-blue-100 dark:bg-blue-500/20",
        iconColor: "text-blue-600 dark:text-blue-400",
        valueColor: "text-blue-900 dark:text-blue-100"
    },
    "Users": {
        bg: "bg-purple-50 dark:bg-purple-500/5",
        hoverBg: "hover:bg-purple-100 dark:hover:bg-purple-500/20",
        border: "border-purple-100 dark:border-purple-500/20",
        hoverBorder: "hover:border-purple-300 dark:hover:border-purple-500/40",
        iconBg: "bg-purple-100 dark:bg-purple-500/20",
        iconColor: "text-purple-600 dark:text-purple-400",
        valueColor: "text-purple-900 dark:text-purple-100"
    },
    "Server": {
        bg: "bg-emerald-50 dark:bg-emerald-500/5",
        hoverBg: "hover:bg-emerald-100 dark:hover:bg-emerald-500/20",
        border: "border-emerald-100 dark:border-emerald-500/20",
        hoverBorder: "hover:border-emerald-300 dark:hover:border-emerald-500/40",
        iconBg: "bg-emerald-100 dark:bg-emerald-500/20",
        iconColor: "text-emerald-600 dark:text-emerald-400",
        valueColor: "text-emerald-900 dark:text-emerald-100"
    },
    "Globe": {
        bg: "bg-amber-50 dark:bg-amber-500/5",
        hoverBg: "hover:bg-amber-100 dark:hover:bg-amber-500/20",
        border: "border-amber-100 dark:border-amber-500/20",
        hoverBorder: "hover:border-amber-300 dark:hover:border-amber-500/40",
        iconBg: "bg-amber-100 dark:bg-amber-500/20",
        iconColor: "text-amber-600 dark:text-amber-400",
        valueColor: "text-amber-900 dark:text-amber-100"
    }
};

const HighlightCard: React.FC<{ item: Highlight; index: number }> = ({ item, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    const Icon = ICON_MAP[item.icon] || Briefcase;
    const theme = THEME_MAP[item.icon] || THEME_MAP["Briefcase"];
    
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, layout: { duration: 0.3, type: "spring", bounce: 0, damping: 25, stiffness: 150 } }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className={`
                relative flex flex-col p-5 rounded-2xl border transition-colors duration-300 cursor-default overflow-hidden
                ${theme.bg} ${theme.hoverBg} ${theme.border} ${theme.hoverBorder}
            `}
        >
            <motion.div layout="position" className="flex flex-col gap-1">
                <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${theme.iconBg} ${theme.iconColor}`}>
                        <Icon className="w-4 h-4" />
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-widest opacity-80 ${theme.valueColor}`}>
                        {item.title}
                    </span>
                </div>
                
                <div className={`text-2xl font-extrabold tracking-tight ${theme.valueColor}`}>
                    {item.value}
                </div>
            </motion.div>
            
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-300 leading-relaxed">
                            {item.desc}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const AboutSection: React.FC<AboutSectionProps> = ({ bio, highlights }) => {
  return (
    <div className="flex flex-col gap-8">
      {/* Bio Section - Clean Professional Style */}
      <div className="relative group rounded-2xl bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 p-8 sm:p-12 shadow-sm hover:shadow-md transition-shadow duration-300">
        
        {/* Subtle decorative accent */}
        <div className="absolute top-12 left-0 w-1 h-24 bg-gradient-to-b from-blue-500 to-transparent rounded-r-full opacity-70" />
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl opacity-50" />

        <div className="relative z-10 space-y-6">
            {/* Optional Title/Icon to ground the section */}
            <div className="flex items-center gap-2 mb-2 text-blue-600 dark:text-blue-400">
                <Sparkles className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-widest">About Me</span>
            </div>

             {bio.map((paragraph, i) => (
                 <p key={i} className="text-lg text-slate-600 dark:text-slate-300 leading-8 font-light">
                    {paragraph.split(/(Citibank|VK|Java|Kotlin|JVM|Spring Boot)/g).map((part, idx) => {
                        if (['Citibank', 'VK'].includes(part)) {
                            return (
                                <span key={idx} className="font-bold text-slate-900 dark:text-slate-100 decoration-blue-500/30 decoration-2 underline-offset-4 hover:decoration-blue-500 transition-all cursor-default">
                                    {part}
                                </span>
                            );
                        }
                        if (['Java', 'Kotlin', 'JVM', 'Spring Boot'].includes(part)) {
                            return <span key={idx} className="font-semibold text-blue-600 dark:text-blue-400 px-1 py-0.5 rounded bg-blue-50 dark:bg-blue-500/10 hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-colors cursor-default">{part}</span>;
                        }
                        return <span key={idx}>{part}</span>;
                    })}
                 </p>
             ))}
         </div>
      </div>

      {/* Highlights Grid - Clean & Colorful & Expandable */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
          {highlights.map((item, index) => (
              <HighlightCard key={index} item={item} index={index} />
          ))}
      </div>
    </div>
  );
};

export default AboutSection;