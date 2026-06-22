import type { OddsApiEvent } from "../../oddsApi/types";

export const sampleEvent: OddsApiEvent = {
  id: "sample-game-1",
  sport_key: "americanfootball_nfl",
  sport_title: "NFL",
  commence_time: "2026-09-10T00:00:00Z",
  home_team: "Home Team",
  away_team: "Away Team",
  bookmakers: [
    {
      key: "draftkings",
      title: "DraftKings",
      last_update: "2026-09-09T12:00:00Z",
      markets: [
        {
          key: "h2h",
          last_update: "2026-09-09T12:00:00Z",
          outcomes: [
            { name: "Home Team", price: -150 },
            { name: "Away Team", price: 130 },
          ],
        },
        {
          key: "spreads",
          last_update: "2026-09-09T12:00:00Z",
          outcomes: [
            { name: "Home Team", price: -110, point: -3 },
            { name: "Away Team", price: -110, point: 3 },
          ],
        },
        {
          key: "totals",
          last_update: "2026-09-09T12:00:00Z",
          outcomes: [
            { name: "Over", price: -110, point: 47.5 },
            { name: "Under", price: -110, point: 47.5 },
          ],
        },
      ],
    },
    {
      key: "fanduel",
      title: "FanDuel",
      last_update: "2026-09-09T12:05:00Z",
      markets: [
        {
          key: "h2h",
          last_update: "2026-09-09T12:05:00Z",
          outcomes: [
            { name: "Home Team", price: -145 },
            { name: "Away Team", price: 125 },
          ],
        },
        {
          key: "spreads",
          last_update: "2026-09-09T12:05:00Z",
          outcomes: [
            { name: "Home Team", price: -115, point: -2.5 },
            { name: "Away Team", price: -105, point: 2.5 },
          ],
        },
        {
          key: "totals",
          last_update: "2026-09-09T12:05:00Z",
          outcomes: [
            { name: "Over", price: -105, point: 48 },
            { name: "Under", price: -115, point: 48 },
          ],
        },
      ],
    },
    {
      // BetMGM has no spreads market posted for this game, exercising the optional `spread` field.
      key: "betmgm",
      title: "BetMGM",
      last_update: "2026-09-09T11:50:00Z",
      markets: [
        {
          key: "h2h",
          last_update: "2026-09-09T11:50:00Z",
          outcomes: [
            { name: "Home Team", price: -155 },
            { name: "Away Team", price: 135 },
          ],
        },
        {
          key: "totals",
          last_update: "2026-09-09T11:50:00Z",
          outcomes: [
            { name: "Over", price: -110, point: 47 },
            { name: "Under", price: -110, point: 47 },
          ],
        },
      ],
    },
  ],
};

export const sampleEventWithNoTotals: OddsApiEvent = {
  ...sampleEvent,
  id: "sample-game-2",
  bookmakers: sampleEvent.bookmakers.map((bookmaker) => ({
    ...bookmaker,
    markets: bookmaker.markets.filter((market) => market.key !== "totals"),
  })),
};