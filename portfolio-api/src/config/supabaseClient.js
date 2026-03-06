import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({
  path:
    process.env.NODE.ENV === "production"
      ? ".env.production"
      : ".env.development",
});

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
