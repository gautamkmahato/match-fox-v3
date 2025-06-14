import { Video, BarChart2, FileSearch, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function AdvanceFeatures() {
  const features = [
    {
      title: "Virtual Interviews",
      description:
        "Detail the virtual interview environment provided by Intervio, including video and voice interview capabilities.",
      icon: <Video className="h-6 w-6 text-white" />,
      color: "bg-indigo-600",
      image: "/call.png",
    },
    {
      title: "AI Video Analytics",
      description:
        "Explain how Intervio AI analyzes interview data and generates performance reports to assist in decision-making.",
      icon: <BarChart2 className="h-6 w-6 text-white" />,
      color: "bg-indigo-800",
      image: "/resume.png",
    },
    {
      title: "Workman Screening",
      description:
        "Describe how Intervio AI utilizes AI to analyze and screen resumes, extracting relevant information and ranking candidates.",
      icon: <FileSearch className="h-6 w-6 text-white" />,
      color: "bg-indigo-800",
      image: "/job.png",
    },
    {
      title: "Workman Screening",
      description:
        "Describe how Intervio AI utilizes AI to analyze and screen resumes, extracting relevant information and ranking candidates.",
      icon: <FileSearch className="h-6 w-6 text-white" />,
      color: "bg-indigo-800",
      image: "/dashboard.jpg",
    },
  ]

  return (
    <>
    {/* Advanced Features */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-gray-900">See Our Advance Features</h2>
                <p className="text-md text-gray-600">AI Mock Interviews, Smart Resumes & Optimized Profiles</p>
              </div>

              <div className="space-y-6">
                {[
                  "Practice real-time voice and video interviews with AI",
  "Receive detailed performance analytics after each session",
                    "Optimize resumes for ATS with smart keyword suggestions",
  "Enhance your Linedin profile with AI-generated headlines and summaries",
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-5 h-5 bg-gradient-to-r from-indigo-700 to-purple-500 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-600 text-sm">{feature}</span>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-indigo-800 to-indigo-500 text-white px-9 py-3 rounded-full font-semibold hover:shadow-xl transition-shadow"
              >
                Try Now
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {features && features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-purple-200 to-pink-200 overflow-hidden shadow-2xl shadow-indigo-600"
                >
                  <div className="relative w-full h-full bg-gradient-to-br from-purple-300 to-pink-300 shadow-2xl shadow-indigo-600">
                    <Image
                      src={feature?.image}
                      alt="image"
                      fill
                      className="object-cover"
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>


          </div>
        </div>
      </section>
    </>
  )
}
