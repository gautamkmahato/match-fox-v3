'use client';

import { ChevronDown, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const companies = [
  { name: "All", logo: "https://logo.clearbit.com/all.com" },
  { name: "Figma", logo: "https://logo.clearbit.com/figma.com" },
  { name: "Amazon", logo: "https://logo.clearbit.com/amazon.com" },
  { name: "Meta", logo: "https://logo.clearbit.com/meta.com" },
  { name: "HappyCo", logo: "https://logo.clearbit.com/happyco.com" },
  { name: "Google", logo: "https://logo.clearbit.com/google.com" },
  { name: "Apple", logo: "https://logo.clearbit.com/apple.com" },
  { name: "Twitter", logo: "https://logo.clearbit.com/twitter.com" },
  { name: "Uber", logo: "https://logo.clearbit.com/uber.com" },
  { name: "Netflix", logo: "https://logo.clearbit.com/netflix.com" },
  { name: "Snapchat", logo: "https://logo.clearbit.com/snapchat.com" },
];

const filters = ["Type", "Experience", "Location", "Salary"];

export default function RecentJobs({ handleJobFilters }) {
  const [selectedCompany, setSelectedCompany] = useState("");

  const handleFilter = (company) =>{
    setSelectedCompany(company)
    handleJobFilters(company);
  }

  return (
    <div className="p-4 lg:mt-0 mt-16 space-y-6">
      {/* Header with title and create button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:px-16 px-4">
        <h2 className="text-lg font-semibold text-center sm:text-left">
          Recent jobs from top companies
        </h2>
        {/* <Link
          href="/dashboard/jobs/create"
          className="flex items-center gap-1 px-4 py-2 text-sm bg-[#462eb4] text-white rounded-md hover:bg-gradient-to-b hover:from-indigo-600 hover:to-indigo-950 cursor-pointer justify-center"
        >
          <Plus className="text-white w-4 h-4" />
          Create New Job
        </Link> */}
      </div>

      {/* Company logos row */}
      <div className="w-full sm:w-auto mx-auto flex items-center justify-center gap-4 overflow-x-auto px-2 sm:px-4 py-2 scrollbar-thin scrollbar-thumb-gray-300">
        {companies.map((company) => (
          <div
            key={company.name}
            onClick={() => handleFilter(company.name)}
            className={`flex-shrink-0 flex flex-col items-center gap-1 cursor-pointer shadow-md px-4 py-2 rounded-xl transition ${selectedCompany === company.name ? "bg-gray-300" : "bg-gray-100"
              } hover:bg-gray-200`}
          >
            <div className="w-12 h-12 relative">
              <Image
                src={company.logo}
                alt={company.name}
                fill
                className="object-contain rounded-full"
              />
            </div>
            <span className="text-xs text-center font-semibold whitespace-nowrap">
              {company.name}
            </span>
          </div>
        ))}
      </div>


      {/* Filter dropdown buttons */}
      {/* <div className="flex flex-wrap items-center justify-center gap-3 px-2 sm:px-4">
        {filters.map((filter) => (
          <button
            key={filter}
            className="flex items-center gap-2 text-gray-600 rounded-md border border-gray-200 bg-white px-4 py-2 text-sm shadow-md hover:bg-gray-50"
          >
            {filter}
            <ChevronDown className="w-4 h-4" />
          </button>
        ))}
      </div> */}
    </div>
  );
}
