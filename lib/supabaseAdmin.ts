// This client is used for incrementing the hit counter table on supabase

import { createClient } from "@supabase/supabase-js"

export const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)