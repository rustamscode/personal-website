import React from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  id: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const Section: React.FC<SectionProps> = ({ id, title, children, className = "", delay = 0 }) => {
  return (
    <section id={id} className={`mb-24 scroll-mt-24 ${className}`}>
      {title && (
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay }}
          className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-8 relative inline-block"
        >
          {title}
          <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-blue-600 dark:bg-blue-500 rounded-full"></span>
        </motion.h2>
      )}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: delay + 0.1 }}
      >
        {children}
      </motion.div>
    </section>
  );
};

export default Section;