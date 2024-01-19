import { RecordType } from "../../pages";

// add this type to strip out the dates from the records, so the reduce
// function works well and doesn't throw TS errors because we have an object
// with both strings and number when we try to do math on them
type RecordTypeStrings = Omit<RecordType, "date">;

// Solved TypeScript issues using this as a guide
// https://stackoverflow.com/questions/62438346/how-to-dynamically-access-object-property-in-typescript
// You can't just use the habit variable to index the currentValue object.
// TypeScript doesn't allow that
export function returnTotal(records: RecordTypeStrings[], habit: string) {
  return records?.reduce((accumulator, currentValue) => {
    return accumulator + currentValue[habit as keyof typeof currentValue];
  }, 0);
}

export function returnTotalPercentage(records: RecordTypeStrings[], habit: string, goal: number) {
  return Math.min(
    Math.floor(
      (records?.reduce((accumulator, currentValue) => {
        return accumulator + currentValue[habit as keyof typeof currentValue];
      }, 0) /
        goal) *
        100
    ),
    100
  );
}
