"use client";

import { useState } from "react";
import { CheckCircle, ArrowRight, ArrowLeft, Phone } from "lucide-react";
import HeroSection from "../components/HeroSection";
import CTAButton from "../components/CTAButton";

const propertyTypes = [
  { id: "residential", label: "Residential", description: "Home or personal property" },
  { id: "commercial", label: "Commercial", description: "Business or commercial property" },
  { id: "farm", label: "Farm/Ranch", description: "Agricultural property" },
];

const fenceTypes = [
  { id: "wood", label: "Wood Fence" },
  { id: "vinyl", label: "Vinyl Fence" },
  { id: "chain-link", label: "Chain Link" },
  { id: "aluminum", label: "Aluminum" },
  { id: "privacy", label: "Privacy Fence" },
  { id: "pool", label: "Pool Fence" },
  { id: "farm", label: "Farm/Ranch Fencing" },
  { id: "repair", label: "Fence Repair" },
  { id: "gate", label: "Gate Installation" },
  { id: "unsure", label: "Not Sure Yet" },
];

const timelines = [
  { id: "asap", label: "As soon as possible" },
  { id: "month", label: "Within a month" },
  { id: "3months", label: "Within 3 months" },
  { id: "planning", label: "Just planning ahead" },
];

export default function FreeEstimatePage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    propertyType: "",
    fenceType: "",
    fenceLength: "",
    timeline: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const updateForm = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.propertyType !== "";
      case 2:
        return formData.fenceType !== "";
      case 3:
        return formData.timeline !== "";
      case 4:
        return formData.name !== "" && formData.phone !== "";
      default:
        return false;
    }
  };

  if (submitted) {
    return (
      <>
        <HeroSection
          subtitle="Thank You!"
          title="We've Received Your Request"
          description="Our team will review your information and contact you within 24 hours to schedule your free on-site estimate."
          size="md"
        />
        <section className="py-16 lg:py-24 bg-[var(--background)]">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <div className="w-20 h-20 bg-[var(--forest-green)] rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-[var(--font-serif)] text-[var(--forest-green)] mb-4">
              What Happens Next?
            </h2>
            <ol className="text-left space-y-4 mb-8">
              <li className="flex gap-4">
                <span className="w-8 h-8 bg-[var(--golden-amber)] rounded-full flex items-center justify-center text-[var(--forest-green-dark)] font-bold flex-shrink-0">
                  1
                </span>
                <div>
                  <strong>We&apos;ll Call You</strong>
                  <p className="text-[var(--foreground-muted)] text-sm">
                    Within 24 hours, one of our team members will reach out to confirm details and schedule your estimate.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="w-8 h-8 bg-[var(--golden-amber)] rounded-full flex items-center justify-center text-[var(--forest-green-dark)] font-bold flex-shrink-0">
                  2
                </span>
                <div>
                  <strong>On-Site Visit</strong>
                  <p className="text-[var(--foreground-muted)] text-sm">
                    We&apos;ll visit your property, take measurements, discuss options, and answer all your questions.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="w-8 h-8 bg-[var(--golden-amber)] rounded-full flex items-center justify-center text-[var(--forest-green-dark)] font-bold flex-shrink-0">
                  3
                </span>
                <div>
                  <strong>Receive Your Quote</strong>
                  <p className="text-[var(--foreground-muted)] text-sm">
                    You&apos;ll receive a detailed written quote within 24-48 hours of the visit – no pressure, no obligation.
                  </p>
                </div>
              </li>
            </ol>
            <p className="text-[var(--foreground-muted)] mb-6">
              Need to talk sooner? Give us a call:
            </p>
            <a
              href="tel:+12295551234"
              className="inline-flex items-center gap-2 text-[var(--golden-amber-dark)] font-semibold text-lg"
            >
              <Phone className="w-5 h-5" />
              (229) 555-1234
            </a>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <HeroSection
        subtitle="Free Estimate"
        title="Get Your Custom Quote"
        description="Tell us about your project and we'll provide a free, no-obligation estimate."
        size="sm"
      />

      <section className="py-16 lg:py-24 bg-[var(--background)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${
                    s <= step
                      ? "bg-[var(--golden-amber)] text-[var(--forest-green-dark)]"
                      : "bg-[var(--background-alt)] text-[var(--foreground-muted)]"
                  }`}
                >
                  {s < step ? <CheckCircle className="w-5 h-5" /> : s}
                </div>
              ))}
            </div>
            <div className="h-2 bg-[var(--background-alt)] rounded-full">
              <div
                className="h-full bg-[var(--golden-amber)] rounded-full transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-xl p-8 border border-[var(--border)] min-h-[400px]">
              {/* Step 1: Property Type */}
              {step === 1 && (
                <div>
                  <h2 className="text-2xl font-[var(--font-serif)] text-[var(--forest-green)] mb-2">
                    What type of property?
                  </h2>
                  <p className="text-[var(--foreground-muted)] mb-6">
                    This helps us understand your needs better.
                  </p>
                  <div className="space-y-3">
                    {propertyTypes.map((type) => (
                      <label
                        key={type.id}
                        className={`block p-4 border rounded-lg cursor-pointer transition-all ${
                          formData.propertyType === type.id
                            ? "border-[var(--golden-amber)] bg-[var(--golden-amber)]/10"
                            : "border-[var(--border)] hover:border-[var(--golden-amber)]/50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="propertyType"
                          value={type.id}
                          checked={formData.propertyType === type.id}
                          onChange={(e) => updateForm("propertyType", e.target.value)}
                          className="sr-only"
                        />
                        <span className="font-semibold text-[var(--forest-green)]">
                          {type.label}
                        </span>
                        <span className="block text-sm text-[var(--foreground-muted)]">
                          {type.description}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Fence Type */}
              {step === 2 && (
                <div>
                  <h2 className="text-2xl font-[var(--font-serif)] text-[var(--forest-green)] mb-2">
                    What type of fence?
                  </h2>
                  <p className="text-[var(--foreground-muted)] mb-6">
                    Select the fence type you&apos;re interested in.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {fenceTypes.map((type) => (
                      <label
                        key={type.id}
                        className={`block p-4 border rounded-lg cursor-pointer transition-all ${
                          formData.fenceType === type.id
                            ? "border-[var(--golden-amber)] bg-[var(--golden-amber)]/10"
                            : "border-[var(--border)] hover:border-[var(--golden-amber)]/50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="fenceType"
                          value={type.id}
                          checked={formData.fenceType === type.id}
                          onChange={(e) => updateForm("fenceType", e.target.value)}
                          className="sr-only"
                        />
                        <span className="font-medium text-[var(--forest-green)]">
                          {type.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Timeline */}
              {step === 3 && (
                <div>
                  <h2 className="text-2xl font-[var(--font-serif)] text-[var(--forest-green)] mb-2">
                    When do you need it?
                  </h2>
                  <p className="text-[var(--foreground-muted)] mb-6">
                    Let us know your timeline.
                  </p>
                  <div className="space-y-3 mb-6">
                    {timelines.map((option) => (
                      <label
                        key={option.id}
                        className={`block p-4 border rounded-lg cursor-pointer transition-all ${
                          formData.timeline === option.id
                            ? "border-[var(--golden-amber)] bg-[var(--golden-amber)]/10"
                            : "border-[var(--border)] hover:border-[var(--golden-amber)]/50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="timeline"
                          value={option.id}
                          checked={formData.timeline === option.id}
                          onChange={(e) => updateForm("timeline", e.target.value)}
                          className="sr-only"
                        />
                        <span className="font-medium text-[var(--forest-green)]">
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
                      Approximate fence length (optional)
                    </label>
                    <input
                      type="text"
                      value={formData.fenceLength}
                      onChange={(e) => updateForm("fenceLength", e.target.value)}
                      placeholder="e.g., 200 linear feet"
                      className="w-full px-4 py-3 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--golden-amber)]"
                    />
                  </div>
                </div>
              )}

              {/* Step 4: Contact Info */}
              {step === 4 && (
                <div>
                  <h2 className="text-2xl font-[var(--font-serif)] text-[var(--forest-green)] mb-2">
                    Your Contact Information
                  </h2>
                  <p className="text-[var(--foreground-muted)] mb-6">
                    We&apos;ll use this to schedule your free estimate.
                  </p>
                  <div className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
                          Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => updateForm("name", e.target.value)}
                          className="w-full px-4 py-3 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--golden-amber)]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => updateForm("phone", e.target.value)}
                          placeholder="(229) 555-1234"
                          className="w-full px-4 py-3 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--golden-amber)]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateForm("email", e.target.value)}
                        className="w-full px-4 py-3 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--golden-amber)]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
                        Property Address
                      </label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => updateForm("address", e.target.value)}
                        placeholder="123 Main St, Valdosta, GA"
                        className="w-full px-4 py-3 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--golden-amber)]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
                        Additional Details (optional)
                      </label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => updateForm("message", e.target.value)}
                        placeholder="Tell us more about your project..."
                        className="w-full px-4 py-3 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--golden-amber)]"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-6">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="inline-flex items-center gap-2 px-6 py-3 text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
              ) : (
                <div />
              )}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  disabled={!canProceed()}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--golden-amber)] text-[var(--forest-green-dark)] rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--golden-amber-light)] transition-colors"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <CTAButton type="submit" variant="primary" size="lg">
                  Submit Request
                </CTAButton>
              )}
            </div>
          </form>
        </div>
      </section>
    </>
  );
}


