import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import supabase from '@/lib/supabase/client';
import { isRateLimited } from '@/lib/utils/rateLimiter';
import { ratelimit } from '@/lib/ratelimiter/rateLimiter';
import generateUuid from '@/lib/utils/generateUuid';



export async function POST(req) {
    const uuid = generateUuid();
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

        // 5. Insert interview data

        const { data, error } = await supabase
            .from('usage')
            .insert([
                {
                    id: uuid,
                    user_id: userId,
                    remaining_minutes: 300,
                    last_reset: new Date() // this gives the current time in correct format
                },
            ])
            .select();




        if (error) {
            console.error('Supabase update error:', error);
            return NextResponse.json({ state: false, error: 'Failed to update usage', message: 'Database error' }, { status: 500 });
        }

        // 6. Success
        return NextResponse.json({ state: true, data, message: 'Updated Successfully' }, { status: 201 });
    } catch (err) {
        console.error('Unexpected error:', err);
        return NextResponse.json({ state: false, error: 'Server Error', message: 'Something went wrong' }, { status: 500 });
    }
}

