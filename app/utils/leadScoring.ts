export type LeadPriority = 'low' | 'medium' | 'high';

export interface LeadScore {
  score: number;
  priority: LeadPriority;
  availabilityWindow: 'this_week' | 'next_week' | 'two_weeks';
  estimatedValue: string;
}

interface FormData {
  propertyType: string;
  fenceType: string;
  fenceLength: string;
  timeline: string;
}

// Property type scores (0-20 pts)
const propertyScores: Record<string, number> = {
  commercial: 20,
  farm: 18,
  residential: 10,
};

// Fence type scores (0-30 pts)
const fenceScores: Record<string, number> = {
  farm: 30,        // Farm/ranch = big acreage
  vinyl: 25,       // Premium material
  aluminum: 25,    // Premium material
  privacy: 20,     // Usually bigger jobs
  wood: 18,        // Standard jobs
  pool: 15,        // Required, often add-on
  'chain-link': 12, // Budget option
  gate: 8,         // Usually small
  repair: 5,       // Usually small
  unsure: 15,      // Could be anything
};

// Fence length scores (0-35 pts) - THE BIG ONE
const lengthScores: Record<string, number> = {
  xlarge: 35,   // 500+ ft = definitely $5k+
  large: 25,    // 250-500 ft
  medium: 15,   // 100-250 ft
  small: 5,     // Under 100 ft
  unsure: 15,   // Neutral
};

// Timeline scores (0-15 pts) - Urgency = Priority
const timelineScores: Record<string, number> = {
  asap: 15,
  month: 10,
  '3months': 5,
  planning: 2,
};

export function calculateLeadScore(formData: FormData): LeadScore {
  let score = 0;

  // Calculate score from each category
  score += propertyScores[formData.propertyType] || 10;
  score += fenceScores[formData.fenceType] || 15;
  score += lengthScores[formData.fenceLength] || 15;
  score += timelineScores[formData.timeline] || 5;

  // Determine priority and availability window
  let priority: LeadPriority;
  let availabilityWindow: 'this_week' | 'next_week' | 'two_weeks';
  let estimatedValue: string;

  if (score >= 70) {
    priority = 'high';
    availabilityWindow = 'this_week';
    estimatedValue = '$5,000+';
  } else if (score >= 45) {
    priority = 'medium';
    availabilityWindow = 'next_week';
    estimatedValue = '$1,000 - $5,000';
  } else {
    priority = 'low';
    availabilityWindow = 'two_weeks';
    estimatedValue = 'Under $1,000';
  }

  return { score, priority, availabilityWindow, estimatedValue };
}

// Generate available time slots based on priority
export function getAvailableSlots(availabilityWindow: 'this_week' | 'next_week' | 'two_weeks'): Date[] {
  const slots: Date[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let startDay: number;
  let endDay: number;

  switch (availabilityWindow) {
    case 'this_week':
      startDay = 1;  // Tomorrow
      endDay = 5;    // Within 5 days
      break;
    case 'next_week':
      startDay = 5;  // 5 days out
      endDay = 12;   // Within ~2 weeks
      break;
    case 'two_weeks':
      startDay = 14; // 2 weeks out
      endDay = 28;   // Within a month
      break;
  }

  for (let i = startDay; i <= endDay; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    // Skip Sundays (day 0)
    if (date.getDay() !== 0) {
      slots.push(date);
    }
  }

  return slots;
}

// Format date for display
export function formatSlotDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

// Get time slots for a given day
export function getTimeSlots(): string[] {
  return [
    '8:00 AM - 10:00 AM',
    '10:00 AM - 12:00 PM',
    '1:00 PM - 3:00 PM',
    '3:00 PM - 5:00 PM',
  ];
}

