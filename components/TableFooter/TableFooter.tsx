import { Center, RingProgress, Table, Text } from "@mantine/core";

interface Props {
  total: number;
  totalPercentage: number;
  habit: string;
  goal: number;
}

export const TableFooter: React.FC<Props> = ({ total, totalPercentage, habit, goal }) => {
  console.log("habit, totalPercentage ", habit, " ", totalPercentage);

  // @ts-ignore
  return (
    <>
      <Table>
        <tbody>
          <tr key={0}>
            <td>
              <Text align={"left"}>Total </Text>
            </td>
            <td>
              <Text align={"right"}>{Intl.NumberFormat().format(total)}</Text>
            </td>
          </tr>
          <tr key={1}>
            <td>
              <Text align={"left"}>Goal </Text>
            </td>
            <td>
              <Text align={"right"}>{Intl.NumberFormat().format(goal)}</Text>
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
