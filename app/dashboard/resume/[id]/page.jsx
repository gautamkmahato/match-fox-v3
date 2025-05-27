'use client';

import { use } from 'react';
import { useState } from 'react';

export default function ResumePage(paramsPromise) {
  const { id } = use(paramsPromise.params);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    const res = await fetch(`/api/resume/generate-pdf?id=${id}`);
    const blob = await res.blob();

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Gautam Kumar Mahato</h1>
        <p className="text-sm text-gray-600 mb-1">Email: gautam@example.com</p>
        <p className="text-sm text-gray-600 mb-4">Phone: 123-456-7890</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Experience</h2>
        <ul className="list-disc ml-5 text-sm text-gray-700">
          <li>Software Developer at XYZ Corp</li>
          <li>Built scalable MERN stack apps</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">Skills</h2>
        <p className="text-sm">JavaScript, React, Node.js, MongoDB, PostgreSQL</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Education</h2>
        <p className="text-sm">B.Tech in Computer Science - ABC University</p>

        <button
          onClick={handleDownload}
          disabled={downloading}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {downloading ? 'Downloading...' : 'Download as PDF'}
        </button>
      </div>
    </div>
  );
}
