import { GoogleGenAI } from '@google/genai';
import { NextRequest } from 'next/server';

export const runtime = 'nodejs';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
});
 
 
export async function POST(req) {
  const {
    job_description,
    company,
    interview_style,
    position,
    difficulty_level,
    experience
  } = await req.json();

  console.log(
    company,
    interview_style,
    position,
    difficulty_level,
    experience)



  const response = await ai.models.generateContent({
    model: "gemini-1.5-flash",
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `
You are an AI interview assistant. Based on the following input, generate **10 diverse technical interview questions** in JSON format.

---

**Input:**
- company: ${company}
- interview style: ${interview_style}
- difficulty level: ${difficulty_level}
- position: ${position}
- job description: ${job_description}
- experience: ${experience}

---

**Output Guidelines:**
- Format output as JSON object with keys like "Question 1", "Question 2", ..., "Question 10"
- Only return the JSON (no extra text)
- Do not include answers

---

**Examples of question types to include:**
- Conceptual
- Practical
- Code analysis
- Debugging
- Best practices
- Performance
- Advanced cases
- Comparisons
- Common mistakes
- Design/system thinking

---
Return only valid JSON.
          `
          }
        ]
      }
    ],
    config: {
      systemInstruction: "You are a smart AI assistant name Niko who generates modern top interview questions based on the given data.",
    },
  });

  console.log(response.text);

  return new Response(JSON.stringify({
  state: true,
  data: response.text,
  message: "Success",
}), {
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-cache',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  },
});


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


