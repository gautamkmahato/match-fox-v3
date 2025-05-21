import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import supabase from '@/lib/supabase/client';



export async function GET(req) {
  try {
    // Step 1: Get authenticated Clerk user
    const user = await currentUser();
    const userId = user?.id;

    if (!userId) {
      return NextResponse.json({ state: false, error: 'Unauthorized', message: "Failed" }, { status: 401 });
    }

    // Step 3: Verify the user exists in Supabase "users" table
    const { data: userRecord, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('clerk_id', userId)
      .single();

    if (userError || !userRecord) {
      return NextResponse.json({ state: false, error: 'User not found in database', message: "Failed" }, { status: 403 });
    }

    // Step 5: Insert new attempt    
    const { data, error } = await supabase
        .from('ai_reports')
        .select(`
            id,
            recommendation,
            score,
            report,
            created_at,
            interview_attempts (
                id,
                started_at,
                completed_at,
                status,
                interview_attempt,
                interview_id,
                user_id,
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
            )
        `)
        .eq('interview_attempts.user_id', userId)
        .order('created_at', { ascending: false });

    console.log(error)

    if (error) {
        return NextResponse.json({ state: false, error: 'Insert failed', message: "Failed" }, { status: 500 });
    }

    return NextResponse.json({ state: true, data: data, message: "Success" }, { status: 200 });

    } catch (err) {
        console.error('Unexpected error:', err);
        return NextResponse.json({ state: false, error: 'Internal Server Error', message: "Failed" }, { status: 500 });
    }
}

export async function POST(req) {
  try {
    // Step 1: Get authenticated Clerk user
    const user = await currentUser();
    const userId = user?.id;

    if (!userId) {
      return NextResponse.json({ state: false, error: 'Unauthorized', message: "Failed" }, { status: 401 });
    } 
    
    // Step 2: Get form data from request body
    const body = await req.json();
    console.log("Received body:", body);

    // Step 3: Destructure and validate required fields
    const { interviewId, interview_attempt_id, score, recommendation, report, duration } = body;

    console.log(duration)
    
    // Improved validation - check for existence and proper types
    const validationErrors = [];
    
    if (!interviewId || typeof interviewId !== 'string') {
      validationErrors.push('interviewId must be a valid UUID string');
    }

    if (!interview_attempt_id || typeof interview_attempt_id !== 'string') {
      validationErrors.push('interview_attempt_id must be a valid UUID string');
    }
    
    if (score === undefined || score === null || score === '') {
      validationErrors.push('score is required');
    }
    
    if (recommendation === undefined || recommendation === null) {
      validationErrors.push('recommendation is required');
    }
    
    if (!report || typeof report !== 'object' || Array.isArray(report)) {
      validationErrors.push('report must be a valid object');
    }


    if(!duration){
      validationErrors.push('Error in duration value')
    }

    if (validationErrors.length > 0) {
      return NextResponse.json(
        { 
          state: false, 
          error: 'Validation failed',
          details: {
            validationErrors,
            received: {
              interview_id: interviewId,
              interview_attempt_id: interview_attempt_id,
              score: score,
              recommendation: recommendation,
              report: report
            }
          },
          message: "Failed" 
        }, 
        { status: 400 }
      );
    }

    // Step 4: Verify the user exists in Supabase "users" table
    const { data: userRecord, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('clerk_id', userId)
      .single();

    if (userError || !userRecord) {
      return NextResponse.json({ state: false, error: 'User not found in database', message: "Failed" }, { status: 403 });
    }

    // Step 5: Prepare data for insertion
    const insertData = {
      interview_id: interviewId,
      interview_attempt_id: interview_attempt_id,
      score: score.toString(), // Ensure score is string as per DB schema
      // recommendation: !!recommendation, // Convert to boolean
      recommendation: recommendation, // Convert to boolean
      report: report, // Directly pass the object (Supabase handles jsonb)
      duration: duration
    };

    console.log("Inserting data:", insertData);

    // Step 6: Insert new report
    const { data: inserted, error: insertError } = await supabase
      .from('ai_reports')
      .insert([insertData])
      .select()
      .single();

    if (insertError) {
      console.error('Insert error:', insertError);
      return NextResponse.json(
        { 
          state: false, 
          error: 'Insert failed',
          supabase_error: insertError,
          message: "Failed" 
        }, 
        { status: 500 }
      );
    }

    return NextResponse.json({ state: true, data: inserted, message: "Success" }, { status: 200 });

  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json(
      { 
        state: false, 
        error: 'Internal Server Error',
        details: err.message,
        message: "Failed" 
      }, 
      { status: 500 }
    );
  }
}
