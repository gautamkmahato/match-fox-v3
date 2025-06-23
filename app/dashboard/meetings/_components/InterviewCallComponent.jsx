'use client';

import { useEffect, useRef, useState } from "react";
import VideoCallUI from "./VideoCallUI";
import { SignedIn, useUser } from "@clerk/nextjs";
import Vapi from "@vapi-ai/web";
import { toast } from 'sonner';
import LoadingOverlay from "@/components/LoadingOverlay";
import getRandomGreeting from "@/lib/utils/getRandomGreeting";


export default function InterviewCallComponent({ interviewId, interviewData, leftUsage }) {
  // const [interviewData, setInterviewData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [callStarted, setCallStarted] = useState(false);
  const [assistantSpeaking, setAssistantSpeaking] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [liveMessages, setLiveMessages] = useState('');
  const [vapiError, setVapiError] = useState('');
  const [loadingMessage, setLoadingMessage] = useState("");
  const [onErrorCall, setOnErrorCall] = useState(false);


  const chatEndRef = useRef(null);
  const conversationsRef = useRef([]);
  const vapiRef = useRef(null);

  const { isSignedIn, user } = useUser();

  // console.log("interview data:", interviewData);
  // console.log("user name", user?.firstName)

  console.log(interviewId, interviewData, leftUsage);

  if (!interviewData) {
    return (
      <>
        <div>
          <h3>No Interview Data Available for the Id, Please check again...</h3>
        </div>
      </>
    )
  }

  if (!isSignedIn || !user) {
    return (
      <>
        <div>
          <h3>Please Sign In...</h3>
        </div>
      </>
    )
  }

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);


  useEffect(() => {
    const vapiInstance = new Vapi(process.env.NEXT_PUBLIC_VAPI_KEY);
    vapiRef.current = vapiInstance;

    return () => {
      vapiInstance.stop();
      vapiRef.current = null; 
    };
  }, []);


  const questionsList = Object.values(interviewData?.questions)
    .map(q => `"${q?.question}"`)
    .join(",\n");

  console.log("questionsList::: ", questionsList)

  const startCall = () => {
    const vapi = vapiRef.current;
    if (!vapi || callStarted) return;

    // console.log("user name", user?.firstName)

    const assistantOptions = {
      name: "AI Recruiter",
      firstMessage: getRandomGreeting(user?.firstName, interviewData?.interview_name),
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
            content: `

## Introduction

> You are a highly professional MBA admissions interviewer name "Jina" from "Hirenom" for top Indian B-schools like IIMs, FMS, XLRI, etc. 
Your role is to conduct a **realistic, college-specific mock interview** 
for the user based on the given question list. You are NOT a chatbot — act like a 
real human interviewer.
> Your job is to ask candidates provided interview questions and assess their responses.
> Always follow the DRY (Do not repeat yourself) rule.
> Begin the conversation with a friendly introduction using a relaxed yet professional tone. 
> First start with an introduction of yourself and then ask the candidate to give some introduction about them.
> For Example: 
Step 1: Interviewer introduces themselves
> "Hi [Candidate Name], I’m [Your Name], a [Your Role] here at [Company]. I’ll be conducting your interview today, focusing on [topic: e.g., React, full-stack development, system design, etc.]."

Step 2: Invite the candidate to introduce themselves
"Before we dive into the questions, could you start by telling me a little bit about yourself and your experience?"

> Introduction Process:
* Introduce yourself
* Wait for the candidate’s response.
* Once they finish, follow up with:
* "Awesome, thanks for sharing! Let’s get started with the first question."
* Modify this everytime with some new replies, dont repeat yourself with same reply

⚙️ INTERVIEW RULES & BEHAVIOR:
- Ask one question at a time. Wait silently for the user's response before proceeding.
- Do not continue or interrupt until the user replies. Simulate a human wait.
- Ask **10–15 core questions** and at most **2–3 follow-up questions per main question**, only when necessary.
- Keep the tone professional, slightly formal, but not robotic. Friendly yet evaluative.
- Base your questions on the user's profile, their academic/work history, and their B-school of choice.

## Questions List: 
${questionsList}

🚧 EDGE CASE HANDLING:

1. **If user asks you to answer the interview question:**
   - Politely respond:  
     "This is your mock interview. Try to take it seriously — practicing genuinely will help you perform better in the real one."

2. **If user gives irrelevant/unnecessary answers (off-topic or joking):**
   - Gently warn them:  
     "In a real interview, such responses may reflect poorly on your professionalism. Let's try to keep it focused."

3. **If user doesn’t respond for a long time or seems lost:**
   - Encourage them by saying:  
     "Take your time. I'm here when you're ready. It's okay to pause and think — just like in a real interview."

4. **If user says "I don’t know":**
   - Encourage them to try by saying:  
     "That's alright. Try your best — the interview isn't about knowing everything, but about how you think and respond under pressure."

📋 INTERVIEW STRUCTURE:

- Start with a brief welcome line (1 sentence only)
- Ask questions in the following areas:
  1. Tell me about yourself
  2. Why MBA / Why now
  3. Why this college
  4. Work experience-related questions
  5. Academic questions (based on degree)
  6. Current affairs / opinion-based questions
  7. Ethical/situational questions
  8. Career goals
  9. Strengths/weaknesses
  10. Final wrap-up question

📝 After all questions are done, provide a **personalized, constructive feedback report**:
- Highlight **strengths**
- Mention **areas of improvement**
- Provide **overall rating** out of 10
- Give **actionable advice**

💬 Format each question in simple language. Don’t dump multiple questions at once. Maintain realism and timing.



`
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
      toast.success("Call started with AI Recruiter");
    } catch (err) {
      // console.error("Failed to start call:", err);
      toast.error("Failed to start call");
      setVapiError("Failed to start call");
    } finally {
      console.log("")
    }

    vapi.removeAllListeners();

    vapi.on("speech-start", () => setAssistantSpeaking(true));
    vapi.on("speech-end", () => setAssistantSpeaking(false));
    vapi.on("call-end", () => {
      setCallStarted(false);
      toast("Call ended");
    });
    vapi.on("error", (e) => {
      // console.error(e);
      toast.error("Call error occurred");
      setVapiError("Error during call");
      setCallStarted(false);
      toast("Call ended");
      setOnErrorCall(true);
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
          if (lastMessage?.transcript === message.transcript) return prev;
          return [...prev, message];
        });
      }
    });
  };

  const stopCall = () => {
    if (vapiRef.current && callStarted) {
      vapiRef.current.stop();
      setCallStarted(false);
      toast.info("Call stopped");
    }
  };

  if (loading) {
    return (
      <>
        <LoadingOverlay text={loadingMessage} />
      </>
    )
  }

  if (error) {
    return (
      <>
        {toast.info(`Error: ${error}`)}
      </>
    )
  }
  // if (error) return <div className="p-4 text-red-600 font-semibold">Error: {error}</div>;

  return (
    <>
      <div className="flex items-center gap-4 px-4 py-4 ml-4 mb-4 mr-4 mt-20 lg:mt-4 md:mt-4 bg-white shadow rounded-xl border border-gray-100">
        {/* Avatar-like Block */}
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-700 text-white text-lg font-semibold uppercase">
          {(interviewData?.company || "H").charAt(0)}
        </div>
        {/* Text Content */}
        <div className="flex flex-col">
          <h3 className="text-base font-semibold text-gray-800">
            {interviewData?.interview_name || "Interview Name"}
          </h3>
          <p className="text-sm text-gray-500">
            {interviewData?.company || "Company Name"}
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row p-4 relative">
        <div className="flex flex-col w-full lg:w-2/3">
          <div className="w-full h-[400px] max-w-3xl mb-4 rounded-2xl overflow-hidden shadow-xl">
            <VideoCallUI
              interviewId={interviewId}
              interviewData={interviewData}
              startCall={startCall}
              stopCall={stopCall}
              assistantSpeaking={assistantSpeaking}
              chatMessages={chatMessages}
              conversationsRef={conversationsRef}
              onErrorCall={onErrorCall}
              setOnErrorCall={setOnErrorCall}
              leftUsage={leftUsage}
            />
          </div>

          {/** Live messages */}
          {liveMessages && <div className="flex justify-center">
            <div className="inline-block bg-gray-200 text-center px-4 py-2 border border-gray-200 shadow-md rounded">
              <p className="text-md text-gray-700 whitespace-nowrap">
                <span className="font-semibold">Live:</span>
                {liveMessages}
              </p>
            </div>
          </div>}
        </div>

        {/** chat messages */}
        <div className="w-full h-[400px] lg:w-1/3 p-4 ml-4 rounded-xl bg-white shadow-lg flex flex-col">
          <h1 className="text-xl font-bold text-gray-800 mb-4">Chat</h1>

          {chatMessages.length === 0 ? (
            <p className="text-gray-400">No messages yet...</p>
          ) : (
            <div className="flex-1 border border-gray-100 shadow p-4 rounded-lg overflow-hidden flex flex-col">
              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                {chatMessages.map((chat, index) => {
                  const isUser = chat.role === "user";
                  return (
                    <div
                      key={index}
                      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[75%] rounded-2xl p-3 shadow-md ${
                          isUser
                            ? "bg-green-200 text-gray-700 rounded-br-none"
                            : "bg-gray-200 text-gray-800 rounded-bl-none"
                        }`}
                      >
                        <p className="text-xs font-semibold mb-1 text-gray-700">
                          {isUser ? "You" : "Interviewer"}
                        </p>
                        <p className="text-sm whitespace-pre-wrap">
                          {chat.transcript}
                        </p>
                      </div>
                    </div>
                  );
                })}
                <div ref={chatEndRef} />
              </div>
            </div>
          )}

          {vapiError && (
            <p className="mt-2 text-sm text-red-500">{vapiError}</p>
          )}
        </div>

      </div>

      

    </>
  );
}
