import React, { useState, useEffect } from 'react';
import { Terminal, X, Play, Shield, Cpu, RefreshCw } from 'lucide-react';
import { playBlip, playCyberAlert } from '../utils/audio';

export default function IntroTerminalModal({ isOpen, onClose }) {
  const [lines, setLines] = useState([]);
  const [bootCompleted, setBootCompleted] = useState(false);

  const bootSequence = [
    'BIOS VERSION: SUBOJIT_CORE_v2.6',
    'KERNEL: Linux 6.8.0-kali-amd64 #1 SMP PREEMPT',
    'INITIALIZING DEFENSIVE SYSTEMS...',
    '>> CHECKING CRYPTOGRAPHIC ENCLAVE... [OK]',
    '>> LOADING NETWORK PACKET SNIFFER (WIRESHARK ENGINE)... [OK]',
    '>> HARDENING TCP/IP SOCKET STACK... [OK]',
    '>> DEPLOYING FIREWALL STATEFUL RULES... [OK]',
    '>> ALLOCATING ZERO-TRUST AUTHENTICATION CONTEXT... [OK]',
    '-------------------------------------------------------',
    'WELCOME TO SUBOJIT SARKAR PORTFOLIO OS',
    'ETHOS: "I DON\'T TRUST THE SYSTEM. I LEARN TO SECURE IT."',
    'MISSION: DEFEND DIGITAL INFRASTRUCTURE THROUGH HANDS-ON RIGOR.',
    'STATUS: FULLY OPERATIONAL. READY FOR ENGAGEMENT.'
  ];

  useEffect(() => {
    if (!isOpen) {
      setLines([]);
      setBootCompleted(false);
      return;
    }

    playCyberAlert();
    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx < bootSequence.length) {
        setLines(prev => [...prev, bootSequence[currentIdx]]);
        playBlip(700 + currentIdx * 30, 0.03);
        currentIdx++;
      } else {
        setBootCompleted(true);
        clearInterval(interval);
      }
    }, 150);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-[#080c0f] border-2 border-emerald-500/60 max-w-2xl w-full shadow-2xl rounded-none overflow-hidden scanlines text-emerald-400 font-mono text-xs">
        
        {/* Terminal Header Bar */}
        <div className="bg-[#0f171d] px-4 py-2.5 border-b border-emerald-900/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-gray-300 ml-2 font-bold text-[11px]">
              SUBOJIT_BOOT_TERMINAL // INTRO REEL
            </span>
          </div>

          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Terminal Screen Body */}
        <div className="p-6 min-h-[320px] max-h-[460px] overflow-y-auto space-y-1.5 leading-relaxed bg-[#05080a]">
          {lines.map((line, idx) => (
            <div 
              key={idx} 
              className={
                line.includes('ETHOS') ? 'text-white font-bold bg-emerald-950/40 p-1.5 rounded' :
                line.includes('WELCOME') ? 'text-emerald-300 font-bold text-sm my-1' :
                line.includes('[OK]') ? 'text-emerald-400' : 'text-gray-400'
              }
            >
              {line}
            </div>
          ))}

          {bootCompleted && (
            <div className="pt-4 border-t border-emerald-900/40 mt-4 text-gray-300 space-y-2">
              <div className="flex items-center gap-2 text-white">
                <span className="animate-pulse text-emerald-400">root@subojit-sec:~#</span>
                <span>cat profile.txt</span>
              </div>
              <p className="text-gray-400 text-[11px] leading-relaxed">
                "Hello, I'm Subojit Sarkar. I study computer applications with a laser focus on defensive security, network packet investigation, and hardened cloud engineering. Feel free to explore my interactive 3D threat map, run simulated scans in the Security Lab, and inspect my production code."
              </p>
            </div>
          )}

          {!bootCompleted && (
            <div className="flex items-center gap-2 text-emerald-500 animate-pulse pt-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>BOOTING SECURITY ENCLAVE...</span>
            </div>
          )}
        </div>

        {/* Terminal Footer */}
        <div className="bg-[#0b1216] px-4 py-3 border-t border-emerald-900/60 flex items-center justify-between text-[10px] text-gray-400">
          <span>PORT 443 // ENCRYPTED SESSION</span>
          <button
            onClick={onClose}
            className="bg-emerald-600 hover:bg-emerald-500 text-black px-4 py-1.5 font-bold uppercase transition-colors"
          >
            ENTER WORKSPACE
          </button>
        </div>

      </div>
    </div>
  );
}
