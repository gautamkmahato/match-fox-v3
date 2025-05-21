export function cleanCodeBlock(text) {
    const cleaned = text.replace(/^```json\s*([\s\S]*?)\s*```$/i, '$1').trim();
    const json = JSON.parse(cleaned);
    return json
}


export function extractJsonBlock(text) {
  if (!text) return "";

  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");

  if (start === -1 || end === -1 || end <= start) return "";

  return text.slice(start, end + 1).trim();
}
