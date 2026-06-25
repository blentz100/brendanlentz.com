import { styled } from "../../../lib/styles/stitches.config";
import { SPORT_OPTIONS } from "../../../lib/sportsbook-insights/config";
import type { Sport } from "../../../types/sportsbook-insights";

const Select = styled("select", {
  fontSize: "1em",
  fontFamily: "$sans",
  padding: "0.5em 0.75em",
  borderRadius: "$rounded",
  border: "1px solid $kindaLight",
  backgroundColor: "$backgroundInner",
  color: "$text",
});

export type SportSelectorProps = {
  value: Sport;
  onChange: (sport: Sport) => void;
  className?: string;
};

const SportSelector = ({ value, onChange, className }: SportSelectorProps) => {
  return (
    <Select
      className={className}
      value={value}
      onChange={(event) => onChange(event.target.value as Sport)}
      aria-label="Select a sport"
    >
      {SPORT_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
};

export default SportSelector;
