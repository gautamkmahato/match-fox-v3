"use client";

import { useState } from "react";
import axios from "axios";
import { Coins, CheckCircle, CreditCard } from "lucide-react";
import Modal from "@/components/Modal";
import { useUser } from "@clerk/nextjs";
import { PLAN_LIMITS } from "@/lib/utils/constants/plan";

// Central plan data
const plans = [
  {
    name: "Free Plan",
    tagline: "Give AI interviews a try",
    credits: 300,
    price: { monthly: 0, yearly: 0 },
    features: [
      "5 Min Mock Interview",
      "Resume Screening",
      "AI Resume Builder",
      "Basic Video Score Analysis",
      "Automated Interview Scheduling"
    ],
    highlighted: false,
    disabled: true,
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
    disabled: false,
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
    disabled: false,
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
    disabled: false,
  },
];

export default function BuyCredits() {
  const [selectedCycle, setSelectedCycle] = useState("monthly");
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [selectedCredits, setSelectedCredits] = useState(0); // default to Basic
  const [selectedPlan, setSelectedPlan] = useState("NA"); // default to Basic
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const { user } = useUser();

  console.log(user)

  const handlePurchase = async () => {
    /**
     * Use this when Razorpay will active
     */
    // setLoading(true);
    // try {
    //   const { data } = await axios.post(
    //     "/api/checkout",
    //     { credits: selectedCredits },
    //     { headers: { "Content-Type": "application/json" } }
    //   );
    //   window.location.href = data.url;
    // } catch (error) {
    //   console.error("Payment Error:", error);
    // }
    // setLoading(false);

    /**
     * For now show this modal
     */
    setModalOpen(true);
  };

  const handlePayment = async () => {

        if (!user?.id) return alert("User not found");

    setLoading(true);

    const res = await fetch("/api/checkout/razorpay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: selectedPrice,
        clerk_id: user?.id, // ✅ add this line
        credits: selectedCredits,
        plan: selectedPlan,
      })

    });

    const result = await res.json();

    console.log("result: ", result);

    if (!result.data?.id || !result?.state) {
      alert("Failed to create order");
      setLoading(false);
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: result.data.amount,
      currency: result.data.currency,
      name: "Cron Labs",
      clerk_id: user?.id,
      description: "Test Transaction",
      order_id: result.data.id,
      handler: async function (response) {
        const verifyRes = await fetch("/api/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(response),
        });

        const verify = await verifyRes.json();
        console.log("verify: ", verify);

        if (verify.state) {
          alert("✅ Payment Successful");
        } else {
          alert("❌ Payment verification failed");
        }
      },
      prefill: {
        name: "John Doe",
        email: "john@example.com",
        contact: "9999999999",
      },
      theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
    setLoading(false);
  };

  const handleSelection = (credits, priceObj, cycle) =>{
    setSelectedCredits(credits);
    const price = priceObj[cycle];
    setSelectedPrice(price);
    const planObj = PLAN_LIMITS[credits];
    console.log("planObj", planObj)
    const plan = planObj.name;
    console.log("credits", credits);
    console.log("price obj", priceObj);
    console.log("cycle", cycle);
    console.log("price", price);
    console.log("plan", plan);
    setSelectedPlan(plan)
  }

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
          className={`px-4 py-2 rounded-full text-sm font-semibold transition ${selectedCycle === "monthly"
              ? "bg-[#462eb4] text-white"
              : "bg-gray-200 text-gray-700"
            }`}
        >
          Monthly Plans
        </button>
        <button
          onClick={() => setSelectedCycle("yearly")}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition ${selectedCycle === "yearly"
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
            onClick={() => handleSelection(plan.credits, plan.price, selectedCycle)}
            className={`p-6 rounded-2xl shadow-md border cursor-pointer transition hover:shadow-lg ${selectedCredits === plan.credits
                ? "border-[#462eb4] ring-2 ring-[#462eb4]"
                : "border-gray-200"
              } ${plan.highlighted ? "border-yellow-300 ring-4 ring-yellow-300 shadow-2xl bg-white" : "bg-white"}
               ${plan.disabled ? "opacity-50 cursor-not-allowed pointer-events-none select-none": ""}
               `}
          >
            <h3 className={`text-xl font-bold mb-1 ${plan.highlighted ? "bg-white text-gray-800" : "bg-white"}`}>{plan.name}</h3>
            <p className={`text-xs ${plan.highlighted ? "text-gray-500" : "text-gray-500"} mb-2`}>{plan.tagline}</p>
            <div className={`flex items-center gap-2 text-md ${plan.highlighted ? "text-[#462eb4] text-lg font-extrabold" : "text-[#462eb4]"} font-semibold mb-2`}>
              <Coins className="w-5 h-5 text-yellow-500" />
              {plan.credits.toLocaleString()} Credits
            </div>
            <p className={`text-3xl mb-4 font-semibold ${plan.highlighted ? "text-gray-600" : "text-gray-600"}`}>
              ${plan.price[selectedCycle]} / {selectedCycle}
            </p>

            <ul className="text-sm space-y-2 mb-4">
              {plan.features.map((f, idx) => (
                <li key={idx} className={`flex items-center gap-2 ${plan.highlighted ? "text-gray-700" : "text-gray-700"}`}>
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
          onClick={handlePayment}
          disabled={loading}
          className="bg-[#462eb4] text-white px-8 py-3 rounded-md cursor-pointer font-semibold shadow-md hover:bg-indigo-800 transition disabled:opacity-50"
        >
          {loading ? "Processing..." : selectedCredits > 0 ? `Buy ${selectedCredits} Credits` : `Select Plan`}
        </button>
      </div>

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
              Razorpay is currently validating our application, Paymentt options will be available soon. Until then, enjoy free credits on us 🎉
            </p>
          </div>
        </div>
      </Modal>

    </div>
  );
}
