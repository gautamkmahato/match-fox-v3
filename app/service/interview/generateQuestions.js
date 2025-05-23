import { flattenCommaArray } from "@/lib/utils/helper";

const generateQuestions = async (interviewDetails, resume) => {
  try {
    const input = {
      ...interviewDetails,
      skills_required: flattenCommaArray(interviewDetails?.["Skills"]),
      tech_stack: flattenCommaArray(interviewDetails?.["Tech Stack"]),
      resume: resume 
    };
    console.log("generate question input", input);

    const response = await fetch(`/api/interview/generate-questions`, {
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
        status: false,
        error: "Failed to fetch data",
        message: 'Failed',
      };
    }

    const result = await response.json();

    console.log("result", result);

    if (!result.state) {
      return {
        status: false,
        error: "Backend returned failure",
        message: result.message || 'Failed',
      };
    }

    return {
      status: true,
      data: result.data,
      message: result.message || 'Success',
    };
  } catch (error) {
    console.error("Catch Error:", error);
    return {
      status: false,
      error: error.message || 'Unexpected error',
      message: 'Failed',
    };
  }
};

export default generateQuestions;
