import { H2 } from "../Heading";
import { LineChart } from "@mantine/charts";
import { RecordType } from "../../pages";

interface HabitLineChart {
  records: RecordType[];
  habit: string;
}

const sampleData = [
  {
    date: "Jan 1",
    Actual: 45,
    Goal: 33,
  },
  {
    date: "Jan 2",
    Actual: 90,
    Goal: 66,
  },
  {
    date: "Jan 4",
    Actual: 100,
    Goal: 99,
  },
  {
    date: "Jan 5",
    Actual: 100,
    Goal: 134,
  },
  {
    date: "Jan 6",
    Actual: 145,
    Goal: 167,
  },
  {
    date: "Jan 7",

    Goal: 200,
  },
];

export function HabitLineChart({ records, habit }: HabitLineChart) {
  // console.log('records is: ', records)

  let runningTotal = 0;
  let runningGoalTotal = 0;

  // need to add all the blank dates back into the array

  // reverse the records, so they count up
  const reversedRecords = records.slice().reverse();

  const data = reversedRecords.map((item, index) => {
    runningTotal += item.pushups;
    runningGoalTotal += 10000 / 365;
    return {
      date: item.date.slice(0, item.date.length - 5),
      Actual: runningTotal,
      Goal: runningGoalTotal,
    };
  });

  // console.log('data is: ', data)

  return (
    <>
      <H2>Pushups</H2>
      <LineChart
        h={300}
        data={data}
        dataKey="date"
        withTooltip={false}
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
