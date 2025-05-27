/**
 * Service for handling usage API calls
 */


const uploadResume = async(formData) => {
    if(!formData){
        return {
            state: false,
            error: 'Failed in input',
            message: 'Something wrong in getting formData',
        };
    }

  try{
    const response = await fetch(`/api/resume/upload-resume`, {
    method: "POST",
    body: formData,
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




export default uploadResume;