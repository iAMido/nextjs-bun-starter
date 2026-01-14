import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Database features will not work.');
}

// Using 'any' for now until database schema is finalized in Supabase
// Once you run the SQL to create tables, you can generate types with:
// bunx supabase gen types typescript --project-id YOUR_PROJECT_ID > lib/db/database.types.ts
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const supabase: SupabaseClient<any> = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);

// Server-side client with service role key for admin operations
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createServerClient(): SupabaseClient<any> {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('Missing Supabase server credentials');
  }
  return createClient(supabaseUrl, serviceRoleKey);
}
