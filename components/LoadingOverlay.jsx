'use client'

import { Loader2 } from 'lucide-react'

export default function LoadingOverlay({ text }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-white" />
        <p className="text-white text-lg font-medium">{text}...</p>
      </div>
    </div>
  )
}
