import React, { useState } from 'react';
import { ArrowRight, Terminal, ExternalLink, ShieldAlert, Cloud, Lock, Server, Play, X, CheckCircle2 } from 'lucide-react';
import DecipherText from './DecipherText';
import { playClick, playBlip } from '../utils/audio';

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [scanRunning, setScanRunning] = useState(false);
  const [scanOutput, setScanOutput] = useState([]);

  const filters = ['ALL', 'CYBERSECURITY', 'CLOUD', 'WEB', 'TOOLS'];

  const projects = [
    {
      id: 'vuln-scanner',
      title: 'VULNERABILITY SCANNER',
      category: 'CYBERSECURITY',
      image: '/assets/project-scanner.jpg',
      tags: ['Python', 'Security', 'CLI'],
      summary: 'Automated network reconnaissance and CVE vulnerability assessment engine for local subnets and web services.',
      details: {
        architecture: 'Socket-based multi-threaded port scanner with banner grabbing, SSL/TLS cipher suite audit, and automated CVE database matching.',
        features: [
          'Scans top 1000 ports in under 3.5 seconds with concurrent asyncio workers',
          'Identifies outdated service banners (Apache, Nginx, OpenSSH)',
          'Automated security risk scoring (CVSS v3.1 framework)',
          'Generates clean JSON & PDF mitigation reports'
        ],
        github: 'https://github.com/Darknesxy/vulnerability-scanner'
      }
    },
    {
      id: 'cloud-infra',
      title: 'CLOUD INFRASTRUCTURE',
      category: 'CLOUD',
      image: '/assets/project-cloud.jpg',
      tags: ['AWS', 'Cloud', 'DevOps'],
      summary: 'Resilient multi-tier cloud infrastructure with least-privilege IAM policies, automated VPC peering, and WAF protection.',
      details: {
        architecture: 'Terraform-managed AWS architecture with private/public subnets, Application Load Balancers, NAT Gateways, and CloudWatch alarms.',
        features: [
          'Zero public database access: RDS deployed strictly in isolated subnets',
          'AWS WAF automated rule integration against SQL injection and XSS',
          'Docker container orchestration with automated health checks',
          'Zero-downtime Blue/Green rolling deployment strategy'
        ],
        github: 'https://github.com/Darknesxy/cloud-infrastructure'
      }
    },
    {
      id: 'nids-packet',
      title: 'NETWORK INTRUSION DETECTOR',
      category: 'CYBERSECURITY',
      image: '/assets/project-scanner.jpg',
      tags: ['Python', 'Scapy', 'Networking'],
      summary: 'Lightweight Network IDS sniffing promiscuous interfaces to detect ARP spoofing, SYN flood attacks, and port sweeps.',
      details: {
        architecture: 'Scapy packet dissection engine with real-time anomaly detection heuristics and automated iptables firewall drop triggers.',
        features: [
          'Real-time promiscuous mode packet capture and dissection',
          'Detects ARP cache poisoning attacks within 250 milliseconds',
          'Configurable alerting via Syslog and Discord Webhook',
          'Low CPU overhead (< 4% on dual-core Linux systems)'
        ],
        github: 'https://github.com/Darknesxy/network-ids'
      }
    },
    {
      id: 'zero-trust-auth',
      title: 'ZERO-TRUST AUTH GATEWAY',
      category: 'TOOLS',
      image: '/assets/project-cloud.jpg',
      tags: ['Node.js', 'JWT', 'Crypto'],
      summary: 'Hardened identity gateway with cryptographic session verification, MFA TOTP tokens, and device fingerprint validation.',
      details: {
        architecture: 'Stateless JWT authentication backed by asymmetric RSA-256 keys, short-lived tokens, and Redis-based immediate revocation lists.',
        features: [
          'Hardware Security Token (FIDO2 / WebAuthn) readiness',
          'Rate-limiting and exponential backoff against brute-force attacks',
          'Strict CSP and HSTS secure headers enforcement',
          'Comprehensive audit logging for all authentication attempts'
        ],
        github: 'https://github.com/Darknesxy/zero-trust-gateway'
      }
    }
  ];

  const filteredProjects = activeFilter === 'ALL' 
    ? projects 
    : projects.filter(p => p.category === activeFilter || p.tags.includes(activeFilter));

  const handleOpenProject = (project) => {
    playClick();
    setActiveModalProject(project);
    setScanOutput([]);
    setScanRunning(false);
  };

  const handleSimulateScan = () => {
    playBlip(900);
    setScanRunning(true);
    setScanOutput(['[INIT] Spawning asynchronous scanner engine...', '[TARGET] 192.168.1.1/24 (Subnet Range)']);
    
    setTimeout(() => {
      setScanOutput(prev => [...prev, '[PROBE] Sending TCP SYN probes to 1024 standard ports...']);
    }, 600);

    setTimeout(() => {
      setScanOutput(prev => [
        ...prev, 
        '[PORT 22] SSH-2.0-OpenSSH_8.2p1 (PASS: Strong keys required)',
        '[PORT 80] HTTP -> 301 Redirect to HTTPS (SECURE)',
        '[PORT 443] TLS 1.3 Active - Cipher: AES_256_GCM (RATING: A+)',
      ]);
    }, 1300);

    setTimeout(() => {
      setScanOutput(prev => [
        ...prev, 
        '[SCAN COMPLETE] 0 High Vulnerabilities Found. System Hardened.',
        '>>> Status: DEFENSE COMPLIANT (ISO 27001)'
      ]);
      setScanRunning(false);
    }, 2000);
  };

  return (
    <section id="projects" className="border-b border-[#dfded8] bg-[#f4f3ef] relative">
      <div className="max-w-[1720px] mx-auto grid grid-cols-1 lg:grid-cols-12">
        
        {/* Index indicator */}
        <div className="lg:col-span-1 border-b lg:border-b-0 lg:border-r border-[#dfded8] p-6 lg:p-8 flex lg:flex-col items-center justify-between bg-[#f8f7f2]/50">
          <div className="flex lg:flex-col items-center gap-2">
            <span className="font-display font-black text-2xl text-[#121417]">04</span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-gray-500 font-bold lg:-rotate-90 lg:my-8">
              PROJECTS
            </span>
          </div>
          <div className="w-8 h-[1px] bg-[#dfded8] lg:w-[1px] lg:h-8" />
        </div>

        {/* Main Projects Section */}
        <div className="lg:col-span-11 p-6 sm:p-10 lg:p-12">
          
          {/* Header & Category Filter Tabs */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#dfded8]">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-cyber-emerald font-bold mb-1">
                SHOWCASE // PRODUCTION
              </div>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-[#121417] uppercase tracking-tight">
                <DecipherText text="REAL PROBLEMS. REAL LEARNING. REAL PROJECTS." />
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
              {filters.map((filter) => {
                const isActive = activeFilter === filter;
                return (
                  <button
                    key={filter}
                    onClick={() => {
                      playClick();
                      setActiveFilter(filter);
                    }}
                    className={`px-3 py-1.5 rounded text-xs font-semibold tracking-wider transition-all ${
                      isActive
                        ? 'bg-cyber-emerald text-white shadow-xs'
                        : 'bg-white border border-[#dfded8] text-gray-700 hover:border-black'
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Project Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => handleOpenProject(project)}
                className="group border border-[#dfded8] bg-white hover:border-black transition-all cursor-pointer overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md"
              >
                {/* Project Image Banner */}
                <div className="relative h-48 sm:h-52 bg-black overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover filter contrast-125 transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Category Tag on Image */}
                  <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-xs border border-white/20 text-emerald-400 font-mono text-[10px] px-2 py-0.5 rounded">
                    {project.category}
                  </div>

                  {/* Corner Target HUD */}
                  <div className="absolute bottom-3 right-3 font-mono text-[10px] text-gray-400">
                    CLICK TO INSPECT ↗
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-display font-black text-lg text-[#121417] group-hover:text-cyber-emerald transition-colors uppercase tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 font-sans mt-2 leading-relaxed">
                      {project.summary}
                    </p>
                  </div>

                  {/* Bottom Tags & Action Arrow */}
                  <div className="mt-5 pt-4 border-t border-[#dfded8] flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5 font-mono text-[11px] text-gray-700">
                      {project.tags.map((tag, idx) => (
                        <span key={idx} className="bg-[#f4f3ef] border border-[#dfded8] px-2 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="w-7 h-7 rounded-full border border-[#dfded8] group-hover:border-black group-hover:bg-[#121417] group-hover:text-white flex items-center justify-center transition-colors">
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* PROJECT INSPECTION & INTERACTIVE SIMULATION MODAL */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-[#f4f3ef] border border-[#121417] max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-4 right-4 p-1.5 rounded hover:bg-gray-200 text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="font-mono text-xs text-cyber-emerald font-bold tracking-widest uppercase mb-1">
              PROJECT DOSSIER // {activeModalProject.category}
            </div>

            <h3 className="font-display font-black text-2xl text-[#121417] uppercase tracking-tight mb-2">
              {activeModalProject.title}
            </h3>

            <p className="text-sm text-gray-700 font-sans leading-relaxed mb-4">
              {activeModalProject.details.architecture}
            </p>

            <div className="bg-white border border-[#dfded8] p-4 rounded mb-4">
              <div className="font-mono text-xs font-bold uppercase text-black mb-2">Key Highlights:</div>
              <ul className="space-y-1.5">
                {activeModalProject.details.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-700 font-sans">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyber-emerald mt-0.5 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Interactive Live Scanner Terminal (if security tool) */}
            <div className="bg-[#0c1012] text-white p-4 rounded border border-[#1e262c] font-mono text-xs mb-4">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#1e262c]">
                <div className="flex items-center gap-2 text-emerald-400">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>SIMULATED RECONNAISSANCE CLI</span>
                </div>
                <button
                  onClick={handleSimulateScan}
                  disabled={scanRunning}
                  className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white px-2.5 py-1 rounded text-[11px] font-semibold flex items-center gap-1 transition-all"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>{scanRunning ? 'SCANNING...' : 'EXECUTE SCAN'}</span>
                </button>
              </div>

              <div className="min-h-[90px] text-gray-300 space-y-1 text-[11px]">
                {scanOutput.length === 0 ? (
                  <span className="text-gray-500 italic">Click 'EXECUTE SCAN' to test real-time port audit pipeline...</span>
                ) : (
                  scanOutput.map((line, idx) => (
                    <div key={idx} className={line.includes('COMPLIANT') ? 'text-emerald-400 font-bold' : ''}>
                      {line}
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#dfded8]">
              <a
                href={activeModalProject.details.github}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs text-cyber-emerald hover:underline flex items-center gap-1 font-semibold"
              >
                <span>VIEW REPOSITORY ON GITHUB</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <button
                onClick={() => setActiveModalProject(null)}
                className="bg-[#121417] text-white px-5 py-2 font-mono text-xs uppercase tracking-wider font-semibold"
              >
                CLOSE
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
