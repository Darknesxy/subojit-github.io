import React, { useState, useEffect } from 'react';
import { Search, Terminal, ArrowRight, Shield, Globe, Award, Sparkles, X, Volume2 } from 'lucide-react';
import { playClick, playBlip, toggleSound } from '../utils/audio';

export default function CommandPalette({ isOpen, onClose, onNavigate, onOpenTerminal, onOpenConnect }) {
  const [query, setQuery] = useState('');

  const commands = [
    { id: 'home', title: '01 Jump to Home', desc: 'Hero section & 3D Threat Globe', section: 'home' },
    { id: 'about', title: '02 Read About Me', desc: 'BCA student background & security ethos', section: 'about' },
    { id: 'skills', title: '03 Explore Skills Constellation', desc: 'Interactive 3D radar & technical tools', section: 'skills' },
    { id: 'projects', title: '04 View Projects Showcase', desc: 'Vulnerability Scanner, Cloud Infrastructure', section: 'projects' },
    { id: 'lab', title: '05 Security Lab & Simulations', desc: 'Packet flow pipeline & live attack demos', section: 'lab' },
    { id: 'journey', title: '06 Growth Timeline', desc: 'Chronological roadmap from 2021 to 2025', section: 'journey' },
    { id: 'contact', title: '07 Get In Touch', desc: 'Direct secure communication channel', section: 'contact' },
    { id: 'resume', title: '📄 Download Resume (PDF)', desc: 'Official Subojit Das Sarkar CV', action: 'resume' },
    { id: 'intro', title: '▶ Watch Cyber Intro Reel', desc: 'Interactive terminal security boot sequence', action: 'terminal' },
    { id: 'connect', title: '✉ Send Encrypted Message', desc: 'Open contact modal', action: 'connect' },
    { id: 'sound', title: '🔊 Toggle UI Sound FX', desc: 'Enable or mute tactical synthesized audio', action: 'sound' },
  ];

  const filtered = commands.filter(c => 
    c.title.toLowerCase().includes(query.toLowerCase()) || 
    c.desc.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          playBlip(800);
          // Handled externally if needed
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSelect = (cmd) => {
    playClick();
    if (cmd.section) {
      onNavigate(cmd.section);
      onClose();
    } else if (cmd.action === 'resume') {
      window.open('./assets/subojit-resume.pdf', '_blank');
      onClose();
    } else if (cmd.action === 'terminal') {
      onClose();
      onOpenTerminal();
    } else if (cmd.action === 'connect') {
      onClose();
      onOpenConnect();
    } else if (cmd.action === 'sound') {
      toggleSound();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="bg-[#f4f3ef] border-2 border-[#121417] max-w-xl w-full shadow-2xl overflow-hidden rounded-none">
        
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#dfded8] bg-white">
          <Search className="w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Type a command or jump to section..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent border-none outline-none font-mono text-sm text-[#121417] placeholder-gray-400"
          />
          <kbd className="font-mono text-[10px] bg-gray-100 border border-gray-300 px-1.5 py-0.5 rounded text-gray-600">
            ESC
          </kbd>
        </div>

        {/* Command list */}
        <div className="max-h-[340px] overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-4 text-center font-mono text-xs text-gray-500">
              No matching commands found.
            </div>
          ) : (
            filtered.map((cmd) => (
              <button
                key={cmd.id}
                onClick={() => handleSelect(cmd)}
                className="w-full flex items-center justify-between p-2.5 rounded hover:bg-white border border-transparent hover:border-[#dfded8] text-left transition-colors group"
              >
                <div>
                  <div className="font-display font-bold text-xs text-[#121417] group-hover:text-cyber-emerald transition-colors">
                    {cmd.title}
                  </div>
                  <div className="font-mono text-[11px] text-gray-500">
                    {cmd.desc}
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-black group-hover:translate-x-1 transition-all" />
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-[#dfded8] bg-[#f8f7f2] flex items-center justify-between font-mono text-[10px] text-gray-500">
          <span>NAVIGATION HUD // ACTIVE</span>
          <span>SELECT WITH CLICK</span>
        </div>

      </div>
    </div>
  );
}
