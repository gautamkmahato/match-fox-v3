'use client';

import {
  PlusCircle,
  CreditCard,
  BarChart3,
  ClipboardList,
  Trophy,
  BookOpenCheck,
} from 'lucide-react';
import fetchUsage from '../service/interview/fetchUsage';
import { toast } from 'sonner';
import { useState } from 'react';
import ShowCreditComponent from './_components/ShowCreditComponent';
import InterviewList from './_components/InterviewList';
import Link from 'next/link';
import JobList from './jobs/_components/JobList';

// data/mockDashboardData.ts

export const creditsData = {
  plan: 'Pro',
  remainingCredits: 37,
  totalCredits: 50,
};

export const interviewList = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'Google',
    score: 85,
  },
  {
    id: 2,
    title: 'Backend Engineer',
    company: 'Amazon',
    score: 92,
  },
  {
    id: 3,
    title: 'Fullstack Dev',
    company: 'Meta',
    score: 78,
  },
  {
    id: 4,
    title: 'AI Engineer',
    company: 'OpenAI',
    score: 88,
  },
];

export const performanceMetrics = [
  {
    title: 'Average Score',
    value: '84%',
    icon: 'bar-chart-3',
  },
  {
    title: 'Total Interviews',
    value: '24',
    icon: 'clipboard-list',
  },
  {
    title: 'High Score',
    value: '98%',
    icon: 'trophy',
  },
  {
    title: 'Topics Covered',
    value: '12',
    icon: 'book-open-check',
  },
];


export default function Dashboard() {


  const recentInterviews = interviewList.slice(0, 3);

  const metricIcons = {
    'bar-chart-3': BarChart3,
    'clipboard-list': ClipboardList,
    'trophy': Trophy,
    'book-open-check': BookOpenCheck,
  };

  



  

  return (
    <div className="p-6 space-y-6 mt-16 lg:mt-0 md:mt-0">
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Create Interview */}
        <div className="bg-white shadow rounded-xl p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Create New Job</h2>
            <p className="text-sm text-gray-500 mt-1">
              Post a new job session tailored to your job.
            </p>
          </div>
          <Link href='/dashboard/jobs/create' className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-[#462eb4] hover:bg-indigo-900 cursor-pointer text-white rounded-md  transition">
            <PlusCircle size={18} />
            Create New Job
          </Link>
        </div>

        {/* <ShowCreditComponent /> */}
        {/* Performance Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4">
          {performanceMetrics.map((metric, i) => {
            const Icon = metricIcons[metric.icon];
            return (
              <div key={i} className="bg-white shadow rounded-xl p-4 flex items-center gap-4">
                <div className="p-2 rounded-full bg-blue-50 text-indigo-600">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{metric.title}</p>
                  <h4 className="text-lg font-semibold text-gray-800">{metric.value}</h4>
                </div>
              </div>
            );
          })}
        </div>
        
      </div>

      {/* Recent Interviews */}
      {/* <InterviewList /> */}

      {/** Interview List */}


      {/** Job List */}
      <h3 className='text-lg font-semibold'>All Jobs</h3>
      <JobList />

      
    </div>
  );
}
