import { NextResponse } from "next/server";
import { getAnalyticsData, formatSlackMessage, sendToSlack } from "@/app/utils/googleAnalytics";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Test endpoint - can be called manually to verify setup
export async function GET() {
  try {
    // Get yesterday's data as a test
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const startDate = yesterday.toISOString().split("T")[0];
    const endDate = startDate;

    const periodLabel = `Test Report - ${yesterday.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    })}`;

    const data = await getAnalyticsData(startDate, endDate, periodLabel);
    const message = formatSlackMessage(data, "daily");
    
    // Only send to Slack if webhook is configured
    let sent = false;
    if (process.env.SLACK_ANALYTICS_WEBHOOK) {
      sent = await sendToSlack(message);
    }

    return NextResponse.json({
      success: true,
      slackSent: sent,
      period: periodLabel,
      data,
      message: sent ? "Report sent to Slack!" : "Data retrieved (Slack webhook not configured)",
    });
  } catch (error) {
    console.error("Test analytics error:", error);
    return NextResponse.json(
      { 
        error: "Failed to generate test report",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

