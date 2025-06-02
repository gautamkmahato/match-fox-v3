"use client"

import { Briefcase, CheckCircle, Circle, Mic, Star } from "lucide-react"
import Header from "./Header"
import { Play } from "next/font/google"
import { motion } from "framer-motion"


const backgroundStyle = `
  .bg-pattern {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px);
    background-size: 20px 20px;
    pointer-events: none;
    z-index: 1;
  }

  .content {
    position: relative;
    z-index: 2;
  }
` 

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const FloatingCard = ({ children, className, delay = 0 }) => (
  <motion.div
    className={className}
    animate={{
      y: [0, -10, 0],
      rotate: [0, 1, 0, -1, 0],
    }}
    transition={{
      duration: 6,
      repeat: Number.POSITIVE_INFINITY,
      delay: delay,
      ease: "easeInOut",
    }}
  >
    {children}
  </motion.div>
)

export default function Hero() {
  return (
    <main
      className="min-h-screen flex items-center justify-center"
      style={{
        background: "radial-gradient(circle at center, #1E40AF, #000000)",
      }}
    >
      <style jsx global>
        {backgroundStyle}
      </style>
      <div className="bg-pattern">
        <Header />
      </div>
      <div className="content w-full">
        {/* Floating Cards */}
        <FloatingCard
          className="absolute left-10 top-1/4 bg-white p-4 rounded-xl shadow-lg border border-gray-100"
          delay={0}
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Interview Passed</p>
              <p className="text-xs text-gray-500">95% Success Rate</p>
            </div>
          </div>
        </FloatingCard>

        <FloatingCard
          className="absolute right-10 top-1/3 bg-white p-4 rounded-xl shadow-lg border border-gray-100"
          delay={2}
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Mic className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Live Interview</p>
              <p className="text-xs text-gray-500">Real-time AI Chat</p>
            </div>
          </div>
        </FloatingCard>

        <FloatingCard
          className="absolute left-20 bottom-1/4 bg-white p-4 rounded-xl shadow-lg border border-gray-100"
          delay={4}
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Top Rated</p>
              <p className="text-xs text-gray-500">4.9/5 Rating</p>
            </div>
          </div>
        </FloatingCard>

        <FloatingCard
          className="absolute right-20 bottom-1/3 bg-white p-4 rounded-xl shadow-lg border border-gray-100"
          delay={1}
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Job Matched</p>
              <p className="text-xs text-gray-500">1000+ Companies</p>
            </div>
          </div>
        </FloatingCard>

        {/* Main Hero Content */}
        <div className="text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Ace Your Next
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {" "}
              Interview
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Practice with AI-powered mock interviews, build perfect resumes, and land your dream job with real-time
            voice-to-voice conversations.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <button className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Circle className="w-5 h-5" />
              <span>Start Free Interview</span>
            </button>
            <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-colors">
              Watch Demo
            </button>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
