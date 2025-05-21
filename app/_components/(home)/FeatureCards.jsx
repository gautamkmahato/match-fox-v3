import { Video, BarChart2, FileSearch } from "lucide-react"

export default function FeatureCards() {
  const features = [
    {
      title: "Virtual Interviews",
      description:
        "Detail the virtual interview environment provided by Intervio, including video and voice interview capabilities.",
      icon: <Video className="h-6 w-6 text-white" />,
      color: "bg-purple-600",
      image: "/images/virtual-interview.png",
    },
    {
      title: "AI Video Analytics",
      description:
        "Explain how Intervio AI analyzes interview data and generates performance reports to assist in decision-making.",
      icon: <BarChart2 className="h-6 w-6 text-white" />,
      color: "bg-purple-800",
      image: "/images/video-analytics.png",
    },
    {
      title: "Workman Screening",
      description:
        "Describe how Intervio AI utilizes AI to analyze and screen resumes, extracting relevant information and ranking candidates.",
      icon: <FileSearch className="h-6 w-6 text-white" />,
      color: "bg-purple-800",
      image: "/images/screening.png",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="rounded-lg overflow-hidden shadow-lg">
            <div className="relative">
              <img src={feature.image || "/placeholder.svg"} alt={feature.title} className="w-full h-48 object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <div className="absolute bottom-0 left-0 p-4">
                <div className={`${feature.color} p-2 rounded-full inline-flex items-center justify-center mb-2`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white">{feature.title}</h3>
              </div>
            </div>
            <div className="p-4 bg-white">
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
