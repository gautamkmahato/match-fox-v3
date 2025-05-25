'use client'

import fetchAllInterviews from "@/app/service/interview/fetchAllInterviews";
import { useEffect, useState } from "react";


export default function InterviewList(){

  const [interviews, setInterviews] = useState([]);
    
  const getInterviews = async () =>{
    try{
      const result = await fetchAllInterviews();
      if(!result?.state){
        toast.error("Error in fetching Interviews")
      }
      console.log(result?.data)
      setInterviews(result?.data);
    } catch(error){
      console.log("Usage fetch error: ", error);
      toast.error("Usage fetch error")
    }
  }

  useEffect(() =>{
    getInterviews()
  }, []);

    return(
        <>
            {/* Credits Info */}
        <div className="bg-white shadow rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Interviews</h3>
                <ul className="divide-y divide-gray-200">
                  {interviews.map((interview) => (
                    <li key={interview.id} className="bg-gray-50 px-4 py-1.5 mb-3 flex items-center justify-between border border-gray-50 shadow">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-600">{interview?.interview_name}</h3>
                        <p className="text-xs text-gray-500">{interview?.company}</p>
                      </div>
                      {/* <span className="text-sm font-semibold text-indigo-600">{interview.score}%</span> */}
                    </li>
                  ))}
                </ul>
              </div>
        </>
    )
}