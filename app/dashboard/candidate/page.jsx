'use client';

import {
  PlusCircle,
  BarChart3,
  ClipboardList,
  Trophy,
  BookOpenCheck,
} from 'lucide-react';
import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';

import InterviewList from '../_components/InterviewList';
import fetchAllInterviews from '@/app/service/interview/fetchAllInterviews';
import fetchAllReports from '@/app/service/report/fetchAllReports';
import LoadingOverlay from '@/components/LoadingOverlay';
import CompanyLogo from '../report/_components/CompanyLogo';

const metricIcons = {
  'bar-chart-3': BarChart3,
  'clipboard-list': ClipboardList,
  'trophy': Trophy,
  'book-open-check': BookOpenCheck,
};

export default function Dashboard() {
  const [totalInterviews, setTotalInterviews] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [reports, setReports] = useState([]);
  const [topScoreReports, setTopScoreReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const getData = async () => {
      setLoading(true);

      try {
        const [interviewRes, reportRes] = await Promise.all([
          fetchAllInterviews(),
          fetchAllReports(),
        ]);

        // Interviews
        if (!interviewRes?.state) {
          toast.error('Failed to fetch interviews');
        } else if (isMounted) {
          setTotalInterviews(interviewRes.data || []);
          const completedInterviews = interviewRes.data.filter(i => i.status === 'completed');
          setCompleted(completedInterviews);
          setInterviews(interviewRes.data.slice(0, 3));
        }

        // Reports
        if (!reportRes?.state) {
          toast.error('Failed to fetch reports');
        } else if (isMounted) {
          // console.log(reportRes.data);
          setReports(reportRes.data || []);

          // To get Top score reports
          setTopScoreReports(reportRes?.data.sort(SortScores).slice(0,3))
        }
      } catch (err) {
        // console.error('Dashboard fetch error:', err);
        toast.error('Something went wrong while loading dashboard.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    getData();

    return () => {
      isMounted = false;
    };
  }, []);

  const averageScore = useMemo(() => {
    if (reports.length === 0) return 'N/A';
    const scores = reports
      .map((r) => parseInt(r.score))
      .filter((s) => !isNaN(s));
    if (scores.length === 0) return 'N/A';
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    return `${Math.round(avg)}%`;
  }, [reports]);

  const highScore = useMemo(() => {
    if (reports.length === 0) return 'N/A';
    const scores = reports
      .map((r) => parseInt(r.score))
      .filter((s) => !isNaN(s));
    if (scores.length === 0) return 'N/A';
    return `${Math.max(...scores)}%`;
  }, [reports]);

  const SortScores = (a, b) =>{
    return a - b;
  }

  const performanceMetrics = [
    {
      title: 'Average Score',
      value: averageScore,
      icon: 'bar-chart-3',
    },
    {
      title: 'Total Interviews',
      value: `${totalInterviews.length}`,
      icon: 'clipboard-list',
    },
    {
      title: 'High Score',
      value: highScore,
      icon: 'trophy',
    },
    {
      title: 'Completed Interviews',
      value: `${completed.length}`,
      icon: 'book-open-check',
    },
  ];

  if (loading) {
    return <LoadingOverlay text="Loading your dashboard..." />;
  }

  return (
    <div className="p-6 space-y-6 mt-16 lg:mt-0 md:mt-0">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Create Interview */}
        <div className="bg-white shadow rounded-xl p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Create New Interview</h2>
            <p className="text-sm text-gray-500 mt-1">
              Start a new interview session tailored to your job test.
            </p>
          </div>
          <Link
            href="/dashboard/interview/create"
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-[#462eb4] hover:bg-indigo-900 text-white rounded-md transition"
          >
            <PlusCircle size={18} />
            Create New Interview
          </Link>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4">
          {performanceMetrics.map((metric, i) => {
            const Icon = metricIcons[metric.icon];
            return (
              <div
                key={i}
                className="bg-white shadow rounded-xl p-4 flex items-center gap-4"
              >
                <div className="p-2 rounded-full bg-blue-50 text-indigo-600">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{metric.title}</p>
                  <h4 className="text-lg font-semibold text-gray-800">
                    {metric.value}
                  </h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent Interviews */}
          <div>
            {interviews.length > 0 ? (
              <InterviewList interviews={interviews} />
            ) : (
              <div className="bg-white text-center p-6 shadow rounded-xl">
                <h3 className="text-gray-700 font-medium">No interviews found</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Create your first interview to get started!
                </p>
              </div>
            )}
          </div>

          {/* Top Reports */}
          <div>
            <div className="bg-white shadow rounded-xl p-6 h-full">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Score Interviews</h3>
              {topScoreReports && topScoreReports.length > 0 ? (
                <ul className="space-y-3">
                  {topScoreReports.map((report, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-4 bg-gray-50 px-4 py-2.5 border border-gray-100 rounded-lg shadow-sm"
                    >
                      <CompanyLogo
                        logo={report?.interview_attempts?.interviews?.company_logo}
                        company={report?.interview_attempts?.interviews?.company}
                        width="w-10"
                        height="h-10"
                      />
                      <div className="flex-1">
                        <Link href={`/dashboard/interview/${report?.interview_id}`}>
                          <h4 className="text-sm font-semibold text-gray-700 hover:underline">
                            {report?.interview_attempts?.interviews?.interview_name}
                          </h4>
                        </Link>
                        <p className="text-xs text-gray-500">
                          {report?.interview_attempts?.interviews?.company}
                        </p>
                      </div>
                      <div className="text-right text-sm">
                        <p className="font-medium text-gray-600">
                          {report?.recommendation ? (
                            <span className="text-green-600">✓ Recommended</span>
                          ) : (
                            <span className="text-red-500">✗ Not Recommended</span>
                          )}
                        </p>
                        <p className="text-xs text-gray-500">Score: {report?.score}%</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No top reports found.</p>
              )}
            </div>
          </div>
        </div>


    </div>
  );
}
