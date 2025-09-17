import { useEffect, useState } from "react";
import { DataTable } from "mantine-datatable";
import { sortBy } from "lodash";
import { Badge, Container } from "@mantine/core";
import TableFooter from "../TableFooter/TableFooter";
import { returnTotal, returnTotalPercentage } from "../../lib/helpers/data-table";
import { RecordType } from "../../pages";
import { Tabs } from "@mantine/core";
import { DateTime } from "luxon";
import { goals2025 } from "../../lib/config/goals";
import type { DataTableColumn, DataTableSortStatus } from "mantine-datatable";

interface HabitTrackerProps {
  initialRecords2025: RecordType[];
  initialRecords2024: RecordType[];
  initialRecords2023: RecordType[];
}

export function HabitTrackerTable({ initialRecords2025, initialRecords2024, initialRecords2023 }: HabitTrackerProps) {
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<RecordType>>({
    columnAccessor: "dateAsNumber",
    direction: "desc",
  });

  const [habitRecords2024, setHabitRecords2024] = useState<RecordType[]>(initialRecords2024);
  const [habitRecords2025, setHabitRecords2025] = useState<RecordType[]>(initialRecords2025);
  const [habitRecords2023, setHabitRecords2023] = useState<RecordType[]>(initialRecords2023);

  // Fetch habit data for all years
  useEffect(() => {
    const fetchAllYears = async () => {
      try {
        const [response2025, response2024, response2023] = await Promise.all([
          fetch("/api/supabase-habits?year=2025"),
          fetch("/api/supabase-habits?year=2024"),
          fetch("/api/supabase-habits?year=2023")
        ]);

        const [data2025, data2024, data2023] = await Promise.all([
          response2025.json(),
          response2024.json(),
          response2023.json()
        ]);

        if (data2025 && data2025.dataArray) {
          setHabitRecords2025(data2025.dataArray);
        }
        if (data2024 && data2024.dataArray) {
          setHabitRecords2024(data2024.dataArray);
        }
        if (data2023 && data2023.dataArray) {
          setHabitRecords2023(data2023.dataArray);
        }
      } catch (error) {
        console.error("Error fetching habit data:", error);
      }
    };

    fetchAllYears();
  }, []);

  // Create a single function to generate columns for any year
  const createColumns = (year: number, records: RecordType[]): DataTableColumn<RecordType>[] => {
    const goals = year === 2025 ? goals2025 :
                  year === 2024 ? { pushups: 10000, situps: 7000, jacks: 14000, stairs: 200, pullups: 600 } :
                  { pushups: 10000, situps: 3000, jacks: 6000, stairs: 200, pullups: 400 };

    const daysInYear = DateTime.local(year).daysInYear;
    const currentDay = year === 2025 ? DateTime.now().ordinal : daysInYear;

    return [
      {
        accessor: "dateAsNumber",
        title: "Date",
        sortable: true,
        width: 160,
        render: (item) => (
          <div>
            {item.date}
            {item.date === new Date().toISOString().split('T')[0] ? (
              <Badge size="xs" color="blue" ml={10}>
                {" "}Today{" "}
              </Badge>
            ) : null}
          </div>
        ),
        footer: (
          <TableFooter
            total={currentDay || 0}
            habit="days"
            goal={daysInYear || 0}
            totalPercentage={Math.floor((currentDay / daysInYear) * 100) || 0}
            topLabel={"Day #"}
            bottomLabel={"of"}
          />
        ),
      },
      {
        accessor: "pushups",
        sortable: true,
        textAlign: "center",
        footer: (
          <TableFooter
            total={returnTotal(records, "pushups") || 0}
            habit="pushups"
            goal={goals.pushups}
            totalPercentage={returnTotalPercentage(records, "pushups", goals.pushups) || 0}
          />
        ),
      },
      {
        accessor: "situps",
        sortable: true,
        textAlign: "center",
        footer: (
          <TableFooter
            total={returnTotal(records, "situps") || 0}
            habit="situps"
            goal={goals.situps}
            totalPercentage={returnTotalPercentage(records, "situps", goals.situps) || 0}
          />
        ),
      },
      {
        accessor: "jacks",
        sortable: true,
        textAlign: "center",
        title: "Jumping Jacks",
        footer: (
          <TableFooter
            total={returnTotal(records, "jacks") || 0}
            habit="jacks"
            goal={goals.jacks}
            totalPercentage={returnTotalPercentage(records, "jacks", goals.jacks) || 0}
          />
        ),
      },
      {
        accessor: "stairs",
        sortable: true,
        textAlign: "center",
        footer: (
          <TableFooter
            total={returnTotal(records, "stairs") || 0}
            habit="stairs"
            goal={goals.stairs}
            totalPercentage={returnTotalPercentage(records, "stairs", goals.stairs) || 0}
          />
        ),
      },
      {
        accessor: "pullups",
        sortable: true,
        textAlign: "center",
        footer: (
          <TableFooter
            total={returnTotal(records, "pullups") || 0}
            habit="pullups"
            goal={goals.pullups}
            totalPercentage={returnTotalPercentage(records, "pullups", goals.pullups) || 0}
          />
        ),
      },
    ];
  };

  // Function to sort records based on current sort status
  const getSortedRecords = (records: RecordType[]): RecordType[] => {
    if (!sortStatus.columnAccessor) return records;

    const sorted = sortBy(records, [sortStatus.columnAccessor]);
    return sortStatus.direction === "desc" ? sorted.reverse() : sorted;
  };

  return (
    <Container mt={50}>
      <Tabs variant="outline" defaultValue="2025">
        <Tabs.List>
          <Tabs.Tab value="2025">2025</Tabs.Tab>
          <Tabs.Tab value="2024">2024</Tabs.Tab>
          <Tabs.Tab value="2023">2023</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="2025" pt="xs">
        <DataTable<RecordType>
            columns={createColumns(2025, habitRecords2025)}
            records={getSortedRecords(habitRecords2025)}
            withTableBorder
            striped
            height={500}
            highlightOnHover
            scrollAreaProps={{ type: "never" }}
            sortStatus={sortStatus}
            onSortStatusChange={status => setSortStatus(status)}
            idAccessor={"date"}
          />
        </Tabs.Panel>
        <Tabs.Panel value="2024" pt="xs">
          <DataTable<RecordType>
            columns={createColumns(2024, habitRecords2024)}
            records={getSortedRecords(habitRecords2024)}
            withTableBorder
            striped
            height={500}
            highlightOnHover
            scrollAreaProps={{ type: "never" }}
            sortStatus={sortStatus}
            onSortStatusChange={status => setSortStatus(status)}
            idAccessor={"date"}
          />
        </Tabs.Panel>
        <Tabs.Panel value="2023" pt="xs">
          <DataTable<RecordType>
            columns={createColumns(2023, habitRecords2023)}
            records={getSortedRecords(habitRecords2023)}
            withTableBorder
            striped
            height={500}
            highlightOnHover
            scrollAreaProps={{ type: "never" }}
            sortStatus={sortStatus}
            onSortStatusChange={status => setSortStatus(status)}
            idAccessor={"date"}
          />
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
}

export default HabitTrackerTable;
