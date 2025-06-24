import { ArrowRight, Calendar, Clock, Timer } from "lucide-react";
import Link from "next/link";
import CompanyLogo from "../../report/_components/CompanyLogo";

const InterviewCard = ({ id, name, duration, logo, date, status, position, type, company}) => {
  // console.log(date)
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-md shadow-gray-200 transition hover:shadow-lg flex items-center gap-4">
      <CompanyLogo logo={logo} company={company?.charAt(0).toUpperCase()} text="text-2xl" />
      
      <div className="flex-1">
        <h3 className="flex items-center justify-between font-semibold text-gray-800">
          <span>{name}</span>
          <span
            className={`text-xs font-medium px-2 py-1 rounded ${status === 'completed'
              ? 'bg-green-100 text-green-600'
              : status === 'cancelled'
                ? 'bg-red-100 text-red-600'
                : status === 'in-progress'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-gray-100 text-gray-600'
              }`}
          >
            {status}
          </span>
        </h3>


        <p className="flex flex-wrap gap-4 text-xs mt-1 mb-2 text-gray-500">
          {/* Date */}
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>{new Date(date).toLocaleDateString()}</span>
          </span>

          {/* Time */}
          <span className="flex items-center gap-1">
            <Timer className="w-4 h-4 text-gray-400" />
            <span>{new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </span>
        </p>

        <div className="flex gap-2 items-center">
          <p className="border border-gray-200 text-gray-700 text-xs font-medium px-2 py-1 rounded">{position}</p>
          <p className="border border-gray-200 text-gray-700 text-xs font-medium px-2 py-1 rounded">{type}</p>
          <p className="flex gap-1 items-center text-xs">
            <Clock className="w-3 h-3" />
            <span>{duration} Min</span>
          </p>
        </div>

        <div className="flex gap-2 items-center">
          <div className="flex gap-2 items-center">
          <Link href={`/dashboard/interview/${id}`} className="group mt-4 inline-flex bg-[#462eb4] text-white px-3 py-2 rounded-md items-center gap-1 text-sm font-medium shadow-sm shadow-[#462eb4] hover:bg-indigo-900 hover:shadow-sm hover:shadow-teal-900">
            View Details
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        {status === 'open' ? <div className="flex gap-2 items-center">
          <Link href={`/dashboard/meetings/${id}`} className="group mt-4 inline-flex bg-[#462eb4] text-white px-3 py-2 rounded-md items-center gap-1 text-sm font-medium shadow-sm shadow-[#462eb4] hover:bg-indigo-900 hover:shadow-sm hover:shadow-teal-900">
            Start Interview
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div> : status === 'in-progress' ? <div className="flex gap-2 items-center">
          <Link href={`/dashboard/meetings/${id}`} className="group mt-4 inline-flex bg-[#462eb4] text-white px-3 py-2 rounded-md items-center gap-1 text-sm font-medium shadow-sm shadow-[#462eb4] hover:bg-indigo-900 hover:shadow-sm hover:shadow-teal-900">
            Continue Interview
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div> : <></>}
        </div>

      </div>
    </div>
  );
};

export default InterviewCard;
