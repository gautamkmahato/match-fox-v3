"use client";

import { useState } from "react";
import generateResume from "@/app/service/resume/generateResume";
import { extractJsonBlock } from "@/lib/utils/cleanCodeBlock";
import ResumeTemplate from "./ResumeTemplate";

export default function CreateResume() {
  const [jobDescription, setJobDescription] = useState("");
  const [resume, setResume] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const getResume = async () => {
    setLoading(true);
    setResult(null);
    try {
      const response = await generateResume(jobDescription, resume);

      if (!response?.state) {
        console.error("Error generating resume");
        setResult({ error: "Failed to generate resume." });
      } else {
        const jsonData = extractJsonBlock(response?.data);
        const result = JSON.parse(jsonData);
        console.log(jsonData)
        setResult(result);
      } 
    } catch (error) {
      console.error("Error:", error);
      setResult({ error: "Something went wrong." });
    } finally {
      setLoading(false);
    }
  };

  if(result){
    return(
      <>
        <ResumeTemplate resume={result} />
      </>
    )
  }

  return (
    <>
      <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Generate Resume</h1>

      <div className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Job Description</label>
          <textarea
            rows={4}
            className="w-full border p-2 rounded-md"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Resume</label>
          <textarea
            rows={4}
            className="w-full border p-2 rounded-md"
            value={resume}
            onChange={(e) => setResume(e.target.value)}
          />
        </div>

        <button
          onClick={getResume}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Resume"}
        </button>
      </div>

      {/* Output */}
      {/* {result && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Generated Output:</h2>
          <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-auto max-h-[500px]">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )} */}
    </div>
    </>
  );
}
