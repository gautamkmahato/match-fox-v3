'use client'
import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function SuccessPage() {
  const params = useSearchParams()
  const txnId = params.get('merchantTransactionId')
  const [status, setStatus] = useState('Verifying…')

  useEffect(() => {
    if (!txnId) return setStatus('Missing transaction ID')
    fetch(`/api/phonepe/status?merchantTransactionId=${txnId}`)
      .then(res => res.json())
      .then(d => setStatus(d.data?.status || d.message || 'Unknown'))
      .catch(() => setStatus('Failed to verify'))
  }, [txnId])

  return (
    <div>
      <h2>Payment Status</h2>
      <p>{status}</p>
    </div>
  )
}
