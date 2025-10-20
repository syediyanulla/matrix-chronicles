import { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export const Contact = () => {
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
      id="contact"
      ref={sectionRef}
      className={`min-h-screen flex items-center justify-center px-4 py-20 ${
        isVisible ? 'animate-fade-in-up' : 'opacity-0'
      }`}
    >
      <div className="max-w-4xl w-full text-center">
        <h2 className="font-vt323 text-5xl md:text-7xl mb-12 gradient-text">
          Get In Touch
        </h2>
        <p className="text-xl text-foreground mb-12 max-w-2xl mx-auto">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <a
            href="mailto:syediyanulla@gmail.com"
            className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-all duration-300 card-glow group"
          >
            <Mail className="w-8 h-8 text-primary mx-auto mb-3" />
            <p className="text-foreground group-hover:text-primary transition-colors">
              syediyanulla@gmail.com
            </p>
          </a>
          
          <a
            href="tel:+917204892575"
            className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-all duration-300 card-glow group"
          >
            <Phone className="w-8 h-8 text-primary mx-auto mb-3" />
            <p className="text-foreground group-hover:text-primary transition-colors">
              +91-7204892575
            </p>
          </a>
          
          <div className="bg-card border border-border rounded-lg p-6 card-glow">
            <MapPin className="w-8 h-8 text-primary mx-auto mb-3" />
            <p className="text-foreground">
              Davangere, Karnataka
            </p>
          </div>
        </div>

        <div className="relative group inline-block">
          <div className="absolute inset-0 bg-primary/20 blur-xl group-hover:bg-primary/30 transition-all duration-300" />
          <a
            href="mailto:syediyanulla@gmail.com"
            className="relative inline-block px-8 py-4 bg-primary text-black font-vt323 text-2xl transform -skew-x-12 hover:skew-x-0 transition-all duration-300"
          >
            <span className="block transform skew-x-12 group-hover:skew-x-0 transition-transform duration-300">
              SEND MESSAGE
            </span>
          </a>
        </div>

        <div className="mt-16 pt-8 border-t border-border">
          <p className="text-muted-foreground">
            © 2025 Syed Iyanulla. Built with React, TypeScript & Tailwind CSS.
          </p>
        </div>
      </div>
    </section>
  );
};
