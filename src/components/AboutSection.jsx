import React, { useState } from 'react';
import { ArrowRight, Shield, Award, BookOpen, Terminal, CheckCircle2, X } from 'lucide-react';
import DecipherText from './DecipherText';
import { playClick, playBlip } from '../utils/audio';

export default function AboutSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="about" className="border-b border-[#dfded8] bg-[#f4f3ef] relative">
      <div className="max-w-[1720px] mx-auto grid grid-cols-1 lg:grid-cols-12">
        
        {/* Index indicator */}
        <div className="lg:col-span-1 border-b lg:border-b-0 lg:border-r border-[#dfded8] p-6 lg:p-8 flex lg:flex-col items-center justify-between bg-[#f8f7f2]/50">
          <div className="flex lg:flex-col items-center gap-2">
            <span className="font-display font-black text-2xl text-[#121417]">02</span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-gray-500 font-bold lg:-rotate-90 lg:my-8">
              ABOUT
            </span>
          </div>
          <div className="w-8 h-[1px] bg-[#dfded8] lg:w-[1px] lg:h-8" />
        </div>

        {/* Story Text Column */}
        <div className="lg:col-span-6 border-b lg:border-b-0 lg:border-r border-[#dfded8] p-8 lg:p-12 flex flex-col justify-between">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-cyber-emerald font-bold mb-2">
              PHILOSOPHY // DRIVE
            </div>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-[#121417] uppercase tracking-tight mb-6">
              <DecipherText text="MORE THAN JUST CODE" />
            </h2>
            <div className="space-y-4 text-gray-700 text-sm sm:text-base leading-relaxed font-sans max-w-xl">
              <p>
                I'm a <strong className="font-semibold text-black">BCA student</strong> with a deep interest in cybersecurity and cloud computing. I love understanding how systems work, why they break, and how to make them secure.
              </p>
              <p>
                This portfolio is a reflection of my learning, experiments and journey towards becoming a cybersecurity professional. From analyzing packet streams in Wireshark to architecting hardened cloud infrastructure, every project is built from the ground up.
              </p>
            </div>

            {/* Micro Pillars */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-[#dfded8]">
              <div>
                <div className="font-mono text-[11px] text-cyber-emerald font-bold">01 // RECON</div>
                <div className="text-xs text-gray-600 mt-1">Deep analysis of attack vectors</div>
              </div>
              <div>
                <div className="font-mono text-[11px] text-cyber-emerald font-bold">02 // HARDEN</div>
                <div className="text-xs text-gray-600 mt-1">Zero-trust architecture</div>
              </div>
              <div>
                <div className="font-mono text-[11px] text-cyber-emerald font-bold">03 // EVOLVE</div>
                <div className="text-xs text-gray-600 mt-1">Continuous learning in SOC & Cloud</div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={() => {
                playClick();
                setModalOpen(true);
              }}
              className="border border-[#121417] hover:bg-black hover:text-white text-[#121417] px-6 py-3 font-mono text-xs tracking-wider font-semibold inline-flex items-center gap-2 transition-all active:scale-95 group"
            >
              <span>MY FULL STORY</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Mountain Traveler Visual Column */}
        <div className="lg:col-span-5 p-8 lg:p-12 flex items-center justify-center bg-[#f8f7f3]">
          <div className="relative group max-w-[380px] w-full overflow-hidden border border-[#dfded8] bg-black shadow-md">
            
            {/* Image */}
            <img 
              src="./assets/about-traveler.jpg" 
              alt="Subojit looking towards mountains - Same curiosity, bigger goals" 
              className="w-full h-[280px] sm:h-[320px] object-cover filter contrast-125 transition-transform duration-700 group-hover:scale-105"
              onError={(e) => {
                if (!e.target.dataset.retried) {
                  e.target.dataset.retried = 'true';
                  e.target.src = '/subojit-github.io/assets/about-traveler.jpg';
                } else {
                  e.target.src = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=700&q=80";
                }
              }}
            />

            {/* Dark vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            {/* Signature & Badge */}
            <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col items-start justify-end text-white">
              <span className="font-mono text-[10px] text-emerald-400 tracking-widest uppercase font-semibold">
                ETHOS & VISION
              </span>
              <p className="font-display font-black text-lg sm:text-xl tracking-wide uppercase leading-tight mt-1 text-white drop-shadow">
                SAME CURIOSITY.<br />BIGGER GOALS.
              </p>
              <div className="mt-2 font-mono text-[10px] text-gray-300 italic">
                ~ Subojit Sarkar
              </div>
            </div>

            {/* Cyber scanline accent */}
            <div className="absolute top-2 right-2 font-mono text-[9px] text-emerald-400/80 bg-black/70 px-2 py-0.5 rounded border border-emerald-500/30">
              EXP // 2026
            </div>
          </div>
        </div>

      </div>

      {/* FULL STORY MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-[#f4f3ef] border border-[#121417] max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            <button 
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded hover:bg-gray-200 text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="font-mono text-xs text-cyber-emerald font-bold tracking-widest uppercase mb-1">
              DOSSIER // SUBOJIT SARKAR
            </div>
            <h3 className="font-display font-black text-2xl text-[#121417] uppercase tracking-tight mb-4">
              CYBERSECURITY EXPLORER & BUILDER
            </h3>

            <div className="space-y-4 text-sm text-gray-700 font-sans leading-relaxed">
              <p>
                My fascination with computers started not with playing games, but with wondering <em>how games communicated over servers, how firewalls blocked packets, and what happened when protocols failed</em>.
              </p>
              <p>
                As a Bachelor of Computer Applications (BCA) student, I spend my days balancing academic fundamentals with hands-on security research: setting up vulnerable labs in VirtualBox, running penetration tests with Kali Linux, investigating Wireshark pcaps, and building defensive monitoring scripts in Python and Bash.
              </p>
              
              <div className="bg-white border border-[#dfded8] p-4 rounded my-4 space-y-2">
                <div className="font-mono text-xs font-bold text-black uppercase">Core Competencies:</div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-gray-700">
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyber-emerald" /> Network Traffic Analysis (Wireshark)</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyber-emerald" /> Web Application Security (OWASP)</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyber-emerald" /> Cloud Hardening & AWS IAM</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyber-emerald" /> Linux System Administration</li>
                </ul>
              </div>

              <p>
                I believe that to be an effective defender, you must thoroughly understand the offensive mindset. My ultimate goal is to contribute to a more secure, resilient digital landscape where privacy and trust are preserved.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#dfded8] flex items-center justify-between">
              <span className="font-mono text-xs text-gray-500">KOLKATA / INDIA • 2026</span>
              <button 
                onClick={() => setModalOpen(false)}
                className="bg-[#121417] text-white px-5 py-2 font-mono text-xs uppercase tracking-wider font-semibold"
              >
                CLOSE DOSSIER
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
