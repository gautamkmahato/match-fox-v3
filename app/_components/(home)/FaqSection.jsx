"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is Hirenom's AI Mock Interview platform?",
    answer:
      "Hirenom is an AI-powered platform that helps you prepare for job interviews through realistic mock sessions, personalized feedback, and smart analytics. It simulates real-world interviews using voice or video and evaluates your performance instantly.",
  },
  {
    question: "How do AI mock interviews work?",
    answer:
      "Once you start a mock interview, our AI asks you technical and behavioral questions. Your responses are analyzed in real-time, providing feedback on your confidence, clarity, body language (video), and accuracy.",
  },
  {
    question: "How is the pricing structured?",
    answer:
      "We offer Monthly and Yearly plans — Free, Basic, Pro, and Enterprise. Each plan includes a specific number of AI credits, which are used per minute of interview time. You can upgrade or switch between plans anytime.",
  },
  {
    question: "What are AI credits and how are they used?",
    answer:
      "AI credits are like tokens that represent the number of minutes you can use for mock interviews, resume reviews, or video analysis. For example, a 15-minute interview may consume 15 credits.",
  },
  {
    question: "Can I use my plan across multiple devices?",
    answer:
      "Yes! You can access the platform via desktop or mobile using your account. All your progress, analytics, and interview history are synced across devices.",
  },
  {
    question: "What is included in the AI resume screening?",
    answer:
      "Our AI analyzes your uploaded resume for formatting, clarity, keyword optimization, and alignment with target job roles. You'll receive suggestions to improve your chances of getting shortlisted.",
  },
  {
    question: "Do you support coding or technical interviews?",
    answer:
      "Yes. The Pro and Enterprise plans include coding-based interview scenarios with real-time problem-solving and test cases, especially useful for software engineers and developers.",
  },
  {
    question: "Is my data secure and private?",
    answer:
      "Absolutely. We follow industry-standard encryption and security practices. Your interview recordings, responses, and resume data are confidential and never shared without your consent.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600">
            Everything you need to know about our AI Mock Interview Platform
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-md text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-900">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-gray-600 text-sm">{faq.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
