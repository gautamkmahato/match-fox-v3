import { useEffect, useState } from "react";

export function useMicActivityDetector(threshold = 0.01) {
  const [userSpeaking, setUserSpeaking] = useState(false);

  useEffect(() => {
    let audioContext;
    let analyser;
    let microphone;
    let javascriptNode;
    let mediaStream;

    const detectSpeaking = async () => {
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioContext = new (window.AudioContext || (window).webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        microphone = audioContext.createMediaStreamSource(mediaStream);
        javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

        analyser.smoothingTimeConstant = 0.8;
        analyser.fftSize = 1024;

        microphone.connect(analyser);
        analyser.connect(javascriptNode);
        javascriptNode.connect(audioContext.destination);

        const buffer = new Uint8Array(analyser.frequencyBinCount);

        javascriptNode.onaudioprocess = () => {
          analyser.getByteFrequencyData(buffer);
          const avg = buffer.reduce((acc, val) => acc + val, 0) / buffer.length;
          const normalized = avg / 256; // Normalize between 0 and 1

          setUserSpeaking(normalized > threshold);
        };
      } catch (error) {
        console.error("Mic detection error:", error);
      }
    };

    detectSpeaking();

    return () => {
      javascriptNode?.disconnect();
      analyser?.disconnect();
      microphone?.disconnect();
      mediaStream?.getTracks().forEach((track) => track.stop());
      audioContext?.close();
    };
  }, [threshold]);

  return userSpeaking;
}
