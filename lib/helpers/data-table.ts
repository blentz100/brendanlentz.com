import { RecordType } from "../../pages";

// add this type to strip out things we don't want to count from the records,
// so the reduce function works well and doesn't throw TS errors because we
// have an object with both strings and number when we try to do math on them
type CountableHabits = Omit<RecordType, "date" | "dateAsNumber">;

// Solved TypeScript issues using this as a guide
// https://stackoverflow.com/questions/62438346/how-to-dynamically-access-object-property-in-typescript
// You can't just use the habit variable to index the currentValue object.
// TypeScript doesn't allow that
export function returnTotal(records: RecordType[], habit: keyof CountableHabits) {
  return records?.reduce((accumulator, currentValue) => {
    return accumulator + currentValue[habit];
  }, 0);
}

export function returnTotalPercentage(records: RecordType[], habit: keyof CountableHabits, goal: number) {
  return Math.min(
    Math.floor(
      (records?.reduce((accumulator, currentValue) => {
        return accumulator + currentValue[habit];
      }, 0) /
        goal) *
        100
    ),
    100
  );
}
