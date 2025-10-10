"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useTranslation } from "@/lib/TranslationContext";

export default function ContactForm() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const isDark = theme === "dark";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Reset error if user changes something
    setErrors(null);

    if (name === "phone") {
      const digitsOnly = value.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, phone: digitsOnly }));
    } else if (name === "message") {
      if (value.length > 1000) {
        setErrors(t("contact.errors.messageTooLong"));
      } else {
        setErrors(null);
      }
      setFormData((prev) => ({ ...prev, message: value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors(null);
    setSuccess(false);

    const cleanedData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim() ? `+1${formData.phone.trim()}` : "",
      message: formData.message.trim(),
    };

    if (!cleanedData.name || !cleanedData.email || !cleanedData.message) {
      setErrors(t("contact.errors.emailRequired"));
      return;
    }

    if (cleanedData.message.length > 1000) {
      setErrors(t("contact.errors.messageTooLong"));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanedData.email)) {
      setErrors(t("contact.errors.emailInvalid"));
      return;
    }

    const phoneRegex = /^[2-9][0-9]{2}[2-9][0-9]{2}[0-9]{4}$/;
    if (cleanedData.phone && !phoneRegex.test(cleanedData.phone.replace("+1", ""))) {
      setErrors(t("contact.errors.phoneInvalid"));
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${window.location.origin}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanedData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setErrors(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setErrors("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-20 px-4 flex justify-center transition-colors duration-300">
      <div
        className={`relative w-full max-w-3xl rounded-3xl px-8 py-10 border transition-colors duration-300 ${
          isDark
            ? "bg-[#141414] border-white/10 text-white"
            : "bg-[#F3F2FF] border-black/10 text-black"
        }`}
      >
        {/* Dragon Image */}
        <div className="absolute -right-20 bottom-0 hidden lg:block z-50">
          <Image
            src="/images/dragon_pointing.svg"
            alt="ProCoding Dragon"
            width={200}
            height={200}
            className="object-contain"
          />
        </div>

        {/* Header */}
        <h2 className="text-4xl font-bold mb-4 leading-tight">
          {t("contact.title")}
        </h2>
        <p className={`mb-8 ${isDark ? "text-white" : "text-black"}`}>
          {t("contact.description")}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <input
            type="text"
            name="name"
            aria-label="Your Name"
            value={formData.name}
            onChange={handleChange}
            placeholder={t("contact.namePlaceholder")}
            className={`w-full px-4 py-3 rounded-xl placeholder-opacity-60 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-300 ${
              isDark
                ? "bg-[#0f0f0f] border border-white/20 text-white placeholder-white/50"
                : "bg-[#f3f2ff] border border-black/10 text-black placeholder-black/40"
            }`}
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            aria-label="Email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t("contact.emailPlaceholder")}
            className={`w-full px-4 py-3 rounded-xl placeholder-opacity-60 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-300 ${
              isDark
                ? "bg-[#0f0f0f] border border-white/20 text-white placeholder-white/50"
                : "bg-[#f3f2ff] border border-black/10 text-black placeholder-black/40"
            }`}
          />

          {/* Phone */}
          <div
            className={`flex items-center rounded-xl overflow-hidden transition-colors duration-300 ${
              isDark
                ? "bg-[#0f0f0f] border border-white/20"
                : "bg-[#f3f2ff] border border-black/10"
            }`}
          >
            <div className="flex items-center px-3 shrink-0">
              <Image
                src="/images/flag_en.svg"
                alt="US Flag"
                width={20}
                height={20}
                className="rounded-sm"
              />
              <span
                className={`ml-2 font-medium ${
                  isDark ? "text-white" : "text-black"
                }`}
              >
                +1
              </span>
            </div>

            <input
              type="tel"
              name="phone"
              aria-label="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              placeholder="2025550123"
              maxLength={10}
              inputMode="numeric"
              className={`w-full py-3 pr-4 focus:outline-none bg-transparent placeholder-opacity-60 ${
                isDark
                  ? "text-white placeholder-white/50"
                  : "text-black placeholder-black/40"
              }`}
            />
          </div>

          {/* Message */}
          <textarea
            name="message"
            aria-label="Your Message"
            value={formData.message}
            onChange={handleChange}
            placeholder={t("contact.questionPlaceholder")}
            rows={4}
            maxLength={1000}
            className={`w-full px-4 py-3 rounded-xl placeholder-opacity-60 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-300 ${
              isDark
                ? "bg-[#0f0f0f] border border-white/20 text-white placeholder-white/50"
                : "bg-[#f3f2ff] border border-black/10 text-black placeholder-black/40"
            }`}
          />

          {/* Error */}
          {errors && <p className="text-red-500 text-sm">{errors}</p>}

          {/* Success */}
          {success && (
            <p className="text-green-500 text-sm">
              Message sent successfully!
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#9333ea] hover:bg-[#9333ea] hover:opacity-90  text-white font-semibold py-3 rounded-full transition duration-200 disabled:opacity-50"
          >
            {loading ? "Sending..." : t("contact.submit")}
          </button>
        </form>
      </div>
    </section>
  );
}