'use client'

import { useState, useRef, useLayoutEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AIReportCard from '@/app/dashboard/report/_components/AIReportCard'
import { useUser } from '@clerk/nextjs'
import InterviewSummary from '@/app/dashboard/report/_components/InterviewSummary'
import OverallFeedbackSection from '@/app/dashboard/report/_components/OverallFeedbackSection'
import QuestionsWiseFeedback from '@/app/dashboard/report/_components/QuestionsWiseFeedback'

const tabs = ['Interview Summary', 'Overall Feedback', 'Questions']

export default function Tabs({ content, code, reportDetails }) {
  const [activeTab, setActiveTab] = useState(0)
  const [expanded, setExpanded] = useState(true)
  const contentRef = useRef(null)
  const [height, setHeight] = useState(0);

  const { user } = useUser();

  //const collapsedHeight = 500;

  const feedback = {
          areasForImprovement: reportDetails?.report?.Areas_for_Improvement,
        keyStrengths: reportDetails?.report?.Key_Strengths,
        suggestedLearningResources: reportDetails?.report?.Suggested_Learning_Resources,
        topicsToFocusOn: reportDetails?.report?.Topics_to_focus_on,
        }

  const questionFeedback = reportDetails?.report?.Question_Wise_Feedback;

  useLayoutEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight)
    }
  }, [activeTab])

  const tabContents = [
    <>
        {/* Content goes here. */}
        <InterviewSummary
                      id={reportDetails?.id}
                      companyLogo={reportDetails?.interview_attempts?.interviews?.company_logo}
                      companyName={reportDetails?.interview_attempts?.interviews?.company}
                      interviewTitle={reportDetails?.interview_attempts?.interviews?.interview_name}
                      position={reportDetails?.interview_attempts?.interviews?.position}
                      userName={user?.firstName}
                      overallScore={reportDetails?.score}
                      recommendation={!!reportDetails?.recommendation}
                      Skill_Evaluation={reportDetails?.report?.Skill_Evaluation}
                      summary={reportDetails?.report?.overall_summary}
                    />
    </>,
    <>
        {/* Code goes here. */}
        
      <OverallFeedbackSection
        feedback={feedback}
       />
    </>,
    <>
        {/* Code goes here. */}
      <QuestionsWiseFeedback feedbackData={reportDetails?.report?.Question_Wise_Feedback} />
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

        {/* Tab Content with animated height */}
        <motion.div
          // initial={{ height: collapsedHeight }}
          animate={{ height: expanded ? height : height }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 20,
            mass: 1
          }}
          className="relative overflow-hidden"
        >
          {/* Content */}
          <div
            ref={contentRef}
            className="relative z-0 px-4 md:px-6 py-6 text-gray-700 text-sm md:text-base space-y-4"
          >
            {tabContents[activeTab]}
          </div>

          {/* Bottom Gradient Overlay */}
          <AnimatePresence>
            {height && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-100 to-transparent z-10 pointer-events-none"
              />
            )}
          </AnimatePresence>
        </motion.div>

        {/* Expand/Collapse Button */}
        {/* {height > collapsedHeight && (
          <div className="mt-4 text-center">
            <motion.button
              onClick={() => setExpanded((prev) => !prev)}
              className="text-sm text-gray-600 cursor-pointer hover:underline font-medium transition"
              whileTap={{ scale: 0.97 }}
            >
              {expanded ? 'Show Less' : 'Show More'}
            </motion.button>
          </div>
        )} */}
      </div>
    </div>
  )
}
