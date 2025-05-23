import { Clock, BarChart2, Users, Filter } from "lucide-react";

export default function WhySection() {
  const features = [
    {
      title: "Data-Driven Decisions",
      description:
        "Humanly.io uses AI to help make smarter, data-backed hiring choices.",
      icon: <BarChart2 className="h-5 w-5 text-white" />,
    },
    {
      title: "Faster Time-To-Hire",
      description:
        "Speed up recruitment with AI-powered automation and screening.",
      icon: <Clock className="h-5 w-5 text-white" />,
    },
    {
      title: "AI-Powered Candidate Sourcing",
      description:
        "Find and connect with top talent efficiently using AI-driven tools.",
      icon: <Users className="h-5 w-5 text-white" />,
    },
    {
      title: "Automated Screening",
      description:
        "Streamline candidate evaluation to focus on the best fits faster.",
      icon: <Filter className="h-5 w-5 text-white" />,
    },
    {
      title: "Enhanced Engagement",
      description:
        "Boost candidate experience with personalized, timely communication.",
      icon: <Users className="h-5 w-5 text-white" />,
    },
    {
      title: "Collaborative Hiring",
      description:
        "Improve team decision-making with transparent, shared insights.",
      icon: <BarChart2 className="h-5 w-5 text-white" />,
    },
  ];

  // Candidate scoring data
  const candidateMetrics = [
    { label: "Resume Analysis", value: 92 },
    { label: "Skill Matching", value: 85 },
    { label: "Cultural Fit", value: 78 },
    { label: "Technical Proficiency", value: 65 },
  ];

  // HR Managerial interview scoring data
  const hrManagerialMetrics = [
    { label: "Leadership Skills", value: 88 },
    { label: "Conflict Resolution", value: 82 },
    { label: "Strategic Thinking", value: 90 },
    { label: "Communication", value: 85 },
    { label: "Employee Engagement", value: 80 },
    { label: "Decision Making", value: 87 },
  ];

  return (
    <div className="bg-gray-50 bg-gradient-to-br max-w-7xl mx-auto text-white py-16 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-2/3">
            <div className="inline-block px-4 py-1 bg-[#462eb4]/60 rounded-full text-[#e0e7ff] text-xs font-medium mb-6 border border-[#a5b4fc]">
              BORN IN AI. NOT BOLTED ON.
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#462eb4]">
              Why Candidates And Recruiting
              <br />
              Teams Love Humanly
            </h1>

            <p className="text-gray-600 mb-12 max-w-xl text-gray-700">
              Humanly boosts candidate engagement, streamlines recruiter workflows, and automates tasks.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white shadow-lg backdrop-blur-lg rounded-lg p-6 text-gray-700"
                >
                  <div className="bg-[#462eb4] h-10 w-10 rounded-md flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-500 text-xs">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/3 flex flex-col gap-6">
            {/* Candidate Scoring Card */}
            <div className="bg-[#462eb4]/90 backdrop-blur-lg shadow-lg rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Candidate Interview Scores</h3>
                <div className="bg-[#3a238e] h-8 w-8 rounded-lg flex items-center justify-center">
                  <Filter className="h-4 w-4 text-white" />
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-6">
                Scores that reflect candidate strengths in key areas during interviews.
              </p>

              <div className="space-y-4">
                {candidateMetrics.map(({ label, value }, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1 text-gray-200">
                      <span>{label}</span>
                      <span>{value}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-[#3a238e] h-2 rounded-full"
                        style={{ width: `${value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* HR Managerial Interview Scoring Card */}
            <div className="bg-[#462eb4]/90 backdrop-blur-lg shadow-lg rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">HR Managerial Interview Scores</h3>
                <div className="bg-[#3a238e] h-8 w-8 rounded-lg flex items-center justify-center">
                  <Users className="h-4 w-4 text-white" />
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-6">
                Key competencies evaluated during HR managerial interviews to ensure strong leadership and people management.
              </p>

              <div className="space-y-4">
                {hrManagerialMetrics.map(({ label, value }, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1 text-gray-200">
                      <span>{label}</span>
                      <span>{value}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-[#3a238e] h-2 rounded-full"
                        style={{ width: `${value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
