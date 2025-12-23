import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { location, phoneNumber, timestamp, userAgent, referrer } = await request.json();

    const clickTime = new Date(timestamp || Date.now()).toLocaleString("en-US", {
      timeZone: "America/New_York",
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    // =====================================================
    // SLACK NOTIFICATION (if webhook configured)
    // =====================================================
    if (process.env.SLACK_WEBHOOK_URL) {
      try {
        await fetch(process.env.SLACK_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: `📞 Phone Call CTA Clicked!`,
            blocks: [
              {
                type: "header",
                text: {
                  type: "plain_text",
                  text: "📞 Phone Call CTA Clicked!",
                  emoji: true,
                },
              },
              {
                type: "section",
                fields: [
                  {
                    type: "mrkdwn",
                    text: `*Location:*\n${location || "Unknown"}`,
                  },
                  {
                    type: "mrkdwn",
                    text: `*Time:*\n${clickTime}`,
                  },
                  {
                    type: "mrkdwn",
                    text: `*Phone:*\n${phoneNumber || "(229) 563-6488"}`,
                  },
                  {
                    type: "mrkdwn",
                    text: `*Source:*\n${referrer || "Direct"}`,
                  },
                ],
              },
            ],
          }),
        });
      } catch (slackError) {
        console.error("Slack notification failed:", slackError);
      }
    }

    // =====================================================
    // EMAIL NOTIFICATION (if Resend configured)
    // =====================================================
    if (process.env.RESEND_API_KEY && process.env.PHONE_CLICK_NOTIFICATIONS !== "false") {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        
        await resend.emails.send({
          from: "Valdosta Fence Co. <stephen@valdostafenceco.com>",
          to: [process.env.LEADS_EMAIL || "info@valdostafenceco.com"],
          subject: `📞 Phone CTA Clicked - ${location}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 500px;">
              <h2 style="color: #333; margin-bottom: 20px;">📞 Someone clicked to call!</h2>
              
              <div style="background-color: #f0f9ff; border: 1px solid #0ea5e9; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
                <p style="margin: 0 0 8px 0;"><strong>Location:</strong> ${location || "Unknown"}</p>
                <p style="margin: 0 0 8px 0;"><strong>Time:</strong> ${clickTime}</p>
                <p style="margin: 0 0 8px 0;"><strong>Phone:</strong> ${phoneNumber || "(229) 563-6488"}</p>
                <p style="margin: 0;"><strong>Page:</strong> ${referrer || "Direct"}</p>
              </div>
              
              <p style="color: #666; font-size: 12px; margin-top: 20px;">
                This notification was triggered by a phone CTA click on valdostafenceco.com
              </p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error("Email notification failed:", emailError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Track call error:", error);
    // Return success anyway - don't want tracking failures to affect UX
    return NextResponse.json({ success: true });
  }
}

