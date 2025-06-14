"use client";

import { Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function PricingPlans() {
  const [billingCycle, setBillingCycle] = useState("monthly");
  

  const plans = [
    {
      name: "Free Plan",
      price: { monthly: 0, yearly: 0 },
      description: "Give it a try",
      features: {
        monthly: [
          "5 Min Mock Interview",
          "Resume screening",
          "Automated interview scheduling",
          "AI Resume Creator",
          "AI Video Score Analysis",
        ],
        yearly: [
          "60 Min Mock Interview (5/month)",
          "Resume screening",
          "Automated interview scheduling",
          "AI Resume Creator",
          "AI Video Score Analysis",
        ],
      },
      buttonText: "Choose Plan",
      buttonVariant: "outline",
      highlighted: false,
    },
    {
      name: "Basic Plan",
      price: { monthly: 10, yearly: 99 },
      description: "Quickly prepare for Interview",
      features: {
        monthly: [
          "150 Min Mock Interview",
          "Resume screening",
          "Automated interview scheduling",
          "AI Resume Creator",
          "AI Video Score Analysis",
        ],
        yearly: [
          "1800 Min Mock Interview (150/month)",
          "Priority resume screening",
          "Automated interview scheduling",
          "AI Resume Creator",
          "AI Video Score Analysis",
        ],
      },
      buttonText: "Choose Plan",
      buttonVariant: "outline",
      highlighted: false,
    },
    {
      name: "Professional Plan",
      price: { monthly: 25, yearly: 249 },
      description: "Best for interview preparation",
      features: {
        monthly: [
          "450 Min Mock Interview",
          "Basic Plan Features",
          "Customizable assessments",
          "Comprehensive data analytics",
          "Interview Report Analytics",
        ],
        yearly: [
          "5400 Min Mock Interview (450/month)",
          "All Basic Plan Features",
          "Customizable assessments",
          "Detailed performance trends",
          "Interview Report Analytics",
        ],
      },
      buttonText: "Choose and Get 20%",
      buttonVariant: "primary",
      highlighted: true,
    },
    {
      name: "Enterprise Plan",
      price: { monthly: 99, yearly: 999 },
      description: "For Large Organizations",
      features: {
        monthly: [
          "2000 Min Mock Interview",
          "Pro Plan Features",
          "Additional customization options",
          "Dedicated support",
          "Advanced integrations",
        ],
        yearly: [
          "24000 Min Mock Interview (2000/month)",
          "All Pro Plan Features",
          "Dedicated success manager",
          "Team analytics dashboard",
          "Advanced integrations",
        ],
      },
      buttonText: "Choose Plan",
      buttonVariant: "outline",
      highlighted: false,
    },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="lg:text-3xl text-xl font-bold mb-4">
            Choose the Perfect Plan for
            <br />
            Your Interview Needs
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-md">
            Our Basic Plan is ideal for startups and small businesses looking to optimize their hiring process.
          </p>

          {/* Toggle Billing */}
          <div className="flex items-center justify-center mt-8 space-x-4 font-inter">
      {/* Monthly label */}
      <span
        className={`text-sm transition-colors duration-300 ${
          billingCycle === "monthly" ? "font-semibold text-gray-900" : "text-gray-500"
        }`}
      >
        Monthly
      </span>

      {/* Toggle Button */}
      <button
        onClick={() =>
          setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")
        }
        className={`relative w-16 h-8 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white p-0.5
          ${
            billingCycle === "monthly"
              ? "bg-gray-300 focus:ring-gray-400" // Off state: gray background
              : "bg-indigo-600 focus:ring-indigo-700" // On state: indigo background
          } shadow-inner`}
        aria-checked={billingCycle === "yearly"} // ARIA attribute for accessibility
        role="switch" // ARIA role for a switch control
      >
        {/* Toggle Thumb */}
        <span
          className={`block w-7 h-7 rounded-full bg-white shadow-md transform transition-transform duration-300 ease-in-out
            ${
              billingCycle === "yearly" ? "translate-x-8" : "translate-x-0" // Move 8 units (32px) for yearly
            }`}
        />
      </button>

      {/* Yearly label with discount */}
      <span
        className={`text-sm transition-colors duration-300 ${
          billingCycle === "yearly" ? "font-semibold text-gray-900" : "text-gray-500"
        }`}
      >
        Yearly <span className="text-xs text-indigo-600 font-medium">20% OFF</span>
      </span>
    </div>
        </div>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg overflow-hidden shadow-md ${
                plan.highlighted ? "transform md:-translate-y-2" : ""
              }`}
            >
              <div
                className={`p-6 ${
                  plan.highlighted ? "bg-indigo-600 text-white" : "bg-indigo-800 text-white"
                }`}
              >
                <h3 className="text-xl font-bold">{plan.name}</h3>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <span className="text-3xl font-bold">${plan.price[billingCycle]}</span>
                  <span className="text-gray-500">/{billingCycle}</span>
                </div>
                <p className="text-sm text-gray-600 mb-6">{plan.description}</p>

                <div className="mb-6">
                  <h4 className="font-medium mb-3">What's included</h4>
                  <ul className="space-y-2">
                    {plan.features[billingCycle].map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/payment"
                  className={`w-full py-2 px-4 rounded-md text-center block ${
                    plan.buttonVariant === "primary"
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : "border border-indigo-600 text-indigo-600 hover:bg-indigo-50"
                  }`}
                >
                  {plan.buttonText}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
