'use client';


import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Loader2, SquareSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import createNewJobs from "@/app/service/jobs/createNewJobs";
import { toast } from "sonner";
import uploadLogo from "@/app/service/jobs/uploadLogo";
import generateQuestions from "@/app/service/jobs/generateQuestions";
import { extractJsonBlock } from "@/lib/utils/cleanCodeBlock";


export default function JobForm() {
  const [interviewName, setInterviewName] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [interviewTime, setInterviewTime] = useState('');
  const [createdDate, setCreatedDate] = useState('');
  const [companyLogo, setCompanyLogo] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const [status, setStatus] = useState('');
  const [interviewType, setInterviewType] = useState('');
  const [interviewStyle, setInterviewStyle] = useState('');
  const [duration, setDuration] = useState('');
  const [position, setPosition] = useState('');
  const [location, setLocation] = useState('');
  const [difficultyLevel, setDifficultyLevel] = useState('');
  const [experience, setExperience] = useState('');
  const [salary, setSalary] = useState('');
  const [recruiterTitle, setRecruiterTitle] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  const [jobType, setJobType] = useState('');
  const [loading, setLoading] = useState(false);

  const statuses = ["Scheduled", "In-Progress", "Completed", "Cancelled"];
  const interviewTypes = ["Video", "In-person"];
  const styles = ["Technical", "Behavioral"];
  const positions = ["Cloud Engineer", "Frontend Developer", "Data Analyst"];
  const experiences = ["Junior", "Mid-Senior", "Senior", "Architect"];
  const difficulty = ["Easy", "Medium", "Hard"];
  const employmentTypes = ["Full Time", "Internship", "Contract"];
  const jobTypes = ["On-Site", "Hybrid", "Remote"];

  const { user } = useUser();

  console.log(user)

  const router = useRouter();


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert to ISO format (e.g. "2025-05-10T14:30:00Z")
    // const interviewTimeISO = new Date(interviewTime).toISOString();

    // ✅ Client-side validation
    if (!interviewName.trim()) return alert("Interview name is required.");
    if (!jobDescription.trim()) return alert("Job description is required.");
    // if (!interviewTime) return alert("Interview time is required.");
    //if (!createdDate) return alert("Created date is required.");
    // if (!status) return alert("Please select a status.");
    // if (!interviewType) return alert("Please select an interview type.");
    if (!interviewStyle) return alert("Please select an interview style.");
    if (!duration || isNaN(duration) || duration <= 0) return alert("Enter a valid duration.");
    if (!position) return alert("Please select a position.");
    if (!location.trim()) return alert("Location is required.");
    if (!difficultyLevel) return alert("Please select a Difficulty.");
    if (!experience) return alert("experience is required.");
    if (!companyName) return alert("Company name is required.");

    // ✅ Check if interview time is in the future
    // if (new Date(interviewTime) < new Date()) {
    //   return alert("Interview time must be in the future.");
    // }

    try {
      setLoading(true);
      let logoUrl = null;

      // check usage limit
      const usage = await checkUsage();

      if (!usage?.status) {
        toast.error("Something went wrong");
        return;
      }
      console.log(usage)

      if (usage?.remaining_minutes < duration*60) {
        toast.error("Limit exceeded. Please upgrade your plan.");
        return;
      }

      // ✅ If companyLogo exists and is a File, upload separately (e.g., to S3 or a /upload route)
      // Usage inside component or handler
      if (companyLogo instanceof File) {
        const logoForm = new FormData();
        logoForm.append('file', companyLogo);

        const logoUploadRes = await uploadLogo(logoForm);

        if (!logoUploadRes?.state) {
          console.log("Logo upload failed", logoUploadRes.error);
          toast.error("Logo upload failed");
        } else {
          console.log("logoUploadRes", logoUploadRes);
          logoUrl = logoUploadRes.data.url;  // ✅ fixed: result.data.url
        }
      }


      // Generate the questions first
      const questions = await getQuestions();

      // ✅ Final form payload
      const formData = {
        interview_name: interviewName.trim(),
        job_description: jobDescription.trim(),
        // interview_time: interviewTimeISO,
        company_logo: logoUrl, // optional
        // status: status.toLowerCase(),
        interview_type: interviewType,
        interview_style: interviewStyle,
        duration: Number(duration),
        position: position,
        location: location.trim(),
        experience: experience,
        difficulty_level: difficultyLevel,
        company: companyName,
        salary: salary,
        recruiter_title: recruiterTitle,
        employment_type: employmentType,
        job_type: jobType,
        type: 'JOB',
        questions: questions
      };

      console.log(formData)

      // ✅ Submit to backend
      const result = await createNewJobs(formData);

      if (!result.state) {
        console.log("Error in creating jobs");
        toast("Error in creating jobs")
      }

      console.log("Jobs created successfully!", result);

      toast("Jobs created successfully!");

      // router.push("/dashboard")

      // ✅ Optional: Reset form state
      setInterviewName("");
      setJobDescription("");
      setInterviewTime("");
      setCreatedDate("");
      setCompanyLogo(null);
      setStatus("");
      setInterviewType("");
      setInterviewStyle("");
      setDuration("");
      setPosition("");
      setLocation("");
      setDifficultyLevel("");
      setExperience("")

    } catch (error) {
      console.error("Submit error:", error);
      toast.error(error.message || "Something went wrong. Please try again.")
    } finally{
      setLoading(false);
      router.push("/dashboard/jobs");
    }
  };

  const getQuestions = async () =>{
    try{
      const result = await generateQuestions(jobDescription, companyName, interviewStyle, position, difficultyLevel, experience);

    if(!result?.state){
      console.log("Error in generating questions");
      toast.error("Error in generating questions");
    }
    console.log("generate question: ", result);
    // Step 2: Clean the result (if needed, depending on Gemini output)
    const questions = extractJsonBlock(result.data);
    console.log("Cleaned :", questions);
    console.log("Cleaned Questions:", JSON.parse(questions));
    return JSON.parse(questions);
    } catch(error){
      console.log("Error in creating questions: ", error);
      toast.error(`Error: ${error}`)
    } 
  }

  const checkUsage = async () =>{
    try {
      const response = await fetch("/api/interview/check-usage");
      const result = await response.json();

      console.log("check usage", result);

      if(!result?.state){
        console.log("error in fetching usage");
        toast.error("Error in fetching usage");
        return{
          status: false
        }
      }

      const remaining_minutes = result?.data.remaining_minutes;
      return {
        status: true,
        remaining_minutes: remaining_minutes
      };

    } catch (err) {
      console.log("Something went wrong: " + (err?.message || String(err)));
      toast.error("Something went wrong: " + (err?.message || String(err)));

    }
  }


  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex gap-1 items-center py-6">
        <SquareSquare className="w-5 h-5" />
        <h2 className="text-xl font-semibold text-gray-800">Create New Job</h2>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        {/* Company Name */}
        <div>
          <label className="block text-sm mb-1 font-medium text-gray-600">Company Name</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm"
            placeholder="e.g. Google"
          />
        </div>

        {/* Interview Name */}
        <div>
          <label className="block text-sm mb-1 font-medium text-gray-600">Job Title</label>
          <input
            type="text"
            value={interviewName}
            onChange={(e) => setInterviewName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm"
            placeholder="e.g. Cloud Engineer"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm mb-1 font-medium text-gray-600">Job Description</label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full h-40 px-3 py-2 border border-gray-200 rounded-md text-sm"
            placeholder="Enter Job Description"
          />
        </div>

        {/* Interview & Created Time */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1 font-medium text-gray-600">Interview Time</label>
            <input
              type="datetime-local"
              value={interviewTime}
              onChange={(e) => setInterviewTime(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 font-medium text-gray-600">Company Logo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCompanyLogo(e.target.files?.[0] ?? null)}
              className="w-full border-gray-200 text-sm"
            />
          </div>
        </div>  */}

        {/* Status */}
        {/* <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Status</label>
          <div className="flex gap-2">
            {statuses.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStatus(s)}
                className={`px-3 py-1 rounded-md text-sm border ${
                  status === s
                    ? "border border-indigo-300 bg-indigo-50 text-indigo-800 font-semibold"
                    : "border border-gray-300 bg-gray-50 text-gray-600"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div> */}

        {/* Interview Type */}
        {/* <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Interview Type</label>
          <div className="flex gap-2">
            {interviewTypes.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setInterviewType(t)}
                className={`px-3 py-1 rounded-md text-sm border ${
                  interviewType === t
                    ? "border border-indigo-300 bg-indigo-50 text-indigo-800 font-semibold"
                    : "border border-gray-300 bg-gray-50 text-gray-600"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div> */}

        {/* Employment Type */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Employment Type</label>
          <div className="flex gap-2">
            {employmentTypes.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setEmploymentType(t)}
                className={`px-3 py-1 rounded-md text-sm border ${employmentType === t
                    ? "border border-indigo-300 bg-indigo-50 text-indigo-800 font-semibold"
                    : "border border-gray-300 bg-gray-50 text-gray-600"
                  }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Job Type */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Job Type</label>
          <div className="flex gap-2">
            {jobTypes.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setJobType(t)}
                className={`px-3 py-1 rounded-md text-sm border ${jobType === t
                    ? "border border-indigo-300 bg-indigo-50 text-indigo-800 font-semibold"
                    : "border border-gray-300 bg-gray-50 text-gray-600"
                  }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Recruiter Name */}
        <div>
          <label className="block text-sm mb-1 font-medium text-gray-600">Recruiter Title</label>
          <input
            type="text"
            value={recruiterTitle}
            onChange={(e) => setRecruiterTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm"
            placeholder="e.g. Hiring Manager"
          />
        </div>

        {/* Interview Style */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Interview Style</label>
          <div className="flex gap-2">
            {styles.map((style) => (
              <button
                key={style}
                type="button"
                onClick={() => setInterviewStyle(style)}
                className={`px-3 py-1 rounded-md text-sm border ${interviewStyle === style
                    ? "border border-indigo-300 bg-indigo-50 text-indigo-800 font-semibold"
                    : "border border-gray-300 bg-gray-50 text-gray-600"
                  }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm mb-1 font-medium text-gray-600">Duration (in minutes)</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm"
            placeholder="e.g. 45"
          />
        </div>

        {/* Position */}
        <div>
          <label className="block text-sm mb-1 font-medium text-gray-600">Position</label>
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm"
            placeholder="Enter a Position Eg: Full Stack Developer"
          />
        </div>

        {/* Difficulty */}
        <div>
          <label className="block text-sm mb-1 font-medium text-gray-600">Difficulty Level</label>
          <select
            value={difficultyLevel}
            onChange={(e) => setDifficultyLevel(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm"
          >
            <option value="">Select difficulty level</option>
            {difficulty.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        {/* Experience */}
        <div>
          <label className="block text-sm mb-1 font-medium text-gray-600">Experience</label>
          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm"
          >
            <option value="">Select Experience Level</option>
            {experiences.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        {/* Salary */}
        <div>
          <label className="block text-sm mb-1 font-medium text-gray-600">Salary</label>
          <input
            type="text"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm"
            placeholder="e.g. Google"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm"
            placeholder="e.g. Seattle, WA"
          />
        </div> 

        {/* Actions */}
        <div className="pt-4 flex justify-end gap-3">
          <button type="button" className={`px-4 py-2 text-sm border rounded-md text-gray-700 hover:bg-gray-50 cursor-pointer ${loading ? 'cursor-not-allowed opacity-50' : ''}`}>
            Cancel
          </button>
          <button type="submit" className={`flex items-center gap-2 px-4 py-2 text-sm bg-[#462eb4] text-white rounded-md hover:bg-gradient-to-b hover:from-indigo-600 hover:to-indigo-950 cursor-pointer ${loading ? 'cursor-not-allowed opacity-50' : ''}`}>
            {loading ? <Loader2 className="animate-spin w-4 h-4" /> : ''}
            {loading ? 'Creating Jobs' : 'Create Jobs'}
          </button>
        </div>
      </form>
    </div>
  );
}
