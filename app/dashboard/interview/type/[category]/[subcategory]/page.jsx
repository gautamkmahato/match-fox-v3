'use client'

import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import generateQuestions from '@/app/service/portal/generateQuestions';
import { extractJsonBlock } from '@/lib/utils/cleanCodeBlock';
import createInterviewFromAPI from '@/app/service/portal/createInterviewFromAPI';
import Modal from '@/components/Modal';
import ResumeTextExtractor from '../../_components/ResumeTextExtractor';
import LoadingOverlay from '@/components/LoadingOverlay';
import { Sparkles, ChevronRight, Zap, Play, BarChart3, CheckCircle, Upload, FileText } from 'lucide-react';

const subCategories = {
  mba: ['IIM', 'XLRI', 'FMS'],
  gmat: ['Duke', 'Harvard', 'Stanford'],
  technical: ['Frontend', 'Backend', 'DevOps'],
  hr: ['Entry-level', 'Managerial', 'Leadership'],
  sat: ['Reading', 'Math', 'Writing'],
  csat: ['Service', 'Support', 'Feedback'],
};

export default function SubCategoryPage({ params }) {
    const [jobDescription, setJobDescription] = useState();
    const [loading, setLoading] = useState(false);
    const [jobDetails, setJobDetails] = useState(null);
    const [interviewData, setInterviewData] = useState();
    const [open, setOpen] = useState(false);
    const [loadingStart, setLoadingStart] = useState(false);
    const [loadingDashboard, setLoadingDashboard] = useState(false);
    const [resume, setResume] = useState(null);
    const [generateJobDetailStatus, setGenerateJobDetailStatus] = useState(false);
    const [generateQuestionStatus, setGenerateQuestionStatus] = useState(false);
    const [createInterviewFromAPIStatus, setCreateInterviewFromAPIStatus] = useState(false);
    const [resumeStatus, setResumeStatus] = useState(null);
    
    const router = useRouter();

    const { category } = React.use(params);
    const { subcategory } = React.use(params);

    if (!subcategory){
        return(
            <>
                <h1>Not Found</h1>
            </>
        )
    } 

    const handlePdfUpload = async (pdfData) => {
        console.log(pdfData);
        setResume(pdfData);
        setResumeStatus(true);
    }

    const getQuestions = async () => {
        try {
            setGenerateQuestionStatus(true);
            if (resume === null) {
                setResumeStatus(false);
            }
            // Step 1: Generate questions from Gemini API
            const genResult = await generateQuestions(subcategory || 'Not Available', resume || 'Not Available');

            if (!genResult?.status || !genResult?.data) {
                setError("Failed to generate interview questions.");
                return;
            }

            console.log("genResult::: ", genResult);

            // Step 2: Clean the result (if needed, depending on Gemini output)
            const questions = extractJsonBlock(genResult.data);
            const cleaned = `[${questions.trim()}]`;
            const parsedQuestions = JSON.parse(cleaned);
            console.log("Cleaned Questions::: ", parsedQuestions);

            return parsedQuestions;

        } catch (error) {
            console.log("Error: ", error);
        } finally {
            setGenerateQuestionStatus(false);
        }
    }

    const handleInterviewCreate = async (mergedResult, questions) => {
        try {
          setCreateInterviewFromAPIStatus(true);
          // Step 3: Create interview with generated questions
          const createResult = await createInterviewFromAPI(mergedResult, questions);
    
          if (!createResult.state || createResult?.error) {
            console.log(createResult?.error || "Something went wrong while creating the interview.");
            return;
          }
    
          if (createResult.state) {
            console.log("Interview created successfully:", createResult);
            setInterviewData(createResult?.data[0])
            setOpen(true); // Trigger success modal or state
          }
        } catch (error) {
          console.log("Error: ", error);
        } finally {
          setCreateInterviewFromAPIStatus(false);
        }
    }

    const handleFinalSubmit = async () => {
        setLoading(true);

        try {
            const questions = await getQuestions();
            const mergedResult = {
                name: category,
                program_name: subcategory,
                resume: resume,
                status: 'in-progress'
            }
            const result = await handleInterviewCreate(mergedResult, questions);
            console.log("result::: ", result);
        } catch (err) {
        console.error("Error in handleFinalSubmit:", err);
        } finally {
        setLoading(false);
        }
    };

    const handleModalClose = () => {
    router.push("/dashboard/interview");
    setOpen(false);
    setLoading(true);
  }

  const handleStartInterview = async () => {
    setLoadingStart(true);
    await router.push(`/dashboard/meetings/${interviewData?.id}`);
  };

  const handleGoToDashboard = async () => {
    setLoadingDashboard(true);
    await router.push("/dashboard/interview");
  };

    if(loading){
        return(
            <>
                <LoadingOverlay text="Creating Interview..." />
            </>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50/30 to-purple-50/20 p-4 sm:p-6">
            <div className="max-w-3xl mx-auto">
                {/* Main Card */}
                <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-3xl shadow-2xl shadow-violet-500/10 overflow-hidden">
                    {/* Header Section */}
                    <div className="relative bg-gradient-to-r from-[#462eb4] via-indigo-600 to-indigo-600 px-8 py-12">
                        {/* Animated background elements */}
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                        </div>
                        
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                                    <Sparkles className="text-white" size={48} />
                                </div>
                                <div>
                                    <h1 className="text-2xl sm:text-3xl font-bold text-white">
                                        Create AI Interview
                                    </h1>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="px-3 py-1 bg-white/20 rounded-full text-white/90 text-sm font-medium backdrop-blur-sm">
                                            {category?.toUpperCase()}
                                        </span>
                                        <ChevronRight className="text-white/60" size={16} />
                                        <span className="px-3 py-1 bg-white/20 rounded-full text-white/90 text-sm font-medium backdrop-blur-sm">
                                            {subcategory?.toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-white/80 text-sm leading-relaxed max-w-2xl">
                                Upload your resume and let our AI create a personalized interview experience tailored to your skills and the role you're targeting.
                            </p>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8 space-y-8">
                        {/* Resume Uploader */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center">
                                    <span className="text-violet-600 font-bold text-sm">1</span>
                                </div>
                                <h2 className="text-lg font-semibold text-gray-800">Upload Resume</h2>
                            </div>
                            <div className="w-full">
                                <ResumeTextExtractor onSubmit={handlePdfUpload} />
                            </div>
                        </div>

                        {/* Action Section */}
                        {resumeStatus && (
                            <div className="space-y-4 animate-in slide-in-from-bottom duration-500">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                                        <span className="text-emerald-600 font-bold text-sm">2</span>
                                    </div>
                                    <h2 className="text-lg font-semibold text-gray-800">Generate Interview</h2>
                                </div>
                                
                                <div className="p-6 bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl border border-violet-100">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-white rounded-xl shadow-sm">
                                            <Zap className="text-violet-600" size={24} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-800 mb-2">Ready to Generate</h3>
                                            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                                                Your resume has been analyzed. We'll create interview questions based on your experience, skills, and the selected role category.
                                            </p>
                                            
                                            <div className="w-full flex flex-col items-center justify-center gap-6">
                                                <button
                                                    onClick={handleFinalSubmit}
                                                    className="group relative overflow-hidden w-full bg-gradient-to-r from-[#462eb4] to-indigo-600 hover:from-violet-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                                                >
                                                    {/* Button background animation */}
                                                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                                                    
                                                    <div className="relative flex items-center gap-3">
                                                        <Sparkles size={20} />
                                                        <span>Create Interview</span>
                                                        {/* <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" /> */}
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Features Preview */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                        { icon: Sparkles, title: "AI-Powered", desc: "Smart question generation" },
                        { icon: FileText, title: "Resume-Based", desc: "Tailored to your experience" },
                        { icon: Zap, title: "Instant Results", desc: "Ready in seconds" }
                    ].map((feature, index) => (
                        <div key={index} className="bg-white/60 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center hover:bg-white/80 transition-all duration-300 hover:scale-105">
                            <div className="inline-flex p-3 bg-gradient-to-br from-violet-100 to-purple-100 rounded-xl mb-3">
                                <feature.icon className="text-violet-600" size={24} />
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-1">{feature.title}</h3>
                            <p className="text-sm text-gray-600">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Enhanced Modal */}
            <Modal isOpen={open} onClose={handleModalClose} width="max-w-lg">
                <div className="relative bg-white rounded-3xl overflow-hidden">
                    {/* Success Header */}
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                                <CheckCircle className="text-white" size={28} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white">Interview Created!</h2>
                                <p className="text-emerald-100 text-sm">Your AI interview is ready to begin</p>
                            </div>
                        </div>
                    </div>

                    {/* Modal Content */}
                    <div className="px-8 py-8 space-y-6">
                        <p className="text-gray-600 text-center">What would you like to do next?</p>

                        <div className="flex flex-col gap-4">
                            <button
                                onClick={handleStartInterview}
                                disabled={loadingStart}
                                className="group relative overflow-hidden bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-6 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                                
                                <div className="relative flex items-center gap-3">
                                    {loadingStart ? (
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        <Play size={20} />
                                    )}
                                    <span>Start Interview Now</span>
                                </div>
                            </button>

                            <button
                                onClick={handleGoToDashboard}
                                disabled={loadingDashboard}
                                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-4 rounded-xl font-medium transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3 border border-gray-200"
                            >
                                {loadingDashboard ? (
                                    <div className="w-5 h-5 border-2 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <BarChart3 size={20} />
                                )}
                                <span>Go to Dashboard</span>
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}