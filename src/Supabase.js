import { createClient } from '@supabase/supabase-js'

console.log(import.meta.env.VITE_APP_SUPABASE_URL);
const supabaseUrl = import.meta.env.VITE_APP_SUPABASE_URL;
// const supabaseKey = process.env.SUPABASE_KEY
const supabaseAnonKey = import.meta.env.VITE_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;