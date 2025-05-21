import { useState } from 'react';
import { useRouter } from 'next/navigation';


export const useReport = (interviewAttemptId, conversationsRef, stopCall) => {
  const [loadingReport, setLoadingReport] = useState(false);
  const [loadingGenerateReport, setLoadingGenerateReport] = useState(false);
  const [reportError, setReportError] = useState('');
  const [reportGenerated, setReportGenerated] = useState(false);


  const router = useRouter();


  const generateReport = async () => {
    try {
      setLoadingGenerateReport(true)
      const input = {
        conversations: conversationsRef.current

      }
      console.log(input)
      const response = await fetch(`/api/generate-report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(input)
      })
      const result = await response.text();
      console.log(result)
      return result;
    } catch (err) {
      console.log(err);
      setReportError('Error in Generating Report: ', err);
      setLoadingGenerateReport(false)
    } finally {
      setLoadingGenerateReport(false)
    }
  }

  const handleCall = async () => {
    if (reportGenerated || loadingReport || loadingGenerateReport) return;
  setReportGenerated(true);
    console.log("interview completed");
    await stopCall()
    console.log("generate Report called...")
    const report = await generateReport();
    const cleanedReport = report.replace("```json\n", "").replace("```", "")
    const jsonData = JSON.parse(cleanedReport);
    console.log(jsonData)
    console.log(jsonData?.final_verdict?.recommendation)
    console.log(jsonData?.final_verdict?.score)

    // first call the llm to generate the report
    // then call the backend to store the interview report
    try {
      setLoadingReport(true)
      const input = {
        interview_attempt_id: interviewAttemptId,
        recommendation: jsonData?.final_verdict?.recommendation === 'YES' ? true : false,
        score: jsonData?.final_verdict?.score,
        duration: 15,
        report: jsonData,
      };
      console.log("input: ", input)

      const res = await fetch('/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
      });

      const result = await res.json();
      console.log('Submit result:', result);

      if (!result.state) {
        setReportError('Failed to save the report')
      }

      router.push('/dashboard/report')

    } catch (err) {
      console.error(err);
      setReportError('Something went wrong: ', err);
      setLoadingReport(false);
    } finally {
      setLoadingReport(false); 
  
    }
  }

  return {
    loadingReport,
    loadingGenerateReport,
    reportError,
    handleCall
  };
};