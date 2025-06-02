'use client'

import LoadingOverlay from "@/components/LoadingOverlay"
import { useEffect } from "react"
import { toast } from "sonner"
import fetchInteviewAttemptDetails from "@/app/service/interview/fetchInteviewAttemptDetails"
import UserRow from "./UserRow"

export default function JobAttemptDetails({ 
    interviewId, 
    candidatesData, 
    setCandidatesData, 
    loading, 
    setLoading 
}) {
    const getJobAttemptList = async () => {
        try {
            setLoading(true)
            const result = await fetchInteviewAttemptDetails(interviewId)
            if (!result?.state) {
                console.log("Error: ", result?.error)
                toast.error(`Error: ${result?.error}`)
            }
            // use this if want to filter for completed only
            const completedResult = result?.data?.filter((job) => job?.interview_attempts?.status === 'completed')
            setCandidatesData(result?.data)
        } catch (error) {
            console.log("Job attempt fetch error: ", error)
            toast.error(`Job attempt Error: ${error}`)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!candidatesData) {
            getJobAttemptList()
        }
    }, [interviewId])

    if (loading && !candidatesData) {
        return <LoadingOverlay text="Loading Candidates..." />
    }

    return (
        <div className="w-full overflow-x-auto bg-white rounded-xl shadow-sm">
            <table className="min-w-full text-left text-sm">
                <thead className="bg-gray-50 border-b">
                    <tr>
                        <th className="px-4 py-2">Full Name</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2 text-center">Score</th>
                        <th className="px-4 py-2 text-center">Recommendation</th>
                        <th className="px-4 py-2">Details</th>
                    </tr>
                </thead>
                <tbody>
                    {candidatesData?.length > 0 && candidatesData.map((data, index) => (
                        <UserRow 
                            key={index} 
                            index={index} 
                            report={data} 
                            user={data?.interview_attempts?.users} 
                            interviewAttempts={data?.interview_attempts} 
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}
