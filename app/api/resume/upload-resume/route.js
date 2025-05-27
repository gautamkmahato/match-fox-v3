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
    const formData = await req.formData()

    const file = formData.get('file');
    const clerkId = formData.get('clerkId');

    if (!file || !clerkId) {
        return NextResponse.json({ state: false, error: 'Missing file or user', message: 'Failed' }, { status: 400 });

    }

    const fileExt = file.name.split('.').pop()
    const filePath = `resumes/${crypto.randomUUID()}.${fileExt}`

    // Upload to Supabase Storage
    const { data: storageData, error: storageError } = await supabase.storage
        .from('resumes')
        .upload(filePath, file, {
            contentType: file.type,
            upsert: true
        })

    if (storageError) {
        console.log("storageError Error:", storageError.message)
        return NextResponse.json({ state: false, error: storageError.message, message: 'Failed' }, { status: 500 });

    }

    // Generate signed URL for private file
    const { data: signedUrlData, error: signedUrlError } = await supabase
        .storage
        .from('resumes')
        .createSignedUrl(filePath, 60 * 60 * 24 * 7); // 7 days


    if (signedUrlError) {
        return NextResponse.json({ state: false, error: signedUrlError.message }, { status: 500 });
    }

    const fileUrl = signedUrlData.signedUrl;


    //const fileUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/resumes/${filePath}`

    // Insert metadata into 'resumes' table
    const { error: dbError } = await supabase.from('resumes').insert({
        clerk_id: clerkId,
        file_name: file.name,
        file_url: fileUrl,
        file_type: file.type,
        parsed_successfully: false
    })

    if (dbError) {
        console.log("DB Error:", dbError.message)
        return NextResponse.json({ state: false, error: dbError.message, message: 'Failed' }, { status: 500 });

    }

    return NextResponse.json({ state: true, data: 'Resume uploaded successfully!', message: 'Success' }, { status: 201 });


}
