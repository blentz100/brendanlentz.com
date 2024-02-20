import { Center, RingProgress, Table, Text } from "@mantine/core";

interface TableFooterProps {
  total: number;
  totalPercentage: number;
  habit: string;
  goal: number;
  topLabel?: string;
  bottomLabel?: string;
}

const TableFooter = ({
  total,
  totalPercentage,
  habit,
  goal,
  topLabel = "Total",
  bottomLabel = "Goal",
}: TableFooterProps) => {
  return (
    <>
      <Table>
        <tbody>
          <tr key={0}>
            <td>
              <Text ta={"left"}>{topLabel}</Text>
            </td>
            <td>
              <Text ta={"right"}>{Intl.NumberFormat().format(total)}</Text>
            </td>
          </tr>
          <tr key={1}>
            <td>
              <Text ta={"left"}>{bottomLabel}</Text>
            </td>
            <td>
              <Text ta={"right"}>{Intl.NumberFormat().format(goal)}</Text>
            </td>
          </tr>
        </tbody>
      </Table>
      <Center>
        <RingProgress
          thickness={7}
          size={80}
          sections={[
            {
              value: totalPercentage,
              color: "blue",
              tooltip: `${total} ${habit} completed`,
            },
            {
              value: totalPercentage > 100 ? 0 : 100 - totalPercentage,
              color: "lightgrey",
              tooltip: `${goal - total} ${habit} to go`,
            },
          ]}
          label={
            <Center>
              <Text size="m" fw={700} ta="center">
                {totalPercentage}%
              </Text>
            </Center>
          }
        ></RingProgress>
      </Center>
    </>
  );
};

export default TableFooter;
