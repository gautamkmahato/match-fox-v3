import { extractJsonBlock } from "./cleanCodeBlock";

export function deriveStatus(duration, callTime) {
  if (!duration) return 'in-progress';
  return Math.floor(duration) === Math.floor(callTime) ? 'completed' : 'in-progress';
}

export function parseGeneratedReport(rawData) {
  try {
    const jsonString = extractJsonBlock(rawData);
    return JSON.parse(jsonString);
  } catch (err) {
    console.error("❌ Failed to parse JSON block from report data:", err);
    return null;
  }
}

export function extractScoreAndRecommendation(result) {
  const scoreRaw = result?.final_verdict?.score;
  const recommendationRaw = result?.final_verdict?.recommendation;

  const score =
    typeof scoreRaw === "number" || typeof scoreRaw === "string"
      ? String(scoreRaw)
      : "0";

  const recommendation =
    typeof recommendationRaw === "string"
      ? recommendationRaw.toLowerCase() === "yes"
      : false;

  return { score, recommendation };
}
