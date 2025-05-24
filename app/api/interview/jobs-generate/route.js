// app/api/openai/job/route.ts
import geminiQueue from '@/lib/queue/geminiQueue';
import { ratelimit } from '@/lib/ratelimiter/rateLimiter';
import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
});

export async function POST(req) {
  const ip = req.headers.get('x-forwarded-for') || 'anonymous';

  const { success } = await ratelimit.limit(ip);
  if (!success) {
    return NextResponse.json({ state: false, error: 'Rate limit exceeded' }, { status: 429 });
  }

  try {
    const body = await req.json();
    const { jobDescription } = body;

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

Job Description: ${jobDescription}

interview_name (string) — A suitable interview title or job title

job_description (string) — The full job description text

Role Overview (string): A short paragraph summarizing what the role is about.

interview_time (ISO 8601 date string) — The interview date and time, or if not mentioned, use today's date in ISO format

company_logo (string URL) — A URL to the company logo if mentioned, or https://logoipsum.com/artwork/365

status (string) — Status of the interview (e.g., "open", "closed", "upcoming"), default to "open"

interview_type (string) — Type of interview (e.g., "technical", "HR", "behavioral"), default to "technical"

interview_style (string) — Interview style (e.g., "panel", "one-on-one"), default to "one-on-one"

duration (number, minutes) — Duration in minutes, default to 30

Requirements (array/list) - provide the requirements in a list(array)

Tech Stack (array) - If not mentioned understand the job description and provide these (Programming languages, Frameworks, Tools, DevOps )

location (string) — Job location, default to "India"

Tone / Cultural Fit (string) - Just provide the words in a string as comma (,) seperated

Seniority Level (string) : Mid-level (inferred from "2+ years")

Employment Type (string): Full-time (usually inferred if not mentioned)

Location (string): Not explicitly mentioned, but should be a separate field

Skills (array/list) - Extracted either from Requirements/Responsibilities or implicitly:

experience (string) — Required experience level in years, default to "Not specified"

difficulty_level (string) — Interview difficulty (e.g., "easy", "medium", "hard"), default to "medium"

company (string) — Company name if available in job description else default "matchfox"



Important:

Provide all fields in a valid JSON object.

If any field is missing in the description, use the default value as specified.

Do not add any explanations or extra text, just return the JSON.


`.trim();

    // Queue the Gemini API call
    const result = await geminiQueue.add(() =>
      ai.models.generateContentStream({
        model: 'gemini-2.0-flash',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
      })
    );

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

