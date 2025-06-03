'use client'

import fetchInterviewDetails from "@/app/service/interview/fetchInteviewDetails";
import Accordion from "@/components/Accordion";
import LoadingOverlay from "@/components/LoadingOverlay";
import { CalendarDays, Share2, MapPin, Video, Copy, TicketCheck, Timer, User, LucideView, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import CompanyLogo from "../../report/_components/CompanyLogo";

export default function InterviewDetails({ interviewId }) {
  const statusColor = {
    completed: "bg-green-100 text-green-600",
    cancelled: "bg-red-100 text-red-600",
    "in-progress": "bg-yellow-100 text-yellow-700",
    scheduled: "bg-blue-100 text-blue-600",
    default: "bg-gray-100 text-gray-600",
  };

  const [interview, setInterview] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [meetingLoading, setMeetingLoading] = useState(false);

  const router = useRouter();


  useEffect(() => {
    if (!interviewId) return;

    const fetchInterview = async () => {
      try {
        const result = await fetchInterviewDetails(interviewId)

        if (!result.state) {
          setError("Something went wrong")
        }

        // console.log(result);
        setInterview(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInterview();
  }, [interviewId]);

  if(loading){
        return(
          <>
            <LoadingOverlay text="Loading interview details..." />
          </>
        )
      }
  if (error){
    return(
      <>
        {toast.error(`Error in fetching details`)}
      </>
    )
  }

  return (
    <>
      <div className="max-w-4xl mx-auto p-6 mt-8 bg-white rounded-2xl shadow-sm space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex gap-2 space-y-1">
            {interview?.company_logo && (
              <CompanyLogo logo={interview.company_logo} company={interview.interview_name} text="text-2xl" />
            )}

            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {interview.interview_name}
              </h2>
              <p className="text-sm text-gray-500">
                {interview.company} | {interview.position}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColor[interview.status] || statusColor.default
                }`}
            >
              {interview.status}
            </span>
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-500">
          <div>
            <p className="text-xs text-gray-400">Interview Date</p>
            <div className="flex gap-1 items-center font-semibold text-md">
              <CalendarDays className="w-4 h-4" />
              {new Date(interview.interview_time).toLocaleDateString()}
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-400">Location </p>
            <div className="flex gap-1 items-center font-semibold text-md">
              <MapPin className="w-4 h-4" />
              {interview.location}
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-400">Type</p>
            <div className="flex gap-1 items-center font-semibold text-md">
              <Video className="w-4 h-4" />
              {interview.interview_type}
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-400">Duration</p>
            <div className="flex gap-1 items-center font-semibold text-md">
              <Timer className="w-4 h-4" />
              {Math.floor(interview.duration/60)} min
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-400">Style</p>
            <div className="flex gap-1 items-center font-semibold text-md">
              <TicketCheck className="w-4 h-4" />
              {interview.interview_style}
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-400">Created</p>
            <div className="flex gap-1 items-center font-semibold text-md">
              <CalendarDays className="w-4 h-4" />
              {new Date(interview.created_date).toLocaleString()}
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <Accordion
            header="Job Description"
            description={interview?.job_description}
          />
        </div>
      </div>

    </>
  );
}
