import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import SecurityLabSection from './components/SecurityLabSection';
import JourneySection from './components/JourneySection';
import ContactSection from './components/ContactSection';
import CommandPalette from './components/CommandPalette';
import IntroTerminalModal from './components/IntroTerminalModal';
import ConnectModal from './components/ConnectModal';
import CyberCursor from './components/CyberCursor';
import ScrollReveal from './components/ScrollReveal';
import { playClick } from './utils/audio';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [searchOpen, setSearchOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [connectOpen, setConnectOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const lenisRef = useRef(null);

  // Initialize Lenis butter-smooth momentum scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.2,
      infinite: false,
    });

    lenisRef.current = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Track scroll progress for tactical HUD progress bar
    const handleLenisScroll = (e) => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (e.scroll / totalScroll) * 100)));
      }
    };
    lenis.on('scroll', handleLenisScroll);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Pause Lenis when modal overlays are active
  useEffect(() => {
    if (!lenisRef.current) return;
    if (searchOpen || terminalOpen || connectOpen) {
      lenisRef.current.stop();
    } else {
      lenisRef.current.start();
    }
  }, [searchOpen, terminalOpen, connectOpen]);

  // Active section scroll spy
  useEffect(() => {
    const sectionIds = ['home', 'about', 'skills', 'projects', 'lab', 'journey', 'contact'];
    
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Global keyboard shortcuts (Ctrl+K for search, ~ for terminal)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === '`' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (id) => {
    playClick();
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(element, { offset: -20, duration: 1.2 });
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f3ef] text-[#121417] flex flex-col antialiased selection:bg-[#0e5a3c] selection:text-white">
      
      {/* Tactical Top Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[2.5px] z-[70] bg-transparent pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#0e5a3c] via-[#10b981] to-[#0e5a3c] transition-all duration-75 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Custom Cyber Crosshair / Dot Cursor */}
      <CyberCursor />

      {/* Top Sticky Navigation */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenContact={() => setConnectOpen(true)}
        onOpenTerminal={() => setTerminalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1 flex flex-col">
        {/* 01 HOME */}
        <HeroSection
          onOpenIntro={() => setTerminalOpen(true)}
          onExploreProjects={() => handleNavigate('projects')}
        />

        {/* 02 ABOUT */}
        <AboutSection />

        {/* 03 SKILLS */}
        <SkillsSection />

        {/* 04 PROJECTS */}
        <ProjectsSection />

        {/* 05 SECURITY LAB */}
        <SecurityLabSection />

        {/* 06 MY JOURNEY */}
        <JourneySection />

        {/* 07 CONTACT */}
        <ContactSection
          onOpenConnectModal={() => setConnectOpen(true)}
        />
      </main>

      {/* Global Interactive Modals */}
      <CommandPalette
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={handleNavigate}
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenConnect={() => setConnectOpen(true)}
      />

      <IntroTerminalModal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />

      <ConnectModal
        isOpen={connectOpen}
        onClose={() => setConnectOpen(false)}
      />

    </div>
  );
}
