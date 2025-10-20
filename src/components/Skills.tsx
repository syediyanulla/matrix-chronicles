import { useEffect, useRef, useState } from 'react';
import { Code2, Database, Wrench, Users } from 'lucide-react';

const skillCategories = [
  {
    title: 'Languages',
    icon: Code2,
    skills: ['Python', 'Java', 'C', 'HTML', 'CSS', 'JavaScript', 'SQL', 'Postgres', 'MongoDB'],
  },
  {
    title: 'Frameworks',
    icon: Database,
    skills: ['React.js', 'Next.js', 'Node.js', 'JQuery', 'Web3', 'RESTful APIs', 'Bootstrap'],
  },
  {
    title: 'Tools',
    icon: Wrench,
    skills: ['VS Code', 'Eclipse', 'GCP', 'Figma', 'Git', 'GitHub', 'DApps', 'Debugging'],
  },
  {
    title: 'Soft Skills',
    icon: Users,
    skills: ['Communication', 'Problem-Solving', 'Leadership', 'Mentoring', 'Adaptability', 'Time Management'],
  },
];

export const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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
      id="skills"
      ref={sectionRef}
      className={`min-h-screen flex items-center justify-center px-4 py-20 ${
        isVisible ? 'animate-fade-in-up' : 'opacity-0'
      }`}
    >
      <div className="max-w-6xl w-full">
        <h2 className="font-vt323 text-5xl md:text-7xl mb-12 text-center gradient-text">
          Technical Skills
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-all duration-300 group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                  <h3 className="font-vt323 text-2xl text-primary">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 bg-secondary text-foreground rounded-full text-sm border border-border group-hover:border-primary/50 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
