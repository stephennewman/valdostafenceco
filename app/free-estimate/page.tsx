"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { CheckCircle, ArrowLeft, X, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { calculateLeadScore, formatSlotDate, getAvailableSlots, getTimeSlots } from "../utils/leadScoring";

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
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll to top when step changes
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [step]);

  const updateFormAndAdvance = (field: string, value: string, nextStep: number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setTimeout(() => setStep(nextStep), 150); // Small delay for visual feedback
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

  // Get available dates based on lead score
  const availableDates = useMemo(() => {
    if (leadScore) {
      return getAvailableSlots(leadScore.availabilityWindow);
    }
    return getAvailableSlots("next_week"); // Default
  }, [leadScore]);

  const timeSlots = getTimeSlots();

  const handleConfirmAppointment = () => {
    if (selectedDate && selectedTime) {
      setFormData((prev) => ({
        ...prev,
        scheduledDate: selectedDate.toISOString(),
        scheduledTime: selectedTime,
      }));
      setStep(6);
    }
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

  const canSubmit = () => {
    const emailRequired = formData.scheduledDate ? formData.email !== "" : true;
    return formData.name !== "" && formData.phone !== "" && emailRequired;
  };

  const totalSteps = 6;

  // Success screen
  if (submitted) {
    const hasScheduled = formData.scheduledDate && formData.scheduledTime;
    const scheduledDateObj = hasScheduled ? new Date(formData.scheduledDate) : null;

    return (
      <div className="fixed inset-0 bg-white z-50 overflow-auto">
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-semibold text-gray-900 mb-2 text-center">
            {hasScheduled ? "Appointment Confirmed!" : "Request Received!"}
          </h1>
          <p className="text-gray-600 text-center max-w-md mb-8">
            {hasScheduled
              ? `We'll see you on ${scheduledDateObj ? formatSlotDate(scheduledDateObj) : ""} between ${formData.scheduledTime}.`
              : "We'll contact you within 24 hours to schedule your free estimate."}
          </p>
          
          <div className="bg-gray-50 rounded-xl p-6 max-w-md w-full mb-8">
            <h2 className="font-semibold text-gray-900 mb-4">What happens next?</h2>
            <ol className="space-y-4">
              <li className="flex gap-3">
                <span className="w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">1</span>
                <div>
                  <strong className="text-gray-900">Confirmation</strong>
                  <p className="text-sm text-gray-600">We&apos;ll call or text to confirm within a few hours.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">2</span>
                <div>
                  <strong className="text-gray-900">On-Site Visit</strong>
                  <p className="text-sm text-gray-600">We&apos;ll measure, discuss options, and answer questions.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">3</span>
                <div>
                  <strong className="text-gray-900">Your Quote</strong>
                  <p className="text-sm text-gray-600">Detailed quote within 24-48 hours – no pressure.</p>
                </div>
              </li>
            </ol>
          </div>

          <Link
            href="/"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 bg-white z-50 overflow-auto"
    >
      {/* Close button */}
      <Link
        href="/"
        className="fixed top-4 right-4 z-10 p-2 text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Close"
      >
        <X className="w-6 h-6" />
      </Link>

      {/* Progress indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-100 z-10">
        <div
          className="h-full bg-gray-900 transition-all duration-300"
          style={{ width: `${(step / totalSteps) * 100}%` }}
        />
      </div>

      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
        <div className="w-full max-w-lg">
          
          {/* Back button */}
          {step > 1 && (
            <button
              type="button"
              onClick={() => {
                if (step === 6) {
                  setStep(5);
                } else if (step === 5) {
                  setStep(4);
                  setSelectedDate(null);
                  setSelectedTime(null);
                } else {
                  setStep(step - 1);
                }
              }}
              className="mb-8 inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          )}

          {/* Step 1: Property Type */}
          {step === 1 && (
            <div className="animate-fadeIn">
              <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
                What type of property?
              </h1>
              <p className="text-gray-500 mb-8">Select one to continue</p>
              <div className="space-y-3">
                {propertyTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => updateFormAndAdvance("propertyType", type.id, 2)}
                    className={`w-full text-left p-5 border-2 rounded-xl transition-all hover:border-gray-900 ${
                      formData.propertyType === type.id
                        ? "border-gray-900 bg-gray-50"
                        : "border-gray-200"
                    }`}
                  >
                    <span className="block font-medium text-gray-900 text-lg">
                      {type.label}
                    </span>
                    <span className="block text-gray-500 text-sm mt-1">
                      {type.description}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Fence Type */}
          {step === 2 && (
            <div className="animate-fadeIn">
              <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
                What type of fence?
              </h1>
              <p className="text-gray-500 mb-8">Select the fence type you need</p>
              <div className="grid grid-cols-2 gap-3">
                {fenceTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => updateFormAndAdvance("fenceType", type.id, 3)}
                    className={`text-left p-4 border-2 rounded-xl transition-all hover:border-gray-900 ${
                      formData.fenceType === type.id
                        ? "border-gray-900 bg-gray-50"
                        : "border-gray-200"
                    }`}
                  >
                    <span className="block font-medium text-gray-900">
                      {type.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Fence Length */}
          {step === 3 && (
            <div className="animate-fadeIn">
              <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
                How much fencing?
              </h1>
              <p className="text-gray-500 mb-8">Estimate the total length</p>
              <div className="space-y-3">
                {fenceLengths.map((length) => (
                  <button
                    key={length.id}
                    type="button"
                    onClick={() => updateFormAndAdvance("fenceLength", length.id, 4)}
                    className={`w-full text-left p-5 border-2 rounded-xl transition-all hover:border-gray-900 ${
                      formData.fenceLength === length.id
                        ? "border-gray-900 bg-gray-50"
                        : "border-gray-200"
                    }`}
                  >
                    <span className="block font-medium text-gray-900 text-lg">
                      {length.label}
                    </span>
                    <span className="block text-gray-500 text-sm mt-1">
                      {length.description}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Timeline */}
          {step === 4 && (
            <div className="animate-fadeIn">
              <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
                When do you need it?
              </h1>
              <p className="text-gray-500 mb-8">Select your timeline</p>
              <div className="space-y-3">
                {timelines.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => updateFormAndAdvance("timeline", option.id, 5)}
                    className={`w-full text-left p-5 border-2 rounded-xl transition-all hover:border-gray-900 ${
                      formData.timeline === option.id
                        ? "border-gray-900 bg-gray-50"
                        : "border-gray-200"
                    }`}
                  >
                    <span className="block font-medium text-gray-900 text-lg">
                      {option.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Scheduling */}
          {step === 5 && (
            <div className="animate-fadeIn">
              <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
                Pick a date & time
              </h1>
              <p className="text-gray-500 mb-8">For your free on-site estimate</p>
              
              {/* Date Selection */}
              <div className="mb-6">
                <div className="grid grid-cols-4 gap-2">
                  {availableDates.slice(0, 8).map((date, index) => {
                    const isSelected = selectedDate?.toDateString() === date.toDateString();
                    return (
                      <button
                        key={index}
                        type="button"
                        onClick={() => {
                          setSelectedDate(date);
                          setSelectedTime(null);
                        }}
                        className={`p-3 rounded-xl border-2 text-center transition-all ${
                          isSelected
                            ? "border-gray-900 bg-gray-50"
                            : "border-gray-200 hover:border-gray-400"
                        }`}
                      >
                        <span className="block text-xs text-gray-500">
                          {date.toLocaleDateString("en-US", { weekday: "short" })}
                        </span>
                        <span className="block font-semibold text-gray-900">
                          {date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <div className="mb-8 animate-fadeIn">
                  <p className="text-sm text-gray-500 mb-3">Select a time window</p>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((slot) => {
                      const isSelected = selectedTime === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTime(slot)}
                          className={`p-4 rounded-xl border-2 text-center transition-all ${
                            isSelected
                              ? "border-gray-900 bg-gray-50"
                              : "border-gray-200 hover:border-gray-400"
                          }`}
                        >
                          <Clock className="w-4 h-4 mx-auto mb-1 text-gray-400" />
                          <span className="block text-sm font-medium text-gray-900">
                            {slot}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Selected summary */}
              {selectedDate && selectedTime && (
                <div className="mb-6 p-4 bg-gray-50 rounded-xl animate-fadeIn">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-900">
                        {formatSlotDate(selectedDate)}
                      </p>
                      <p className="text-sm text-gray-500">{selectedTime}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Confirm Button - Centered */}
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleConfirmAppointment}
                  disabled={!selectedDate || !selectedTime}
                  className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all ${
                    selectedDate && selectedTime
                      ? "bg-gray-900 text-white hover:bg-gray-800"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Confirm Appointment
                </button>
              </div>
            </div>
          )}

          {/* Step 6: Contact Info */}
          {step === 6 && (
            <div className="animate-fadeIn">
              <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
                Your contact info
              </h1>
              <p className="text-gray-500 mb-8">
                We&apos;ll use this to confirm your appointment
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-900 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="(229) 555-1234"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-900 transition-colors"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email {formData.scheduledDate ? "*" : ""}
                  </label>
                  <input
                    type="email"
                    required={!!formData.scheduledDate}
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-900 transition-colors"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Property Address
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                      placeholder="123 Main St"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-900 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                      placeholder="Valdosta"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-900 transition-colors"
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-red-600 text-sm bg-red-50 p-3 rounded-xl">
                    {error}
                  </p>
                )}

                {/* Submit Button - Centered */}
                <div className="flex justify-center pt-4">
                  <button
                    type="submit"
                    disabled={isLoading || !canSubmit()}
                    className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all ${
                      !isLoading && canSubmit()
                        ? "bg-gray-900 text-white hover:bg-gray-800"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {isLoading ? "Submitting..." : "Submit Request"}
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </div>

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
    </div>
  );
}
