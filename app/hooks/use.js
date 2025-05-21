import { useState, useEffect, useRef, useCallback } from 'react';
import Vapi from '@vapi-ai/web';
import { useUser } from '@clerk/nextjs';
import { useReport } from './useReport';

export const useVapi = (interviewDetails, questions, interviewAttemptId) => {
  const [assistantSpeaking, setAssistantSpeaking] = useState(false);
  const [liveMessages, setLiveMessages] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [callActive, setCallActive] = useState(false);
  const [vapiError, setVapiError] = useState('');
  const [callStarted, setCallStarted] = useState(false);
  const [vapi, setVapi] = useState(null);
  const [interviewStatus, setInterviewStatus] = useState(null);

  const callEnded = useRef(false); // Add this line


  const conversationsRef = useRef([]);
  //const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_KEY);
  const { isSignedIn, user, isLoaded } = useUser();

  const stopCall = () => {
    if (vapi && callStarted && !callEnded.current) {
        vapi.stop();
        setCallStarted(false);
        setCallActive(false);
        callEnded.current = true; // Mark call as ended
        console.log("User stopped the call");
    } else {
        console.log("Call has not started yet.");
    }
  };

  // Initialize useReport hook at the top level
  const { loadingReport, loadingGenerateReport, reportError, handleCall } = useReport(
    interviewAttemptId,
    conversationsRef,
    () => {
      vapi.stop();
      setCallActive(false);
      console.log('User stopped the call');
    }
  );

  // Create a stable stop function


  const chat = useCallback(() => {
    if (!vapi) return; 
    const assistantOptions = {
      name: 'AI Recruiter',
      firstMessage: `Hi ${user?.firstName}, how are you? Ready for your ${interviewDetails?.company} ${interviewDetails?.position} interview? `,
      transcriber: {
        provider: 'deepgram',
        model: 'nova-2',
        language: 'en-US',
      },
      voice: {
        provider: 'vapi',
        voiceId: 'Neha',
        fallbackPlan: {
          voices: [
            { provider: 'cartesia', voiceId: '248be419-c632-4f23-adf1-5324ed7dbf1d' },
            { provider: 'playht', voiceId: 'jennifer' },
          ],
        },
      },
      model: {
        provider: 'openai',
        model: 'gpt-4.1-mini',
        messages: [
          {
            role: 'system',
            content: `

              You are an AI recruiter. You have a list of interview questions and your job is to take the interview based on the above questions.
              First ask the question wait for user's response then ask next question.
              Always wait for user's response.
              Ask only 5 questions
              Questions List:
              ${questions}

            `.trim(),
          },
        ],
        tools: [{ type: 'endCall' }],
      },
      startSpeakingPlan: {
        waitSeconds: 2,
      },
      stopSpeakingPlan: {
        numWords: 1,
        voiceSeconds: 0.1,
        backoffSeconds: 0,
      },
    };

    vapi.start(assistantOptions)
      .then(() => {
          setCallStarted(true);
      })
      .catch((error) => {
          console.error("Error starting call:", error);
      });
       
    setCallActive(true);

    vapi.on('speech-start', () => {
      console.log('Assistant speech has started.');
      setAssistantSpeaking(true);
    });

    vapi.on('speech-end', () => {
      console.log('Assistant speech has ended.');
      setAssistantSpeaking(false);
    });

    vapi.on('call-start', () => {
      console.log('Call has started.');
    });

    vapi.on('call-end', () => {
    console.log('Call has ended.');
    setCallActive(false);
    setCallStarted(false);
    if (!callEnded.current) {
      callEnded.current = true;
    }
  });

    vapi.on('message', (message) => {
      console.log('Vapi Message:', message);

      if (message?.type === 'transcript') {
        setLiveMessages(message.transcript);
      }

      if (message?.type === 'conversation-update') {
        console.log('Conversation update:', message.conversation);
        conversationsRef.current = message?.conversation; // <- update ref
      }

      if (message?.type === 'transcript' && message.transcriptType === 'final') {
        setChatMessages((prev) => [...prev, message]);
      }
    });

    vapi.on('error', (e) => {
      console.log('Vapi Error:', e);
      setVapiError('Error with voice assistant');

      // Call handleCall when error occurs
      try {
        stopCall(); // Use the same stopCall function for consistency

      } catch (error) {
        console.error('Error handling call after VAPI error:', error);
      }
    });

    vapi.send({
      type: 'add-message',
      message: {
        role: 'system',
        content: 'The user has pressed the button, say peanuts',
      },
    });

  }, [interviewDetails, questions, handleCall, stopCall]);

  

  useEffect(() => {
        // Initialize Vapi when component mounts
        const vapiInstance = new Vapi(process.env.NEXT_PUBLIC_VAPI_KEY);
        setVapi(vapiInstance);

        return () => {
            // Clean up on unmount
            if (vapiInstance) {
                vapiInstance.stop();
            }
        };
    }, []);

  return {
    assistantSpeaking,
    liveMessages,
    chatMessages,
    callActive,
    chat,
    stopCall,
    vapiError,
    conversationsRef,
    loadingReport,
    loadingGenerateReport,
    reportError,
    callStarted,
    handleCall
  };
};