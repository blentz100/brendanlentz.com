import { H2 } from "../Heading";
import { LineChart } from "@mantine/charts";
import { RecordType } from "../../pages";
import { DateTime } from "luxon";

interface HabitLineChart {
  records: RecordType[];
  habit: keyof chartableHabits;
  habitDisplayName: string;
  goal: number;
}

interface HabitEntry {
  date: string;
  Actual: number | null;
  Goal: number;
}

type chartableHabits = Omit<RecordType, "date" | "dateAsNumber">;

export function HabitLineChart({ records, habit, habitDisplayName, goal }: HabitLineChart) {
  let runningHabitTotal = 0;
  let runningGoalTotal = 0;

  // reverse the records, so they count up
  const reversedRecords = records.slice().reverse();

  // extract and transform the habit data we want and put it into data
  const data: HabitEntry[] = reversedRecords.map((item) => {
    runningHabitTotal += item[habit];
    runningGoalTotal = runningGoalTotal + goal / 366;
    return {
      date: item.date.slice(0, item.date.length - 5),
      Actual: runningHabitTotal,
      Goal: runningGoalTotal,
    };
  });

  // created and push all future entries for the rest of the year onto data
  for (let i = 0; i <= DateTime.now().daysInYear - DateTime.now().ordinal; i++) {
    runningGoalTotal = runningGoalTotal + goal / 366;
    const runningDate = DateTime.now().plus({ days: i }).toFormat("M/d");
    data.push({
      date: runningDate.toString(),
      Actual: null,
      Goal: runningGoalTotal,
    });
  }

  return (
    <>
      <H2>{habitDisplayName}</H2>
      <LineChart
        h={300}
        data={data}
        dataKey="date"
        strokeWidth={1}
        dotProps={{ r: 3, stroke: "#fff" }}
        withTooltip
        withLegend
        valueFormatter={(value) => new Intl.NumberFormat("en-US").format(value)}
        series={[
          { name: "Actual", color: "green" },
          { name: "Goal", color: "blue" },
        ]}
        curveType="linear"
      />
    </>
  );
}

export default HabitLineChart;
