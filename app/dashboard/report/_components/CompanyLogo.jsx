'use client'

import { useState, useMemo } from 'react'

export default function CompanyLogo({
  logo,
  company,
  width = 'w-16',
  height = 'h-16',
  className = '',
  rounded = 'rounded-full',
  text = 'text-sm',
}) {
  const [imgError, setImgError] = useState(false)

  // Generate a random light pastel color (HSL)
  const bgColor = useMemo(() => {
    const hue = Math.floor(Math.random() * 360)
    return `hsl(${hue}, 70%, 85%)` // light pastel
  }, [company]) // stable across re-renders

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
          style={{ backgroundColor: bgColor }}
          className={`flex items-center justify-center ${width} ${height} ${rounded} ${className}`}
        >
          <p className={`${text} font-semibold text-gray-700`}>
            {company?.charAt(0).toUpperCase()}
          </p>
        </div>
      )}
    </>
  )
}
