import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import supabase from '@/lib/supabase/client';
import { ratelimit } from '@/lib/ratelimiter/rateLimiter';

export async function GET(req) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'anonymous';

    const { success } = await ratelimit.limit(ip);
    if (!success) {
      return NextResponse.json({ state: false, error: 'Rate limit exceeded' }, { status: 429 });
    }

    const user = await currentUser();
    const userId = user?.id;
    if (!userId) {
      return NextResponse.json({ state: false, error: 'Unauthorized' }, { status: 401 });
    }

    // Ensure user exists in Supabase users table
    const { data: userRecord, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('clerk_id', userId)
      .single();

    if (userError || !userRecord) {
      return NextResponse.json({ state: false, error: 'User not found in database' }, { status: 403 });
    }

    // Fetch interview_attempts for this user
    const { data: attempts, error: attemptsError } = await supabase
      .from('interview_attempts')
      .select(
        `
        id,
        started_at,
        completed_at,
        status,
        interview_attempt,
        interview_id,
        user_id,
        chat_conversation,
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
        `
      )
      .eq('user_id', userId);

    if (attemptsError) {
      return NextResponse.json({ state: false, error: 'Failed to fetch attempts' }, { status: 500 });
    }

    const attemptIds = attempts.map((a) => a.id);
    if (attemptIds.length === 0) {
      return NextResponse.json({ state: true, data: [], message: 'No reports found' });
    }

    // Now fetch ai_reports where interview_attempt_id is in the list of attemptIds
    const { data: reports, error: reportsError } = await supabase
      .from('ai_reports')
      .select('id, recommendation, score, report, created_at, duration, interview_attempt_id')
      .in('interview_attempt_id', attemptIds);

    if (reportsError) {
      return NextResponse.json({ state: false, error: 'Failed to fetch reports' }, { status: 500 });
    }

    // Join reports with their corresponding attempts
    const enrichedReports = reports.map((report) => {
      const attempt = attempts.find((a) => a.id === report.interview_attempt_id);
      return {
        ...report,
        interview_attempt: attempt || null,
      };
    });

    return NextResponse.json({ state: true, data: enrichedReports, message: 'Success' }, { status: 200 });
  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json({ state: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
