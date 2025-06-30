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

  // Determine the year from the first record
  const year = records.length > 0 ? DateTime.fromISO(records[0].date).year : DateTime.now().year;
  const daysInYear = DateTime.local(year).daysInYear;
  const dailyGoalIncrement = goal / daysInYear;

  // Create a complete goal line for the entire year
  const completeGoalLine: Record<number, number> = {};
  for (let day = 1; day <= daysInYear; day++) {
    completeGoalLine[day] = Math.round(dailyGoalIncrement * day);
  }

  // Create a map of actual data by day of year
  const actualDataByDay: Record<number, number> = {};
  records.forEach((item) => {
    const dayOfYear = DateTime.fromISO(item.date).ordinal;
    if (!actualDataByDay[dayOfYear]) {
      actualDataByDay[dayOfYear] = 0;
    }
    actualDataByDay[dayOfYear] += item[habit];
  });

  // Build complete dataset with all days of the year
  const data: HabitEntry[] = [];
  let runningTotal = 0;
  const currentDayOfYear = DateTime.now().ordinal;
  const currentYear = DateTime.now().year;

  for (let day = 1; day <= daysInYear; day++) {
    const date = DateTime.local(year).startOf('year').plus({ days: day - 1 }).toFormat("yyyy-MM-dd");
    const goalForThisDay = completeGoalLine[day];

    // Add actual data if we have it for this day
    if (actualDataByDay[day]) {
      runningTotal += actualDataByDay[day];
    }

    // Only show actual data up to the current date
    const shouldShowActual = year === currentYear ? day <= currentDayOfYear : true;
    const actualValue = shouldShowActual && runningTotal > 0 ? runningTotal : null;

    data.push({
      date: date,
      Actual: actualValue,
      Goal: goalForThisDay,
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
