'use client';

import { useContext, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import CallComponent from "./CallComponent";
import InterviewJoinScreen from "./InterviewJoinScreen";
import fetchInterviewDetails from "@/app/service/interview/fetchInteviewDetails";
import { toast } from "sonner";
import LoadingOverlay from "@/components/LoadingOverlay";
import { UsageContext } from "@/app/context/usageContext";

export default function InterviewPage({ interviewId }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [interviewAccess, setInterviewAccess] = useState(false);
  const [showCallComponent, setShowCallComponent] = useState(false);
  const [interviewData, setInterviewData] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState("");

  const { isSignedIn, user, isLoaded } = useUser();
  const { usage, usageLoading } = useContext(UsageContext);
 
  // Validate user and get Interview details
  useEffect(() => {
    validateUser();
  }, [user, interviewId]);

  async function validateUser() {
      if (!user?.id) return;

      try {
        setLoadingMessage("Fetching Interview Details...");
        const response = await fetch(`/api/interview/validate/${interviewId}`)
        const result = await response.json();
        // console.log('Validation result:', result);

                toast.success("Interview details loaded");

        if (!result.state) {
          if (result.error?.includes('Please create your interview')) {
            setInterviewAccess(true);
                    toast.error(err.message || 'Please create your interview');

          } else {
            setError(result.error || 'Validation failed');
            toast.error(err.message || 'Validation failed');
          }
          return;
        }

        // If Valid user with correct owner interview
        if (result.state) {
          setInterviewAccess(true);
          setInterviewData(result?.data)
        }

      } catch (err) {
        // console.log(err);
        setError('Something went wrong validating user');
      } finally {
        setLoading(false);
      }
  }

  // // fetch Interview Details
  // useEffect(() => {
  //   const getDetails = async () => {
  //     setLoading(true);
  //     try {
  //       setLoadingMessage("Fetching Interview Details...");
  //       const result = await fetchInterviewDetails(interviewId);
  //       if (!result.state) throw new Error(result.error);
  //       console.log("Interview Data: ", interviewData)
  //       setInterviewData(result.data);
  //       toast.success("Interview details loaded");
  //     } catch (err) {
  //       toast.error(err.message || 'Failed to load interview');
  //       setError(err.message || 'Failed to load interview');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (interviewId) getDetails();
  // }, [interviewId]); 

  // Handle Join Interview (form submit)
  const handleJoinInterview = async () => {
    /**
     * Here you can check and validate for Camera, Mic, Internet speed
     * For Now I am just validating the user and allowing for call
     */
    setShowCallComponent(true);
  };

  // --- Conditional UI ---

  if(usageLoading){
    return(
      <>
        <div className="text-center mt-20 text-gray-600">Loading...</div>;
      </>
    )
  }

  if (!isLoaded || loading) {
    return <div className="text-center mt-20 text-gray-600">Loading...</div>;
  }

  if (!isSignedIn) {
    return (
      <div className="text-center mt-20">
        <p className="text-red-600 font-semibold">Please sign in to continue</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-red-600 font-semibold text-lg mb-2">Error</h2>
        <p className="text-gray-700">{error}</p>
        <a href="/dashboard/report" className="text-blue-600 underline mt-4 block">
          Go to Report Dashboard
        </a>
      </div>
    ); 
  }

  if(loading){
      return(
        <>
          <LoadingOverlay text={loadingMessage} />
        </>
      )
    }
 
  if (showCallComponent) {
    return <CallComponent interviewId={interviewId} interviewData={interviewData} leftUsage={usage} />;
  }  

  if (!interviewAccess) {
    return ( 
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h2 className="text-xl font-semibold text-red-600 mb-4">Dont have Interview access</h2>
        <p className="text-gray-700">Please create new interview.</p>
        <a href="/dashboard/interview/create" className="mt-4 text-blue-600 underline">Create Interview</a>
      </div>
    );
  }

  if (interviewAccess) {
    return <InterviewJoinScreen onJoinInterview={handleJoinInterview} interviewData={interviewData} />;
  }

  return null; // Fallback state
}
