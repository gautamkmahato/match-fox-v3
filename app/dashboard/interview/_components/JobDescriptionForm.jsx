'use client';

import { cleanCodeBlock } from "@/lib/utils/cleanCodeBlock";
import { useState } from "react";
import { TextAreaField } from "./TextAreaFeild";
import { SubmitButton } from "./SubmitButton";
import { validateJobDescription } from "@/lib/utils/validateJobDescription";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import generateJobDetails from "@/app/service/interview/generateJobDetails";
import { toast } from "sonner";

export default function JobDescriptionForm({ onSubmit, initialData = {}, jobData, setStep, step }) {
  const [jobDescription, setJobDescription] = useState(initialData.jobDescription || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!jobData) {
    console.log("No jobData from Linkedin")
  }

  // Destructure initial job input data (from JobInputs step)
  const {
    companyName = "",
    difficultyLevel = "medium",
    duration = 30,
  } = initialData;

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    /** validate the job description */
    const validationError = validateJobDescription(jobData || jobDescription);
    if (validationError) {
      setError(validationError);
      toast.error(validationError);
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Generate extracted job info
      const apiResult = await generateJobDetails(jobData || jobDescription);
      // console.log("api results: ", apiResult)
      const cleanedResult = cleanCodeBlock(apiResult);
      // console.log("cleaned", cleanedResult)

      // Merge data from job inputs and extracted fields
      const mergedResult = {
        ...cleanedResult,
        company: cleanedResult?.company || companyName,
        difficulty_level: difficultyLevel || cleanedResult.difficulty_level || 'medium',
        duration: duration ? String(duration) : cleanedResult.duration || '30',
        interview_time: cleanedResult?.interview_time
          ? new Date(cleanedResult.interview_time).toISOString()
          : new Date().toISOString(), // fallback to now
        job_description: jobData || jobDescription,
      };

      // console.log("Final Merged Job Details:", mergedResult);

      if (onSubmit) {
        onSubmit(mergedResult);
      }
    } catch (err) {
      // console.error("Job Extraction Error:", err);
      setError(err.message || "Failed to extract job details.");
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <div className="w-full">
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
        <TextAreaField
          value={jobData ? jobData : jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the job description here..."
          ariaLabel="Job Description"
          required
        />

        <div className="flex justify-between items-center">
          <button onClick={() => setStep(step - 1)} className="flex gap-1 items-center cursor-pointer hover:text-gray-800 text-[#636366] text-sm font-medium">
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <button disabled={loading}
            className="bg-[#462eb4] hover:shadow-2xl text-white px-5 py-3 rounded-md text-sm font-medium flex items-center gap-2 cursor-pointer transition duration-300 ease-in-out disabled:opacity-70 disabled:cursor-not-allowed">
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2 w-5 h-5" /> {/* Loader2 icon with animate-spin */}
                Loading...
              </>
            ) : (
              'Next Step'
            )}
            {!loading ? <ArrowRight className="w-4 h-4" /> : <></>}
          </button>
        </div>

      </form>
    </div>
  );
}
