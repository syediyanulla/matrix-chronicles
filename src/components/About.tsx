import { useEffect, useRef, useState } from 'react';

export const About = () => {
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
      id="about"
      ref={sectionRef}
      className={`min-h-screen flex items-center justify-center px-4 py-20 ${
        isVisible ? 'animate-fade-in-up' : 'opacity-0'
      }`}
    >
      <div className="max-w-4xl w-full">
        <h2 className="font-vt323 text-5xl md:text-7xl mb-12 text-center gradient-text">
          About Me
        </h2>
        <div className="bg-card border border-border rounded-lg p-8 card-glow">
          <div className="space-y-6 text-foreground">
            <p className="text-lg leading-relaxed">
              <span className="text-primary">&gt;</span> Experienced Full Stack Developer specializing in MERN stack, with expertise in responsive UIs, robust backend systems, and scalable solutions using React, JavaScript, Firebase, and SQL databases.
            </p>
            <p className="text-lg leading-relaxed">
              <span className="text-primary">&gt;</span> Architect of end-to-end web applications using React for dynamic front-end experiences and modern JavaScript technologies.
            </p>
            <p className="text-lg leading-relaxed">
              <span className="text-primary">&gt;</span> Specialized in building robust backend architectures and optimizing database performance for scalable web applications.
            </p>
            <div className="pt-6 flex flex-wrap gap-4 items-center justify-center">
              <a
                href="mailto:syediyanulla@gmail.com"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                syediyanulla@gmail.com
              </a>
              <span className="text-muted-foreground">|</span>
              <a
                href="tel:+917204892575"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                +91-7204892575
              </a>
              <span className="text-muted-foreground">|</span>
              <a
                href="https://linkedin.com/in/syediyanulla"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                LinkedIn
              </a>
              <span className="text-muted-foreground">|</span>
              <a
                href="https://github.com/syediyanulla"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
