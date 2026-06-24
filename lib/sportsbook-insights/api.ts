import { API_BASE_URL } from "./config";
import type { Sport, SportsbookInsightsResponse } from "../../types/sportsbook-insights";

export async function fetchInsights(sport: Sport): Promise<SportsbookInsightsResponse> {
  if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_SPORTSBOOK_INSIGHTS_API_URL is not configured");
  }

  const res = await fetch(`${API_BASE_URL}/insights?sport=${sport}`);

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.message ?? `Sportsbook Insights API request failed with status ${res.status}`);
  }

  return res.json();
}