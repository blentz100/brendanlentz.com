import { useEffect, useState } from "react";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { sortBy } from "lodash";
import { Badge, Container } from "@mantine/core";
import { TableFooter } from "../TableFooter/TableFooter";
import { returnTotal, returnTotalPercentage } from "../../lib/helpers/data-table";
import { RecordType } from "../../pages";

interface HabitTrackerProps {
  staticRecords: RecordType[];
}

export function HabitTrackerTable({ staticRecords }: HabitTrackerProps) {
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: "dateAsNumber",
    direction: "desc",
  });
  const [records, setRecords] = useState<RecordType[]>(staticRecords);

  // sort functionality
  useEffect(() => {
    const data = sortBy(records, sortStatus.columnAccessor);
    setRecords(sortStatus.direction === "desc" ? data.reverse() : data);
  }, [sortStatus]);

  return (
    <article>
      <Container mt={20} ml={-15}>
        <DataTable
          columns={[
            {
              accessor: "dateAsNumber",
              title: "Date",
              sortable: true,
              footer: <>Progress</>,
              render: (item) => (
                <div>
                  {item.date}
                  {item.date === new Date().toLocaleDateString() ? <Badge color="blue"> Today </Badge> : null}
                </div>
              ),
            },
            {
              accessor: "pushups",
              sortable: true,
              textAlignment: "center",
              footer: (
                <TableFooter
                  total={returnTotal(records, "pushups")}
                  habit="pushups"
                  goal={10000}
                  totalPercentage={returnTotalPercentage(records, "pushups", 10000)}
                />
              ),
            },
            {
              accessor: "situps",
              sortable: true,
              textAlignment: "center",
              footer: (
                <TableFooter
                  total={returnTotal(records, "situps")}
                  habit="situps"
                  goal={3000}
                  totalPercentage={returnTotalPercentage(records, "situps", 3000)}
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
                  total={returnTotal(records, "jacks")}
                  habit="jacks"
                  goal={6000}
                  totalPercentage={returnTotalPercentage(records, "jacks", 6000)}
                />
              ),
            },
            {
              accessor: "stairs",
              sortable: true,
              textAlignment: "center",
              footer: (
                <TableFooter
                  total={returnTotal(records, "stairs")}
                  habit="stairs"
                  goal={200}
                  totalPercentage={returnTotalPercentage(records, "stairs", 200)}
                />
              ),
            },
            {
              accessor: "pullups",
              sortable: true,
              textAlignment: "center",
              footer: (
                <TableFooter
                  total={returnTotal(records, "pullups")}
                  habit="pullups"
                  goal={400}
                  totalPercentage={returnTotalPercentage(records, "pullups", 400)}
                />
              ),
            },
          ]}
          records={records}
          withBorder
          striped
          height={500}
          highlightOnHover
          scrollAreaProps={{ type: "always" }}
          sortStatus={sortStatus}
          onSortStatusChange={setSortStatus}
          idAccessor={"date"}
        />
        {/* <figcaption><i>updated: {lastEditedDate}</i></figcaption> */}
      </Container>
    </article>
  );
}

export default DataTable;
