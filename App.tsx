import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Send, 
  Youtube, 
  BookOpen, 
  Mail, 
  ArrowUpRight, 
  ArrowRight,
  Copy,
  Check
} from 'lucide-react';

import SpotlightEffect from './components/SpotlightEffect';
import NetworkBackground from './components/NetworkBackground';
import Section from './components/Section';
import ExperienceTabs from './components/ExperienceTabs';
import ProjectsShowcase from './components/ProjectsShowcase';
import AboutSection from './components/AboutSection';
import ArticleCard from './components/ArticleCard';
import Header from './components/Header';
import TechStack from './components/TechStack';
import { CONTENT, SOCIAL_LINKS } from './constants';

// Helper to dynamically render Lucide icons
const IconRenderer: React.FC<{ name: string; className?: string }> = ({ name, className }) => {
  switch (name) {
    case 'Github': return <Github className={className} />;
    case 'Linkedin': return <Linkedin className={className} />;
    case 'Send': return <Send className={className} />;
    case 'Youtube': return <Youtube className={className} />;
    case 'BookOpen': return <BookOpen className={className} />;
    case 'Mail': return <Mail className={className} />;
    default: return <div className={className} />;
  }
};

const App: React.FC = () => {
  const [language, setLanguage] = useState<'en' | 'ru'>('en');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedTelegram, setCopiedTelegram] = useState(false);
  const data = CONTENT[language];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCopyEmail = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
        await navigator.clipboard.writeText("rustamscode@gmail.com");
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
        console.error("Failed to copy email", err);
    }
  };

  const handleCopyTelegram = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
        await navigator.clipboard.writeText("@rustamscode");
        setCopiedTelegram(true);
        setTimeout(() => setCopiedTelegram(false), 2000);
    } catch (err) {
        console.error("Failed to copy telegram", err);
    }
  };

  const telegramLink = SOCIAL_LINKS.find(l => l.platform === 'Telegram');

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-background selection:bg-blue-500/30 text-slate-600 dark:text-slate-400 transition-colors duration-300">
      {/* Interactive Backgrounds */}
      <NetworkBackground />
      <SpotlightEffect />

      {/* Sticky Header */}
      <Header language={language} setLanguage={setLanguage} labels={data.ui} />
      
      {/* Main Content - Added pt-28 to account for fixed header */}
      <div className="relative z-40 mx-auto min-h-screen max-w-6xl px-6 pt-28 pb-12 font-sans md:px-12 md:pt-32 lg:pt-40">
        <div>
          
          {/* HERO SECTION */}
          <header className="mb-24 lg:mb-36">
            <div>
               {/* Status Badge - Increased opacity and z-index for visibility */}
               <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative z-20 inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-emerald-500/20 dark:border-emerald-500/30 mb-8 shadow-sm hover:shadow-md transition-all cursor-default"
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-100 tracking-wide">
                    Available for new projects
                  </span>
                </motion.div>

              <div className="flex flex-col-reverse gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-20">
                <div className="pt-2 sm:pt-0 max-w-2xl">
                  <motion.h1 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-5xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl mb-6"
                  >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-200 dark:to-slate-400">
                      Rustam.
                    </span>
                  </motion.h1>
                  
                  {/* Refined Role Color - Silver/Gray Gradient */}
                  <motion.h2 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    key={`role-${language}`}
                    className="text-2xl sm:text-3xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-slate-500 to-slate-800 dark:from-slate-100 dark:to-slate-400 flex items-center gap-2"
                  >
                    {data.header.role}
                  </motion.h2>

                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    key={`bio-${language}`}
                    className="mt-8 max-w-lg leading-relaxed text-lg text-slate-600 dark:text-slate-400"
                  >
                    {data.header.bio}
                  </motion.p>

                  {/* Premium Catchy CTA - Silver/Blue Gradient */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-12"
                  >
                    <a 
                        href="#contact" 
                        onClick={(e) => handleScroll(e, '#contact')}
                        className="relative inline-flex items-center gap-3 px-7 py-4 rounded-2xl bg-gradient-to-br from-slate-100 via-slate-200 to-blue-200 dark:from-white dark:via-slate-200 dark:to-blue-300 text-slate-900 font-bold text-base tracking-wide shadow-xl shadow-blue-300/40 dark:shadow-white/5 border border-white/60 dark:border-transparent hover:brightness-110 hover:-translate-y-1 transition-all duration-300 active:scale-95 group overflow-hidden"
                    >
                        <span className="relative z-10">{data.header.cta}</span>
                        <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        
                        {/* Subtle Shine Effect */}
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-in-out skew-x-12" />
                    </a>
                  </motion.div>
                </div>

                {/* MODERNIZED PROFILE PHOTO */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, rotate: -3 }}
                  whileHover={{ scale: 1.02, rotate: 0 }}
                  transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
                  className="relative w-72 h-72 lg:w-96 lg:h-96 group shrink-0 perspective-1000 mx-auto lg:mx-0"
                >
                   {/* Glow behind */}
                   <div className="absolute inset-4 bg-blue-500 rounded-[2.5rem] blur-[60px] opacity-20 dark:opacity-40 group-hover:opacity-50 transition-opacity duration-500" />

                   {/* Main Card - Squircle Shape */}
                   <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden border border-white/60 dark:border-slate-700 shadow-2xl bg-slate-100 dark:bg-slate-800/50 backdrop-blur-sm rotate-3 group-hover:rotate-0 transition-transform duration-500">
                      <img 
                          src="https://placehold.co/800x800/1e293b/cbd5e1?text=Rustam" 
                          alt="Rustam Profile"
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                      
                      {/* Floating Badge with VK Logo */}
                      <div className="absolute bottom-5 left-5 right-5 p-3 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 shadow-2xl transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                        <div className="flex items-center gap-3.5">
                            <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                                <img 
                                    src="https://upload.wikimedia.org/wikipedia/commons/f/f3/VK_Compact_Logo_%282021-present%29.svg" 
                                    alt="VK Logo" 
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div className="flex flex-col justify-center">
                                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-0.5 leading-none">Currently Building at</div>
                                <div className="text-sm font-extrabold text-slate-900 dark:text-slate-100 leading-tight">VK Tech</div>
                            </div>
                        </div>
                      </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </header>

          {/* CONTENT */}
          <main className="space-y-32 lg:space-y-40">
            
            {/* ABOUT */}
            <Section id="about" title={data.ui.about}>
              <AboutSection bio={data.about.bio} highlights={data.about.highlights} />
            </Section>

            {/* EXPERIENCE */}
            <Section id="experience" title={data.ui.experience}>
              <ExperienceTabs data={data.experience} labels={{ technologies: data.ui.technologies }} />
              <div className="mt-12 flex justify-center sm:justify-start">
                <a 
                  href="/resume.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-gradient-to-br from-slate-100 via-slate-200 to-blue-200 dark:from-white dark:via-slate-200 dark:to-blue-300 text-slate-900 font-bold text-lg tracking-wide shadow-xl shadow-blue-300/40 dark:shadow-white/5 border border-white/60 dark:border-transparent hover:brightness-110 hover:-translate-y-1 transition-all duration-300 active:scale-95 overflow-hidden"
                >
                  <span className="relative z-10">{data.ui.viewResume}</span>
                  <ArrowUpRight className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-in-out skew-x-12" />
                </a>
              </div>
            </Section>

            {/* SKILLS & TECH */}
            <Section id="skills" title={data.ui.techStack}>
               <TechStack />
            </Section>

            {/* PROJECTS */}
            <Section id="projects" title={data.ui.projects}>
              <ProjectsShowcase projects={data.projects} />
            </Section>

            {/* WRITING */}
            <Section id="writing" title={data.ui.writing}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 group/list">
                    {data.articles.map((article, idx) => (
                        <ArticleCard key={idx} article={article} index={idx} label={data.ui.readArticle} />
                    ))}
                </div>
            </Section>

            {/* CONTACT */}
            <Section id="contact" title={data.ui.contact}>
               <div className="flex flex-col gap-12 max-w-5xl mx-auto">
                    
                    {/* Main Contact Methods - 2 Columns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Email Card */}
                        <div className="group relative p-8 rounded-3xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 hover:border-blue-500/30 transition-all hover:shadow-xl dark:hover:shadow-[0_0_30px_-10px_rgba(59,130,246,0.1)] flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Mail className="w-8 h-8" />
                            </div>
                            
                            <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">Email</h4>
                            <p className="text-slate-500 dark:text-slate-400 font-medium mb-8 select-all">rustamscode@gmail.com</p>

                            <div className="flex items-center gap-3 w-full mt-auto">
                                <button
                                    onClick={handleCopyEmail}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold transition-all active:scale-95"
                                >
                                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                                    <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                                </button>
                                <a
                                    href="mailto:rustamscode@gmail.com"
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 active:scale-95"
                                >
                                    <Send className="w-4 h-4" />
                                    <span>Write</span>
                                </a>
                            </div>
                        </div>

                        {/* Telegram Card */}
                        <div className="group relative p-8 rounded-3xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 hover:border-sky-500/30 transition-all hover:shadow-xl dark:hover:shadow-[0_0_30px_-10px_rgba(14,165,233,0.1)] flex flex-col items-center text-center">
                             <div className="w-16 h-16 rounded-2xl bg-sky-50 dark:bg-sky-500/10 flex items-center justify-center text-sky-600 dark:text-sky-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Send className="w-8 h-8 -ml-1" />
                            </div>

                            <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">Telegram</h4>
                            <p className="text-slate-500 dark:text-slate-400 font-medium mb-8 select-all">@rustamscode</p>

                            <div className="flex items-center gap-3 w-full mt-auto">
                                <button
                                    onClick={handleCopyTelegram}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold transition-all active:scale-95"
                                >
                                    {copiedTelegram ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                                    <span>{copiedTelegram ? 'Copied' : 'Copy'}</span>
                                </button>
                                <a
                                    href={telegramLink?.url || "https://t.me/rustamscode"}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold transition-all shadow-lg shadow-sky-500/20 hover:shadow-sky-500/30 active:scale-95"
                                >
                                    <ArrowUpRight className="w-4 h-4" />
                                    <span>Chat</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Other Socials - Clean Row */}
                    <div className="flex flex-col items-center gap-6">
                        <div className="flex items-center gap-4 w-full px-4 sm:px-12 opacity-50">
                            <div className="h-px bg-slate-300 dark:bg-slate-700 flex-1" />
                            <span className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 whitespace-nowrap">Or follow me on</span>
                            <div className="h-px bg-slate-300 dark:bg-slate-700 flex-1" />
                        </div>
                        
                        <div className="flex flex-wrap justify-center gap-3">
                            {SOCIAL_LINKS.filter(l => l.platform !== 'Email' && l.platform !== 'Telegram').map((social) => (
                                <a
                                    key={social.platform}
                                    href={social.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="group flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 hover:border-blue-500/30 hover:shadow-md transition-all active:scale-95"
                                >
                                    <div className="text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        <IconRenderer name={social.iconName} className="w-4 h-4" />
                                    </div>
                                    <span className="text-sm font-bold text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors">
                                        {social.platform}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>
               </div>
            </Section>

          </main>
        </div>
      </div>
    </div>
  );
};

export default App;