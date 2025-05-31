/**
 * Service for chat with AI agent
 */


const chatWithAgent = async (report, chat) => {
    const input = {
        report,
        chat,
    }
    try {
        const response = await fetch(`/api/interview/chat-agent`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(input),
        });


        if (!response.ok) {
            //const errorData = await response.text();
            return {
                status: false,
                error: "Failed to fetch data",
                message: 'Failed',
            };
        }

        const result = await response.json();

        if (!result?.state) {
            return {
                status: false,
                error: "Failed to generate answer",
                message: 'Failed',
            };
        }

        return {
            status: true,
            data: result?.data,
            message: 'Success',
        };
        
    } catch (error) {
        return {
            status: false,
            error: `Catch Error: ${error}`,
            message: 'Failed',
        };
    }
};



export default chatWithAgent