
import { useState, useEffect } from 'react';

export const useInterviewData = (interviewId) => {
  const [interviewDetails, setInterviewDetails] = useState(null);
  const [questions, setQuestions] = useState('');
  const [loadingInterview, setLoadingInterview] = useState(false);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [interviewError, setInterviewError] = useState('');

  const fetchInterview = async () => {
    setLoadingInterview(true);
    setInterviewError('');

    try {
      const response = await fetch(`/api/interviews/${interviewId}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch interview data');
      }

      if (!result?.data) {
        throw new Error('No interview data found');
      }

      const input = {
        job_description: result.data.job_description,
        company: result.data.company,
        company_logo: result.data.company_logo,
        interview_style: result.data.interview_style,
        position: result.data.position,
        difficulty_level: result.data.difficulty_level,
        experience: result.data.experience,
        duration: result.data.duration,
        interview_name: result.data.interview_name,
        location: result.data.location
      }; 
      setInterviewDetails(input);

      await generateQuestions(input);
    } catch (err) {
      setInterviewError(err.message || 'Something went wrong');
    } finally {
      setLoadingInterview(false);
    }
  };

  const generateQuestions = async (input) => {
    setLoadingQuestions(true);
    try {
      const response = await fetch('/api/generate-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        setInterviewError('Failed to generate questions');
        throw new Error('Failed to generate questions');
      }
      const result = await response.text();
      console.log('Generated Questions:', result);
      setQuestions(result);

    } catch (err) {
      setInterviewError(err.message || 'Error generating questions');
    } finally {
      setLoadingQuestions(false);
    }
  };

  useEffect(() => {
    if (!interviewId) return;
    fetchInterview();
  }, [interviewId]);

  return {
    interviewDetails,
    questions,
    loadingInterview,
    loadingQuestions,
    interviewError,
    fetchInterview,
    generateQuestions
  };
};