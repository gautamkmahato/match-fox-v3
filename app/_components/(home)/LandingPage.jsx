"use client"

import { motion } from "framer-motion"
import {
  Mic,
  Users,
  FileText,
  Chrome,
  Search,
  Zap,
  Target,
  Star,
  CheckCircle,
  ArrowRight,
  Play,
  Download,
  Briefcase,
  MessageSquare,
  Brain,
  Shield,
} from "lucide-react"
import Header from "./Header"
import Link from "next/link"
import FeatureCards from "./FeatureCards"
import WhySection from "./WhySection"
import PricingPlans from "./PricingPlans"
import SiteFooter from "./SiteFooter"
import HowItWorksSection from "./HowItWorksSection"

const features = [
  {
    icon: Mic,
    title: "Real-time Voice Chat",
    description: "Practice with AI in natural voice conversations, just like a real interview.",
    color: "blue",
  },
  {
    icon: Users,
    title: "Recruiter Platform",
    description: "Companies can post jobs and conduct first-round interviews with our AI system.",
    color: "green",
  },
  {
    icon: FileText,
    title: "AI Resume Builder",
    description: "Create professional resumes tailored to specific job requirements using AI.",
    color: "purple",
  },
  {
    icon: Chrome,
    title: "Chrome Extension",
    description: "Start mock interviews directly from LinkedIn job postings with one click.",
    color: "orange",
  },
  {
    icon: Search,
    title: "Job Explorer",
    description: "Discover thousands of job opportunities across different industries and roles.",
    color: "pink",
  },
  {
    icon: Brain,
    title: "AI-Powered Feedback",
    description: "Get detailed analysis of your performance with actionable improvement suggestions.",
    color: "indigo",
  },
]

const works = [
  {
    step: "01",
    title: "Choose Your Path",
    description:
      "Select from practice interviews, job applications, or resume building based on your needs.",
    icon: Target,
  },
  {
    step: "02",
    title: "AI Interview Session",
    description:
      "Engage in real-time voice conversations with our advanced AI interviewer tailored to your role.",
    icon: MessageSquare,
  },
  {
    step: "03",
    title: "Get Feedback & Improve",
    description: "Receive detailed performance analysis and personalized recommendations for improvement.",
    icon: Zap,
  },
]

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Software Engineer at Google",
    content:
      "The AI interviews felt so realistic! I practiced for weeks and landed my dream job at Google. The feedback was incredibly detailed and helpful.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Product Manager at Microsoft",
    content:
      "As a recruiter, this platform has revolutionized our hiring process. We can screen candidates efficiently while maintaining quality standards.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Data Scientist at Netflix",
    content:
      "The Chrome extension is a game-changer! I could practice for specific jobs directly from LinkedIn. Got hired within 2 weeks of using it.",
    rating: 5,
  },
]

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

{/* Hero Section */ }


