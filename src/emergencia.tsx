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

export default function Emergencia() {
  const { timeRemaining } = useCountdown(10);
  const { nextPage } = useUiKaraoke();
  const webcamRef = useRef<Webcam>(null);
  const videoRef = useRef(null);
  const {
    onSetVideoRef,
    handleDownload,
    startRecording,
    stopRecording,
    isRecording,
    recordedChunks,
  } = useShowCameraGrabar(null);

  /* const handleDataAvailable = ({
    data,
  }: MediaRecorderEventMap["dataavailable"]) => {
    if (data.size > 0) {
      setRecordedChunks((prev) => prev.concat(data));
    }
  };

  const handleStartCaptureClick = () => {
    if (webcamRef.current && webcamRef.current.stream) {
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
        mimeType: "video/webm",
      });
      mediaRecorderRef.current.addEventListener(
        TYPE_LISTENER,
        handleDataAvailable
      );
      mediaRecorderRef.current.start();
    }
  };

  const handleStopCaptureClick = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  };

  const handleDownload = () => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      document.body.appendChild(a);
      //   a.style = "display: none";
      a.href = url;
      a.download = "react-webcam-stream-capture.mp4";
      a.click();
      window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
      nextPage();
    }
  }; */

  useEffect(() => {
    startRecording();
  }, [videoRef.current, videoRef.current?.stream]);

  useEffect(() => {
    if (timeRemaining === 0) {
      handleStopCaptureClick();
      handleDownload();
    }
  }, [timeRemaining, handleStopCaptureClick, handleDownload]);

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
      <Webcam
        width={1280}
        height={720}
        style={{ objectFit: "fill" }}
        audio
        ref={webcamRef}
        videoConstraints={videoConstraints}
        audioConstraints
      />
    </div>
  );
}
