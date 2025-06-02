export function cleanCodeBlock(text) {
  const match = text.match(/```json\s*([\s\S]*?)\s*```/i);
  if (match) {
    const cleaned = match[1].trim();
    return JSON.parse(cleaned);
  }

  // fallback: try to parse the raw text if it's valid JSON
  try {
    return JSON.parse(text.trim());
  } catch (err) {
    throw new Error("Invalid JSON: Could not extract or parse a valid JSON block.");
  }
}


export function extractJsonBlock(text) {
  if (!text) return "";

  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");

  if (start === -1 || end === -1 || end <= start) return "";

  return text.slice(start, end + 1).trim();
}
