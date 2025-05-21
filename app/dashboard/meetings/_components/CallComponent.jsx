import { useEffect, useRef, useState } from "react";
import VideoCallUI from "./VideoCallUI";
import { useUser } from "@clerk/nextjs";
import fetchInterviewDetails from "@/app/service/interview/fetchInteviewDetails";
import Vapi from "@vapi-ai/web";

export default function CallComponent({ interviewId }) {
  const [interviewData, setInterviewData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [callStarted, setCallStarted] = useState(false);
  const [assistantSpeaking, setAssistantSpeaking] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [liveMessages, setLiveMessages] = useState('');
  const [vapiError, setVapiError] = useState('');
  const chatEndRef = useRef(null);
  const conversationsRef = useRef([]);
  const vapiRef = useRef(null);

  const { isSignedIn, user, isLoaded } = useUser();

  // Scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Fetch interview details
  useEffect(() => {
    const getDetails = async () => {
      setLoading(true);
      try {
        const result = await fetchInterviewDetails(interviewId);
        if (!result.state) throw new Error(result.error);
        setInterviewData(result.data);
      } catch (err) {
        setError(err.message || 'Failed to load interview');
      } finally {
        setLoading(false);
      }
    };

    if (interviewId) getDetails();
  }, [interviewId]);

  // Initialize Vapi
  useEffect(() => {
    const vapiInstance = new Vapi(process.env.NEXT_PUBLIC_VAPI_KEY);
    vapiRef.current = vapiInstance;

    return () => {
      vapiInstance.stop();
      vapiRef.current = null;
    };
  }, []);

  const startCall = () => {
    const vapi = vapiRef.current;
    if (!vapi || callStarted) return;

    const assistantOptions = {
      name: "AI Recruiter",
      firstMessage: "Hi Gautam, how are you? Ready for your interview on Gen AI Developer",
      transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en-US",
      },
      voice: {
        provider: "vapi",
        voiceId: "Neha",
        fallbackPlan: {
          voices: [
            { provider: "cartesia", voiceId: "248be419-c632-4f23-adf1-5324ed7dbf1d" },
            { provider: "playht", voiceId: "jennifer" }
          ]
        }
      },
      model: {
        provider: "openai",
        model: "gpt-4.1-mini",
        messages: [
          {
            role: "system",
            content: "# AI Voice Assistant – help the user with their queries"
          },
        ],
        tools: [{ type: "endCall" }]
      },
      startSpeakingPlan: { waitSeconds: 2 },
      stopSpeakingPlan: {
        numWords: 1,
        voiceSeconds: 0.1,
        backoffSeconds: 0,
      }
    };

    try {
      vapi.start(assistantOptions);
      setCallStarted(true);
    } catch (err) {
      console.error("Failed to start call:", err);
      setVapiError("Failed to start call");
    }

    // Prevent duplicate listeners
    vapi.removeAllListeners();

    vapi.on("speech-start", () => {
      setAssistantSpeaking(true);
    });
    vapi.on("speech-end", () => {
      setAssistantSpeaking(false);
    });
    vapi.on("call-end", () => setCallStarted(false));
    vapi.on("error", (e) => {
      console.error(e);
      setVapiError("Error during call");
    });

    vapi.on("message", (message) => {
      if (message?.type === "transcript") {
        setLiveMessages(message.transcript);
      }

      if (message?.type === "conversation-update") {
        conversationsRef.current = message?.conversation;
      }

      if (message?.type === "transcript" && message.transcriptType === "final") {
        setChatMessages((prev) => {
          const lastMessage = prev[prev.length - 1];
          if (lastMessage?.transcript === message.transcript) return prev; // Avoid duplicates
          return [...prev, message];
        });
      }
    });
  };

  const stopCall = () => {
    if (vapiRef.current && callStarted) {
      vapiRef.current.stop();
      setCallStarted(false);
    }
  };

  // Loading & Error UI
  if (loading) return <div className="p-4 text-gray-700">Loading interview details...</div>;
  if (error) return <div className="p-4 text-red-600 font-semibold">Error: {error}</div>;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 relative">
      {/* Left: Video UI */}
      <div className="flex justify-center items-center w-full lg:w-2/3 p-4">
        <div className="w-full h-[86vh] max-w-3xl rounded-lg overflow-hidden shadow-lg bg-black">
          <VideoCallUI interviewId={interviewId} interviewData={interviewData} startCall={startCall} stopCall={stopCall} assistantSpeaking={assistantSpeaking} chatMessages={chatMessages} conversationsRef={conversationsRef} />
        </div>
      </div>

      {/* Right: Chat UI */}
      <div className="w-full lg:w-1/3 p-4 bg-white shadow-inner">
        <h1 className="text-xl font-bold text-gray-800 mb-4">Chat</h1>

        {chatMessages.length === 0 ? (
          <p className="text-gray-400">No messages yet...</p>
        ) : (
          <div className="flex flex-col border border-gray-100 shadow p-4 rounded-lg h-[412px] overflow-hidden">
            <div className="flex-1 overflow-y-auto space-y-3 pr-2">
              <div className="space-y-3">
                {chatMessages.map((chat, index) => {
                  const isUser = chat.role === "user";
                  return (
                    <div key={index} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[75%] rounded-2xl p-3 shadow-md ${isUser
                          ? "bg-green-200 text-gray-700 rounded-br-none"
                          : "bg-gray-200 text-gray-800 rounded-bl-none"
                          }`}
                      >
                        <p className="text-xs font-semibold mb-1 text-gray-700">
                          {isUser ? "You" : "Interviewer"}
                        </p>
                        <p className="text-sm whitespace-pre-wrap">{chat.transcript}</p>
                      </div>
                    </div>
                  );
                })}
                <div ref={chatEndRef} />
              </div>
            </div>
          </div>
        )}
        {vapiError && (
          <p className="mt-2 text-sm text-red-500">{vapiError}</p>
        )}
      </div>
    </div>
  );
}
