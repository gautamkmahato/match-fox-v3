import React from 'react';
import ExtractedJobDetailsCard from '../dashboard/interview/_components/ExtractedJobDetailsCard';

const interviewData = {
  // Your provided JSON data here
  "interview_name": "Full Stack Engineer",
  "job_description": "Sprinto is a leading platform that automates information security compliance. By raising the bar on information security, Sprinto ensures compliance, healthy operational practices, and the ability for businesses to grow and scale with unwavering confidence. We are a team of 330+ employees & helping 2000+ Customers across 75+ Countries. We are funded by top investment partners Accel, ELEVATION & Blume Ventures and have raised 32 Million USD in funding including our latest Series B round\n\nThe Role\n\nAs a Full Stack Engineer at Sprinto, you will play a pivotal role in our dynamic and collaborative team. You are not just a coder; you are a problem solver and a versatile programmer who thrives in a cross-functional environment. The role requires hands-on experience and a willingness to contribute across various aspects of the development process.\n\nResponsibilities\n\nActively engage in coding tasks, demonstrating proficiency in building web applications\nUtilize strong problem-solving skills to address challenges effectively, ensuring seamless project progression\nDemonstrate excellent verbal and written communication skills to convey ideas and collaborate with team members\nExhibit a knack for rapidly acquiring new tools and languages as required, adapting to the evolving needs of projects\nDraw from experiences to recognize the implications of programming choices, avoiding premature over-engineering that may hinder project timelines\nAnalyze situations to identify potential pitfalls and distinguish between fast/easy solutions and those with long-term consequences\nUnderstand that code is a means to solve business and customer problems, and make informed trade-offs to efficiently address these challenges\n\n\n\nRequirements\n\nMinimum of 2 years of hands-on programming experience, preferably in web application development\nDemonstrated ability to approach problems analytically and devise effective solutions\nStrong verbal and written communication skills to facilitate collaboration within the team\nQuick learner with a preference for picking up new tools and languages as needed for optimal problem-solving\nExperience in recognizing and mitigating the consequences of programming choices, both positive and negative\nUnderstanding that code serves as a tool to solve business and customer problems, and the ability to make informed trade-offs\n\n\n\nBenefits\n\nRemote First Policy\n5 Days Working With FLEXI Hours\nGroup Medical Insurance (Parents, Spouse, Children)\nGroup Accident Cover\nCompany Sponsored Device\nEducation Reimbursement Policy",
  "Role Overview": "The Full Stack Engineer role at Sprinto involves being a problem solver and versatile programmer in a collaborative, cross-functional team, contributing across various aspects of web application development.",
  "interview_time": "2024-01-22T00:00:00",
  "company_logo": "https://logoipsum.com/artwork/365",
  "status": "open",
  "interview_type": "technical",
  "interview_style": "one-on-one",
  "duration": 30,
  "Requirements": [
    "Minimum of 2 years of hands-on programming experience, preferably in web application development",
    "Demonstrated ability to approach problems analytically and devise effective solutions",
    "Strong verbal and written communication skills to facilitate collaboration within the team",
    "Quick learner with a preference for picking up new tools and languages as needed for optimal problem-solving",
    "Experience in recognizing and mitigating the consequences of programming choices, both positive and negative",
    "Understanding that code serves as a tool to solve business and customer problems, and the ability to make informed trade-offs"
  ],
  "Tech Stack": {
    "Programming Languages": [
      "JavaScript",
      "Python",
      "Java"
    ],
    "Frameworks": [
      "React",
      "Angular",
      "Node.js",
      "Express.js"
    ],
    "Tools": [
      "Git",
      "Docker",
      "Kubernetes"
    ],
    "DevOps": [
      "AWS",
      "Azure",
      "GCP"
    ]
  },
  "location": "India",
  "Tone / Cultural Fit": "collaborative, problem solver, quick learner, analytical",
  "Seniority_Level": "Mid-level",
  "Employment_Type": "Full-time",
  "Skills": [
    "Web application development",
    "Problem-solving",
    "Communication",
    "Adaptability",
    "Analytical skills",
    "Coding",
    "Cross-functional collaboration"
  ],
  "experience": "2+ years",
  "difficulty_level": "medium",
  "company": "Sprinto"
};

function page() {
  return (
    <div className="App">
      <ExtractedJobDetailsCard interview={interviewData} />
    </div>
  );
}

export default page;