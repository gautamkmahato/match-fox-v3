'use client';

import { useState } from "react";

export default function Checkout() {
  const [loading, setLoading] = useState(false);

  const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true); // already loaded

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};


  const handlePayment = async () => {
  setLoading(true);

  const scriptLoaded = await loadRazorpayScript();
  if (!scriptLoaded) {
    alert("Failed to load Razorpay SDK.");
    setLoading(false);
    return;
  }

  const res = await fetch("/api/checkout/razorpay", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount: 499 }) // ₹499
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
