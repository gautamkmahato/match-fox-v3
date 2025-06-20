import { ratelimit } from '@/lib/ratelimiter/rateLimiter';
import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';
import geminiQueue from '@/lib/queue/geminiQueue'; // 🆕 Import the shared queue instance

export const runtime = 'nodejs';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
});

export async function POST(req) {
  const ip = req.headers.get('x-forwarded-for') || 'anonymous';

  // Apply rate limiting
  const { success } = await ratelimit.limit(ip);
  if (!success) {
    return NextResponse.json({ state: false, error: 'Rate limit exceeded' }, { status: 429 });
  }

  // Extract JSON body
  const { type, resume, } = await req.json();

  // Wrap Gemini API call in queue
  try {
    const result = await geminiQueue.add(async () => {
      const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `

You are an IIM Ahmedabad admissions panelist conducting a mock interview for an MBA aspirant. 
IIM-A is known for its case-based pedagogy, academic rigor, and strong preference for analytical thinking and structured responses.
Your role is to generate 10 questions and it should be **realistic, college-specific and feel real interview** for the user.

Generate 10 questions in JSON format based on the above data and user's resume.

## Resume
${resume}

Generate a 10 question mock interview simulating the IIM-A interview style in JSON format.
Base your questions on the user's profile, their academic/work history, and their B-school of choice.


Focus on:
- Structured thinking
- Real-world problem-solving
- Academic depth
- Justification of career goals
- Decision-making skills


Format each question in simple language. Don’t dump multiple questions at once. Maintain realism and timing.

Provide the output in JSON format.

`,
              },
            ],
          },
        ],
        config: {
          systemInstruction:
            'You are a smart AI assistant named Niko who generates modern top interview questions based on the given data.',
        },
      });

      return response.text;
    });

    console.log("✅ Gemini API Success");

    return new Response(
      JSON.stringify({
        state: true,
        data: result,
        message: 'Success',
      }),
      {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Cache-Control': 'no-cache',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
        },
      }
    );
  } catch (error) {
    console.error("❌ Gemini Queue Error:", error);
    return NextResponse.json(
      {
        state: false,
        error: error.message || 'Unexpected error in AI processing',
      },
      { status: 500 }
    );
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
