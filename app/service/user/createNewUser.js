

export default async function createNewUser(inputData){
    console.log("input data from create user: ", inputData)
    const response = await fetch('http://localhost:3000/api/user/create', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(inputData)
    });
    const result = await response.json(); 

    if(!response.ok){
        return {
            message: "Error in Inserting Data in createNewUser"
        }
    }
    return result;
}