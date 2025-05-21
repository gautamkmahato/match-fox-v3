'use client';

import { cleanCodeBlock } from "@/lib/utils/cleanCodeBlock";
import { useState } from "react";
import { TextAreaField } from "./TextAreaFeild";
import { SubmitButton } from "./SubmitButton";
import { validateJobDescription } from "@/lib/utils/validateJobDescription";
import generateJobDetails from "@/app/service/interview/jobService";

export default function JobDescriptionForm({ onSubmit, initialData = {} }) {
  const [jobDescription, setJobDescription] = useState(initialData.jobDescription || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Destructure initial job input data (from JobInputs step)
  const {
    companyName = "",
    difficultyLevel = "medium",
    duration = 30,
  } = initialData;

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateJobDescription(jobDescription);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Generate extracted job info
      const apiResult = await generateJobDetails(jobDescription);
      const cleanedResult = cleanCodeBlock(apiResult);

      // Merge data from job inputs and extracted fields
      const mergedResult = {
        ...cleanedResult,
        company: companyName,
        difficulty_level: difficultyLevel || cleanedResult.difficulty_level || 'medium',
        duration: duration ? String(duration) : cleanedResult.duration || '30',
        interview_time: cleanedResult?.interview_time
          ? new Date(cleanedResult.interview_time).toISOString()
          : new Date().toISOString(), // fallback to now
        job_description: jobDescription,
      };

      console.log("Final Merged Job Details:", mergedResult);

      if (onSubmit) {
        onSubmit(mergedResult);
      }
    } catch (err) {
      console.error("Job Extraction Error:", err);
      setError(err.message || "Failed to extract job details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
        <TextAreaField
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the job description here..."
          ariaLabel="Job Description"
          required
        />

        <SubmitButton
          isLoading={loading}
          loadingText="Extracting..."
          defaultText="Extract Job Details"
        />
      </form>
    </div>
  );
}
