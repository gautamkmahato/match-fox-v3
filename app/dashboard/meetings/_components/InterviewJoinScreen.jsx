'use client';

import { CalendarClock, Video, Settings, Computer, Info, SquareDot } from 'lucide-react';
import Image from 'next/image';
import logo from '../.../../../../../public/match-fox-4.png'

export default function InterviewJoinScreen({ onJoinInterview, interviewData }) {

  const handleJoin = () => {
    /**
     * Add form validation or API call 
     * or check camera, microphone if needed
     */
    onJoinInterview(); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 space-y-6">
        {/* Title and Logo */}
        <div className="text-center space-y-1">
          <h1 className="flex gap-2 items-center justify-center text-[#462eb4] font-bold text-2xl">
            <Image src={logo} className='w-8 h-8' alt='logo' />
            MatchFox
          </h1>
          <p className="text-gray-500 text-sm">AI-Powered Interview Platform</p>
        </div>

        {/* Illustration */}
        {/* <div className="flex justify-center">
          <img
            src="/interview-illustration.svg"
            alt="Interview Illustration"
            className="w-52 h-auto"
          />
        </div> */}

        {/* Interview Title */}
        <div className="text-center space-y-1">
          <h2 className="text-lg font-semibold text-gray-800">{interviewData?.interview_name || "MatchFox Interview"}</h2>
          <div className="flex justify-center items-center text-sm text-gray-500 gap-4">
            <span className="flex items-center gap-1">
              <Computer className="w-4 h-4" />
              {interviewData?.company}
            </span>
            <span className="flex items-center gap-1">
              <CalendarClock className="w-4 h-4" />
              {interviewData?.duration} Minutes
            </span>
          </div>
        </div>

        {/* Tips Box */}
        <div className="bg-teal-50 border border-blue-100 p-4 rounded-lg text-sm text-[#462eb4] space-y-1">
          <p className="flex gap-1 items-center font-medium mb-2">
            <Info className='w-3 h-3' />
            <span className='font-semibold'>Before you begin</span>
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li className='flex gap-1 items-center'>
                <SquareDot className='w-3 h-3' />
                Ensure you have a stable internet connection
            </li>
            <li className='flex gap-1 items-center'>
                <SquareDot className='w-3 h-3' />
                Test your camera and microphone
            </li>
            <li className='flex gap-1 items-center'>
                <SquareDot className='w-3 h-3' />
                Find a quiet place for the interview
            </li>
          </ul>
        </div>

        {/* Join Button */}
        <button onClick={handleJoin} className="w-full flex items-center justify-center gap-2 bg-[#462eb4] hover:bg-indigo-900 shadow-lg text-white font-semibold py-2 rounded-md cursor-pointer">
          <Video className="w-4 h-4" />
          Join Interview
        </button>

        {/* Test Audio/Video */}
        <button className="w-full flex items-center font-semibold justify-center gap-2 text-gray-600 hover:text-gray-800 text-sm cursor-pointer">
          <Settings className="w-4 h-4" />
          Test Audio & Video
        </button>
      </div>
    </div>
  );
}
