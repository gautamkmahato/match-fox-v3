import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

let sessions = new Map();

export async function POST(req) {
  const body = await req.json();
  const { sessionId, prompt, answer, end } = body;

  if (end && sessionId) {
    const session = sessions.get(sessionId);
    if (!session) return NextResponse.json({ error: 'Invalid session' }, { status: 400 });

    const reportPrompt = `Generate a detailed mock interview report based on the following Q&A session:\n\n${session.questions
      .map((q, i) => `Q: ${q}\nA: ${session.answers[i] || "No answer"}`)
      .join('\n\n')}`;

    const reportRes = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: [{ role: 'user', parts: [{ text: reportPrompt }] }],
    });

    sessions.delete(sessionId);

    return NextResponse.json({ report: reportRes.text });
  }

  // Start session
  if (!sessionId && prompt) {
    const qRes = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: [{ role: 'user', parts: [{ text: `Generate 10 mock interview questions on ${prompt}. Only output the questions.` }] }],
    });

    const questions = qRes.text.split('\n').filter(Boolean);
    const newSessionId = crypto.randomUUID();

    sessions.set(newSessionId, { questions, answers: [], current: 0 });

    return NextResponse.json({ sessionId: newSessionId, question: questions[0] });
  }

  // Handle answer & get next question
  if (sessionId && typeof answer === 'string') {
    const session = sessions.get(sessionId);
    if (!session) return NextResponse.json({ error: 'Session not found' }, { status: 404 });

    session.answers[session.current] = answer;
    session.current += 1;

    if (session.current < session.questions.length) {
      return NextResponse.json({ question: session.questions[session.current] });
    } else {
      return NextResponse.json({ end: true });
    }
  }

  return NextResponse.json({ error: 'Bad request' }, { status: 400 });
}
