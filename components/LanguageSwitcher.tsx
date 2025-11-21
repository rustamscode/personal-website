import React from 'react';
import { motion } from 'framer-motion';

interface LanguageSwitcherProps {
  language: 'en' | 'ru';
  setLanguage: (lang: 'en' | 'ru') => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ language, setLanguage }) => {
  return (
    <div className="flex items-center gap-2">
      <div 
        className="relative flex h-9 w-[84px] items-center rounded-full bg-slate-200 dark:bg-slate-800/80 p-1 shadow-lg backdrop-blur-sm border border-slate-300 dark:border-slate-700/50 cursor-pointer"
        onClick={() => setLanguage(language === 'en' ? 'ru' : 'en')}
      >
        {/* Sliding Background */}
        <motion.div
          className="absolute h-7 w-9 rounded-full bg-blue-600 shadow-sm"
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          initial={false}
          animate={{
            x: language === 'en' ? 0 : 40
          }}
        />

        {/* Labels */}
        <div className="absolute inset-0 flex justify-between items-center px-1 pointer-events-none">
            <span 
                className={`w-9 text-center text-[11px] font-bold tracking-wider transition-colors duration-200 ${language === 'en' ? 'text-white' : 'text-slate-500'}`}
            >
                EN
            </span>
            <span 
                className={`w-9 text-center text-[11px] font-bold tracking-wider transition-colors duration-200 ${language === 'ru' ? 'text-white' : 'text-slate-500'}`}
            >
                RU
            </span>
        </div>
      </div>
    </div>
  );
};

export default LanguageSwitcher;