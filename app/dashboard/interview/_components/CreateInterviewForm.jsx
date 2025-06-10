'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import createInterviewFromAPI from "@/app/service/interview/createInterviewFromAPI";
import JobDescriptionForm from "./JobDescriptionForm";
import ExtractedJobDetailsCard from "./ExtractedJobDetailsCard";
import JobInputs from "./JobInputs";
import Modal from "@/components/Modal";
import generateQuestions from "@/app/service/interview/generateQuestions";
import { extractJsonBlock } from "@/lib/utils/cleanCodeBlock";
import PdfTextExtractor from "./PdfTextExtractor";
import { ArrowLeft, ArrowRight, CheckCircle, ChevronRight, Circle, Loader2 } from "lucide-react";
import { toast } from "sonner";

const steps = [
  { title: "Step 1", description: "Basic Info" },
  { title: "Step 2", description: "Resume Upload (optional)" },
  { title: "Step 3", description: "Job Description" },
  { title: "Step 4", description: "Create Interview" },
]; 

export default function CreateInterviewForm({ jobDescription }) {
  const [step, setStep] = useState(1);
  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [limitReached, setLimitReached] = useState(false);
  const [open, setOpen] = useState(false);
  const [questions, setQuestions] = useState(false);
  const [interviewData, setInterviewData] = useState();
  const [resume, setResume] = useState();
  const [loadingStart, setLoadingStart] = useState(false);
  const [loadingDashboard, setLoadingDashboard] = useState(false);


  const router = useRouter();

  const handleJobInputSubmit = async (companyName, difficultyLevel, duration, status, remaining_minutes) => {
    if (!status) {
      toast.error("Something went wrong please enter data again");
      return;
    }
    // console.log(remaining_minutes)

    if (remaining_minutes < duration * 60) {
      toast.error("Limit exceeded. Please upgrade your plan.");
      setLimitReached(true);
      return;
    }


    // Store input data in jobDetails for next step
    setJobDetails({
      companyName,
      difficultyLevel,
      duration,
    });

    setStep(2);
  };

  const handlePdfUpload = async (pdfData) => {
    // console.log("PDF File data: ", pdfData)
    setResume(pdfData);
    setStep(3);
  }

  const handleJobDetailsSubmit = async (result) => {
    setJobDetails(result);
    setStep(4);
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // console.log("jobDetails", jobDetails)

    try {
      // Step 1: Generate questions from Gemini API
      const genResult = await generateQuestions(jobDetails, resume);

      if (!genResult?.status || !genResult?.data) {
        setError("Failed to generate interview questions.");
        return;
      }

      // console.log(genResult)

      // Step 2: Clean the result (if needed, depending on Gemini output)
      const questions = extractJsonBlock(genResult.data);
      // console.log("Cleaned :", questions);
      // console.log("Cleaned Questions:", JSON.parse(questions));

      // Step 3: Create interview with generated questions
      const createResult = await createInterviewFromAPI(jobDetails, JSON.parse(questions));

      if (!createResult.state || createResult?.error) {
        setError(createResult?.error || "Something went wrong while creating the interview.");
        return;
      }

      if (createResult.state) {
        // console.log("Interview created successfully:", createResult);
        setInterviewData(createResult?.data[0])
        setOpen(true); // Trigger success modal or state
      }
    } catch (err) {
      // console.error("Error in handleFinalSubmit:", err);
      setError(err.message || "An unexpected error occurred.");
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

  if (limitReached) {
    return (
      <div className="bg-white max-w-xl mx-auto text-center px-10 py-10 shadow">
        <h1 className="text-2xl font-semibold mb-4">Usage Limit Reached</h1>
        <p className="text-gray-600 mb-4">
          You’ve reached your monthly limit. Please upgrade your plan to create more interviews.
        </p>
        <button
          className="bg-[#462eb4] cursor-pointer text-sm text-white px-4 py-2.5 rounded hover:bg-indigo-700"
          onClick={() => router.push("/payment")}
        >
          Upgrade Plan
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {error && <p className="text-red-600">{error}</p>}

      {/** top step bar */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((curr, idx) => (
          <div key={idx} className="flex items-center flex-1">
            <div className="relative flex items-center">
              {idx < step ? (
                <CheckCircle className="text-indigo-600" size={24} />
              ) : idx === step ? (
                <Circle className="text-gray-300" size={24} />
              ) : (
                <Circle className="text-gray-300" size={24} />
              )}
              <div className="ml-2">
                <p
                  className={`font-semibold ${idx === step
                      ? "text-gray-400"
                      : idx < step
                        ? "text-indigo-600"
                        : "text-gray-400"
                    }`}
                >
                  {curr.title}
                </p>
                <p className={`font-medium text-xs ${idx === step
                    ? "text-gray-400"
                    : idx < step
                      ? "text-indigo-600"
                      : "text-gray-400"
                  }`}>{curr.description}</p>
              </div>
            </div>

            {/* Chevron except for last step */}
            {idx < steps.length - 1 && (
              <ChevronRight
                className={`mx-4 ${idx < step ? "text-indigo-500" : "text-gray-300"
                  }`}
                size={20}
              />
            )}
          </div>
        ))}
      </div>
 

      {step === 1 && (
        <div>
          <JobInputs onSubmit={handleJobInputSubmit} />
        </div>
      )}

      {step === 2 && (
        <div>
          <PdfTextExtractor onSubmit={handlePdfUpload} setStep={setStep} step={step} />
        </div>
      )}

      {step === 3 && (
        <div>
          <JobDescriptionForm onSubmit={handleJobDetailsSubmit} initialData={jobDetails} jobData={jobDescription} setStep={setStep} step={step} />
        </div>
      )}

      {step === 4 && (
        <form onSubmit={handleFinalSubmit}>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Extracted Job Details</h2>
            {jobDetails && (
              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <ExtractedJobDetailsCard interview={jobDetails} />
              </div>
            )}
          </div>

          {/** Next and back buttons */}
          <div className="flex justify-between items-center px-4">
            <button onClick={() => setStep(step - 1)} className="flex gap-1 items-center cursor-pointer hover:text-gray-800 text-[#636366] text-sm font-medium">
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <button disabled={loading}
              className="bg-[#462eb4] hover:shadow-2xl text-white px-5 py-3 rounded-md text-sm font-medium flex items-center gap-2 cursor-pointer transition duration-300 ease-in-out disabled:opacity-70 disabled:cursor-not-allowed">
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-1 w-5 h-5" /> {/* Loader2 icon with animate-spin */}
                  Creating Interview
                </>
              ) : (
                'Create Interview'
              )}
              {!loading ? <ArrowRight className="w-4 h-4" /> : <></>}
            </button>
          </div>

        </form>
      )}


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
