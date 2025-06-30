import {supabase} from "./supabaseClient";
import { DateTime } from "luxon";

const USER_ID = "5fd69df8-7dac-4f02-87e0-2a2a2114b20a";

// Map habit names to display names
const HABIT_NAMES = [
    "Pushups",
    "Pullups",
    "Situps",
    "Jumping Jacks",
    "Stair Climbing",
];

const HABIT_NAME_TO_KEY: Record<string, string> = {
    "Pushups": "pushups",
    "Pullups": "pullups",
    "Situps": "situps",
    "Jumping Jacks": "jacks",
    "Stair Climbing": "stairs",
};

export async function fetchHabitsByYear(year: string){
    // 1. Get all habits for this user that match the names
    const { data: habits, error: habitsError } = await supabase
        .from("habits")
        .select("id, name")
        .eq("user_id", USER_ID)
        .in("name", HABIT_NAMES);

    if (habitsError) {
        console.error({ error: habitsError.message });
        return;
    }
    if (!habits) {
        console.error({ error: "No habits found" });
        return;
    }

    // Map habit name to id
    const habitNameToId: Record<string, string> = {};
    habits.forEach((h) => {
        habitNameToId[h.name] = h.id;
    });
    const habitIds = Object.values(habitNameToId);

    // 2. Get all habit_entries for these habits in the given year, joining habits to get user_id
    const startDate = DateTime.local(Number(year), 1, 1).toISODate();
    const endDate = DateTime.local(Number(year), 12, 31).toISODate();
    const { data: entries, error: entriesError } = await supabase
        .from("habit_entries")
        .select("habit_id, value, date, habits!inner(id, user_id)")
        .in("habit_id", habitIds)
        .gte("date", startDate)
        .lte("date", endDate)
        .eq("habits.user_id", USER_ID);


    if (entriesError) {
        console.error({ error: entriesError.message });
        return
    }
    if (!entries) {
        console.error({ error: "No entries found" });
        return
    }

    // 3. Build a map: date -> { habit: value, ... }
    const dateMap: Record<string, any> = {};
    for (const entry of entries) {
        // Find the habit name for this entry
        const habitName = Object.keys(habitNameToId).find(
            (name) => habitNameToId[name] === entry.habit_id
        );
        if (!habitName) continue;
        if (!dateMap[entry.date]) {
            // Initialize with default values for all habits
            dateMap[entry.date] = {
                date: entry.date,
                dateAsNumber: DateTime.fromISO(entry.date).toMillis(),
                pushups: 0,
                pullups: 0,
                situps: 0,
                jacks: 0,
                stairs: 0,
                meditation: 0 // Include meditation field from RecordType
            };
        }
        // Use the mapped key for the frontend
        const key = HABIT_NAME_TO_KEY[habitName];
        dateMap[entry.date][key] = Number(entry.value);
    }

    // 4. Convert map to sorted array (descending by date)
    const dataArray = Object.values(dateMap).sort((a, b) => (a.date < b.date ? 1 : -1));


    return dataArray;
}