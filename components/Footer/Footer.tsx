import NextLink from "next/link";
import { LinkedInLogo, OctocatOcticon } from "../Icons";
import { styled } from "../../lib/styles/stitches.config";
import * as config from "../../lib/config";
import type { ComponentProps } from "react";
import NewsletterSignup from "../NewsletterSignup/NewsletterSignup";

const Wrapper = styled("footer", {
  width: "100%",
  paddingTop: "1rem",
  paddingBottom: "6rem",
  borderTop: "1px solid $kindaLight",
  backgroundColor: "$backgroundOuter",
  color: "$mediumDark",

  // light-dark theme switch fading
  transition: "background 0.25s ease, border 0.25s ease",

  "@medium": {
    padding: "1em 1.25em",
  },
});

const Row = styled("div", {
  display: "flex",
  width: "100%",
  maxWidth: "865px",
  margin: "0 auto",
  justifyContent: "space-between",
  fontSize: "0.85em",
  lineHeight: 2.3,

  // stack columns on left instead of flexboxing across
  "@medium": {
    fontSize: "0.8em",
    display: "block",
  },
});

const Link = styled(NextLink, {
  color: "$mediumDark",
  textDecoration: "none",
});

const ViewSourceLink = styled(Link, {
  paddingBottom: "2px",
  borderBottom: "1px solid $light",

  "&:hover": {
    borderColor: "$kindaLight",
  },
});

const SocialLinks = styled("span", {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.65rem",
  marginLeft: "0.9rem",
});

const SocialLink = styled(Link, {
  color: "$mediumDark",

  "&:hover": {
    color: "$medium",
  },
});

const Icon = styled("svg", {
  width: "1.25em",
  height: "1.25em",
  verticalAlign: "-0.25em",
  margin: "0 0.075em",
  fill: "currentColor",
});

export type FooterProps = ComponentProps<typeof Wrapper>;

const Footer = ({ ...rest }: FooterProps) => {
  return (
    <Wrapper {...rest}>
      <Row>
        <NewsletterSignup/>
        <div>
          <ViewSourceLink
            href={`https://github.com/${config.githubRepo}`}
            title="View Source on GitHub"
            target="_blank"
            rel="noopener noreferrer"
          >
            View source.
          </ViewSourceLink>
          <SocialLinks>
            <SocialLink
              href={`https://github.com/${config.authorSocial.github}`}
              title="GitHub profile"
              aria-label="GitHub profile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon as={OctocatOcticon} />
            </SocialLink>
            <SocialLink
              href={`https://www.linkedin.com/in/${config.authorSocial.linkedin}/`}
              title="LinkedIn profile"
              aria-label="LinkedIn profile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon as={LinkedInLogo} />
            </SocialLink>
          </SocialLinks>
        </div>
      </Row>
    </Wrapper>
  );
};

export default Footer;
