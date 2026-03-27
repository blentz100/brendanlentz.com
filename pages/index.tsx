import { styled, keyframes, darkTheme } from "../lib/styles/stitches.config";
import { HabitTrackerTable } from "../components/HabitTrackerTable";
import { HabitLineChart } from "../components/HabitLineChart";
import { SimpleGrid } from "@mantine/core";
import { goals2025 } from "../lib/config/goals";
import {fetchHabitsByYear} from "../lib/fetchHabits";
import BlogPostsList, {BlogPostsListProps} from "../components/BlogPostsList";
import { getPostsByYear } from "../lib/helpers/get-posts-by-year";

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

const BlogSection = styled("div", {
  marginTop: "3rem",
  marginBottom: "4rem",
});

const SectionHeading = styled("h2", {
  margin: "0 0 0.5em 0",
  fontSize: "1.5em",
  fontWeight: 600,
  lineHeight: 1.2,
  color: "$text",

  "@medium": {
    fontSize: "1.35em",
  },
});

styled("span", {
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
  postsByYear: BlogPostsListProps["postsByYear"];
}

// Static Site Generation - NextJS pre-renders this page at
// build time using the props returned by getStaticProps.
const Index = ({ initialRecords2025, initialRecords2024, initialRecords2023, postsByYear }: IndexProps,
) => {
  return (
    <>
      <H1>
        Building reliable software
      </H1>

      <Paragraph>
        Writing about reliable systems, software architecture, and ownership in engineering.
      </Paragraph>

      <BlogSection>
        <BlogPostsList postsByYear={postsByYear}></BlogPostsList>
      </BlogSection>

      <SectionHeading>Habit Tracker</SectionHeading>
      <Paragraph>
        A small side project: a React Native habit tracker with live charts built from my own workout data.
      </Paragraph>

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

  const records2025 = await fetchHabitsByYear("2025");
  const records2024 = await fetchHabitsByYear("2024");
  const records2023 = await fetchHabitsByYear("2023");
  const postsByYear = await getPostsByYear();

  return {
    props: {
      initialRecords2025: records2025,
      initialRecords2024: records2024,
      initialRecords2023: records2023,
      postsByYear: postsByYear,
    },
    revalidate: 5,
  };
}

export default Index;
