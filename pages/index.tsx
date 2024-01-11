import Link, { LinkProps } from "../components/Link";
import { styled, keyframes, darkTheme } from "../lib/styles/stitches.config";
import { HabitTrackerTable } from "../components/DataTable";

export interface RecordType {
  date: string;
  dateAsNumber: number;
  jacks: number;
  meditation: number;
  pullups: number;
  pushups: number;
  situps: number;
  stairs: number;
}

const ColorfulLink = ({
  lightColor,
  darkColor,
  css,
  ...rest
}: LinkProps & {
  lightColor: string;
  darkColor: string;
}) => {
  return (
    <Link
      css={{
        color: lightColor,
        setUnderlineVars: { color: lightColor },

        [`.${darkTheme} &`]: {
          color: darkColor,
          setUnderlineVars: { color: darkColor },
        },

        ...css,
      }}
      {...rest}
    />
  );
};

const H1 = styled("h1", {
  margin: "0 0 0.5em -1px", // misaligned left margin, super nitpicky
  fontSize: "1.8em",
  fontWeight: 500,
  lineHeight: 1.1,
  color: "$text",

  "@medium": {
    fontSize: "1.6em",
  },
});

const H2 = styled("h2", {
  margin: "0.5em 0 0.5em -1px", // misaligned left margin, super nitpicky
  fontSize: "1.35em",
  fontWeight: 400,
  lineHeight: 1.4,
  color: "$text",

  "@medium": {
    fontSize: "1.25em",
  },
});

const Paragraph = styled("p", {
  margin: "0.85em 0",
  lineHeight: 1.7,
  color: "$text",

  "&:last-of-type": {
    marginBottom: 0,
  },

  "@medium": {
    fontSize: "0.95em",
    lineHeight: 1.825,
  },
});

const Wave = styled("span", {
  display: "inline-block",
  marginLeft: "0.1em",
  fontSize: "1.0em", // reduced from 1.2em

  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${keyframes({
      "0%": { transform: "rotate(0deg)" },
      "5%": { transform: "rotate(14deg)" },
      "10%": { transform: "rotate(-8deg)" },
      "15%": { transform: "rotate(14deg)" },
      "20%": { transform: "rotate(-4deg)" },
      "25%": { transform: "rotate(10deg)" },
      "30%": { transform: "rotate(0deg)" },
      // pause for ~9 out of 10 seconds
      "100%": { transform: "rotate(0deg)" },
    })} 5s ease 1s infinite`,
    transformOrigin: "65% 80%",
    willChange: "transform",
  },
});

const Sup = styled("sup", {
  margin: "0 0.15em",
  fontSize: "0.65em",
});

const PGPKey = styled("code", {
  marginLeft: "0.15em",
  wordSpacing: "-0.4em",
});

const Quiet = styled("span", {
  color: "$mediumLight",
});

const EasterEgg = styled(ColorfulLink, {
  // rotated 🪄 emoji on hover
  "&:hover": {
    cursor: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='30' style='font-size:24px'><text y='50%' transform='rotate(-70 0 0) translate(-20, 6)'>🪄</text></svg>") 5 5, auto`,
  },
});

interface IndexProps {
  staticRecords2024: RecordType[];
  staticRecords2023: RecordType[];
}

