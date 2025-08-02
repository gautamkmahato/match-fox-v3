"use client";

import { useState } from "react";
import axios from "axios";
import { Coins, CheckCircle, CreditCard } from "lucide-react";
import Modal from "@/components/Modal";
import { useUser } from "@clerk/nextjs";
import { PLAN_LIMITS } from "@/lib/utils/constants/plan";

// Central plan data with monthly and yearly feature variations
const plans = [
  {
    name: "Free Plan",
    tagline: "Give AI interviews a try",
    credits: { monthly: 300, yearly: 300 },
    price: { monthly: 0, yearly: 0 },
    displayPrice: { monthly: 0, yearly: 0 },
    features: {
      monthly: [
        "5 Min Mock Interview",
        "Resume Screening",
        "AI Resume Builder",
        "Basic Video Score Analysis",
        "Automated Interview Scheduling"
      ],
      yearly: [
        "60 Min Mock Interview",
        "Resume Screening",
        "AI Resume Builder",
        "Basic Video Score Analysis",
        "Automated Interview Scheduling"
      ]
    },
    highlighted: false,
    disabled: true,
    productId: {
      monthly: process.env.NEXT_PUBLIC_DODO_PAYMENTS_BASIC_MONTHLY,
      yearly: process.env.NEXT_PUBLIC_DODO_PAYMENTS_BASIC_MONTHLY
    }
  },
  {
    name: "Basic Plan",
    tagline: "Kickstart your interview prep",
    credits: { monthly: 9000, yearly: 108000 },
    price: { monthly: 1500, yearly: 15000 },
    displayPrice: { monthly: 20, yearly: 199 },
    features: {
      monthly: [
        "150 Min Mock Interview",
        "AI Resume Creator",
        "Automated Interview Scheduling",
        "Resume Screening",
        "Video Feedback",
        "Interview Tips by AI"
      ],
      yearly: [
        "1800 Min Mock Interview",
        "AI Resume Creator",
        "Automated Interview Scheduling",
        "Resume Screening",
        "Video Feedback",
        "Interview Tips by AI"
      ]
    },
    highlighted: false,
    disabled: false,
    productId: {
      monthly: process.env.NEXT_PUBLIC_DODO_PAYMENTS_BASIC_MONTHLY,
      yearly: process.env.NEXT_PUBLIC_DODO_PAYMENTS_BASIC_YEARLY
    }
  },
  {
    name: "Professional Plan",
    tagline: "Best for regular practice",
    credits: { monthly: 27000, yearly: 324000 },
    price: { monthly: 3999, yearly: 39999 },
    displayPrice: { monthly: 49, yearly: 499 },
    features: {
      monthly: [
        "450 Min Mock Interview",
        "All Basic Plan Features",
        "AI Interview Insights",
        "Customizable Assessments",
        "Comprehensive Analytics",
        "Live Coding Scenarios"
      ],
      yearly: [
        "5400 Min Mock Interview",
        "All Basic Plan Features",
        "AI Interview Insights",
        "Customizable Assessments",
        "Comprehensive Analytics",
        "Live Coding Scenarios"
      ]
    },
    highlighted: true,
    disabled: false,
    productId: {
      monthly: process.env.NEXT_PUBLIC_DODO_PAYMENTS_PROFESSIONAL_MONTHLY,
      yearly: process.env.NEXT_PUBLIC_DODO_PAYMENTS_PROFESSIONAL_YEARLY
    }
  },
  {
    name: "Enterprise Plan",
    tagline: "For teams and organizations",
    credits: { monthly: 120000, yearly: 1440000 },
    price: { monthly: 14999, yearly: 149999 },
    displayPrice: { monthly: 199, yearly: 1999 },
    features: {
      monthly: [
        "2000 Min Mock Interview",
        "All Pro Plan Features",
        "Dedicated AI Coach",
        "Advanced Reporting",
        "Team Management",
        "Slack/Zoom Integration"
      ],
      yearly: [
        "24000 Min Mock Interview",
        "All Pro Plan Features",
        "Dedicated AI Coach",
        "Advanced Reporting",
        "Team Management",
        "Slack/Zoom Integration"
      ]
    },
    highlighted: false,
    disabled: false,
    productId: {
      monthly: process.env.NEXT_PUBLIC_DODO_PAYMENTS_ENTERPRISE_MONTHLY,
      yearly: process.env.NEXT_PUBLIC_DODO_PAYMENTS_ENTERPRISE_YEARLY
    }
  },
];

