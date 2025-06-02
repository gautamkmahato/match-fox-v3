'use client';

import LoadingOverlay from "@/components/LoadingOverlay";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import JobCard from "./JobCard";
import fetchAllJobsWithUser from "@/app/service/jobs/fetchAllJobsWithUser";


export default function JobList() {

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);


    const getJobs = async () =>{
        try{
            setLoading(true);
            const result = await fetchAllJobsWithUser();
            if(!result?.state){
                console.log("Error: ", result?.error);
                toast.error(`Error: ${result?.error}`);
            }
            console.log("result jobs", result?.data);
            setJobs(result?.data);
        } catch(error){
            console.log("Job fetch error: ", error);
            toast.error(`Job Error: ${error}`);
        } finally{
            setLoading(false);
        }
    }
    useEffect(() =>{
        getJobs();
    }, []);


    if(loading){
        return(
            <>
                <LoadingOverlay text="Loading..." />
            </>
        )
    }
  
    return (
        <>
        {/* <JobForm /> */} 
        <div className="grid grid-cols-1 lg:mt-0 lg:grid-cols-3 md:grid-cols-1 gap-6">
            {jobs && jobs?.length > 0 && jobs.map((job, index) =>(
                <div key={index}>
                    <JobCard
                        id={job?.id}
                        companyLogo={job?.company_logo}
                        companyName={job?.company}
                        employmentType={job?.employment_type}
                        location={job?.location}
                        title={job?.interview_name}
                        salary={job?.salary}
                        status={job?.status}
                        job_type={job?.job_type}
                        personName={job?.users?.name}
                        personTitle={job?.recruiter_title}
                        personAvatar={job?.users?.img_url}
                    />
                </div>
            ))}
        </div>

        </>
    );
};


