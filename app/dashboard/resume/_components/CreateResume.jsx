"use client";

import { useEffect, useState } from "react";
import generateResume from "@/app/service/resume/generateResume";
import { extractJsonBlock } from "@/lib/utils/cleanCodeBlock";
import ResumeTemplate from "./ResumeTemplate";
import { Loader2, LoaderCircle, UploadCloud, ArrowRight, FileText } from "lucide-react";
import fetchUserResume from "@/app/service/resume/fetchUserResume";
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import { toast } from 'sonner';

pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs';

export default function CreateResume() {
  const [jobDescription, setJobDescription] = useState("");
  const [resume, setResume] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [resumeName, setResumeName] = useState("resume.pdf");
  const [resumeList, setResumeList] = useState(null);
  const [error, setError] = useState(null);

  const getResume = async () => {
    setLoading(true);
    setResult(null);

    if (!jobDescription || !resume) {
      toast("Please upload job description & resume");
      setLoading(false);
      return;
    }

    try {
      const response = await generateResume(jobDescription, resume);

      if (!response?.state) {
        console.error("Error generating resume");
        setResult({ error: "Failed to generate resume." });
      } else {
        const jsonData = extractJsonBlock(response?.data);
        const parsed = JSON.parse(jsonData);
        console.log(jsonData);
        setResult(parsed);
      }
    } catch (error) {
      console.error("Error:", error);
      setResult({ error: "Something went wrong." });
    } finally {
      setLoading(false);
    }
  };

  const getUploadedResume = async () => {
    try {
      const result = await fetchUserResume();

      if (!result.state) {
        console.error("Unable to fetch Resume");
        toast.error("Unable to fetch Resume");
        return;
      }

      console.log("Resume", result?.data);
      setResumeList(result?.data);
    } catch (error) {
      console.error("Fetch Error: ", error);
      toast.error("Fetch Error");
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setError(null);
    setLoading(true);

    const fileReader = new FileReader();

    fileReader.onerror = () => {
      setLoading(false);
      setError("Failed to read file");
    };

    fileReader.onload = async () => {
      try {
        const typedArray = new Uint8Array(fileReader.result);
        const pdf = await pdfjsLib.getDocument(typedArray).promise;

        if (pdf.numPages === 0) {
          setError("PDF contains no pages");
          setLoading(false);
          return;
        }

        let fullText = "";
        const maxPages = Math.min(pdf.numPages, 50);

        for (let pageNum = 1; pageNum <= maxPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const content = await page.getTextContent();
          const strings = content.items.map((item) => item.str);
          fullText += strings.join(" ") + "\n\n";
        }

        setResume(fullText);
        toast("Resume uploaded successfully");
      } catch (err) {
        setError("Failed to extract PDF content");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fileReader.readAsArrayBuffer(file);
  };

  useEffect(() => {
    getUploadedResume();
  }, []);

  if (result) {
    return <ResumeTemplate resume={result} />;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-xl font-bold text-gray-800">Generate Resume</h1>

      {/* Job Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Job Description</label>
        <textarea
          rows={8}
          className="w-full bg-white border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the job description here..."
          required
        />
      </div>

      {/* Resume Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Resume</label>

        <div className="max-w-4xl mx-auto mt-6 px-8 py-8 bg-white rounded-2xl shadow-lg border border-gray-200">
          <label
            htmlFor="file-upload"
            className="flex items-center justify-center gap-2 px-4 py-8 border-4 border-dashed border-indigo-700 text-indigo-700 font-semibold hover:text-white rounded-lg cursor-pointer hover:bg-indigo-800 transition"
          >
            <UploadCloud className="w-10 h-10" />
            <span>Upload Resume</span>
            <input
              id="file-upload"
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          <div className="mt-6">
            {loading && (
              <div className="flex items-center gap-2 text-gray-600">
                <LoaderCircle className="animate-spin w-5 h-5" />
                <span>Extracting content...</span>
              </div>
            )}
            {error && <div className="text-red-600 mt-2">{error}</div>}
          </div>
        </div>

        {/* Resume Text Area */}
        <textarea
          rows={8}
          className="w-full mt-4 bg-white border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          value={resume}
          onChange={(e) => setResume(e.target.value)}
          placeholder="Paste your resume text here"
        />
      </div>

      {/* Generate Resume Button */}
      <div>
        <button
          onClick={getResume}
          disabled={loading}
          className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-md text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
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
  );
}
