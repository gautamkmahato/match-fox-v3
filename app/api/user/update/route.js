import { NextResponse } from 'next/server';
import supabase from '@/lib/supabase/client';
import { ratelimit } from '@/lib/ratelimiter/rateLimiter';
import { currentUser } from '@clerk/nextjs/server';

export async function POST(request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'anonymous';
    
    const { success } = await ratelimit.limit(ip);

    if (!success) {
        return NextResponse.json({ state: false, error: 'Rate limit exceeded' }, { status: 429 });
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

    const inputData = await request.json();
    console.log('Incoming Data:', inputData);

      
const { data: updateData, error: updateError } = await supabase
  .from('users')
  .update(
    {   "designation": inputData?.designation || 'Not available',
        "social_accounts": inputData?.social_accounts || 'Not available',
        "personal_info": inputData?.personal_info || 'Not available',
        "work_type": inputData?.work_type || 'Not available',
        "career_status": inputData?.career_status || 'Not available',
        "experience": inputData?.experience || 'Not available',
    })
  .eq('clerk_id', userId)
  .select()
          

    if (updateError) {
      console.error('Supabase User update Error:', updateError);
      return NextResponse.json(
        { state: false, error: updateError.message, message: 'Failed to insert user' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        state: true,
        data: updateData,
        message: 'User updated successfully',
      },
      { status: 200 }
    );
  } catch (err) {
    console.error('Server Error:', err);
    return NextResponse.json(
      { state: false, error: 'Internal Server Error', message: 'Failed' },
      { status: 500 }
    );
  }
}
