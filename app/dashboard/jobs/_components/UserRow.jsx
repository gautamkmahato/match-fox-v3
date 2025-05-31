import { useState } from 'react'
import { CheckCircle, CircleDot, AlertCircle, ArrowRight, ArrowDown } from 'lucide-react'
import CandidateDetailsTabs from './CandidateDetailsTabs'

export default function UserRow({ index, report, user, interviewAttempts }) {
  const [showDetails, setShowDetails] = useState(false)

  const statusColor = {
    successful: 'text-green-600',
    'in-progress': 'text-yellow-500',
    canceled: 'text-red-500',
  }

  const statusDot = {
    successful: <CheckCircle className={`w-4 h-4 ${statusColor[interviewAttempts.status]}`} />,
    'in-progress': <CircleDot className={`w-4 h-4 ${statusColor[interviewAttempts.status]}`} />,
    canceled: <AlertCircle className={`w-4 h-4 ${statusColor[interviewAttempts.status]}`} />,
  }

  return (
    <>
      <tr className="border-t border-gray-200">
        <td className="px-4 py-3 flex items-center gap-2">
          {user.img_url ? (
            <img src={user?.img_url} alt={user?.name} className="w-8 h-8 rounded-full" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold">
              {user?.name[0].toUpperCase()}
            </div>
          )}
          <div className="flex items-center gap-1">
            <span className="font-medium text-sm">{user.name}</span>
          </div>
        </td>
        <td className="px-4 py-3">
          <div className="flex items-center gap-1">
            {statusDot[interviewAttempts.status]}
            <span>{interviewAttempts.status}</span>
          </div>
        </td>
        <td className="px-4 py-3 text-sm text-center">{report?.score}</td>
        <td className="px-4 py-3 text-xs text-center">
          <span className={`${report?.recommendation ? 'bg-green-300 px-4 py-1 rounded-lg' : 'bg-red-300 px-3 py-1.5 rounded-full'}`}>
            {report?.recommendation ? 'Yes' : 'No'}
          </span>
        </td>
        <td className="px-4 py-3 text-sm text-center">
          <button
            onClick={() => setShowDetails((prev) => !prev)}
            className="w-fit flex items-center gap-2 bg-[#462eb4] text-white px-4 py-2 text-xs rounded-md hover:bg-gradient-to-b hover:from-indigo-600 hover:to-indigo-950 cursor-pointer"
          >
            {showDetails ? 'Hide Details' : 'View Details'}
            {showDetails ? <ArrowDown className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
          </button>
        </td>
      </tr>

      {showDetails && (
        <tr>
          <td colSpan={5} className="px-4 py-4 bg-gray-50">
            <CandidateDetailsTabs user={user} interviewAttempts={interviewAttempts} report={report} />
          </td>
        </tr>
      )}
    </>
  )
}
