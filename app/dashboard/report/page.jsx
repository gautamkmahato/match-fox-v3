'use client';

import { Briefcase, Building, Building2, FileText, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import AIReportCard from './_components/AIReportCard';
import Modal from '@/components/Modal';
import fetchInterviewReport from '@/app/service/interview/fetchInterviewReport';
import LoadingOverlay from '@/components/LoadingOverlay';
import { calculatePerformance, formatDate } from '@/lib/utils/helper';

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [reports, setReports] = useState([]);
  const [openModalIndex, setOpenModalIndex] = useState(null);
  const [performance, setPerformance] = useState();

  const { user } = useUser();

  useEffect(() => {
    async function getReports() {
      try {
        setLoading(true);

        const result = await fetchInterviewReport();
        console.log("reports", result)
        if (!result?.state) {
          setError('Error fetching AI reports');
        } else if (result?.data?.length > 0) {
          setReports(result.data);
        }
      } catch (err) {
        setError('Something went wrong while fetching reports.');
      } finally {
        setLoading(false);
      }
    }
    getReports();
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
    <div className="w-full max-w-4xl mx-auto px-4 py-10">
      <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-900 mb-6">
        <FileText className="text-yellow-500" />
        Interview Reports
      </h1>

      {reports.length === 0 && (
        <p className="text-gray-600 text-sm">No reports found.</p>
      )}

      {reports.map((report, index) => (
        <div
          key={index}
          className="mb-8 border border-gray-200 rounded-xl shadow-sm bg-white hover:shadow-md transition"
        >
          {/* Card Content */}
          <div className="flex items-start justify-between p-5">
            <div className="flex items-start gap-4">
              {report?.interview_attempts?.interviews?.company_logo ? (
                <img
                  src={report?.interview_attempts?.interviews?.company_logo}
                  alt={report?.interview_attempts?.interviews?.company}
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                  className="w-16 h-16 rounded-lg object-cover"
                />
              ) : (
                <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center">
                  <h3 className="text-3xl font-semibold text-gray-700">
                    {report?.interview_attempts?.interviews?.company?.charAt(0).toUpperCase()}
                  </h3>
                </div>
              )}
              <div>
                <button
                  onClick={() => setOpenModalIndex(index)}
                  className="text-lg font-semibold cursor-pointer text-gray-800 hover:underline text-left"
                >
                  {report?.interview_attempts?.interviews?.interview_name}
                </button>
                <p className="flex items-center gap-1 text-sm text-gray-500 mt-0.5">
                  <span className='flex items-center gap-1 border border-gray-300 text-xs px-2 py-0.5 rounded-sm'>
                    <Building2 className='w-3 h-3' />
                    {report?.interview_attempts?.interviews?.company}
                  </span>
                  <span className='flex items-center gap-1 border border-gray-300 text-xs px-2 py-0.5 rounded-sm'>
                    <Briefcase className='w-3 h-3' />
                    {report?.interview_attempts?.interviews?.position}
                  </span>
                </p>
                <p className="text-xs mt-1 text-gray-500">
                  Date: <span className='text-gray-500 font-medium'>{formatDate(report?.interview_attempts?.started_at)}</span>
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

          {/* Modal */}
          <Modal
            isOpen={openModalIndex === index}
            onClose={() => setOpenModalIndex(null)}
            title="Interview Report"
          >
            <AIReportCard
              id={report?.id}
              companyLogo={report?.interview_attempts?.interviews?.company_logo}
              companyName={report?.interview_attempts?.interviews?.company}
              interviewTitle={report?.interview_attempts?.interviews?.interview_name}
              position={report?.interview_attempts?.interviews?.position}
              userName={user?.firstName}
              overallScore={report?.score}
              recommendation={!!report?.recommendation}
              Skill_Evaluation={report?.report?.Skill_Evaluation}
              summary="John demonstrated strong technical capabilities and problem-solving skills throughout the interview. His communication was clear and effective, and his previous experience aligns well with the role expectations."
            />
          </Modal>
        </div>
      ))}
    </div>
  );
}
