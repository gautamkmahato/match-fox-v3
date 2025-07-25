'use client'
import { useState } from 'react'

export default function PhonePeButton() {
  const [loading, setLoading] = useState(false)

  const handlePay = async () => {
    setLoading(true)

    const res = await fetch('/api/phonepe/initiate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: 10,
        merchantOrderId: 'order-' + Date.now(),
        userId: 'user-123',
      }),
    })

    const data = await res.json()
    console.log("PG_CHECKOUT result:", data)

    if (data?.fullResponse?.redirectUrl) {
      window.location.href = data.fullResponse.redirectUrl;
    } else {
      alert("Payment initiation failed: " + (data.fullResponse?.message || "Unknown error"))
    }

    setLoading(false)
  }

  return (
    <button onClick={handlePay} disabled={loading}>
      {loading ? 'Redirecting…' : 'Pay ₹10 via PhonePe'}
    </button>
  )
}
