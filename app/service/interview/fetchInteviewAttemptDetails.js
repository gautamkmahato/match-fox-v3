

const fetchInteviewAttemptDetails = async (interviewId) => {

  try { 
    const response = await fetch(`/api/interview/interview-attempts/${interviewId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }, 
      cache: 'no-store',
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result?.error || 'Failed to fetch interview attempt details');
    }

    if (!result?.data) {
      return {
        state: false,
        error: 'No interview attempt found',
        message: 'No data',
      };
    }

    return {
      state: true,
      data: result.data,
      message: result.message || 'Success',
    };

  } catch (err) {
    console.error('Interview attempt fetch error:', err); // Remove or replace with monitoring logger
    return {
      state: false,
      error: err.message || 'Something went wrong',
      message: 'Failed',
    };
  }
};

export default fetchInteviewAttemptDetails;
