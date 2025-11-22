
import React from 'react';
import { Article } from '../types.ts';
import { motion } from 'framer-motion';
import { ArrowUpRight, BookOpen } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  index: number;
  label: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, index, label }) => {
  return (
    <motion.a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group flex flex-col justify-between p-6 rounded-xl bg-white dark:bg-slate-800/20 border border-slate-200 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-800/40 hover:border-blue-500/30 transition-all cursor-pointer h-full"
    >
      <div>
        <div className="flex items-center justify-between mb-4 text-xs text-slate-500 uppercase tracking-widest font-bold">
            <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{article.platform}</span>
            <span>{article.date}</span>
        </div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-3 leading-tight">
          {article.title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
            {article.description}
        </p>
      </div>
      <div className="flex items-center gap-2 text-sm font-medium text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
        <BookOpen className="w-4 h-4" />
        <span>{label}</span>
        <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
      </div>
    </motion.a>
  );
};

export default ArticleCard;