'use client'

import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import generateQuestions from '@/app/service/portal/generateQuestions';
import { extractJsonBlock } from '@/lib/utils/cleanCodeBlock';
import createInterviewFromAPI from '@/app/service/portal/createInterviewFromAPI';
import Modal from '@/components/Modal';
import ResumeTextExtractor from '../../_components/ResumeTextExtractor';
import LoadingOverlay from '@/components/LoadingOverlay';


const subCategories = {
  mba: ['IIM', 'XLRI', 'FMS'],
  gmat: ['Duke', 'Harvard', 'Stanford'],
  technical: ['Frontend', 'Backend', 'DevOps'],
  hr: ['Entry-level', 'Managerial', 'Leadership'],
  sat: ['Reading', 'Math', 'Writing'],
  csat: ['Service', 'Support', 'Feedback'],
};


export default function SubCategoryPage({ params }) {

    const [jobDescription, setJobDescription] = useState();
    const [loading, setLoading] = useState(false);
    const [jobDetails, setJobDetails] = useState(null);
    const [interviewData, setInterviewData] = useState();
    const [open, setOpen] = useState(false);
    const [loadingStart, setLoadingStart] = useState(false);
    const [loadingDashboard, setLoadingDashboard] = useState(false);
    const [resume, setResume] = useState(null);
    const [generateJobDetailStatus, setGenerateJobDetailStatus] = useState(false);
    const [generateQuestionStatus, setGenerateQuestionStatus] = useState(false);
    const [createInterviewFromAPIStatus, setCreateInterviewFromAPIStatus] = useState(false);
    const [resumeStatus, setResumeStatus] = useState(null);
    
    
    const router = useRouter();

    const { category } = React.use(params);
    const { subcategory } = React.use(params);
  

    if (!subcategory){
        return(
            <>
                <h1>Not Found</h1>
            </>
        )
    } 

    const handlePdfUpload = async (pdfData) => {
        console.log(pdfData);
        setResume(pdfData);
        setResumeStatus(true);
    }

    const getQuestions = async () => {
        try {
            setGenerateQuestionStatus(true);
            if (resume === null) {
                setResumeStatus(false);
            }
            // Step 1: Generate questions from Gemini API
            const genResult = await generateQuestions(subcategory || 'Not Available', resume || 'Not Available');

            if (!genResult?.status || !genResult?.data) {
                setError("Failed to generate interview questions.");
                return;
            }

            console.log("genResult::: ", genResult);

            // Step 2: Clean the result (if needed, depending on Gemini output)
            const questions = extractJsonBlock(genResult.data);
            const cleaned = `[${questions.trim()}]`;
            const parsedQuestions = JSON.parse(cleaned);
            console.log("Cleaned Questions::: ", parsedQuestions);

            return parsedQuestions;

        } catch (error) {
            console.log("Error: ", error);
        } finally {
            setGenerateQuestionStatus(false);
        }
    }

    const handleInterviewCreate = async (mergedResult, questions) => {
        try {
          setCreateInterviewFromAPIStatus(true);
          // Step 3: Create interview with generated questions
          const createResult = await createInterviewFromAPI(mergedResult, questions);
    
          if (!createResult.state || createResult?.error) {
            console.log(createResult?.error || "Something went wrong while creating the interview.");
            return;
          }
    
          if (createResult.state) {
            console.log("Interview created successfully:", createResult);
            setInterviewData(createResult?.data[0])
            setOpen(true); // Trigger success modal or state
          }
        } catch (error) {
          console.log("Error: ", error);
        } finally {
          setCreateInterviewFromAPIStatus(false);
        }
    }

    const handleFinalSubmit = async () => {
        setLoading(true);

        try {
            const questions = await getQuestions();
            const mergedResult = {
                name: category,
                program_name: subcategory,
                resume: resume,
                status: 'in-progress'
            }
            const result = await handleInterviewCreate(mergedResult, questions);
            console.log("result::: ", result);
        } catch (err) {
        console.error("Error in handleFinalSubmit:", err);
        } finally {
        setLoading(false);
        }
    };

    const handleModalClose = () => {
    router.push("/dashboard/interview");
    setOpen(false);
    setLoading(true);
  }

  const handleStartInterview = async () => {
    setLoadingStart(true);
    await router.push(`/dashboard/meetings/${interviewData?.id}`);
  };

  const handleGoToDashboard = async () => {
    setLoadingDashboard(true);
    await router.push("/dashboard/interview");
  };

    if(loading){
        return(
            <>
                <LoadingOverlay text="Creating Interview..." />
            </>
        )
    }

    return (
        <div className="bg-white px-6 py-12 mt-8 rounded-2xl shadow max-w-2xl mx-auto">
  <div className='px-8'>
    <h1 className="text-lg sm:text-xl font-bold capitalize mb-8 text-gray-800 text-center sm:text-left">
    Create Interview / {subcategory.toUpperCase()}
  </h1>
  </div>

  <div className="flex flex-col items-center justify-center">
    {/* Resume Uploader */}
    <div className="w-full">
      <ResumeTextExtractor onSubmit={handlePdfUpload} />
    </div>

    {/* Action Section */}
    {resumeStatus && <div className="w-full px-8 flex flex-col items-center justify-center gap-6">
      <button
        onClick={handleFinalSubmit}
        className="w-full bg-[#462eb4] hover:bg-[#3b24a2] text-white px-6 py-3 rounded-lg text-sm font-medium flex justify-center items-center gap-2 shadow-md hover:shadow-xl transition-all duration-300 ease-in-out disabled:opacity-70 disabled:cursor-not-allowed"
      >
        Create Interview
      </button>
    </div>}
  </div>

  {/* Modal */}
  <Modal isOpen={open} onClose={handleModalClose} width="max-w-lg">
    <div className="text-center p-6 sm:p-10 space-y-6">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Interview Created Successfully!</h2>
      <p className="text-gray-500">What would you like to do next?</p>

      <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
        <button
          onClick={handleStartInterview}
          disabled={loadingStart}
          className="bg-[#462eb4] hover:bg-indigo-900 text-white text-sm px-5 py-2.5 rounded-md flex items-center justify-center gap-2 font-medium transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loadingStart && (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          )}
          Start Interview
        </button>

        <button
          onClick={handleGoToDashboard}
          disabled={loadingDashboard}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm px-5 py-2.5 rounded-md flex items-center justify-center gap-2 font-medium transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loadingDashboard && (
            <span className="w-4 h-4 border-2 border-gray-800 border-t-transparent rounded-full animate-spin"></span>
          )}
          Go to Dashboard
        </button>
      </div>
    </div>
  </Modal>
</div>

    );
}
