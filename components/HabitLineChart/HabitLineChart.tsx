import { H2 } from "../Heading";
import { LineChart } from "@mantine/charts";
import { RecordType } from "../../pages";
import { DateTime } from "luxon";

interface HabitLineChart {
  records: RecordType[];
  habit: string;
}

interface HabitEntry {
  date: string;
  Actual: number | null;
  Goal: number;
}

export function HabitLineChart({ records, habit }: HabitLineChart) {
  let runningTotal = 0;
  let runningGoalTotal = 0;

  // reverse the records, so they count up
  const reversedRecords = records.slice().reverse();

  const data: HabitEntry[] = reversedRecords.map((item, index) => {
    runningTotal += item.pushups;
    runningGoalTotal += Math.round(10000 / 365);
    return {
      date: item.date.slice(0, item.date.length - 5),
      Actual: runningTotal,
      Goal: runningGoalTotal,
    };
  });

  for (let i = data.length; i < DateTime.now().daysInYear - DateTime.now().ordinal; i++) {
    runningGoalTotal += Math.round(10000 / 365);
    const runningDate = DateTime.now().plus({ days: i }).toFormat("M/d");
    data.push({
      date: runningDate.toString(),
      Actual: null,
      Goal: runningGoalTotal,
    });
  }

  return (
    <>
      <H2>Pushups</H2>
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
