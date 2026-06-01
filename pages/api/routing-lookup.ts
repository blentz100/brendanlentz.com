import type { NextApiRequest, NextApiResponse } from "next";

// In production this would query a licensed ABA routing number database
// (e.g. the Fed's EPaymentsDirectory or a provider like Plaid/Stripe).
const ROUTING_DB: Record<string, string> = {
  // JPMorgan Chase
  "021000021": "JPMorgan Chase",
  "322271627": "JPMorgan Chase",
  "071000013": "JPMorgan Chase",
  "044000037": "JPMorgan Chase",
  // Bank of America
  "026009593": "Bank of America",
  "121000358": "Bank of America",
  "063100277": "Bank of America",
  // Wells Fargo
  "121042882": "Wells Fargo",
  "102000076": "Wells Fargo",
  "091400046": "Wells Fargo",
  // Citibank
  "021000089": "Citibank",
  "321171184": "Citibank",
  // U.S. Bank
  "091000022": "U.S. Bank",
  "123103729": "U.S. Bank",
  // PNC Bank
  "043000096": "PNC Bank",
  "031100089": "PNC Bank",
  // Capital One
  "056073612": "Capital One",
  "255071981": "Capital One",
  // TD Bank
  "031101266": "TD Bank",
  "036001808": "TD Bank",
  // Truist
  "053101121": "Truist",
  "061000104": "Truist",
  // Regions Bank
  "062000019": "Regions Bank",
  // KeyBank
  "041001039": "KeyBank",
  // Demo fictional bank
  "123456780": "First National Bank",
};

type SuccessData = { name: string; code: number; message: string };
type ErrorData = { error: string };

export default function handler(req: NextApiRequest, res: NextApiResponse<SuccessData | ErrorData>) {
  const { rtn } = req.query;

  if (typeof rtn !== "string" || !/^\d{9}$/.test(rtn)) {
    return res.status(400).json({ error: "Invalid routing number format" });
  }

  const name = ROUTING_DB[rtn];
  res.setHeader("Cache-Control", "public, max-age=86400");

  if (name) {
    return res.status(200).json({ name, code: 200, message: "OK" });
  }

  return res.status(200).json({ name: "", code: 404, message: "Not found" });
}
