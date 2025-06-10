"use client";

import { useEffect } from "react";
import Script from "next/script";

export default function PayPalButton({ amount }) {
  useEffect(() => {
    // Prevent rendering more than once
    const hasRendered = document.getElementById("paypal-button-container")?.hasChildNodes();
    if (hasRendered || !window.paypal) return;

    window.paypal.Buttons({
      createOrder: async () => {
        const res = await fetch("/api/paypal/create-order", {
          method: "POST",
          body: JSON.stringify({ amount }),
        });
        const data = await res.json();
        return data.id;
      },
      onApprove: async (data) => {
        const res = await fetch("/api/paypal/capture-order", {
          method: "POST",
          body: JSON.stringify({ orderID: data.orderID }),
        });
        const result = await res.json();
        alert("✅ Payment Successful!");
      },
      onError: (err) => {
        console.error("❌ PayPal Error:", err);
        alert("❌ Payment failed");
      },
    }).render("#paypal-button-container");
  }, [amount]);

  return (
    <>
      <Script
        src={`https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=USD`}
        strategy="beforeInteractive"
      />
      <h1 className="text-xl mb-4">Pay with PayPal</h1>
      <div id="paypal-button-container" />
    </>
  );
}
