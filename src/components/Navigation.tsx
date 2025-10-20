import { useState, useEffect } from 'react';

const navItems = ['About', 'Skills', 'Experience', 'Projects', 'Achievements', 'Contact'];

export const Navigation = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (section: string) => {
    const element = document.getElementById(section.toLowerCase());
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`}
    >
      <div className="bg-black/50 backdrop-blur-md border border-border rounded-full px-6 py-3 flex gap-6">
        {navItems.map((item) => (
          <button
            key={item}
            onClick={() => scrollToSection(item)}
            className="text-sm text-foreground hover:text-primary transition-colors duration-300"
          >
            {item}
          </button>
        ))}
      </div>
    </nav>
  );
};
