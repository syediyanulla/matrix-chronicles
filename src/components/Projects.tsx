import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: 'Rozgaar',
    subtitle: 'Bridging Rural Talent with Jobs Digitally',
    tech: ['HTML5/EJS', 'Tailwind CSS', 'Express', 'Leaflet.js'],
    date: 'February 2025',
    description: 'Platform connecting rural workers to jobs through location-based search and AI-driven matching. Enhanced accessibility with multilingual support and 30% faster load times.',
    highlights: ['Location-based job matching', 'Multilingual support', 'Secure video interviews', 'Escrow payment system'],
  },
  {
    title: 'IGNITRON 2K24',
    subtitle: 'EduHustle Learning Platform',
    tech: ['HTML5/EJS', 'Tailwind CSS', 'JavaScript', 'PostgreSQL'],
    date: 'December 2024',
    description: 'Full-stack LMS increasing student engagement by 40% through intuitive interfaces. Boosted security by 85% via multi-layer authentication.',
    highlights: ['40% engagement increase', 'Google OAuth 2.0', '60% faster course setup', '70% improved streaming'],
  },
  {
    title: 'Skill-Hub',
    subtitle: 'Educational Platform',
    tech: ['React', 'TypeScript', 'Express.js', 'Thirdweb'],
    date: 'November 2024',
    description: 'Educational platform transforming traditional learning into engaging, interactive experiences with wallet integration and 75% improved user engagement.',
    highlights: ['Blockchain integration', 'Wallet connectivity', '75% engagement boost', '40% faster storage access'],
  },
];

export const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={`min-h-screen flex items-center justify-center px-4 py-20 ${
        isVisible ? 'animate-fade-in-up' : 'opacity-0'
      }`}
    >
      <div className="max-w-7xl w-full">
        <h2 className="font-vt323 text-5xl md:text-7xl mb-12 text-center gradient-text">
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`bg-card border border-border rounded-lg p-6 transition-all duration-300 ${
                hoveredIndex !== null && hoveredIndex !== index ? 'opacity-60' : 'opacity-100'
              } hover:border-primary card-glow`}
            >
              <div className="mb-4">
                <h3 className="font-vt323 text-3xl text-primary mb-1">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-2">{project.subtitle}</p>
                <p className="text-muted-foreground text-xs">{project.date}</p>
              </div>
              <p className="text-foreground mb-4 leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-2 py-1 bg-secondary text-foreground rounded text-xs border border-border"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <ul className="space-y-1 mb-4">
                {project.highlights.map((highlight, highlightIndex) => (
                  <li key={highlightIndex} className="text-sm text-muted-foreground">
                    <span className="text-primary">▸</span> {highlight}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
