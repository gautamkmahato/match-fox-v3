'use client';

import { BadgeCheck, ThumbsUp, ThumbsDown } from 'lucide-react';


export default function AIReportCard({
  companyLogo,
  companyName,
  interviewTitle,
  position,
  userName,
  overallScore,
  recommendation,
  skills,
  summary,
}) {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-2xl space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <img src={companyLogo} alt={companyName} className="w-16 h-16 rounded-lg object-cover" />
        <div>
          <h2 className="text-xl font-bold">{companyName}</h2>
          <p className="text-sm text-gray-600">{interviewTitle} – {position}</p>
        </div>
      </div>

      {/* Candidate Info */}
      <div className="flex items-center justify-between border-t border-gray-200 pt-4">
        <div>
          <p className="text-gray-500 text-sm">Candidate</p>
          <p className="font-semibold text-md">{userName.toUpperCase()}</p>
        </div>
        <div className="text-center">
          <p className="text-gray-500 text-sm">Score</p>
          <p className="text-2xl font-bold text-teal-600">{overallScore}/10</p>
        </div>
        {/* <div className="text-center">
          <p className="text-gray-500 text-sm">Recommendation</p>
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-white text-sm font-medium
            ${recommendation ? 'bg-green-500' : 'bg-red-500'}`}>
            {recommendation ? <ThumbsUp size={16} className="mr-1" /> : <ThumbsDown size={16} className="mr-1" />}
            {recommendation ? 'Recommended' : 'Not Recommended'}
          </div>
        </div> */}
      </div>

      <div className="mt-6 p-4 rounded-xl bg-green-50 border border-green-200 flex items-center justify-between">
        <div>
          <h4 className="text-green-700 font-semibold">Recommended for Hire</h4>
          <p className="text-sm text-green-600">Candidate shows strong potential and matches our requirements</p>
        </div>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
          Proceed to Offer
        </button>
      </div>

      {/* Skills Assessment */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Skills Assessment</h3>
        <div className="grid grid-cols-2 gap-4">
          <div
              className="bg-gray-50 p-4 rounded-xl border border-gray-100 shadow flex items-center justify-between"
            >
              <span className="text-sm font-medium">Problem Solving</span>
              <span className="text-teal-600 font-bold">{skills.problem_solving}/10</span>
            </div>
            <div
              className="bg-gray-50 p-4 rounded-xl border border-gray-100 shadow flex items-center justify-between"
            >
              <span className="text-sm font-medium">Technical Skills</span>
              <span className="text-teal-600 font-bold">{skills.technical_skills}/10</span>
            </div>
        </div>
      </div>

      {/* Summary */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Performance Summary</h3>
        <p className="text-sm text-gray-700 leading-relaxed">{summary}</p>
      </div>
    </div>
  );
}
