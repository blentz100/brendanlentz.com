import { useEffect, useState } from "react";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { sortBy } from "lodash";
import { Badge, Container } from "@mantine/core";
import TableFooter from "../TableFooter/TableFooter";
import { returnTotal, returnTotalPercentage } from "../../lib/helpers/data-table";
import { RecordType } from "../../pages";
import { Tabs } from "@mantine/core";
import { DateTime } from "luxon";
import { goals2025 } from "../../lib/config/goals";

interface HabitTrackerProps {
  staticRecords2025: RecordType[];
  staticRecords2024: RecordType[];
  staticRecords2023: RecordType[];
}

export function HabitTrackerTable({ staticRecords2025, staticRecords2024, staticRecords2023 }: HabitTrackerProps) {
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: "dateAsNumber",
    direction: "desc",
  });

  const [records2025, setRecords2025] = useState<RecordType[]>(staticRecords2025);
  const [records2024, setRecords2024] = useState<RecordType[]>(staticRecords2024);
  const [records2023, setRecords2023] = useState<RecordType[]>(staticRecords2023);

  // 2025 sort functionality
  useEffect(() => {
    const data = sortBy(staticRecords2025, sortStatus.columnAccessor);
    setRecords2025(sortStatus.direction === "desc" ? data.reverse() : data);
  }, [sortStatus, staticRecords2025]);

  // 2024 sort functionality
  useEffect(() => {
    const data = sortBy(staticRecords2024, sortStatus.columnAccessor);
    setRecords2024(sortStatus.direction === "desc" ? data.reverse() : data);
  }, [sortStatus, staticRecords2024]);

  // 2023 sort functionality
  useEffect(() => {
    const data = sortBy(staticRecords2023, sortStatus.columnAccessor);
    setRecords2023(sortStatus.direction === "desc" ? data.reverse() : data);
  }, [sortStatus, staticRecords2023]);

  return (
    <Container mt={50}>
      <Tabs variant="outline" defaultValue="2025">
        <Tabs.List>
          <Tabs.Tab value="2025">2025</Tabs.Tab>
          <Tabs.Tab value="2024">2024</Tabs.Tab>
          <Tabs.Tab value="2023">2023</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="2025" pt="xs">
          <DataTable
            columns={[
              {
                accessor: "dateAsNumber",
                title: "Date",
                sortable: true,
                width: 150,
                render: (item) => (
                  <div>
                    <>
                      {item.date}
                      {item.date === new Date().toLocaleDateString() ? (
                        <Badge size="xs" color="blue" ml={10}>
                          {" "}
                          Today{" "}
                        </Badge>
                      ) : null}
                    </>
                  </div>
                ),
                footer: (
                  <TableFooter
                    total={DateTime.now().ordinal}
                    habit="days"
                    goal={DateTime.local(2025).daysInYear}
                    totalPercentage={Math.floor((DateTime.now().ordinal / 365) * 100)}
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
                    total={returnTotal(records2025, "pushups")}
                    habit="pushups"
                    goal={goals2025.pushups}
                    totalPercentage={returnTotalPercentage(records2025, "pushups", goals2025.pushups)}
                  />
                ),
              },
              {
                accessor: "situps",
                sortable: true,
                textAlign: "center",
                footer: (
                  <TableFooter
                    total={returnTotal(records2025, "situps")}
                    habit="situps"
                    goal={goals2025.situps}
                    totalPercentage={returnTotalPercentage(records2025, "situps", goals2025.situps)}
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
                    total={returnTotal(records2025, "jacks")}
                    habit="jacks"
                    goal={goals2025.jacks}
                    totalPercentage={returnTotalPercentage(records2025, "jacks", goals2025.jacks)}
                  />
                ),
              },
              {
                accessor: "stairs",
                sortable: true,
                textAlign: "center",
                footer: (
                  <TableFooter
                    total={returnTotal(records2025, "stairs")}
                    habit="stairs"
                    goal={goals2025.stairs}
                    totalPercentage={returnTotalPercentage(records2025, "stairs", goals2025.stairs)}
                  />
                ),
              },
              {
                accessor: "pullups",
                sortable: true,
                textAlign: "center",
                footer: (
                  <TableFooter
                    total={returnTotal(records2025, "pullups")}
                    habit="pullups"
                    goal={goals2025.pullups}
                    totalPercentage={returnTotalPercentage(records2025, "pullups", goals2025.pullups)}
                  />
                ),
              },
            ]}
            records={records2025}
            withTableBorder
            striped
            height={500}
            highlightOnHover
            scrollAreaProps={{ type: "never" }}
            sortStatus={sortStatus}
            onSortStatusChange={setSortStatus}
            idAccessor={"date"}
          />
        </Tabs.Panel>
        <Tabs.Panel value="2024" pt="xs">
          <DataTable
            columns={[
              {
                accessor: "dateAsNumber",
                title: "Date",
                sortable: true,
                width: 150,
                render: (item) => (
                  <div>
                    <>
                      {item.date}
                      {item.date === new Date().toLocaleDateString() ? (
                        <Badge size="xs" color="blue" ml={10}>
                          {" "}
                          Today{" "}
                        </Badge>
                      ) : null}
                    </>
                  </div>
                ),
                footer: (
                  <TableFooter
                    total={DateTime.local(2024).daysInYear}
                    habit="days"
                    goal={DateTime.local(2024).daysInYear}
                    totalPercentage={Math.floor(
                      (DateTime.local(2024).daysInYear / DateTime.local(2024).daysInYear) * 100
                    )}
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
                    total={returnTotal(records2024, "pushups")}
                    habit="pushups"
                    goal={10000}
                    totalPercentage={returnTotalPercentage(records2024, "pushups", 10000)}
                  />
                ),
              },
              {
                accessor: "situps",
                sortable: true,
                textAlign: "center",
                footer: (
                  <TableFooter
                    total={returnTotal(records2024, "situps")}
                    habit="situps"
                    goal={7000}
                    totalPercentage={returnTotalPercentage(records2024, "situps", 7000)}
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
                    total={returnTotal(records2024, "jacks")}
                    habit="jacks"
                    goal={14000}
                    totalPercentage={returnTotalPercentage(records2024, "jacks", 14000)}
                  />
                ),
              },
              {
                accessor: "stairs",
                sortable: true,
                textAlign: "center",
                footer: (
                  <TableFooter
                    total={returnTotal(records2024, "stairs")}
                    habit="stairs"
                    goal={200}
                    totalPercentage={returnTotalPercentage(records2024, "stairs", 200)}
                  />
                ),
              },
              {
                accessor: "pullups",
                sortable: true,
                textAlign: "center",
                footer: (
                  <TableFooter
                    total={returnTotal(records2024, "pullups")}
                    habit="pullups"
                    goal={600}
                    totalPercentage={returnTotalPercentage(records2024, "pullups", 600)}
                  />
                ),
              },
            ]}
            records={records2024}
            withTableBorder
            striped
            height={500}
            highlightOnHover
            scrollAreaProps={{ type: "never" }}
            sortStatus={sortStatus}
            onSortStatusChange={setSortStatus}
            idAccessor={"date"}
          />
        </Tabs.Panel>
        <Tabs.Panel value="2023" pt="xs">
          <DataTable
            columns={[
              {
                accessor: "dateAsNumber",
                title: "Date",
                sortable: true,
                width: 150,
                render: (item) => (
                  <>
                    {item.date}
                    {item.date === new Date().toLocaleDateString() ? <Badge color="blue"> Today </Badge> : null}
                  </>
                ),
                footer: (
                  <TableFooter
                    total={DateTime.local(2023).daysInYear}
                    habit="days"
                    goal={DateTime.local(2023).daysInYear}
                    totalPercentage={Math.floor(
                      (DateTime.local(2023).daysInYear / DateTime.local(2023).daysInYear) * 100
                    )}
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
                    total={returnTotal(records2023, "pushups")}
                    habit="pushups"
                    goal={10000}
                    totalPercentage={returnTotalPercentage(records2023, "pushups", 10000)}
                  />
                ),
              },
              {
                accessor: "situps",
                sortable: true,
                textAlign: "center",
                footer: (
                  <TableFooter
                    total={returnTotal(records2023, "situps")}
                    habit="situps"
                    goal={3000}
                    totalPercentage={returnTotalPercentage(records2023, "situps", 3000)}
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
                    total={returnTotal(records2023, "jacks")}
                    habit="jacks"
                    goal={6000}
                    totalPercentage={returnTotalPercentage(records2023, "jacks", 6000)}
                  />
                ),
              },
              {
                accessor: "stairs",
                sortable: true,
                textAlign: "center",
                footer: (
                  <TableFooter
                    total={returnTotal(records2023, "stairs")}
                    habit="stairs"
                    goal={200}
                    totalPercentage={returnTotalPercentage(records2023, "stairs", 200)}
                  />
                ),
              },
              {
                accessor: "pullups",
                sortable: true,
                textAlign: "center",
                footer: (
                  <TableFooter
                    total={returnTotal(records2023, "pullups")}
                    habit="pullups"
                    goal={400}
                    totalPercentage={returnTotalPercentage(records2023, "pullups", 400)}
                  />
                ),
              },
            ]}
            records={records2023}
            withTableBorder
            striped
            height={500}
            highlightOnHover
            scrollAreaProps={{ type: "never" }}
            sortStatus={sortStatus}
            onSortStatusChange={setSortStatus}
            idAccessor={"date"}
          />
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
}

export default HabitTrackerTable;
