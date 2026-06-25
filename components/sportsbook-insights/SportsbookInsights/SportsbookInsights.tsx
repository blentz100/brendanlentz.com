import { useState } from "react";
import useSWR from "swr";
import { styled } from "../../../lib/styles/stitches.config";
import { fetchInsights } from "../../../lib/sportsbook-insights/api";
import { DEFAULT_SPORT } from "../../../lib/sportsbook-insights/config";
import Loading from "../../Loading";
import SportSelector from "../SportSelector";
import GameInsightCard from "../GameInsightCard";
import type { Sport } from "../../../types/sportsbook-insights";

const Header = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: "1em",
  marginBottom: "1.5em",
});

const StatusMessage = styled("p", {
  color: "$mediumLight",
});

const ErrorMessage = styled("p", {
  color: "$error",
});

const SportsbookInsights = () => {
  const [sport, setSport] = useState<Sport>(DEFAULT_SPORT);
  const [expandedGameId, setExpandedGameId] = useState<string | null>(null);

  const { data, error } = useSWR(["sportsbook-insights", sport], () => fetchInsights(sport));

  return (
    <div>
      <Header>
        <SportSelector
          value={sport}
          onChange={(newSport) => {
            setSport(newSport);
            setExpandedGameId(null);
          }}
        />
      </Header>

      {!data && !error && <Loading boxes={3} width={40} />}

      {error && <ErrorMessage>Couldn&apos;t load sportsbook data right now. Try again shortly.</ErrorMessage>}

      {data && data.games.length === 0 && <StatusMessage>No upcoming games right now.</StatusMessage>}

      {data &&
        data.games.map((game) => (
          <GameInsightCard
            key={game.gameId}
            game={game}
            expanded={expandedGameId === game.gameId}
            onToggleExpand={() => setExpandedGameId(expandedGameId === game.gameId ? null : game.gameId)}
          />
        ))}
    </div>
  );
};

export default SportsbookInsights;
