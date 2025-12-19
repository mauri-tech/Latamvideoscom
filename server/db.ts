import { createClient } from '@supabase/supabase-js';

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  console.warn(
    "Supabase credentials not set. Falling back to in-memory storage.",
  );
}

export const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_KEY || ""
);