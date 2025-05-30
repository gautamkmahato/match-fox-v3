/**
 * Service for handling usage API calls
 */
 

const updateInterviewDuration = async( currentDuration, interviewId, status ) => {
    if(currentDuration == null || interviewId == null || !status){
        return {
        state: false,
        error: 'Failed in input',
        message: 'Something wrong in interviewId or currentDuration value',
      };
    }
    const input = {
        currentDuration, 
        interviewId,
        status
    }
  try{
    const response = await fetch(`/api/interview/update-interview`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });
  

    const result = await response.json();

    if (!response.ok) {
      return {
        state: false,
        error: `${result?.error} || 'Failed to update interview data'`,
        message: 'Error response',
      };
    }

    if (!result?.data) {
      return {
        state: false,
        error: 'Failed',
        message: 'Failed to update interview',
      };
    }

    return {
      state: true,
      data: result.data,
      message: result.message || 'Success',
    };
  } catch (err) {
    console.error('Interview update error:', err); // Remove or replace with monitoring logger
    return {
      state: false,
      error: err.message || 'Something went wrong',
      message: 'Failed',
    };
  }
};




export default updateInterviewDuration