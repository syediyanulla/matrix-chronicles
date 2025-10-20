import { useEffect, useRef, useState } from 'react';

const scrambleChars = '!<>-_\\/[]{}—=+*^?#@%&$';

const DecryptText = ({ text, isDecrypting }: { text: string; isDecrypting: boolean }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isDecrypting) {
      setDisplayText(text.split('').map(() => scrambleChars[Math.floor(Math.random() * scrambleChars.length)]).join(''));
      return;
    }

    if (currentIndex >= text.length) {
      setDisplayText(text);
      return;
    }

    const interval = setInterval(() => {
      setDisplayText(prev => {
        const chars = text.split('');
        return chars.map((char, idx) => {
          if (idx < currentIndex) {
            return char;
          } else if (idx === currentIndex) {
            return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          } else {
            return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          }
        }).join('');
      });
    }, 30);

    const revealTimeout = setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
    }, 50);

    return () => {
      clearInterval(interval);
      clearTimeout(revealTimeout);
    };
  }, [isDecrypting, currentIndex, text]);

  return <span className="font-mono">{displayText}</span>;
};

export const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const aboutTexts = [
    "Experienced Full Stack Developer specializing in MERN stack, with expertise in responsive UIs, robust backend systems, and scalable solutions using React, JavaScript, Firebase, and SQL databases.",
    "Architect of end-to-end web applications using React for dynamic front-end experiences and modern JavaScript technologies.",
    "Specialized in building robust backend architectures and optimizing database performance for scalable web applications."
  ];

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
      className="min-h-screen flex items-center justify-center px-4 py-20"
    >
      <div className="max-w-4xl w-full">
        <h2 className="font-vt323 text-5xl md:text-7xl mb-12 text-center gradient-text">
          About Me
        </h2>
        <div className="bg-card border border-border rounded-lg p-8 card-glow">
          <div className="space-y-6 text-foreground">
            {aboutTexts.map((text, idx) => (
              <p key={idx} className="text-lg leading-relaxed">
                <span className="text-primary">&gt;</span>{' '}
                <DecryptText text={text} isDecrypting={isVisible} />
              </p>
            ))}
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
