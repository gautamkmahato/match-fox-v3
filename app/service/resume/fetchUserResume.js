

const fetchUserResume = async () => {

  try {
    const response = await fetch(`/api/resume/user-resume`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }, 
      cache: 'no-store',
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result?.error || 'Failed to fetch Resume list');
    }

    if (!result?.data) {
      return {
        state: false,
        error: 'No resume list found',
        message: 'No data',
      };
    }

    return {
      state: true,
      data: result.data,
      message: result.message || 'Success',
    };

  } catch (err) {
    console.error('Resume fetch error:', err); // Remove or replace with monitoring logger
    return {
      state: false,
      error: err.message || 'Something went wrong',
      message: 'Failed', 
    };
  }
};

export default fetchUserResume;
