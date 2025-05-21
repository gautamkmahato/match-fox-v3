"use client"

import { Check } from "lucide-react"
import { useState } from "react"

export default function PricingPlans() {
  const [billingCycle, setBillingCycle] = useState("monthly")

  const plans = [
    {
      name: "Basic Plan",
      price: billingCycle === "monthly" ? 12 : 9.6,
      description: "For startups and small businesses",
      features: ["Resume screening", "Automated interview scheduling", "Virtual interviews", "AI Video Score Analysis"],
      buttonText: "Choose Plan",
      buttonVariant: "outline",
      highlighted: false,
    },
    {
      name: "Pro Plan",
      price: billingCycle === "monthly" ? 50 : 40,
      description: "For Growing Companies",
      features: [
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
      price: billingCycle === "monthly" ? 100 : 80,
      description: "For Large Organizations",
      features: ["Pro Plan Features", "Additional customization options", "Dedicated support", "Advanced integrations"],
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
            Your Hiring Needs
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
                className={`absolute h-5 w-5 rounded-full transition ${billingCycle === "yearly" ? "translate-x-6 bg-purple-600" : "translate-x-1 bg-purple-600"}`}
              />
              <span
                className={`absolute inset-0 rounded-full ${billingCycle === "yearly" ? "bg-purple-200" : "bg-purple-200"}`}
              />
            </button>
            <span className={`text-sm ${billingCycle === "yearly" ? "font-semibold" : ""}`}>
              Yearly <span className="text-xs text-purple-600 font-medium">20% OFF</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg overflow-hidden shadow-md ${plan.highlighted ? "transform md:-translate-y-2" : ""}`}
            >
              <div className={`p-6 ${plan.highlighted ? "bg-purple-600 text-white" : "bg-purple-800 text-white"}`}>
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

                <button
                  className={`w-full py-2 px-4 rounded-md text-center ${
                    plan.buttonVariant === "primary"
                      ? "bg-purple-600 text-white hover:bg-purple-700"
                      : "border border-purple-600 text-purple-600 hover:bg-purple-50"
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
