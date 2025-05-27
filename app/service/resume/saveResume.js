/**
 * Service for saving the newly generated PDF to DB
 */


export default async function saveResume(htmlContent) {
    if(!htmlContent){
        return {
            state: false,
            error: 'Failed in input',
            message: 'Something wrong in saving htmlContent',
        };
    }

    const input = {
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
      console.log("response:::", result)
      return {
        state: false,
        error: `${result?.error} || Failed to insert resume`,
        message: 'Failed',
      };
    }

    if (!result?.state) {
      console.log("result no data:::", result)
      return {
        state: false,
        error: 'Failed',
        message: 'Failed to update usage',
      };
    }
console.log("result:::", result)
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


