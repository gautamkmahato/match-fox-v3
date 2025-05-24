'use client';

import { useEffect, useState } from "react";
import {
  Video,
  PhoneOff,
  Mic,
  MicOff,
  VideoOff,
  PhoneIcon
} from "lucide-react";
import updateTimeUsage from "@/app/service/interview/updateTimeUsage";
import { useRouter } from "next/navigation";
import generateReport from "@/app/service/interview/generateReport";
import submitInteviewAttempt from "@/app/service/interview/submitInteviewAttempt";
import saveInterviewReport from "@/app/service/interview/saveInterviewReport";
import { deriveStatus, extractScoreAndRecommendation, parseGeneratedReport } from "@/lib/utils/helper";
import { toast } from "sonner";
import LoadingOverlay from "@/components/LoadingOverlay";
import avatar from '../../../../public/avatar.jpg'
import CameraComponent from "./CameraComponent";
import Image from "next/image";

export default function VideoCallUI({
  interviewId,
  interviewData,
  startCall,
  stopCall,
  assistantSpeaking,
  chatMessages,
  conversationsRef,
  onErrorCall 
}) {
  const [callTime, setCallTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [callStatus, setCallStatus] = useState(false);
  const [callStartTime, setCallStartTime] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [buttonStatus, setButtonStatus] = useState(true);
  const router = useRouter();

  console.log("interview data", interviewData)

  useEffect(() => {
    if (!callStatus) return;
    const timer = setInterval(() => {
      setCallTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [callStatus]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const handleStartCall = () => {
    startCall();
    setCallStatus(true);
    setCallStartTime(new Date().toISOString());
    toast("Call started, wait for few seconds...");
  };

  const handleEndCall = async () => {
    try {
      stopCall();
      setCallStatus(false);
      toast("Call ended");
      setButtonStatus(false);
      setLoading(true);

      const updateResult = await handleUpdateUsage();
      if (!updateResult) return;

      setCallTime(0);

      const generatedReport = await handleGenerateReport();
      if (!generatedReport?.status || !generatedReport?.data) {
        return;
      }

      const status = deriveStatus(interviewData?.duration, callTime);
      setLoadingMessage("Saving Report...");
      const submitAttempt = await submitInteviewAttempt(
        interviewId,
        callStartTime,
        status,
        conversationsRef
      );

      if (!submitAttempt?.state || !submitAttempt?.data?.id) {
        toast.error("❌ Failed to submit the attempt");
        return;
      }

      const parsedResult = parseGeneratedReport(generatedReport.data);
      if (!parsedResult) {
        toast.error("❌ Failed to parse report");
        return;
      }

      const { score, recommendation } = extractScoreAndRecommendation(parsedResult);

      const saveReport = await saveInterviewReport(
        interviewId,
        submitAttempt.data.id,
        score,
        recommendation,
        parsedResult,
        callTime
      );

      if (!saveReport?.state) {
        toast.error("Failed to save report");
        return;
      }

      toast.success("Report submitted successfully");
    } catch (err) {
      console.error("Unexpected error in handleEndCall:", err);
      toast.error("Unexpected error occurred during end call");
      setLoading(false)
    } finally{
      setLoading(false);
      router.push("/dashboard/report")
    }
  };

  const handleUpdateUsage = async () => {
    setLoadingMessage("Saving Interview...");
    const result = await updateTimeUsage(callTime);
    if (!result.state) {
      toast.error(result.error);
      return false;
    }
    console.log(`Usage upadted for ${callTime} seconds in DB`)
    toast(`interview completed after (${Math.floor(parseInt(interviewData?.duration) / 60)} seconds)`);
    return true;
  };

  const handleGenerateReport = async () => {
    setLoadingMessage("Generating Report...");
    const result = await generateReport(conversationsRef);
    if (!result.state) {
      toast.error(result.error);
      return false;
    }
    toast.success("Report generated Successfully");
    return {
      status: true, 
      data: result.data
    };
  };

  /**
   * Added this useEffect to call the handleEndCall function
   * when due to long time silence from user Vapi Ends the call
   * and we need to call handleEndCall to generate the report
   * If the report is being generated multiple times maybe this is the reason
   */
  useEffect(() =>{
    if(onErrorCall){
      console.log("inside useEffect")
      handleEndCall();
    }
  }, [onErrorCall]);

  /**
   * This useEffect to end the call once the callTime reachs duration
   */
  useEffect(() => {
    // Once the Call ends then call handleEndCall
    if (callStatus && callTime === parseInt(interviewData?.duration)) {
      console.log("Times up !!!")
      handleEndCall();
    }
    // handle the warning message before 10 seconds of call ending
    if(callStatus && callTime > parseInt(interviewData?.duration) - 10){
      console.log("typeof calltime", typeof callTime);
      console.log("type of interviewData?.duration", typeof interviewData?.duration)
      toast.warning(`You have ${parseInt(interviewData?.duration) - callTime} seconds left`)
    }
  }, [callTime, callStatus]);


  if(loading){
    return(
      <>
        <LoadingOverlay text={loadingMessage} />
      </>
    )
  }

  return (
    <div className="relative w-full h-[450px] bg-gray-700 text-white flex items-center justify-center overflow-hidden">
  <div className="absolute top-4 left-4 text-sm bg-gray-900/70 px-3 py-1 rounded-full">
    {formatTime(callTime)}
  </div>

  {/* Camera Display */}
  <div className="absolute top-4 right-4 w-40 h-28 shadow-2xl bg-gray-500 rounded-lg overflow-hidden">
    <CameraComponent isVisible={!isVideoOff} />
  </div>

  {/* User Avatar + Assistant */}
  <div className="flex flex-col items-center gap-2">
    <div className="w-40 h-40 rounded-full overflow-hidden border-4 shadow-2xl border-gray-600">
      <Image
        src={avatar}
        alt="User Avatar"
        className="w-full h-full object-cover"
      />
    </div>
    {assistantSpeaking && (
      <h2 className="text-lg font-semibold mt-2">Assistant Speaking...</h2>
    )}
    
  </div>

  {/* Bottom Controls */}
  <div className="absolute bottom-6 w-full flex justify-center gap-6">
    {/* Mute Toggle */}
    <button
      className="bg-gray-800 hover:bg-gray-500 cursor-pointer rounded-full p-4"
      onClick={() => setIsMuted(!isMuted)}
      title="Toggle Mute"
    >
      {isMuted ? (
        <MicOff className="text-white" />
      ) : (
        <Mic className="text-white" />
      )}
    </button>

    {/* Video Toggle */}
    <button
      className="bg-gray-800 hover:bg-gray-500 cursor-pointer rounded-full p-4"
      onClick={() => setIsVideoOff(!isVideoOff)}
      title="Toggle Video"
    >
      {isVideoOff ? (
        <VideoOff className="text-white" />
      ) : (
        <Video className="text-white" />
      )}
    </button>

    {/* Call Controls */}
    {callStatus ? (
      <button
        disabled={!buttonStatus}
        className={`flex gap-1 items-center rounded-full cursor-pointer p-4 transition-colors
          ${callStatus && buttonStatus ? 'bg-red-600 hover:bg-red-500' : 'bg-gray-500 cursor-not-allowed'}
        `}            
        onClick={handleEndCall}
        title="End Call"
      >
        <PhoneOff className="text-white h-5 w-5" />
        End Call
      </button>
    ) : (
      <button
        disabled={!buttonStatus}
        className={`flex gap-1 items-center rounded-full cursor-pointer p-4 transition-colors
          ${buttonStatus ? 'bg-green-600 hover:bg-green-500' : 'bg-gray-500 cursor-not-allowed'}
        `}            
        onClick={handleStartCall}
        title="Start Call"
      >
        <PhoneIcon className="text-white h-5 w-5" />
        Start Call
      </button>
    )}
  </div>
</div>

  );
}
