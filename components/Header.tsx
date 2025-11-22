
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Send, Youtube, BookOpen, Mail, ChevronDown } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants.ts';
import LanguageSwitcher from './LanguageSwitcher.tsx';
import ThemeToggle from './ThemeToggle.tsx';

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

interface HeaderProps {
    language: 'en' | 'ru';
    setLanguage: (lang: 'en' | 'ru') => void;
    labels: {
        about: string;
        experience: string;
        projects: string;
        achievements: string;
        writing: string;
        contact: string;
        techStack: string;
    };
}

const Header: React.FC<HeaderProps> = ({ language, setLanguage, labels }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [activeSection, setActiveSection] = useState<string>('about');
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Only show these socials in the header
    const HEADER_SOCIALS = ['Email', 'Telegram', 'LinkedIn'];

    const navItems = [
        { name: labels.about, href: '#about' },
        { name: labels.experience, href: '#experience' },
        { name: labels.techStack, href: '#skills' },
        { name: labels.projects, href: '#projects' },
        { name: labels.writing, href: '#writing' },
        { name: labels.contact, href: '#contact' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            const sections = navItems.map(item => item.href.substring(1));
            let current = '';

            // We consider the "active" area to be around 150px from the top
            // This handles the sticky header offset and gives a natural feel
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // If the top of the section is above the trigger point
                    // AND the bottom is still below the trigger point
                    // Or if we are near the bottom of page and this is the last section
                    if ((rect.top <= 250 && rect.bottom >= 250)) {
                        current = section;
                    }
                }
            }
            
            // Edge case: if scrolled to very bottom, highlight contact
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
                current = 'contact';
            }

            if (current) {
                setActiveSection(current);
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Run once on mount to set initial state
        handleScroll();
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, [navItems]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

    const handleScrollTo = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            // Offset for the sticky header
            const headerOffset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
            setIsMenuOpen(false);
            setIsDropdownOpen(false);
        }
    };

    const currentSectionName = navItems.find(n => n.href.substring(1) === activeSection)?.name || labels.about;

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-background/80 backdrop-blur-lg border-b border-slate-200 dark:border-white/5 h-16 transition-all duration-300">
            <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
               {/* Left: Name & Breadcrumb Nav */}
               <div className="flex items-center gap-4" ref={dropdownRef}>
                   <a 
                     href="#" 
                     onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                     className="text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap"
                   >
                      Rustam Rustamov
                   </a>

                   {/* Divider & Dynamic Section (Desktop Only) */}
                   <div className="hidden md:flex items-center gap-2 relative">
                       <span className="text-slate-300 dark:text-slate-700 font-light text-xl">/</span>
                       
                       <button
                           onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                           className="group relative flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-all"
                       >
                           <div className="overflow-hidden h-5 flex items-center">
                               <AnimatePresence mode='wait'>
                                   <motion.span
                                       key={activeSection}
                                       initial={{ y: 10, opacity: 0 }}
                                       animate={{ y: 0, opacity: 1 }}
                                       exit={{ y: -10, opacity: 0 }}
                                       transition={{ duration: 0.2 }}
                                       className="font-medium text-slate-600 dark:text-slate-300 text-sm truncate group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors"
                                   >
                                       {currentSectionName}
                                   </motion.span>
                               </AnimatePresence>
                           </div>
                           <ChevronDown className="w-3 h-3 text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors opacity-50 group-hover:opacity-100" />

                           {/* Dropdown Menu */}
                           <AnimatePresence>
                               {isDropdownOpen && (
                                   <motion.div
                                       initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                       animate={{ opacity: 1, y: 0, scale: 1 }}
                                       exit={{ opacity: 0, y: 8, scale: 0.95 }}
                                       transition={{ duration: 0.15, ease: "easeOut" }}
                                       className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-[#0F0F0F] rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden p-1.5 z-50 cursor-default"
                                       onClick={(e) => e.stopPropagation()}
                                   >
                                       {navItems.map((item) => (
                                           <button
                                               key={item.href}
                                               onClick={(e) => handleScrollTo(e, item.href)}
                                               className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-between group ${
                                                   activeSection === item.href.substring(1)
                                                       ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400'
                                                       : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-slate-200'
                                               }`}
                                           >
                                               <span className="flex-1">{item.name}</span>
                                               {activeSection === item.href.substring(1) && (
                                                   <motion.div layoutId="activeDot" className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                               )}
                                           </button>
                                       ))}
                                   </motion.div>
                               )}
                           </AnimatePresence>
                       </button>
                   </div>
               </div>

               {/* Right: Socials + Controls */}
               <div className="hidden md:flex items-center justify-end gap-6">
                   <div className="flex items-center gap-1 pr-6 border-r border-slate-200 dark:border-white/10">
                       {SOCIAL_LINKS.filter(link => HEADER_SOCIALS.includes(link.platform)).map(link => (
                           <a 
                            key={link.platform} 
                            href={link.url} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="group p-2 rounded-full text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-white/10 transition-all"
                            aria-label={link.platform}
                           >
                               <IconRenderer name={link.iconName} className="w-5 h-5 group-hover:scale-110 transition-transform" />
                           </a>
                       ))}
                   </div>
                   <div className="flex items-center gap-3">
                       <ThemeToggle />
                       <LanguageSwitcher language={language} setLanguage={setLanguage} />
                   </div>
               </div>

               {/* Mobile Controls */}
               <div className="flex items-center gap-3 md:hidden">
                   <ThemeToggle />
                   <LanguageSwitcher language={language} setLanguage={setLanguage} />
                   <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)} 
                    className="text-slate-900 dark:text-slate-200 p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-md transition-colors"
                    aria-label="Menu"
                   >
                       {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                   </button>
               </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="md:hidden bg-white dark:bg-[#0a0a0a] border-b border-slate-200 dark:border-white/10 overflow-hidden absolute top-16 left-0 right-0 shadow-2xl"
                    >
                        <nav className="flex flex-col p-6 gap-2">
                            {navItems.map(item => {
                                const isActive = activeSection === item.href.substring(1);
                                return (
                                    <a 
                                        key={item.href} 
                                        href={item.href} 
                                        onClick={(e) => handleScrollTo(e, item.href)} 
                                        className={`text-lg font-medium py-2 px-4 rounded-lg transition-colors ${isActive ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5'}`}
                                    >
                                        {item.name}
                                    </a>
                                )
                            })}
                            <div className="flex gap-4 mt-6 pt-6 border-t border-slate-200 dark:border-white/10 px-4 justify-center">
                                {SOCIAL_LINKS.filter(link => HEADER_SOCIALS.includes(link.platform)).map(link => (
                                    <a 
                                        key={link.platform} 
                                        href={link.url} 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
                                    >
                                        <IconRenderer name={link.iconName} className="w-6 h-6" />
                                    </a>
                                ))}
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;