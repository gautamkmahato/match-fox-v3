/**
 * Service for saving the newly generated PDF to DB
 */


export default async function saveResume(file_name, htmlContent) {
    if(!htmlContent){
        return {
            state: false,
            error: 'Failed in input',
            message: 'Something wrong in saving htmlContent',
        };
    }

    const input = {
        file_name: file_name,
        html_content: htmlContent,
    }

  try{
    const response = await fetch(`/api/resume/save-resume`, {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(input),
  });
  

    const result = await response.json();

    if (!response.ok) {
      return {
        state: false,
        error: `${result?.error} || Failed to insert resume`,
        message: 'Failed',
      };
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


