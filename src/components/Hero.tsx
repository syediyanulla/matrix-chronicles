import { useEffect, useState } from 'react';
import { MatrixRain } from './MatrixRain';

const shuffleChars = '!<>-_\\/[]{}—=+*^?#________';

export const Hero = () => {
  const name = 'SYED IYANULLA';
  const [displayName, setDisplayName] = useState(name.split('').map(() => shuffleChars[0]));
  const [isShuffling, setIsShuffling] = useState(true);

  const bioTexts = [
    'Experienced Full Stack Developer specializing in MERN stack...',
    'Architecting end-to-end web applications with React...',
    'Building robust backend architectures and optimizing databases...',
    'Creating dynamic front-end experiences with modern JavaScript...',
  ];

  const [bioText, setBioText] = useState('');
  const [bioIndex, setBioIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Matrix Shuffle Effect for Name
  useEffect(() => {
    let frame = 0;
    const maxFrames = 40; // 2 seconds at 50ms intervals
    const nameArray = name.split('');
    
    const shuffleInterval = setInterval(() => {
      frame++;
      const revealedCount = Math.floor((frame / maxFrames) * nameArray.length);
      
      const newDisplay = nameArray.map((char, index) => {
        if (index < revealedCount) {
          return char; // Reveal the correct character
        }
        return shuffleChars[Math.floor(Math.random() * shuffleChars.length)];
      });
      
      setDisplayName(newDisplay);
      
      if (frame >= maxFrames) {
        setDisplayName(nameArray);
        setIsShuffling(false);
        clearInterval(shuffleInterval);
      }
    }, 50);

    return () => clearInterval(shuffleInterval);
  }, []);

  // Typewriter Effect for Bio
  useEffect(() => {
    const currentText = bioTexts[bioIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex < currentText.length) {
        setBioText(currentText.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (isDeleting && charIndex > 0) {
        setBioText(currentText.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setBioIndex((bioIndex + 1) % bioTexts.length);
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, bioIndex]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <MatrixRain />
      <div className="relative z-10 text-center px-4">
        <h1 className="font-vt323 text-6xl md:text-8xl lg:text-9xl mb-8 text-primary text-glow">
          {displayName.join('')}
        </h1>
        <div className="font-mono text-xl md:text-2xl text-foreground max-w-3xl mx-auto">
          <span className="text-primary">&gt;</span> {bioText}
          <span className="cursor-blink text-primary">_</span>
        </div>
      </div>
    </section>
  );
};
