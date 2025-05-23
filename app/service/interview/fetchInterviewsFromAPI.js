
export async function fetchInterviewsFromAPI() {
  try {
    const res = await fetch(`/api/interviews`);
    const result = await res.json();

    if (!res.ok || result.state === false) {
      throw new Error(result.message || 'Failed to fetch interviews.');
    }
 
    return {
      data: result.data || [],
      error: null,
    };
  } catch (err) {
    console.error('API Error:', err);
    return {
      data: [],
      error: err.message || 'Unknown error occurred.',
    };
  }
}
