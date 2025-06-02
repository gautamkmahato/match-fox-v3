'use client'

import Image from "next/image";
import { toast } from "sonner";
import CompanyLogo from "../report/_components/CompanyLogo";
import Link from "next/link";


export default function InterviewList({ interviews }) {

  return (
    <>
      {/* Credits Info */}
      <div className="bg-white shadow rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Interviews</h3>
        <ul className="space-y-2 divide-gray-200">
          {interviews.map((interview) => (
            <li key={interview.id} className="bg-gray-50 px-4 py-3 rounded-lg mb-3 flex items-center gap-2 border border-gray-50 shadow">
              <CompanyLogo logo={interview?.company_logo} company={interview?.company} width="w-8" height="h-8" />
              <div>
                <Link href={`/dashboard/interview/${interview?.id}`}>
                  <h3 className="text-sm font-semibold text-gray-600 hover:underline">
                    {interview?.interview_name}
                  </h3>
                </Link>
                <p className="text-xs text-gray-500">{interview?.company}</p>
              </div>
              {/* <span className="text-sm font-semibold text-indigo-600">{interview.score}%</span> */}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}