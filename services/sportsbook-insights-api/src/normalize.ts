import type { SportsbookLine } from "../../../types/sportsbook-insights";
import type { OddsApiBookmaker, OddsApiEvent } from "./oddsApi/types";

export interface NormalizedGame {
  gameId: string;
  homeTeam: string;
  awayTeam: string;
  startTime: string;
  sportsbookLines: SportsbookLine[];
}

function normalizeBookmaker(
  bookmaker: OddsApiBookmaker,
  homeTeam: string,
  awayTeam: string,
): SportsbookLine | undefined {
  const h2h = bookmaker.markets.find((market) => market.key === "h2h");
  if (!h2h) {
    return undefined;
  }

  const homeMoneyline = h2h.outcomes.find((outcome) => outcome.name === homeTeam);
  const awayMoneyline = h2h.outcomes.find((outcome) => outcome.name === awayTeam);
  if (!homeMoneyline || !awayMoneyline) {
    return undefined;
  }

  const line: SportsbookLine = {
    sportsbook: { key: bookmaker.key, title: bookmaker.title },
    lastUpdate: bookmaker.last_update,
    moneyline: { home: homeMoneyline.price, away: awayMoneyline.price },
  };

  const spreads = bookmaker.markets.find((market) => market.key === "spreads");
  const homeSpread = spreads?.outcomes.find((outcome) => outcome.name === homeTeam);
  const awaySpread = spreads?.outcomes.find((outcome) => outcome.name === awayTeam);
  if (homeSpread?.point !== undefined && awaySpread?.point !== undefined) {
    line.spread = {
      home: { line: homeSpread.point, price: homeSpread.price },
      away: { line: awaySpread.point, price: awaySpread.price },
    };
  }

  const totals = bookmaker.markets.find((market) => market.key === "totals");
  const overOutcome = totals?.outcomes.find((outcome) => outcome.name === "Over");
  const underOutcome = totals?.outcomes.find((outcome) => outcome.name === "Under");
  if (overOutcome?.point !== undefined && underOutcome) {
    line.total = {
      points: overOutcome.point,
      overOdds: overOutcome.price,
      underOdds: underOutcome.price,
    };
  }

  return line;
}

export function normalizeEvent(event: OddsApiEvent): NormalizedGame {
  const sportsbookLines = event.bookmakers
    .map((bookmaker) => normalizeBookmaker(bookmaker, event.home_team, event.away_team))
    .filter((line): line is SportsbookLine => line !== undefined);

  return {
    gameId: event.id,
    homeTeam: event.home_team,
    awayTeam: event.away_team,
    startTime: event.commence_time,
    sportsbookLines,
  };
}