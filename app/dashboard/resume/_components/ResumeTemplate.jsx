"use client";


import saveResume from "@/app/service/resume/saveResume";
import { Download, Loader, Loader2, Save } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const ResumeTemplate = ({ resume }) => {
  const [downloading, setDownloading] = useState(false);
  const [saving, setSaving] = useState(false);

  
  const resumeRef = useRef(null);

  const {
    user_info,
    work_experience,
    skills,
    projects,
    education,
    extra_curricular_activities,
  } = resume;

  const htmlContent = `<html>
  <head>
    <style>
      body {
        background: white;
        font-family: Arial, sans-serif; /* A clear, widely readable font */
        padding: 0.75in; /* Reduced margins to fit more content, common for resumes */
        color: #333;
        max-width: 7.5in; /* Standard paper width minus margins (8.5 - 2*0.75) */
        margin: auto;
      }
      h1 {
        font-size: 18pt; /* Slightly larger for emphasis */
        font-weight: bold;
        color: #2b2b2b;
        margin-bottom: 2pt; /* Reduced spacing */
        text-align: center;
      }
      h2 {
        font-size: 13pt; /* Smaller for section titles */
        font-weight: 600;
        padding-bottom: 2pt;
        margin-bottom: 6pt; /* Adjusted spacing */
        margin-top: 10pt; /* Reduced top margin */
        color: #333;
      }
      h3 {
        font-size: 10.5pt; /* Consistent with body text, but bold for distinction */
        font-weight: 600; /* Slightly bolder for subheadings */
        margin: 0;
        color: #222;
      }
      p, li, span {
        font-size: 10pt; /* Standard readable font size for body content */
        line-height: 1.2; /* Slightly reduced line height for compactness */
        color: #444;
        margin: 0;
      }
      .section {
        margin-bottom: 10pt; /* Reduced spacing between sections */
      }

      .header-contact,
      .header-links {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 6pt; /* Reduced gap */
        font-size: 9.5pt; /* Smaller for contact details */
        color: #666;
        margin-top: 2pt; /* Reduced spacing */
        margin-bottom: 6pt; /* Reduced spacing */
      }
      .header-contact span,
      .header-links a {
        text-decoration: none;
        color: #1a73e8;
      }
      ul {
        padding-left: 14pt; /* Slightly reduced padding */
        margin-top: 4pt; /* Reduced top margin for lists */
        margin-bottom: 4pt; /* Added bottom margin for lists */
      }
      ul li {
        margin-bottom: 2pt; /* Reduced spacing between list items */
      }
      .flex-between {
        display: flex;
        justify-content: space-between;
        align-items: baseline; /* Aligns text baselines */
        margin-bottom: 2pt; /* Added small margin for better spacing */
      }
      hr {
        border: none;
        border-top: 1px solid #ccc;
        margin: 8pt 0; /* Reduced margin around horizontal rules */
      }
    </style>
  </head>
  <body>
    <div class="resume-wrapper">
      <header class="section">
        <h1>${user_info?.name || ""}</h1>
        <div class="header-links">
          ${user_info.website ? `<a href="https://${user_info.website}">${user_info.website}</a>` : ""}
          ${user_info.linkedin ? `| <a href="${user_info.linkedin}">LinkedIn</a>` : ""}
          ${user_info.github ? `| <a href="${user_info.github}">GitHub</a>` : ""}
        </div>
        <div class="header-contact">
          ${user_info.phone ? `<span>${user_info.phone}</span>` : ""}
          ${user_info.email ? `| <span>${user_info.email}</span>` : ""}
          ${user_info.location ? `| <span>${user_info.location}</span>` : ""}
        </div>
      </header>
      <hr />

      <section class="section">
        <h2>Work Experience</h2>
        ${work_experience
      .map(
        (job) => `
          <div>
            <div class="flex-between">
              <h3>${job.title}</h3>
              <span>${job.duration || ""}</span>
            </div>
            <p>${job.company}</p>
            <ul>
              ${job.responsibilities.map((item) => `<li>${item}</li>`).join("")}
            </ul>
          </div>
        `
      )
      .join("")}
      </section>

      <hr />
      <section class="section">
        <h2>Skills</h2>
        <ul>
          ${Object.entries(skills)
      .map(([key, value]) => {
        const formattedKey = key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
        return `<li><strong>${formattedKey}:</strong> ${value.join(", ")}</li>`;
      })
      .join("")}
        </ul>
      </section>
      <hr />

      <section class="section">
        <h2>Projects</h2>
        ${projects
      .map(
        (project) => `
          <div>
            <div class="flex-between">
              <h3>${project.name}</h3>
              ${(project.link && project.link)
            ? `<a href="${project.link}" target="_blank" rel="noopener noreferrer" style="font-size: 10pt; color: #1a73e8;">Link</a>`
            : `<a href="#" target="_blank" rel="noopener noreferrer" style="font-size: 10pt; color: #1a73e8; font-weight: bold; ">Link</a>`
          }
            </div>
            <ul>
              ${project.description
            .split(". ")
            .filter((desc) => desc.trim()) // Filter out empty strings from split
            .map((desc) => `<li>${desc.trim()}</li>`)
            .join("")}
            </ul>
          </div>
        `
      )
      .join("")}
      </section>

      <hr />
      <section class="section">
        <h2>Education</h2>
        <p style="margin-bottom: 2pt;"><strong>${education.degree}</strong></p>
        <p style="margin-bottom: 2pt;">${education.university}</p>
        <p>${education.years} | CGPA: ${education.cgpa}</p>
      </section>
      <hr />
      <section class="section">
        <h2>Extra Curricular Activities</h2>
        <ul>
          ${extra_curricular_activities.map((activity) => `<li>${activity}</li>`).join("")}
        </ul>
      </section>
    </div>
  </body>
</html>
`

  const handleDownloadPDF = async () => {
    try {
      setDownloading(true);

      const res = await fetch("/api/resume/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ htmlContent }),
      });

      if (!res.ok) {
        toast.error("Failed to generate PDF");
        throw new Error("Failed to generate PDF");
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "resume.pdf";
      a.click();
      window.URL.revokeObjectURL(url);
      toast("Successfully downloaded the Resume")
    } catch (err) {
      console.error("PDF download error:", err);
      toast.error("Failed to download resume PDF.");
    } finally {
      setDownloading(false);
    }
  };

  const handleSavePDF = async () => {
    try{
      setSaving(true);
      const result = await saveResume(htmlContent);

    if (!result?.state) {
      toast.error(`Error: ${result?.error}`)
    }
    console.log(result);
    toast("Successfully saved the resume")
    } catch(error){
      console.log("Error: ", error);
      toast.error(`Error: ${error}`)
    } finally{
      setSaving(false);
    }
  }

  


  return (
    <>
      {/** Header */}
      <div className="w-full max-w-4xl flex justify-between items-center mx-auto pt-8">
        <h3 className="text-lg font-semibold">Resume</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={handleSavePDF}
            disabled={downloading}
            className={`flex items-center justify-center gap-2 text-sm bg-[#462eb4] hover:bg-gradient-to-b hover:from-indigo-700 hover:to-indigo-900 text-white px-4 py-2 rounded transition
            ${saving ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
          `}
          >
            {saving ? "" : <Save className="w-4 h-4" />}
            {saving && (
              <Loader2 className="w-4 h-4 animate-spin" />
            )}
            {saving ? "Saving..." : "Save Resume"}
          </button>
          <button
          onClick={handleDownloadPDF}
          disabled={downloading}
          className={`flex items-center justify-center gap-2 text-sm bg-[#462eb4] hover:bg-gradient-to-b hover:from-indigo-700 hover:to-indigo-900 text-white px-4 py-2 rounded transition
          ${downloading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
        `}
        >
          {downloading && (
            <Loader2 className="w-4 h-4 animate-spin" />
          )}
          {downloading ? "Downloading..." : "Download Resume"}
          {downloading ? "" : <Download className="w-4 h-4" />}
          
          </button>
          
        </div>

      </div>

      {/** Main Resume section */}
      <div className="min-h-screen bg-gray-50 p-4 sm:p-8 flex flex-col items-center">
        {/* Resume Preview */}
        <iframe
          ref={resumeRef}
          srcDoc={htmlContent}
          className="w-full max-w-4xl h-[1200px] bg-white shadow-lg rounded-md"
        />
      </div>


    </>
  );
};

export default ResumeTemplate;


