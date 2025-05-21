"use client";

import { useState } from "react";
import axios from "axios";
import { Coins } from "lucide-react";
 
export default function BuyCredits() {
  const [credits, setCredits] = useState(100);
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/checkout", { credits }, {
        headers: { "Content-Type": "application/json" } // ✅ Ensure JSON format
      });
      window.location.href = data.url;
    } catch (error) {
      console.error("Payment Error:", error);
    }
    setLoading(false);
  };
  

  return (
    <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-lg">
      <Coins className="text-yellow-500 w-10 h-10" />
      <h2 className="text-xl font-semibold mt-2">Buy Credits</h2>
      <p className="text-gray-500">Select credits to purchase</p>

      <select
        className="mt-4 border p-2 rounded-lg"
        value={credits}
        onChange={(e) => setCredits(Number(e.target.value))}
      >
        <option value="100">100 Credits - $10</option>
        <option value="500">500 Credits - $50</option>
        <option value="1000">1000 Credits - $100</option>
      </select>

      <button
        onClick={handlePurchase}
        className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg flex items-center"
        disabled={loading}
      >
        {loading ? "Processing..." : "Buy Now"}
      </button>
    </div>
  );
}