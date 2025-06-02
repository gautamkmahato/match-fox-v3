'use client';

import { calculatePerformance } from '@/lib/utils/helper';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import Link from 'next/link';
import CompanyLogo from './CompanyLogo';

export default function AIReportCard({
  id,
  companyLogo,
  companyName = 'Company',
  interviewTitle = 'Interview',
  position = 'Position',
  userName = 'Candidate',
  overallScore = 0,
  recommendation,
  Skill_Evaluation = {},
  summary = 'No summary provided.',
}) {
  const performance = calculatePerformance(overallScore);

  const skills = [
    { label: 'Problem solving', key: 'Problem_Solving_Approach' },
    { label: 'Technical knowledge', key: 'technical_knowledge' },
    { label: 'Communication clarity', key: 'Communication_Clarity' },
    { label: 'Confidence & Composure', key: 'Confidence_&_Composure' },
    { label: 'Best practices', key: 'Best_Practices_and_Style' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 bg-white rounded-2xl">
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className="flex sm:flex-row items-start sm:items-center gap-4 mb-4">
          <div>
            <CompanyLogo logo={companyLogo} company={companyName?.charAt(0).toUpperCase()} />
          </div>

          <div className='flex flex-col'>
            <h2 className="text-xl font-bold text-gray-800">{companyName}</h2>
            <p className="text-sm text-gray-500">
              {interviewTitle}
            </p>
          </div>
        </div>
        <div>
          <Link href={`/dashboard/report/${id}`}
            className='bg-[#462eb4] hover:shadow-2xl text-white px-3 py-2 rounded-md text-xs font-medium flex items-center gap-2 cursor-pointer transition duration-300 ease-in-out disabled:opacity-70 disabled:cursor-not-allowed'
          >View Full Report</Link>
        </div>
      </div>

      {/* Candidate Info */}
<div className="grid grid-cols-1 md:grid-cols-3 border-t border-gray-50 pt-4 mb-6 gap-4">
  <div className="border border-gray-50 text-center shadow-sm px-12 py-4">
    <p className="text-gray-500 text-sm">Candidate</p>
    <p className="font-semibold text-md truncate">
      {userName?.toUpperCase()}
    </p>
  </div>

  <div className="text-center border border-gray-50 shadow-sm px-12 py-4">
    <p className="text-gray-500 text-sm">Score</p>
    <p className="text-2xl font-bold text-teal-600">{overallScore}/10</p>
  </div>

  <div className="text-center border border-gray-50 shadow-sm px-12 py-4">
    <p className="text-gray-500 text-sm">Performance</p>
    <div
      className={`inline-flex items-center px-3 py-1 rounded-full text-white text-sm font-medium ${
        performance?.status ? 'bg-teal-500' : 'bg-red-500'
      }`}
    >
      {performance?.status ? (
        <ThumbsUp size={16} className="mr-1" />
      ) : (
        <ThumbsDown size={16} className="mr-1" />
      )}
      {performance?.tag || 'N/A'}
    </div>
  </div>
</div>


      {/* Skills Assessment */}
      <div>
        <h3 className="text-lg font-semibold mb-1.5 text-gray-800">Skills Assessment</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {skills.map(({ label, key }) => {
            const score = Skill_Evaluation?.[key]?.rating ?? '0';
            return (
              <div
                key={key}
                className="bg-gray-50 px-4 py-2 rounded-xl border border-gray-50 shadow-sm flex items-center justify-between"
              >
                <span className="text-sm font-medium text-gray-700">{label}</span>
                <span className="text-teal-600 font-bold">{score}/10</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary */}
      <div>
        <h3 className="text-lg font-semibold mb-1.5 mt-6 text-gray-800">
          Performance Summary
        </h3>
        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
          {summary}
        </p>
      </div>
    </div>
  );
}
