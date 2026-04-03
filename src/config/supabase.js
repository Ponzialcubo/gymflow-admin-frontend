import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// ¡Fíjate bien en el "export" de esta línea!
export const supabase = createClient(supabaseUrl, supabaseAnonKey);