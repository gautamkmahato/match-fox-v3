'use client'

// app/interview/new/page.js

import { SquaresIntersect } from "lucide-react";
import CreateInterviewForm from "../_components/CreateInterviewForm";
import { useEffect, useState } from "react";

export default function CreateInterviewPage() {
  const [jobDescription, setJobDescription] = useState();

  useEffect(() => {
    // Notify parent window that this window is ready
    if (window.opener) {
      window.opener.postMessage({ type: 'READY_FOR_JOB' }, '*');
    }

    const handleMessage = (event) => {
      // Security: Check origin if using in production
      if (typeof event.data?.job_description === 'string') {
        const job = event.data.job_description;
        localStorage.setItem('job_description', job);
        setJobDescription(job);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      // Cleanup: Prevent memory leaks
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="flex gap-1 items-center text-2xl font-bold text-[#1D1D1F] mb-1">
        <SquaresIntersect className="h-5 w-5" />
        Create Interview
      </h1>
      <p className="text-sm text-gray-400 mb-8">
        Please fill in the details below to generate customize mock interview
      </p>
      <CreateInterviewForm jobDescription={jobDescription} />
    </main>
  );
}
