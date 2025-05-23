// app/api/interviews/[id]/route.ts
import { ratelimit } from '@/lib/ratelimiter/rateLimiter';
import supabase from '@/lib/supabase/client';
import { currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET(req, context) {
  const ip = req.headers.get('x-forwarded-for') || 'anonymous';
          
            const { success } = await ratelimit.limit(ip);
          
            if (!success) {
              return NextResponse.json({ state: false, error: 'Rate limit exceeded' }, { status: 429 });
            }
  try {

    const param = await context.params;
    const interviewId = param.id;

    console.log(interviewId)

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

    // Fetch interview
    const { data: interview, error } = await supabase
      .from('interviews')
      .select('*')
      .eq('id', interviewId)
      .eq('user_id', userId)
      .single();

    console.log(error)

    if (error) {
      return NextResponse.json({ state: false, error: 'Interview not found or access denied', message: "Failed" }, { status: 404 });
    }

    return NextResponse.json({ state: true, data: interview, message: "Success" }, { status: 200 });
  } catch (err) {
    console.error('Server error:', err);
    return NextResponse.json({ state: false, error: 'Internal server error', message: "Failed" }, { status: 500 });
  }
}
