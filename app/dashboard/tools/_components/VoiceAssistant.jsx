"use client";
import { useEffect, useRef, useState } from "react";
import { Mic, MicOff, Loader2 } from "lucide-react";
import Link from "next/link";

export default function VoiceInterview() {
  const [topic, setTopic] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const [question, setQuestion] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState("");

  const recognitionRef = useRef(null);
  const isManuallyStoppedRef = useRef(false);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error("SpeechRecognition is not supported.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsListening(true);
      console.log("Listening started");
    };

    recognition.onresult = (event) => {
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        finalTranscript += event.results[i][0].transcript;
      }
      setTranscript(finalTranscript.trim());
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.onend = () => {
      setIsListening(false);
      if (!isManuallyStoppedRef.current) {
        console.log("Auto-restarting recognition...");
        recognition.start(); // restart automatically if not manually stopped
      }
    };

    recognitionRef.current = recognition;
  }, []);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      isManuallyStoppedRef.current = false;
      setTranscript("");
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      isManuallyStoppedRef.current = true;
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const startInterview = async () => {
    setLoading(true);
    const res = await fetch("/api/tools/ask-llm", {
      method: "POST",
      body: JSON.stringify({ prompt: topic }),
    });
    const data = await res.json();
    setSessionId(data.sessionId);
    setQuestion(data.question);
    setTranscript("");
    setReport("");
    setLoading(false);
  };

  const handleAnswer = async () => {
    if (!sessionId || !transcript.trim()) return;
    setLoading(true);
    const res = await fetch("/api/tools/ask-llm", {
      method: "POST",
      body: JSON.stringify({ sessionId, answer: transcript }),
    });
    const data = await res.json();
    if (data.end) {
      setQuestion("Interview complete. Generate report.");
    } else {
      setQuestion(data.question);
    }
    setTranscript("");
    setLoading(false);
  };

  const endInterview = async () => {
    if (!sessionId) return;
    setLoading(true);
    const res = await fetch("/api/tools/ask-llm", {
      method: "POST",
      body: JSON.stringify({ sessionId, end: true }),
    });
    const data = await res.json();
    setReport(data.report || "Could not generate report.");
    setSessionId(null);
    setQuestion("");
    setTranscript("");
    setIsListening(false);
    isManuallyStoppedRef.current = true;
    recognitionRef.current?.stop();
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 px-4 py-8 mb-16 border border-gray-50 rounded-lg shadow space-y-4">
              <h1 className="text-xl font-bold">Voice Mock Interview</h1>

        <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-4 text-indigo-800 shadow-sm dark:border-blue-700 dark:bg-indigo-900 dark:text-indigo-200">
  <h3 className="mb-1 text-base font-semibold">Important Note:</h3>
  <p className="text-sm">
    This tool doesn't offer real-time mock interviews. For live practice, please visit our 
    <Link href="/dashboard/interview" className="ml-2 mr-2 font-bold text-indigo-600 hover:text-indigo-700 underline dark:text-indigo-400 dark:hover:text-indigo-300">
      Mock Interview
    </Link> section.
  </p>
</div>

      {!sessionId && (
        <div className="flex gap-2">
          <input
            className="border border-gray-400 p-2 rounded w-full"
            placeholder="Enter topic (e.g., React.js)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <button
            className="bg-indigo-700 text-white px-4 py-2 rounded"
            onClick={startInterview}
            disabled={loading || !topic}
          >
            {loading ? "Starting..." : "Start"}
          </button>
        </div>
      )}

      {sessionId && (
        <>
          <div className="text-gray-700">
            <strong>Q:</strong> {question}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={isListening ? stopListening : startListening}
              className={`px-4 py-2 rounded-full flex items-center gap-2 text-white ${
                isListening ? "bg-red-500" : "bg-green-600"
              }`}
            >
              {isListening ? <MicOff /> : <Mic />}
              {isListening ? "Stop" : "Start"}
            </button>

            <button
              className="px-4 py-2 bg-purple-600 text-white rounded"
              onClick={handleAnswer}
              disabled={!transcript.trim() || loading}
            >
              Next
            </button>

            <button
              className="px-4 py-2 bg-black text-white rounded"
              onClick={endInterview}
              disabled={loading}
            >
              End
            </button>

            {loading && <Loader2 className="w-5 h-5 animate-spin" />}
          </div>

          {transcript && (
            <div className="text-sm text-gray-500 mt-2 border p-2 rounded bg-white">
              <strong>You:</strong> {transcript}
            </div>
          )}
        </>
      )}

      {report && (
        <div className="p-4 bg-gray-100 rounded mt-6">
          <h2 className="font-semibold mb-2">📋 Interview Report:</h2>
          <pre className="whitespace-pre-wrap text-sm">{report}</pre>
        </div>
      )}
    </div>
  );
}
