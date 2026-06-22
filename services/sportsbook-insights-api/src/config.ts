import type { Sport } from "../../../types/sportsbook-insights";

export const ODDS_API_BASE_URL = "https://api.the-odds-api.com/v4";

const SUPPORTED_SPORTS: readonly Sport[] = ["americanfootball_nfl", "basketball_nba", "baseball_mlb"];

export const DEFAULT_SPORT: Sport = "americanfootball_nfl";

export function isSupportedSport(value: string): value is Sport {
  return (SUPPORTED_SPORTS as readonly string[]).includes(value);
}

export function getApiKey(): string {
  const apiKey = process.env.ODDS_API_KEY;
  if (!apiKey) {
    throw new Error("ODDS_API_KEY environment variable is not set");
  }
  return apiKey;
}
