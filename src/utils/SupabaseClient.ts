import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://attvecgmggckemjajklx.supabase.co";
// import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = "sb_publishable_QTNiVfjzx0AvydPusEHxqg_fRLfWaIk";
// import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);