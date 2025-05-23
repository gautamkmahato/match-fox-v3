'use client'

export const TextAreaField = ({
  value,
  onChange,
  placeholder = "",
  minHeight = "300px",
  required = true,
  disabled = false,
  ariaLabel = "",
  className = "",
}) => {
  return (
    <>
      <label className="block text-sm text-[#1D1D1F] font-medium mb-[-10px]">Job Description</label>
      <textarea
        className={`w-full bg-white px-4 py-3 text-sm rounded-md border border-[#D1D1D6] focus:outline-none focus:ring-2 focus:ring-[#A3A3FF] text-[#1D1D1F] placeholder-[#C7C7CC] mb-5 ${className}`}
        style={{ minHeight }}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-label={ariaLabel}
        required={required}
        disabled={disabled}
      />
    </>
  );
};