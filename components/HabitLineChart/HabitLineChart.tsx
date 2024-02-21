import { LineChart } from "@mantine/charts";
import { RecordType } from "../../pages";
import { DateTime } from "luxon";
import { Center, Paper, Stack, Table, Text } from "@mantine/core";
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
function ChartTooltip({ label, payload }: ChartTooltipProps) {
  if (!payload) return null;

  return (
    <Paper px="5" py="5" withBorder shadow="md" radius="md">
      <Text fz="xs">{label}</Text>
      <Table withRowBorders={false} verticalSpacing="1">
        <Table.Tbody>
          {payload.map((item: any) => (
            <Table.Tr key={item.name} fz="xs">
              <Table.Td>{item.name}</Table.Td>
              <Table.Td ta={"right"}>{new Intl.NumberFormat("en-US").format(item.value)}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Paper>
  );
}

const tickFormatter = (value: number) =>
  new Date(value).toLocaleDateString("en-US", {
    month: "short",
  });

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
      date: item.date,
      Actual: runningHabitTotal,
      Goal: Math.round(runningGoalTotal),
    };
  });

  // create and push all future entries for the rest of the year onto data
  for (let i = 1; i <= DateTime.now().daysInYear - DateTime.now().ordinal + 1; i++) {
    runningGoalTotal = runningGoalTotal + goal / 366;
    DateTime.now().plus({ days: i }).toFormat("M/d");
    data.push({
      date: DateTime.now().plus({ days: i }).toFormat("M/d/yyyy"),
      Actual: null,
      Goal: Math.round(runningGoalTotal),
    });
  }

  return (
    <Stack ml={-10}>
      <Center mb={-20}>
        <H3>{habitDisplayName}</H3>
      </Center>
      <Center>
        <LineChart
          h={250}
          w={300}
          data={data}
          dataKey="date"
          dotProps={{ r: 0.1 }}
          withTooltip
          withLegend
          xAxisProps={{ interval: 170, tickFormatter: tickFormatter }}
          strokeWidth={2}
          activeDotProps={{ r: 3, strokeWidth: 1 }}
          valueFormatter={(value) => new Intl.NumberFormat("en-US").format(value)}
          series={[
            { name: "Goal", color: "lightgrey" },
            { name: "Actual", color: "blue" },
          ]}
          curveType="linear"
          tooltipProps={{
            content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
            position: { x: 60, y: 40 },
          }}
          legendProps={{ verticalAlign: "top", height: 30 }}
        />
      </Center>
    </Stack>
  );
}

export default HabitLineChart;
