import React, { useState, useEffect, useRef } from 'react';

const CYBER_GLYPHS = '01#*!_~%&+-/<>[]{}X$';

export default function DecipherText({
  text,
  className = '',
  scrambleOnHover = true,
  triggerOnScroll = true,
  triggerOnMount = false,
  speed = 28,
  once = true,
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const intervalRef = useRef(null);
  const domRef = useRef(null);
  const hasTriggeredRef = useRef(false);

  const startScramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);

    let iteration = 0;
    const maxIterations = text.length;

    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) {
              return text[index];
            }
            return CYBER_GLYPHS[Math.floor(Math.random() * CYBER_GLYPHS.length)];
          })
          .join('')
      );

      iteration += 1 / 2;

      if (iteration >= maxIterations) {
        setDisplayText(text);
        setIsScrambling(false);
        clearInterval(intervalRef.current);
      }
    }, speed);
  };

  useEffect(() => {
    const el = domRef.current;
    if (!el) return;

    if (triggerOnScroll && typeof window !== 'undefined' && window.IntersectionObserver) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (once && hasTriggeredRef.current) return;
              hasTriggeredRef.current = true;
              startScramble();
              if (once) {
                observer.unobserve(entry.target);
              }
            }
          });
        },
        { threshold: 0.15 }
      );

      observer.observe(el);
      return () => {
        observer.unobserve(el);
        clearInterval(intervalRef.current);
      };
    } else if (triggerOnMount) {
      const timeout = setTimeout(() => {
        startScramble();
      }, 200);
      return () => {
        clearTimeout(timeout);
        clearInterval(intervalRef.current);
      };
    }
  }, [text, triggerOnScroll, once]);

  const handleInteraction = () => {
    if (scrambleOnHover) {
      startScramble();
    }
  };

  return (
    <span
      ref={domRef}
      onMouseEnter={handleInteraction}
      onClick={handleInteraction}
      className={`inline-block transition-colors cursor-default select-none ${className}`}
      data-cursor-hover
    >
      {displayText}
    </span>
  );
}
