import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { supabase } from '@/lib/db/supabase';

export async function POST() {
  const session = await getServerSession();

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user.email;

  try {
    const { error } = await supabase
      .from('strava_tokens')
      .delete()
      .eq('user_id', userId);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error disconnecting Strava:', error);
    return NextResponse.json({ error: 'Failed to disconnect' }, { status: 500 });
  }
}
