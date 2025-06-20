/**
 * Service for handling create interview API calls
 */


export default async function createInterviewFromAPI(formData, questions) {
  const input = {
    formData: formData,
    questions: questions
  }
  console.log("create interview data", input)

  try { 
    const response = await fetch(`/api/portal/create-interview`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });


    if (!response.ok) {
      return {
        state: false,
        error: `Failed to create Interview`,
        message: 'Response Error fetchInterviewReport',
      }
    }

    const result = await response.json();

    if (!result?.data) {
      return {
        state: false,
        error: 'Failed to create Interview',
        message: 'Failed',
      };
    }

    return {
      state: true,
      data: result.data,
      message: result.message || 'Success',
    }
  } catch (err) {
    console.error('Interview fetch error:', err); // Remove or replace with monitoring logger
    return {
      state: false,
      error: err.message || 'Something went wrong',
      message: 'Failed',
    };
  }

};



