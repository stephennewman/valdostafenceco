import { createClient } from "@supabase/supabase-js";

// Supabase client for server-side operations
// Using v7-form-builder project with isolated vfc_ tables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for VFC tables
export interface VFCLead {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  city?: string;
  property_type: string;
  fence_type: string;
  fence_length: string;
  timeline: string;
  notes?: string;
  lead_score: number;
  lead_priority: "low" | "medium" | "high";
  estimated_value?: string;
  status?: "new" | "contacted" | "quoted" | "won" | "lost" | "cancelled";
  scheduled_date?: string;
  scheduled_time?: string;
  created_at?: string;
}

export interface VFCAppointment {
  id?: string;
  lead_id: string;
  scheduled_date: string;
  scheduled_time: string;
  status?: "scheduled" | "confirmed" | "completed" | "cancelled" | "no-show";
  notes?: string;
  outcome?: string;
  quote_amount?: number;
  created_at?: string;
}

// Helper to insert a lead
export async function insertLead(lead: VFCLead) {
  const { data, error } = await supabase
    .from("vfc_leads")
    .insert([lead])
    .select()
    .single();

  if (error) {
    console.error("Error inserting lead:", error);
    throw error;
  }

  return data;
}

// Helper to insert an appointment
export async function insertAppointment(appointment: VFCAppointment) {
  const { data, error } = await supabase
    .from("vfc_appointments")
    .insert([appointment])
    .select()
    .single();

  if (error) {
    console.error("Error inserting appointment:", error);
    throw error;
  }

  return data;
}


