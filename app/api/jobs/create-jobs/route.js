import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import supabase from '@/lib/supabase/client';
import { isRateLimited } from '@/lib/utils/rateLimiter';
import { ratelimit } from '@/lib/ratelimiter/rateLimiter';

 

export async function POST(req) {
  try {

    const ip = req.headers.get('x-forwarded-for') || 'anonymous';
    
    const { success } = await ratelimit.limit(ip);
    
    if (!success) {
        return NextResponse.json({ state: false, error: 'Rate limit exceeded' }, { status: 429 });
    }

    // 1. Rate limiting (basic IP-based)
    const ip_address = req.headers.get('x-forwarded-for') || 'localhost';
    if (isRateLimited(ip_address)) {
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
    const { formData } = await req.json();

    // 5. Insert interview data 
    const { data, error } = await supabase
        .from('interviews')
        .insert([
            {
                "interview_name": formData?.interview_name || 'Not Available',
                "interview_time": formData?.interview_time || '2025-05-29 09:27:00+00',
                "company_logo": formData?.company_logo || `https://logo.clearbit.com/${formData?.company.toLowerCase().split(' ')[0]}.com`,
                "company": formData?.company || 'Not Available',
                "status": formData?.status || 'scheduled',
                "interview_type": formData?.interview_type || 'Not Available',
                "duration": (formData?.duration * 60) || 'Not Available',
                "position": formData?.position || formData?.interview_name || 'Not Available',
                "location": formData?.location || 'Not Available',
                "interview_style": formData?.interview_style || 'Not Available',
                "job_description": formData?.job_description || 'Not Available',
                "interview_link": formData?.interview_link || 'Not Available',
                "expiry_date": formData?.expiry_date ||  "2027-06-15T23:59:59Z",
                "user_id": userId,
                "difficulty_level": formData?.difficulty_level || 'Not Available',
                "experience": formData?.experience || 'Not Available',
                "salary": formData?.salary || 'Not Available',
                "recruiter_title": formData?.recruiter_title || 'Not Available',
                "employment_type": formData?.employment_type || 'Not Available',
                "job_type": formData?.job_type || 'Not Available',
                "type": formData?.type || 'Not Available',
                "questions": formData?.questions || null,
            }
        ])
        .select();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ state: false, error: 'Failed to save interview', message: 'Database error' }, { status: 500 });
    }

    console.log("========== Jobs =============");
    console.log(data)
        // 6. Success
        return NextResponse.json({ state: true, data, message: 'Interview created' }, { status: 201 });
    } catch (err) {
        console.error('Unexpected error:', err);
        return NextResponse.json({ state: false, error: 'Server Error', message: 'Something went wrong' }, { status: 500 });
    }
}

