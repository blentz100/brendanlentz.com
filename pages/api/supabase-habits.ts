import type { NextApiRequest, NextApiResponse } from "next";
import {fetchHabitsByYear} from "../../lib/fetchHabits";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { year } = req.query;
  if (!year) return res.status(400).json({ error: "Missing year" });

  try {
    const habits = await fetchHabitsByYear(year);
    res.status(200).json({ success: true, habits });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}
