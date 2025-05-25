"use client"

import { Check } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function PricingPlans() {
  const [billingCycle, setBillingCycle] = useState("monthly")

  const plans = [
    {
      name: "Free Plan",
      price: billingCycle === "monthly" ? 0 : 0,
      description: "Give it a try",
      features: [
        "5 Min Mock Interview",
        "Resume screening",
        "Automated interview scheduling",
        "AI Resume Creator",
        "AI Video Score Analysis",
      ],
      buttonText: "Choose Plan",
      buttonVariant: "outline",
      highlighted: false,
    },
    {
      name: "Basic Plan",
      price: billingCycle === "monthly" ? 10 : 99,
      description: "Quickly prepare for Interview",
      features: [
        "150 Min Mock Interview",
        "Resume screening",
        "Automated interview scheduling",
        "AI Resume Creator",
        "AI Video Score Analysis",
      ],
      buttonText: "Choose Plan",
      buttonVariant: "outline",
      highlighted: false,
    },
    {
      name: "Professional Plan",
      price: billingCycle === "monthly" ? 25 : 249,
      description: "Best for interview preparation",
      features: [
        "450 Min Mock Interview",
        "Basic Plan Features",
        "Customizable assessments",
        "Comprehensive data analytics",
        "Interview Report Analytics",
      ],
      buttonText: "Choose and Get 20%",
      buttonVariant: "primary",
      highlighted: true,
    },
    {
      name: "Enterprise Plan",
      price: billingCycle === "monthly" ? 99 : 999,
      description: "For Large Organizations",
      features: [
        "2000 Min Mock Interview",
        "Pro Plan Features",
        "Additional customization options",
        "Dedicated support",
        "Advanced integrations",
      ],
      buttonText: "Choose Plan",
      buttonVariant: "outline",
      highlighted: false,
    },
  ]

  return (
    <div className="bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Choose the Perfect Plan for
            <br />
            Your Interview Needs
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our Basic Plan is ideal for startups and small businesses looking to optimize their hiring process.
          </p>

          <div className="flex items-center justify-center mt-8 space-x-4">
            <span className={`text-sm ${billingCycle === "monthly" ? "font-semibold" : ""}`}>Monthly</span>
            <button
              onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
              className="relative inline-flex h-6 w-11 items-center rounded-full"
            >
              <span
                className={`absolute h-5 w-5 rounded-full transition ${
                  billingCycle === "yearly"
                    ? "translate-x-6 bg-indigo-600"
                    : "translate-x-1 bg-indigo-600"
                }`}
              />
              <span
                className={`absolute inset-0 rounded-full ${
                  billingCycle === "yearly" ? "bg-indigo-200" : "bg-indigo-200"
                }`}
              />
            </button>
            <span className={`text-sm ${billingCycle === "yearly" ? "font-semibold" : ""}`}>
              Yearly <span className="text-xs text-indigo-600 font-medium">20% OFF</span>
            </span>
          </div>
        </div>

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
                  <span className="text-3xl font-bold">${plan.price}</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <p className="text-sm text-gray-600 mb-6">{plan.description}</p>

                <div className="mb-6">
                  <h4 className="font-medium mb-3">What's included</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                href='/payment'
                  className={`w-full py-2 px-4 rounded-md text-center ${
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
  )
}
