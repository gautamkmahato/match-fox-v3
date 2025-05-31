import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import supabase from '@/lib/supabase/client';
import { isRateLimited } from '@/lib/utils/rateLimiter';
import { ratelimit } from '@/lib/ratelimiter/rateLimiter';
import generateUuid from '@/lib/utils/generateUuid';



export async function GET(req) {
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

        console.log("************** user ********")
        console.log(user)

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

        // 5. Get interview attempts data

        const { data, error } = await supabase
            .from("interview_attempts")
            .select(`
                *,
                interviews (
                interview_name,
                interview_time,
                company,
                company_logo,
                position,
                location,
                difficulty_level,
                experience,
                status,
                duration,
                interview_style,
                job_description,
                interview_link,
                expiry_date,
                salary,
                recruiter_title,
                employment_type,
                job_type,
                type,
                current_duration
                )
            `)
            .eq("user_id", userId) // Replace userId with actual Clerk user ID
            .order("created_at", { ascending: false }); // Sort by latest


            if (error) {
                console.error("Error fetching interview attempts:", error);
            } else {
                console.log("Interview Attempts with Details:", data);
            }


        // 6. Success
        return NextResponse.json({ state: true, data, message: 'Updated Successfully' }, { status: 201 });
    } catch (err) {
        console.error('Unexpected error:', err);
        return NextResponse.json({ state: false, error: 'Server Error', message: 'Something went wrong' }, { status: 500 });
    }
}

