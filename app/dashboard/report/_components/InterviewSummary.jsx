'use client';

import { calculatePerformance } from '@/lib/utils/helper';
import { ThumbsUp, ThumbsDown } from 'lucide-react'; 
import Link from 'next/link';
import CompanyLogo from './CompanyLogo';

export default function InterviewSummary({
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
    { label: 'Best practices', key: 'Best_Practices_&_Style' },
  ];

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl shadow-md transition-all duration-300 hover:shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-6 pb-6 border-b border-gray-100 dark:border-zinc-800 mb-6">
        <div className="flex-shrink-0">
          <CompanyLogo logo={companyLogo} company={companyName?.charAt(0).toUpperCase()} />
        </div>

        <div className="flex flex-col">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
            {companyName}
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-400 mt-1">
            {interviewTitle} — <span className="font-semibold text-gray-700 dark:text-gray-300">{position}</span>
          </p>
        </div>
      </div>

      {/* Candidate Info */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="flex flex-col items-start sm:items-center border border-gray-100 p-4 shadow-lg rounded-xl">
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Candidate</p>
          <p className="font-bold text-xl text-gray-800 dark:text-gray-200 truncate max-w-full">
            {userName?.toUpperCase()}
          </p>
        </div>
        <div className="flex flex-col items-start sm:items-center border border-gray-100 p-4 shadow-lg rounded-xl">
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Overall Score</p>
          <p className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
            {overallScore}<span className="text-xl">/100</span>
          </p>
        </div>
        <div className="flex flex-col items-start sm:items-center border border-gray-100 p-4 shadow-lg rounded-xl">
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Performance</p>
          <div
            className={`inline-flex items-center px-4 py-1 rounded-full text-base font-semibold transition-all shadow-md
              ${performance?.status
                ? 'bg-emerald-500 text-white'
                : 'bg-rose-500 text-white'
              }`}
          >
            {performance?.status ? (
              <ThumbsUp size={18} className="mr-2" />
            ) : (
              <ThumbsDown size={18} className="mr-2" />
            )}
            {performance?.tag || 'N/A'}
          </div>
        </div>
      </div>

      {/* Skills Assessment */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          Skill Assessment
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map(({ label, key }) => {
            const score = Skill_Evaluation?.[key]?.rating ?? '0';
            return (
              <div
                key={key}
                className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl border border-gray-100 dark:border-zinc-700 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <span className="text-base text-gray-700 dark:text-gray-300 font-medium">{label}</span>
                <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{score}/100</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary */}
      <div>
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          Performance Summary
        </h3>
        <div className="p-6 bg-gray-50 dark:bg-zinc-800 rounded-xl border border-gray-100 dark:border-zinc-700 shadow-inner">
            <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {summary}
            </p>
        </div>
      </div>
    </div>
  );
}