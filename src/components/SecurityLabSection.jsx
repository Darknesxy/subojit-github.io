import React, { useState, useEffect } from 'react';
import { Laptop, Shield, Server, Database, Play, AlertTriangle, CheckCircle, Terminal, RefreshCw } from 'lucide-react';
import DecipherText from './DecipherText';
import { playClick, playBlip, playCyberAlert } from '../utils/audio';

export default function SecurityLabSection() {
  const [selectedNode, setSelectedNode] = useState('Firewall');
  const [activeScenario, setActiveScenario] = useState('Port Scanning');
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [packetProgress, setPacketProgress] = useState(0);

  // Network pipeline nodes
  const nodes = [
    {
      id: 'Client',
      name: 'Client',
      icon: Laptop,
      ip: '192.168.1.45',
      status: 'AUTHENTICATED',
      details: 'Workstation initiating TLS 1.3 encrypted browser sessions. User-Agent: Chromium/124.0. Handshake: ECDHE-RSA-AES256-GCM-SHA384.'
    },
    {
      id: 'Firewall',
      name: 'Firewall',
      icon: Shield,
      ip: '10.0.0.1 (Gateway)',
      status: 'STATEFUL FILTERING ACTIVE',
      details: 'Stateful packet inspection (SPI) firewall with Snort IDS integration. Rules: Drop Telnet/FTP, Throttle rate > 60 req/sec, Enforce TLS 1.3.'
    },
    {
      id: 'Web Server',
      name: 'Web Server',
      icon: Server,
      ip: '10.0.2.15 (Nginx 1.25)',
      status: 'REVERSE PROXY OK',
      details: 'Nginx edge proxy terminating SSL certificates. Strict Content Security Policy (CSP), HTTP Strict Transport Security (HSTS) with 1-year max-age.'
    },
    {
      id: 'Database',
      name: 'Database',
      icon: Database,
      ip: '10.0.4.50 (PostgreSQL)',
      status: 'ENCRYPTED AT REST',
      details: 'PostgreSQL cluster with AES-256 disk encryption and parameterized query enforcement. No direct internet ingress; access strictly through IAM role.'
    }
  ];

  // Attack scenarios configuration
  const scenarios = [
    {
      id: 'Port Scanning',
      name: 'Port Scanning',
      type: 'Reconnaissance',
      logs: [
        '[ATTACK RECON] Remote host 203.0.113.88 sending SYN packets to ports 1-1024...',
        '[FIREWALL ALERT] High frequency TCP SYN detected (120 packets/sec). Threshold exceeded.',
        '[MITIGATION] Triggering iptables rate-limiting: Rate reduced to 0.',
        '[LOG RECORDED] Attacker IP 203.0.113.88 quarantined in Fail2Ban jail for 3600 seconds.',
        '>>> Status: RECONNAISSANCE MITIGATED. 0 PORTS EXPOSED.'
      ]
    },
    {
      id: 'Brute Force (Demo)',
      name: 'Brute Force (Demo)',
      type: 'Authentication Attack',
      logs: [
        '[LOGIN ATTEMPT] User: admin | Wordlist entry #142 ... FAILED (Invalid credentials)',
        '[LOGIN ATTEMPT] User: admin | Wordlist entry #143 ... FAILED (Invalid credentials)',
        '[IDS ALARM] 5 consecutive failed authentications from 198.51.100.23 in 4.2 seconds.',
        '[DEFENSE ACTION] Account locked. CAPTCHA & exponential backoff activated.',
        '[SOC NOTIFY] Incident report dispatched to SIEM dashboard.',
        '>>> Status: BRUTE FORCE THWARTED. ZERO-TRUST ENFORCED.'
      ]
    },
    {
      id: 'SQL Injection (Demo)',
      name: 'SQL Injection (Demo)',
      type: 'Web Application Attack',
      logs: [
        '[HTTP POST] Payload received: SELECT * FROM users WHERE user=\'admin\' OR \'1\'=\'1\';--',
        '[WAF INSPECTOR] ModSecurity signature match: SQLi Regex Pattern #942100.',
        '[QUERY ENGINE] Input sanitized via prepared statement parameterized placeholder ($1).',
        '[HTTP 403] Forbidden response returned to client. No database evaluation occurred.',
        '>>> Status: EXPLOIT NEUTRALIZED. DATA INTEGRITY PRESERVED.'
      ]
    },
    {
      id: 'Traffic Analysis',
      name: 'Traffic Analysis',
      type: 'Deep Packet Inspection',
      logs: [
        '[PCAP STREAM] Capturing promiscuous packets on eth0 (1000 Mbps link)...',
        '[PROTOCOL DECODE] DNS query: resolver.internal -> 192.168.1.1 (Query Time: 1.2ms)',
        '[ENTROPY CHECK] Payload entropy score: 3.2 (Normal ASCII text traffic).',
        '[TLS AUDIT] Perfect Forward Secrecy verified. Session ticket key rotated.',
        '>>> Status: TRAFFIC NOMINAL. NO LATERAL MOVEMENT DETECTED.'
      ]
    }
  ];

  // Animate packet flow
  useEffect(() => {
    const timer = setInterval(() => {
      setPacketProgress((prev) => (prev >= 100 ? 0 : prev + 2));
    }, 40);
    return () => clearInterval(timer);
  }, []);

  const handleSelectScenario = (scenario) => {
    playCyberAlert();
    setActiveScenario(scenario.name);
    setConsoleLogs([]);
    
    // Simulate real-time streaming logs
    scenario.logs.forEach((log, index) => {
      setTimeout(() => {
        setConsoleLogs(prev => [...prev, log]);
      }, (index + 1) * 350);
    });
  };

  const handleSelectNode = (nodeName) => {
    playClick();
    setSelectedNode(nodeName);
  };

  const currentNode = nodes.find(n => n.name === selectedNode) || nodes[1];

  return (
    <section id="lab" className="border-b border-[#dfded8] bg-[#0c1013] text-white relative overflow-hidden">
      
      {/* Background HUD Matrix lines */}
      <div className="absolute inset-0 hud-grid opacity-30 pointer-events-none" />

      <div className="max-w-[1720px] mx-auto grid grid-cols-1 lg:grid-cols-12">
        
        {/* Index indicator */}
        <div className="lg:col-span-1 border-b lg:border-b-0 lg:border-r border-[#1e262c] p-6 lg:p-8 flex lg:flex-col items-center justify-between bg-[#080c0e]/80">
          <div className="flex lg:flex-col items-center gap-2">
            <span className="font-display font-black text-2xl text-white">05</span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-400 font-bold lg:-rotate-90 lg:my-8">
              SECURITY LAB
            </span>
          </div>
          <div className="w-8 h-[1px] bg-[#1e262c] lg:w-[1px] lg:h-8" />
        </div>

        {/* Lab Content Area (Cols 2-12) */}
        <div className="lg:col-span-11 p-6 sm:p-10 lg:p-12">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#1e262c]">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-emerald-400 font-bold mb-1 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>INTERACTIVE LEARNING SPACE // DEFENSE MATRIX</span>
              </div>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                <DecipherText text="EXPLORE NETWORK SIMULATION" />
              </h2>
            </div>

            <div className="font-mono text-xs text-gray-400 flex items-center gap-1.5">
              <span>Inspect Packet Flow - Click on a node to see details</span>
              <span className="text-emerald-400 font-bold">→</span>
            </div>
          </div>

          {/* Sub-block 1: VISUAL NETWORK PACKET FLOW PIPELINE */}
          <div className="my-8 bg-[#090d0f] border border-[#1b252c] rounded-lg p-6 sm:p-8 relative">
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
              {nodes.map((node, index) => {
                const IconComponent = node.icon;
                const isSelected = selectedNode === node.name;
                return (
                  <div key={node.id} className="relative flex flex-col items-center">
                    {/* Node Button */}
                    <button
                      onClick={() => handleSelectNode(node.name)}
                      className={`w-full p-4 rounded-lg border text-center transition-all flex flex-col items-center gap-2.5 ${
                        isSelected
                          ? 'bg-[#121c22] border-emerald-400 shadow-lg shadow-emerald-950/40 scale-105'
                          : 'bg-[#0f1418] border-[#1e2830] hover:border-gray-500 hover:bg-[#141b20]'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isSelected ? 'bg-emerald-500 text-black' : 'bg-[#182026] text-gray-300'
                      }`}>
                        <IconComponent className="w-5 h-5" />
                      </div>

                      <div className="font-display font-black text-xs sm:text-sm uppercase tracking-wider text-white">
                        {node.name}
                      </div>

                      <div className="font-mono text-[10px] text-gray-400">
                        {node.ip}
                      </div>

                      <div className={`font-mono text-[9px] px-2 py-0.5 rounded ${
                        isSelected ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40' : 'bg-black/50 text-gray-400'
                      }`}>
                        {node.status}
                      </div>
                    </button>

                    {/* Connecting Arrow between nodes (desktop) */}
                    {index < nodes.length - 1 && (
                      <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-emerald-400 text-xs font-bold">
                        ─▶
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Real-time Animated Packet Indicator Line */}
            <div className="mt-8 pt-4 border-t border-[#1b252c] flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-xs text-gray-400">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-emerald-400 font-semibold">● LIVE PACKET STREAM:</span>
                <span className="text-gray-300">TCP Handshake [SYN ➔ SYN-ACK ➔ ACK]</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-500 text-[11px] shrink-0">
                <RefreshCw className="w-3 h-3 animate-spin text-emerald-400" />
                <span>PACKETS INSPECTED: 2,490/SEC</span>
              </div>
            </div>

            {/* Selected Node Real-Time Details Inspector */}
            <div className="mt-4 bg-[#06090b] border border-[#1b252c] p-4 rounded text-xs font-mono">
              <div className="text-emerald-400 font-bold mb-1 flex items-center gap-2">
                <span>[INSPECTOR // {currentNode.name.toUpperCase()}]</span>
                <span className="text-gray-500 font-normal">{currentNode.ip}</span>
              </div>
              <p className="text-gray-300 leading-relaxed font-sans text-xs">
                {currentNode.details}
              </p>
            </div>

          </div>

          {/* Sub-block 2: TRY ATTACK SCENARIOS (SIMULATED) */}
          <div className="mt-8 pt-6 border-t border-[#1e262c]">
            <div className="flex items-center justify-between mb-4">
              <div className="font-mono text-xs uppercase tracking-widest text-emerald-400 font-bold">
                TRY ATTACK SCENARIOS (SIMULATED)
              </div>
              <span className="font-mono text-[10px] text-gray-500">SANDBOX MODE • SAFE ENVIRONMENT</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Scenario Trigger Buttons (Cols 1-5) */}
              <div className="md:col-span-5 space-y-2">
                {scenarios.map((scenario) => {
                  const isActive = activeScenario === scenario.name;
                  return (
                    <button
                      key={scenario.id}
                      onClick={() => handleSelectScenario(scenario)}
                      className={`w-full p-3 rounded border font-mono text-xs transition-all flex items-center justify-between text-left ${
                        isActive
                          ? 'bg-[#141d24] border-emerald-400 text-white shadow-md'
                          : 'bg-[#090d0f] border-[#1b252c] text-gray-300 hover:border-gray-500 hover:bg-[#0f1418]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-emerald-400 animate-ping' : 'bg-red-500'}`} />
                        <div>
                          <div className="font-bold">{scenario.name}</div>
                          <div className="text-[10px] text-gray-400">{scenario.type}</div>
                        </div>
                      </div>
                      <span className="text-emerald-400 text-sm font-bold">›</span>
                    </button>
                  );
                })}
              </div>

              {/* Real-time Cyber Defense Console Logs (Cols 6-12) */}
              <div className="md:col-span-7 bg-[#06090b] border border-[#1b252c] rounded p-4 font-mono text-xs flex flex-col justify-between min-h-[200px]">
                <div>
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#1b252c] text-[11px] text-gray-400">
                    <div className="flex items-center gap-2 text-emerald-400">
                      <Terminal className="w-3.5 h-3.5" />
                      <span>DEFENSIVE MITIGATION CONSOLE</span>
                    </div>
                    <span className="text-gray-500">SCENARIO: {activeScenario}</span>
                  </div>

                  <div className="space-y-1.5 text-[11px] text-gray-300 min-h-[120px]">
                    {consoleLogs.length === 0 ? (
                      <div className="text-gray-500 italic py-4">
                        Select an attack scenario from the left to trigger the real-time defensive simulation...
                      </div>
                    ) : (
                      consoleLogs.map((log, idx) => (
                        <div 
                          key={idx} 
                          className={
                            log.includes('MITIGATED') || log.includes('THWARTED') || log.includes('NEUTRALIZED') || log.includes('NOMINAL')
                              ? 'text-emerald-400 font-bold bg-emerald-950/30 p-1 rounded'
                              : log.includes('ALERT') || log.includes('ALARM') || log.includes('ATTACK')
                              ? 'text-red-400'
                              : 'text-gray-300'
                          }
                        >
                          {log}
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="pt-2 border-t border-[#1b252c] flex items-center justify-between text-[10px] text-gray-500">
                  <span>INTRUSION PREVENTION SYSTEM // AUTOMATED RULES ACTIVE</span>
                  <span className="text-emerald-400">DEFENSE: 100%</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
