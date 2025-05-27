
const generateResume = async (job_description, resume) => {
  try {
    const input = {
      job_description: job_description,
      resume: resume
    };
    console.log("generate resume input", input);

    const response = await fetch(`/api/resume/generate-resume`, {
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
        error: "Failed to generate data",
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

export default generateResume;
