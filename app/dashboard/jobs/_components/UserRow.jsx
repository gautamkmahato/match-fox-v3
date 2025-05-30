'use client'

import { CheckCircle, CircleDot, AlertCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function UserRow({ report, user, interviewAttempts }) {
  const statusColor = {
    "successful": 'text-green-600',
    "in-progress": 'text-yellow-500',
    "canceled": 'text-red-500',
  }
  console.log(interviewAttempts.status)

  const statusDot = {
    "successful": <CheckCircle className={`w-4 h-4 ${statusColor[interviewAttempts.status]}`} />,
    "in-progress": <CircleDot className={`w-4 h-4 ${statusColor[interviewAttempts.status]}`} />,
    "canceled": <AlertCircle className={`w-4 h-4 ${statusColor[interviewAttempts.status]}`} />,
  }

  return (
    <tr className="border-t border-gray-200">
      <td className="px-4 py-3 flex items-center gap-2">
        {user.avatar ? (
          <img src={user?.img_url} alt={user?.name} className="w-8 h-8 rounded-full" />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold">
            {user?.name[0].toUpperCase()}
          </div>
        )}
        <div className="flex items-center gap-1">
          <span className="font-medium text-sm">{user.name}</span>
          {/* {user.verified && <CheckCircle className="w-4 h-4 text-blue-500" />} */}
        </div>
      </td>
        <td className="px-4 py-3">
            <div className='flex items-center gap-1'>
                <span>{statusDot[interviewAttempts.status]}</span>
                <span>{interviewAttempts.status}</span>
            </div>
        </td>
      <td className="px-4 py-3 text-sm text-center">{report?.score}</td>
      <td className={`px-4 py-3 text-xs text-center `}>
        <span className={`${report?.recommendation ? 'bg-green-300 px-4 py-1 rounded-lg' : 'bg-red-300 px-3 py-1.5 rounded-full'}`}>
          {report?.recommendation ? 'Yes' : 'No'}
        </span>
      </td>
      <td className="px-4 py-3 text-sm text-center">
        <Link
          href={`/dashboard`}
          className="w-fit flex items-center gap-2 bg-[#462eb4] text-white px-4 py-2 text-xs rounded-md hover:bg-gradient-to-b hover:from-indigo-600 hover:to-indigo-950 cursor-pointer"
        >
          View Details
          <ArrowRight className="w-3 h-3" />
        </Link>
      </td>
    </tr>
  )
}
