

export default async function updateUserDetails(formData){
    
    console.log("input data from update user: ", formData);

    try{
        // const response = await fetch(`${process.env.NEXT_APP_PRODUCTION_HOSTNAME}/api/user/create`, {
        const response = await fetch(`http://localhost:3000/api/user/update`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json' 
        },
        body: JSON.stringify(formData)
    });
    const result = await response.json();  

    if(!response.ok){
        return {
        state: false,
        error: 'Failed to update the user',
         message: "Error in updating Data in user"
      };
    }
    if (!result?.data) {
      return {
        state: false,
        error: 'Failed to update user',
        message: 'No data',
      };
    }
    return {
      state: true,
      data: result.data,
      message: result.message || 'Success',
    };
    } catch (err) {
    console.error('Update error:', err); // Remove or replace with monitoring logger
    return {
      state: false,
      error: err.message || 'Something went wrong',
      message: 'Failed',
    };
  }
}