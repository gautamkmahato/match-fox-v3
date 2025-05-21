'use client'

import { useEffect, useState } from "react";
import { Video, PhoneOff, Mic, MicOff, VideoOff, PhoneCall, PhoneIcon } from "lucide-react";
import updateTimeUsage from "@/app/service/interview/updateTimeUsage";
import { useRouter } from "next/navigation";
import generateReport from "@/app/service/interview/generateReport";
import { extractJsonBlock } from "@/lib/utils/cleanCodeBlock";
import submitInteviewAttempt from "@/app/service/interview/submitInteviewAttempt";
import saveInterviewReport from "@/app/service/interview/saveInterviewReport";
import { deriveStatus, extractScoreAndRecommendation, parseGeneratedReport } from "@/lib/utils/helper";

export default function VideoCallUI({ interviewId, interviewData, startCall, stopCall, assistantSpeaking, chatMessages, conversationsRef }) {
  const [callTime, setCallTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [callStatus, setCallStatus] = useState(false);
  const [callStartTime, setCallStartTime] = useState();
  const [error, setError] = useState("")

  const router = useRouter()

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
    setCallStartTime(new Date().toISOString())
  };

 const handleEndCall = async () => {
  try {
    stopCall();
    setCallStatus(false);

    console.log("chatMessages: ", chatMessages);
    console.log("conversationsRef: ", conversationsRef);

    const updateResult = await handleUpdateUsage();
    if (!updateResult) {
      console.error("❌ Failed to update usage");
      return;
    }

    setCallTime(0);

    const generatedReport = await handleGenerateReport();
    if (!generatedReport || !generatedReport.status || !generatedReport.data) {
      console.error("❌ Failed to generate the report or report data missing");
      return;
    }

    const status = deriveStatus(interviewData?.duration, callTime);

    const submitAttempt = await submitInteviewAttempt(
      interviewId,
      callStartTime,
      status,
      conversationsRef
    );

    if (!submitAttempt || !submitAttempt.state || !submitAttempt.data?.id) {
      console.error("❌ Failed to submit the report or missing data");
      return;
    }

    const parsedResult = parseGeneratedReport(generatedReport?.data);
    if (!parsedResult) {
      console.error("❌ Report parsing failed. Aborting save.");
      return;
    }

    const { score, recommendation } = extractScoreAndRecommendation(parsedResult);

    console.log("====== Report data =========");
    console.log("Raw result:", generatedReport?.data);
    console.log("Parsed result:", parsedResult);
    console.log("Score:", score, typeof score);
    console.log("Recommendation:", recommendation, typeof recommendation);

    const saveReport = await saveInterviewReport(
      interviewId,
      submitAttempt.data.id,
      score,
      recommendation,
      parsedResult,
      callTime
    );

    if (!saveReport || !saveReport.state) {
      console.error("❌ Failed to save report");
      return;
    }

    console.log("✅ Report submitted successfully");
  } catch (err) {
    console.error("💥 Unexpected error in handleEndCall:", err);
  } finally {
    // router.push("/dashboard"); // Optional cleanup
  }
};

  const handleUpdateUsage = async () =>{
    const result = await updateTimeUsage(callTime);
    if(!result.state){
      alert(result.error);
      return false;
    }
    if(result?.state){
      console.log("successfully updated the usage with ", callTime, " min");
    }

    return true;
  }

  const handleGenerateReport = async () =>{
    const result = await generateReport(conversationsRef);

    console.log("result generate repprt", result)
    if(!result.state){
      alert(result.error);
      return false;
    }
    if(result?.state){
      alert("successfully generated the report ");
      console.log("Report: ", result?.data)
    }
    return {
      status: true,
      data: result?.data
    };
  }

  return (
    <div className="relative w-full h-full bg-black text-white flex items-center justify-center overflow-hidden">
      <div className="absolute top-4 left-4 text-sm bg-gray-900/70 px-3 py-1 rounded-full">
        {formatTime(callTime)}
      </div>

      <div className="absolute top-4 right-4 w-32 h-40 bg-gray-700 rounded-lg overflow-hidden">
        <video autoPlay muted className="w-full h-full object-cover" />
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white">
          <img
            src="/avatar.jpg"
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </div>
        {assistantSpeaking && <h2 className="text-lg font-semibold mt-2">Assistant Speaking...</h2>}
      </div>

      <div className="absolute bottom-6 w-full flex justify-center gap-6">
        <button
          className="bg-gray-800 hover:bg-gray-700 rounded-full p-4"
          onClick={() => setIsMuted(!isMuted)}
          title="Toggle Mute"
        >
          {isMuted ? <MicOff className="text-white" /> : <Mic className="text-white" />}
        </button>

        <button
          className="bg-gray-800 hover:bg-gray-700 rounded-full p-4"
          onClick={() => setIsVideoOff(!isVideoOff)}
          title="Toggle Video"
        >
          {isVideoOff ? <VideoOff className="text-white" /> : <Video className="text-white" />}
        </button>

                {callStatus ? (
          <button
            className="flex gap-1 items-center bg-red-600 hover:bg-red-500 rounded-full p-4"
            onClick={handleEndCall}
            title="End Call"
          >
            <PhoneOff className="text-white h-5 w-5" />
            End Call
          </button>
        ) : (
          <button
            className="flex gap-1 items-center bg-green-600 hover:bg-green-500 rounded-full p-4"
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
