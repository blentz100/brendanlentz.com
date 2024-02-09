import { LineChart } from "@mantine/charts";
import { RecordType } from "../../pages";
import { DateTime } from "luxon";
import { Paper, Stack, Table } from "@mantine/core";
import { H3 } from "../Heading";

interface HabitLineChart {
  records: RecordType[];
  habit: keyof chartableHabits;
  habitDisplayName: string;
  goal: number;
}

interface HabitEntry {
  date: string | undefined;
  Actual: number | null;
  Goal: number;
}

type chartableHabits = Omit<RecordType, "date" | "dateAsNumber">;

interface ChartTooltipProps {
  label: string;
  payload: Record<string, any>[] | undefined;
}

const monthLookUpDictionary: Record<number, string> = {
  0: "Jan",
  32: "Feb",
  61: "Mar",
  92: "Apr",
  122: "May",
  153: "Jun",
  183: "Jul",
  214: "Aug",
  245: "Sep",
  275: "Oct",
  306: "Nov",
  336: "Dec",
};

function ChartTooltip({ payload }: ChartTooltipProps) {
  if (!payload) return null;

  return (
    <Paper px="md" py="sm" withBorder shadow="md" radius="md">
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
  const data: HabitEntry[] = reversedRecords.map((item, index) => {
    runningHabitTotal += item[habit];
    runningGoalTotal = runningGoalTotal + goal / 366;
    return {
      date: monthLookUpDictionary[index] ?? "",
      Actual: runningHabitTotal,
      Goal: Math.round(runningGoalTotal),
    };
  });

  // created and push all future entries for the rest of the year onto data
  for (let i = 0; i < DateTime.now().daysInYear - DateTime.now().ordinal; i++) {
    runningGoalTotal = runningGoalTotal + goal / 366;
    DateTime.now().plus({ days: i }).toFormat("M/d");
    data.push({
      date: monthLookUpDictionary[DateTime.now().ordinal + i] ?? "",
      Actual: null,
      Goal: Math.round(runningGoalTotal),
    });
  }

  return (
    <Stack>
      <H3>{habitDisplayName}</H3>
      <LineChart
        h={300}
        data={data}
        dataKey="date"
        dotProps={{ r: 0.1 }}
        withTooltip
        withLegend
        xAxisProps={{ interval: 0 }}
        strokeWidth={2}
        activeDotProps={{ r: 3, strokeWidth: 1 }}
        valueFormatter={(value) => new Intl.NumberFormat("en-US").format(value)}
        series={[
          { name: "Goal", color: "lightgrey" },
          { name: "Actual", color: "blue" },
        ]}
        curveType="linear"
        tooltipProps={{
          content: ({ payload }) => <ChartTooltip label={habitDisplayName} payload={payload} />,
        }}
        legendProps={{ verticalAlign: "bottom", height: 30 }}
      />
    </Stack>
  );
}

export default HabitLineChart;
