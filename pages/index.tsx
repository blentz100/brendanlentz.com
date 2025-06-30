import Link, { LinkProps } from "../components/Link";
import { styled, keyframes, darkTheme } from "../lib/styles/stitches.config";
import { HabitTrackerTable } from "../components/HabitTrackerTable";
import { HabitLineChart } from "../components/HabitLineChart";
import { SimpleGrid } from "@mantine/core";
import { goals2025 } from "../lib/config/goals";

export type RecordType = {
  date: string;
  dateAsNumber: number;
  jacks: number;
  meditation: number;
  pullups: number;
  pushups: number;
  situps: number;
  stairs: number;
};

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

interface IndexProps {
  initialRecords2025: RecordType[];
  initialRecords2024: RecordType[];
  initialRecords2023: RecordType[];
}

// Static Site Generation - NextJS pre-renders this page at
// build time using the props returned by getStaticProps.
const Index = ({ initialRecords2025, initialRecords2024, initialRecords2023 }: IndexProps) => {
  return (
    <>
      <H1>
        Hi there, I'm Brendan... <Wave>👋</Wave>
      </H1>

      <Paragraph>
        I am a software developer at{" "}
        <ColorfulLink
          href="https://www.operationalsystems.com/"
          title="Operational Systems Inc Homepage"
          lightColor="#1091b3"
          darkColor="#6fcbe3"
        >
          Operational Systems Inc.
        </ColorfulLink>{" "}
        I develop with React, TypeScript, NextJS, PHP and a little bit of Java.
      </Paragraph>
      <Paragraph>
        My experience includes leading teams at a Fortune 100 company and helping a tech startup grow from 3 to 20
        people.
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
      <H1>Habit Tracker</H1>
      <Paragraph>
        I use my Habit Tracker app to help me do 10,000 pushups. The data below is from my daily workouts, updated in
        realtime.
      </Paragraph>
      <br />

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
        <HabitLineChart
          records={initialRecords2025}
          habit={"pushups"}
          habitDisplayName={"Pushups"}
          goal={goals2025.pushups}
        />
        <HabitLineChart
          records={initialRecords2025}
          habit={"situps"}
          habitDisplayName={"Situps"}
          goal={goals2025.situps}
        />
        <HabitLineChart
          records={initialRecords2025}
          habit={"jacks"}
          habitDisplayName={"Jumping Jacks"}
          goal={goals2025.jacks}
        />
        <HabitLineChart
          records={initialRecords2025}
          habit={"stairs"}
          habitDisplayName={"Stairs"}
          goal={goals2025.stairs}
        />
        <HabitLineChart
          records={initialRecords2025}
          habit={"pullups"}
          habitDisplayName={"Pullups"}
          goal={goals2025.pullups}
        />
      </SimpleGrid>

      <HabitTrackerTable
        initialRecords2025={initialRecords2025}
        initialRecords2024={initialRecords2024}
        initialRecords2023={initialRecords2023}
      />
    </>
  );
};

// NextJS calls getStaticProps at build time
export async function getStaticProps() {
  // assign the correct web server prefix according to the environment
  const dev = process.env.NODE_ENV !== "production";

  const server = dev
      ? "http://localhost:3000"
      : `https://${process.env.VERCEL_URL}`;

  console.log("Using server URL:", server);

  const response2025x = await fetch(`${server}/api/supabase-habits?year=2025`);

  if (!response2025x.ok) {
    const text = await response2025x.text(); // get HTML content for debugging
    throw new Error(`Failed to fetch habits: ${response2025x.status} - ${text}`);
  }

  // fetch the 2025 data from Supabase
  const response2025 = await fetch(`${server}/api/supabase-habits?year=2025`);
  const responseData2025 = await response2025.json();
  if (!responseData2025.success) {
    throw new Error(responseData2025.message);
  }
  const records2025 = responseData2025.dataArray;

  // fetch the 2024 data from Supabase
  const response2024 = await fetch(`${server}/api/supabase-habits?year=2024`);
  const responseData2024 = await response2024.json();
  if (!responseData2024.success) {
    throw new Error(responseData2024.message);
  }
  const records2024 = responseData2024.dataArray;

  // fetch the 2023 data from Supabase
  const response2023 = await fetch(`${server}/api/supabase-habits?year=2023`);
  const responseData2023 = await response2023.json();
  if (!responseData2023.success) {
    throw new Error(responseData2023.message);
  }
  const records2023 = responseData2023.dataArray;

  return {
    props: {
      initialRecords2025: records2025,
      initialRecords2024: records2024,
      initialRecords2023: records2023,
    },
    revalidate: 5,
  };
}

export default Index;
