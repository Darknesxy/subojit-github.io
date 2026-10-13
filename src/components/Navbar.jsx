import React, { useState, useEffect } from 'react';
import { Search, Volume2, VolumeX, Menu, X, Terminal, Shield } from 'lucide-react';
import { playClick, playBlip, toggleSound, isSoundEnabled } from '../utils/audio';

export default function Navbar({ onOpenSearch, onOpenContact, onOpenTerminal, activeSection, setActiveSection }) {
  const [soundOn, setSoundOn] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', num: '01', label: 'HOME' },
    { id: 'about', num: '02', label: 'ABOUT' },
    { id: 'skills', num: '03', label: 'SKILLS' },
    { id: 'projects', num: '04', label: 'PROJECTS' },
    { id: 'lab', num: '05', label: 'LAB' },
    { id: 'journey', num: '06', label: 'JOURNEY' },
    { id: 'contact', num: '07', label: 'CONTACT' },
  ];

  const handleNavClick = (id) => {
    playClick();
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const handleSoundToggle = () => {
    const next = toggleSound();
    setSoundOn(next);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#f4f3ef]/95 backdrop-blur-md border-b border-[#dfded8] transition-all">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand / Logo */}
        <div 
          onClick={() => handleNavClick('home')}
          className="cursor-pointer flex flex-col items-start select-none group"
        >
          <div className="flex items-center gap-1.5">
            <span className="font-display font-black text-lg tracking-tight text-[#121417] group-hover:text-cyber-emerald transition-colors">
              SUBOJIT
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-emerald animate-pulse" />
          </div>
          <span className="font-mono text-[9px] tracking-[0.2em] text-[#6c7278] uppercase font-medium">
            CYBERSECURITY EXPLORER
          </span>
        </div>

        {/* Center Nav Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex flex-col items-start py-1 transition-all group relative ${
                  isActive ? 'text-[#121417] font-semibold' : 'text-[#6c7278] hover:text-[#121417]'
                }`}
              >
                <span className={`font-mono text-[10px] tracking-wider transition-colors ${
                  isActive ? 'text-cyber-emerald font-bold' : 'text-gray-400 group-hover:text-gray-600'
                }`}>
                  {item.num}
                </span>
                <span className="font-display text-xs font-bold tracking-wider">
                  {item.label}
                </span>
                {isActive && (
                  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-cyber-emerald rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          
          {/* Quick Search Button (opens command palette) */}
          <button
            onClick={() => {
              playClick();
              onOpenSearch();
            }}
            className="hidden md:flex items-center gap-2 bg-[#eae8e1] hover:bg-[#e0ded6] border border-[#dfded8] rounded-full px-3.5 py-1.5 text-xs text-[#555a60] transition-colors group"
            title="Search portfolio (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-gray-400 group-hover:text-cyber-emerald transition-colors" />
            <span className="text-xs">Explore my work...</span>
            <kbd className="font-mono text-[10px] bg-white border border-[#cfcdc5] px-1.5 py-0.5 rounded text-gray-500 shadow-2xs">
              CTRL K
            </kbd>
          </button>

          {/* Sound FX Toggle */}
          <button
            onClick={handleSoundToggle}
            className="p-2 rounded-full border border-[#dfded8] bg-[#faf9f5] hover:bg-[#eae8e1] text-[#555a60] transition-colors"
            title={soundOn ? 'Sound FX Enabled (Click to mute)' : 'Sound FX Muted (Click to enable)'}
          >
            {soundOn ? <Volume2 className="w-3.5 h-3.5 text-cyber-emerald" /> : <VolumeX className="w-3.5 h-3.5 text-gray-400" />}
          </button>

          {/* Terminal Reel Button */}
          <button
            onClick={() => {
              playBlip(750);
              onOpenTerminal();
            }}
            className="p-2 rounded-full border border-[#dfded8] bg-[#faf9f5] hover:bg-[#eae8e1] text-[#555a60] transition-colors hidden sm:flex"
            title="Open Cyber Terminal Reel"
          >
            <Terminal className="w-3.5 h-3.5 hover:text-cyber-emerald transition-colors" />
          </button>

          {/* Let's Connect CTA Button */}
          <button
            onClick={() => {
              playClick();
              onOpenContact();
            }}
            className="flex items-center gap-2 bg-[#0c1012] hover:bg-[#182025] text-white px-4 py-2 rounded-full font-mono text-xs tracking-wider font-semibold transition-all shadow-sm hover:shadow active:scale-95 group"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-emerald group-hover:scale-125 transition-transform" />
            <span>LET'S CONNECT</span>
            <span className="group-hover:translate-x-0.5 transition-transform">→</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg border border-[#dfded8] bg-[#faf9f5] lg:hidden text-[#121417]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#f4f3ef] border-b border-[#dfded8] px-6 py-4 space-y-3 animate-fadeIn">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="flex items-center gap-2 p-2 rounded hover:bg-white border border-transparent hover:border-[#dfded8] text-left transition-colors"
              >
                <span className="font-mono text-xs text-cyber-emerald">{item.num}</span>
                <span className="font-display text-sm font-bold">{item.label}</span>
              </button>
            ))}
          </div>
          <div className="pt-2 border-t border-[#dfded8] flex items-center justify-between">
            <button
              onClick={() => {
                onOpenSearch();
                setMobileMenuOpen(false);
              }}
              className="text-xs font-mono text-gray-600 flex items-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5" /> Search (CTRL+K)
            </button>
            <button
              onClick={() => {
                onOpenTerminal();
                setMobileMenuOpen(false);
              }}
              className="text-xs font-mono text-gray-600 flex items-center gap-1.5"
            >
              <Terminal className="w-3.5 h-3.5" /> Cyber Console
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
