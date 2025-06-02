'use client';

import { Bot, FileText, ScrollText } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import VoiceInterview from './_components/VoiceAssistant';
// import AIResume from '../resume/page'; // Not needed since you navigate instead of rendering it

export const MockInterview = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">🎤 AI Mock Interview</h2>
      <p className="text-sm text-gray-600">This feature conducts an AI-driven interview.</p>
      {/* Replace this with the real interview component logic */}
    </div>
  );
};

export const ResumeBuilder = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">📄 Resume Builder</h2>
      <p className="text-sm text-gray-600">Build a professional resume using AI.</p>
    </div>
  );
};

export const CVBuilder = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">🧾 CV Builder</h2>
      <p className="text-sm text-gray-600">Generate academic CVs using AI assistance...</p>
      <p>Comming Soon</p>
    </div>
  );
};

export default function ToolsPage() {
  const [activeTool, setActiveTool] = useState(null);
  const router = useRouter();

  // Add `isNavigation` and `path` to handle navigation tools
  const tools = [
    {
      id: 'mock',
      icon: <Bot className="w-8 h-8 text-blue-600" />,
      title: 'Practice Mock Interview',
      description: 'Practice realistic interviews using voice and AI feedback.',
      isNavigation: false,
    },
    {
      id: 'resume',
      icon: <FileText className="w-8 h-8 text-green-600" />,
      title: 'AI Resume Builder',
      description: 'Generate ATS-friendly resumes with guided AI help.',
      isNavigation: true,
      path: '/dashboard/resume/create',
    },
    {
      id: 'cv',
      icon: <ScrollText className="w-8 h-8 text-purple-600" />,
      title: 'CV Builder',
      description: 'Build detailed CVs tailored for academic or research jobs.',
      isNavigation: false,
    },
  ];

  const renderTool = () => {
    switch (activeTool) {
      case 'mock':
        return <VoiceInterview />;
      case 'cv':
        return <CVBuilder />;
      default:
        return null;
    }
  };

  // Handle the start button click
  const handleStartClick = (tool) => {
    if (tool.isNavigation && tool.path) {
      router.push(tool.path);
    } else {
      setActiveTool(tool.id);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">🛠️ Explore AI Tools</h1>

      {!activeTool && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className="bg-white border border-gray-50 rounded-2xl p-6 shadow hover:shadow-md transition"
            >
              <div className="mb-4">{tool.icon}</div>
              <h2 className="text-xl font-semibold mb-2">{tool.title}</h2>
              <p className="text-sm text-gray-600 mb-4">{tool.description}</p>
              <button
                className="bg-indigo-700 hover:bg-indigo-900 text-white px-4 py-2 rounded-md text-sm"
                onClick={() => handleStartClick(tool)}
              >
                Start
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTool && (
        <div className="mt-8">
          <button
            onClick={() => setActiveTool(null)}
            className="text-sm text-blue-600 mb-4 hover:underline"
          >
            ← Back to tools
          </button>
          <div className="bg-white p-6 rounded-lg shadow">{renderTool()}</div>
        </div>
      )}
    </div>
  );
}
