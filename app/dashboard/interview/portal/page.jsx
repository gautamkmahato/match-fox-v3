'use client'


import createInterviewFromAPI from "@/app/service/interview/createInterviewFromAPI";
import generateJobDetails from "@/app/service/interview/generateJobDetails";
import generateQuestions from "@/app/service/interview/generateQuestions";
import LoadingOverlay from "@/components/LoadingOverlay";
import Modal from "@/components/Modal";
import { cleanCodeBlock, extractJsonBlock } from "@/lib/utils/cleanCodeBlock";
import { Check, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import logo from '../../../../public/match-fox-5.jpg';
import Image from "next/image";

export default function CreateInterviewFromPortal() {
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



  const getJobDetails = async (job) => {
    try {
      // Generate extracted job info
      setGenerateJobDetailStatus(true);
      const apiResult = await generateJobDetails(job);
      console.log("api results: ", apiResult)
      const cleanedResult = cleanCodeBlock(apiResult);
      console.log("cleaned", cleanedResult)

      // Merge data from job inputs and extracted fields
      const mergedResult = {
        ...cleanedResult,
        company: cleanedResult?.company || 'Not Available',
        difficulty_level: cleanedResult.difficulty_level || 'medium',
        duration: cleanedResult.duration || "30",
        interview_time: cleanedResult?.interview_time
          ? new Date(cleanedResult.interview_time).toISOString()
          : new Date().toISOString(), // fallback to now
        job_description: job,
      };

      console.log("Final Merged Job Details:", mergedResult);
      setJobDetails(mergedResult);

      // if (onSubmit) {
      //   onSubmit(mergedResult);
      // }
      return mergedResult;
    } catch (err) {
      console.error("Job Extraction Error:", err);
    } finally {
      setGenerateJobDetailStatus(false);
    }
  }

  const getQuestions = async (mergedResult) => {
    try {
      setGenerateQuestionStatus(true);
      if (resume === null) {
        setResumeStatus(false);
      }
      // Step 1: Generate questions from Gemini API
      const genResult = await generateQuestions(mergedResult, resume || 'Not Available');

      if (!genResult?.status || !genResult?.data) {
        setError("Failed to generate interview questions.");
        return;
      }

      console.log(genResult);

      // Step 2: Clean the result (if needed, depending on Gemini output)
      const questions = extractJsonBlock(genResult.data);
      console.log("Cleaned :", questions);
      console.log("Cleaned Questions:", JSON.parse(questions));
      return questions;
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
      const createResult = await createInterviewFromAPI(mergedResult, JSON.parse(questions));

      if (!createResult.state || createResult?.error) {
        console.log(createResult?.error || "Something went wrong while creating the interview.");
        return;
      }

      if (createResult.state) {
        // console.log("Interview created successfully:", createResult);
        setInterviewData(createResult?.data[0])
        setOpen(true); // Trigger success modal or state
      }
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setCreateInterviewFromAPIStatus(false);
    }
  }

  const handleFinalSubmit = async (mergedResult) => {
    setLoading(true);

    console.log("jobDetails", mergedResult)

    try {
      const questions = await getQuestions(mergedResult);
      await handleInterviewCreate(mergedResult, questions);

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

  const handleModalResume = () => {

  }

  useEffect(() => {
    // Notify parent window that this window is ready
    if (window.opener) {
      window.opener.postMessage({ type: 'READY_FOR_JOB' }, '*');
    }

    const handleMessage = async (event) => {
      setLoading(true);
      // Security: Check origin if using in production
      if (typeof event.data?.job_description === 'string') {
        const job = event.data.job_description;
        localStorage.setItem('job_description', job);
        setJobDescription(job);
        const mergedResult = await getJobDetails(job);
        await handleFinalSubmit(mergedResult);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      // Cleanup: Prevent memory leaks
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md rounded-2xl shadow-xl border border-gray-200 p-6 space-y-6 bg-white text-center">
        {/* Header with logo */}
        <div className="space-y-1">
          <h1 className="flex items-center justify-center gap-2 text-indigo-900 font-bold text-2xl">
            <Image src={logo} alt="logo" className="w-8 h-8 rounded-md" />
            Hirenom
          </h1>
          <p className="text-gray-500 text-sm">AI-Powered Interview Platform</p>
        </div>

        {/* Progress section */}
        <div className="flex items-center justify-center">
          <div className="space-y-3">
          {/* Job Details */}
          <div className="flex items-center gap-2">
            {generateJobDetailStatus ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                <span className="text-sm text-gray-700">Generating Job Details...</span>
              </>
            ) : (
              <>
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-700">Job Details Generated</span>
              </>
            )}
          </div>

          {/* Questions */}
          <div className="flex items-center gap-2">
            {generateQuestionStatus ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                <span className="text-sm text-gray-700">Generating Questions...</span>
              </>
            ) : (
              <>
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-700">Questions Generated</span>
              </>
            )}
          </div>

          {/* Creating Interview */}
          <div className="flex items-center gap-2">
            {createInterviewFromAPIStatus ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                <span className="text-sm text-gray-700">Creating Interview...</span>
              </>
            ) : (
              <>
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-700">Interview Created Successfully</span>
              </>
            )}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}


  return (
    <main className="max-w-4xl mx-auto p-6">
      <pre>{jobDescription}</pre>

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

      <Modal isOpen={open} onClose={handleModalResume} width="max-w-lg">
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

    </main>
  );
}
