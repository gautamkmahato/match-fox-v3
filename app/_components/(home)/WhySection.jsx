import { Clock, BarChart2, Users, Filter } from "lucide-react"

export default function WhySection() {
  const features = [
    {
      title: "Data-Driven Decisions",
      description:
        "Data-Driven Decisions are at the heart of Humanly.io's approach to modern hiring. By leveraging AI to capture",
      icon: <BarChart2 className="h-5 w-5 text-white" />,
    },
    {
      title: "Faster Time-To-Hire",
      description:
        "Faster Time-to-Hire is one of the key benefits offered by Humanly.io's AI-powered recruitment platform.",
      icon: <Clock className="h-5 w-5 text-white" />,
    },
    {
      title: "AI-Powered Candidate",
      description:
        "AI-Powered Candidate Sourcing with Humanly.io transforms the way organizations find and connect with top talent.",
      icon: <Users className="h-5 w-5 text-white" />,
    },
    {
      title: "Data-Driven Decisions",
      description:
        "Data-Driven Decisions are at the heart of Humanly.io's approach to modern hiring. By leveraging AI to capture",
      icon: <BarChart2 className="h-5 w-5 text-white" />,
    },
    {
      title: "Faster Time-To-Hire",
      description:
        "Faster Time-to-Hire is one of the key benefits offered by Humanly.io's AI-powered recruitment platform.",
      icon: <Clock className="h-5 w-5 text-white" />,
    },
    {
      title: "AI-Powered Candidate",
      description:
        "AI-Powered Candidate Sourcing with Humanly.io transforms the way organizations find and connect with top talent.",
      icon: <Users className="h-5 w-5 text-white" />,
    },
  ]

  return (
    <div className="bg-gray-50 bg-gradient-to-br max-w-7xl mx-auto text-white py-16 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-2/3">
            <div className="inline-block px-4 py-1 bg-purple-950/60 rounded-full text-purple-50 text-xs font-medium mb-6 border border-purple-100">
              BORN IN AI. NOT BOLTED ON.
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-purple-700">Why Candidates And Recruiting</span>
              <br />
              <span className="text-purple-700">Teams Love Humanly</span>
            </h1>

            <p className="text-gray-600 mb-12 max-w-xl">
              Humanly boosts candidate engagement, streamlines recruiter workflows, and automates tasks
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="bg-white border-2 border-purple-100 shadow-lg backdrop-blur-lg rounded-lg p-6 ">
                  <div className="bg-purple-600 h-10 w-10 rounded-md flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-700">{feature.title}</h3>
                  <p className="text-gray-500 text-xs">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/3">
            <div className="bg-purple-950/90 backdrop-blur-lg shadow-lg  rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Streamlined Screening</h3>
                <div className="bg-purple-600 h-8 w-8 rounded-lg flex items-center justify-center">
                  <Filter className="h-4 w-4 text-white" />
                </div>
              </div>
              <p className="text-gray-300 text-sm">
                Streamlined, Precise Screening is a core strength of Humanly.io, designed to ensure only the most
                qualified candidates
              </p>

              <div className="mt-6 space-y-4">
                {[
                  { label: "Resume Analysis", value: 92 },
                  { label: "Skill Matching", value: 85 },
                  { label: "Cultural Fit", value: 78 },
                  { label: "Technical Proficiency", value: 65 },
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{item.label}</span>
                      <span>{item.value}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${item.value}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-purple-950/90 backdrop-blur-lg shadow-lg  rounded-lg mt-6 p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Streamlined Screening</h3>
                <div className="bg-purple-600 h-8 w-8 rounded-lg flex items-center justify-center">
                  <Filter className="h-4 w-4 text-white" />
                </div>
              </div>
              <p className="text-gray-300 text-sm">
                Streamlined, Precise Screening is a core strength of Humanly.io, designed to ensure only the most
                qualified candidates
              </p>

              <div className="mt-6 space-y-4">
                {[
                  { label: "Resume Analysis", value: 92 },
                  { label: "Skill Matching", value: 85 },
                  { label: "Cultural Fit", value: 78 },
                  { label: "Technical Proficiency", value: 65 },
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{item.label}</span>
                      <span>{item.value}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${item.value}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
