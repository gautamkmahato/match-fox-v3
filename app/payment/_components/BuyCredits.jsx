"use client";

import { useState } from "react";
import axios from "axios";
import { Coins, CheckCircle } from "lucide-react";

// Central plan data
const plans = [
  {
    name: "Free Plan",
    tagline: "Give AI interviews a try",
    credits: 0,
    price: { monthly: 0, yearly: 0 },
    features: [
      "5 Min Mock Interview",
      "Resume Screening",
      "AI Resume Builder",
      "Basic Video Score Analysis",
      "Automated Interview Scheduling"
    ],
    highlighted: false,
  },
  {
    name: "Basic Plan",
    tagline: "Kickstart your interview prep",
    credits: 9000,
    price: { monthly: 10, yearly: 99 },
    features: [
      "150 Min Mock Interview",
      "AI Resume Creator",
      "Automated Interview Scheduling",
      "Resume Screening",
      "Video Feedback",
      "Interview Tips by AI"
    ],
    highlighted: false,
  },
  {
    name: "Pro Plan",
    tagline: "Best for regular practice",
    credits: 27000,
    price: { monthly: 25, yearly: 449 },
    features: [
      "450 Min Mock Interview",
      "All Basic Plan Features",
      "AI Interview Insights",
      "Customizable Assessments",
      "Comprehensive Analytics",
      "Live Coding Scenarios"
    ],
    highlighted: true,
  },
  {
    name: "Enterprise Plan",
    tagline: "For teams and organizations",
    credits: 120000,
    price: { monthly: 99, yearly: 999 },
    features: [
      "2000 Min Mock Interview",
      "All Pro Plan Features",
      "Dedicated AI Coach",
      "Advanced Reporting",
      "Team Management",
      "Slack/Zoom Integration"
    ],
    highlighted: false,
  },
];

export default function BuyCredits() {
  const [selectedCycle, setSelectedCycle] = useState("monthly");
  const [selectedCredits, setSelectedCredits] = useState(plans[1].credits); // default to Basic
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        "/api/checkout",
        { credits: selectedCredits },
        { headers: { "Content-Type": "application/json" } }
      );
      window.location.href = data.url;
    } catch (error) {
      console.error("Payment Error:", error);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-4xl font-bold text-center mb-2">Buy Interview Credits</h2>
      <p className="text-center text-gray-500 mb-6">
        Unlock AI-driven mock interviews, resume tools, analytics, and more.
      </p>

      {/* Toggle */}
      <div className="flex justify-center mb-10 gap-4">
        <button
          onClick={() => setSelectedCycle("monthly")}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
            selectedCycle === "monthly"
              ? "bg-[#462eb4] text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Monthly Plans
        </button>
        <button
          onClick={() => setSelectedCycle("yearly")}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
            selectedCycle === "yearly"
              ? "bg-[#462eb4] text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Yearly Plans
        </button>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            onClick={() => setSelectedCredits(plan.credits)}
            className={`p-6 rounded-2xl shadow-md border cursor-pointer transition hover:shadow-lg ${
              selectedCredits === plan.credits
                ? "border-[#462eb4] ring-2 ring-[#462eb4]"
                : "border-gray-200"
            } ${plan.highlighted ? "bg-[#462eb4]" : "bg-white"}`}
          >
            <h3 className={`text-xl font-bold mb-1 ${plan.highlighted ? "bg-[#462eb4] text-white" : "bg-white"}`}>{plan.name}</h3>
            <p className={`text-xs ${plan.highlighted ? "text-gray-300" : "text-gray-500"} mb-2`}>{plan.tagline}</p>
            <div className={`flex items-center gap-2 text-md font-semibold ${plan.highlighted ? "text-gray-50" : "text-[#462eb4]"} mb-2`}>
              <Coins className="w-5 h-5 text-yellow-500" />
              {plan.credits.toLocaleString()} Credits
            </div>
            <p className={`text-3xl mb-4 font-semibold ${plan.highlighted ? "text-gray-100" : "text-gray-600"}`}>
              ${plan.price[selectedCycle]} / {selectedCycle}
            </p>

            <ul className="text-sm space-y-2 mb-4">
              {plan.features.map((f, idx) => (
                <li key={idx} className={`flex items-center gap-2 ${plan.highlighted ? "text-gray-300" : "text-gray-700"}`}>
                  <CheckCircle className="text-green-500 w-4 h-4" /> {f}
                </li>
              ))}
            </ul>

            {selectedCredits === plan.credits && (
              <div className="text-sm text-[#462eb4] font-medium text-center">Selected</div>
            )}
          </div>
        ))}
      </div>

      {/* Buy Button */}
      <div className="flex justify-center mt-10">
        <button
          onClick={handlePurchase}
          disabled={loading}
          className="bg-[#462eb4] text-white px-8 py-3 rounded-md font-semibold shadow-md hover:bg-indigo-800 transition disabled:opacity-50"
        >
          {loading ? "Processing..." : `Buy ${selectedCredits.toLocaleString()} Credits`}
        </button>
      </div>
    </div>
  );
}
