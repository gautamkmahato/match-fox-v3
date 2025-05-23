const fetchInterviewDetails = async (interviewId) => {
  if (!interviewId || typeof interviewId !== 'string') {
    return {
      state: false,
      error: 'Invalid interview ID',
      message: 'Validation failed',
    };
  }

  try { 
    const response = await fetch(`/api/interview/validate/${interviewId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result?.error || 'Failed to fetch interview data');
    }

    if (!result?.data) {
      return {
        state: false,
        error: 'No interview data found',
        message: 'No data',
      };
    }

    return {
      state: true,
      data: result.data,
      message: result.message || 'Success',
    };

  } catch (err) {
    console.error('Interview fetch error:', err); // Remove or replace with monitoring logger
    return {
      state: false,
      error: err.message || 'Something went wrong',
      message: 'Failed',
    };
  }
};

export default fetchInterviewDetails;
