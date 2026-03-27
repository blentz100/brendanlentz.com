import { NextSeo } from "next-seo";
import { SimpleGrid } from "@mantine/core";
import Content from "../components/Content";
import PageTitle from "../components/PageTitle";
import { HabitTrackerTable } from "../components/HabitTrackerTable";
import { HabitLineChart } from "../components/HabitLineChart";
import { styled } from "../lib/styles/stitches.config";
import { goals2025 } from "../lib/config/goals";
import { fetchHabitsByYear } from "../lib/fetchHabits";

type RecordType = {
  date: string;
  dateAsNumber: number;
  jacks: number;
  meditation: number;
  pullups: number;
  pushups: number;
  situps: number;
  stairs: number;
};

type HabitsProps = {
  initialRecords2025: RecordType[];
  initialRecords2024: RecordType[];
  initialRecords2023: RecordType[];
};

const Intro = styled("p", {
  marginTop: 0,
  marginBottom: "2rem",
  lineHeight: 1.7,
  color: "$text",

  "@medium": {
    fontSize: "0.95em",
    lineHeight: 1.825,
  },
});

const Habits = ({ initialRecords2025, initialRecords2024, initialRecords2023 }: HabitsProps) => {
  return (
    <>
      <NextSeo
        title="Habits"
        description="Workout charts and progress tracking from Brendan Lentz's habit tracker app."
        openGraph={{
          title: "Habits",
        }}
      />

      <PageTitle>Habit Tracker</PageTitle>

      <Content>
        <Intro>A small side project: a React Native habit tracker with live charts built from my own workout data.</Intro>

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
      </Content>
    </>
  );
};

export async function getStaticProps() {
  const records2025 = await fetchHabitsByYear("2025");
  const records2024 = await fetchHabitsByYear("2024");
  const records2023 = await fetchHabitsByYear("2023");

  return {
    props: {
      initialRecords2025: records2025,
      initialRecords2024: records2024,
      initialRecords2023: records2023,
    },
    revalidate: 5,
  };
}

export default Habits;
