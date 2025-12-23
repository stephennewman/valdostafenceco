import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const {
      location,
      phoneNumber,
      timestamp,
      currentPage,
      originalReferrer,
      userAgent,
      deviceType,
      screenSize,
      viewport,
      language,
      sessionDurationSeconds,
      // UTM parameters
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
      gclid,
      fbclid,
    } = data;

    const clickTime = new Date(timestamp || Date.now()).toLocaleString("en-US", {
      timeZone: "America/New_York",
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    // Format session duration
    const formatDuration = (seconds: number) => {
      if (!seconds || seconds < 1) return "< 1 sec";
      if (seconds < 60) return `${seconds} sec`;
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return secs > 0 ? `${mins}m ${secs}s` : `${mins} min`;
    };

    // Determine traffic source
    const getTrafficSource = () => {
      if (gclid) return "🎯 Google Ads";
      if (fbclid) return "📘 Facebook Ads";
      if (utm_source) return `📊 ${utm_source}${utm_medium ? ` / ${utm_medium}` : ""}`;
      if (originalReferrer) {
        if (originalReferrer.includes("google")) return "🔍 Google (organic)";
        if (originalReferrer.includes("facebook")) return "📘 Facebook";
        if (originalReferrer.includes("bing")) return "🔍 Bing";
        return `🔗 ${new URL(originalReferrer).hostname}`;
      }
      return "🏠 Direct";
    };

    const trafficSource = getTrafficSource();
    const deviceEmoji = deviceType === "mobile" ? "📱" : deviceType === "tablet" ? "📱" : "💻";

    // Build UTM info if present
    const hasUtm = utm_source || utm_campaign;
    const utmInfo = hasUtm
      ? `Campaign: ${utm_campaign || "—"}\nTerm: ${utm_term || "—"}\nContent: ${utm_content || "—"}`
      : null;

    // =====================================================
    // SLACK NOTIFICATION (if webhook configured)
    // =====================================================
    if (process.env.SLACK_WEBHOOK_URL) {
      try {
        const slackBlocks = [
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
                text: `*CTA Location:*\n${location || "Unknown"}`,
              },
              {
                type: "mrkdwn",
                text: `*Time:*\n${clickTime}`,
              },
              {
                type: "mrkdwn",
                text: `*Traffic Source:*\n${trafficSource}`,
              },
              {
                type: "mrkdwn",
                text: `*Device:*\n${deviceEmoji} ${deviceType || "unknown"}`,
              },
            ],
          },
          {
            type: "section",
            fields: [
              {
                type: "mrkdwn",
                text: `*Page:*\n${currentPage ? currentPage.replace("https://valdostafenceco.com", "") || "/" : "Unknown"}`,
              },
              {
                type: "mrkdwn",
                text: `*Time on Site:*\n${formatDuration(sessionDurationSeconds)}`,
              },
            ],
          },
        ];

        // Add UTM details if present (for paid traffic analysis)
        if (hasUtm) {
          slackBlocks.push({
            type: "context",
            elements: [
              {
                type: "mrkdwn",
                text: `📊 *Campaign:* ${utm_campaign || "—"} | *Term:* ${utm_term || "—"} | *Content:* ${utm_content || "—"}`,
              },
            ],
          } as typeof slackBlocks[number]);
        }

        await fetch(process.env.SLACK_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: `📞 Phone CTA Clicked - ${location} (${deviceType})`,
            blocks: slackBlocks,
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
          subject: `📞 Phone CTA Clicked - ${location} (${deviceType})`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px;">
              <h2 style="color: #333; margin-bottom: 20px;">📞 Someone clicked to call!</h2>
              
              <div style="background-color: #f0f9ff; border: 1px solid #0ea5e9; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
                <p style="margin: 0 0 8px 0;"><strong>CTA Location:</strong> ${location || "Unknown"}</p>
                <p style="margin: 0 0 8px 0;"><strong>Time:</strong> ${clickTime}</p>
                <p style="margin: 0 0 8px 0;"><strong>Phone:</strong> ${phoneNumber || "(229) 563-6488"}</p>
                <p style="margin: 0;"><strong>Page:</strong> ${currentPage || "Unknown"}</p>
              </div>

              <div style="background-color: #f8fafc; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
                <h3 style="margin: 0 0 12px 0; font-size: 14px; color: #666;">Traffic & Device Info</h3>
                <p style="margin: 0 0 6px 0;"><strong>Traffic Source:</strong> ${trafficSource}</p>
                <p style="margin: 0 0 6px 0;"><strong>Device:</strong> ${deviceEmoji} ${deviceType || "Unknown"} (${screenSize || "—"})</p>
                <p style="margin: 0 0 6px 0;"><strong>Viewport:</strong> ${viewport || "Unknown"}</p>
                <p style="margin: 0 0 6px 0;"><strong>Language:</strong> ${language || "Unknown"}</p>
                <p style="margin: 0;"><strong>Time on Site:</strong> ${formatDuration(sessionDurationSeconds)}</p>
              </div>

              ${hasUtm ? `
              <div style="background-color: #fef3c7; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
                <h3 style="margin: 0 0 12px 0; font-size: 14px; color: #92400e;">📊 Campaign Attribution</h3>
                <p style="margin: 0 0 6px 0;"><strong>Source:</strong> ${utm_source || "—"}</p>
                <p style="margin: 0 0 6px 0;"><strong>Medium:</strong> ${utm_medium || "—"}</p>
                <p style="margin: 0 0 6px 0;"><strong>Campaign:</strong> ${utm_campaign || "—"}</p>
                <p style="margin: 0 0 6px 0;"><strong>Term:</strong> ${utm_term || "—"}</p>
                <p style="margin: 0;"><strong>Content:</strong> ${utm_content || "—"}</p>
                ${gclid ? `<p style="margin: 6px 0 0 0;"><strong>Google Click ID:</strong> ${gclid}</p>` : ""}
                ${fbclid ? `<p style="margin: 6px 0 0 0;"><strong>Facebook Click ID:</strong> ${fbclid}</p>` : ""}
              </div>
              ` : ""}

              ${originalReferrer && originalReferrer !== "direct" ? `
              <p style="color: #666; font-size: 12px;"><strong>Original Referrer:</strong> ${originalReferrer}</p>
              ` : ""}
              
              <p style="color: #999; font-size: 11px; margin-top: 20px;">
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

