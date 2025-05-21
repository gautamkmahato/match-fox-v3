'use client'

export const SubmitButton = ({
  isLoading,
  loadingText = "Processing...",
  defaultText = "Submit",
  className = "",
  disabled = false,
}) => {
  return (
    <button
      type="submit"
      disabled={isLoading || disabled}
      className={`bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50 ${className}`}
    >
      {isLoading ? loadingText : defaultText}
    </button>
  );
};