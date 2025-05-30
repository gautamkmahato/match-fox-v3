import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import supabase from '@/lib/supabase/client';
import { ratelimit } from '@/lib/ratelimiter/rateLimiter';


export async function GET(req, context) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'anonymous';

    const { success } = await ratelimit.limit(ip);

    if (!success) {
      return NextResponse.json({ state: false, error: 'Rate limit exceeded' }, { status: 429 });
    }
 
    const param = await context.params;
    const interviewId = param.id;

    console.log(interviewId)

    // Step 1: Get authenticated Clerk user
    const user = await currentUser();
    const userId = user?.id;

    if (!userId) {
      return NextResponse.json({ state: false, error: 'Unauthorized', message: "Failed" }, { status: 401 });
    }

    // Step 3: Verify the user exists in Supabase "users" table
    const { data: userRecord, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('clerk_id', userId)
      .single();

    if (userError || !userRecord) {
      return NextResponse.json({ state: false, error: 'User not found in database', message: "Failed" }, { status: 403 });
    }

    // Step 5: Fetch all interviews  

    const { data: reports, error } = await supabase
      .from('ai_reports')
      .select(`
        id,
        recommendation,
        score,
        created_at,
        duration,
        report,
        interview_id,

        interview_attempts (
          id,
          started_at,
          completed_at,
          status,
          chat_conversation,

          users (
            id,
            name,
            username,
            email,
            img_url,
            created_at
          )
        )
      `)
      .eq('interview_id', interviewId);





    console.log(reports)

    if (error) {
      return NextResponse.json({ state: false, error: 'Failed to fetch interview_attempts', message: "Failed" }, { status: 500 });
    }

    return NextResponse.json({ state: true, data: reports, message: "Success" }, { status: 200 });

  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json({ state: false, error: 'Internal Server Error', message: "Failed" }, { status: 500 });
  }
}