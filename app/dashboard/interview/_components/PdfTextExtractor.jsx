'use client'

import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import { ArrowLeft, ArrowRight, FileText, Loader2, LoaderCircle, UploadCloud } from 'lucide-react';
import { toast } from 'sonner';

pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs';


export default function PdfTextExtractor({ onSubmit, setStep, step }) {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setContent(null);
    setError(null);
    setLoading(true);

    const fileReader = new FileReader();

    fileReader.onerror = () => {
      setLoading(false);
      setError('Failed to read file');
    };

    fileReader.onload = async () => {
      try {
        const typedArray = new Uint8Array(fileReader.result);
        const pdf = await pdfjsLib.getDocument(typedArray).promise;

        if (pdf.numPages === 0) {
          setError('PDF contains no pages');
          setLoading(false);
          return;
        }

        let fullText = '';
        const maxPages = Math.min(pdf.numPages, 50); // Limit for performance

        for (let pageNum = 1; pageNum <= maxPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const content = await page.getTextContent();
          const strings = content.items.map(item => item.str);
          fullText += strings.join(' ') + '\n\n';
        }

        setContent(fullText);
      } catch (err) {
        setError('Failed to extract PDF content');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fileReader.readAsArrayBuffer(file);
  };

  const handlePdfSubmit = () => {
    onSubmit(content);
  }

  if (content) {
    toast("Resume uploaded successfully")
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 px-8 py-8 bg-white rounded-2xl shadow-lg border border-gray-200">
      <form onSubmit={handlePdfSubmit}>
        <label htmlFor="file-upload"
          className="flex items-center justify-center gap-2 px-4 py-8 border-4 border-dashed border-indigo-700 text-indigo-700 font-semibold hover:text-white rounded-lg cursor-pointer hover:bg-indigo-800 transition"
        >
          <UploadCloud className="w-10 h-10" />
          <span>Upload Resume</span>
          <input id="file-upload" type="file" accept="application/pdf" className="hidden"
            onChange={handleFileChange}
          />
        </label>

        <div className="mt-16">
          {loading && (
            <div className="flex items-center gap-2 text-gray-600">
              <LoaderCircle className="animate-spin w-5 h-5" />
              <span>Extracting content...</span>
            </div>
          )}

          {error && (
            <div className="text-red-600 mt-2">
              {error}
            </div>
          )}
        </div>

        <div className="flex justify-between items-center">
          <button onClick={() => setStep(step - 1)} className="flex gap-1 items-center cursor-pointer hover:text-gray-800 text-[#636366] text-sm font-medium">
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <button disabled={loading}
            className="bg-[#462eb4] hover:shadow-2xl text-white px-5 py-3 rounded-md text-sm font-medium flex items-center gap-1 cursor-pointer transition duration-300 ease-in-out disabled:opacity-70 disabled:cursor-not-allowed">
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2 w-5 h-5" /> {/* Loader2 icon with animate-spin */}
                Loading
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


