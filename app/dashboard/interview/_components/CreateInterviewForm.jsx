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

export default function CreateInterviewForm() {
  const [step, setStep] = useState(1);
  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [limitReached, setLimitReached] = useState(false);
  const [open, setOpen] = useState(false)
  const [questions, setQuestions] = useState(false)

  const router = useRouter();

  const handleJobDetailsSubmit = async (result) => {
    setJobDetails(result);
    setStep(3);
  };

  const handleJobInputSubmit = async (companyName, difficultyLevel, duration, status) => {
    if (!status) {
      setError("Limit exceeded. Please upgrade your plan.");
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

  const handleFinalSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  console.log("jobDetails", jobDetails)
  
  try {
    // Step 1: Generate questions from Gemini API
    const genResult = await generateQuestions(jobDetails);

    if (!genResult?.status || !genResult?.data) {
      setError("Failed to generate interview questions.");
      return;
    }

    console.log(genResult)

    // Step 2: Clean the result (if needed, depending on Gemini output)
    const questions = extractJsonBlock(genResult.data);
console.log("Cleaned :", questions);
    console.log("Cleaned Questions:", JSON.parse(questions));

    // Step 3: Create interview with generated questions
    const createResult = await createInterviewFromAPI(jobDetails, JSON.parse(questions));

    if (!createResult || createResult.error) {
      setError(createResult?.error || "Something went wrong while creating the interview.");
      return;
    }

    if (createResult.state) {
      console.log("Interview created successfully:", createResult);
      setOpen(true); // Trigger success modal or state
    }
  } catch (err) {
    console.error("Error in handleFinalSubmit:", err);
    setError(err.message || "An unexpected error occurred.");
  } finally {
    setLoading(false);
  }
};



  if (limitReached) {
    return (
      <div className="max-w-xl mx-auto text-center py-10">
        <h1 className="text-2xl font-semibold mb-4">Usage Limit Reached</h1>
        <p className="text-gray-600 mb-4">
          You’ve reached your monthly limit. Please upgrade your plan to create more interviews.
        </p>
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          onClick={() => router.push("/pricing")}
        >
          Upgrade Plan
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {step === 1 && (
        <div>
          <label className="block mb-2 font-medium">Job Description *</label>
          <JobInputs onSubmit={handleJobInputSubmit} />
        </div>
      )}

      {step === 2 && (
        <div>
          <JobDescriptionForm onSubmit={handleJobDetailsSubmit} initialData={jobDetails} />
        </div>
      )}

      {step === 3 && (
        <form onSubmit={handleFinalSubmit}>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Extracted Job Details</h2>
            {jobDetails && (
              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <ExtractedJobDetailsCard interview={jobDetails} />
              </div>
            )}

            <label className="block mb-2 font-medium">Resume (optional)</label>
            <input type="file" className="w-full border p-2 rounded-md" />
          </div>

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={() => setStep(step-1)}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Interview"}
            </button>
          </div>
        </form>
      )}

      {error && <p className="text-red-600">{error}</p>}
      <Modal isOpen={open} onClose={() => setOpen(false)}>
  <div className="text-center space-y-4">
    <h2 className="text-2xl font-semibold text-gray-800">Interview Created Successfully!</h2>
    <p className="text-gray-600">What would you like to do next?</p>
    <div className="flex justify-center gap-4 mt-6">
      <button
        onClick={() => router.push("/dashboard/meetings")}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Start the Interview
      </button>
      <button
        onClick={() => router.push("/dashboard/interview")}
        className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
      >
        Go to Dashboard
      </button>
    </div>
  </div>
</Modal>

    </div>
  );
}
