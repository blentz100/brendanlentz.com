import { styled } from "../../../lib/styles/stitches.config";
import RelativeTime from "../../RelativeTime";
import type { SportsbookLine } from "../../../types/sportsbook-insights";

const Table = styled("table", {
  width: "100%",
  marginTop: "1em",
  fontSize: "0.875em",
  borderCollapse: "collapse",

  "th, td": {
    textAlign: "right",
    padding: "0.5em 0.75em",
    borderBottom: "1px solid $kindaLight",
  },

  "th:first-child, td:first-child": {
    textAlign: "left",
  },
});

const HeaderRow = styled("tr", {
  color: "$mediumDark",
});

export type SportsbookLinesTableProps = {
  lines: SportsbookLine[];
  className?: string;
};

const SportsbookLinesTable = ({ lines, className }: SportsbookLinesTableProps) => {
  return (
    <Table className={className}>
      <thead>
        <HeaderRow>
          <th>Sportsbook</th>
          <th>Moneyline</th>
          <th>Spread</th>
          <th>Total</th>
          <th>Updated</th>
        </HeaderRow>
      </thead>
      <tbody>
        {lines.map((line) => (
          <tr key={line.sportsbook.key}>
            <td>{line.sportsbook.title}</td>
            <td>
              {line.moneyline.home > 0 ? "+" : ""}
              {line.moneyline.home} / {line.moneyline.away > 0 ? "+" : ""}
              {line.moneyline.away}
            </td>
            <td>
              {line.spread
                ? `${line.spread.home.line > 0 ? "+" : ""}${line.spread.home.line} (${line.spread.home.price})`
                : "—"}
            </td>
            <td>{line.total ? `${line.total.points}` : "—"}</td>
            <td>
              <RelativeTime date={line.lastUpdate} staticFormat="MMM D, h:mm A" />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default SportsbookLinesTable;
