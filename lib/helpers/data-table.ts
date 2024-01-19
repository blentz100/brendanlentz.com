import { RecordType } from "../../pages";

// Solved TypeScript issues using this as a guide
// https://stackoverflow.com/questions/62438346/how-to-dynamically-access-object-property-in-typescript
// You can't just use the habit variable to index the currentValue object.
// TypeScript doesn't allow that
export function returnTotal(records: RecordType[], habit: string) {
  return records?.reduce((accumulator, currentValue) => {
    return accumulator + (currentValue[habit as keyof typeof currentValue] as number);
  }, 0);
}

export function returnTotalPercentage(records: RecordType[], habit: string, goal: number) {
  return Math.min(
    Math.floor(
      (records?.reduce((accumulator, currentValue) => {
        return accumulator + (currentValue[habit as keyof typeof currentValue] as number);
      }, 0) /
        goal) *
        100
    ),
    100
  );
}
