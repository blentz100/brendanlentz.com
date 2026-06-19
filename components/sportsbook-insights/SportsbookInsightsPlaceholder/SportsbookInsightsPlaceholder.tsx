import { styled } from "../../../lib/styles/stitches.config";
import type { ComponentProps } from "react";

const Wrapper = styled("div", {
  padding: "2rem",
  textAlign: "center",
  color: "$mediumDark",
  border: "1px solid $kindaLight",
  borderRadius: "8px",
});

export type SportsbookInsightsPlaceholderProps = ComponentProps<typeof Wrapper>;

const SportsbookInsightsPlaceholder = ({ ...rest }: SportsbookInsightsPlaceholderProps) => {
  return <Wrapper {...rest}>Sportsbook Insights — coming soon.</Wrapper>;
};

export default SportsbookInsightsPlaceholder;
