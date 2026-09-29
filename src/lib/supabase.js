import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export function isSupabaseConfigured() {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

export function getSupabaseConfigError() {
  if (!supabaseUrl) {
    return 'VITE_SUPABASE_URL chưa được cấu hình.';
  }

  if (!supabaseAnonKey) {
    return 'VITE_SUPABASE_ANON_KEY chưa được cấu hình.';
  }

  return null;
}

export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    })
  : null;
