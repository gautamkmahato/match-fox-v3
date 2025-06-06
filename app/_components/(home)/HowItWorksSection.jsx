import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Mic, BarChart3, Trophy } from 'lucide-react';

const steps = [
  {
    icon: Upload,
    title: "Upload Job Description",
    description: "Paste or upload any job posting from popular job sites",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Mic,
    title: "Start Voice Interview",
    description: "Begin your AI-powered mock interview with real-time voice interaction",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: BarChart3,
    title: "Get Detailed Feedback",
    description: "Receive comprehensive analysis and improvement suggestions",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Trophy,
    title: "Ace the Real Interview",
    description: "Apply your learnings and land your dream job with confidence",
    color: "from-orange-500 to-red-500"
  }
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="lg:text-3xl text-xl md:text-3xl font-bold text-slate-800 mb-4">
            How It Works
          </h2>
          <p className="text-md text-slate-600 max-w-2xl mx-auto">
              Get started in minutes and transform your interview skills with our simple 4-step process.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center mb-6 shadow-lg`}>
                  <step.icon className="h-10 w-10 text-white" />
                </div>
                
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-slate-300 to-transparent"></div>
                )}
                
                <div className="absolute -top-2 -left-2 w-6 h-6 bg-white rounded-full border-2 border-slate-200 flex items-center justify-center text-sm font-semibold text-slate-600">
                  {index + 1}
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                {step.title}
              </h3>
              
              <p className="text-slate-600">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
