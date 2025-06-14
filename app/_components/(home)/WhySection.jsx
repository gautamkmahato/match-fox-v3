"use client";

import { motion } from "framer-motion";
import {
  Clock,
  BarChart2,
  Users,
  Filter,
  Mic,
  FileText,
  Chrome,
  Search,
  Brain,
} from "lucide-react";

export default function WhySection() {
  const features = [
    {
      title: "Real-time Voice Chat",
      description:
        "Practice with AI in natural voice conversations, just like a real interview.",
      icon: <Mic className="h-4 w-4 text-white" />,
    },
    {
      title: "Recruiter Platform",
      description:
        "Companies can post jobs and conduct first-round interviews with our AI system.",
      icon: <Users className="h-4 w-4 text-white" />,
    },
    {
      title: "AI Resume Builder",
      description:
        "Create professional resumes tailored to specific job requirements using AI.",
      icon: <FileText className="h-4 w-4 text-white" />,
    },
    {
      title: "Chrome Extension",
      description:
        "Start mock interviews directly from LinkedIn job postings with one click.",
      icon: <Chrome className="h-4 w-4 text-white" />,
    },
    {
      title: "Job Explorer",
      description:
        "Discover thousands of job opportunities across different industries and roles.",
      icon: <Search className="h-4 w-4 text-white" />,
    },
    {
      title: "AI-Powered Feedback",
      description:
        "Get detailed analysis of your performance with actionable improvement suggestions.",
      icon: <Brain className="h-4 w-4 text-white" />,
    },
  ];

  const candidateMetrics = [
    { label: "Resume Analysis", value: 92 },
    { label: "Skill Matching", value: 85 },
    { label: "Cultural Fit", value: 78 },
    { label: "Technical Proficiency", value: 65 },
  ];

  const hrManagerialMetrics = [
    { label: "Leadership Skills", value: 88 },
    { label: "Conflict Resolution", value: 82 },
    { label: "Strategic Thinking", value: 90 },
    { label: "Communication", value: 85 },
    { label: "Employee Engagement", value: 80 },
    { label: "Decision Making", value: 87 },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white">
      <div className=" max-w-7xl mx-auto text-white pt-24 pb-12 px-4">
      <motion.div
        className="container mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Side */}
          <div className="lg:w-2/3">
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="inline-block px-4 py-1 bg-[#462eb4] rounded-full text-white text-xs font-medium mb-6"
            >
              BORN IN AI. NOT BOLTED ON.
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="lg:text-3xl md:text-3xl text-xl font-bold mb-2 text-gray-800"
            >
              Why Candidates And Recruiting
              <br />
              Teams Love Humanly
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="text-gray-500 mb-8 max-w-xl text-md"
            >
              Humanly boosts candidate engagement, streamlines recruiter workflows, and automates tasks.
            </motion.p>

            <motion.div
              className="grid md:grid-cols-3 gap-6"
              variants={staggerContainer}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  transition={{ duration: 0.6 }}
                  className="bg-white border border-gray-50 shadow-sm backdrop-blur-lg hover:shadow-xl rounded-lg p-6 text-gray-700"
                >
                  <div className="bg-indigo-700 h-8 w-8 rounded-md flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-md font-semibold mb-2 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600 text-xs">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Side */}
          <div className="lg:w-1/3 flex flex-col gap-6">
            {/* Candidate Scores */}
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="bg-white backdrop-blur-lg shadow-lg rounded-lg p-6 border border-gray-50"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Candidate Interview Scores</h3>
                <div className="bg-indigo-700 h-8 w-8 rounded-lg flex items-center justify-center">
                  <Filter className="h-4 w-4 text-white" />
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-3">
                Scores that reflect candidate strengths in key areas during interviews.
              </p>
              <div className="space-y-4">
                {candidateMetrics.map(({ label, value }, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-xs mb-1 text-gray-500">
                      <span>{label}</span>
                      <span>{value}%</span>
                    </div>
                    <div className="w-full bg-gray-300 rounded-full h-2">
                      <div
                        className="bg-[#3a238e] h-2 rounded-full"
                        style={{ width: `${value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* HR Managerial Scores */}
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="bg-white backdrop-blur-lg shadow-lg rounded-lg p-6 border border-gray-50"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">HR Managerial Interview Scores</h3>
                <div className="bg-indigo-700 h-8 w-8 rounded-lg flex items-center justify-center">
                  <Users className="h-4 w-4 text-white" />
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Key competencies evaluated during HR managerial interviews to ensure strong leadership and people management.
              </p>
              <div className="space-y-4">
                {hrManagerialMetrics.map(({ label, value }, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-xs mb-1 text-gray-500">
                      <span>{label}</span>
                      <span>{value}%</span>
                    </div>
                    <div className="w-full bg-gray-300 rounded-full h-2">
                      <div
                        className="bg-[#3a238e] h-2 rounded-full"
                        style={{ width: `${value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
    </section>
  );
}
