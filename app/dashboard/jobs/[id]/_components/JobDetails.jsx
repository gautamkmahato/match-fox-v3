
import Accordion from "@/components/Accordion";
import { CalendarDays, Share2, MapPin, Video, Copy, TicketCheck, Timer, User, LucideView, Clock, DollarSign } from "lucide-react";
import { toast } from "sonner";

export default function JobDetails({ job }) {
  const statusColor = {
    completed: "bg-green-100 text-green-600",
    cancelled: "bg-red-100 text-red-600",
    "in-progress": "bg-yellow-100 text-yellow-700",
    scheduled: "bg-blue-100 text-blue-600",
    default: "bg-gray-100 text-gray-600",
  };

  

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500">
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
              <h3 className="text-md font-semibold text-gray-800">Interview Link</h3>
            </div>
            {/* <span className="text-xs font-medium text-teal-700 bg-teal-100 px-2 py-1 rounded-full">
              Valid for 30 days
            </span> */}
          </div>

          <div className="flex justify-between items-center bg-white border border-gray-200 rounded-md px-4 py-2">
              <span className="text-sm text-gray-800 truncate">
                {`https://hirenom.com/dashboard/meetings/${job?.id}`}
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`https://hirenom.com/dashboard/meetings/${job?.id}`);
                  toast("Link copied to clipboard!");
                }}
                className="flex gap-1 items-center text-white bg-[#462eb4] hover:bg-indigo-800 cursor-pointer font-medium px-3 py-2 rounded-md"
              >
                <Copy className="w-3 h-3 text-white" />
                <span className="lg:text-xs text-[10px]">Copy</span>
              </button>
            </div>
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

    </>
  );
}
