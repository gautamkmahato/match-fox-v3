/**
 * Service for handling usage API calls
 */


const submitInteviewAttempt = async(interview_id, started_at, status, chat_conversation) => {
    console.log("interview_id, started_at, status, chat_conversation", interview_id, started_at, status, chat_conversation)
    if(interview_id == null || interview_id === undefined){
        return {
            state: false,
            error: 'Failed in input',
            message: 'Something wrong in getting interview_id',
        };
    }
    if(!started_at || !status || !chat_conversation){
        return {
            state: false,
            error: 'Failed in input',
            message: 'Something wrong in usage in getting inputvalues in submitInterviewAttempt',
        };
    }
    const input = {
        interview_id: interview_id,
        started_at: started_at,
        status: status,
        chat_conversation: chat_conversation
    }
  try{
    const response = await fetch(`/api/interview/submit-attempt`, {
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




export default submitInteviewAttempt