const Index = ({ staticRecords2024, staticRecords2023 }: IndexProps) => {
  return (
    <>
      <H1>
        Hi there, I'm Brendan... <Wave>👋</Wave>
      </H1>
      <H2>
        I'm a frontend developer based in the{" "}
        <ColorfulLink
          href="https://phxbrief.com/briefs"
          title='"The PHX Brief"'
          lightColor="#fb4d42"
          darkColor="#ff5146"
        >
          Phoenix
        </ColorfulLink>{" "}
        area.
      </H2>

      <Paragraph>
        In my current role as a developer at{" "}
        <ColorfulLink
          href="https://www.operationalsystems.com/"
          title="Operational Systems Inc Homepage"
          lightColor="#1091b3"
          darkColor="#6fcbe3"
        >
          Operational Systems Inc,
        </ColorfulLink>{" "}
        I focus on{" "}
        <ColorfulLink
          href="https://reactjs.org/"
          title="React Official Website"
          lightColor="#1091b3"
          darkColor="#6fcbe3"
        >
          React
        </ColorfulLink>{" "}
        and{" "}
        <ColorfulLink
          href="https://sive.rs/learn-js"
          title="How to Learn JavaScript by Derek Sivers"
          lightColor="#f48024"
          darkColor="#e18431"
        >
          JavaScript
        </ColorfulLink>
        . I love learning new technologies like Typescript, contributing to open source projects and listening to tech
        podcasts (shoutout to Syntax and JS Party.)
      </Paragraph>

      <Paragraph>
        In my previous role at a coding bootcamp I hosted weekly{" "}
        <ColorfulLink
          href="https://gist.github.com/blentz100"
          title="Github Gists"
          lightColor="#00b81a"
          darkColor="#57f06d"
        >
          live coding challenges
        </ColorfulLink>{" "}
        to help our students prepare for
        <ColorfulLink
          href="https://www.youtube.com/watch?v=8gaM0uSANiM&t=2667s"
          title="Get Better at Interviewing - Tips from a Tech Lead"
          lightColor="#f48024"
          darkColor="#e18431"
        >
          {" "}
          technical interviews
        </ColorfulLink>
        . I helped to grow our startup from 3 people to over 20, and built the mentor team that supported over a 100 new
        students every month.{" "}
      </Paragraph>
      <Paragraph>
        I have a bachelor's degree in{" "}
        <ColorfulLink
          href="https://www.wm.edu/as/computerscience/"
          title="W&M Computer Science Department"
          lightColor="#1091b3"
          darkColor="#6fcbe3"
        >
          Computer Science
        </ColorfulLink>{" "}
        from{" "}
        <ColorfulLink href="https://www.wm.edu/" title="William and Mary" lightColor="#6fbc4e" darkColor="#84d95f">
          The College of William and Mary in Virginia
        </ColorfulLink>
        .
      </Paragraph>
      <Paragraph>
        You can find more of my work on{" "}
        <ColorfulLink
          href="https://github.com/blentz100"
          rel="me"
          title="Brendan Lentz on GitHub"
          lightColor="#8d4eff"
          darkColor="#a379f0"
        >
          GitHub
        </ColorfulLink>{" "}
        and{" "}
        <ColorfulLink
          href="https://www.linkedin.com/in/brendanlentz/"
          rel="me"
          title="Brendan Lentz on LinkedIn"
          lightColor="#0073b1"
          darkColor="#3b9dd2"
        >
          LinkedIn
        </ColorfulLink>
        .
      </Paragraph>
      <H2>Habit Tracker</H2>
      <Paragraph>
        I created a habit tracker to track my fitness goal and some other exercises. Updated in realtime.
      </Paragraph>
      <br />
      <HabitTrackerTable staticRecords2024={staticRecords2024} staticRecords2023={staticRecords2024} />
    </>
  );
};

export async function getStaticProps() {
  let dev = process.env.NODE_ENV !== "production";

  // workaround to support building the app locally with yarn build-local
  if (process.env.APP_ENV == "development") {
    dev = true;
  }
  const server = dev ? "http://localhost:3000" : "https://brendanlentz.com";

  console.log("process.env.NODE_ENV is: ", process.env.NODE_ENV);
  console.log("dev is: ", dev);
  console.log("server is: ", server);

  // get the 2024 data
  const response2024 = await fetch(`${server}/api/sheets`);
  console.log("response2024");
  console.log(response2024);

  const responseData2024 = await response2024.json();
  console.log(responseData2024);
  if (!responseData2024.success) {
    throw new Error(responseData2024.message);
  }
  const records2024 = responseData2024.dataArrayFiltered;

  // get the 2023 data
  // const response2023 = await fetch(`${server}/api/sheets2023/`);
  // const responseData2023 = await response2023.json();
  // console.log("responseData2023", responseData2023);
  // if (!responseData2023.success) {
  //   throw new Error(responseData2023.message);
  // }
  // const records2023 = responseData2023.dataArrayFiltered;

  return {
    props: {
      staticRecords2024: records2024,
      staticRecords2023: records2024,
    },
    revalidate: 300,
  };
}

export default Index;
