'use client'

import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import generateQuestions from '@/app/service/portal/generateQuestions';
import { extractJsonBlock } from '@/lib/utils/cleanCodeBlock';
import createInterviewFromAPI from '@/app/service/portal/createInterviewFromAPI';
import Modal from '@/components/Modal';
import ResumeTextExtractor from '../../_components/ResumeTextExtractor';


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
                <h1>Loading...</h1>
            </>
        )
    }

    return (
        <div className="p-6">
        <h1 className="text-2xl font-bold capitalize mb-6">{subcategory} Subcategories</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div>
                <ResumeTextExtractor onSubmit={handlePdfUpload} />
            </div>
        </div>
        <button onClick={handleFinalSubmit}>Create</button>
        {/** Modal Section */}
              <Modal isOpen={open} onClose={handleModalClose} width="max-w-lg">
                <div className="text-center space-y-8">
                  <h2 className="text-xl font-semibold text-gray-700">Interview Created Successfully!</h2>
                  <p className="text-gray-500">What would you like to do next?</p>
                  <div className="flex justify-center gap-4 mt-6">
                    <button
                      onClick={handleStartInterview}
                      disabled={loadingStart}
                      className="bg-[#462eb4] text-sm shadow-lg cursor-pointer text-white px-4 py-2 rounded-md hover:bg-indigo-900 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {loadingStart && (
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      )}
                      Start the Interview
                    </button>
        
                    <button
                      onClick={handleGoToDashboard}
                      disabled={loadingDashboard}
                      className="bg-gray-200 text-sm shadow-lg cursor-pointer font-medium text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
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
