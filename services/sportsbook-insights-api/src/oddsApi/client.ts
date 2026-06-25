import type { Sport } from "../../../../types/sportsbook-insights";
import { ODDS_API_BASE_URL } from "../config";
import type { OddsApiEvent } from "./types";

export class OddsApiError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
  ) {
    super(message);
    this.name = "OddsApiError";
  }
}

function logQuotaUsage(response: Response): void {
  const used = response.headers.get("x-requests-used");
  const remaining = response.headers.get("x-requests-remaining");
  const lastCost = response.headers.get("x-requests-last");

  if (used === null && remaining === null) {
    return;
  }

  console.log(
    `The Odds API quota — used: ${used}, remaining: ${remaining}, last call cost: ${lastCost}`,
  );
}

export async function fetchOddsForSport(sport: Sport, apiKey: string): Promise<OddsApiEvent[]> {
  const url = new URL(`${ODDS_API_BASE_URL}/sports/${sport}/odds`);
  url.searchParams.set("apiKey", apiKey);
  url.searchParams.set("regions", "us");
  url.searchParams.set("oddsFormat", "american");
  url.searchParams.set("markets", "h2h,spreads,totals");
  url.searchParams.set("dateFormat", "iso");

  let response: Response;
  try {
    response = await fetch(url.toString());
  } catch (error) {
    throw new OddsApiError(
      `Failed to reach The Odds API: ${error instanceof Error ? error.message : String(error)}`,
    );
  }

  logQuotaUsage(response);

  if (!response.ok) {
    throw new OddsApiError(
      `The Odds API request failed with status ${response.status}`,
      response.status,
    );
  }

  try {
    return (await response.json()) as OddsApiEvent[];
  } catch (error) {
    throw new OddsApiError(
      `Failed to parse The Odds API response: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}