
import React from 'react';
import { Achievement } from '../types.ts';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

interface AchievementCardProps {
  achievement: Achievement;
  index: number;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 hover:border-blue-500/30 transition-all hover:shadow-lg dark:hover:shadow-none hover:-translate-y-1"
    >
      {/* Background Gradient on Hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative z-10">
        {/* Header: Icon & Year */}
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-500">
             <Trophy className="w-5 h-5" />
          </div>
          <span className="px-3 py-1 text-xs font-bold tracking-wide text-slate-500 dark:text-slate-400 uppercase bg-slate-100 dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700">
            {achievement.year}
          </span>
        </div>

        {/* Content */}
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {achievement.title}
        </h3>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1 mb-3">
          {achievement.organization}
        </p>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {achievement.description}
        </p>
      </div>
    </motion.div>
  );
};

export default AchievementCard;