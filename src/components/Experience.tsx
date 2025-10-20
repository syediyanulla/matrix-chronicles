import { useEffect, useRef, useState } from 'react';
import { GraduationCap, Briefcase } from 'lucide-react';

const timeline = [
  {
    type: 'education',
    title: 'Bachelor of Information Science',
    organization: 'GM Institute of Technology',
    location: 'Davangere, Karnataka',
    date: 'Nov 2022 – July 2026',
    description: 'Pursuing Bachelor\'s degree in Information Science',
  },
  {
    type: 'work',
    title: 'Data Analytics and Visualization',
    organization: 'Accenture - Job Simulation',
    location: 'North America',
    date: 'November 2024',
    description: 'Developed hands-on experience with project scoping, data cleaning and modeling, creating impactful data visualizations using Excel, Tableau, and Python.',
  },
  {
    type: 'work',
    title: 'Web Development Intern',
    organization: 'Prodigy InfoTech',
    location: 'Bengaluru, Karnataka',
    date: '18 Feb 2024 – 18 Mar 2024',
    description: 'Created a Weather Forecasting WebApp and personal portfolio using JavaScript. Developed daily report visualization system for efficient team communication.',
  },
];

export const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [beamPosition, setBeamPosition] = useState(0);

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

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      
      const rect = timelineRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const elementHeight = rect.height;
      
      if (rect.top < viewportHeight && rect.bottom > 0) {
        const scrollProgress = (viewportHeight - rect.top) / (viewportHeight + elementHeight);
        setBeamPosition(Math.min(Math.max(scrollProgress * 100, 0), 100));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className={`min-h-screen flex items-center justify-center px-4 py-20 ${
        isVisible ? 'animate-fade-in-up' : 'opacity-0'
      }`}
    >
      <div className="max-w-4xl w-full">
        <h2 className="font-vt323 text-5xl md:text-7xl mb-12 text-center gradient-text">
          Experience & Education
        </h2>
        <div ref={timelineRef} className="relative">
          {/* Tracing Beam Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5">
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to bottom, transparent 0%, #39FF14 ${beamPosition}%, transparent ${beamPosition + 10}%)`,
              }}
            />
            <div
              className="absolute w-2 h-2 -left-[3px] rounded-full bg-primary shadow-[0_0_10px_#39FF14] transition-all duration-300"
              style={{ top: `${beamPosition}%` }}
            />
          </div>

          <div className="space-y-8 pl-20">
            {timeline.map((item, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-[52px] top-2 w-4 h-4 rounded-full border-2 border-primary bg-background" />
                <div className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-all duration-300 card-glow">
                  <div className="flex items-start gap-4">
                    {item.type === 'education' ? (
                      <GraduationCap className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    ) : (
                      <Briefcase className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    )}
                    <div className="flex-1">
                      <h3 className="font-vt323 text-2xl text-primary mb-1">{item.title}</h3>
                      <p className="text-foreground font-semibold mb-1">{item.organization}</p>
                      <p className="text-muted-foreground text-sm mb-2">
                        {item.location} • {item.date}
                      </p>
                      <p className="text-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
