'use client'

import { useState, useRef, useLayoutEffect } from 'react'
import { motion } from 'framer-motion'
import { useUser } from '@clerk/nextjs'

import InterviewSummary from '@/app/dashboard/report/_components/InterviewSummary'
import OverallFeedbackSection from '@/app/dashboard/report/_components/OverallFeedbackSection'
import QuestionsWiseFeedback from '@/app/dashboard/report/_components/QuestionsWiseFeedback'
import ChatComponent from '@/app/dashboard/report/_components/ChatComponent'

const tabs = ['Interview Summary', 'Overall Feedback', 'Questions', 'Interview Copilot']

export default function Tabs({ content, code, reportDetails }) {
  const [activeTab, setActiveTab] = useState(0)
  const contentRef = useRef(null)
  const [height, setHeight] = useState(0)
  const { user } = useUser()

  // Handle chat conversation
  let finalConversation = []
  try {
    const rawChat = reportDetails?.interview_attempts?.chat_conversation
    if (typeof rawChat === 'string' && rawChat.trim()) {
      const parsed = JSON.parse(rawChat)
      if (parsed && Array.isArray(parsed.current)) {
        finalConversation = parsed.current.filter(msg => msg.role !== 'system')
      }
    }
  } catch (err) {
    //console.error('❌ Failed to parse chat:', err)
  }

  const [chat, setChat] = useState(finalConversation)

  const reportInString = JSON.stringify(reportDetails?.report)
  const feedback = {
    areasForImprovement: reportDetails?.report?.Areas_for_Improvement,
    keyStrengths: reportDetails?.report?.Key_Strengths,
    suggestedLearningResources: reportDetails?.report?.Suggested_Learning_Resources,
    topicsToFocusOn: reportDetails?.report?.Topics_to_focus_on,
  }

  useLayoutEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight)
    }
  }, [activeTab])

  const tabContents = [
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
    />,
    <OverallFeedbackSection feedback={feedback} />,
    <QuestionsWiseFeedback feedbackData={reportDetails?.report?.Question_Wise_Feedback} />,
    <ChatComponent
      report={reportInString}
      chat={chat}
      setChat={setChat}
    />,
  ]

  return (
    <div className="w-full px-4 py-8">
      <div className="max-w-4xl mx-auto px-6 py-6 shadow border border-gray-100 rounded-lg">
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
          className="relative z-0 px-4 md:px-6 py-6 text-gray-700 text-sm md:text-base space-y-4"
        >
          {tabContents[activeTab]}
        </div>
      </div>
    </div>
  )
}
