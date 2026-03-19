"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, MessageCircle } from "lucide-react";
import { createPortal } from "react-dom";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ success: null, text: "" });
  const [open, setOpen] = useState(false);
  const modalRef = useRef();
  const [mounted, setMounted] = useState(false);

  const validators = {
    name: (v) => (v.trim() ? "" : "Name is required"),
    email: (v) => (/^\S+@\S+\.\S+$/.test(v) ? "" : "Please enter a valid email"),
    message: (v) => (v.trim() ? "" : "Message cannot be empty"),
  };

  useEffect(() => {
    const newErr = {};
    for (let field in formData) {
      const err = validators[field]?.(formData[field]);
      if (err) newErr[field] = err;
    }
    setErrors(newErr);
  }, [formData]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

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
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error("Network error");

      setStatus({ success: true, text: "Message sent successfully!" });
      setFormData({ name: "", email: "", message: "" });
      setTouched({});
    } catch {
      setStatus({ success: false, text: "Failed to send. Please try again." });
    }
    setSubmitting(false);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const portalContent = (
    <>
      {/* Floating button */}
      <motion.button
        className="fixed bottom-20 right-6 z-[100001] px-5 py-2.5 rounded-xl shadow-lg flex items-center gap-2 font-medium bg-[var(--accent-purple)] text-white hover:bg-[var(--accent-purple)]/90 transition-all duration-200 text-sm"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setOpen(true)}
        aria-label="Contact Pranshu"
      >
        <MessageCircle className="w-4 h-4" />
        <span className="hidden sm:inline">Contact</span>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={modalRef}
            className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={handleBackdropClick}
          >
            <motion.div
              className="relative w-full max-w-lg mx-4 rounded-2xl border border-white/[0.08] bg-[var(--bg-secondary)] overflow-hidden"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onMouseDown={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
                <div>
                  <h2 className="text-lg font-bold text-[var(--text-primary)]">
                    Get in Touch
                  </h2>
                  <p className="text-xs text-[var(--text-muted)]">
                    I'd love to hear from you
                  </p>
                </div>
                <button
                  className="p-2 hover:bg-white/[0.04] rounded-lg transition-colors text-[var(--text-muted)]"
                  onClick={() => setOpen(false)}
                  aria-label="Close contact form"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["name", "email"].map((field) => (
                    <div key={field}>
                      <label
                        htmlFor={field}
                        className="block mb-1.5 text-xs font-medium text-[var(--text-secondary)] capitalize"
                      >
                        {field}
                      </label>
                      <input
                        id={field}
                        name={field}
                        type={field === "email" ? "email" : "text"}
                        value={formData[field]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="off"
                        placeholder={field === "email" ? "you@example.com" : "Your name"}
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-primary)] border text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--accent-purple)]/50 transition-colors ${
                          errors[field] && touched[field]
                            ? "border-red-400/50"
                            : "border-white/[0.08]"
                        }`}
                      />
                      {errors[field] && touched[field] && (
                        <p className="mt-1 text-xs text-red-400">{errors[field]}</p>
                      )}
                    </div>
                  ))}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block mb-1.5 text-xs font-medium text-[var(--text-secondary)]"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="off"
                    placeholder="What's on your mind?"
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-primary)] border text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--accent-purple)]/50 transition-colors resize-none ${
                      errors.message && touched.message
                        ? "border-red-400/50"
                        : "border-white/[0.08]"
                    }`}
                  />
                  {errors.message && touched.message && (
                    <p className="mt-1 text-xs text-red-400">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--accent-purple)] text-white text-sm font-medium rounded-xl hover:bg-[var(--accent-purple)]/90 disabled:opacity-50 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? "Sending..." : "Send Message"}</span>
                </button>
              </form>

              {/* Status toast */}
              <AnimatePresence>
                {status.success !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={`mx-6 mb-6 px-4 py-3 rounded-xl text-sm font-medium ${
                      status.success
                        ? "bg-[var(--accent-lime)]/10 text-[var(--accent-lime)] border border-[var(--accent-lime)]/20"
                        : "bg-red-500/10 text-red-400 border border-red-500/20"
                    }`}
                    onAnimationComplete={() =>
                      setTimeout(() => setStatus({ success: null, text: "" }), 3500)
                    }
                  >
                    {status.text}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  return createPortal(portalContent, document.body);
}
