import { styled } from "../../../lib/styles/stitches.config";
import RelativeTime from "../../RelativeTime";
import SportsbookLinesTable from "../SportsbookLinesTable";
import type { GameInsight } from "../../../types/sportsbook-insights";

const Wrapper = styled("div", {
  width: "100%",
  padding: "1.2em 1.2em 1em 1.2em",
  marginBottom: "1em",
  border: "1px solid $kindaLight",
  borderRadius: "$rounded",
  fontSize: "0.95em",
  color: "$mediumDark",
});

const Teams = styled("div", {
  fontSize: "1.15em",
  fontWeight: 600,
  color: "$text",
});

const Meta = styled("div", {
  marginTop: "0.4em",
  fontSize: "0.85em",
  color: "$mediumLight",
});

const ConsensusGrid = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  gap: "1.5em",
  marginTop: "1em",
});

const ConsensusItem = styled("div", {
  fontSize: "0.875em",

  "& dt": {
    margin: 0,
    color: "$mediumLight",
    marginBottom: "0.2em",
  },

  "& dd": {
    margin: 0,
    fontWeight: 600,
    color: "$text",
  },
});

const ExpandButton = styled("button", {
  marginTop: "1em",
  fontSize: "0.85em",
  color: "$link",
  background: "none",
  border: "none",
  padding: 0,
  cursor: "pointer",

  "&:hover": {
    textDecoration: "underline",
  },
});

export type GameInsightCardProps = {
  game: GameInsight;
  expanded: boolean;
  onToggleExpand: () => void;
  className?: string;
};

const GameInsightCard = ({ game, expanded, onToggleExpand, className }: GameInsightCardProps) => {
  const { consensus } = game;

  return (
    <Wrapper className={className}>
      <Teams>
        {game.awayTeam} @ {game.homeTeam}
      </Teams>

      <Meta>
        <RelativeTime date={game.startTime} staticFormat="MMM D, YYYY, h:mm A" /> · {game.sportsbookCount}{" "}
        {game.sportsbookCount === 1 ? "sportsbook" : "sportsbooks"} reporting
      </Meta>

      <ConsensusGrid>
        <ConsensusItem>
          <dt>Moneyline</dt>
          <dd>
            {consensus.moneyline.home > 0 ? "+" : ""}
            {consensus.moneyline.home} / {consensus.moneyline.away > 0 ? "+" : ""}
            {consensus.moneyline.away}
          </dd>
        </ConsensusItem>

        <ConsensusItem>
          <dt>Implied win %</dt>
          <dd>
            {Math.round(consensus.impliedWinProbability.home * 100)}% /{" "}
            {Math.round(consensus.impliedWinProbability.away * 100)}%
          </dd>
        </ConsensusItem>

        {consensus.spread && (
          <ConsensusItem>
            <dt>Spread</dt>
            <dd>
              {consensus.spread.home.line > 0 ? "+" : ""}
              {consensus.spread.home.line}
            </dd>
          </ConsensusItem>
        )}

        {consensus.total && (
          <ConsensusItem>
            <dt>Total</dt>
            <dd>{consensus.total.points}</dd>
          </ConsensusItem>
        )}
      </ConsensusGrid>

      <ExpandButton type="button" onClick={onToggleExpand} aria-expanded={expanded}>
        {expanded ? "Hide sportsbook data" : "View sportsbook data"}
      </ExpandButton>

      {expanded && <SportsbookLinesTable lines={game.sportsbookLines} />}
    </Wrapper>
  );
};

export default GameInsightCard;
