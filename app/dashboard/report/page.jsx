'use client';

import { Briefcase, Building, Building2, FileText, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import AIReportCard from './_components/AIReportCard';
import Modal from '@/components/Modal';
import fetchInterviewReport from '@/app/service/interview/fetchInterviewReport';
import LoadingOverlay from '@/components/LoadingOverlay';
import { formatDate } from '@/lib/utils/helper';
import CompanyLogo from './_components/CompanyLogo';
import EmptyStateComponent from '@/app/_components/EmptyStateComponent';

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [reports, setReports] = useState([]);
  const [openModalIndex, setOpenModalIndex] = useState(null);
  const [performance, setPerformance] = useState();

  const { user } = useUser();

  // ✅ Stop all active video streams on mount
useEffect(() => {
  navigator.mediaDevices.enumerateDevices().then((devices) => {
    const hasVideoInput = devices.some((d) => d.kind === 'videoinput');
    if (!hasVideoInput) return;

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        stream.getTracks().forEach((track) => {
          if (track.kind === 'video') {
            track.stop();
          }
        });
      })
      .catch((err) => {
        console.warn('Could not access video stream to stop:', err);
      });
  });
}, []);


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
    <>
      <div>
        <div className='border-b border-gray-100 shadow shadow-gray-50 pt-24 lg:pt-8 px-4'>
          <h1 className="flex items-center gap-2 w-full max-w-4xl mx-auto text-2xl font-bold text-gray-900 mb-6">
            <FileText className="text-gray-800" />
            Interview Reports
          </h1>
        </div>
        <div className="w-full max-w-4xl mx-auto pt-4 px-4">
          {reports.length === 0 && (
            <EmptyStateComponent 
              title = 'No reports found'
              description = 'Looks like there’s nothing here yet.'
            />
          )}

          {reports.map((report, index) => (
            <div
              key={index}
              className="mb-8 border border-gray-200 rounded-xl shadow-sm bg-white hover:shadow-md transition"
            >
              {/* Card Content */}
              <div className="flex items-start justify-between p-5">
                <div className="flex items-start gap-4">
                  <CompanyLogo logo={report?.interview_attempt?.interviews?.company_logo} company={report?.interview_attempt?.interviews?.company?.charAt(0).toUpperCase()} />
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

              {/* Modal */}
              <Modal
                isOpen={openModalIndex === index}
                onClose={() => setOpenModalIndex(null)}
                title="Interview Report"
                width="max-w-4xl"
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
              </Modal>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
