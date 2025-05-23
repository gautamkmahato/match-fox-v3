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
    // Step 1: Get authenticated Clerk user
    const user = await currentUser();
    const userId = user?.id;

    // Get reportId from params
    const param = await context.params;
    const reportId = param.id;

    console.log(reportId)

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

    // Step 5: Insert new attempt    
    const { data, error } = await supabase
      .from('ai_reports')
      .select(`
            id,
            recommendation,
            score,
            report,
            created_at,
            interview_attempts (
                id,
                started_at,
                completed_at,
                status,
                interview_attempt,
                interview_id,
                user_id,
                interviews (
                    id,
                    interview_name,
                    interview_time,
                    company,
                    company_logo,
                    status,
                    duration,
                    position,
                    location,
                    interview_style,
                    job_description,
                    interview_link,
                    expiry_date,
                    interview_type,
                    created_date
                )
            )
        `)
      .eq('interview_attempts.user_id', userId)
      .eq('id', reportId)
      .order('created_at', { ascending: false })
      .single();

    console.log(error)

    if (error) {
      return NextResponse.json({ state: false, error: 'Insert failed', message: "Failed" }, { status: 500 });
    }

    return NextResponse.json({ state: true, data: data, message: "Success" }, { status: 200 });

  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json({ state: false, error: 'Internal Server Error', message: "Failed" }, { status: 500 });
  }
}