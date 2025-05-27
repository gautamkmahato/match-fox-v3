// app/api/upload/route.ts
import { ratelimit } from '@/lib/ratelimiter/rateLimiter';
import supabase from '@/lib/supabase/client';
import { isRateLimited } from '@/lib/utils/rateLimiter';
import { currentUser } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server'


export async function POST(req) {
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

    const { file_name, html_content, } = await req.json();

    // Insert metadata into 'resumes' table
    const { error: resumeError, data } = await supabase.from('resume_html').insert({
        clerk_id: userId,
        file_name: file_name,
        file_url: 'https://hirenom.pdf',
        file_type: 'pdf',
        parsed_successfully: false,
        html_content: html_content
    })

    if (resumeError) {
        console.log("DB Error:", resumeError.message)
        return NextResponse.json({ state: false, error: resumeError.message, message: 'Failed' }, { status: 500 });

    }

    return NextResponse.json({ state: true, data: data, message: 'Resume insterted successfully!' }, { status: 201 });


}
