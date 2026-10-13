import React, { useState } from 'react';
import { ArrowRight, Play, ExternalLink, ShieldCheck, Cpu, Terminal, Sparkles } from 'lucide-react';
import Globe3D from './Globe3D';
import TerrainMesh3D from './TerrainMesh3D';
import DecipherText from './DecipherText';
import { playClick, playBlip } from '../utils/audio';

export default function HeroSection({ onOpenIntro, onExploreProjects }) {
  const [glitchActive, setGlitchActive] = useState(false);

  // Decipher / scramble text effect for headline on hover
  const triggerGlitch = () => {
    setGlitchActive(true);
    playBlip(720, 0.05);
    setTimeout(() => setGlitchActive(false), 500);
  };

  return (
    <section id="home" className="relative border-b border-[#dfded8] bg-[#f4f3ef] overflow-hidden">
      
      {/* Background subtle cyber grid */}
      <div className="absolute inset-0 cyber-grid opacity-60 pointer-events-none" />

      <div className="max-w-[1720px] w-full mx-auto grid grid-cols-1 xl:grid-cols-12 xl:h-[calc(100vh-4rem)] xl:max-h-[calc(100vh-4rem)] min-h-0">
        
        {/* ========================================================= */}
        {/* LEFT COLUMN: Scroll indicator + Headline & Stats (Cols 1-5) */}
        {/* ========================================================= */}
        <div className="xl:col-span-5 border-b xl:border-b-0 xl:border-r border-[#dfded8] flex flex-row h-full overflow-hidden">
          
          {/* Vertical Index Track */}
          <div className="hidden sm:flex flex-col items-center justify-between py-4 xl:py-5 px-3 border-r border-[#dfded8] bg-[#f8f7f2]/50 shrink-0 select-none h-full">
            <div className="flex flex-col items-center">
              <span className="font-display font-black text-xl text-[#121417]">01</span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-gray-500 font-bold -rotate-90 my-6">
                HOME
              </span>
            </div>

            {/* Dot Matrix Graphic */}
            <div className="grid grid-cols-3 gap-1 my-3 opacity-50">
              {Array.from({ length: 9 }).map((_, i) => (
                <span key={i} className="w-1 h-1 bg-black rounded-full" />
              ))}
            </div>

            {/* Mouse Scroll Indicator */}
            <div className="flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition-opacity">
              <div className="w-3.5 h-6 border border-black rounded-full flex items-start justify-center p-0.5">
                <span className="w-1 h-1 bg-black rounded-full animate-bounce" />
              </div>
              <span className="font-mono text-[7px] uppercase tracking-widest text-gray-600 font-bold">
                SCROLL
              </span>
            </div>
          </div>

          {/* Headline Content */}
          <div className="flex-1 p-4 sm:p-5 xl:p-6 flex flex-col justify-between h-full overflow-hidden">
            <div>
              {/* Category Tag Header */}
              <div className="flex items-center gap-2 mb-1.5 font-mono text-[10px] xl:text-[11px] text-gray-600 tracking-wider">
                <span className="hover:text-black transition-colors font-medium">STUDENT</span>
                <span>/</span>
                <span className="hover:text-black transition-colors font-medium">BUILDER</span>
                <span>/</span>
                <span className="text-cyber-emerald font-bold">CYBERSECURITY</span>
                <span>/</span>
                <span className="hover:text-black transition-colors font-medium">CLOUD</span>
              </div>

              {/* Giant Brutalist Heading with Cyber Decipher Animation */}
              <h1 
                className="font-display font-black text-3xl sm:text-4xl lg:text-5xl xl:text-[2.6rem] 2xl:text-[3.1rem] tracking-tight leading-[0.98] text-[#121417] uppercase select-none my-1.5 xl:my-2"
              >
                <DecipherText text="I DON'T TRUST" speed={25} /> <br />
                <DecipherText text="THE SYSTEM." speed={25} /> <br />
                <DecipherText text="I LEARN TO" speed={25} /> <br />
                <span className="text-cyber-emerald transition-all duration-200">
                  <DecipherText text="SECURE IT." speed={25} />
                </span>
              </h1>

              {/* Subtext description */}
              <p className="mt-1.5 xl:mt-2 text-xs xl:text-[13px] 2xl:text-sm text-gray-700 leading-snug xl:leading-relaxed max-w-md font-sans">
                A curious mind exploring cybersecurity, cloud computing and real-world systems — turning knowledge into practical solutions and meaningful projects.
              </p>

              {/* CTA Action Buttons */}
              <div className="mt-2.5 xl:mt-3 flex flex-wrap items-center gap-2.5">
                <button
                  onClick={() => {
                    playClick();
                    onExploreProjects();
                  }}
                  className="bg-[#0c1012] hover:bg-[#192227] text-white px-4 py-2 xl:px-5 xl:py-2.5 rounded-none font-mono text-xs tracking-wider font-semibold flex items-center gap-1.5 shadow-sm transition-all hover:translate-x-0.5 active:scale-95 group"
                >
                  <span>EXPLORE MY WORK</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => {
                    playBlip(800);
                    onOpenIntro();
                  }}
                  className="border-2 border-[#121417] hover:bg-black/5 text-[#121417] px-4 py-2 xl:px-4.5 xl:py-2.5 rounded-full font-mono text-xs tracking-wider font-semibold flex items-center gap-1.5 transition-all active:scale-95 group"
                >
                  <span>WATCH INTRO</span>
                  <div className="w-4 h-4 rounded-full border border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                    <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                  </div>
                </button>
              </div>

              {/* Telemetry HUD Badge */}
              <div className="mt-2 xl:mt-2.5 p-1.5 xl:p-2 bg-[#eae8e1]/70 border border-[#dfded8] flex items-center justify-between font-mono text-[9px] xl:text-[10px] text-gray-600">
                <span className="flex items-center gap-1.5 text-cyber-emerald font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyber-emerald animate-pulse" />
                  PROTOCOL // ZERO-TRUST ARCHITECTURE
                </span>
                <span className="hidden sm:inline text-gray-500">SOC TIER-1 RECON</span>
              </div>
            </div>

            {/* Bottom Metric Stats Grid */}
            <div className="mt-2.5 xl:mt-3 pt-2 xl:pt-2.5 border-t border-[#dfded8] grid grid-cols-2 sm:grid-cols-4 gap-1.5 xl:gap-2">
              <div className="bg-white/80 border border-[#dfded8] p-1.5 xl:p-2 group hover:border-black transition-colors">
                <div className="font-display font-black text-lg xl:text-xl 2xl:text-2xl text-[#121417] group-hover:text-cyber-emerald transition-colors">
                  10+
                </div>
                <div className="font-mono text-[8.5px] xl:text-[9.5px] text-gray-500 uppercase tracking-wider mt-0.5 font-semibold">
                  Projects
                </div>
              </div>

              <div className="bg-white/80 border border-[#dfded8] p-1.5 xl:p-2 group hover:border-black transition-colors">
                <div className="font-display font-black text-lg xl:text-xl 2xl:text-2xl text-[#121417] group-hover:text-cyber-emerald transition-colors">
                  5+
                </div>
                <div className="font-mono text-[8.5px] xl:text-[9.5px] text-gray-500 uppercase tracking-wider mt-0.5 font-semibold">
                  Tech Areas
                </div>
              </div>

              <div className="bg-white/80 border border-[#dfded8] p-1.5 xl:p-2 group hover:border-black transition-colors">
                <div className="font-display font-black text-lg xl:text-xl 2xl:text-2xl text-[#121417] group-hover:text-cyber-emerald transition-colors">
                  ∞
                </div>
                <div className="font-mono text-[8.5px] xl:text-[9.5px] text-gray-500 uppercase tracking-wider mt-0.5 font-semibold">
                  Learning
                </div>
              </div>

              <div className="bg-white/80 border border-[#dfded8] p-1.5 xl:p-2 group hover:border-black transition-colors">
                <div className="font-display font-black text-base xl:text-lg 2xl:text-xl text-[#121417] group-hover:text-cyber-emerald transition-colors leading-tight">
                  Bigger
                </div>
                <div className="font-mono text-[8.5px] xl:text-[9.5px] text-gray-500 uppercase tracking-wider mt-0.5 font-semibold">
                  Things Ahead
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================= */}
        {/* CENTER COLUMN: Subojit Portrait & Holographic Glitch (Cols 6-9) */}
        {/* ========================================================= */}
        <div 
          className="xl:col-span-4 border-b xl:border-b-0 xl:border-r border-[#dfded8] p-0 flex flex-col justify-between items-center relative bg-[#faf8ec] overflow-hidden h-full min-h-[380px] sm:min-h-[460px] xl:min-h-0"
          style={{ perspective: '1000px' }}
        >
          {/* Subtle background ambient cyber ring */}
          <div className="absolute w-[440px] h-[440px] border border-dashed border-cyber-emerald/30 rounded-full animate-spin-slow pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

          {/* Interactive 3D Holographic Card Container (Fills Column Seamlessly) */}
          <div 
            className="relative z-10 w-full h-full flex flex-col justify-end items-center transition-transform duration-200 ease-out group cursor-crosshair overflow-hidden"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
              const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
              e.currentTarget.style.transform = `rotateY(${x}deg) rotateX(${y}deg) scale3d(1.01, 1.01, 1.01)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)';
            }}
          >
            {/* The User's High-Res Hero Photo - Fills column naturally */}
            <img 
              src="./assets/hero-subojit.jpg" 
              alt="Subojit Sarkar - Cybersecurity Explorer" 
              className="w-full h-full max-h-[400px] sm:max-h-[500px] xl:max-h-[calc(100vh-6.5rem)] object-contain object-bottom filter contrast-105 transition-all duration-300"
              loading="eager"
              onError={(e) => {
                if (!e.target.dataset.retried) {
                  e.target.dataset.retried = 'true';
                  e.target.src = '/subojit-github.io/assets/hero-subojit.jpg';
                }
              }}
            />

            {/* Holographic Scanline & Glitch Accent on Hover */}
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 scanlines bg-emerald-500/5">
              <div className="absolute top-3 right-3 font-mono text-[9px] text-emerald-400 bg-black/80 px-2 py-0.5 rounded border border-emerald-500/30">
                0x7F // LIVE HOLOGRAM ACTIVE
              </div>
              <div className="absolute bottom-3 left-3 font-mono text-[9px] text-gray-300 bg-black/80 px-2 py-0.5 rounded border border-gray-700">
                PARALLAX 3D TILT
              </div>
            </div>
          </div>

          {/* Bottom Micro Status Bar */}
          <div className="w-full px-3 py-1 bg-white/70 border-t border-[#dfded8] flex items-center justify-between font-mono text-[8px] xl:text-[9px] text-gray-500 shrink-0">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-emerald animate-pulse" />
              <span>DIGITAL TWIN // SYNCED</span>
            </span>
            <span className="text-gray-400">HOVER TO TILT 3D</span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: 3D Threat Globe + System Status (Cols 10-12) */}
        {/* ========================================================= */}
        <div className="xl:col-span-3 p-3 xl:p-3.5 2xl:p-4 flex flex-col justify-between h-full bg-[#f8f7f3] overflow-hidden">
          
          <div>
            {/* Header: Global Threat Map (Live Simulation) */}
            <div className="flex items-center justify-between pb-1.5 mb-0.5 border-b border-[#dfded8]">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-black text-[11px] xl:text-xs tracking-wider text-[#121417] uppercase">
                    GLOBAL THREAT MAP
                  </span>
                  <ExternalLink className="w-3 h-3 text-gray-500" />
                </div>
                <span className="font-mono text-[8px] xl:text-[9px] text-gray-500 uppercase tracking-widest">
                  (LIVE SIMULATION)
                </span>
              </div>

              {/* Threat Status Legend */}
              <div className="flex flex-col items-end gap-0.5 font-mono text-[8px] xl:text-[9px]">
                <div className="flex items-center gap-1 text-gray-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Normal</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span>Suspicious</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  <span>Malicious</span>
                </div>
              </div>
            </div>

            {/* Interactive 3D Three.js Globe Canvas */}
            <div className="my-0.5">
              <Globe3D />
            </div>

            {/* SYSTEM STATUS Card (Dark Tactical Module #0a0e11) */}
            <div className="bg-[#090d10] text-white rounded p-2 xl:p-2.5 border border-[#1b252c] font-mono text-[9px] xl:text-[10px] shadow-sm my-1">
              <div className="flex items-center justify-between pb-1 mb-1 border-b border-[#1b252c] text-[8.5px] xl:text-[9px]">
                <div className="flex items-center gap-1.5 text-emerald-400 font-semibold tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>All Systems Operational</span>
                </div>
                <span className="text-gray-500 text-[8px]">99.98%</span>
              </div>

              <div className="grid grid-cols-2 gap-y-1 gap-x-2 text-[8.5px] xl:text-[9.5px]">
                <div className="flex items-center justify-between pr-1.5 border-r border-[#1a232a]">
                  <span className="text-gray-400 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-emerald-400" /> Network
                  </span>
                  <span className="text-emerald-400 font-semibold">SECURE</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-emerald-400" /> Firewall
                  </span>
                  <span className="text-emerald-400 font-semibold">SECURE</span>
                </div>
                <div className="flex items-center justify-between pr-1.5 border-r border-[#1a232a]">
                  <span className="text-gray-400 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-emerald-400" /> Intrusion Det.
                  </span>
                  <span className="text-emerald-400 font-semibold">SECURE</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-emerald-400" /> Cloud Services
                  </span>
                  <span className="text-emerald-400 font-semibold">SECURE</span>
                </div>
              </div>
            </div>

            {/* CURRENT FOCUS Progress Bars */}
            <div className="mt-1 space-y-1 font-mono text-[8.5px] xl:text-[9.5px]">
              <div className="text-gray-500 font-semibold uppercase tracking-wider text-[8px] xl:text-[8.5px]">
                CURRENT FOCUS
              </div>

              <div>
                <div className="flex justify-between text-gray-700 mb-0.5">
                  <span>Cybersecurity</span>
                  <span className="font-semibold text-cyber-emerald">85%</span>
                </div>
                <div className="w-full h-1 bg-[#dfded8] rounded-full overflow-hidden">
                  <div className="h-full bg-cyber-emerald w-[85%] rounded-full transition-all" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-gray-700 mb-0.5">
                  <span>Cloud Computing</span>
                  <span className="font-semibold text-gray-800">70%</span>
                </div>
                <div className="w-full h-1 bg-[#dfded8] rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-700 w-[70%] rounded-full transition-all" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-gray-700 mb-0.5">
                  <span>Web Development</span>
                  <span className="font-semibold text-gray-800">65%</span>
                </div>
                <div className="w-full h-1 bg-[#dfded8] rounded-full overflow-hidden">
                  <div className="h-full bg-gray-700 w-[65%] rounded-full transition-all" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-gray-700 mb-0.5">
                  <span>Networking</span>
                  <span className="font-semibold text-gray-800">75%</span>
                </div>
                <div className="w-full h-1 bg-[#dfded8] rounded-full overflow-hidden">
                  <div className="h-full bg-cyber-emerald w-[75%] rounded-full transition-all" />
                </div>
              </div>
            </div>

          </div>

          {/* Far Right Bottom: 3D Topographic Wireframe Mesh */}
          <div className="mt-1 pt-1 border-t border-[#dfded8] flex items-center justify-between">
            <TerrainMesh3D />
            <div className="font-mono text-[8px] xl:text-[8.5px] text-gray-400 text-right leading-tight">
              NODE // ACTIVE<br />
              <span className="text-cyber-emerald font-bold">2026.SEC</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
