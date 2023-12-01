import { useRef, useEffect } from "react";
import { useUiKaraoke } from "./hooks/useUiKaraoke";
import { useShowCameraGrabar } from "./hooks/useShowCameraGrabar";

interface Props {
  timeRemaining: number;
}

export default function Emergencia({ timeRemaining }: Props) {
  const { nextPage } = useUiKaraoke();

  const videoRef = useRef(null);
  const {
    onSetVideoRef,
    handleDownload,
    startRecording,
    stopRecording,
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
  }, [timeRemaining, recordedChunks.length]);

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
        muted
        ref={videoRef}
        autoPlay
        playsInline
        style={{
          width: "100%",
          height: "100%",
          objectFit: "fill",
        }}
      />
    </div>
  );
}
