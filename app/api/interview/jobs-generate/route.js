


// app/api/openai/job/route.ts
import { GoogleGenAI } from '@google/genai';
import { NextRequest } from 'next/server';

export const runtime = 'nodejs';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
});

export async function POST(req) {
    console.log("inside")
  try {
    const body = await req.json();
    const { jobDescription } = body;
    //console.log(jobDescription)

    if (!jobDescription || typeof jobDescription !== 'string' || jobDescription.trim() === '') {
      return new Response(JSON.stringify({
        state: false,
        error: 'Invalid or missing jobDescription in request body',
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    
    const prompt = `
          
          You are a smart AI assistant that extracts detailed interview metadata from a job description.
Given the job description below, extract the following fields and return a JSON object with these exact keys:

interview_name (string) — A suitable interview title

job_description (string) — The full job description text

interview_time (ISO 8601 date string) — The interview date and time, or if not mentioned, use today's date in ISO format

company_logo (string URL) — A URL to the company logo if mentioned, or https://logoipsum.com/artwork/365

status (string) — Status of the interview (e.g., "open", "closed", "upcoming"), default to "open"

interview_type (string) — Type of interview (e.g., "technical", "HR", "behavioral"), default to "technical"

interview_style (string) — Interview style (e.g., "panel", "one-on-one"), default to "one-on-one"

duration (number, minutes) — Duration in minutes, default to 30

position (string) — Job position or title extracted, or "Unknown"

location (string) — Job location, default to "India"

experience (string) — Required experience level, default to "Not specified"

difficulty_level (string) — Interview difficulty (e.g., "easy", "medium", "hard"), default to "medium"

company (string) — Company name, default to "Google"

Job Description: ${jobDescription}

Important:

Provide all fields in a valid JSON object.

If any field is missing in the description, use the default value as specified.

Do not add any explanations or extra text, just return the JSON.


`.trim();


    const result = await ai.models.generateContentStream({
      model: 'gemini-2.0-flash',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    });

    const encoder = new TextEncoder();
    let responseText = '';

    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of result) {
          const text = chunk?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            responseText += text;
            controller.enqueue(encoder.encode(text));
          }
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*',
      },
    });

  } catch (error) {
    console.error('[API ERROR]', error);
    return new Response(JSON.stringify({
      state: false,
      error: 'Internal server error',
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
    },
  });
}
