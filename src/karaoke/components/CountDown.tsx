import { useEffect, useRef } from "react";
import { useCountdown } from "../../hooks/useCountdown";
import { useUiKaraoke } from "../../hooks/useUiKaraoke";
import { useShowCamera } from "../../hooks/useShowCamera";
import { useShowCameraGrabar } from "../../hooks/useShowCameraGrabar";
export const CountDown = () => {
  const { timeRemaining } = useCountdown(30);
  const videoRef = useRef(null);
  const {
    onSetVideoRef,
    handleDownload,
    startRecording,
    stopRecording,
    isRecording,
    recordedChunks,
  } = useShowCameraGrabar(null);
  const { nextPage } = useUiKaraoke();
  const images = [
    "./assets/images/num1.png",
    "./assets/images/num2.png",
    "./assets/images/num3.png",
  ];

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
    <div>
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

      <button onClick={startRecording}>
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>

      <button onClick={stopRecording} disabled={!isRecording}>
        Stop
      </button>

      <button onClick={handleDownload} disabled={recordedChunks.length === 0}>
        Download Video
      </button>
    </div>
  );
};
