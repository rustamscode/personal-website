import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Database, Layers, Code2, Server } from 'lucide-react';

const techCategories = [
  {
    id: 'languages',
    title: 'Languages',
    icon: Code2,
    skills: ['Java', 'Kotlin', 'SQL'],
    color: 'blue',
    bgPattern: 'radial-gradient(circle at top right, rgba(59, 130, 246, 0.15), transparent 50%)'
  },
  {
    id: 'frameworks',
    title: 'Frameworks',
    icon: Layers,
    skills: ['Spring', 'Quarkus', 'Hibernate'],
    color: 'emerald',
    bgPattern: 'radial-gradient(circle at top left, rgba(16, 185, 129, 0.15), transparent 50%)'
  },
  {
    id: 'data',
    title: 'Data & Queues',
    icon: Database,
    skills: ['PostgreSQL', 'Redis', 'Kafka'],
    color: 'purple',
    bgPattern: 'radial-gradient(circle at bottom right, rgba(168, 85, 247, 0.15), transparent 50%)'
  },
  {
    id: 'devops',
    title: 'DevOps',
    icon: Server,
    skills: ['Docker', 'Kubernetes', 'CI/CD'],
    color: 'amber',
    bgPattern: 'radial-gradient(circle at bottom left, rgba(245, 158, 11, 0.15), transparent 50%)'
  }
];

const getTheme = (color: string) => {
  const themes: Record<string, any> = {
    blue: {
      cardBorder: 'border-slate-200 dark:border-slate-800',
      hoverBorder: 'hover:border-blue-500/50 dark:hover:border-blue-400/50',
      iconBg: 'bg-blue-100 dark:bg-blue-500/20',
      iconColor: 'text-blue-600 dark:text-blue-400',
      tagBase: 'text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700/50',
      tagHover: 'hover:text-blue-600 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-500/20 hover:border-blue-200 dark:hover:border-blue-500/30',
      shadow: 'hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.2)]'
    },
    emerald: {
      cardBorder: 'border-slate-200 dark:border-slate-800',
      hoverBorder: 'hover:border-emerald-500/50 dark:hover:border-emerald-400/50',
      iconBg: 'bg-emerald-100 dark:bg-emerald-500/20',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      tagBase: 'text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700/50',
      tagHover: 'hover:text-emerald-600 dark:hover:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-500/20 hover:border-emerald-200 dark:hover:border-emerald-500/30',
      shadow: 'hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.2)]'
    },
    purple: {
      cardBorder: 'border-slate-200 dark:border-slate-800',
      hoverBorder: 'hover:border-purple-500/50 dark:hover:border-purple-400/50',
      iconBg: 'bg-purple-100 dark:bg-purple-500/20',
      iconColor: 'text-purple-600 dark:text-purple-400',
      tagBase: 'text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700/50',
      tagHover: 'hover:text-purple-600 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-500/20 hover:border-purple-200 dark:hover:border-purple-500/30',
      shadow: 'hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.2)]'
    },
    amber: {
      cardBorder: 'border-slate-200 dark:border-slate-800',
      hoverBorder: 'hover:border-amber-500/50 dark:hover:border-amber-400/50',
      iconBg: 'bg-amber-100 dark:bg-amber-500/20',
      iconColor: 'text-amber-600 dark:text-amber-400',
      tagBase: 'text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700/50',
      tagHover: 'hover:text-amber-600 dark:hover:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-500/20 hover:border-amber-200 dark:hover:border-amber-500/30',
      shadow: 'hover:shadow-[0_0_30px_-5px_rgba(245,158,11,0.2)]'
    }
  };
  return themes[color] || themes.blue;
};

const TechCard: React.FC<{ category: typeof techCategories[0]; index: number }> = ({ category, index }) => {
  const theme = getTheme(category.color);
  const Icon = category.icon;

  // 3D Tilt Effect Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  // Stronger tilt range for more dramatic effect
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    
    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="h-full"
      style={{ perspective: 1000 }}
    >
      <motion.div
        style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`
          group
          h-full flex flex-col p-6
          bg-white dark:bg-slate-800/40 backdrop-blur-md
          rounded-2xl border
          ${theme.cardBorder}
          ${theme.hoverBorder}
          transition-all duration-300
          relative overflow-hidden
          hover:shadow-2xl ${theme.shadow}
        `}
      >
         {/* Background Pattern (Static) */}
         <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ background: category.bgPattern, transform: "translateZ(0)" }}
        />

        {/* Header (Popped out significantly) */}
        <div className="flex items-center gap-4 mb-6 relative z-10" style={{ transform: "translateZ(30px)" }}>
            <div className={`p-3 rounded-xl ${theme.iconBg} ${theme.iconColor} shadow-sm ring-1 ring-inset ring-white/10`}>
                <Icon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                {category.title}
            </h3>
        </div>

        {/* Skills Grid (Popped out) */}
        <div className="flex flex-wrap gap-2.5 relative z-10 mt-auto" style={{ transform: "translateZ(20px)" }}>
          {category.skills.map((skill, i) => (
            <span 
              key={i}
              className={`
                px-3 py-1.5 text-[13px] font-bold rounded-lg border transition-all duration-200
                bg-slate-50/80 dark:bg-white/5 backdrop-blur-sm
                ${theme.tagBase}
                ${theme.tagHover}
                cursor-default
                shadow-sm
              `}
            >
              {skill}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

const TechStack: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {techCategories.map((category, idx) => (
        <TechCard key={category.id} category={category} index={idx} />
      ))}
    </div>
  );
};

export default TechStack;