'use client';


import React, { useState } from "react";
import { Twitter, Linkedin, Github, Mail, Phone, MapPin, DollarSign, User, Calendar, Briefcase, Home, CheckCircle } from "lucide-react";
import updateUserDetails from "@/app/service/user/updateUserDetails";
import { toast } from "sonner";


export default function UserProfileUpdate() {
    const [designation, setDesignation] = useState("");
    const [twitter, setTwitter] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [github, setGithub] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [salaryExpectation, setSalaryExpectation] = useState("");
    const [location, setLocation] = useState("");
    const [age, setAge] = useState("");
    const [workType, setWorkType] = useState("remote");
    const [careerStatus, setCareerStatus] = useState("open_for_work");

    const [loading, setLoading] = useState(false);

    // Experience fields
    const [companyName, setCompanyName] = useState("");
    const [position, setPosition] = useState("");
    const [year, setYear] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try{
            const formData = {
            social_accounts: {
                twitter,
                linkedin,
                github,
            },
            designation,
            personal_info: {
                email,
                phone,
                salary_expectation: salaryExpectation,
                location,
                age,
            },
            work_type: workType,
            career_status: careerStatus,
            experience: {
                company_name: companyName,
                position,
                year,
            },
        };

        // console.log("Form Data Submitted:", formData);
        const result = await updateUserDetails(formData);

        if(!result?.state){
            // console.log("Failed to update the user");
            toast.error("Failed to update the user");
        }
        // console.log("Successfully updated the user", result?.data);

        } catch (error){
            // console.log("Error: ", error);
            toast.error("Error: ", error);
        } finally{
            setLoading(false);
            toast("Profile Updated! Check console for data.");
        }
    }

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
                Update Profile
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Designation */}
                <div>
                    <label className="flex items-center gap-2 text-sm text-gray-500 font-semibold mb-1">
                        <User className="w-4 h-4 text-blue-500" /> Designation
                    </label>
                    <input
                        type="text"
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                        required
                        placeholder="Your current designation"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder:text-sm"
                    />
                </div>

                {/* Social links */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="flex items-center gap-2 text-sm text-gray-500 font-semibold mb-1">
                            <Twitter className="w-4 h-4 text-indigo-400" /> Twitter
                        </label>
                        <input
                            type="url"
                            value={twitter}
                            onChange={(e) => setTwitter(e.target.value)}
                            placeholder="https://twitter.com/username"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 placeholder:text-sm focus:ring-indigo-300"
                        />
                    </div>

                    <div>
                        <label className="flex items-center gap-2 text-sm text-gray-500 font-semibold mb-1">
                            <Linkedin className="w-4 h-4 text-blue-600" /> LinkedIn
                        </label>
                        <input
                            type="url"
                            value={linkedin}
                            onChange={(e) => setLinkedin(e.target.value)}
                            placeholder="https://linkedin.com/in/username"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 placeholder:text-sm focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="flex items-center gap-2 text-sm text-gray-500 font-semibold mb-1">
                            <Github className="w-4 h-4 text-gray-800" /> GitHub
                        </label>
                        <input
                            type="url"
                            value={github}
                            onChange={(e) => setGithub(e.target.value)}
                            placeholder="https://github.com/username"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 placeholder:text-sm focus:ring-gray-600"
                        />
                    </div>
                </div>

                {/* Contact info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="flex items-center gap-2 text-sm text-gray-500 font-semibold mb-1">
                            <Mail className="w-4 h-4 text-red-500" /> Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="your.email@example.com"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 placeholder:text-sm focus:ring-red-400"
                        />
                    </div>

                    <div>
                        <label className="flex items-center gap-2 text-sm text-gray-500 font-semibold mb-1">
                            <Phone className="w-4 h-4 text-green-500" /> Phone
                        </label>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+1234567890"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 placeholder:text-sm focus:ring-green-400"
                        />
                    </div>
                </div>

                {/* Salary, Location, Age */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="flex items-center gap-2 text-sm text-gray-500 font-semibold mb-1">
                            <DollarSign className="w-4 h-4 text-yellow-500" /> Salary Expectation
                        </label>
                        <input
                            type="number"
                            value={salaryExpectation}
                            onChange={(e) => setSalaryExpectation(e.target.value)}
                            placeholder="In USD"
                            min={0}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 placeholder:text-sm focus:ring-yellow-400"
                        />
                    </div>

                    <div>
                        <label className="flex items-center gap-2 text-sm text-gray-500 font-semibold mb-1">
                            <MapPin className="w-4 h-4 text-pink-500" /> Location
                        </label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="City, Country"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 placeholder:text-sm focus:ring-pink-400"
                        />
                    </div>

                    <div>
                        <label className="flex items-center gap-2 text-sm text-gray-500 font-semibold mb-1">
                            <Calendar className="w-4 h-4 text-indigo-500" /> Age
                        </label>
                        <input
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            min={0}
                            placeholder="Your age"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 placeholder:text-sm focus:ring-indigo-400"
                        />
                    </div>
                </div>

                {/* Work Type and Career Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="flex items-center gap-2 text-sm text-gray-500 font-semibold mb-1">
                            <Home className="w-4 h-4 text-teal-500" /> Work Type
                        </label>
                        <select
                            value={workType}
                            onChange={(e) => setWorkType(e.target.value)}
                            className="w-full px-3 py-2 text-sm text-gray-600 border border-gray-300 rounded-md focus:outline-none focus:ring-2 placeholder:text-sm focus:ring-teal-400"
                        >
                            <option value="remote">Remote</option>
                            <option value="hybrid">Hybrid</option>
                            <option value="onsite">Onsite</option>
                        </select>
                    </div>

                    <div>
                        <label className="flex items-center gap-2 text-sm text-gray-500 font-semibold mb-1">
                            <CheckCircle className="w-4 h-4 text-lime-500" /> Career Status
                        </label>
                        <select
                            value={careerStatus}
                            onChange={(e) => setCareerStatus(e.target.value)}
                            className="w-full px-3 py-2 border text-sm text-gray-600 border-gray-300 rounded-md focus:outline-none focus:ring-2 placeholder:text-sm focus:ring-lime-400"
                        >
                            <option value="open_for_work text-sm text-gray-600">Open for Work</option>
                            <option value="working border">Working</option>
                        </select>
                    </div>
                </div>

                {/* Experience */}
                <fieldset className="border border-gray-300 rounded-md p-4">
                    <legend className="flex items-center gap-2 text-sm font-semibold text-gray-500 mb-4">
                        <Briefcase className="w-4 h-4 text-violet-600" /> Experience
                    </legend>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Company Name</label>
                            <input
                                type="text"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                placeholder="Company name"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 placeholder:text-sm focus:ring-violet-400"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Position</label>
                            <input
                                type="text"
                                value={position}
                                onChange={(e) => setPosition(e.target.value)}
                                placeholder="Your position"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 placeholder:text-sm focus:ring-violet-400"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Year</label>
                            <input
                                type="number"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                min={1900}
                                max={new Date().getFullYear()}
                                placeholder="Year (e.g. 2020)"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 placeholder:text-sm focus:ring-violet-400"
                            />
                        </div>
                    </div>
                </fieldset>

                <button
                    type="submit"
                    className="w-full bg-indigo-700 text-white text-sm font-semibold py-3 rounded-md hover:bg-indigo-900 transition cursor-pointer"
                >
                    Update Profile
                </button>
            </form>
        </div>
    );
}
