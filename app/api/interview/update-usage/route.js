import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import supabase from '@/lib/supabase/client';
import { isRateLimited } from '@/lib/utils/rateLimiter';



export async function POST(req) {
  try {
    // 1. Rate limiting (basic IP-based)
    const ip = req.headers.get('x-forwarded-for') || 'localhost';
    if (isRateLimited(ip)) {
      return NextResponse.json({ state: false, error: 'Too many requests', message: 'Rate limit exceeded' }, { status: 429 });
    }

    // 2. Authenticated user
    const user = await currentUser();
    const userId = user?.id;
    if (!userId) {
      return NextResponse.json({ state: false, error: 'Unauthorized', message: 'User not authenticated' }, { status: 401 });
    }

    // 3. Validate user exists in Supabase
    const { data: userRecord, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('clerk_id', userId)
      .single();

    if (userError || !userRecord) {
      return NextResponse.json({ state: false, error: 'User not found in database', message: 'Forbidden' }, { status: 403 });
    }

    // 4. Validate request body
    const { usage_in_seconds } = await req.json();

    // fetch usages
    const { data: usage, error: usageError } = await supabase
      .from('usage')
      .select('*')
      .eq('user_id', userId)
      .single();

    console.log(usageError)

    if (usageError) {
      return NextResponse.json({ state: false, error: 'Failed to fetch the usage', message: "Failed" }, { status: 404 });
    }

    console.log(usage)

    // 5. Insert interview data
    const updated_remaining_minutes = usage?.remaining_minutes - usage_in_seconds;

    const { data, error } = await supabase
        .from('usage')
        .update({ "remaining_minutes": updated_remaining_minutes })
        .eq('user_id', userId)
        .select()
            

    if (error) {
      console.error('Supabase update error:', error);
      return NextResponse.json({ state: false, error: 'Failed to update usage', message: 'Database error' }, { status: 500 });
    }

    // 6. Success
    return NextResponse.json({ state: true, data, message: 'Updated Successfully' }, { status: 201 });
  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json({ state: false, error: 'Server Error', message: 'Something went wrong' }, { status: 500 });
  }
}

