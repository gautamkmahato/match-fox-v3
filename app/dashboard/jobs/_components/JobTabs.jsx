'use client'

import { useState, useRef, useLayoutEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useUser } from '@clerk/nextjs'
import JobDetails from '../[id]/_components/JobDetails'
import QuestionsList from './QuestionsList'
import JobAttemptDetails from './JobAttemptDetails'

const tabs = ['Job Details', 'Questions', 'Candidates',]

export default function JobTabs({ details }) {
    const [activeTab, setActiveTab] = useState(0)
    const [expanded, setExpanded] = useState(true)
    const contentRef = useRef(null)
    const [height, setHeight] = useState(0);

    const { user } = useUser();

    //const collapsedHeight = 500;

    useLayoutEffect(() => {
        if (contentRef.current) {
            setHeight(contentRef.current.scrollHeight)
        }
    }, [activeTab])

    const tabContents = [
        <>
            {/* Job details goes here. */}
            <JobDetails job={details} />
        </>,
        <>
            {/* Questions goes here. */}
            <QuestionsList questions={details?.questions} />
        </>,
        <>
            {/* Candidate goes here. */}
            <JobAttemptDetails interviewId={details?.id} />
        </>
    ]

    return (
        <div className="w-full px-4 py-8">
            <div className="max-w-4xl mx-auto px-6 py-6 shadow border border-gray-100 rounded-lg">
                {/* Tabs */}
                <div className="relative flex space-x-4 md:space-x-8 border-b border-gray-200 overflow-x-auto scrollbar-hide">
                    {tabs.map((tab, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setActiveTab(index)
                                setExpanded(false)
                            }}
                            className={`relative pb-3 text-sm md:text-sm cursor-pointer whitespace-nowrap transition-colors duration-300 ${activeTab === index
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

                {/* Tab Content with animated height */}
                    {/* Content */}
                    <div
                        ref={contentRef}
                        className="relative z-0 px-4 md:px-6 py-6 text-gray-700 text-sm md:text-base space-y-4"
                    >
                        {tabContents[activeTab]}
                    </div>

            </div>
        </div>
    )
}
