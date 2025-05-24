import { NextResponse } from 'next/server';
import generateUuid from '@/lib/utils/generateUuid';
import supabase from '@/lib/supabase/client';

export async function POST(request) {
  try {
    const inputData = await request.json();
    console.log('Incoming Data:', inputData);

    const uuid = generateUuid();

    // 1. Add user to 'users' table
    const { data: userData, error: userError } = await supabase
      .from('users')
      .insert([
        {
          id: uuid,
          name: inputData.name,
          clerk_id: inputData.clerk_id,
          username: inputData.username || 'username',
          email: inputData.email,
          img_url: inputData.img_url,
        },
      ])
      .select()
      .single(); // You want a single row, not an array

    if (userError) {
      console.error('Supabase User Insert Error:', userError);
      return NextResponse.json(
        { state: false, error: userError.message, message: 'Failed to insert user' },
        { status: 500 }
      );
    }

    // 2. Add usage record for this user
    const { data: usageData, error: usageError } = await supabase
      .from('usage')
      .insert([
        {
          id: generateUuid(), // usage should have its own unique ID
          user_id: inputData.clerk_id, // this should be the user ID (same as above)
          remaining_minutes: 300,
          last_reset: new Date(),
        },
      ])
      .select()
      .single();

    if (usageError) {
      console.error('Supabase Usage Insert Error:', usageError);
      return NextResponse.json(
        { state: false, error: usageError.message, message: 'Failed to insert usage' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        state: true,
        data: userData,
        message: 'User and usage created successfully',
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('Server Error:', err);
    return NextResponse.json(
      { state: false, error: 'Internal Server Error', message: 'Failed' },
      { status: 500 }
    );
  }
}
