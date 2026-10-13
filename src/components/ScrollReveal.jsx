import React, { useEffect, useRef, useState } from 'react';

export default function ScrollReveal({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 600,
  className = '',
  threshold = 0.05,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef(null);

  useEffect(() => {
    // If IntersectionObserver is not supported or fails, fallback to visible
    if (!window.IntersectionObserver) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: '0px 0px -20px 0px' }
    );

    const currentDom = domRef.current;
    if (currentDom) {
      observer.observe(currentDom);
    }

    // Safety timeout: ensure content is visible within 1.2s on mobile
    const safetyTimer = setTimeout(() => {
      setIsVisible(true);
    }, 1200 + delay);

    return () => {
      clearTimeout(safetyTimer);
      if (currentDom) {
        observer.unobserve(currentDom);
      }
    };
  }, [threshold, delay]);

  const getAnimationStyles = () => {
    const baseTransition = {
      transitionProperty: 'opacity, transform',
      transitionDuration: `${duration}ms`,
      transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      transitionDelay: `${delay}ms`,
    };

    if (!isVisible) {
      switch (animation) {
        case 'fade-up':
          return {
            ...baseTransition,
            opacity: 0,
            transform: 'translateY(28px)',
          };
        case 'fade-down':
          return {
            ...baseTransition,
            opacity: 0,
            transform: 'translateY(-28px)',
          };
        case 'fade-left':
          return {
            ...baseTransition,
            opacity: 0,
            transform: 'translateX(28px)',
          };
        case 'fade-right':
          return {
            ...baseTransition,
            opacity: 0,
            transform: 'translateX(-28px)',
          };
        case 'zoom-in':
          return {
            ...baseTransition,
            opacity: 0,
            transform: 'scale(0.95)',
          };
        default:
          return {
            ...baseTransition,
            opacity: 0,
          };
      }
    }

    return {
      ...baseTransition,
      opacity: 1,
      transform: 'translate(0, 0) scale(1)',
    };
  };

  return (
    <div
      ref={domRef}
      style={getAnimationStyles()}
      className={`will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}
