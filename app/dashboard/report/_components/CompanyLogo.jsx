import { useState } from 'react'

export default function CompanyLogo({ logo, company }) {
  const [imgError, setImgError] = useState(false)

//   const logo = report?.interview_attempts?.interviews?.company_logo
//   const company = report?.interview_attempts?.interviews?.company

  return (
    <>
      {logo && !imgError ? (
        <img
          src={logo}
          alt={company}
          onError={() => setImgError(true)}
          className="w-16 h-16 rounded-lg object-cover"
        />
      ) : (
        <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center">
          <h3 className="text-3xl font-semibold text-gray-700">
            {company?.charAt(0).toUpperCase()}
          </h3>
        </div>
      )}
    </>
  )
}
