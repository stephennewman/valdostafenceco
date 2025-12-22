import { Resend } from "resend";
import { NextResponse } from "next/server";

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

    // Check for API key
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY not configured");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const fenceTypesList = Array.isArray(fenceTypes)
      ? fenceTypes.join(", ")
      : fenceTypes || "Not specified";

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
    if (scheduledDate && scheduledTime) {
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
    const hasAppointment = scheduledDate ? " [SCHEDULED]" : "";

    const { data, error } = await resend.emails.send({
      from: "Valdosta Fence Co. <onboarding@resend.dev>",
      to: [process.env.LEADS_EMAIL || "info@valdostafenceco.com"],
      replyTo: email || undefined,
      subject: `${subjectEmoji} ${priorityBadge}${hasAppointment} - ${name} in ${city || "Valdosta"}`,
      html: `
        <h2>New Free Estimate Request</h2>
        
        ${leadScoreSection}
        ${scheduledInfo}
        
        <h3>Contact Information</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
        <p><strong>Email:</strong> ${email || "Not provided"}</p>
        <p><strong>Address:</strong> ${address || "Not provided"}</p>
        <p><strong>City:</strong> ${city || "Not provided"}</p>
        
        <hr />
        
        <h3>Project Details</h3>
        <p><strong>Property Type:</strong> ${propertyType || "Not specified"}</p>
        <p><strong>Fence Type(s):</strong> ${fenceTypesList}</p>
        <p><strong>Fence Length:</strong> ${fenceLengthDisplay}</p>
        <p><strong>Timeline:</strong> ${timeline || "Not specified"}</p>
        
        <hr />
        
        <h3>Additional Notes</h3>
        <p>${notes || "None provided"}</p>
        
        <hr />
        <p style="color: #666; font-size: 12px;">
          This lead came from the Free Estimate form on valdostafenceco.com
        </p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error) {
    console.error("Estimate form error:", error);
    return NextResponse.json(
      { error: "Failed to send estimate request" },
      { status: 500 }
    );
  }
}
