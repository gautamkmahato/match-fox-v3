

'use client';

import { Upload, Smile, Sparkles, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const steps = [
  {
    step: 'Step 1',
    title: 'Upload Job Description',
    description: 'Paste or upload any job posting from popular job sites',
    icon: <Upload className="w-8 h-8 text-indigo-500" />,
  },
  {
    step: 'Step 2',
    title: 'Start Voice Interview',
    description: 'Begin your AI-powered mock interview with real-time voice interaction',
    icon: <Smile className="w-8 h-8 text-indigo-500" />,
  },
  {
    step: 'Step 3',
    title: 'Get Detailed Feedback',
    description: 'Receive comprehensive analysis and improvement suggestions',
    icon: <Sparkles className="w-8 h-8 text-indigo-500" />,
  },
  {
    step: 'Step 4',
    title: 'Ace the Real Interview',
    description: 'Apply your learnings and land your dream job with confidence',
    icon: <Share2 className="w-8 h-8 text-indigo-500" />,
  },
];

export default function HowFaceswapWorks() {
  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block bg-indigo-100 text-indigo-600 text-xs px-3 py-1 rounded-full mb-4"
        >
          How it works
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
        >
          How Our <span className="text-indigo-700">AI Interview</span> Works
        </motion.h2>

        <p className="text-gray-500 max-w-2xl mx-auto text-md mb-12">
          Our AI mock interview process is simple, fast, and produces amazing results in just a few easy steps.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white border border-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="mb-4 flex items-center justify-center">
                {step.icon}
              </div>
              <h3 className="text-sm text-indigo-700 font-semibold mb-1">{step.step}</h3>
              <h4 className="text-lg font-medium text-gray-900 mb-2">{step.title}</h4>
              <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
