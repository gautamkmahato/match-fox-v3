import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import supabase from '@/lib/supabase/client';
import { ratelimit } from '@/lib/ratelimiter/rateLimiter';


export async function POST(req) {
  try {

    const ip = req.headers.get('x-forwarded-for') || 'anonymous';

    const { success } = await ratelimit.limit(ip);

    if (!success) {
      return NextResponse.json({ state: false, error: 'Rate limit exceeded' }, { status: 429 });
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
    const { formData, questions } = await req.json();

    // 5. Insert interview data 
    const { data, error } = await supabase
      .from('admission_interviews')
      .insert([
        {
          "name": formData?.name || 'Not Available',
          "program_name": formData?.program_name || 'Not Available',
          "session_date": formData?.session_date || "2027-06-15T23:59:59Z",
          "resume": formData?.resume || 'Not Available',
          "question_set": questions || 'Not Available',
          "feedback": formData?.feedback || 'Not Available',
          "duration_minutes": (formData?.duration_minutes * 60) || '1800',
          "overall_rating": formData?.overall_rating || 'Not Available',
          "status": formData?.status || 'Not Available',
          "user_id": userId,
        }
      ])
      .select();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ state: false, error: 'Failed to save interview', message: 'Database error' }, { status: 500 });
    }

    // 6. Success
    return NextResponse.json({ state: true, data, message: 'Interview created' }, { status: 201 });
  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json({ state: false, error: 'Server Error', message: 'Something went wrong' }, { status: 500 });
  }
}

