'use client';

import React, { useState, useEffect } from 'react';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import { ArrowLeft, UploadCloud, LoaderCircle, ArrowRight, FileText, CheckCircle, Zap } from 'lucide-react';
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
    <div className="max-w-2xl mx-auto px-8 py-2 bg-white">
      <div onSubmit={handlePdfSubmit}>
        <label
          htmlFor="file-upload"
          className={`relative group block overflow-hidden border-2 border-dashed rounded-2xl p-8 transition-all duration-300 cursor-pointer ${
            content 
              ? 'border-emerald-400 bg-emerald-50 hover:bg-emerald-100' 
              : loading
              ? 'border-violet-400 bg-violet-50'
              : error
              ? 'border-red-400 bg-red-50 hover:bg-red-100'
              : 'border-gray-200 hover:border-violet-300 hover:bg-violet-25 hover:scale-[1.02]'
          }`}
        >
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative flex flex-col items-center text-center space-y-4">
            <div className={`relative p-4 rounded-full transition-all duration-300 ${
              content 
                ? 'bg-emerald-100 text-emerald-600' 
                : loading
                ? 'bg-violet-100 text-violet-600'
                : error
                ? 'bg-red-100 text-red-600'
                : 'bg-violet-100 text-violet-600 group-hover:scale-110'
            }`}>
              {content ? (
                <CheckCircle size={32} />
              ) : loading ? (
                <LoaderCircle size={32} className="animate-spin" />
              ) : (
                <UploadCloud size={32} />
              )}
              {!content && !loading && !error && (
                <div className="absolute -inset-2 rounded-full bg-violet-400 opacity-20 animate-ping"></div>
              )}
            </div>
            
            <div>
              <h3 className={`text-lg font-semibold mb-2 ${
                content 
                  ? 'text-emerald-700' 
                  : error 
                  ? 'text-red-700'
                  : 'text-gray-800'
              }`}>
                {content 
                  ? 'Resume Uploaded Successfully!' 
                  : loading
                  ? 'Processing Resume...'
                  : error
                  ? 'Upload Failed'
                  : 'Upload Your Resume'
                }
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {content 
                  ? 'Your resume has been processed and is ready for analysis'
                  : loading
                  ? 'Extracting text content from your PDF...'
                  : error
                  ? 'Please try uploading a different PDF file'
                  : 'Drag & drop your PDF resume here, or click to browse'
                }
              </p>
            </div>
            
            {!content && !loading && (
              <div className="text-xs text-gray-400 flex items-center gap-2">
                <span>Supports PDF files up to 5MB</span>
              </div>
            )}
          </div>

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
            <div className="flex items-center justify-center gap-3 p-4 bg-violet-50 rounded-xl border border-violet-200">
              <LoaderCircle className="animate-spin w-5 h-5 text-violet-600" />
              <span className="text-violet-700 font-medium">Extracting content...</span>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
              <div className="text-sm text-red-700 font-medium">
                {error}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center w-full mt-10">
          <button
            onClick={handlePdfSubmit}
            className="group relative overflow-hidden w-full bg-gradient-to-r from-[#462eb4] to-indigo-600 hover:from-violet-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            disabled={!content || loading}
          >
            {/* Button background animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            
            <div className="relative flex items-center gap-3">
              {/* <Zap size={20} /> */}
              <span>Submit Resume</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}