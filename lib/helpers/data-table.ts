export function returnTotal(records: any[] | undefined, habit: string) {
  return records?.reduce((accumulator, currentValue) => {
    return accumulator + currentValue[habit];
  }, 0);
}

export function returnTotalPercentage(records: any[] | undefined, habit: string, goal: number) {
  return Math.floor(
    (records?.reduce((accumulator, currentValue) => {
      return accumulator + currentValue[habit];
    }, 0) /
      goal) *
      100
  );
}
