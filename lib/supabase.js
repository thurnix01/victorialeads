import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://vshfmixqgazkdagmmgud.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzaGZtaXhxZ2F6a2RhZ21tZ3VkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3ODU0NzEsImV4cCI6MjA4OTM2MTQ3MX0.KWUIoqRFMZ2cu3NSwVkZmrvIfD-qUx3qogwuTyUuYEI";

export const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

