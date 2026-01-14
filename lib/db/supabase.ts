import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

// Using 'any' for now until database schema is finalized in Supabase
// Once you run the SQL to create tables, you can generate types with:
// bunx supabase gen types typescript --project-id YOUR_PROJECT_ID > lib/db/database.types.ts
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const supabase: SupabaseClient<any> = createClient(supabaseUrl, supabaseAnonKey);

// Check if Supabase is properly configured
export function isSupabaseConfigured(): boolean {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_URL !== undefined &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== undefined
  );
}

// Server-side client with service role key for admin operations
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createServerClient(): SupabaseClient<any> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) {
    throw new Error('Missing Supabase server credentials');
  }
  return createClient(url, serviceRoleKey);
}
