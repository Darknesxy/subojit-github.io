import React, { useState } from 'react';
import { Mail, ArrowUpRight, Copy, Check, Send, ShieldCheck, Key, FileText, Download } from 'lucide-react';
import confetti from 'canvas-confetti';
import DecipherText from './DecipherText';
import { playClick, playBlip } from '../utils/audio';

// Custom inline SVG brand icons
const GithubIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const InstagramIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

export default function ContactSection({ onOpenConnectModal }) {
  const [copied, setCopied] = useState(false);
  const email = 'sarkarsubojit1@gmail.com';

  const handleCopyEmail = () => {
    playBlip(900);
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer id="contact" className="bg-[#f4f3ef] text-[#121417] relative">
      <div className="max-w-[1720px] mx-auto grid grid-cols-1 lg:grid-cols-12">
        
        {/* Index indicator */}
        <div className="lg:col-span-1 border-b lg:border-b-0 lg:border-r border-[#dfded8] p-6 lg:p-8 flex lg:flex-col items-center justify-between bg-[#f8f7f2]/50">
          <div className="flex lg:flex-col items-center gap-2">
            <span className="font-display font-black text-2xl text-[#121417]">07</span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-gray-500 font-bold lg:-rotate-90 lg:my-8">
              CONTACT
            </span>
          </div>
          <div className="w-8 h-[1px] bg-[#dfded8] lg:w-[1px] lg:h-8" />
        </div>

        {/* Contact Content (Cols 2-12) */}
        <div className="lg:col-span-11 p-6 sm:p-10 lg:p-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#dfded8]">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-cyber-emerald font-bold mb-1">
                COMMUNICATION // SECURE CHANNEL
              </div>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-[#121417] uppercase tracking-tight">
                <DecipherText text="LET'S BUILD SOMETHING MEANINGFUL" />
              </h2>
              <p className="text-sm sm:text-base text-gray-600 font-sans mt-2 max-w-lg">
                Whether you want to discuss cybersecurity research, collaborate on a project, or talk cloud architecture — my inbox is always open.
              </p>
            </div>

            {/* CTA Connect Button */}
            <button
              onClick={() => {
                playClick();
                onOpenConnectModal();
              }}
              className="bg-[#0c1012] hover:bg-[#182025] text-white px-6 py-3.5 rounded-none font-mono text-xs tracking-wider font-semibold flex items-center gap-2.5 transition-all shadow-sm active:scale-95 group shrink-0"
            >
              <span className="w-2 h-2 rounded-full bg-cyber-emerald group-hover:scale-125 transition-transform" />
              <span>SEND ENCRYPTED MESSAGE</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>

          {/* Social Links & Communication Hub */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
            
            {/* 1. Email Box with Copy */}
            <div className="bg-white border border-[#dfded8] p-4 rounded flex flex-col justify-between">
              <div>
                <span className="font-mono text-[10px] text-gray-400 uppercase tracking-wider block mb-1">
                  DIRECT EMAIL
                </span>
                <a 
                  href={`mailto:${email}`}
                  className="font-mono text-xs text-gray-800 hover:text-cyber-emerald font-semibold break-all transition-colors block"
                  title="Click to send email"
                >
                  {email}
                </a>
              </div>
              <button
                onClick={handleCopyEmail}
                className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between font-mono text-xs text-cyber-emerald hover:underline"
              >
                <span>{copied ? 'COPIED TO CLIPBOARD' : 'COPY ADDRESS'}</span>
                {copied ? <Check className="w-3.5 h-3.5 text-cyber-emerald" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* 2. GitHub */}
            <a
              href="https://github.com/Darknesxy"
              target="_blank"
              rel="noreferrer"
              onClick={() => playClick()}
              className="bg-white border border-[#dfded8] hover:border-black p-4 rounded flex flex-col justify-between transition-all group"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-gray-400 uppercase tracking-wider">
                    CODE REPOSITORY
                  </span>
                  <GithubIcon className="w-4 h-4 text-gray-700" />
                </div>
                <span className="font-display font-black text-sm text-[#121417] mt-1 block">
                  GitHub (@Darknesxy)
                </span>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between font-mono text-xs text-gray-600 group-hover:text-black">
                <span>View Source & Labs</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </a>

            {/* 3. Official Resume / CV Download Card */}
            <a
              href="./assets/subojit-resume.pdf"
              download="Subojit_Das_Sarkar_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playClick()}
              className="bg-white border border-[#dfded8] hover:border-black p-4 rounded flex flex-col justify-between transition-all group"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-gray-400 uppercase tracking-wider">
                    CURRICULUM VITAE
                  </span>
                  <FileText className="w-4 h-4 text-cyber-emerald" />
                </div>
                <span className="font-display font-black text-sm text-[#121417] mt-1 block">
                  Download Resume (PDF)
                </span>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between font-mono text-xs text-cyber-emerald font-semibold group-hover:underline">
                <span>Verified 2026 CV</span>
                <Download className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
              </div>
            </a>

            {/* 4. Instagram / Social */}
            <a
              href="https://instagram.com/sxbojit?obrf=anc0dm5iMHB1bXV6"
              target="_blank"
              rel="noreferrer"
              onClick={() => playClick()}
              className="bg-white border border-[#dfded8] hover:border-black p-4 rounded flex flex-col justify-between transition-all group"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-gray-400 uppercase tracking-wider">
                    EXPLORER LOGS
                  </span>
                  <InstagramIcon className="w-4 h-4 text-gray-700" />
                </div>
                <span className="font-display font-black text-sm text-[#121417] mt-1 block">
                  Instagram (@sxbojit)
                </span>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between font-mono text-xs text-gray-600 group-hover:text-black">
                <span>Follow @sxbojit</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </a>

          </div>

          {/* Bottom Bar: Copyright & Verified Signoff */}
          <div className="pt-6 border-t border-[#dfded8] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyber-emerald" />
              <span>SUBOJIT SARKAR • BCA CYBER DEFENSE • 2026</span>
            </div>

            <div className="flex items-center gap-4 text-[11px]">
              <span>PGP: 4A7B 89F1 204C 9D88</span>
              <span>SHA-256 VERIFIED</span>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}
