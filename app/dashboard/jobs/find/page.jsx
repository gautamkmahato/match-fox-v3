'use client';

import fetchAllJobs from "@/app/service/jobs/fetchAllJobs";
import LoadingOverlay from "@/components/LoadingOverlay";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import RecentJobs from "./_components/RecentJobs";
import JobCard from "../_components/JobCard";

export default function JobComponent() {
  const [jobs, setJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleJobFilters = (company) => {
    if (!company || company === "All") {
      setJobs(allJobs);
    } else {
      const filteredJobs = allJobs.filter(
        (job) => job?.company?.trim()?.toUpperCase() === company?.trim()?.toUpperCase()
      );
      // console.log(filteredJobs)
      setJobs(filteredJobs);
    }
  };

  const getJobs = async () => {
    try {
      setLoading(true);
      const result = await fetchAllJobs();
      if (!result?.state) {
        // console.log("Error: ", result?.error);
        toast.error(`Error: ${result?.error}`);
        return;
      }

      // console.log("result jobs", result?.data);
      setAllJobs(result?.data); // set full list
      setJobs(result?.data);    // set initial display list
    } catch (error) {
      // console.log("Job fetch error: ", error);
      toast.error(`Job Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  if (loading) {
    return <LoadingOverlay text="Loading Jobs..." />;
  }

  return (
    <>
      <RecentJobs handleJobFilters={handleJobFilters} />

      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6 p-6">
        {jobs && jobs.length > 0 ? (
          jobs.map((job, index) => (
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
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No jobs found for the selected filters.
          </div>
        )}
      </div>
    </>
  );
}
