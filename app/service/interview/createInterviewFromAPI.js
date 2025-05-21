/**
 * Service for handling create interview API calls
 */


export default async function createInterviewFromAPI(formData, questions) {
  const input = {
    formData: formData,
    questions: questions
  } 
  console.log("create interview data", input)
  const response = await fetch(`/api/interview/create-interview`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });
  

  if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Interview creation failed");
      }

      const result = await response.json()

  return result;
};



 