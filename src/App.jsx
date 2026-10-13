import React, { useState, useEffect } from 'react';
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
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f3ef] text-[#121417] flex flex-col antialiased selection:bg-[#0e5a3c] selection:text-white">
      
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

      {/* Main Content Sections with Scroll Reveal Animations */}
      <main className="flex-1 flex flex-col">
        {/* 01 HOME */}
        <HeroSection
          onOpenIntro={() => setTerminalOpen(true)}
          onExploreProjects={() => handleNavigate('projects')}
        />

        {/* 02 ABOUT */}
        <ScrollReveal animation="fade-up" duration={700}>
          <AboutSection />
        </ScrollReveal>

        {/* 03 SKILLS */}
        <ScrollReveal animation="fade-up" duration={700}>
          <SkillsSection />
        </ScrollReveal>

        {/* 04 PROJECTS */}
        <ScrollReveal animation="fade-up" duration={700}>
          <ProjectsSection />
        </ScrollReveal>

        {/* 05 SECURITY LAB */}
        <ScrollReveal animation="fade-up" duration={700}>
          <SecurityLabSection />
        </ScrollReveal>

        {/* 06 MY JOURNEY */}
        <ScrollReveal animation="fade-up" duration={700}>
          <JourneySection />
        </ScrollReveal>

        {/* 07 CONTACT */}
        <ScrollReveal animation="fade-up" duration={700}>
          <ContactSection
            onOpenConnectModal={() => setConnectOpen(true)}
          />
        </ScrollReveal>
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
