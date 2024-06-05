import { google } from "googleapis";
import { NextApiRequest, NextApiResponse } from "next";
import { RecordType } from "../index";
import { DateTime } from "luxon";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // new Google Auth Method
  const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
  const { year } = req.query;
  const { privateKey } = JSON.parse(process.env.GOOGLE_PRIVATE_KEY || "{ privateKey: null }");
  const auth = new google.auth.GoogleAuth({
    scopes: SCOPES,
    projectId: process.env.GOOGLE_PROJECTID,
    credentials: {
      private_key: privateKey,
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
    },
  });

  const sheets = google.sheets({ version: "v4", auth });
  const range = `Habits${year}!A8:G372`; // the habit data

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range,
  });

  // transform data into an array of objects
  const dataArray = response.data.values?.map<RecordType>((item) => {
    return {
      date: item[0],
      dateAsNumber: new Date(item[0]).getTime(), // helper property, make sorting by date easier
      meditation: parseInt(item[1], 10),
      pushups: parseInt(item[2], 10),
      situps: parseInt(item[3], 10),
      jacks: parseInt(item[4], 10),
      stairs: parseInt(item[5], 10),
      pullups: parseInt(item[6], 10),
    };
  });

  // filter out future dates from the spreadsheet and reverse it
  const now = DateTime.now();
  const dataArrayFiltered = dataArray
    ?.filter((item) => {
      return now > DateTime.fromFormat(item.date, "D");
    })
    .reverse();

  // return the results to the caller on the frontend
  return res.status(200).json({ dataArrayFiltered, success: true });
}
