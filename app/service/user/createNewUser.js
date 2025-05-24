

export default async function createNewUser(inputData){
    console.log("input data from create user: ", inputData)
    try{
        const response = await fetch(`${process.env.NEXT_APP_PRODUCTION_HOSTNAME}/api/user/create`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json' 
        },
        body: JSON.stringify(inputData)
    });
    const result = await response.json();  

    if(!response.ok){
        return {
        state: false,
        error: 'Failed to create new user',
         message: "Error in Inserting Data in createNewUser"
      };
    }
    if (!result?.data) {
      return {
        state: false,
        error: 'Failed to create new user',
        message: 'No data',
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
}