export const validateJobDescription = (description) => {
  if (!description.trim()) {
    return "Job description cannot be empty.";
  }
  if (description.trim().length < 50) {
    return "Job description should be at least 50 characters long.";
  }
  return null;
};