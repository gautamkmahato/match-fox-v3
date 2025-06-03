'use client'

import fetchReportDetails from "@/app/service/interview/fetchReportDetails";
import LoadingOverlay from "@/components/LoadingOverlay";
import Tabs from "@/components/Tabs";
import { useEffect, useState } from "react";
import { toast } from "sonner";


export default function ReportComponent({ id }) {

    const [reportDetails, setReportDetails] = useState();
    const [loading, setLoading] = useState(false);


    useEffect(() =>{ 
        async function getReport() {
            try{
                setLoading(true);
                const result = await fetchReportDetails(id);
                if(!result?.state){
                    // console.log("Error: ", result?.error);
                    toast.error("Error in fetching report card");
                }
                // console.log(result?.data);
                setReportDetails(result?.data);
            } catch(err){
                // console.log(err); 
            } finally{
                setLoading(false);
                toast.info("Successfully fetched the report");
            }
        }
        getReport();
    }, [id]);

    if (loading) {
        return (
          <>
            <LoadingOverlay text="Loading Report..." />
          </>
        )
    }

    return(
        <> 
            <Tabs reportDetails={reportDetails} />
        </>
    )    
}