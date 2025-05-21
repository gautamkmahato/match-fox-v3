function getReportPrompt(conversations) {
  const GENERATE_REPORT_PROMPT = `
You are an AI interview evaluator.

The following is a structured array of messages between the candidate and the interviewer:

${JSON.stringify(conversations, null, 2)}

---

Using this conversation, generate a complete interview evaluation report.

**Instructions:**
- Follow the evaluation rubric below.
- Respond with **valid JSON only** (no markdown, no formatting, no explanations).
- Do **not** wrap the response in triple backticks.
- Do **not** include "---" or any other formatting.
- The output should be directly parseable as JSON.

Rubric Structure:
{
  "skill_evaluation": {
    "Technical Knowledge": {
      "rating": 1–5,
      "notes": ""
    },
    "Communication": {
      "rating": 1–5,
      "notes": ""
    },
    "Problem Solving Approach": {
      "rating": 1–5,
      "notes": ""
    },
    "Confidence & Composure": {
      "rating": 1–5,
      "notes": ""
    },
    "Best Practices & Style": {
      "rating": 1–5,
      "notes": ""
    }
  },
  "overall_summary": "Brief summary in 2–3 lines.",
  "reasons": [
    "Up to 10 short bullet-point reasons for recommendation or rejection"
  ],
  "final_verdict": {
    "recommendation": "YES" // or "NO"
  }
}
`;

  return GENERATE_REPORT_PROMPT;
}

export default getReportPrompt;