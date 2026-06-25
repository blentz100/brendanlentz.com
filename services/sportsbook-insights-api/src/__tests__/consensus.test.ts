import assert from "node:assert/strict";
import { test } from "node:test";
import { calculateConsensus } from "../consensus";
import { normalizeEvent } from "../normalize";
import { sampleEvent, sampleEventWithNoTotals } from "./fixtures/oddsApiSample";

test("calculateConsensus computes moneyline, probability, spread, and total", () => {
  const { sportsbookLines } = normalizeEvent(sampleEvent);
  const { sportsbookCount, consensus } = calculateConsensus(sportsbookLines);

  assert.equal(sportsbookCount, 3);
  assert.deepEqual(consensus.moneyline, { home: -138, away: 138 });
  assert.deepEqual(consensus.impliedWinProbability, { home: 0.58, away: 0.42 });
  assert.deepEqual(consensus.spread, {
    home: { line: -2.75, price: -112 },
    away: { line: 2.75, price: -107 },
  });
  assert.deepEqual(consensus.total, { points: 47.5 });
});

test("calculateConsensus omits total when no bookmaker reports a totals market", () => {
  const { sportsbookLines } = normalizeEvent(sampleEventWithNoTotals);
  const { consensus } = calculateConsensus(sportsbookLines);

  assert.equal(consensus.total, undefined);
  assert.ok(consensus.spread);
});