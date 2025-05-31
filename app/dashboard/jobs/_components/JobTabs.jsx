'use client'

import { useState, useRef, useLayoutEffect } from 'react'
import { motion } from 'framer-motion'
import { useUser } from '@clerk/nextjs'
import JobDetails from '../[id]/_components/JobDetails'
import QuestionsList from './QuestionsList'
import JobAttemptDetails from './JobAttemptDetails'

const tabs = ['Job Details', 'Questions', 'Candidates']

export default function JobTabs({ details }) {
    const [activeTab, setActiveTab] = useState(0)
    const contentRef = useRef(null)
    const [height, setHeight] = useState(0)
    const [candidatesData, setCandidatesData] = useState(null)
    const [loadingCandidates, setLoadingCandidates] = useState(false)

    const { user } = useUser()

    useLayoutEffect(() => {
        if (contentRef.current) {
            setHeight(contentRef.current.scrollHeight)
        }
    }, [activeTab])

    const tabContents = [
        <JobDetails key="details" job={details} />,
        <QuestionsList key="questions" questions={details?.questions} />,
        <JobAttemptDetails 
            key="candidates" 
            interviewId={details?.id} 
            candidatesData={candidatesData}
            setCandidatesData={setCandidatesData}
            loading={loadingCandidates}
            setLoading={setLoadingCandidates}
        />
    ]

    return (
        <div className="w-full px-4 py-8">
            <div className="bg-white max-w-4xl mx-auto px-6 py-6 shadow border border-gray-100 rounded-lg">
                {/* Tabs */}
                <div className="relative flex space-x-4 md:space-x-8 border-b border-gray-200 overflow-x-auto scrollbar-hide">
                    {tabs.map((tab, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveTab(index)}
                            className={`relative pb-3 text-sm md:text-sm cursor-pointer whitespace-nowrap transition-colors duration-300 ${
                                activeTab === index
                                    ? 'text-gray-800 font-semibold'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            {tab}
                            {activeTab === index && (
                                <motion.div
                                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-800"
                                    layoutId="underline"
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div
                    ref={contentRef}
                    className="relative z-0 lg:px-6 py-6 text-gray-700 text-sm md:text-base space-y-4"
                >
                    {tabContents[activeTab]}
                </div>
            </div>
        </div>
    )
}