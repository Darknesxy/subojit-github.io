import React, { useState } from 'react';
import { X, Send, ShieldCheck, CheckCircle2, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playClick, playBlip } from '../utils/audio';

export default function ConnectModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    classification: 'Cybersecurity Project',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    playBlip(1000);

    // Trigger celebratory cyber confetti
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0e5a3c', '#10b981', '#06b6d4', '#121417']
      });
    } catch (err) {
      // ignore
    }

    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({ name: '', email: '', classification: 'Cybersecurity Project', message: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="bg-[#f4f3ef] border-2 border-[#121417] max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded hover:bg-gray-200 text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <>
            <div className="flex items-center gap-2 text-cyber-emerald font-mono text-xs font-bold tracking-widest uppercase mb-1">
              <Lock className="w-3.5 h-3.5" />
              <span>TLS 1.3 ENCRYPTED INBOX</span>
            </div>

            <h3 className="font-display font-black text-2xl text-[#121417] uppercase tracking-tight mb-2">
              INITIATE SECURE HANDSHAKE
            </h3>
            <p className="text-xs text-gray-600 font-sans mb-6">
              Drop a transmission regarding security projects, code audits, or cloud architecture.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-mono text-xs text-gray-700 uppercase font-semibold mb-1">
                  CALLSIGN / NAME
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Rivera"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white border border-[#dfded8] px-3.5 py-2.5 font-mono text-xs text-black outline-none focus:border-black rounded-none"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-gray-700 uppercase font-semibold mb-1">
                  SECURE RETURN EMAIL
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white border border-[#dfded8] px-3.5 py-2.5 font-mono text-xs text-black outline-none focus:border-black rounded-none"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-gray-700 uppercase font-semibold mb-1">
                  CLASSIFICATION // SUBJECT
                </label>
                <select
                  value={formData.classification}
                  onChange={(e) => setFormData({ ...formData, classification: e.target.value })}
                  className="w-full bg-white border border-[#dfded8] px-3.5 py-2.5 font-mono text-xs text-black outline-none focus:border-black rounded-none"
                >
                  <option value="Cybersecurity Project">Cybersecurity Project Collaboration</option>
                  <option value="Cloud Hardening">Cloud Infrastructure / Hardening</option>
                  <option value="Penetration Testing">Penetration Testing / Audit</option>
                  <option value="General Inquiries">General Networking / Tech Chat</option>
                </select>
              </div>

              <div>
                <label className="block font-mono text-xs text-gray-700 uppercase font-semibold mb-1">
                  PAYLOAD // MESSAGE
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Write your transmission details..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white border border-[#dfded8] px-3.5 py-2.5 font-mono text-xs text-black outline-none focus:border-black rounded-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#0c1012] hover:bg-[#182025] text-white py-3.5 font-mono text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-all active:scale-98"
              >
                <Send className="w-3.5 h-3.5" />
                <span>DISPATCH TRANSMISSION</span>
              </button>
            </form>
          </>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 border border-emerald-300 text-cyber-emerald flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="font-display font-black text-2xl text-[#121417] uppercase tracking-tight">
              TRANSMISSION DELIVERED
            </h3>

            <p className="font-mono text-xs text-gray-600 max-w-sm mx-auto leading-relaxed">
              Your message has been verified and securely routed to Subojit's encrypted queue. Expect a response within 24 hours.
            </p>

            <button
              onClick={handleReset}
              className="bg-[#121417] text-white px-6 py-2.5 font-mono text-xs uppercase tracking-wider font-semibold mt-4"
            >
              CLOSE WINDOW
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
