'use client'

import { useState } from 'react'

export default function CompanyLogo({
  logo,
  company,
  width = 'w-16',
  height = 'h-16',
  className = '',
  rounded = 'rounded-full',
  text='text-sm'
}) {
  const [imgError, setImgError] = useState(false)

  return (
    <>
      {logo && !imgError ? (
        <img
          src={logo}
          alt={company}
          onError={() => setImgError(true)}
          className={`object-cover ${width} ${height} ${rounded} ${className}`}
        />
      ) : (
        <div
          className={`bg-gray-200 flex items-center justify-center ${width} ${height} ${rounded} ${className}`}
        >
          <p className={`${text} font-semibold text-gray-700`}>
            {company?.charAt(0).toUpperCase()}
          </p>
        </div>
      )}
    </>
  )
}
