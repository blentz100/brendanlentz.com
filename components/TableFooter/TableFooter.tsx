import { Center, RingProgress, Text } from "@mantine/core";

interface Props {
  total: number;
  totalPercentage: number;
  habit: string;
  goal: number;
}

export const TableFooter: React.FC<Props> = ({ total, totalPercentage, habit, goal }) => {
  return (
    <>
      <Center>
        <RingProgress
          roundCaps
          thickness={7}
          size={80}
          sections={[
            {
              value: totalPercentage,
              color: "blue",
              tooltip: `${total} ${habit} completed`,
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
      <Text>Goal: {Intl.NumberFormat().format(goal)}</Text>
    </>
  );
};
