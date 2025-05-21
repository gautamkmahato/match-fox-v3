'use client';

import { useState } from "react";
import { SubmitButton } from "./SubmitButton";

export default function JobInputs({ onSubmit, initialData = {} }) {
  const [companyName, setCompanyName] = useState(initialData.companyName || "");
  const [difficultyLevel, setDifficultyLevel] = useState(initialData.difficultyLevel || "");
  const [duration, setDuration] = useState(initialData.duration || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputData = async (e) => {
    e.preventDefault();

    if (!companyName || !difficultyLevel || !duration) {
      setError("Please fill out all fields.");
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

      const status = result?.state ?? false;

      onSubmit(
        companyName.trim(),
        difficultyLevel,
        Number(duration),
        status
      );
    } catch (err) {
      setError("Something went wrong while checking your usage.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleInputData} className="flex flex-col gap-4">
        <div>
          <label className="block font-medium">Difficulty Level</label>
          <select
            value={difficultyLevel}
            onChange={(e) => setDifficultyLevel(e.target.value)}
            className="w-full border p-2 rounded-md"
          >
            <option value="">Select difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Company Name</label>
          <input
            className="w-full border p-2 rounded-md"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Enter company name"
          />
        </div>

        <div>
          <label className="block font-medium">Duration (in mins)</label>
          <input
            type="number"
            className="w-full border p-2 rounded-md"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Enter duration Eg: 30"
          />
        </div>

        <SubmitButton
          isLoading={loading}
          loadingText="Processing..."
          defaultText="Extract Details"
        />
      </form>
    </div>
  );
}
