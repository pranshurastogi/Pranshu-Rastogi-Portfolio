// src/components/ContactForm.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPaperPlane, FaTimes, FaCube } from "react-icons/fa";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ success: null, text: "" });
  const [open, setOpen] = useState(false);
  const modalRef = useRef();
  const [txHash, setTxHash] = useState("");
  const [blockNum, setBlockNum] = useState(0);

  // validators
  const validators = {
    name: (v) => (v.trim() ? "" : "Name is required"),
    email: (v) =>
      /^\S+@\S+\.\S+$/.test(v) ? "" : "Please enter a valid email address",
    message: (v) => (v.trim() ? "" : "Message cannot be empty"),
  };

  // run validation when formData changes
  useEffect(() => {
    const newErr = {};
    for (let field in formData) {
      const err = validators[field]?.(formData[field]);
      if (err) newErr[field] = err;
    }
    setErrors(newErr);
  }, [formData]);

  // Close modal on Escape
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Close modal on background click
  const handleBackdropClick = (e) => {
    if (modalRef.current && e.target === modalRef.current) setOpen(false);
  };

  const handleChange = (e) => {
    setFormData((f) => ({ ...f, [e.target.name]: e.target.value }));
  };
  const handleBlur = (e) => {
    setTouched((t) => ({ ...t, [e.target.name]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(errors).length) return;
    setSubmitting(true);
    setTxHash("");
    setBlockNum(0);
    try {
      // Simulate blockchain tx hash and block number
      const fakeHash =
        "0x" + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
      const fakeBlock = Math.floor(1000000 + Math.random() * 9000000);
      const res = await fetch("https://formspree.io/f/xjkwggdp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Network error");
      setTxHash(fakeHash);
      setBlockNum(fakeBlock);
      setStatus({ success: true, text: `Transaction mined!\nHash: ${fakeHash.slice(0, 12)}...${fakeHash.slice(-8)}\nBlock: #${fakeBlock}` });
      setFormData({ name: "", email: "", message: "" });
      setTouched({});
    } catch {
      setStatus({ success: false, text: "Transaction failed!\nError: OUT_OF_GAS (0x42)\nTry again or check your wallet." });
    }
    setSubmitting(false);
  };

  return (
    <>
      {/* Floating Card/Button */}
      <motion.button
        className="fixed bottom-20 right-6 z-[9999] px-5 py-2 rounded-2xl shadow-lg flex items-center gap-2 font-mono font-bold bg-black/80 border-2 border-[#AEEA00] text-[#AEEA00] hover:text-[#39FF14] hover:border-[#39FF14] hover:scale-105 transition-all duration-200 backdrop-blur-lg neon-contact-btn"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setOpen(true)}
        aria-label="Contact Pranshu"
        style={{ boxShadow: '0 0 16px #AEEA00, 0 0 2px #AEEA00', fontFamily: "'JetBrains Mono', 'Fira Mono', 'Cascadia Code', 'Consolas', monospace" }}
      >
        <span className="text-2xl" style={{ color: '#AEEA00', textShadow: '0 0 8px #AEEA00, 0 0 2px #AEEA00' }}><FaCube /></span>
        <span className="hidden sm:inline">Contact Pranshu</span>
      </motion.button>

      {/* Modal Popup - Hacker Terminal Style */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={modalRef}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={handleBackdropClick}
          >
            <motion.div
              className="relative w-full max-w-lg mx-2 p-0 rounded-lg shadow-2xl border-2 border-[#39FF14] bg-[#101010] font-mono text-[#39FF14] terminal-modal overflow-hidden"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onMouseDown={e => e.stopPropagation()}
            >
              {/* Terminal Header Bar */}
              <div className="flex items-center justify-between px-4 py-2 bg-[#181818] border-b border-[#39FF14]/40 relative">
                <span className="text-xs tracking-widest">pranshu@portfolio:~</span>
                <span className="text-xs ml-2 text-[#AEEA00] select-none">[0x{(Math.random()*1e16).toString(16).slice(0,12)}...{(Math.random()*1e16).toString(16).slice(-4)}]</span>
                <button
                  className="text-[#39FF14] hover:text-red-400 p-1 rounded focus:outline-none focus:ring-2 focus:ring-[#39FF14]"
                  onClick={() => setOpen(false)}
                  aria-label="Close contact form"
                >
                  <FaTimes size={16} />
                </button>
                {/* Scanline overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-10" style={{background: 'repeating-linear-gradient(0deg, transparent, transparent 6px, #39FF1433 7px, transparent 8px)'}} />
              </div>
              {/* Fun Element: Email ASCII Art */}
              <div className="px-4 pt-3 pb-1 text-xs select-none min-h-[32px]">
                <pre className="leading-4 text-[#AEEA00] text-xs mb-1">{`
  

  ███████████████████████████████
  █▄─▄▄─█▄─▀█▀─▄██▀▄─██▄─▄█▄─▄███
  ██─▄█▀██─█▄█─███─▀─███─███─██▀█
  ▀▄▄▄▄▄▀▄▄▄▀▄▄▄▀▄▄▀▄▄▀▄▄▄▀▄▄▄▄▄▀
`}</pre>
              </div>
              {/* Terminal Body */}
              <form onSubmit={handleSubmit} className="px-4 pb-6 pt-2 space-y-4">
                <div className="text-sm mb-2">
                  <span className="text-[#39FF14]">pranshu@portfolio:~$</span> <span className="animate-typing">Contact --name --email --message</span><span className="blinking-cursor">█</span>
                </div>
                {/* Name & Email */}
                <div className="flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0">
                  {["name", "email"].map((field) => (
                    <div key={field} className="flex-1 flex flex-col">
                      <label htmlFor={field} className="mb-1 text-xs text-[#AEEA00] tracking-wide">
                        {`> ${field}`}
                      </label>
                      <input
                        id={field}
                        name={field}
                        type={field === "email" ? "email" : "text"}
                        value={formData[field]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="off"
                        placeholder={field === "email" ? "you@example.com" : `Your ${field}`}
                        className={`px-3 py-2 rounded bg-[#181818] border border-[#39FF14]/40 text-[#39FF14] text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#39FF14] placeholder-[#39FF14]/60 transition-colors duration-150 ${errors[field] && touched[field] ? "border-red-400 focus:ring-red-200" : ""}`}
                      />
                      {errors[field] && touched[field] && (
                        <p className="mt-0.5 text-xs text-red-400">{errors[field]}</p>
                      )}
                    </div>
                  ))}
                </div>
                {/* Message */}
                <div className="flex flex-col">
                  <label htmlFor="message" className="mb-1 text-xs text-[#AEEA00] tracking-wide">
                    {`> message`}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="off"
                    placeholder="Type your message..."
                    className={`px-3 py-2 rounded bg-[#181818] border border-[#39FF14]/40 text-[#39FF14] text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#39FF14] placeholder-[#39FF14]/60 transition-colors duration-150 resize-none ${errors.message && touched.message ? "border-red-400 focus:ring-red-200" : ""}`}
                  />
                  {errors.message && touched.message && (
                    <p className="mt-0.5 text-xs text-red-400">{errors.message}</p>
                  )}
                </div>
                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-[#181818] border border-[#39FF14] text-[#39FF14] text-sm font-semibold rounded shadow hover:bg-[#222] hover:text-[#AEEA00] hover:border-[#AEEA00] disabled:opacity-50 transition-all duration-150 font-mono"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaPaperPlane size={16} />
                  <span>{submitting ? "Broadcasting..." : "Send Message"}</span>
                </motion.button>
              </form>
              {/* Success / Error Toast - Blockchain style */}
              <AnimatePresence>
                {status.success !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                    className={`fixed left-1/2 -translate-x-1/2 bottom-8 px-6 py-3 rounded-lg text-xs font-mono shadow-lg z-[99999] border-2 ${status.success ? "bg-[#101c10] border-[#39FF14] text-[#39FF14]" : "bg-[#2a1010] border-red-500 text-red-400"}`}
                    onAnimationComplete={() =>
                      setTimeout(() => setStatus({ success: null, text: "" }), 3500)
                    }
                  >
                    <pre className="whitespace-pre-wrap text-left text-xs font-mono">
{status.text}
</pre>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <style jsx>{`
        .neon-contact-btn {
          text-shadow: 0 0 8px #AEEA00, 0 0 2px #AEEA00;
        }
        .terminal-modal {
          box-shadow: 0 0 24px #39FF14, 0 0 2px #39FF14;
        }
        .blinking-cursor {
          display: inline-block;
          width: 10px;
          animation: blink 1s steps(2, start) infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-typing {
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          border-right: 2px solid #39FF14;
          animation: typing 1.5s steps(30, end) 1;
        }
        @keyframes typing {
          from { width: 0; }
          to { width: 100%; }
        }
      `}</style>
    </>
  );
}
