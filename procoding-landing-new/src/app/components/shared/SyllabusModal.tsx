"use client";
import { useState } from "react";

type Props = {
  onClose: () => void;
};

export default function SyllabusModal({ onClose }: Props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          type: "syllabus",
        }),
      });

      setSubmitted(true);
    } catch (error) {
      console.error("Failed to send syllabus form", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white dark:bg-[#111] text-black dark:text-white p-8 rounded-xl w-full max-w-md shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl font-bold text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          ×
        </button>

        {!submitted ? (
          <>
            <h2 className="text-2xl font-bold mb-2 text-center">
              Get Course Program by Email
            </h2>
            <p className="text-sm text-center mb-6 text-gray-600 dark:text-gray-300">
              Discover everything about our course curriculum to make a
              confident decision.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <input
                type="text"
                required
                placeholder="Your name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-transparent"
              />

              {/* Email */}
              <input
                type="email"
                required
                placeholder="Your email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-transparent"
              />

              {/* Phone */}
              <input
                type="tel"
                placeholder="Your phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-transparent"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full font-semibold py-2 rounded-full transition ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#9333ea] text-white hover:bg-[#b91ea2]"
                }`}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Thank you!</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              We’ll send the syllabus to your email shortly.
              <br />
              Please check your inbox (and spam folder just in case).
            </p>
          </div>
        )}
      </div>
    </div>
  );
}