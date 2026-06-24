import type { Sport } from "../../types/sportsbook-insights";

export const API_BASE_URL = process.env.NEXT_PUBLIC_SPORTSBOOK_INSIGHTS_API_URL;

export const DEFAULT_SPORT: Sport = "baseball_mlb";

export const SPORT_OPTIONS: { value: Sport; label: string }[] = [
  { value: "americanfootball_nfl", label: "NFL" },
  { value: "basketball_nba", label: "NBA" },
  { value: "baseball_mlb", label: "MLB" },
];
