

const fetchUserDetails = async () => {

  try {
    const response = await fetch(`${process.env.NEXT_APP_PRODUCTION_HOSTNAME}/api/user/full-details`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }, 
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch interview list');
    }

    const result = await response.json();


    if (!result?.data) {
      return {
        state: false,
        error: 'No user found',
        message: 'Failed',
      };
    }

    return {
      state: true,
      data: result?.data,
      message: result.message || 'Success',
    };

  } catch (err) {
    console.error('user fetch error:', err); // Remove or replace with monitoring logger
    return {
      state: false,
      error: err.message || 'Something went wrong',
      message: 'Failed',
    };
  }
};

export default fetchUserDetails;
