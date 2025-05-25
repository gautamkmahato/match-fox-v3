'use client'

import Accordion from '@/components/Accordion'; // Assuming Accordion component handles description expansion
import { CalendarDays, MapPin, Code2, Users, Clock, Award, Briefcase, BookOpenText, CheckCircle, GitBranch, Laptop2, ScrollText, Building, Puzzle, Lightbulb, Heart, Wallet, GraduationCap, Tv } from 'lucide-react';
import React from 'react';



// Reusable Detail Item Component
const DetailItem = ({ icon, label, value }) => {
  if (!value) return null; // Fallback for undefined/null values
  return (
    <div className="flex items-start space-x-3">
      <div className="mt-0.5">{icon}</div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

// Reusable Section Component
const SectionWithIcon = ({ icon, title, children }) => {
  // Only render section if there's content to display
  if (React.Children.count(children) === 0 || (Array.isArray(children) && children.every(child => child === null))) {
    return null;
  }
  return (
    <div className="mb-6">
      <div className="flex items-center space-x-2 mb-3">
        {icon}
        <h3 className="text-md font-semibold text-gray-800">{title}</h3>
      </div>
      {children}
    </div>
  );
};

const ExtractedJobDetailsCard = ({ interview }) => {
  // Handle empty or null interview object
  if (!interview || Object.keys(interview).length === 0) {
    return (
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8 text-center text-gray-600">
        <p>No interview data available to display.</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (error) {
      console.error("Error formatting date:", error);
      return 'Invalid Date';
    }
  };

  const parseTextList = (text) => {
    if (!text) return [];
    // Split by new lines, filter out empty strings, and trim each item
    return text.split('\n').filter(item => item.trim() !== '').map(item => item.trim());
  };

  const jobResponsibilities = parseTextList(interview.job_description).filter(line =>
    line.startsWith('Actively engage') ||
    line.startsWith('Utilize strong') ||
    line.startsWith('Demonstrate excellent') ||
    line.startsWith('Exhibit a knack') ||
    line.startsWith('Draw from experiences') ||
    line.startsWith('Analyze situations') ||
    line.startsWith('Understand that code')
  );

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden font-sans">
      {/* Header Section */}
      <div className="p-6 bg-gradient-to-b from-gray-200 via-gray-100 to-white">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{interview.interview_name || 'Job Interview'}</h1>
            <p className="text-gray-600 mt-1">
              {interview.company || 'Company Name'}
              {interview.Seniority_Level && ` • ${interview.Seniority_Level}`}
            </p>
          </div>
          {interview.status && (
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${interview.status.toLowerCase() === 'open' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
              {interview.status}
            </span>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Key Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <DetailItem
            icon={<CalendarDays className="w-4 h-4 text-gray-700" />}
            label="Interview Date"
            value={formatDate(interview.interview_time)}
          />
          <DetailItem
            icon={<MapPin className="w-4 h-4 text-gray-700" />}
            label="Location"
            value={interview.location}
          />
          <DetailItem
            icon={<Code2 className="w-4 h-4 text-gray-700" />}
            label="Type"
            value={interview.interview_type}
          />
          <DetailItem
            icon={<Clock className="w-4 h-4 text-gray-700" />}
            label="Duration"
            value={interview.duration ? `${interview.duration} mins` : null}
          />
          <DetailItem
            icon={<Users className="w-4 h-4 text-gray-700" />}
            label="Style"
            value={interview.interview_style}
          />
          <DetailItem
            icon={<Award className="w-4 h-4 text-gray-700" />}
            label="Difficulty"
            value={interview.difficulty_level}
          />
          <DetailItem
            icon={<Briefcase className="w-4 h-4 text-gray-700" />}
            label="Experience"
            value={interview.experience}
          />
          <DetailItem
            icon={<BookOpenText className="w-4 h-4 text-gray-700" />}
            label="Employment"
            value={interview.Employment_Type}
          />
        </div>

        {/* Job Description (using Accordion) */}
        {interview.job_description && (
          <Accordion header="Job Description" description={interview.job_description} icon={<ScrollText className="w-4 h-4 text-gray-700" />} />
        )}

        {/* Role Overview */}
        <SectionWithIcon
          icon={<Building className="w-4 h-4 text-gray-700" />}
          title="Role Overview"
        >
          {interview.Role_Overview && <p className="text-gray-700 text-xs">{interview.Role_Overview}</p>}
        </SectionWithIcon>

        <br />
        {/* Requirements */}
        <SectionWithIcon
          icon={<CheckCircle className="w-4 h-4 text-gray-700" />}
          title="Requirements"
        >
          {(interview.Requirements && interview.Requirements.length > 0) ? (
            <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
              {interview.Requirements.map((req, index) => (
                <li key={index} className='text-sm'>{req}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 text-sm">No specific requirements listed.</p>
          )}
        </SectionWithIcon>

        {/* Technical Stack */}
        <SectionWithIcon
          icon={<Tv className="w-4 h-4 text-gray-700" />}
          title="Technical Stack"
        >
          {(interview["Tech Stack"] && interview["Tech Stack"].length > 0) ? (
            <div className="flex flex-wrap gap-2">
              {interview["Tech Stack"].map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-sm ">No specific skills listed.</p>
          )}
        </SectionWithIcon>


        {/* Skills */}
        <SectionWithIcon
          icon={<CheckCircle className="w-4 h-4 text-gray-700" />}
          title="Skills"
        >
          {(interview.Skills && interview.Skills.length > 0) ? (
            <div className="flex flex-wrap gap-2">
              {interview.Skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-sm ">No specific skills listed.</p>
          )}
        </SectionWithIcon>

        {/* Responsibilities */}
        <SectionWithIcon
          icon={<Puzzle className="w-4 h-4 text-gray-700" />}
          title="Responsibilities"
        >
          {(jobResponsibilities && jobResponsibilities.length > 0) ? (
            <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
              {jobResponsibilities.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

          ) : (
            <p className="text-gray-600 text-sm">No specific responsibilities listed.</p>
          )}
        </SectionWithIcon>

        {/* Cultural Fit */}
        <SectionWithIcon
          icon={<Heart className="w-4 h-4 text-gray-700" />}
          title="Tone / Cultural Fit"
        >
          {(interview['Tone / Cultural Fit']) ? (
            <div className="flex flex-wrap gap-2 text-sm">
              {interview['Tone / Cultural Fit'].split(',').map((trait, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full flex items-center"
                >
                  {trait.trim()}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-sm">Cultural fit not specified.</p>
          )}
        </SectionWithIcon>

        {/* Benefits */}
        <SectionWithIcon
          icon={<Wallet className="w-4 h-4 text-gray-700" />}
          title="Benefits"
        >
          {(interview.Benefits && interview.Benefits.length > 0) ? (
            <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
              {interview.Benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 text-sm">Benefits not listed.</p>
          )}
        </SectionWithIcon>

        {/* Company Overview (Optional, derived from job_description if needed) */}
        <SectionWithIcon
          icon={<Building className="w-4 h-4 text-gray-700" />}
          title={`About ${interview.company}`}
        >
          {interview.job_description && (
            <p className="text-gray-700 text-sm">
              {/* Extract the first paragraph about Sprinto */}
              {interview.job_description.split('\n\n')[0] || 'Company overview not available.'}
            </p>
          )}
        </SectionWithIcon>

      </div>
    </div>
  );
};

export default ExtractedJobDetailsCard;