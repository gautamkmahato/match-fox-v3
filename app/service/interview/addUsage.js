
const addUsage = async () => {
 
  try {
    const input = {
        message: "Updating usage"
    };

    const response = await fetch(`${process.env.NEXT_APP_HOSTNAME}/api/interview/add-usage`, {
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
        error: "Failed to Insert usage data",
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

export default addUsage;
