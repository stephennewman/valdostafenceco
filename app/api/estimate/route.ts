import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    const {
      propertyType,
      fenceTypes,
      timeline,
      name,
      phone,
      email,
      address,
      city,
      notes,
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

    const { data, error } = await resend.emails.send({
      from: "Valdosta Fence Co. <leads@valdostafenceco.com>",
      to: [process.env.LEADS_EMAIL || "info@valdostafenceco.com"],
      replyTo: email || undefined,
      subject: `🔥 New Estimate Request: ${name} - ${city || "Valdosta"}`,
      html: `
        <h2>New Free Estimate Request</h2>
        
        <h3>Contact Information</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email || "Not provided"}</p>
        <p><strong>Address:</strong> ${address || "Not provided"}</p>
        <p><strong>City:</strong> ${city || "Not provided"}</p>
        
        <hr />
        
        <h3>Project Details</h3>
        <p><strong>Property Type:</strong> ${propertyType || "Not specified"}</p>
        <p><strong>Fence Type(s):</strong> ${fenceTypesList}</p>
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

