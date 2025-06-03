'use client';

import { useUser } from "@clerk/nextjs";
import { useState } from "react";

export default function Checkout() {
  const [loading, setLoading] = useState(false);

  const { user } = useUser();

  // console.log(user)


  const handlePayment = async () => {
        if (!user?.id) return alert("User not found");

  setLoading(true);

  const res = await fetch("/api/checkout/razorpay", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
  amount: 499,
  clerk_id: user?.id, // ✅ add this line
})

  });

  const result = await res.json();

  // console.log("result: ", result);

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


  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="bg-blue-600 text-white px-4 py-2 rounded"
    >
      {loading ? "Processing..." : "Pay ₹499"}
    </button>
  );
}
