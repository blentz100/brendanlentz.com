import type { GameInsight, SportsbookLine } from "../../../types/sportsbook-insights";

function americanOddsToProbability(price: number): number {
  return price < 0 ? -price / (-price + 100) : 100 / (price + 100);
}

function probabilityToAmericanOdds(probability: number): number {
  return probability >= 0.5
    ? Math.round((-100 * probability) / (1 - probability))
    : Math.round((100 * (1 - probability)) / probability);
}

function average(values: number[]): number {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function round(value: number, decimals: number): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

export function calculateConsensus(
  lines: SportsbookLine[],
): { sportsbookCount: number; consensus: GameInsight["consensus"] } {
  const homeProbabilities = lines.map((line) => americanOddsToProbability(line.moneyline.home));
  const awayProbabilities = lines.map((line) => americanOddsToProbability(line.moneyline.away));

  const avgHomeProbability = average(homeProbabilities);
  const avgAwayProbability = average(awayProbabilities);
  const probabilityTotal = avgHomeProbability + avgAwayProbability;

  const normalizedHome = avgHomeProbability / probabilityTotal;
  const normalizedAway = avgAwayProbability / probabilityTotal;

  const consensus: GameInsight["consensus"] = {
    moneyline: {
      home: probabilityToAmericanOdds(normalizedHome),
      away: probabilityToAmericanOdds(normalizedAway),
    },
    impliedWinProbability: {
      home: round(normalizedHome, 3),
      away: round(normalizedAway, 3),
    },
  };

  const linesWithSpread = lines.filter((line) => line.spread !== undefined);
  if (linesWithSpread.length > 0) {
    consensus.spread = {
      home: {
        line: round(average(linesWithSpread.map((line) => line.spread!.home.line)), 1),
        price: Math.round(average(linesWithSpread.map((line) => line.spread!.home.price))),
      },
      away: {
        line: round(average(linesWithSpread.map((line) => line.spread!.away.line)), 1),
        price: Math.round(average(linesWithSpread.map((line) => line.spread!.away.price))),
      },
    };
  }

  const linesWithTotal = lines.filter((line) => line.total !== undefined);
  if (linesWithTotal.length > 0) {
    consensus.total = {
      points: round(average(linesWithTotal.map((line) => line.total!.points)), 1),
    };
  }

  return { sportsbookCount: lines.length, consensus };
}