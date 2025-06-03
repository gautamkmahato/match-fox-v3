'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronDown, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function JobInputs({ onSubmit, initialData = {} }) {
  const [companyName, setCompanyName] = useState(initialData.companyName || "");
  const [difficultyLevel, setDifficultyLevel] = useState(initialData.difficultyLevel || "");
  const [duration, setDuration] = useState(initialData.duration || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputData = async (e) => {
    e.preventDefault();

    if (!companyName) {
      toast.error("Please fill out company name");
      return;
    }
    if (!difficultyLevel) {
      toast.error("Please fill out difficulty level");
      return;
    }
    if (!duration) {
      toast.error("Please fill out duration");
      return;
    }

    if (isNaN(duration) || Number(duration) <= 0) {
      setError("Duration must be a valid positive number.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/interview/check-usage");
      const result = await response.json();

      // console.log("check usage", result)

      const status = result?.state ?? false;

      // console.log(typeof duration)
      // console.log(typeof duration)
      const remaining_minutes = result?.data.remaining_minutes
      onSubmit(
        companyName.trim(),
        difficultyLevel,
        Number(duration),
        status,
        remaining_minutes
      );
    } catch (err) {
      setError("Something went wrong: " + (err?.message || String(err)));

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="">

        <form onSubmit={handleInputData}>
          <label className="block text-sm text-[#303032] font-medium mb-1">
            Please enter Company's Name
          </label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full bg-white px-4 py-2.5 rounded-md border border-[#D1D1D6] focus:outline-none focus:ring-2 focus:ring-[#A3A3FF] text-[#1D1D1F] placeholder-[#C7C7CC] mb-5"
          />

          <label className="block text-sm text-[#1D1D1F] font-medium mb-1">
            Please select difficulty level
          </label>
          <div className="relative mb-5">
            <select
              value={difficultyLevel}
              onChange={(e) => setDifficultyLevel(e.target.value)}
              className="w-full appearance-none px-4 text-sm py-3 rounded-md border border-[#D1D1D6] bg-white text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#A3A3FF]"
            >
              <option value="">Select a role</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            <ChevronDown className="absolute right-3 top-3 pointer-events-none text-[#636366] w-5 h-5 font-bold" />
          </div>

          <label className="block text-sm text-[#1D1D1F] font-medium mb-1">
            Please enter interview duration
          </label>
          <input
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full bg-white px-4 py-2.5 text-sm rounded-md border border-[#D1D1D6] focus:outline-none focus:ring-2 focus:ring-[#A3A3FF] text-[#1D1D1F] placeholder-[#C7C7CC] mb-5"
          />

          <div className="flex justify-between items-center">
            <button disabled={loading}
              className="bg-[#462eb4] hover:shadow-2xl text-white px-5 py-3 rounded-md text-sm font-medium flex items-center gap-2 cursor-pointer transition duration-300 ease-in-out disabled:opacity-70 disabled:cursor-not-allowed">
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2 w-5 h-5" /> {/* Loader2 icon with animate-spin */}
                  Loading...
                </>
              ) : (
                'Next Step'
              )}
              {!loading ? <ArrowRight className="w-4 h-4" /> : <></>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
