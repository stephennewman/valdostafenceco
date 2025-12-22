"use client";

import { useState, useMemo } from "react";
import { CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";
import HeroSection from "../components/HeroSection";
import CTAButton from "../components/CTAButton";
import PhoneLink from "../components/PhoneLink";
import SchedulingWidget from "../components/SchedulingWidget";
import { calculateLeadScore, formatSlotDate } from "../utils/leadScoring";

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

const fenceLengths = [
  { id: "small", label: "Under 100 ft", description: "Small yard or section" },
  { id: "medium", label: "100-250 ft", description: "Average backyard" },
  { id: "large", label: "250-500 ft", description: "Large property" },
  { id: "xlarge", label: "500+ ft", description: "Acreage / Commercial" },
  { id: "unsure", label: "Not sure yet", description: "We'll measure on-site" },
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
    city: "",
    message: "",
    scheduledDate: "",
    scheduledTime: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const updateForm = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Calculate lead score when we have enough data
  const leadScore = useMemo(() => {
    if (formData.propertyType && formData.fenceType && formData.fenceLength && formData.timeline) {
      return calculateLeadScore({
        propertyType: formData.propertyType,
        fenceType: formData.fenceType,
        fenceLength: formData.fenceLength,
        timeline: formData.timeline,
      });
    }
    return null;
  }, [formData.propertyType, formData.fenceType, formData.fenceLength, formData.timeline]);

  const handleSchedule = (date: Date, timeSlot: string) => {
    setFormData((prev) => ({
      ...prev,
      scheduledDate: date.toISOString(),
      scheduledTime: timeSlot,
    }));
    setStep(6); // Move to contact info
  };

  const handleSkipScheduling = () => {
    setStep(6); // Move to contact info without scheduling
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          propertyType: formData.propertyType,
          fenceTypes: formData.fenceType,
          timeline: formData.timeline,
          fenceLength: formData.fenceLength,
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
          city: formData.city,
          notes: formData.message,
          scheduledDate: formData.scheduledDate,
          scheduledTime: formData.scheduledTime,
          leadScore: leadScore?.score,
          leadPriority: leadScore?.priority,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send request");
      }

      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please call us at (229) 563-6488.");
    } finally {
      setIsLoading(false);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.propertyType !== "";
      case 2:
        return formData.fenceType !== "";
      case 3:
        return formData.fenceLength !== "";
      case 4:
        return formData.timeline !== "";
      case 5:
        return true; // Scheduling step - can skip
      case 6:
        return formData.name !== "" && formData.phone !== "";
      default:
        return false;
    }
  };

  const totalSteps = 6;

  if (submitted) {
    const hasScheduled = formData.scheduledDate && formData.scheduledTime;
    const scheduledDateObj = hasScheduled ? new Date(formData.scheduledDate) : null;

    return (
      <>
        <HeroSection
          subtitle="Thank You!"
          title={hasScheduled ? "Your Appointment is Scheduled!" : "We've Received Your Request"}
          description={
            hasScheduled
              ? `We'll see you on ${scheduledDateObj ? formatSlotDate(scheduledDateObj) : ''} between ${formData.scheduledTime}.`
              : "Our team will review your information and contact you within 24 hours to schedule your free on-site estimate."
          }
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
              {hasScheduled ? (
                <>
                  <li className="flex gap-4">
                    <span className="w-8 h-8 bg-[var(--golden-amber)] rounded-full flex items-center justify-center text-[var(--forest-green-dark)] font-bold flex-shrink-0">
                      1
                    </span>
                    <div>
                      <strong>Confirmation Call</strong>
                      <p className="text-[var(--foreground-muted)] text-sm">
                        We&apos;ll call or text to confirm your appointment within a few hours.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="w-8 h-8 bg-[var(--golden-amber)] rounded-full flex items-center justify-center text-[var(--forest-green-dark)] font-bold flex-shrink-0">
                      2
                    </span>
                    <div>
                      <strong>On-Site Visit - {scheduledDateObj ? formatSlotDate(scheduledDateObj) : ''}</strong>
                      <p className="text-[var(--foreground-muted)] text-sm">
                        Our estimator will arrive between {formData.scheduledTime} to measure, discuss options, and answer questions.
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
                </>
              ) : (
                <>
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
                </>
              )}
            </ol>
            <p className="text-[var(--foreground-muted)] mb-6">
              Need to talk sooner? Give us a call:
            </p>
            <PhoneLink
              location="estimate-thank-you"
              className="inline-flex items-center gap-2 text-[var(--golden-amber-dark)] font-semibold text-lg"
              iconClassName="w-5 h-5"
            />
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
              {[1, 2, 3, 4, 5, 6].map((s) => (
                <div
                  key={s}
                  className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full font-semibold text-sm ${
                    s <= step
                      ? "bg-[var(--golden-amber)] text-[var(--forest-green-dark)]"
                      : "bg-[var(--background-alt)] text-[var(--foreground-muted)]"
                  }`}
                >
                  {s < step ? <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" /> : s}
                </div>
              ))}
            </div>
            <div className="h-2 bg-[var(--background-alt)] rounded-full">
              <div
                className="h-full bg-[var(--golden-amber)] rounded-full transition-all duration-300"
                style={{ width: `${(step / totalSteps) * 100}%` }}
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

              {/* Step 3: Fence Length */}
              {step === 3 && (
                <div>
                  <h2 className="text-2xl font-[var(--font-serif)] text-[var(--forest-green)] mb-2">
                    How much fencing do you need?
                  </h2>
                  <p className="text-[var(--foreground-muted)] mb-6">
                    Estimate the total linear feet. Don&apos;t worry – we&apos;ll measure exactly during your free estimate.
                  </p>
                  <div className="space-y-3">
                    {fenceLengths.map((length) => (
                      <label
                        key={length.id}
                        className={`block p-4 border rounded-lg cursor-pointer transition-all ${
                          formData.fenceLength === length.id
                            ? "border-[var(--golden-amber)] bg-[var(--golden-amber)]/10"
                            : "border-[var(--border)] hover:border-[var(--golden-amber)]/50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="fenceLength"
                          value={length.id}
                          checked={formData.fenceLength === length.id}
                          onChange={(e) => updateForm("fenceLength", e.target.value)}
                          className="sr-only"
                        />
                        <span className="font-semibold text-[var(--forest-green)]">
                          {length.label}
                        </span>
                        <span className="block text-sm text-[var(--foreground-muted)]">
                          {length.description}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Timeline */}
              {step === 4 && (
                <div>
                  <h2 className="text-2xl font-[var(--font-serif)] text-[var(--forest-green)] mb-2">
                    When do you need it?
                  </h2>
                  <p className="text-[var(--foreground-muted)] mb-6">
                    Let us know your timeline.
                  </p>
                  <div className="space-y-3">
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
                </div>
              )}

              {/* Step 5: Scheduling */}
              {step === 5 && leadScore && (
                <div>
                  <h2 className="text-2xl font-[var(--font-serif)] text-[var(--forest-green)] mb-2">
                    Schedule Your Free Estimate
                  </h2>
                  <p className="text-[var(--foreground-muted)] mb-6">
                    Pick a time that works for you, or skip and we&apos;ll call to schedule.
                  </p>
                  <SchedulingWidget
                    leadScore={leadScore}
                    onSchedule={handleSchedule}
                    onSkip={handleSkipScheduling}
                  />
                </div>
              )}

              {/* Step 6: Contact Info */}
              {step === 6 && (
                <div>
                  <h2 className="text-2xl font-[var(--font-serif)] text-[var(--forest-green)] mb-2">
                    Your Contact Information
                  </h2>
                  <p className="text-[var(--foreground-muted)] mb-6">
                    {formData.scheduledDate
                      ? "We'll use this to confirm your appointment."
                      : "We'll use this to schedule your free estimate."}
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
                          placeholder="(229) 563-6488"
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
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
                          Property Address
                        </label>
                        <input
                          type="text"
                          value={formData.address}
                          onChange={(e) => updateForm("address", e.target.value)}
                          placeholder="123 Main St"
                          className="w-full px-4 py-3 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--golden-amber)]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => updateForm("city", e.target.value)}
                          placeholder="Valdosta"
                          className="w-full px-4 py-3 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--golden-amber)]"
                        />
                      </div>
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
              {step > 1 && step !== 5 ? (
                <button
                  type="button"
                  onClick={() => setStep(step === 6 && !formData.scheduledDate ? 5 : step - 1)}
                  className="inline-flex items-center gap-2 px-6 py-3 text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
              ) : (
                <div />
              )}

              {step < 5 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  disabled={!canProceed()}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--golden-amber)] text-[var(--forest-green-dark)] rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--golden-amber-light)] transition-colors"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : step === 6 ? (
                <div className="flex flex-col items-end gap-2">
                  {error && (
                    <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                      {error}
                    </p>
                  )}
                  <CTAButton type="submit" variant="primary" size="lg" disabled={isLoading || !canProceed()}>
                    {isLoading ? "Submitting..." : formData.scheduledDate ? "Confirm Appointment" : "Submit Request"}
                  </CTAButton>
                </div>
              ) : null}
            </div>
          </form>
        </div>
      </section>

      {/* CSS for animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
}
