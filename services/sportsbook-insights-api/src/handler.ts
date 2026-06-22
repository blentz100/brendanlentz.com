import type { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import type { GameInsight, SportsbookInsightsResponse } from "../../../types/sportsbook-insights";
import { calculateConsensus } from "./consensus";
import { DEFAULT_SPORT, getApiKey, isSupportedSport } from "./config";
import { normalizeEvent } from "./normalize";
import { fetchOddsForSport, OddsApiError } from "./oddsApi/client";

function jsonResponse(statusCode: number, body: unknown): APIGatewayProxyResult {
  return {
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
}

function errorResponse(statusCode: number, message: string): APIGatewayProxyResult {
  return jsonResponse(statusCode, { message });
}

export const handler: APIGatewayProxyHandler = async (event) => {
  const requestedSport = event.queryStringParameters?.sport ?? DEFAULT_SPORT;
  if (!isSupportedSport(requestedSport)) {
    return errorResponse(400, `Unsupported sport: ${requestedSport}`);
  }

  let apiKey: string;
  try {
    apiKey = getApiKey();
  } catch (error) {
    console.error("Missing API key configuration", error);
    return errorResponse(500, "Sportsbook data is temporarily unavailable. Please try again later.");
  }

  try {
    const events = await fetchOddsForSport(requestedSport, apiKey);

    const games: GameInsight[] = events.map((oddsEvent) => {
      const normalized = normalizeEvent(oddsEvent);
      const { sportsbookCount, consensus } = calculateConsensus(normalized.sportsbookLines);

      return {
        gameId: normalized.gameId,
        homeTeam: normalized.homeTeam,
        awayTeam: normalized.awayTeam,
        startTime: normalized.startTime,
        sportsbookCount,
        consensus,
        sportsbookLines: normalized.sportsbookLines,
      };
    });

    const response: SportsbookInsightsResponse = { sport: requestedSport, games };
    return jsonResponse(200, response);
  } catch (error) {
    console.error("Failed to retrieve sportsbook data", error);
    const status = error instanceof OddsApiError ? error.status : undefined;
    return errorResponse(
      status === 401 ? 500 : 502,
      "Sportsbook data is temporarily unavailable. Please try again later.",
    );
  }
};