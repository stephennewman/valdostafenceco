"use client";

import { useState } from "react";
import CTAButton from "./CTAButton";

interface ContactFormProps {
  variant?: "default" | "compact";
  showServiceSelect?: boolean;
}

const services = [
  "Wood Fence Installation",
  "Vinyl Fence Installation",
  "Chain Link Fence",
  "Aluminum Fence",
  "Privacy Fence",
  "Pool Fence",
  "Farm & Ranch Fencing",
  "Commercial Fencing",
  "Fence Repair",
  "Gate Installation",
  "Other",
];

export default function ContactForm({
  variant = "default",
  showServiceSelect = true,
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to an API
    console.log("Form submitted:", formData);
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (submitted) {
    return (
      <div className="bg-[var(--forest-green)]/10 rounded-xl p-8 text-center">
        <div className="w-16 h-16 bg-[var(--forest-green)] rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-[var(--font-serif)] text-[var(--forest-green)] mb-2">
          Thank You!
        </h3>
        <p className="text-[var(--foreground-muted)]">
          We&apos;ve received your message and will get back to you within 24
          hours.
        </p>
      </div>
    );
  }

  const inputStyles =
    "w-full px-4 py-3 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--golden-amber)] focus:border-transparent transition-all bg-white";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className={variant === "compact" ? "" : "grid md:grid-cols-2 gap-4"}>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-[var(--foreground)] mb-1"
          >
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className={inputStyles}
            placeholder="Your name"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-[var(--foreground)] mb-1"
          >
            Phone *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className={inputStyles}
            placeholder="(229) 555-1234"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-[var(--foreground)] mb-1"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={inputStyles}
          placeholder="your@email.com"
        />
      </div>

      {showServiceSelect && (
        <div>
          <label
            htmlFor="service"
            className="block text-sm font-medium text-[var(--foreground)] mb-1"
          >
            Service Interested In
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className={inputStyles}
          >
            <option value="">Select a service...</option>
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-[var(--foreground)] mb-1"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={variant === "compact" ? 3 : 5}
          value={formData.message}
          onChange={handleChange}
          className={inputStyles}
          placeholder="Tell us about your project..."
        />
      </div>

      <CTAButton type="submit" variant="primary" fullWidth>
        Send Message
      </CTAButton>

      <p className="text-xs text-[var(--foreground-muted)] text-center">
        We typically respond within 24 hours.
      </p>
    </form>
  );
}


