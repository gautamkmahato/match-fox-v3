"use client";

import { useState } from "react";
import generateResume from "@/app/service/resume/generateResume";
import { extractJsonBlock } from "@/lib/utils/cleanCodeBlock";
import ResumeTemplate from "./ResumeTemplate";
import { FileText, Loader, Loader2, UploadCloud } from "lucide-react";

export default function CreateResume() {
  const [jobDescription, setJobDescription] = useState("");
  const [resume, setResume] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [resumeName, setResumeName] = useState("resume.pdf"); // or dynamically set when uploading a file


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
      

<div className="max-w-3xl mx-auto p-6 space-y-6">
  <h1 className="text-xl font-bold text-gray-800">Generate Resume</h1>

  {/* Job Description */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Job Description
    </label>
    <textarea
      rows={8}
      className="w-full bg-white border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
      value={jobDescription}
      onChange={(e) => setJobDescription(e.target.value)}
      placeholder="Paste the job description here..."
    />
  </div>

  {/* Resume Section */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Resume
    </label>

    {/* Already uploaded resume */}
    {/* {(
      <div className="flex items-center gap-3 p-3 border border-gray-300 rounded-md bg-gray-50 mb-2">
        <FileText className="w-5 h-5 text-indigo-600" />
        <span className="text-sm text-gray-800">
          {resumeName || "resume.pdf"}
        </span>
      </div>
    )} */}

    {/* OR Upload divider */}
    {/* <div className="flex items-center justify-center my-2">
      <div className="border-t border-gray-300 flex-grow" />
      <span className="text-xs text-gray-500 px-2">or upload resume</span>
      <div className="border-t border-gray-300 flex-grow" />
    </div> */}

    {/* Resume text area (for user input) */}
    <textarea
      rows={8}
      className="w-full bg-white border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
      value={resume}
      onChange={(e) => setResume(e.target.value)}
      placeholder="Paste your resume text here"
    />
  </div>

  {/* Generate Button */}
  <div>
    <button
      onClick={getResume}
      disabled={loading}
      className={`flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-md text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {loading ? (
        <>
          <Loader2 className="animate-spin w-4 h-4" />
          Generating...
        </>
      ) : (
        "Generate Resume"
      )}
    </button>
  </div>
</div>

    </>
  );
}
