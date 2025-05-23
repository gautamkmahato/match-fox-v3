// app/api/interviews/[id]/route.ts
import { ratelimit } from '@/lib/ratelimiter/rateLimiter';
import supabase from '@/lib/supabase/client';
import { currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {

    const ip = req.headers.get('x-forwarded-for') || 'anonymous';

  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return NextResponse.json({ state: false, error: 'Rate limit exceeded' }, { status: 429 });
  }

    // Step 1: Get authenticated Clerk user
  const user = await currentUser();
  const userId = user?.id;

  if (!userId) {
    return NextResponse.json({ state: true, error: 'Unauthorized', message: "Failed" }, { status: 401 });
  }

  // Step 2: Verify the user exists in the Supabase "users" table
  const { data: userRecord, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('clerk_id', userId)
    .single();

  if (userError || !userRecord) {
    return NextResponse.json({ state: true, error: 'User not found in database', message: "Failed" }, { status: 403 });
  }

    // Fetch interview
    const { data: usageData, error } = await supabase
      .from('usage')
      .select('*')
      .eq('user_id', userId)
      .single();

    console.log(error)

    if (error) {
      return NextResponse.json({ state: false, error: 'Not enough Credits or access denied', message: "Failed" }, { status: 404 });
    }

    return NextResponse.json({ state: true, data: usageData, message: "Success" }, { status: 200 });
  } catch (err) {
    console.error('Server error:', err);
    return NextResponse.json({ state: false, error: 'Internal server error', message: "Failed" }, { status: 500 });
  }
}
