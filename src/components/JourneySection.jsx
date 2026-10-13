import React, { useState } from 'react';
import { ChevronRight, Calendar, Sparkles, CheckCircle2 } from 'lucide-react';
import DecipherText from './DecipherText';
import { playClick } from '../utils/audio';

export default function JourneySection() {
  const [selectedMilestone, setSelectedMilestone] = useState(4); // 2025 active by default

  const timeline = [
    {
      year: '2021',
      title: 'Started Exploring Tech',
      subtitle: 'First lines of code & curiosity',
      desc: 'Disassembled old hardware, installed first Linux distribution (Ubuntu), wrote first Python scripts, and developed a passion for how computers communicate under the hood.',
      milestones: ['First Python automation scripts', 'Linux terminal exploration', 'Basic computer networking principles']
    },
    {
      year: '2022',
      title: 'Learned Web Development',
      subtitle: 'Building fullstack applications',
      desc: 'Mastered frontend architectures (React, Tailwind CSS) and backend REST APIs. Understood HTTP protocols, headers, client-server handshakes, and database relationships.',
      milestones: ['React & JavaScript mastering', 'RESTful API construction', 'Understanding HTTP/HTTPS mechanics']
    },
    {
      year: '2023',
      title: 'Dived into Cybersecurity',
      subtitle: 'CTFs, ethical hacking & packet analysis',
      desc: 'Shifted focus squarely towards information security. Practiced on TryHackMe & Hack The Box, explored Wireshark packet dissection, Kali Linux tooling, and OWASP Top 10 vulnerabilities.',
      milestones: ['TryHackMe top ranking', 'Wireshark packet capture mastery', 'Hands-on penetration testing labs']
    },
    {
      year: '2024',
      title: 'Exploring Cloud Computing',
      subtitle: 'AWS, containers & infrastructure',
      desc: 'Deep-dived into AWS architecture (VPC, IAM, EC2, S3), Docker containers, Kubernetes fundamentals, and cloud security hardening principles.',
      milestones: ['AWS cloud architecture labs', 'Docker container isolation', 'Infrastructure as Code (Terraform)']
    },
    {
      year: '2025',
      title: 'Building Bigger Things',
      subtitle: 'Production projects & research',
      desc: 'Architecting end-to-end security solutions, custom CLI vulnerability assessment tools, zero-trust authentication flows, and expanding my BCA degree journey towards professional SOC & cloud defense roles.',
      milestones: ['Custom security tool releases', 'BCA technical leadership', 'Continuous CTF & threat modeling']
    }
  ];

  const current = timeline[selectedMilestone];

  return (
    <section id="journey" className="border-b border-[#dfded8] bg-[#f4f3ef] relative">
      <div className="max-w-[1720px] mx-auto grid grid-cols-1 lg:grid-cols-12">
        
        {/* Index indicator */}
        <div className="lg:col-span-1 border-b lg:border-b-0 lg:border-r border-[#dfded8] p-6 lg:p-8 flex lg:flex-col items-center justify-between bg-[#f8f7f2]/50">
          <div className="flex lg:flex-col items-center gap-2">
            <span className="font-display font-black text-2xl text-[#121417]">06</span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-gray-500 font-bold lg:-rotate-90 lg:my-8">
              MY JOURNEY
            </span>
          </div>
          <div className="w-8 h-[1px] bg-[#dfded8] lg:w-[1px] lg:h-8" />
        </div>

        {/* Timeline Content (Cols 2-12) */}
        <div className="lg:col-span-11 p-6 sm:p-10 lg:p-12">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#dfded8]">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-cyber-emerald font-bold mb-1">
                CHRONOLOGY // EVOLUTION
              </div>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-[#121417] uppercase tracking-tight">
                <DecipherText text="A TIMELINE OF GROWTH" />
              </h2>
            </div>
            <div className="font-mono text-xs text-gray-500">
              CLICK ANY YEAR TO EXPAND →
            </div>
          </div>

          {/* Horizontal Timeline Track (Matching Reference Image) */}
          <div className="my-10 relative">
            
            {/* Connecting baseline bar */}
            <div className="hidden sm:block absolute top-4 left-6 right-6 h-[2px] bg-[#dfded8] z-0" />

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 relative z-10">
              {timeline.map((item, idx) => {
                const isSelected = selectedMilestone === idx;
                return (
                  <button
                    key={item.year}
                    onClick={() => {
                      playClick();
                      setSelectedMilestone(idx);
                    }}
                    className={`flex flex-col items-start sm:items-center text-left sm:text-center p-3 rounded transition-all group ${
                      isSelected ? 'bg-white shadow-xs' : 'hover:bg-white/60'
                    }`}
                  >
                    {/* Circle Node Pin */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                      isSelected
                        ? 'bg-cyber-emerald border-emerald-400 text-white shadow-sm scale-110'
                        : 'bg-white border-[#cfcdc5] text-gray-600 group-hover:border-black'
                    }`}>
                      <span className="w-2 h-2 rounded-full bg-current" />
                    </div>

                    {/* Year badge */}
                    <span className={`font-mono text-xs font-black mt-3 transition-colors ${
                      isSelected ? 'text-cyber-emerald' : 'text-gray-900'
                    }`}>
                      {item.year}
                    </span>

                    {/* Milestone title */}
                    <span className="font-display font-bold text-xs text-gray-800 mt-1 line-clamp-2">
                      {item.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Milestone Detail Card */}
          <div className="bg-white border border-[#dfded8] p-6 rounded-lg shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-base font-black text-cyber-emerald bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                  {current.year}
                </span>
                <div>
                  <h3 className="font-display font-black text-lg text-[#121417] uppercase">
                    {current.title}
                  </h3>
                  <p className="font-mono text-xs text-gray-500">
                    {current.subtitle}
                  </p>
                </div>
              </div>
              <span className="font-mono text-[10px] text-gray-400">
                MILESTONE {selectedMilestone + 1} OF {timeline.length}
              </span>
            </div>

            <p className="text-sm text-gray-700 font-sans leading-relaxed mt-4">
              {current.desc}
            </p>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <span className="font-mono text-[10px] text-gray-400 uppercase tracking-wider block mb-2">
                Key Accomplishments:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {current.milestones.map((m, i) => (
                  <div key={i} className="flex items-center gap-2 font-mono text-xs text-gray-700 bg-[#f8f7f2] px-3 py-1.5 rounded border border-[#dfded8]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyber-emerald shrink-0" />
                    <span>{m}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
