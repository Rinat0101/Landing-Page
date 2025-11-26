"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

type Props = {
  data: { [key: string]: string | undefined };
  locale: "en" | "ru";
};

export default function ContactForm({ data, locale }: Props) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  console.log(data)

  // Locale helper
  const t = (key: string) => data[`${key}_${locale}`] || data[key] || "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    smsConsent: false,
    marketingConsent: false,
  });

  const [errors, setErrors] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Auto-hide success message
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  // HANDLE INPUT CHANGES
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setErrors(null);

    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
      return;
    }

    if (name === "phone") {
      const digits = value.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, phone: digits }));
      return;
    }

    if (name === "message" && value.length > 1000) {
      setErrors(t("contact_error_message_too_long"));
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // HANDLE SUBMIT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors(null);
    setSuccess(false);

    if (!formData.name.trim() || !formData.email.trim()) {
      setErrors(t("contact_error_required"));
      return;
    }

    const cleanedData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone ? `+1${formData.phone}` : "",
      message: formData.message.trim(),
      type: "contact",
      smsConsent: formData.smsConsent,
      marketingConsent: formData.marketingConsent,
    };

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanedData.email)) {
      setErrors(t("contact_error_invalid_email"));
      return;
    }

    // US Phone validation
    const phoneRegex = /^[2-9][0-9]{2}[2-9][0-9]{2}[0-9]{4}$/;
    if (cleanedData.phone && !phoneRegex.test(cleanedData.phone.replace("+1", ""))) {
      setErrors(t("contact_error_invalid_phone"));
      return;
    }

    if (cleanedData.message.length > 1000) {
      setErrors(t("contact_error_message_too_long"));
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${window.location.origin}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanedData),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          smsConsent: false,
          marketingConsent: false,
        });
      } else {
        setErrors(result.error || t("contact_error_generic"));
      }
    } catch (err) {
      console.error(err);
      setErrors(t("contact_error_failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-20 px-4 flex justify-center transition-colors duration-300"
    >
      <div
        className={`relative w-full max-w-3xl rounded-3xl px-8 py-10 border ${
          isDark
            ? "bg-[#141414] border-white/10 text-white"
            : "bg-[#F3F2FF] border-black/10 text-black"
        }`}
      >
        {/* DRAGON */}
        <div className="absolute -right-20 bottom-0 hidden lg:block z-50">
          <Image
            src="/images/dragon_pointing.svg"
            alt="ProCoding Dragon"
            width={200}
            height={200}
          />
        </div>

        {/* TITLE & DESCRIPTION */}
        <h2 className="text-4xl font-bold mb-4">{t("contact_title")}</h2>
        <p className="mb-8">{t("contact_description")}</p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* NAME */}
          <input
            type="text"
            name="name"
            placeholder={t("contact_nameplaceholder")}
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-purple-500 ${
              isDark
                ? "bg-[#0f0f0f] border border-white/20 text-white"
                : "bg-[#f3f2ff] border border-black/10 text-black"
            }`}
          />

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder={t("contact_emailplaceholder")}
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-purple-500 ${
              isDark
                ? "bg-[#0f0f0f] border border-white/20 text-white"
                : "bg-[#f3f2ff] border border-black/10 text-black"
            }`}
          />

          {/* PHONE + FLAG */}
          <div
            className={`flex items-center rounded-xl overflow-hidden ${
              isDark
                ? "bg-[#0f0f0f] border border-white/20"
                : "bg-[#f3f2ff] border border-black/10"
            }`}
          >
            <div className="flex items-center px-3 shrink-0">
              <Image src="/images/flag_en.svg" alt="US Flag" width={20} height={20} />
              <span className={`ml-2 font-medium ${isDark ? "text-white" : "text-black"}`}>
                +1
              </span>
            </div>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              maxLength={10}
              inputMode="numeric"
              placeholder={t("phoneplaceholder")}
              className={`w-full py-3 pr-4 bg-transparent focus:outline-none ${
                isDark ? "text-white placeholder-white/50" : "text-black placeholder-black/40"
              }`}
            />
          </div>

          {/* MESSAGE */}
          <textarea
            name="message"
            rows={4}
            placeholder={t("questionplaceholder")}
            value={formData.message}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-purple-500 ${
              isDark
                ? "bg-[#0f0f0f] border border-white/20 text-white"
                : "bg-[#f3f2ff] border border-black/10 text-black"
            }`}
          />

          {/* CONSENTS */}
          <label className="flex items-start space-x-3 text-sm">
            <input
              type="checkbox"
              name="smsConsent"
              checked={formData.smsConsent}
              onChange={handleChange}
              className="mt-1 accent-purple-600"
            />
            <span> I agree to receive marketing SMS messages, including promotions and special
  offers, from Pro Coding Services LLC. Message frequency varies. Message &
  data rates may apply. Text STOP to unsubscribe at any time.</span>
          </label>

          <label className="flex items-start space-x-3 text-sm">
            <input
              type="checkbox"
              name="marketingConsent"
              checked={formData.marketingConsent}
              onChange={handleChange}
              className="mt-1 accent-purple-600"
            />
            <span>  I agree to receive marketing SMS messages, including promotions and special
  offers, from Pro Coding Services LLC. Message frequency varies. Message &
  data rates may apply. Text STOP to unsubscribe at any time.</span>
          </label>

          {/* DISCLAIMER */}
          <p className="text-sm mt-4">
By submitting this form, you agree to our{" "}
<a
  href="/terms-of-service"
  className="underline text-purple-600 hover:text-purple-800"
  target="_blank"
>
  Terms of Service
</a>{" "}
and{" "}
<a
  href="/privacy-policy"
  className="underline text-purple-600 hover:text-purple-800"
  target="_blank"
>
  Privacy Policy
</a>
.
</p>

          {/* ERRORS */}
          {errors && <p className="text-red-500 text-sm">{errors}</p>}
          {success && <p className="text-green-500 text-sm">Message sent successfully!</p>}

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#9333ea] text-white font-semibold py-3 rounded-full disabled:opacity-50"
          >
            {loading ? "Sending..." : t("submit")}
          </button>
        </form>
      </div>
    </section>
  );
}

