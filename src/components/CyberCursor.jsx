import React, { useEffect, useState, useRef } from 'react';

export default function CyberCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const requestRef = useRef();
  const mouseRef = useRef({ x: -100, y: -100 });
  const trailRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Disable on touch devices (mobile, tablet)
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleTouchStart = () => {
      setIsTouchDevice(true);
    };
    window.addEventListener('touchstart', handleTouchStart, { once: true, passive: true });

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Check for interactive elements hover
    const handleElementHover = (e) => {
      const target = e.target;
      if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('select') ||
        target.closest('[data-cursor-hover]') ||
        target.closest('.cursor-pointer') ||
        target.closest('.cursor-grab')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousemove', handleElementHover);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Smooth lerp for trailing ring
    const animate = () => {
      const ease = 0.18;
      trailRef.current.x += (mouseRef.current.x - trailRef.current.x) * ease;
      trailRef.current.y += (mouseRef.current.y - trailRef.current.y) * ease;

      setTrailingPos({ x: trailRef.current.x, y: trailRef.current.y });
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', handleElementHover);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(requestRef.current);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* 1. Sharp Primary Center Dot */}
      <div
        className="fixed -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-75 ease-out"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          width: isHovered ? '6px' : '4px',
          height: isHovered ? '6px' : '4px',
          backgroundColor: isHovered ? '#10b981' : '#0e5a3c',
          boxShadow: isHovered ? '0 0 10px #10b981' : 'none',
        }}
      />

      {/* 2. Trailing Tactical Target Ring */}
      <div
        className={`fixed -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-150 ease-out flex items-center justify-center ${
          isHovered
            ? 'w-11 h-11 border-emerald-400 bg-emerald-500/10 scale-110 shadow-sm'
            : isClicked
            ? 'w-6 h-6 border-emerald-500 bg-emerald-500/20 scale-90'
            : 'w-7 h-7 border-[#0e5a3c]/60'
        }`}
        style={{
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`,
        }}
      >
        {/* Subtle Crosshair Ticks when Hovering */}
        {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center animate-spin-slow">
            <span className="absolute -top-1 w-0.5 h-1.5 bg-emerald-400" />
            <span className="absolute -bottom-1 w-0.5 h-1.5 bg-emerald-400" />
            <span className="absolute -left-1 w-1.5 h-0.5 bg-emerald-400" />
            <span className="absolute -right-1 w-1.5 h-0.5 bg-emerald-400" />
          </div>
        )}
      </div>

      {/* 3. Ripple burst on click */}
      {isClicked && (
        <div
          className="fixed -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-400 animate-ping pointer-events-none"
          style={{
            left: `${pos.x}px`,
            top: `${pos.y}px`,
            width: '28px',
            height: '28px',
          }}
        />
      )}
    </div>
  );
}
