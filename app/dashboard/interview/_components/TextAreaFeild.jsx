'use client'

export const TextAreaField = ({
  value,
  onChange,
  placeholder = "",
  minHeight = "150px",
  required = true,
  disabled = false,
  ariaLabel = "",
  className = "",
}) => {
  return (
    <>
      <label className="block font-medium">Difficulty Level</label>
      <textarea
        className={`border p-3 rounded-md resize-none ${className}`}
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