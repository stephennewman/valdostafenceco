"use client";

import { useState, useMemo } from "react";
import { Calendar, Clock, CheckCircle, Zap, AlertCircle } from "lucide-react";
import {
  LeadScore,
  getAvailableSlots,
  formatSlotDate,
  getTimeSlots,
} from "../utils/leadScoring";

interface SchedulingWidgetProps {
  leadScore: LeadScore;
  onSchedule: (date: Date, timeSlot: string) => void;
  onSkip: () => void;
}

export default function SchedulingWidget({
  leadScore,
  onSchedule,
  onSkip,
}: SchedulingWidgetProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const availableDates = useMemo(
    () => getAvailableSlots(leadScore.availabilityWindow),
    [leadScore.availabilityWindow]
  );
  const timeSlots = getTimeSlots();

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      onSchedule(selectedDate, selectedTime);
    }
  };

  const getPriorityBadge = () => {
    switch (leadScore.priority) {
      case "high":
        return (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
            <Zap className="w-4 h-4" />
            Priority Scheduling
          </div>
        );
      case "medium":
        return (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
            <Calendar className="w-4 h-4" />
            Standard Scheduling
          </div>
        );
      case "low":
        return (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm font-medium">
            <Clock className="w-4 h-4" />
            Flexible Scheduling
          </div>
        );
    }
  };

  const getAvailabilityMessage = () => {
    switch (leadScore.availabilityWindow) {
      case "this_week":
        return "Great news! We have priority openings available this week.";
      case "next_week":
        return "We have availability starting next week.";
      case "two_weeks":
        return "Our next available appointments are in about 2 weeks.";
    }
  };

  return (
    <div className="space-y-6">
      {/* Priority Badge */}
      <div className="text-center">
        {getPriorityBadge()}
        <p className="text-[var(--foreground-muted)] mt-2 text-sm">
          {getAvailabilityMessage()}
        </p>
      </div>

      {/* Date Selection */}
      <div>
        <label className="block text-sm font-medium text-[var(--foreground)] mb-3">
          Select a Date for Your Free Estimate
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {availableDates.slice(0, 8).map((date, index) => {
            const isSelected =
              selectedDate?.toDateString() === date.toDateString();
            const isToday =
              date.toDateString() === new Date().toDateString();
            const isTomorrow =
              date.toDateString() ===
              new Date(Date.now() + 86400000).toDateString();

            return (
              <button
                key={index}
                type="button"
                onClick={() => {
                  setSelectedDate(date);
                  setSelectedTime(null);
                }}
                className={`p-3 rounded-lg border text-center transition-all ${
                  isSelected
                    ? "border-[var(--golden-amber)] bg-[var(--golden-amber)]/10 ring-2 ring-[var(--golden-amber)]"
                    : "border-[var(--border)] hover:border-[var(--golden-amber)]/50"
                }`}
              >
                <span className="block text-xs text-[var(--foreground-muted)]">
                  {isToday
                    ? "Today"
                    : isTomorrow
                    ? "Tomorrow"
                    : date.toLocaleDateString("en-US", { weekday: "short" })}
                </span>
                <span className="block font-semibold text-[var(--forest-green)]">
                  {date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Selection */}
      {selectedDate && (
        <div className="animate-fadeIn">
          <label className="block text-sm font-medium text-[var(--foreground)] mb-3">
            Select a Time Window
          </label>
          <div className="grid grid-cols-2 gap-2">
            {timeSlots.map((slot) => {
              const isSelected = selectedTime === slot;
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedTime(slot)}
                  className={`p-3 rounded-lg border text-center transition-all ${
                    isSelected
                      ? "border-[var(--golden-amber)] bg-[var(--golden-amber)]/10 ring-2 ring-[var(--golden-amber)]"
                      : "border-[var(--border)] hover:border-[var(--golden-amber)]/50"
                  }`}
                >
                  <Clock className="w-4 h-4 mx-auto mb-1 text-[var(--foreground-muted)]" />
                  <span className="block text-sm font-medium text-[var(--forest-green)]">
                    {slot}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Confirmation */}
      {selectedDate && selectedTime && (
        <div className="animate-fadeIn bg-[var(--forest-green)]/5 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-[var(--forest-green)] flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-[var(--forest-green)]">
                Your Selected Appointment
              </p>
              <p className="text-sm text-[var(--foreground-muted)]">
                {formatSlotDate(selectedDate)} • {selectedTime}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={handleConfirm}
          disabled={!selectedDate || !selectedTime}
          className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--golden-amber)] text-[var(--forest-green-dark)] rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--golden-amber-light)] transition-colors"
        >
          <Calendar className="w-5 h-5" />
          Confirm Appointment
        </button>
        <button
          type="button"
          onClick={onSkip}
          className="px-6 py-3 text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors text-sm"
        >
          Skip – Call me instead
        </button>
      </div>

      {/* Info Note */}
      <div className="flex items-start gap-2 text-xs text-[var(--foreground-muted)]">
        <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
        <p>
          We&apos;ll confirm your appointment via text/call within a few hours. 
          Times shown are 2-hour windows for our estimator to arrive.
        </p>
      </div>
    </div>
  );
}

