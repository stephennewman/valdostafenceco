import { BetaAnalyticsDataClient } from "@google-analytics/data";

// Initialize the client with service account credentials
function getAnalyticsClient() {
  const credentials = {
    client_email: process.env.GA_CLIENT_EMAIL,
    private_key: process.env.GA_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  };

  return new BetaAnalyticsDataClient({ credentials });
}

const PROPERTY_ID = process.env.GA_PROPERTY_ID || "517117328";

export interface AnalyticsData {
  period: string;
  totalUsers: number;
  newUsers: number;
  sessions: number;
  pageViews: number;
  avgSessionDuration: string;
  bounceRate: string;
  topPages: { page: string; views: number }[];
  topSources: { source: string; users: number }[];
  topCities: { city: string; users: number }[];
}

export async function getAnalyticsData(
  startDate: string,
  endDate: string,
  periodLabel: string
): Promise<AnalyticsData> {
  const client = getAnalyticsClient();

  // Main metrics request
  const [metricsResponse] = await client.runReport({
    property: `properties/${PROPERTY_ID}`,
    dateRanges: [{ startDate, endDate }],
    metrics: [
      { name: "totalUsers" },
      { name: "newUsers" },
      { name: "sessions" },
      { name: "screenPageViews" },
      { name: "averageSessionDuration" },
      { name: "bounceRate" },
    ],
  });

  // Top pages request
  const [pagesResponse] = await client.runReport({
    property: `properties/${PROPERTY_ID}`,
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: "pagePath" }],
    metrics: [{ name: "screenPageViews" }],
    orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
    limit: 5,
  });

  // Top sources request
  const [sourcesResponse] = await client.runReport({
    property: `properties/${PROPERTY_ID}`,
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: "sessionSource" }],
    metrics: [{ name: "totalUsers" }],
    orderBys: [{ metric: { metricName: "totalUsers" }, desc: true }],
    limit: 5,
  });

  // Top cities request
  const [citiesResponse] = await client.runReport({
    property: `properties/${PROPERTY_ID}`,
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: "city" }],
    metrics: [{ name: "totalUsers" }],
    orderBys: [{ metric: { metricName: "totalUsers" }, desc: true }],
    limit: 5,
  });

  // Parse main metrics
  const metrics = metricsResponse.rows?.[0]?.metricValues || [];
  const totalUsers = parseInt(metrics[0]?.value || "0");
  const newUsers = parseInt(metrics[1]?.value || "0");
  const sessions = parseInt(metrics[2]?.value || "0");
  const pageViews = parseInt(metrics[3]?.value || "0");
  const avgDurationSeconds = parseFloat(metrics[4]?.value || "0");
  const bounceRateValue = parseFloat(metrics[5]?.value || "0");

  // Format duration
  const minutes = Math.floor(avgDurationSeconds / 60);
  const seconds = Math.round(avgDurationSeconds % 60);
  const avgSessionDuration = `${minutes}m ${seconds}s`;

  // Format bounce rate
  const bounceRate = `${(bounceRateValue * 100).toFixed(1)}%`;

  // Parse top pages
  const topPages =
    pagesResponse.rows?.map((row) => ({
      page: row.dimensionValues?.[0]?.value || "Unknown",
      views: parseInt(row.metricValues?.[0]?.value || "0"),
    })) || [];

  // Parse top sources
  const topSources =
    sourcesResponse.rows?.map((row) => ({
      source: row.dimensionValues?.[0]?.value || "Direct",
      users: parseInt(row.metricValues?.[0]?.value || "0"),
    })) || [];

  // Parse top cities
  const topCities =
    citiesResponse.rows
      ?.filter((row) => row.dimensionValues?.[0]?.value !== "(not set)")
      .map((row) => ({
        city: row.dimensionValues?.[0]?.value || "Unknown",
        users: parseInt(row.metricValues?.[0]?.value || "0"),
      })) || [];

  return {
    period: periodLabel,
    totalUsers,
    newUsers,
    sessions,
    pageViews,
    avgSessionDuration,
    bounceRate,
    topPages,
    topSources,
    topCities,
  };
}

export function formatSlackMessage(data: AnalyticsData, type: "daily" | "weekly" | "monthly"): object {
  const emoji = type === "daily" ? "📊" : type === "weekly" ? "📈" : "🎯";
  const title = type === "daily" ? "Daily" : type === "weekly" ? "Weekly" : "Monthly";

  const topPagesText = data.topPages
    .map((p, i) => `${i + 1}. \`${p.page}\` - ${p.views} views`)
    .join("\n");

  const topSourcesText = data.topSources
    .map((s) => `• ${s.source}: ${s.users} users`)
    .join("\n");

  const topCitiesText = data.topCities
    .slice(0, 3)
    .map((c) => `• ${c.city}: ${c.users}`)
    .join("\n");

  return {
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: `${emoji} Valdosta Fence Co. - ${title} Report`,
          emoji: true,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*Period:* ${data.period}`,
        },
      },
      {
        type: "divider",
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `*👥 Total Visitors*\n${data.totalUsers.toLocaleString()}`,
          },
          {
            type: "mrkdwn",
            text: `*🆕 New Visitors*\n${data.newUsers.toLocaleString()}`,
          },
          {
            type: "mrkdwn",
            text: `*📄 Page Views*\n${data.pageViews.toLocaleString()}`,
          },
          {
            type: "mrkdwn",
            text: `*🔄 Sessions*\n${data.sessions.toLocaleString()}`,
          },
          {
            type: "mrkdwn",
            text: `*⏱️ Avg. Duration*\n${data.avgSessionDuration}`,
          },
          {
            type: "mrkdwn",
            text: `*↩️ Bounce Rate*\n${data.bounceRate}`,
          },
        ],
      },
      {
        type: "divider",
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*🔥 Top Pages*\n${topPagesText || "No data"}`,
        },
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `*🌐 Traffic Sources*\n${topSourcesText || "No data"}`,
          },
          {
            type: "mrkdwn",
            text: `*📍 Top Cities*\n${topCitiesText || "No data"}`,
          },
        ],
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: "Data from Google Analytics • valdostafenceco.com",
          },
        ],
      },
    ],
  };
}

export async function sendToSlack(message: object): Promise<boolean> {
  const webhookUrl = process.env.SLACK_ANALYTICS_WEBHOOK;
  
  if (!webhookUrl) {
    console.error("SLACK_ANALYTICS_WEBHOOK not configured");
    return false;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });

    return response.ok;
  } catch (error) {
    console.error("Failed to send Slack message:", error);
    return false;
  }
}

