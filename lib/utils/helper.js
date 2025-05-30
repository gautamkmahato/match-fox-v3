import { extractJsonBlock } from "./cleanCodeBlock";

export async function deriveStatus(duration, current_duration, callTime) {
  console.log("duration, current_duration, callTime:::", duration, current_duration, callTime);

  // Ensure all values are numbers
  const totalDuration = Number(duration);
  const usedDuration = Number(current_duration);
  const liveCallTime = Number(callTime);

  // If any required number is invalid, assume in-progress
  if (isNaN(totalDuration) || isNaN(usedDuration) || isNaN(liveCallTime)) {
    return 'in-progress';
  }

  // Compare total to accumulated time
  return Math.floor(usedDuration + liveCallTime) >= Math.floor(totalDuration)
    ? 'completed'
    : 'in-progress';
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

export function flattenCommaArray(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    return '';
  }

  return arr
    .flatMap(item => typeof item === 'string' ? item.split(',') : []) // only process strings
    .map(s => s.trim())
    .filter(Boolean) // remove empty strings
    .filter((val, i, self) => self.indexOf(val) === i) // remove duplicates
    .join(', ');
};

export function calculatePerformance(overallScore){
  if(overallScore <= 4){
    return {
      tag: 'Poor',
      status: false,
      color: 'bg-red-400'
    }
  }
  if(overallScore > 4 && overallScore <= 6){
    return {
      tag: 'Average',
      status: false,
      color: 'bg-red-400'
    }
  }
  if(overallScore > 6 && overallScore <= 8){
    return {
      tag: 'Good',
      status: true,
      color: 'bg-teal-400'
    }
  }
  if(overallScore > 8 && overallScore <= 10){
    return {
      tag: 'Excellent',
      status: true,
      color: 'bg-teal-400'
    }
  }
}

export function formatDate(date){
  const startedAt = "2025-05-22T14:42:41.05+00:00";
  const formattedDate = new Date(date).toLocaleString("en-US", {
    dateStyle: "medium", // e.g. "May 22, 2025"
    timeStyle: "short",  // e.g. "2:42 PM"
  });
  return formattedDate
}