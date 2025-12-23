import { Resend } from "resend";
import { NextResponse } from "next/server";
import {
  getScheduledConfirmationEmail,
  getRequestConfirmationEmail,
  getCustomerSubject,
} from "@/app/utils/emailTemplates";
import { insertLead, insertAppointment, VFCLead } from "@/app/utils/supabase";

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    const {
      propertyType,
      fenceTypes,
      fenceLength,
      timeline,
      name,
      phone,
      email,
      address,
      city,
      notes,
      scheduledDate,
      scheduledTime,
      leadScore,
      leadPriority,
    } = formData;

    // Validate required fields
    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and phone are required" },
        { status: 400 }
      );
    }

    // =====================================================
    // SAVE TO SUPABASE
    // =====================================================
    let leadId: string | undefined;
    
    try {
      // Map lead priority to estimated value
      const estimatedValueMap: Record<string, string> = {
        high: "$5k+",
        medium: "$1k-5k",
        low: "<$1k",
      };

      const leadData: VFCLead = {
        name,
        phone,
        email: email || undefined,
        address: address || undefined,
        city: city || undefined,
        property_type: propertyType,
        fence_type: Array.isArray(fenceTypes) ? fenceTypes.join(", ") : fenceTypes,
        fence_length: fenceLength,
        timeline,
        notes: notes || undefined,
        lead_score: leadScore || 0,
        lead_priority: leadPriority || "low",
        estimated_value: estimatedValueMap[leadPriority] || undefined,
        scheduled_date: scheduledDate || undefined,
        scheduled_time: scheduledTime || undefined,
      };

      const lead = await insertLead(leadData);
      leadId = lead?.id;

      // If there's a scheduled appointment, also create an appointment record
      if (scheduledDate && scheduledTime && leadId) {
        await insertAppointment({
          lead_id: leadId,
          scheduled_date: scheduledDate,
          scheduled_time: scheduledTime,
        });
      }
    } catch (dbError) {
      console.error("Database error (continuing with email):", dbError);
      // Continue with email even if DB fails
    }

    // =====================================================
    // SLACK NOTIFICATION
    // =====================================================
    if (process.env.SLACK_WEBHOOK_URL) {
      try {
        const fenceTypesList = Array.isArray(fenceTypes)
          ? fenceTypes.join(", ")
          : fenceTypes || "Not specified";
        
        const priorityEmoji = leadPriority === "high" ? "🔥" : leadPriority === "medium" ? "⚡" : "📋";
        const appointmentText = scheduledDate && scheduledTime 
          ? `\n📅 *Appointment:* ${scheduledDate} at ${scheduledTime}` 
          : "";
        
        await fetch(process.env.SLACK_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: `${priorityEmoji} New Estimate Request from ${name}`,
            blocks: [
              {
                type: "header",
                text: {
                  type: "plain_text",
                  text: `${priorityEmoji} New Free Estimate Request!`,
                  emoji: true,
                },
              },
              {
                type: "section",
                text: {
                  type: "mrkdwn",
                  text: `*${name}* in ${city || "Valdosta"}\n📞 ${phone}${email ? `\n✉️ ${email}` : ""}${appointmentText}`,
                },
              },
              {
                type: "section",
                fields: [
                  {
                    type: "mrkdwn",
                    text: `*Fence Type:*\n${fenceTypesList}`,
                  },
                  {
                    type: "mrkdwn",
                    text: `*Timeline:*\n${timeline || "Not specified"}`,
                  },
                  {
                    type: "mrkdwn",
                    text: `*Length:*\n${fenceLength || "Not specified"}`,
                  },
                  {
                    type: "mrkdwn",
                    text: `*Score:*\n${leadScore || 0}/100 (${leadPriority || "low"})`,
                  },
                ],
              },
              ...(notes ? [{
                type: "section",
                text: {
                  type: "mrkdwn",
                  text: `*Notes:* ${notes}`,
                },
              }] : []),
            ],
          }),
        });
      } catch (slackError) {
        console.error("Slack notification failed:", slackError);
      }
    }

    // =====================================================
    // SEND EMAILS
    // =====================================================
    
    // Check for API key
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY not configured");
      return NextResponse.json(
        { success: true, leadId, message: "Lead saved (email not configured)" }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const fenceTypesList = Array.isArray(fenceTypes)
      ? fenceTypes.join(", ")
      : fenceTypes || "Not specified";

    // Format fence type for display
    const fenceTypeLabels: Record<string, string> = {
      wood: "Wood Fence",
      vinyl: "Vinyl Fence",
      "chain-link": "Chain Link Fence",
      aluminum: "Aluminum Fence",
      privacy: "Privacy Fence",
      pool: "Pool Fence",
      farm: "Farm/Ranch Fencing",
      repair: "Fence Repair",
      gate: "Gate Installation",
      unsure: "Fencing",
    };
    const fenceTypeDisplay = fenceTypeLabels[fenceTypes] || fenceTypesList;

    // Format fence length for display
    const fenceLengthLabels: Record<string, string> = {
      small: "Under 100 ft (Small)",
      medium: "100-250 ft (Average)",
      large: "250-500 ft (Large)",
      xlarge: "500+ ft (Acreage/Commercial)",
      unsure: "Not sure (measure on-site)",
    };
    const fenceLengthDisplay = fenceLengthLabels[fenceLength] || fenceLength || "Not specified";

    // Priority badge for email
    const priorityBadges: Record<string, string> = {
      high: "🔥 HIGH PRIORITY",
      medium: "⚡ MEDIUM PRIORITY",
      low: "📋 STANDARD",
    };
    const priorityBadge = priorityBadges[leadPriority] || "";

    // Format scheduled date if present
    let scheduledInfo = "";
    const hasAppointment = scheduledDate && scheduledTime;
    
    if (hasAppointment) {
      const date = new Date(scheduledDate);
      const formattedDate = date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      });
      scheduledInfo = `
        <div style="background-color: #f0fdf4; border: 2px solid #22c55e; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
          <h3 style="color: #166534; margin: 0 0 8px 0;">📅 SCHEDULED APPOINTMENT</h3>
          <p style="margin: 0; font-size: 18px;"><strong>${formattedDate}</strong></p>
          <p style="margin: 4px 0 0 0; font-size: 16px;">${scheduledTime}</p>
        </div>
      `;
    }

    // Lead score section
    const leadScoreSection = leadScore ? `
      <div style="background-color: ${leadPriority === 'high' ? '#fef3c7' : leadPriority === 'medium' ? '#e0f2fe' : '#f3f4f6'}; border-radius: 8px; padding: 12px; margin-bottom: 20px;">
        <p style="margin: 0; font-weight: bold;">${priorityBadge}</p>
        <p style="margin: 4px 0 0 0; font-size: 14px; color: #666;">Lead Score: ${leadScore}/100</p>
      </div>
    ` : "";

    // Subject line based on priority
    const subjectEmoji = leadPriority === "high" ? "🔥🔥🔥" : leadPriority === "medium" ? "⚡" : "📋";
    const appointmentTag = hasAppointment ? " [SCHEDULED]" : "";

    // =====================================================
    // INTERNAL EMAIL DISABLED - Using Slack only for business notifications
    // =====================================================

    // =====================================================
    // EMAIL 2: Customer confirmation (if email provided)
    // =====================================================
    let customerEmailSent = false;
    
    if (email) {
      const customerSubject = getCustomerSubject(hasAppointment, name);
      const customerHtml = hasAppointment
        ? getScheduledConfirmationEmail({
            name,
            scheduledDate,
            scheduledTime,
            address,
            city,
            fenceType: fenceTypeDisplay,
          })
        : getRequestConfirmationEmail({
            name,
            fenceType: fenceTypeDisplay,
          });

      const { error: customerError } = await resend.emails.send({
        from: "Valdosta Fence Co. <stephen@valdostafenceco.com>",
        to: [email],
        subject: customerSubject,
        html: customerHtml,
      });

      if (customerError) {
        console.error("Customer email error:", customerError);
        // Continue - don't fail the whole request if customer email fails
      } else {
        customerEmailSent = true;
      }
    }

    return NextResponse.json({ 
      success: true, 
      leadId,
      customerEmailSent,
    });
  } catch (error) {
    console.error("Estimate form error:", error);
    return NextResponse.json(
      { error: "Failed to send estimate request" },
      { status: 500 }
    );
  }
}
