import React, { useState } from 'react';
import { Shield, Cloud, Network, Terminal, Code2, ChevronRight, CheckCircle2 } from 'lucide-react';
import SkillsCore3D from './SkillsCore3D';
import DecipherText from './DecipherText';
import { playClick, playBlip } from '../utils/audio';

export default function SkillsSection() {
  const [selectedSkill, setSelectedSkill] = useState('Cybersecurity');

  const skillsData = {
    'Cybersecurity': {
      icon: Shield,
      summary: 'Penetration testing, vulnerability assessment, threat modeling, and defensive security operations.',
      tools: ['Wireshark', 'Nmap', 'Metasploit', 'Burp Suite', 'OWASP Top 10', 'Kali Linux', 'Cryptography'],
      concepts: ['Network Defense', 'Packet Analysis', 'Web Application Security', 'Zero-Trust Architecture'],
      level: '85%'
    },
    'Cloud Computing': {
      icon: Cloud,
      summary: 'Cloud infrastructure provisioning, IAM security policies, and containerization.',
      tools: ['AWS (EC2, S3, IAM, VPC)', 'Docker', 'Kubernetes', 'Terraform', 'CloudWatch', 'Nginx'],
      concepts: ['Cloud Hardening', 'Microservices Security', 'Infrastructure as Code', 'Serverless'],
      level: '70%'
    },
    'Networking': {
      icon: Network,
      summary: 'Deep protocol analysis, routing & switching, firewall configuration, and VPN implementations.',
      tools: ['TCP/IP Stack', 'DNS / DHCP', 'BGP & OSPF', 'pfSense / iptables', 'Packet Tracer'],
      concepts: ['Subnetting & VLANs', 'Firewall Rulesets', 'Intrusion Detection (IDS/IPS)', 'TLS/SSL Handshake'],
      level: '75%'
    },
    'Linux': {
      icon: Terminal,
      summary: 'Unix administration, automated Bash scripting, server hardening, and kernel monitoring.',
      tools: ['Ubuntu Server', 'Debian', 'Kali Linux', 'Bash Shell', 'systemd', 'SSH Hardening', 'Cron Jobs'],
      concepts: ['File Permissions (chmod/chown)', 'Process Management', 'Log Analysis (/var/log)', 'SELinux / AppArmor'],
      level: '80%'
    },
    'Programming': {
      icon: Code2,
      summary: 'Security automation, exploit payload analysis, backend development, and CLI tool design.',
      tools: ['Python', 'JavaScript / React', 'Bash', 'C / C++', 'SQL', 'Git / GitHub', 'REST APIs'],
      concepts: ['Socket Programming', 'Exploit Scripts', 'Secure Coding Practices', 'Asynchronous Systems'],
      level: '75%'
    }
  };

  const skillKeys = ['Cybersecurity', 'Cloud Computing', 'Networking', 'Linux', 'Programming'];

  const handleSelect = (key) => {
    playClick();
    setSelectedSkill(key);
  };

  const current = skillsData[selectedSkill];

  return (
    <section id="skills" className="border-b border-[#dfded8] bg-[#f4f3ef] relative">
      <div className="max-w-[1720px] mx-auto grid grid-cols-1 lg:grid-cols-12">
        
        {/* Index indicator */}
        <div className="lg:col-span-1 border-b lg:border-b-0 lg:border-r border-[#dfded8] p-6 lg:p-8 flex lg:flex-col items-center justify-between bg-[#f8f7f2]/50">
          <div className="flex lg:flex-col items-center gap-2">
            <span className="font-display font-black text-2xl text-[#121417]">03</span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-gray-500 font-bold lg:-rotate-90 lg:my-8">
              SKILLS
            </span>
          </div>
          <div className="w-8 h-[1px] bg-[#dfded8] lg:w-[1px] lg:h-8" />
        </div>

        {/* Constellation Radar & 3D Core Visual Column (Cols 2-8) */}
        <div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-[#dfded8] p-6 sm:p-10 flex flex-col justify-between relative bg-gradient-to-b from-[#f9f8f4] to-[#f3f1e9]">
          
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-cyber-emerald font-bold mb-1">
              NETWORK GRAPH // DOMAIN
            </div>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-[#121417] uppercase tracking-tight">
              <DecipherText text="A CONNECTED LEARNING UNIVERSE" />
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 font-mono">
              Interconnected cyber defense, cloud architecture and engineering disciplines.
            </p>
          </div>

          {/* Interactive Constellation / Hexagon Radar Graphic */}
          <div className="relative my-8 py-6 flex items-center justify-center min-h-[360px]">
            
            {/* SVG Background Radar lines & connecting geometry */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 500 360">
              <defs>
                <radialGradient id="radarPulse" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Concentric radar rings */}
              <circle cx="250" cy="180" r="140" stroke="#dfded8" strokeWidth="1" strokeDasharray="3 3" fill="none" />
              <circle cx="250" cy="180" r="100" stroke="#dfded8" strokeWidth="1" fill="none" />
              <circle cx="250" cy="180" r="60" stroke="#0e5a3c" strokeWidth="1" strokeOpacity="0.3" fill="url(#radarPulse)" />

              {/* Radar sweep line */}
              <line x1="250" y1="180" x2="390" y2="180" stroke="#10b981" strokeWidth="1.5" strokeOpacity="0.4">
                <animateTransform attributeName="transform" type="rotate" from="0 250 180" to="360 250 180" dur="8s" repeatCount="indefinite" />
              </line>

              {/* Hexagonal web connections */}
              {/* Top: 250, 45 (Cybersecurity) */}
              {/* Top-Right: 400, 110 (Networking) */}
              {/* Bottom-Right: 360, 300 (Programming) */}
              {/* Bottom-Left: 140, 300 (Linux) */}
              {/* Top-Left: 100, 110 (Cloud) */}
              <polygon 
                points="250,45 400,110 360,300 140,300 100,110" 
                stroke="#10b981" 
                strokeWidth="1.2" 
                strokeOpacity="0.4" 
                strokeDasharray="4 4"
                fill="none" 
              />
              <line x1="250" y1="180" x2="250" y2="45" stroke="#dfded8" strokeWidth="1" />
              <line x1="250" y1="180" x2="400" y2="110" stroke="#dfded8" strokeWidth="1" />
              <line x1="250" y1="180" x2="360" y2="300" stroke="#dfded8" strokeWidth="1" />
              <line x1="250" y1="180" x2="140" y2="300" stroke="#dfded8" strokeWidth="1" />
              <line x1="250" y1="180" x2="100" y2="110" stroke="#dfded8" strokeWidth="1" />
            </svg>

            {/* Central 3D Rotating Polyhedron Core */}
            <div className="z-10">
              <SkillsCore3D activeSkill={selectedSkill} />
            </div>

            {/* Interactive Node Buttons placed around the constellation */}
            
            {/* 1. TOP: Cybersecurity */}
            <button
              onClick={() => handleSelect('Cybersecurity')}
              className={`absolute top-2 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center group transition-transform ${
                selectedSkill === 'Cybersecurity' ? 'scale-110' : 'hover:scale-105'
              }`}
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all ${
                selectedSkill === 'Cybersecurity'
                  ? 'bg-cyber-emerald border-emerald-400 text-white shadow-md shadow-emerald-900/20'
                  : 'bg-white border-[#dfded8] text-gray-700 hover:border-black'
              }`}>
                <Shield className="w-4 h-4" />
              </div>
              <span className={`font-mono text-[11px] font-bold mt-1 px-2 py-0.5 rounded ${
                selectedSkill === 'Cybersecurity' ? 'bg-[#0c1012] text-white' : 'text-gray-800 bg-white/70'
              }`}>
                Cybersecurity
              </span>
            </button>

            {/* 2. TOP-RIGHT: Networking */}
            <button
              onClick={() => handleSelect('Networking')}
              className={`absolute top-16 right-4 sm:right-12 z-20 flex flex-col items-center group transition-transform ${
                selectedSkill === 'Networking' ? 'scale-110' : 'hover:scale-105'
              }`}
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all ${
                selectedSkill === 'Networking'
                  ? 'bg-cyber-emerald border-emerald-400 text-white shadow-md shadow-emerald-900/20'
                  : 'bg-white border-[#dfded8] text-gray-700 hover:border-black'
              }`}>
                <Network className="w-4 h-4" />
              </div>
              <span className={`font-mono text-[11px] font-bold mt-1 px-2 py-0.5 rounded ${
                selectedSkill === 'Networking' ? 'bg-[#0c1012] text-white' : 'text-gray-800 bg-white/70'
              }`}>
                Networking
              </span>
            </button>

            {/* 3. BOTTOM-RIGHT: Programming */}
            <button
              onClick={() => handleSelect('Programming')}
              className={`absolute bottom-2 right-8 sm:right-16 z-20 flex flex-col items-center group transition-transform ${
                selectedSkill === 'Programming' ? 'scale-110' : 'hover:scale-105'
              }`}
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all ${
                selectedSkill === 'Programming'
                  ? 'bg-cyber-emerald border-emerald-400 text-white shadow-md shadow-emerald-900/20'
                  : 'bg-white border-[#dfded8] text-gray-700 hover:border-black'
              }`}>
                <Code2 className="w-4 h-4" />
              </div>
              <span className={`font-mono text-[11px] font-bold mt-1 px-2 py-0.5 rounded ${
                selectedSkill === 'Programming' ? 'bg-[#0c1012] text-white' : 'text-gray-800 bg-white/70'
              }`}>
                Programming
              </span>
            </button>

            {/* 4. BOTTOM-LEFT: Linux */}
            <button
              onClick={() => handleSelect('Linux')}
              className={`absolute bottom-2 left-8 sm:left-16 z-20 flex flex-col items-center group transition-transform ${
                selectedSkill === 'Linux' ? 'scale-110' : 'hover:scale-105'
              }`}
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all ${
                selectedSkill === 'Linux'
                  ? 'bg-cyber-emerald border-emerald-400 text-white shadow-md shadow-emerald-900/20'
                  : 'bg-white border-[#dfded8] text-gray-700 hover:border-black'
              }`}>
                <Terminal className="w-4 h-4" />
              </div>
              <span className={`font-mono text-[11px] font-bold mt-1 px-2 py-0.5 rounded ${
                selectedSkill === 'Linux' ? 'bg-[#0c1012] text-white' : 'text-gray-800 bg-white/70'
              }`}>
                Linux
              </span>
            </button>

            {/* 5. TOP-LEFT: Cloud */}
            <button
              onClick={() => handleSelect('Cloud Computing')}
              className={`absolute top-16 left-4 sm:left-12 z-20 flex flex-col items-center group transition-transform ${
                selectedSkill === 'Cloud Computing' ? 'scale-110' : 'hover:scale-105'
              }`}
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all ${
                selectedSkill === 'Cloud Computing'
                  ? 'bg-cyber-emerald border-emerald-400 text-white shadow-md shadow-emerald-900/20'
                  : 'bg-white border-[#dfded8] text-gray-700 hover:border-black'
              }`}>
                <Cloud className="w-4 h-4" />
              </div>
              <span className={`font-mono text-[11px] font-bold mt-1 px-2 py-0.5 rounded ${
                selectedSkill === 'Cloud Computing' ? 'bg-[#0c1012] text-white' : 'text-gray-800 bg-white/70'
              }`}>
                Cloud
              </span>
            </button>

          </div>

          <div className="font-mono text-[10px] text-gray-500 flex items-center justify-between border-t border-[#dfded8] pt-3">
            <span>NODES // 05 ACTIVE</span>
            <span className="text-cyber-emerald font-semibold">CLICK ANY NODE TO INSPECT</span>
          </div>
        </div>

        {/* Right Side: EXPLORE A SKILL Selector & Detail Card (Cols 9-12) */}
        <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between bg-[#f8f7f3]">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-gray-500 font-bold mb-4">
              EXPLORE A SKILL
            </div>

            {/* Selector Pill Tabs */}
            <div className="space-y-2 mb-6">
              {skillKeys.map((key) => {
                const isSelected = selectedSkill === key;
                return (
                  <button
                    key={key}
                    onClick={() => handleSelect(key)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded font-mono text-xs transition-all text-left ${
                      isSelected
                        ? 'bg-white border-2 border-cyber-emerald text-cyber-emerald font-bold shadow-xs'
                        : 'bg-white/60 hover:bg-white border border-[#dfded8] text-gray-700 hover:text-black'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-cyber-emerald animate-pulse' : 'bg-gray-300'}`} />
                      <span>{key}</span>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'translate-x-1 text-cyber-emerald' : 'text-gray-400'}`} />
                  </button>
                );
              })}
            </div>

            {/* Selected Skill Detail Panel */}
            <div className="bg-white border border-[#dfded8] p-4 rounded shadow-2xs space-y-3">
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <span className="font-display font-black text-sm uppercase text-[#121417]">
                  {selectedSkill}
                </span>
                <span className="font-mono text-xs font-bold text-cyber-emerald bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {current.level} Proficiency
                </span>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed font-sans">
                {current.summary}
              </p>

              {/* Tools Badges */}
              <div>
                <span className="font-mono text-[10px] text-gray-400 uppercase tracking-wider block mb-1.5">
                  Key Tooling & Frameworks:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {current.tools.map((tool, idx) => (
                    <span 
                      key={idx} 
                      className="font-mono text-[10px] bg-[#f4f3ef] border border-[#dfded8] px-2 py-0.5 rounded text-gray-800"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Concepts */}
              <div className="pt-2 border-t border-gray-100">
                <span className="font-mono text-[10px] text-gray-400 uppercase tracking-wider block mb-1">
                  Practical Applications:
                </span>
                <ul className="space-y-1">
                  {current.concepts.map((concept, idx) => (
                    <li key={idx} className="flex items-center gap-1.5 text-[11px] text-gray-700 font-sans">
                      <CheckCircle2 className="w-3 h-3 text-cyber-emerald shrink-0" />
                      <span>{concept}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Microcopy footnote from design */}
          <div className="mt-6 pt-4 border-t border-[#dfded8]">
            <p className="font-sans text-xs text-gray-500 italic leading-snug">
              Each skill connects to projects, concepts and real-world applications.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
