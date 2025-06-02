'use client';

import { BarChart3, BookOpenCheck, Briefcase, Building, Building2, ClipboardList, FileText, Star, Trophy } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import AIReportCard from './_components/AIReportCard';
import Modal from '@/components/Modal';
import fetchInterviewReport from '@/app/service/interview/fetchInterviewReport';
import LoadingOverlay from '@/components/LoadingOverlay';
import { formatDate } from '@/lib/utils/helper';
import CompanyLogo from './_components/CompanyLogo';
import EmptyStateComponent from '@/app/_components/EmptyStateComponent';
import { motion, AnimatePresence } from 'framer-motion';

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [reports, setReports] = useState([]);
  const [openModalIndex, setOpenModalIndex] = useState(null);
  const [performance, setPerformance] = useState();
  
  const { user } = useUser();

  const metricIcons = {
    'bar-chart-3': BarChart3,
    'clipboard-list': ClipboardList,
    'trophy': Trophy,
    'book-open-check': BookOpenCheck,
  };

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

  const performanceMetrics = [
    {
      title: 'Total Reports',
      value: `${reports?.length}`,
      icon: 'clipboard-list',
    },
    {
      title: 'Average Score',
      value: averageScore,
      icon: 'bar-chart-3',
    },
    {
      title: 'High Score',
      value: highScore,
      icon: 'trophy',
    },
  ];

  useEffect(() => {
    let isMounted = true;
    async function getReports() {
      try {
        setLoading(true);
        const result = await fetchInterviewReport();
        if (isMounted) {
          if (!result?.state) {
            setError('Error fetching AI reports');
          } else {
            setReports(result.data || []);
          }
        }
      } catch {
        if (isMounted) setError('Something went wrong while fetching reports.');
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    getReports();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <>
        <LoadingOverlay text="Loading Report..." />
      </>
    )
  }

  if (error) {
    return (
      <>
        {toast.info(`Error: ${error}`)}
      </>
    )
  }

  return (
    <>
      <div>
        <div className='w-full max-w-4xl mx-auto border-b border-gray-50 shadow shadow-gray-50 pt-24 lg:pt-8 px-4'>
          <h1 className="flex items-center gap-2 w-full max-w-4xl mx-auto text-2xl font-bold text-gray-900 mb-6">
            <FileText className="text-gray-800" />
            Interview Reports
          </h1>
          {/* Performance Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4">
            {performanceMetrics.map((metric, i) => {
              const Icon = metricIcons[metric.icon] || FileText;

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
        <div className="w-full max-w-4xl mx-auto pt-4 px-4">
          {reports.length === 0 && (
            <EmptyStateComponent  
              title='No reports found'
              description="Looks like there's nothing here yet."
            />
          )}

          {reports.map((report, index) => (
            <div
              key={index}
              className="mb-4 border border-gray-50 rounded-xl shadow-sm bg-white hover:shadow-md transition"
            >
              {/* Card Content */}
              <div className="flex items-start justify-between p-5">
                <div className="flex items-start gap-4">
                  <CompanyLogo logo={report?.interview_attempt?.interviews?.company_logo} company={report?.interview_attempt?.interviews?.company?.charAt(0).toUpperCase()} text="text-2xl" />
                  <div>
                    <button
                      onClick={() => setOpenModalIndex(index)}
                      className="text-lg font-semibold cursor-pointer text-gray-800 hover:underline text-left"
                    >
                      {report?.interview_attempt?.interviews?.interview_name}
                    </button>
                    <p className="flex items-center gap-1 text-sm text-gray-500 mt-0.5">
                      <span className='flex items-center gap-1 border border-gray-300 text-xs px-2 py-0.5 rounded-sm'>
                        <Building2 className='w-3 h-3' />
                        {report?.interview_attempt?.interviews?.company}
                      </span>
                      <span className='flex items-center gap-1 border border-gray-300 text-xs px-2 py-0.5 rounded-sm'>
                        <Briefcase className='w-3 h-3' />
                        {report?.interview_attempt?.interviews?.position}
                      </span>
                    </p>
                    <p className="text-xs mt-1 text-gray-500">
                      Date: <span className='text-gray-500 font-medium'>{formatDate(report?.interview_attempt?.started_at)}</span>
                    </p>
                  </div>
                </div>
                <div className="flex-shrink-0 text-right">
                  <h3 className="text-2xl font-bold text-teal-600">
                    {report?.score}
                    <span className="text-base text-gray-700">/10</span>
                  </h3>
                </div>
              </div>

              {/* Modal with Animation */}
              <AnimatePresence>
                {openModalIndex === index && (
                  <Modal
                    isOpen={openModalIndex === index}
                    onClose={() => setOpenModalIndex(null)}
                    title="Interview Report"
                    width="max-w-4xl"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <AIReportCard
                        id={report?.id}
                        companyLogo={report?.interview_attempt?.interviews?.company_logo}
                        companyName={report?.interview_attempt?.interviews?.company}
                        interviewTitle={report?.interview_attempt?.interviews?.interview_name}
                        position={report?.interview_attempt?.interviews?.position}
                        userName={user?.firstName}
                        overallScore={report?.score}
                        recommendation={!!report?.recommendation}
                        Skill_Evaluation={report?.report?.Skill_Evaluation}
                        summary={report?.report?.overall_summary}
                      />
                    </motion.div>
                  </Modal>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}