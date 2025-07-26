'use client';

import React, { useEffect, useRef } from 'react';

const CameraComponent = ({ isVisible }) => {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    let stream = null;
    
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        streamRef.current = mediaStream;
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
        stream = mediaStream;
      } catch (err) {
        console.error('Camera error:', err);
      }
    };

    startCamera();

    return () => {
      // Use the locally scoped stream variable to avoid race conditions
      if (stream) {
        stream.getTracks().forEach(track => {
          track.stop(); // Ensure each track is stopped
          // console.log(`Stopped ${track.kind} track`);
        });
      } else if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => {
          track.stop();
          // console.log(`Stopped ${track.kind} track (fallback)`);
        });
      }
    };
  }, []);

  useEffect(() => {
    if (videoRef.current && streamRef.current) {
      const videoTrack = streamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = isVisible;
      }
    }
  }, [isVisible]);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      playsInline
      className="w-full h-full object-cover"
    />
  );
};

export default CameraComponent;