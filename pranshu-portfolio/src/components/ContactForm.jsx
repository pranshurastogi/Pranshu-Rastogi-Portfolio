// src/components/ContactForm.jsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ success: null, text: "" });

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

  const handleChange = (e) => {
    setFormData((f) => ({ ...f, [e.target.name]: e.target.value }));
  };
  const handleBlur = (e) => {
    setTouched((t) => ({ ...t, [e.target.name]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // mark all touched to show errors
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
    <div className="max-w-lg mx-auto my-16 p-8 bg-white rounded-2xl shadow-2xl">
      <h2 className="text-3xl font-extrabold text-center text-indigo-600 mb-6">
        Get In Touch
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name & Email */}
        {["name", "email"].map((field) => (
          <div key={field} className="flex flex-col">
            <label
              htmlFor={field}
              className="mb-2 font-medium text-gray-700 capitalize"
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
              className={`px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 ${
                errors[field] && touched[field]
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-indigo-300"
              } bg-gray-50`}
            />
            {errors[field] && touched[field] && (
              <p className="mt-1 text-sm text-red-600">{errors[field]}</p>
            )}
          </div>
        ))}

        {/* Message */}
        <div className="flex flex-col">
          <label
            htmlFor="message"
            className="mb-2 font-medium text-gray-700"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Type your message..."
            className={`px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 ${
              errors.message && touched.message
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-indigo-300"
            } bg-gray-50 resize-none`}
          />
          {errors.message && touched.message && (
            <p className="mt-1 text-sm text-red-600">{errors.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={submitting}
          className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
        >
          <FaPaperPlane />
          <span>{submitting ? "Sending..." : "Send Message"}</span>
        </motion.button>
      </form>

      {/* Success / Error Toast */}
      <AnimatePresence>
        {status.success !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className={`fixed bottom-6 right-6 px-4 py-2 rounded-lg text-white shadow-lg ${
              status.success ? "bg-green-500" : "bg-red-500"
            }`}
            onAnimationComplete={() =>
              setTimeout(() => setStatus({ success: null, text: "" }), 3000)
            }
          >
            {status.text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