export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">


      {/* Hero Section */}
      <div className="relative overflow-hidden mb-24 before:absolute before:top-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/examples/polygon-bg-element.svg')] dark:before:bg-[url('https://preline.co/assets/svg/examples-dark/polygon-bg-element.svg')] before:bg-no-repeat before:bg-top before:bg-cover before:size-full before:-z-[1] before:transform before:-translate-x-1/2">
        {/* Semantic Header (ensure Header includes <nav> or <header> internally) */}
        <Header />

        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10">

          {/* Background gradient blur effect */}
      <div className=" inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-72 h-72 bg-indigo-500 rounded-full mix-blend-screen filter blur-3xl opacity-25 animate-pulse"></div>
      </div>
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

          

          <div className="flex justify-center">
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white sm:mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <a className="inline-flex items-center gap-x-2 bg-white border border-gray-200 text-sm text-gray-800 p-1 ps-3 rounded-full transition hover:border-gray-300 dark:bg-neutral-800 dark:border-neutral-700 dark:hover:border-neutral-600 dark:text-neutral-200"
                href="tubeguruji.com" target="_blank">
                HIRENOM: Best Interview Copilot
                <span className="py-1.5 px-2.5 inline-flex justify-center items-center gap-x-2 rounded-full bg-gray-200 font-semibold text-sm text-gray-600 dark:bg-neutral-700 dark:text-neutral-400">
                  <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                </span>
              </a>
            </motion.h1>
          </div>

          <div className="max-w-2xl text-center mx-auto">
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="block font-bold text-gray-800 text-3xl md:text-5xl lg:text-6xl dark:text-neutral-200">
                Supercharge your Interview preparation
                <span className="bg-clip-text bg-gradient-to-tl mt-4 from-indigo-600 to-violet-600 text-transparent"> With AI</span>
              </span>
            </motion.h1>
          </div>




          <div className="mt-5 max-w-3xl text-center mx-auto">
            <motion.p
              className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 mb-8 sm:mb-10 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-lg text-gray-600 dark:text-neutral-400">
                Practice with AI-powered mock interviews, build perfect resumes, and land your dream job with real-time voice-to-voice conversations.
              </span>
            </motion.p>
          </div>


          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              href="/dashboard/interview"
              className="flex gap-2 items-center px-4 py-2.5 sm:px-5 sm:py-3 text-sm font-semibold text-white bg-indigo-700 hover:bg-indigo-800 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-md shadow-lg hover:shadow-xl w-full sm:w-auto transition-all"
              aria-label="Start a free AI-powered interview"
            >
              Start Free Interview
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/sign-up"
              className="px-6 py-2.5 sm:px-8 sm:py-3 text-sm font-semibold text-gray-800 dark:text-gray-200 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg shadow-md hover:shadow w-full sm:w-auto transition-all"
              aria-label="Watch a demo of how the platform works"
            >
              Watch Demo
            </Link>
          </motion.div>



        </div>
      </div>

      <WhySection />
      <HowItWorksSection />

      {/* Features Overview */}
      {/* <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="lg:text-3xl md:text-3xl text-xl font-bold text-gray-800 mb-2 mt-[-40px]">Everything You Need to Succeed</h2>
            <p className="text-md text-gray-500 max-w-3xl mx-auto">
              Our comprehensive platform provides all the tools you need to prepare for interviews and land your dream
              job.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white p-8 rounded-2xl border border-gray-50 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className={`w-12 h-12 bg-${feature.color}-100 rounded-xl flex items-center justify-center mb-6`}>
                  <feature.icon className={`w-6 h-6 text-${feature.color}-600`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section> */}

      <FeatureCards />

      {/* How It Works */}
      <section id="how-it-works" className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="lg:text-3xl md:text-3xl text-xl font-bold text-gray-800 mb-2">How It Works</h2>
            <p className="text-md text-gray-500 max-w-3xl mx-auto">
              Get started in minutes and transform your interview skills with our simple 3-step process.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {works.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-indigo-600">{item.step}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 text-md">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* For Candidates */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="lg:text-4xl md:text-4xl text-xl font-bold text-gray-800 mb-2">Perfect for Job Seekers</h2>
              <p className="text-md text-gray-600 mb-4">
                Whether you're a fresh graduate or experienced professional, our platform helps you prepare for any
                interview scenario.
              </p>

              <div className="space-y-4">
                {[
                  "Practice unlimited mock interviews",
                  "Get instant AI feedback and scoring",
                  "Access industry-specific questions",
                  "Build ATS-optimized resumes",
                  "Track your improvement over time",
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-500 text-sm">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="/call.png"
                alt="Candidate using interview platform"
                className="rounded-2xl shadow-lg"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Star className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Interview Score</p>
                    <p className="text-xs text-gray-500">92/100 - Excellent!</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* For Recruiters */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative order-2 lg:order-1"
            >
              <img
                src="/dashboard.jpg"
                alt="Recruiter dashboard"
                className="rounded-2xl shadow-lg"
              />
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Candidates Screened</p>
                    <p className="text-xs text-gray-500">1,247 this month</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <h2 className="lg:text-3xl md:text-3xl text-xl font-bold text-gray-800 mb-2">Streamline Your Hiring</h2>
              <p className="text-md text-gray-600 mb-8">
                Save time and resources by letting AI conduct initial screening interviews while maintaining quality
                standards.
              </p>

              <div className="space-y-4">
                {[
                  "Automated first-round interviews",
                  "Consistent evaluation criteria",
                  "Detailed candidate reports",
                  "Integration with existing ATS",
                  "Reduce time-to-hire by 60%",
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI Resume Builder */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-3xl text-xl font-bold text-gray-800 mb-2">AI-Powered Resume Builder</h2>
            <p className="text-md text-gray-600 max-w-3xl mx-auto">
              Create professional, ATS-optimized resumes that get noticed by recruiters and pass through automated
              screening systems.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <img
                src="/resume.png"
                alt="AI Resume Builder Interface"
                className="rounded-2xl shadow-lg w-full"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-50 shadow-sm">
                <FileText className="w-6 h-6 text-blue-600 mb-2" />
                <h3 className="text-lg font-semibold text-gray-900">Smart Content Generation</h3>
                <p className="text-gray-600 text-sm">
                  AI analyzes job descriptions and suggests relevant skills and experiences.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl border border-gray-50 shadow-sm">
                <Shield className="w-6 h-6 text-green-600 mb-2" />
                <h3 className="text-lg font-semibold text-gray-900">ATS Optimization</h3>
                <p className="text-gray-600 text-sm">Ensures your resume passes through Applicant Tracking Systems.</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl border border-gray-50 shadow-sm">
                <Zap className="w-6 h-6 text-purple-600 mb-2" />
                <h3 className="text-lg font-semibold text-gray-900">Instant Updates</h3>
                <p className="text-gray-600 text-sm">Quickly customize your resume for different job applications.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Chrome Extension */}
      <section className="py-20 bg-gradient-to-r from-indigo-900 to-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="lg:text-3xl md:text-3xl text-xl font-bold text-white mb-2">Practice Directly from LinkedIn</h2>
              <p className="text-md text-gray-200 mb-4">
                Our Chrome extension lets you start mock interviews instantly from any LinkedIn job posting. No need to
                switch between platforms.
              </p>

              <div className="space-y-4 mb-8 text-sm">
                {[
                  "One-click interview launch from LinkedIn",
                  "Job-specific interview questions",
                  "Seamless integration with your workflow",
                  "Available on Chrome Web Store",
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="w-4 h-4 text-blue-300" />
                    <span className="text-gray-300">{feature}</span>
                  </motion.div>
                ))}
              </div>
              <Link
                href="https://chromewebstore.google.com/detail/hirenom/fpcmfhopkmoaimhelpjolkkhocfohgkk"
                target="_blank"
                className="bg-white text-indigo-800 inline-flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-semibold hover:bg-gray-100 transition-colors"
              >
                <Download className="w-5 h-5" />
                <span>Add to Chrome</span>
              </Link>

            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="/chrome.PNG"
                alt="Chrome extension in action"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-3xl text-xl font-bold text-gray-800 mb-2">Success Stories</h2>
            <p className="text-md text-gray-500 max-w-2xl mx-auto">
              Join thousands of professionals who have transformed their careers with our AI interview platform.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={fadeInUp} className="bg-white p-6 rounded-2xl border border-gray-50 shadow">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-600 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm mb-4">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <img
                    src={`/placeholder.svg?height=40&width=40`}
                    alt={testimonial.name}
                    className="w-6 h-6 rounded-full mr-3"
                  />
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{testimonial.name}</p>
                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <PricingPlans />

      {/* CTA Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="lg:text-3xl md:text-3xl text-xl font-bold text-gray-800 mb-2">Ready to Ace Your Next Interview?</h2>
            <p className="text-md text-gray-500 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who have successfully landed their dream jobs using our AI-powered
              interview platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-indigo-700 text-white px-8 py-4 rounded-lg text-sm font-semibold hover:bg-indigo-800 transition-colors flex items-center space-x-2 cursor-pointer">
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors cursor-pointer">
                Schedule Demo
              </button>
            </div>

            <p className="text-sm text-gray-500 mt-4">No credit card required • 30-day free trial • Cancel anytime</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">Hirenom</h3>
              <p className="text-gray-400 mb-6 max-w-md text-sm">
                Empowering professionals to succeed in their career journey through AI-powered interview preparation and
                job matching.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">f</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">t</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">in</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="/dashboard/interview" className="hover:text-white transition-colors">
                    Mock Interviews
                  </a>
                </li>
                <li>
                  <a href="/dashboard" className="hover:text-white transition-colors">
                    Resume Builder
                  </a>
                </li>
                <li>
                  <a href="/dashboard" className="hover:text-white transition-colors">
                    Job Explorer
                  </a>
                </li>
                <li>
                  <a href="https://chromewebstore.google.com/detail/hirenom/fpcmfhopkmoaimhelpjolkkhocfohgkk" className="hover:text-white transition-colors">
                    Chrome Extension
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 InterviewAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
