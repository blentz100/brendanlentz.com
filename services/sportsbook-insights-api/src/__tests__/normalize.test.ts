import assert from "node:assert/strict";
import { test } from "node:test";
import { normalizeEvent } from "../normalize";
import { sampleEvent } from "./fixtures/oddsApiSample";

test("normalizeEvent maps event-level fields", () => {
  const result = normalizeEvent(sampleEvent);

  assert.equal(result.gameId, "sample-game-1");
  assert.equal(result.homeTeam, "Home Team");
  assert.equal(result.awayTeam, "Away Team");
  assert.equal(result.startTime, "2026-09-10T00:00:00Z");
  assert.equal(result.sportsbookLines.length, 3);
});

test("normalizeEvent maps a fully-populated bookmaker", () => {
  const result = normalizeEvent(sampleEvent);
  const draftkings = result.sportsbookLines.find((line) => line.sportsbook.key === "draftkings");

  assert.ok(draftkings);
  assert.deepEqual(draftkings.moneyline, { home: -150, away: 130 });
  assert.deepEqual(draftkings.spread, {
    home: { line: -3, price: -110 },
    away: { line: 3, price: -110 },
  });
  assert.deepEqual(draftkings.total, { points: 47.5, overOdds: -110, underOdds: -110 });
});

test("normalizeEvent leaves spread undefined when a bookmaker has no spreads market", () => {
  const result = normalizeEvent(sampleEvent);
  const betmgm = result.sportsbookLines.find((line) => line.sportsbook.key === "betmgm");

  assert.ok(betmgm);
  assert.equal(betmgm.spread, undefined);
  assert.deepEqual(betmgm.total, { points: 47, overOdds: -110, underOdds: -110 });
});