// components/QuestionsWiseFeedback.jsx
'use client';

import React, { useState } from 'react';
import { MessageSquare, ChevronDown, ChevronUp, Star } from 'lucide-react';

export default function QuestionsWiseFeedback({ feedbackData }) {
  const [expandedQuestion, setExpandedQuestion] = useState(null); // State to manage which question's feedback is expanded

  const toggleExpand = (index) => {
    setExpandedQuestion(expandedQuestion === index ? null : index);
  };

  const getScoreColor = (scoreString) => {
    if (!scoreString || typeof scoreString !== 'string' || !scoreString.includes('/')) {
      return 'text-gray-600 dark:text-gray-400'; // Default color if score is invalid
    }
    const [score, total] = scoreString.split('/').map(Number);
    if (isNaN(score) || isNaN(total) || total === 0) {
      return 'text-gray-600 dark:text-gray-400';
    }

    const percentage = (score / total) * 100;
    if (percentage >= 80) return 'text-green-600 dark:text-green-400';
    if (percentage >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl shadow-md">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 md:mb-8 text-center">
        Question-wise Feedback
      </h2>

      {feedbackData && feedbackData.length > 0 ? (
        <div className="space-y-4">
          {feedbackData.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-zinc-800 rounded-xl border border-gray-100 dark:border-zinc-700 shadow-sm overflow-hidden"
            >
              <button
                className="flex items-center justify-between w-full p-4 text-left focus:outline-none focus:ring-2 focus:ring-gray-50 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 md:p-5"
                onClick={() => toggleExpand(index)}
              >
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center">
                  <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200 flex-1 mr-4">
                    <span className="text-blue-600 dark:text-blue-400 text-base font-bold mr-2">Q{index + 1}:</span>
                    {item.question}
                  </h3>
                  <div className="flex items-center mt-2 sm:mt-0 sm:ml-auto">
                    <Star size={18} className={`${getScoreColor(item.score)} mr-1 flex-shrink-0`} />
                    <span className={`text-md font-bold ${getScoreColor(item.score)} flex-shrink-0`}>
                      {item.score}/100
                    </span>
                  </div>
                </div>
                <span className="ml-4 flex-shrink-0 text-gray-600 dark:text-gray-400">
                  {expandedQuestion === index ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                </span>
              </button>

              {expandedQuestion === index && (
                <div className="px-4 pb-4 pt-2 md:px-5 md:pb-5 md:pt-3 border-t border-gray-200 dark:border-zinc-700">
                  <div className="flex items-start text-gray-700 dark:text-gray-300">
                    <MessageSquare size={18} className="mr-2 mt-1 flex-shrink-0 text-gray-500 dark:text-gray-400" />
                    <p className="text-sm md:text-base leading-relaxed">
                      {item.feedback}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-10 text-gray-500 dark:text-gray-400">
          <MessageSquare size={48} className="mb-4 text-indigo-400 dark:text-indigo-600" />
          <p className="text-lg font-medium">No question feedback available yet.</p>
          <p className="text-sm mt-2">Feedback will appear here after your interview questions are evaluated.</p>
        </div>
      )}
    </div>
  );
}