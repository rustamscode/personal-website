import React from 'react';
import { ExperienceItem } from '../types';
import { motion } from 'framer-motion';

interface ExperienceCardProps {
  experience: ExperienceItem;
  index: number;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50"
    >
      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-100 dark:lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2" aria-label={experience.duration}>
        {experience.duration}
      </header>
      <div className="z-10 sm:col-span-6">
        <h3 className="font-medium leading-snug text-slate-900 dark:text-slate-200">
          <div>
            <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
            <span>{experience.role} · <span className="text-blue-600 dark:text-blue-400">{experience.company}</span></span>
          </div>
        </h3>
        <p className="mt-2 text-sm leading-normal text-slate-600 dark:text-slate-400">
          {experience.description}
        </p>
        <ul className="mt-2 flex flex-wrap" aria-label="Technologies used">
          {experience.skills.map((skill, i) => (
            <li key={i} className="mr-1.5 mt-2">
              <div className="flex items-center rounded-full bg-blue-100 dark:bg-blue-400/10 px-3 py-1 text-xs font-medium leading-5 text-blue-700 dark:text-blue-300">
                {skill}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default ExperienceCard;