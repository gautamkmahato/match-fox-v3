import { useState } from 'react'

export default function CandidateSummary({
  recommendation,
  score,
  completedTime,
  user: {   name,
    email,
    username,
    img_url,
  }
}
) {


  return (
    <>
      <Card className="p-4 flex gap-4 items-center">
  <img src={user.img_url} className="h-16 w-16 rounded-full object-cover" />
  <div className="flex flex-col">
    <h2 className="text-xl font-semibold">{user.name}</h2>
    <p className="text-sm text-gray-600">{user.email} • @{user.username}</p>
    <p className="mt-2 text-sm">
      Recommendation: <span className={recommendation ? 'text-green-600' : 'text-red-600'}>{recommendation ? 'YES' : 'NO'}</span>
    </p>
    <p className="text-sm">Score: {score}/10</p>
    <p className="text-sm text-gray-500">Completed At: {new Date(completedTime).toLocaleString()}</p>
  </div>
</Card>

    </>
  )
}
