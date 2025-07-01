// src/components/ContactForm.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPaperPlane, FaTimes } from "react-icons/fa";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ success: null, text: "" });
  const [open, setOpen] = useState(false);
  const modalRef = useRef();

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
    try {
      const res = await fetch("https://formspree.io/f/xjkwggdp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Network error");
      setStatus({ success: true, text: "🚀 Sent successfully!" });
      setFormData({ name: "", email: "", message: "" });
      setTouched({});
    } catch {
      setStatus({ success: false, text: "❌ Submission failed." });
    }
    setSubmitting(false);
  };

  return (
    <>
      {/* Floating Card/Button */}
      <motion.button
        className="fixed bottom-20 right-6 z-40 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-5 py-2 rounded-full shadow-lg flex items-center gap-2 font-semibold hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setOpen(true)}
        aria-label="Contact Pranshu"
        style={{ boxShadow: "0 2px 16px 0 rgba(80, 60, 180, 0.15)" }}
      >
        <FaPaperPlane size={18} />
        <span className="hidden sm:inline">Contact Pranshu</span>
      </motion.button>

      {/* Modal Popup */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={modalRef}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={handleBackdropClick}
          >
            <motion.div
              className="relative bg-white rounded-xl shadow-2xl max-w-md w-full mx-2 p-4"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onMouseDown={e => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-300"
                onClick={() => setOpen(false)}
                aria-label="Close contact form"
              >
                <FaTimes size={18} />
              </button>
              <h2 className="text-2xl font-bold text-center text-indigo-600 mb-4 mt-2">
                Get In Touch
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name & Email - side by side on md+ */}
                <div className="flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0">
                  {["name", "email"].map((field) => (
                    <div key={field} className="flex-1 flex flex-col">
                      <label
                        htmlFor={field}
                        className="mb-1 text-sm font-medium text-gray-700 capitalize"
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
                        placeholder={
                          field === "email" ? "you@example.com" : `Your ${field}`
                        }
                        className={`px-3 py-2 rounded-md border text-sm focus:outline-none focus:ring-2 transition-colors duration-150 ${
                          errors[field] && touched[field]
                            ? "border-red-400 focus:ring-red-200"
                            : "border-gray-300 focus:ring-indigo-200"
                        } bg-gray-50`}
                      />
                      {errors[field] && touched[field] && (
                        <p className="mt-0.5 text-xs text-red-600">{errors[field]}</p>
                      )}
                    </div>
                  ))}
                </div>
                {/* Message */}
                <div className="flex flex-col">
                  <label
                    htmlFor="message"
                    className="mb-1 text-sm font-medium text-gray-700"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Type your message..."
                    className={`px-3 py-2 rounded-md border text-sm focus:outline-none focus:ring-2 transition-colors duration-150 ${
                      errors.message && touched.message
                        ? "border-red-400 focus:ring-red-200"
                        : "border-gray-300 focus:ring-indigo-200"
                    } bg-gray-50 resize-none`}
                  />
                  {errors.message && touched.message && (
                    <p className="mt-0.5 text-xs text-red-600">{errors.message}</p>
                  )}
                </div>
                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold rounded-md shadow-md hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 transition-all duration-150"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaPaperPlane size={16} />
                  <span>{submitting ? "Sending..." : "Send Message"}</span>
                </motion.button>
              </form>
              {/* Success / Error Toast */}
              <AnimatePresence>
                {status.success !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                    className={`fixed bottom-4 right-4 px-3 py-1.5 rounded-md text-xs text-white shadow-md z-50 ${
                      status.success ? "bg-green-500" : "bg-red-500"
                    }`}
                    onAnimationComplete={() =>
                      setTimeout(() => setStatus({ success: null, text: "" }), 2500)
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
}
