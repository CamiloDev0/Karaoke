import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { useCountdown } from "./hooks/useCountdown";
import { useUiKaraoke } from "./hooks/useUiKaraoke";
import { useShowCameraGrabar } from "./hooks/useShowCameraGrabar";

interface Props {
  timeRemaining: number;
}

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

const TYPE_LISTENER = "dataavailable";

export default function Emergencia({ timeRemaining }: Props) {
	const { nextPage } = useUiKaraoke();

  const videoRef = useRef(null);
  const {
    onSetVideoRef,
    handleDownload,
    startRecording,
    stopRecording,
    isRecording,
    recordedChunks,
  } = useShowCameraGrabar(null);

  useEffect(() => {
    startRecording();
  }, [videoRef.current]);

  useEffect(() => {
    if (timeRemaining === 0) {
      stopRecording();
      handleDownload(nextPage);
    }
  }, [timeRemaining, handleDownload]);

  useEffect(() => {
    const startCamera = async () => {
      try {
        onSetVideoRef(videoRef);
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };
    startCamera();
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: "0px",
        left: "0px",
        overflow: "hidden",
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{
          width: "50%",
          height: "50%",
          objectFit: "fill",
        }}
      />
    </div>
  );
}
