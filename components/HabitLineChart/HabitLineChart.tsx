import { H2 } from "../Heading";
import { LineChart } from "@mantine/charts";
import { RecordType } from "../../pages";
import { DateTime } from "luxon";
import { Paper, Table, Text } from "@mantine/core";

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

interface ChartTooltipProps {
  label: string;
  payload: Record<string, any>[] | undefined;
}

function ChartTooltip({ label, payload }: ChartTooltipProps) {
  if (!payload) return null;

  return (
    <Paper px="md" py="sm" withBorder shadow="md" radius="md">
      <Text fw={500} mb={5}>
        {label}
      </Text>
      <Table withRowBorders={false}>
        <Table.Tbody>
          {payload.map((item: any) => (
            <Table.Tr key={item.name}>
              <Table.Td>{item.name} to Date:</Table.Td>
              <Table.Td ta={"right"}>{new Intl.NumberFormat("en-US").format(item.value)}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Paper>
  );
}

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
      Goal: Math.round(runningGoalTotal),
    };
  });

  // created and push all future entries for the rest of the year onto data
  for (let i = 0; i < DateTime.now().daysInYear - DateTime.now().ordinal; i++) {
    runningGoalTotal = runningGoalTotal + goal / 366;
    const runningDate = DateTime.now().plus({ days: i }).toFormat("M/d");
    data.push({
      date: runningDate.toString(),
      Actual: null,
      Goal: Math.round(runningGoalTotal),
    });
  }

  return (
    <>
      <H2>{habitDisplayName}</H2>
      <LineChart
        h={300}
        data={data}
        dataKey="date"
        strokeWidth={0.1}
        dotProps={{ r: 3, stroke: "#fff" }}
        withTooltip
        withLegend
        valueFormatter={(value) => new Intl.NumberFormat("en-US").format(value)}
        series={[
          { name: "Goal", color: "lightgreen" },
          { name: "Actual", color: "blue" },
        ]}
        curveType="linear"
        tooltipProps={{
          content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
        }}
      />
    </>
  );
}

export default HabitLineChart;
