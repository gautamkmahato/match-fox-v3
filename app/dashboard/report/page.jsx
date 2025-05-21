'use client';

import { Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import AIReportCard from './_components/AIReportCard';
import Modal from '@/components/Modal';
import fetchInterviewReport from '@/app/service/interview/fetchInterviewReport';

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [reports, setReports] = useState([]);
  const [openModalIndex, setOpenModalIndex] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    async function getReports() {
      try {
        const result = await fetchInterviewReport()
        if (!result?.state) {
          setError('Error fetching AI reports');
        } else if (result?.data?.length > 0) {
          setReports(result.data);
        }
      } catch (err) {
        setError('Something went wrong while fetching reports.');
      }
    }
    getReports();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-10">
      <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-900 mb-6">
        <Star className="text-yellow-500" />
        Review Reports
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
              <img
                src={report?.interview_attempts?.interviews?.company_logo}
                alt="Company logo"
                className="h-12 w-12 rounded-md bg-gray-100 object-contain p-1"
              />
              <div>
                <button
                  onClick={() => setOpenModalIndex(index)}
                  className="text-lg font-semibold cursor-pointer text-gray-800 hover:underline text-left"
                >
                  {report?.interview_attempts?.interviews?.interview_name}
                </button>
                <p className="text-sm text-gray-500 mt-0.5">
                  {report?.interview_attempts?.interviews?.company} •{' '}
                  {report?.interview_attempts?.interviews?.position}
                </p>
                <p className="text-sm mt-1 text-gray-600">
                  Recommendation:{' '}
                  <span
                    className={
                      report?.recommendation
                        ? 'text-green-600 font-medium'
                        : 'text-red-500 font-medium'
                    }
                  >
                    {report?.recommendation ? 'Yes' : 'No'}
                  </span>
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
              companyLogo={report?.interview_attempts?.interviews?.company_logo}
              companyName={report?.interview_attempts?.interviews?.company}
              interviewTitle={report?.interview_attempts?.interviews?.interview_name}
              position={report?.interview_attempts?.interviews?.position}
              userName={user?.firstName}
              overallScore={report?.score}
              recommendation={!!report?.recommendation}
              skills={report?.report}
              summary="John demonstrated strong technical capabilities and problem-solving skills throughout the interview. His communication was clear and effective, and his previous experience aligns well with the role expectations."
            />
          </Modal>
        </div>
      ))}
    </div>
  );
}
