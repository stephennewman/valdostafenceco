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

// US Federal Holidays for 2024-2026 (add more years as needed)
// Format: "YYYY-MM-DD"
const HOLIDAYS: string[] = [
  // 2024
  "2024-01-01", // New Year's Day
  "2024-01-15", // MLK Day
  "2024-02-19", // Presidents Day
  "2024-05-27", // Memorial Day
  "2024-07-04", // Independence Day
  "2024-09-02", // Labor Day
  "2024-11-28", // Thanksgiving
  "2024-11-29", // Day after Thanksgiving
  "2024-12-24", // Christmas Eve
  "2024-12-25", // Christmas
  "2024-12-31", // New Year's Eve
  // 2025
  "2025-01-01", // New Year's Day
  "2025-01-20", // MLK Day
  "2025-02-17", // Presidents Day
  "2025-05-26", // Memorial Day
  "2025-07-04", // Independence Day
  "2025-09-01", // Labor Day
  "2025-11-27", // Thanksgiving
  "2025-11-28", // Day after Thanksgiving
  "2025-12-24", // Christmas Eve
  "2025-12-25", // Christmas
  "2025-12-31", // New Year's Eve
  // 2026
  "2026-01-01", // New Year's Day
  "2026-01-19", // MLK Day
  "2026-02-16", // Presidents Day
  "2026-05-25", // Memorial Day
  "2026-07-03", // Independence Day (observed)
  "2026-09-07", // Labor Day
  "2026-11-26", // Thanksgiving
  "2026-11-27", // Day after Thanksgiving
  "2026-12-24", // Christmas Eve
  "2026-12-25", // Christmas
  "2026-12-31", // New Year's Eve
];

function isHoliday(date: Date): boolean {
  const dateStr = date.toISOString().split('T')[0];
  return HOLIDAYS.includes(dateStr);
}

function isWeekday(date: Date): boolean {
  const day = date.getDay();
  return day >= 1 && day <= 5; // Monday (1) through Friday (5)
}

// Generate available time slots based on priority
export function getAvailableSlots(availabilityWindow: 'this_week' | 'next_week' | 'two_weeks'): Date[] {
  const slots: Date[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let startDay: number;
  let maxSlots: number;

  switch (availabilityWindow) {
    case 'this_week':
      startDay = 1;  // Tomorrow
      maxSlots = 5;  // Show 5 available weekdays
      break;
    case 'next_week':
      startDay = 5;  // 5 days out
      maxSlots = 8;  // Show 8 available weekdays
      break;
    case 'two_weeks':
      startDay = 14; // 2 weeks out
      maxSlots = 10; // Show 10 available weekdays
      break;
  }

  let daysChecked = 0;
  let i = startDay;
  
  // Keep adding days until we have enough slots (max 60 days lookahead)
  while (slots.length < maxSlots && daysChecked < 60) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    // Only add weekdays (Mon-Fri) that aren't holidays
    if (isWeekday(date) && !isHoliday(date)) {
      slots.push(date);
    }
    
    i++;
    daysChecked++;
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


