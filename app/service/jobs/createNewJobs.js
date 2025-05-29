/**
 * Service for handling create jobs API calls
 */


export default async function createNewJobs(formData) {
    const input = {
        formData: formData,
    }
    console.log("create job data", input)

    try { 
        const response = await fetch(`/api/jobs/create-jobs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(input),
        });

        if (!response.ok) {
            return {
                state: false,
                error: `${errData.message} || 'Failed to create job'`,
                message: 'Response Error createJob',
            }
        }

        const result = await response.json();

        console.log("result in create new jobs", result)

        if (!result?.data) {
            return {
                state: false,
                error: 'Failed to create Jobs',
                message: 'Failed',
            };
        }

        return {
            state: true,
            data: result.data,
            message: result.message || 'Success',
        }
    } catch (err) {
        console.error('Jobs create error:', err); // Remove or replace with monitoring logger
        return {
            state: false,
            error: err.message || 'Something went wrong',
            message: 'Failed',
        };
    }

};



