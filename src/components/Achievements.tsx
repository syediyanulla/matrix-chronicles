import { useEffect, useRef, useState } from 'react';
import { Trophy, Award } from 'lucide-react';

const achievements = [
  {
    title: 'AITM CodeFest 2025',
    award: '3rd Prize',
    level: 'National Level Hackathon',
    date: 'April 2025',
  },
  {
    title: 'IGNITRON 2K24',
    award: 'Runner-Up',
    level: 'State Level Hackathon',
    date: 'December 2024',
  },
  {
    title: 'WIE CODE',
    award: 'BEST ABSTRACT',
    level: 'National Level Hackathon',
    date: 'December 2024',
  },
];

export const Achievements = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePositions, setMousePositions] = useState<{ [key: number]: { x: number; y: number } }>({});

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePositions({
      ...mousePositions,
      [index]: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      },
    });
  };

  const handleMouseLeave = (index: number) => {
    const newPositions = { ...mousePositions };
    delete newPositions[index];
    setMousePositions(newPositions);
  };

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className={`min-h-screen flex items-center justify-center px-4 py-20 ${
        isVisible ? 'animate-fade-in-up' : 'opacity-0'
      }`}
    >
      <div className="max-w-6xl w-full">
        <h2 className="font-vt323 text-5xl md:text-7xl mb-12 text-center gradient-text">
          Achievements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="relative bg-card border border-border rounded-lg p-6 overflow-hidden group"
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              {/* Evervault Card Effect */}
              {mousePositions[index] && (
                <div
                  className="absolute pointer-events-none transition-opacity duration-300"
                  style={{
                    left: mousePositions[index].x,
                    top: mousePositions[index].y,
                    width: '300px',
                    height: '300px',
                    transform: 'translate(-50%, -50%)',
                    background: 'radial-gradient(circle, rgba(57, 255, 20, 0.15) 0%, transparent 70%)',
                  }}
                />
              )}

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <Trophy className="w-8 h-8 text-primary" />
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-vt323 text-3xl text-primary mb-2">{achievement.title}</h3>
                <p className="text-xl font-semibold text-foreground mb-2">{achievement.award}</p>
                <p className="text-muted-foreground mb-1">{achievement.level}</p>
                <p className="text-sm text-muted-foreground">{achievement.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
