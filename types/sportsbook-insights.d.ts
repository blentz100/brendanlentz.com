export type Sport = "americanfootball_nfl" | "basketball_nba" | "baseball_mlb";

export interface SportsbookLine {
  sportsbook: { key: string; title: string };
  lastUpdate: string;
  moneyline: { home: number; away: number };
  spread?: {
    home: { line: number; price: number };
    away: { line: number; price: number };
  };
  total?: { points: number; overOdds: number; underOdds: number };
}

export interface GameInsight {
  gameId: string;
  homeTeam: string;
  awayTeam: string;
  startTime: string;
  sportsbookCount: number;
  consensus: {
    moneyline: { home: number; away: number };
    impliedWinProbability: { home: number; away: number };
    spread?: {
      home: { line: number; price: number };
      away: { line: number; price: number };
    };
    total?: { points: number };
  };
  sportsbookLines: SportsbookLine[];
}

export interface SportsbookInsightsResponse {
  sport: Sport;
  games: GameInsight[];
}
