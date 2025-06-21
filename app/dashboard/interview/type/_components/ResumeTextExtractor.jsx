'use client';

import React, { useState, useEffect } from 'react';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import { ArrowLeft, UploadCloud, LoaderCircle, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs';

export default function ResumeTextExtractor({ onSubmit, setStep, step }) {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasNotified, setHasNotified] = useState(false);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setContent(null);
    setError(null);
    setHasNotified(false);

    if (!file) {
      setError('No file selected.');
      return;
    }

    if (file.type !== 'application/pdf') {
      setError('Please upload a valid PDF file.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5 MB limit
      setError('File is too large. Max size is 5MB.');
      return;
    }

    setLoading(true);

    try {
      const fileReader = new FileReader();

      fileReader.onload = async () => {
        try {
          const typedArray = new Uint8Array(fileReader.result);
          const pdf = await pdfjsLib.getDocument(typedArray).promise;

          if (pdf.numPages === 0) {
            setError('PDF contains no pages.');
            return;
          }

          let fullText = '';
          const maxPages = Math.min(pdf.numPages, 50); // Limit pages

          for (let pageNum = 1; pageNum <= maxPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const content = await page.getTextContent();
            const strings = content.items.map(item => item.str);
            fullText += strings.join(' ') + '\n\n';
          }

          if (fullText.trim().length < 30) {
            setError('Resume content appears empty or unreadable.');
            return;
          }

          setContent(fullText);
        } catch (err) {
          console.error('PDF parsing error:', err);
          setError('Failed to extract content from PDF.');
        } finally {
          setLoading(false);
        }
      };

      fileReader.onerror = () => {
        setError('Failed to read the file.');
        setLoading(false);
      };

      fileReader.readAsArrayBuffer(file);
    } catch (err) {
      console.error('File processing error:', err);
      setError('Unexpected error occurred while processing the file.');
      setLoading(false);
    }
  };

  const handlePdfSubmit = async (e) => {
    e.preventDefault();
    if (!content) {
      setError('Please upload a valid resume before submitting.');
      return;
    }

    onSubmit(content);
  };

  useEffect(() => {
    if (content && !hasNotified) {
      toast.success('Resume uploaded successfully.');
      setHasNotified(true);
    }
  }, [content, hasNotified]);

  return (
    <div className="max-w-2xl mx-auto px-8 py-2 bg-white ">
      <form onSubmit={handlePdfSubmit}>
        <label
          htmlFor="file-upload"
          className="flex items-center justify-center gap-2 px-4 py-8 border-4 border-dashed border-indigo-700 text-indigo-700 font-semibold hover:text-white rounded-lg cursor-pointer hover:bg-indigo-800 transition"
        >
          <UploadCloud className="w-10 h-10" />
          <span>Upload Resume (PDF)</span>
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

          {error && (
            <div className="mt-4 text-sm text-red-600 font-medium">
              {error}
            </div>
          )}
        </div>

        <div className="flex justify-between items-center w-full mt-10">
  <button
    type="submit"
    className="w-full bg-[#462eb4] hover:shadow-2xl text-white px-5 py-3 rounded-md text-sm font-medium flex justify-center items-center gap-1 cursor-pointer transition duration-300 ease-in-out disabled:opacity-70 disabled:cursor-not-allowed"
    disabled={!content || loading}
  >
    Submit
    {/* <ArrowRight className="w-4 h-4" /> */}
  </button>
</div>

      </form>
    </div>
  );
}
