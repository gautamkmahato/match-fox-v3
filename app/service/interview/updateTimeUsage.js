/**
 * Service for handling usage API calls
 */


const updateTimeUsage = async(usage_in_seconds) => {
    if(usage_in_seconds == null || usage_in_seconds == 0){
        return {
        state: false,
        error: 'Failed in input',
        message: 'Something wrong in usage in seconds value',
      };
    }
    const input = {
        usage_in_seconds: usage_in_seconds
    }
  try{
    const response = await fetch(`/api/interview/update-usage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });
  

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result?.error || 'Failed to fetch interview data');
    }

    if (!result?.data) {
      return {
        state: false,
        error: 'Failed',
        message: 'Failed to update usage',
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




export default updateTimeUsage