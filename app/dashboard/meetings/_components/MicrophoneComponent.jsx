'use client';
import React, { useEffect, useRef, useState } from 'react';


const MicrophoneComponent = ({ isMuted }) => {
  const audioRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [volumeLevel, setVolumeLevel] = useState(0);

  useEffect(() => {
    const startMic = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setStream(mediaStream);

        // Optional: setup analyzer for volume
        const audioContext = new AudioContext();
        const source = audioContext.createMediaStreamSource(mediaStream);
        const analyser = audioContext.createAnalyser();
        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        source.connect(analyser);

        const updateVolume = () => {
          analyser.getByteFrequencyData(dataArray);
          const average = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
          setVolumeLevel(Math.min(average / 128, 1)); // normalize 0 to 1
          requestAnimationFrame(updateVolume);
        };
        updateVolume();

        // Attach to audio element (optional)
        if (audioRef.current) {
          audioRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error('Mic error:', err);
      }
    };

    startMic();

    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      {/* Optional hidden audio output */}
      <audio ref={audioRef} autoPlay muted={isMuted} className="hidden" />

      {/* Volume meter UI */}
      <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center relative">
        <div
          className="absolute bottom-0 left-0 right-0 bg-green-500 rounded-full"
          style={{
            height: `${volumeLevel * 100}%`,
            transition: 'height 0.1s ease-in-out',
          }}
        />
      </div>
    </div>
  );
};

export default MicrophoneComponent;
