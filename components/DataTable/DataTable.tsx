import { useEffect, useState } from "react";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { sortBy } from "lodash";
import { Badge, Container } from "@mantine/core";
import { TableFooter } from "../TableFooter/TableFooter";
import { returnTotal, returnTotalPercentage } from "../../lib/helpers/data-table";
import { RecordType } from "../../pages";
import { Tabs } from "@mantine/core";
import { Temporal } from "@js-temporal/polyfill";

interface HabitTrackerProps {
  staticRecords2024: RecordType[];
  staticRecords2023: RecordType[];
}

export function HabitTrackerTable({ staticRecords2024, staticRecords2023 }: HabitTrackerProps) {
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: "dateAsNumber",
    direction: "desc",
  });

  const [records2024, setRecords2024] = useState<RecordType[]>(staticRecords2024);
  const [records2023, setRecords2023] = useState<RecordType[]>(staticRecords2023);

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
    <Container>
      <Tabs variant="outline" defaultValue="2024">
        <Tabs.List>
          <Tabs.Tab value="2024">2024</Tabs.Tab>
          <Tabs.Tab value="2023">2023</Tabs.Tab>
        </Tabs.List>
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
                    {item.date}
                    {item.date === new Date().toLocaleDateString() ? (
                      <Badge size="xs" color="blue">
                        {" "}
                        Today{" "}
                      </Badge>
                    ) : null}
                  </div>
                ),
                footer: (
                  <TableFooter
                    total={Temporal.Now.plainDateISO().dayOfYear}
                    habit="days"
                    goal={Temporal.Now.plainDateISO().daysInYear}
                    totalPercentage={Math.floor((15 / 365) * 100)}
                    topLabel={"Day #"}
                    bottomLabel={"of"}
                  />
                ),
              },
              {
                accessor: "pushups",
                sortable: true,
                textAlignment: "center",
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
                textAlignment: "center",
                footer: (
                  <TableFooter
                    total={returnTotal(records2024, "situps")}
                    habit="situps"
                    goal={3000}
                    totalPercentage={returnTotalPercentage(records2024, "situps", 3000)}
                  />
                ),
              },
              {
                accessor: "jacks",
                sortable: true,
                textAlignment: "center",
                title: "Jumping Jacks",
                footer: (
                  <TableFooter
                    total={returnTotal(records2024, "jacks")}
                    habit="jacks"
                    goal={6000}
                    totalPercentage={returnTotalPercentage(records2024, "jacks", 6000)}
                  />
                ),
              },
              {
                accessor: "stairs",
                sortable: true,
                textAlignment: "center",
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
                textAlignment: "center",
                footer: (
                  <TableFooter
                    total={returnTotal(records2024, "pullups")}
                    habit="pullups"
                    goal={400}
                    totalPercentage={returnTotalPercentage(records2024, "pullups", 400)}
                  />
                ),
              },
            ]}
            records={records2024}
            withBorder
            striped
            height={500}
            highlightOnHover
            scrollAreaProps={{ type: "always" }}
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
                  <div>
                    {item.date}
                    {item.date === new Date().toLocaleDateString() ? <Badge color="blue"> Today </Badge> : null}
                  </div>
                ),
                footer: (
                  <TableFooter
                    total={365}
                    habit="days"
                    goal={Temporal.Now.plainDateISO().daysInYear}
                    totalPercentage={Math.floor((365 / 365) * 100)}
                    topLabel={"Day #"}
                    bottomLabel={"of"}
                  />
                ),
              },
              {
                accessor: "pushups",
                sortable: true,
                textAlignment: "center",
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
                textAlignment: "center",
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
                textAlignment: "center",
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
                textAlignment: "center",
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
                textAlignment: "center",
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
            withBorder
            striped
            height={500}
            highlightOnHover
            scrollAreaProps={{ type: "always" }}
            sortStatus={sortStatus}
            onSortStatusChange={setSortStatus}
            idAccessor={"date"}
          />
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
}

export default DataTable;
