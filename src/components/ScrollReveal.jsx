import React, { useEffect, useRef, useState } from 'react';

export default function ScrollReveal({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 650,
  className = '',
  threshold = 0.08,
  once = false,
  rootMargin = '40px 0px -40px 0px',
}) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.IntersectionObserver) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once) {
              observer.unobserve(entry.target);
            }
          } else {
            if (!once) {
              // Video Fade-Out effect when leaving viewport
              setIsVisible(false);
            }
          }
        });
      },
      { threshold, rootMargin }
    );

    const currentDom = domRef.current;
    if (currentDom) {
      observer.observe(currentDom);
    }

    return () => {
      if (currentDom) {
        observer.unobserve(currentDom);
      }
    };
  }, [threshold, rootMargin, once]);

  const getAnimationStyles = () => {
    const activeDuration = isVisible ? duration : Math.round(duration * 0.6);
    const activeDelay = isVisible ? delay : 0;

    const baseTransition = {
      transitionProperty: 'opacity, transform',
      transitionDuration: `${activeDuration}ms`,
      transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      transitionDelay: `${activeDelay}ms`,
      willChange: 'opacity, transform',
    };

    if (!isVisible) {
      switch (animation) {
        case 'fade-up':
          return {
            ...baseTransition,
            opacity: 0,
            transform: 'translateY(32px)',
          };
        case 'fade-down':
          return {
            ...baseTransition,
            opacity: 0,
            transform: 'translateY(-32px)',
          };
        case 'fade-left':
          return {
            ...baseTransition,
            opacity: 0,
            transform: 'translateX(32px)',
          };
        case 'fade-right':
          return {
            ...baseTransition,
            opacity: 0,
            transform: 'translateX(-32px)',
          };
        case 'zoom-in':
          return {
            ...baseTransition,
            opacity: 0,
            transform: 'scale(0.92)',
          };
        case 'fade':
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
