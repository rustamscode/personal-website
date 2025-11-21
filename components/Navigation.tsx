import React, { useState, useEffect } from 'react';

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Achievements', href: '#achievements' },
  { name: 'Writing', href: '#writing' },
  { name: 'Contact', href: '#contact' },
  { name: 'Skills', href: '#skills' },
];

const Navigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    navItems.forEach((item) => {
      const element = document.querySelector(item.href);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="nav hidden lg:block">
      <ul className="mt-16 w-max">
        {navItems.map((item) => (
          <li key={item.name}>
            <a
              href={item.href}
              onClick={(e) => handleScroll(e, item.href)}
              className={`group flex items-center py-3 active:text-blue-400 transition-all ${
                activeSection === item.href.substring(1) ? 'text-slate-100' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <span 
                className={`mr-4 h-px transition-all group-hover:w-16 group-hover:bg-slate-200 ${
                    activeSection === item.href.substring(1) ? 'w-16 bg-slate-200' : 'w-8 bg-slate-600'
                }`}
              ></span>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200">
                {item.name}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
