'use client'

import fetchUsage from "@/app/service/interview/fetchUsage";
import LoadingOverlay from "@/components/LoadingOverlay";
import { CreditCard } from "lucide-react";
import { useEffect, useState } from "react";


export default function ShowCreditComponent(){

      const [usage, setUsage] = useState();
      const [loading, setLoading] = useState(false);
    
    const getUsage = async () =>{
    try{
        setLoading(true)
      const result = await fetchUsage();
      if(!result?.state){
        toast.error("Error in fetching Credits")
      }
      // console.log(result?.data)
      setUsage(result?.data);
    } catch(error){
      // console.log("Usage fetch error: ", error);
      toast.error("Usage fetch error")
    } finally{
        setLoading(false)
    }
  }

  useEffect(() =>{
    getUsage()
  }, []);

  
    return(
        <>
            {/* Credits Info */}
        {!loading ? 
        <div className="bg-white shadow rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold text-gray-800">Your Plan</h2>
            <CreditCard className="text-gray-400" />
          </div>
          {/* <p className="text-sm text-gray-600">Plan: <strong>{creditsData.plan}</strong></p> */}
          <p className="text-sm text-gray-600">
            Credits: <strong>{usage?.remaining_minutes}</strong>
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
            <div
              className="bg-indigo-800 h-2 rounded-full"
              style={{
                width: `${(usage?.remaining_minutes / 300) * 100}%`,
              }}
            />
          </div>
        </div> :
        <LoadingOverlay text="Loading credits" />
        }
        </>
    )
}