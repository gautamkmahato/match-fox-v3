import Image from "next/image";
import CompanyLogo from "../../report/_components/CompanyLogo";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function JobCard({
  id,
  companyLogo,
  companyName,
  employmentType,
  location,
  title,
  salary,
  status,
  job_type,
  personName,
  personTitle,
  personAvatar,
  highlight = false,
}) {

  const pathname = usePathname();

  console.log("company name", companyLogo);

  return (
    <div className={`rounded-xl`}>
      <div
        className={`rounded-xl bg-white p-5 space-y-2 border border-gray-100 shadow-md flex flex-col gap-1`}
      >
        {/* Top Section */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 relative">
              {/* <Image
                src="https://logo.clearbit.com/google.com"
                alt={companyName}
                fill
                className="rounded-full object-contain"
              /> */}
              
              <CompanyLogo logo={companyLogo} company={companyName?.charAt(0).toUpperCase()} width="w-10" height="h-10" />

            </div>
            <div className="flex flex-col ">
                <span className="text-sm font-semibold text-gray-800">
              {companyName}
            </span>
            <span className="text-xs font-medium text-gray-800">
              {location}
            </span>
            </div>
          </div>
          <span 
            className={`text-xs font-medium px-2 py-1 rounded-md ${
              status.toUpperCase() === 'SCHEDULED'
                ? "bg-yellow-100 text-yellow-800"
                : "bg-pink-100 text-pink-600"
            }`}
          > 
            {status}
          </span>
        </div>

        {/* Job Title */}
        <h3
          className={`text-lg font-semibold ${
            highlight
              ? "bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-transparent bg-clip-text"
              : "text-gray-900"
          }`}
        >
          {title}
        </h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          <span
              className="text-xs border border-gray-300 text-gray-700 px-3 py-1 rounded-md"
            >
              {employmentType} 
            </span> 
            <span
              className="text-xs border border-gray-300 text-gray-700 px-3 py-1 rounded-md"
            >
              {job_type}
            </span>
          <span className="text-xs border border-gray-300 text-gray-700 px-3 py-1 rounded-md">
            ${salary}
          </span>
        </div>

        {/* Footer */}
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 relative">
                <CompanyLogo logo={personAvatar} company={personName?.charAt(0).toUpperCase()} width="w-6" height="h-6" />
            </div>
            <div className="text-xs leading-tight">
              <p className="font-semibold text-gray-900">{personName}</p>
              <p className="text-gray-500 text-[11px]">{personTitle}</p>
            </div>
          </div>
          {pathname.startsWith('/dashboard/jobs/find') || pathname.startsWith('/dashboard/interview') ? (
  <Link
    href={`/dashboard/meetings/${id}`}
    className="flex items-center gap-2 bg-[rgb(70,46,180)] text-white px-4 py-2 text-xs rounded-md hover:bg-gradient-to-b hover:from-indigo-600 hover:to-indigo-950 cursor-pointer"
  >
    Start Interview
    <ArrowRight className="w-3 h-3" />
  </Link>
) : (
  <Link
    href={`/dashboard/jobs/${id}`}
    className="flex items-center gap-2 bg-[#462eb4] text-white px-4 py-2 text-xs rounded-md hover:bg-gradient-to-b hover:from-indigo-600 hover:to-indigo-950 cursor-pointer"
  >
    View Details
    <ArrowRight className="w-3 h-3" />
  </Link>
)}

          
          {/* // <Link href={`/dashboard/jobs/${id}`} className="flex items-center gap-2 bg-[#462eb4] text-white px-4 py-2 text-xs rounded-md hover:bg-gradient-to-b hover:from-indigo-600 hover:to-indigo-950 cursor-pointer">
          //   View Details
          //   <ArrowRight className="w-3 h-3" />
          // </Link> */}
          
        </div>
      </div>
    </div>
  );
}
