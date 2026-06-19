import type { APIGatewayProxyHandler } from "aws-lambda";
import type { SportsbookInsightsResponse } from "../../../types/sportsbook-insights";

const mockResponse: SportsbookInsightsResponse = {
  sport: "americanfootball_nfl",
  games: [
    {
      gameId: "mock-game-1",
      homeTeam: "Home Team",
      awayTeam: "Away Team",
      startTime: "2026-09-10T00:00:00.000Z",
      sportsbookCount: 3,
      consensus: {
        moneyline: { home: -150, away: 130 },
        impliedWinProbability: { home: 0.6, away: 0.4 },
        spread: {
          home: { line: -2.5, price: -110 },
          away: { line: 2.5, price: -110 },
        },
        total: { points: 47.5 },
      },
      sportsbookLines: [
        {
          sportsbook: { key: "draftkings", title: "DraftKings" },
          lastUpdate: "2026-09-09T12:00:00.000Z",
          moneyline: { home: -150, away: 130 },
          spread: {
            home: { line: -3, price: -110 },
            away: { line: 3, price: -110 },
          },
          total: { points: 47.5, overOdds: -110, underOdds: -110 },
        },
        {
          sportsbook: { key: "fanduel", title: "FanDuel" },
          lastUpdate: "2026-09-09T12:05:00.000Z",
          moneyline: { home: -145, away: 125 },
          spread: {
            home: { line: -2.5, price: -115 },
            away: { line: 2.5, price: -105 },
          },
          total: { points: 48, overOdds: -105, underOdds: -115 },
        },
        {
          // BetMGM didn't have a spread posted for this game yet, exercising the optional `spread` field.
          sportsbook: { key: "betmgm", title: "BetMGM" },
          lastUpdate: "2026-09-09T11:50:00.000Z",
          moneyline: { home: -155, away: 135 },
          total: { points: 47, overOdds: -110, underOdds: -110 },
        },
      ],
    },
  ],
};

export const handler: APIGatewayProxyHandler = async () => {
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(mockResponse),
  };
};
