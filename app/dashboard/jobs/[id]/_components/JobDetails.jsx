'use client'

import fetchJobDetails from "@/app/service/jobs/fetchJobDetails";
import Accordion from "@/components/Accordion";
import { CalendarDays, Share2, MapPin, Video, Copy, TicketCheck, Timer, User, LucideView, Clock, DollarSign } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function JobDetails({ interviewId }) {
  const statusColor = {
    completed: "bg-green-100 text-green-600",
    cancelled: "bg-red-100 text-red-600",
    "in-progress": "bg-yellow-100 text-yellow-700",
    scheduled: "bg-blue-100 text-blue-600",
    default: "bg-gray-100 text-gray-600",
  };

  const [job, setJob] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [meetingLoading, setMeetingLoading] = useState(false);

  const router = useRouter();

  // employment_type
  // job_type
  // salary
  // location
  // duration

//   const generateLink = async () => {
//     try {
//       setMeetingLoading(true);
//       const response = await fetch(`/api/interviews/${interviewId}/generate-link`, {
//         method: 'POST',
//       });

//       const result = await response.json();

//       console.log("result: ", result);

//       if (!response.ok || !result.state) throw new Error(result.error || "Failed to generate link");

//       // Update state first
//       setInterview((prev) => ({
//         ...prev,
//         "interview_link": result.data.link,
//       }));
//       console.log(interview)
//       await router.push(`/dashboard/interview/${interviewId}`);
//     } catch (err) {
//       alert(`Error: ${err.message}`);
//       setMeetingLoading(false);
//     } finally {
//       setMeetingLoading(false);
//     }
//   };

// 

  useEffect(() => {
    if (!interviewId) return;

    const fetchInterview = async () => {
      try {
        setLoading(true);
        const result = await fetchJobDetails(interviewId);

        if (!result?.state){
            console.log(data.error || "Failed to fetch");
            toast.error(data.error || "Failed to fetch");
        }

        if (!result.state) {
          setError("Something went wrong");
          toast.error("Something went wrong");
        }

        console.log(result);
        setJob(result?.data);
      } catch (err) {
        console.log(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInterview();
  }, [interviewId]);

  if (loading) return <p>Loading job?...</p>;

  return (
    <>
      <div className="max-w-4xl mx-auto p-6 mt-8 bg-white rounded-2xl shadow-sm space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex gap-2 space-y-1">
            {job?.company_logo && (
              <img
                src={job?.company_logo}
                alt="Company Logo"
                className="w-12 h-12 rounded-full"
              />
            )}

            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {job?.interview_name}
              </h2>
              <p className="text-sm text-gray-500">
                {job?.company} | {job?.position}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColor[job?.status] || statusColor.default
                }`}
            >
              {job?.status}
            </span>
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-500">
          <div className="border border-gray-200 shadow p-3 rounded-xl">
            <p className="text-xs text-gray-400 mb-1">Interview Date</p>
            <div className="flex gap-1 items-center font-semibold text-md">
              <CalendarDays className="w-4 h-4" />
              {job?.employment_type}
            </div>
          </div>
          <div className="border border-gray-200 shadow p-3 rounded-xl">
            <p className="text-xs text-gray-400 mb-1">Location </p>
            <div className="flex gap-1 items-center font-semibold text-md">
              <MapPin className="w-4 h-4" />
              {job?.location}
            </div>
          </div>
          <div className="border border-gray-200 shadow p-3 rounded-xl">
            <p className="text-xs text-gray-400 mb-1">Type</p>
            <div className="flex gap-1 items-center font-semibold text-md">
              <Video className="w-4 h-4" />
              {job?.job_type}
            </div>
          </div>
          <div className="border border-gray-200 shadow p-3 rounded-xl">
            <p className="text-xs text-gray-400 mb-1">Duration</p>
            <div className="flex gap-1 items-center font-semibold text-md">
              <Timer className="w-4 h-4" />
              {Math.ceil(job?.duration/60)} min
            </div>
          </div>
          <div className="border border-gray-200 shadow p-3 rounded-xl">
            <p className="text-xs text-gray-400 mb-1">Salary</p>
            <div className="flex gap-1 items-center font-semibold text-md">
              <DollarSign className="w-4 h-4" />
              {job?.salary}
            </div>
          </div>
          <div className="border border-gray-200 shadow p-3 rounded-xl">
            <p className="text-xs text-gray-400 mb-1">Created</p>
            <div className="flex gap-1 items-center font-semibold text-md">
              <CalendarDays className="w-4 h-4" />
              {job?.created_date.split('T')[0]}
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <Accordion
            header="Job Description"
            description={job?.job_description}
          />
        </div>

        {/* Interview Link Card */}
        <div className="border border-gray-200 rounded-lg p-5 bg-gray-50 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-semibold text-gray-800">Interview Link</h3>
            </div>
            {/* <span className="text-xs font-medium text-teal-700 bg-teal-100 px-2 py-1 rounded-full">
              Valid for 30 days
            </span> */}
          </div>

          {!meetingLoading ? (job?.interview_link ? <div>
            <div className="flex justify-between items-center bg-white border border-gray-200 rounded-md px-4 py-2">
              <span className="text-sm text-gray-800 truncate">
                {`https://hirenom.com/dashboard/meetings/${job?.id}`}
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`https://hirenom.com/dashboard/meetings/${job?.id}`);
                  alert("Link copied to clipboard!");
                }}
                className="flex gap-1 items-center text-white bg-teal-800 hover:bg-teal-950 cursor-pointer text-sm font-medium px-3 py-2 rounded-md"
              >
                <Copy className="w-3 h-3 text-white" />
                <span className="text-xs">Copy Link</span>
              </button>
            </div>
            <div className="flex items-center gap-6 mt-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {job?.duration} min
              </div>
              <div className="flex items-center gap-1">
                <Video className="w-4 h-4" />
                {job?.interview_type}
              </div>
              <div className="flex items-center gap-1">
                <CalendarDays className="w-4 h-4" />
                Expires:{" "}
                {job?.expiry_date
                  ? new Date(job?.expiry_date).toLocaleDateString()
                  : "N/A"}
              </div>
            </div>
          </div> : <div>
            <div className="flex flex-col text-center items-center justify-center">
              <h3 className="font-semibold text-sm text-gray-500">No meeting link available</h3>
              <button className="group mt-4 inline-flex bg-teal-800 text-white px-3 py-2 rounded-md items-center gap-1 text-sm font-medium cursor-pointer shadow-sm shadow-teal-800 hover:bg-teal-950 hover:shadow-sm hover:shadow-teal-900">Generate Meeting Link</button>
            </div>
          </div>) : <div>
            <p>Generting meeting link...</p>
          </div>}
        </div>

        {/* Share Section */}
        <div className="pt-4">
          <div className="flex items-center">
            <span className="text-sm text-gray-600 font-medium flex items-center gap-2">
              <Share2 className="w-4 h-4" /> Share Interview Link:
            </span>
          </div>
        </div>
      </div>

      {/* Candidates Section - Placeholder data for now */}
      <div className="max-w-4xl mx-auto p-6 mt-8 bg-white rounded-2xl shadow-sm space-y-6">
        <h3 className="font-semibold">Candidates</h3>
        <div className="bg-gray-50 p-4 rounded-xl flex items-center justify-between shadow">
          <div className="flex gap-2 items-center">
            <div className="bg-teal-200 p-2 rounded-full">
              <User />
            </div>
            <div className="flex flex-col text-xs">
              <span className="font-semibold">Gautam Mahato</span>
              <span className="text-gray-500">Completed on 08-05-2025</span>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <p className="text-gray-800 font-semibold text-xs bg-gray-300 px-3 py-2 rounded-lg">
              80%
            </p>
            <button className="flex gap-1 border-2 border-teal-600 p-2 rounded-lg items-center text-teal-800 shadow cursor-pointer hover:text-teal-950">
              <LucideView className="w-3 h-3" />
              <span className="text-xs">View Report</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
