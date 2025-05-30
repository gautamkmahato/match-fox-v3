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
    const { currentDuration, interviewId, status } = await req.json();

    // fetch usages
    const { data: interviewData, error: interviewError } = await supabase
      .from('interviews')
      .select('*')
      .eq('id', interviewId)
      .eq('user_id', userId)
      .single();

      console.log("+++++++++++++ interviewError ++++++++++++++")
    console.log(interviewError)

    if (interviewError) {
      return NextResponse.json({ state: false, error: 'Failed to fetch the usage', message: "Failed" }, { status: 404 });
    }

    const current = Number(interviewData?.current_duration || 0);
  const newDuration = Number(currentDuration || 0);

  const new_current_duration = current + newDuration;
  console.log("new_current_duration", new_current_duration);
  console.log("status", status);


    // 5. update interview data    
    const { data, error } = await supabase
      .from('interviews')
      .update({ "current_duration": new_current_duration, "status": status })
      .eq('id', interviewId)
      .select()

    console.log("============== update interview ================");
    console.log(data);
    console.log(error);

    if (error) {
      console.error('Supabase update error:', error);
      return NextResponse.json({ state: false, error: 'Failed to update interview', message: 'Database error' }, { status: 500 });
    }

    // 6. Success
    return NextResponse.json({ state: true, data, message: 'Updated Successfully' }, { status: 201 });
  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json({ state: false, error: 'Server Error', message: 'Something went wrong' }, { status: 500 });
  }
}

