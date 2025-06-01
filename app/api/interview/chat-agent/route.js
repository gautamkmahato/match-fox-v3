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
  
  const { report, chat } = await req.json()
  const user_query = chat?.[chat.length - 1]?.content || ''

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

You are Niko, a smart and friendly AI interview assistant.

Only give deep analysis and feedback **if the user's message is a question or request for help**.

If the user just says "hi", "hello", or something casual:
- Respond briefly and warmly
- Do **not** analyze the report yet
- Wait for the user to ask a real question or request

If the user asks a question like "How can I improve?" or gives a detailed message:
- Provide specific, helpful advice
- Use the interview report and chat history
- Be constructive and encouraging
- Focus on helping the user grow

---

Interview Report:
${report}

Chat History:
${chat.map((m) => `${m.role === 'user' ? 'User' : 'You'}: ${m.content}`).join('\n')}

User's Current Message:
${user_query}


`,
              },
            ],
          },
        ],
        config: {
          systemInstruction:
            'You are a smart AI assistant named Niko who provide answer for user query based on the given information',
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
