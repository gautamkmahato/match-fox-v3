import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import supabase from '@/lib/supabase/client';
import { isRateLimited } from '@/lib/utils/rateLimiter';
import { z } from 'zod';


// Zod Schema for validation
const InterviewSchema = z.object({
  interview_name: z.string().min(1),
  job_description: z.string().min(1),
  interview_time: z.string().refine((val) => !isNaN(Date.parse(val))),
  company_logo: z.string().url().optional(),
  status: z.string().min(1),
  interview_type: z.string().min(1),
  interview_style: z.string().min(1), 
  duration: z.string().min(1),
  position: z.string().min(1),
  location: z.string().min(1),
  experience: z.string().min(1),
  difficulty_level: z.string().min(1),
  company: z.string().min(1),
});


export async function GET() {
  try {
    // Join interviews with their associated meeting links
    const { data: interviews, error: interviewsError } = await supabase
      .from('interviews')
      .select(`
        *,
        meeting_links (
          id,
          link,
          created_at,
          expires_at
        )
        .single()
      `);

    if (interviewsError) {
      return NextResponse.json(
        { state: false, error: 'Failed to fetch interviews with meeting links', message: "Failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({ state: true, data: interviews, message: "Success" }, { status: 200 });

  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json({ state: false, error: 'Internal Server Error', message: "Failed" }, { status: 500 });
  }
}

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
    const { formData, questions } = await req.json();
    // const parsed = InterviewSchema.safeParse(body);
    // console.log(parsed.error)
    // if (!parsed.success) {
    //   return NextResponse.json({ state: false, error: parsed.error.flatten(), message: 'Invalid data' }, { status: 400 });
    // }

    // 5. Insert interview data
    const { data, error } = await supabase
      .from('interviews')
      .insert([
        {
          ...formData,
          user_id: userId, // Associate interview with user
          questions: questions,
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

