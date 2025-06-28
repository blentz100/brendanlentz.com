import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../lib/supabaseClient";
import { DateTime } from "luxon";

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

const USER_ID = "5fd69df8-7dac-4f02-87e0-2a2a2114b20a";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { year } = req.query;
  if (!year) return res.status(400).json({ error: "Missing year" });


  // 1. Get all habits for this user that match the names
  const { data: habits, error: habitsError } = await supabase
    .from("habits")
    .select("id, name")
    .eq("user_id", USER_ID)
    .in("name", HABIT_NAMES);

  if (habitsError) return res.status(500).json({ error: habitsError.message });
  if (!habits) return res.status(404).json({ error: "No habits found" });

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


  if (entriesError) return res.status(500).json({ error: entriesError.message });
  if (!entries) return res.status(404).json({ error: "No entries found" });

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

  return res.status(200).json({ dataArray, success: true });
}
