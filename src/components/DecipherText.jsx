import React, { useState, useEffect, useRef } from 'react';

const CYBER_GLYPHS = '01#*!_~%&+-/<>[]{}X$';

export default function DecipherText({
  text,
  className = '',
  scrambleOnHover = true,
  triggerOnMount = true,
  speed = 30,
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const intervalRef = useRef(null);

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
    if (triggerOnMount) {
      const timeout = setTimeout(() => {
        startScramble();
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [text]);

  const handleMouseEnter = () => {
    if (scrambleOnHover) {
      startScramble();
    }
  };

  return (
    <span
      onMouseEnter={handleMouseEnter}
      className={`inline-block transition-colors cursor-default select-none ${className}`}
      data-cursor-hover
    >
      {displayText}
    </span>
  );
}
