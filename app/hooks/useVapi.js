import { useState, useEffect, useRef, useCallback } from 'react';
import Vapi from '@vapi-ai/web';
import { useUser } from '@clerk/nextjs';
import { useReport } from './useReport';

export const useVapi = (interviewData, interviewId) => {
  const [assistantSpeaking, setAssistantSpeaking] = useState(false);
  const [liveMessages, setLiveMessages] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [callActive, setCallActive] = useState(false);
  const [vapiError, setVapiError] = useState(''); 


  const conversationsRef = useRef([]);
  const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_KEY);
  const { isSignedIn, user, isLoaded } = useUser();

  // Initialize useReport hook at the top level
  // const { loadingReport, loadingGenerateReport, reportError, handleCall } = useReport(
  //   interviewAttemptId,
  //   conversationsRef,
  //   () => {
  //     vapi.stop();
  //     setCallActive(false);
  //     console.log('User stopped the call');
  //   }
  // );

  // Create a stable stop function
  const stopVapi = useCallback(() => {
    vapi.stop();
    setCallActive(false);
    console.log('VAPI session stopped');
  }, [vapi]);

  const stopCall = useCallback(() => {
    stopVapi();
    setCallActive(false);
    console.log('User stopped the call');
  }, [vapi]);


  const chat = useCallback(() => {
    const assistantOptions = {
      name: 'AI Recruiter',
      firstMessage: `Hi ${user?.firstName}, how are you? Ready for your ${interviewData?.company} ${interviewData?.position} interview? `,
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
              ${interviewData?.questions}

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

    vapi.start(assistantOptions);
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

  }, [interviewData, interviewId]);

  useEffect(() => {
    return () => {
      vapi.stop();
    };
  }, [vapi]);

  return {
    assistantSpeaking,
    liveMessages,
    chatMessages,
    callActive,
    chat,
    stopCall,
    vapiError,
    conversationsRef,
  };
};