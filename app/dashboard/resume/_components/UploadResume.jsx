'use client'

import { useState } from 'react'
import { UploadCloud, CheckCircle, Loader } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import uploadResume from '@/app/service/resume/uploadResume'

export default function UploadResume() {
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('');

  const { user } = useUser();

  const clerkId = user?.id; // Replace with real Clerk ID from context or prop

  const handleUpload = async () => {
    if (!file) return

    setStatus('uploading')

    const formData = new FormData()
    formData.append('file', file)
    formData.append('clerkId', clerkId)

    const data = await uploadResume(formData);

    if (data?.state) {
      setStatus('success')
      setMessage(data.message)
    } else {
      setStatus('error')
      setMessage(data.error || 'Something went wrong')
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-20 p-6 bg-white shadow rounded-xl space-y-6 border border-gray-200">
      <h1 className="text-2xl font-bold text-center">Upload Resume</h1>

      <div className="flex flex-col items-center gap-4">
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="text-sm"
        />

        <button
          onClick={handleUpload}
          disabled={!file || status === 'uploading'}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {status === 'uploading' ? <Loader className="animate-spin w-4 h-4" /> : <UploadCloud className="w-4 h-4" />}
          Upload
        </button>

        {status === 'success' && (
          <div className="flex items-center text-green-600 gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>{message}</span>
          </div>
        )}

        {status === 'error' && (
          <div className="text-red-600 text-sm">{message}</div>
        )}
      </div>
    </div>
  )
}
