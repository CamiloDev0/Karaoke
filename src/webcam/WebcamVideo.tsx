import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { useUiKaraoke } from "../hooks/useUiKaraoke";

interface Props {
  countDown: number;
}


const videoConstraints = {
  width: 450,
  height: 450,
  facingMode: "user",
};


const TYPE_LISTENER = "dataavailable";

export default function WebcamVideo({ countDown }: Props) {
  const { nextPage } = useUiKaraoke();
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef: React.MutableRefObject<MediaRecorder | null> =
    useRef(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);

  const handleDataAvailable = ({
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
  };

  useEffect(() => {
    handleStartCaptureClick();
  }, [webcamRef.current, webcamRef.current?.stream]);

  useEffect(() => {
    if (countDown === 0) {
      handleStopCaptureClick();
      handleDownload();
    }
  }, [countDown, handleStopCaptureClick, handleDownload]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        objectFit: "fill",
        overflow: "hidden",
      }}
    >
      <Webcam
        height={"100%"}
        width={"100%"}
        audio
        ref={webcamRef}
        videoConstraints={videoConstraints}
        audioConstraints
      />
    </div>
  );
}
