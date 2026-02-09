import type { NextApiRequest, NextApiResponse } from "next";
import { supabaseAdmin } from "../../lib/supabaseAdmin"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
  if (req.method !== "POST"){
    return res.status(405).json({ error: "Method not allowed,,,,,," })
  }
  const { slug } = req.body;

  if(!slug || typeof slug !== "string"){
    return res.status(400).json({error: "Invalid slug"});
  }

  const { data, error } = await supabaseAdmin.rpc(
      "increment_page_hits",
      { page_slug: slug }
  )

  if(error){
    console.error("Failed to increment page hits: ", error);
    return res.status(500).json({error: "Failed to increment page hits"})
  }

  return res.status(200).json({hits: data})
}
