'use client';


import LoadingOverlay from "@/components/LoadingOverlay";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import fetchInteviewAttemptDetails from "@/app/service/interview/fetchInteviewAttemptDetails";
import UserRow from "./UserRow";


export default function JobAttemptDetails({ interviewId }) {

    const [jobAttemptList, setJobAttemptList] = useState([]);
    const [loading, setLoading] = useState(false);


    const getJobAttemptList = async () => {
        try {
            setLoading(true);
            const result = await fetchInteviewAttemptDetails(interviewId);
            if (!result?.state) {
                console.log("Error: ", result?.error);
                toast.error(`Error: ${result?.error}`);
            }
            console.log("Full result attempts", result?.data);
            const completedResult = result?.data?.filter((job) => job?.interview_attempts?.status === 'completed')
            console.log("filtered result", completedResult);
            //console.log("Stringyfy result", JSON.stringify(completedResult));
            setJobAttemptList(completedResult);
        } catch (error) {
            console.log("Job attempt fetch error: ", error);
            toast.error(`Job attempt Error: ${error}`);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getJobAttemptList();
    }, []);


    if (loading) {
        return (
            <>
                <LoadingOverlay text="Loading Jobs..." />
            </>
        )
    }

    return (
        <>
            {/* <JobForm /> */}

            <div className="overflow-x-auto bg-white rounded-xl shadow-sm">
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
                        {jobAttemptList && jobAttemptList?.length > 0 && jobAttemptList.map((data, index) => (
                            <UserRow key={index} index={index} report={data} user={data?.interview_attempts?.users} interviewAttempts={data?.interview_attempts} />
                        ))}
                    </tbody>
                </table>
                {/* <div className="p-4 text-sm text-gray-500">
                    Showing: <strong>8</strong> of <strong>17</strong>
                </div> */}
            </div>
            

        </>
    );
};


