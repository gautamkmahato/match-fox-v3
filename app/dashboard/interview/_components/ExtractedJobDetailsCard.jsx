'use client'

import Accordion from '@/components/Accordion';
import { CalendarDays, MapPin, Code2, Users, Clock, Award, Briefcase, BookOpenText, CheckCircle, GitBranch, Laptop2, ScrollText } from 'lucide-react';


// Reusable Detail Item Component
const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-start space-x-3">
    <div className="mt-0.5">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium text-gray-800">{value}</p>
    </div>
  </div>
);

// Reusable Section Component
const SectionWithIcon = ({ icon, title, children }) => (
  <div className="mb-6">
    <div className="flex items-center space-x-2 mb-3">
      {icon}
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    </div>
    {children}
  </div>
);

const ExtractedJobDetailsCard = ({ interview }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      {/* Header Section */}
      <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{interview.interview_name}</h1>
            <p className="text-gray-600 mt-1">
              {interview.company} • {interview.position}
            </p>
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            {interview.status}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Key Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <DetailItem 
            icon={<CalendarDays className="w-5 h-5 text-blue-600" />} 
            label="Interview Date" 
            value={formatDate(interview.interview_time)} 
          />
          <DetailItem 
            icon={<MapPin className="w-5 h-5 text-blue-600" />} 
            label="Location" 
            value={interview.location} 
          />
          <DetailItem 
            icon={<Code2 className="w-5 h-5 text-blue-600" />} 
            label="Type" 
            value={interview.interview_type} 
          />
          <DetailItem 
            icon={<Clock className="w-5 h-5 text-blue-600" />} 
            label="Duration" 
            value={`${interview.duration} mins`} 
          />
          <DetailItem 
            icon={<Users className="w-5 h-5 text-blue-600" />} 
            label="Style" 
            value={interview.interview_style} 
          />
          <DetailItem 
            icon={<Award className="w-5 h-5 text-blue-600" />} 
            label="Difficulty" 
            value={interview.difficulty_level} 
          />
          <DetailItem 
            icon={<Briefcase className="w-5 h-5 text-blue-600" />} 
            label="Experience" 
            value={interview.experience} 
          />
        </div>

        {/* Job Description */}
        <Accordion header="Job Description" description={interview.job_description} />

        {/* Key Skills */}
        <SectionWithIcon 
          icon={<CheckCircle className="w-5 h-5 text-blue-600" />} 
          title="Key Skills"
        >
          <div className="flex flex-wrap gap-2 mt-2">
            {[
              'React', 'JavaScript (ES6+)', 'TypeScript', 
              'HTML5/CSS3', 'SASS/LESS', 'RESTful APIs',
              'Git', 'Agile/Scrum', 'Responsive Design'
            ].map(skill => (
              <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </SectionWithIcon>

        {/* Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <SectionWithIcon 
            icon={<GitBranch className="w-5 h-5 text-blue-600" />} 
            title="Development Tools"
          >
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Webpack, Babel</li>
              <li>npm/Yarn</li>
              <li>Jira</li>
              <li>VS Code</li>
            </ul>
          </SectionWithIcon>

          <SectionWithIcon 
            icon={<Laptop2 className="w-5 h-5 text-blue-600" />} 
            title="Methodologies"
          >
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Agile Scrum</li>
              <li>Responsive Design</li>
              <li>Cross-browser Compatibility</li>
              <li>Code Review Practices</li>
            </ul>
          </SectionWithIcon>
        </div>
      </div>

    </div>
  );
};



export default ExtractedJobDetailsCard;