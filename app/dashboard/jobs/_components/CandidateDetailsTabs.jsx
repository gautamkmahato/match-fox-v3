'use client'

import { useState } from 'react'

export default function CandidateDetailsTabs({ user, interviewAttempts, report }) {
    const [activeTab, setActiveTab] = useState('Summary');

    const formatLabel = (label) => {
        // Convert camelCase or snake_case to Sentence Case
        return label
            .replace(/_/g, " ")
            .replace(/([a-z])([A-Z])/g, "$1 $2")
            .replace(/\b\w/g, (char) => char.toUpperCase());
    };

    console.log(interviewAttempts)

    return (
        <div className="mt-4 border-t border-gray-200">
            <div className="flex gap-4 border-b border-gray-200 mb-4">
                <button
                    className={`py-2 px-4 text-sm ${activeTab === 'Summary' ? 'border-b-2 border-indigo-600 font-semibold' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('Summary')}
                >
                    Summary
                </button>
                <button
                    className={`py-2 px-4 text-sm ${activeTab === 'Chat' ? 'border-b-2 border-indigo-600 font-semibold' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('Chat')}
                >
                    Chat Conversation
                </button>
                <button
                    className={`py-2 px-4 text-sm ${activeTab === 'Report' ? 'border-b-2 border-indigo-600 font-semibold' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('Report')}
                >
                    Full Report
                </button>
            </div>

            <div className="text-sm">
                {activeTab === 'Summary' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                        {/* User Profile Card (Spans 1 or 2 columns based on screen size) */}
                        <div className="col-span-1 md:col-span-2 p-6 bg-white rounded-xl shadow-md flex items-center gap-4">
                            {user?.img_url ? (
                            <img src={user?.img_url} alt={user?.name} className="w-16 h-16 rounded-full object-cover shadow-md" />
                            ) : (
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-xl font-bold text-white">
                                {user?.name?.[0]?.toUpperCase()}
                            </div>
                            )}
                            <div>
                            <p className="font-extrabold text-gray-900 text-2xl">{user?.name}</p>
                            <p className="text-sm text-gray-600">{user?.email}</p>
                            <p className="text-xs text-gray-500">@{user?.username}</p>
                            </div>
                        </div>

                        {/* Recommendation Card */}
                        <div className="p-6 bg-white rounded-xl shadow-md flex flex-col justify-between">
                            <p className="text-lg font-semibold text-gray-800 mb-2 text-center">Recommendation</p>
                            <p className={`text-3xl font-bold text-center ${report?.recommendation ? 'text-green-600' : 'text-red-600'}`}>
                            {report?.recommendation ? 'Yes' : 'No'}
                            </p>
                        </div>

                        {/* Score Card */}
                        <div className="p-6 bg-white rounded-xl shadow-md flex flex-col justify-between text-center">
                            <p className="text-lg font-semibold text-gray-800 mb-2">Score</p>
                            <p className="text-4xl font-extrabold text-indigo-600">{report?.score}/10</p>
                        </div>

                        {/* Completed At Card (Can span 1 or 2 columns based on screen size) */}
                        <div className="col-span-1 md:col-span-2 p-6 bg-white rounded-xl shadow-md flex flex-col justify-between">
                            <p className="text-lg font-semibold text-gray-800 mb-2">Completed At</p>
                            <p className="text-2xl font-bold text-gray-700">
                            {new Date(interviewAttempts?.completed_at).toLocaleString()}
                            </p>
                        </div>

                    </div>
                )}

                {activeTab === 'Chat' && (
                    <div>
                        {/* Replace this with actual chat data if available */}
                        {interviewAttempts?.chat_conversation ? 
                        <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg border border-gray-100 shadow space-y-4">
                            {JSON.parse(interviewAttempts?.chat_conversation)?.current
                                .filter((msg) => msg.role !== "system") // optionally hide system messages
                                .map((msg, index) => {
                                const isUser = msg.role === "user";
                                const isAssistant = msg.role === "assistant";

                                return (
                                    <div
                                    key={index}
                                    className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                                    >
                                    <div
                                        className={`max-w-xs p-3 rounded-lg text-sm whitespace-pre-wrap ${
                                        isUser
                                            ? "bg-blue-100 text-blue-900 self-end"
                                            : "bg-gray-100 text-gray-800"
                                        }`}
                                    >
                                        <div className="font-medium mb-1">
                                        {isUser ? "Gautam" : "Jina"}
                                        </div>
                                        {msg.content}
                                    </div>
                                    </div>
                                );
                                })}
                            </div> :
                            <p className="text-gray-500 italic">Chat conversations coming soon...</p>
                        }
                    </div>
                )}

                {activeTab === 'Report' && (
                    <div className='px-4 pb-4'>
                        {/* You can display detailed feedback here */}
                        {/** Overall Summary */}
                        <div className='mb-8'>
                            <h3 className='text-gray-900 text-lg font-semibold mb-1'>Overall Summary</h3>
                            <p>{report?.report?.overall_summary}</p>
                        </div>
                        {/* Skills Assessment */}
                        <div className="mb-8">
                            <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-white">
                                Skill Assessment
                            </h3>
                            <div className="space-y-4">
                                {Object.entries(report?.report?.Skill_Evaluation).map(([key, value]) => (
                                    <div
                                        key={key}
                                        className="flex justify-between items-start bg-gray-50 border border-gray-200 p-4 rounded-lg shadow-sm"
                                    >
                                        <div className="w-3/4">
                                            <h4 className="font-semibold text-gray-700">{formatLabel(key)}</h4>
                                            <p className="text-gray-600 mt-1 text-xs">{value.notes || "No notes provided."}</p>
                                        </div>
                                        <div className="w-1/4 text-right">
                                            <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                                                Rating: {value.rating || "N/A"}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/** Reason */}
                        <div className=''>
                            <h3 className="text-gray-900 text-lg font-semibold mb-1">Reasons</h3>
                            <ul>
                                {report?.report?.reasons.map((reason, index) => (
                                    <li key={index}>
                                        {index + 1}. {reason}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