export default function BuyCredits() {
  const [selectedCycle, setSelectedCycle] = useState("monthly");
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [selectedCredits, setSelectedCredits] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState("NA");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [productId, setProductId] = useState("");

  const { user } = useUser();

  const handlePayment = async () => {
    if (!user?.id) return alert("User not found");

    try {
      setLoading(true)

      const res = await fetch('/api/phonepe/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Number(selectedPrice),
          merchantOrderId: 'order-' + Date.now(),
          userId: user?.id,
        }),
      })

      const data = await res.json()
      // console.log("PG_CHECKOUT result:", data)

      if (data?.fullResponse?.redirectUrl) {
        window.location.href = data.fullResponse.redirectUrl;
      } else {
        alert("Payment initiation failed: " + (data.fullResponse?.message || "Unknown error"))
      }

    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false);
    }

  };

  const handleSelection = (credits, priceObj, cycle, productObj) => {
    const price = priceObj[cycle];
    const planObj = PLAN_LIMITS[credits];
    const plan = planObj?.name || "NA";
    const productId = productObj[cycle];
    console.log(productObj)
    console.log(productId)
    setSelectedCredits(credits);
    setSelectedPrice(price);
    setSelectedPlan(plan);
    setProductId(productId);
  };

  const handleCheckout = async () => {
  setLoading(true);

  if (!productId || typeof productId !== "string" || !productId.startsWith("pdt_")) {
    alert("Invalid or missing product ID");
    setLoading(false);
    return;
  }

  try {
    const res = await fetch("/api/dodo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        billing: {
          city: "Texas",
          country: "US",
          state: "Texas",
          street: "56, hhh",
          zipcode: "560000",
        },
        customer: {
          email: user?.emailAddresses[0]?.emailAddress || "hirenom.test@gmail.com",
          name: user?.firstName || "Test User",
        },
        metadata: {
          clerk_id: user?.id ?? "unknown", // Only clerk_id, rest will be handled server-side
        },
        payment_link: true,
        product_id: String(productId),
        quantity: 1,
        billing_currency: "USD",
        return_url: "https://hirenom.com",
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Checkout failed:", errorData);
      alert(`Checkout failed: ${errorData.error || "Unknown error"}`);
      setLoading(false);
      return;
    }

    const result = await res.json();
    console.log("Redirect URL:", result.url);

    if (result.url) {
      window.location.href = result.url;
    } else {
      alert("No checkout URL received.");
    }

  } catch (err) {
    console.error("Error during checkout:", err);
    alert("Something went wrong. Please try again later.");
  } finally {
    setLoading(false);
  }
};


  return (
    <>
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-2">
          Choose your right plan!
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Select from best plans, ensuring a perfect match. Need more or less? Customize your subscription for a seamless fit!
        </p>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-gray-100 rounded-full p-1">
            <button
              onClick={() => setSelectedCycle("monthly")}
              className={`px-6 py-2 text-sm font-medium rounded-full transition ${selectedCycle === "monthly" ? "bg-[#462eb4] text-white" : "text-gray-700"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setSelectedCycle("yearly")}
              className={`px-6 py-2 text-sm font-medium rounded-full transition ${selectedCycle === "yearly" ? "bg-[#462eb4] text-white" : "text-gray-700"}`}
            >
              Yearly (Save 20%)
            </button>
          </div>
        </div>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan) => {
            const isSelected = selectedCredits === plan.credits[selectedCycle];
            return (
              <div
                key={plan.name}
                onClick={() =>
                  handleSelection(plan.credits[selectedCycle], plan.price, selectedCycle, plan.productId)
                }
                className={`p-8 rounded-3xl shadow-xl border transition hover:shadow-2xl cursor-pointer bg-gradient-to-br from-white to-purple-50 ${isSelected ? "ring-4 ring-[#462eb4] border-transparent" : "border-gray-200"} ${plan.highlighted ? "bg-white ring-4 ring-yellow-300" : ""} ${plan.disabled ? "opacity-50 pointer-events-none select-none" : ""}`}
              >
                <div className="mb-4">
                  <h3 className=" text-sm font-bold text-white bg-[#462eb4] px-3 py-1 inline-block rounded-md">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{plan.tagline}</p>
                </div>

                <div className="flex items-center gap-2 mb-2 text-md font-semibold text-[#462eb4]">
                  <Coins className="w-5 h-5 text-yellow-500" />
                  {plan.credits[selectedCycle]} Credits
                </div>

                <p className="text-3xl font-bold text-gray-800 mb-6">
                  ${plan.displayPrice[selectedCycle]} / {selectedCycle}
                </p>

                <ul className="text-sm space-y-2 mb-6">
                  {plan.features[selectedCycle].map((f, idx) => (
                    <li key={idx} className="flex items-center text-gray-700 gap-2">
                      <CheckCircle className="text-green-500 w-4 h-4" /> {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCheckout();
                  }}
                  disabled={!isSelected || loading}
                  className={`w-full mt-4 py-2 px-4 rounded-xl font-semibold text-white transition ${isSelected ? "bg-[#462eb4] hover:bg-indigo-700" : "bg-gray-300 cursor-not-allowed"}`}
                >
                  {loading && isSelected ? "Processing..." : "Pay Now"}
                </button>
              </div>
            );
          })}
        </div>

        {/* Modal */}
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Interview Report"
          width="max-w-lg"
        >
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 flex items-center gap-4 max-w-md mx-auto mt-10">
            <div className="bg-indigo-100 text-indigo-600 p-3 rounded-full">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-800">
                Payments Temporarily Unavailable
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Razorpay is currently validating our application. Payment options will be available soon. Until then, enjoy free credits on us 🎉
              </p>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}
