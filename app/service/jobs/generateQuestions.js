
const generateQuestions = async (job_description, company, interview_style, position, difficulty_level, experience,) => {
  try {
    const input = {
      job_description,
      company,
      interview_style,
      position,
      difficulty_level,
      experience,
    }; 
    console.log("generate question input", input);

    const response = await fetch(`/api/jobs/generate-questions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }, 
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Response Error:", errorText);
      return {
        state: false,
        error: "Failed to fetch data",
        message: 'Failed',
      };
    }

    const result = await response.json();

    console.log("result", result);

    if (!result.state) {
      return {
        state: false,
        error: "Backend returned failure",
        message: result.message || 'Failed',
      };
    }

    return {
      state: true,
      data: result.data,
      message: result.message || 'Success',
    };
  } catch (error) {
    console.error("Catch Error:", error);
    return {
      state: false,
      error: error.message || 'Unexpected error',
      message: 'Failed',
    };
  }
};

export default generateQuestions;
