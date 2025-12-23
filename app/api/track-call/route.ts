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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const slackBlocks: any[] = [
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
          });
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

    // EMAIL NOTIFICATION DISABLED - Using Slack only

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Track call error:", error);
    // Return success anyway - don't want tracking failures to affect UX
    return NextResponse.json({ success: true });
  }
}

