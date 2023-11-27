import { useEffect, useRef } from "react";
import { useCountdown } from "../../hooks/useCountdown";
import { useShowCamera } from "../../hooks/useShowCamera";
import WebcamVideo from "../../webcam/WebcamVideo";
import { AudioUrl } from "../../utils/constants/audio-url";
import { useUiKaraoke } from "../../hooks/useUiKaraoke";

export const TakeVideo = () => {
  const { timeRemaining } = useCountdown(30);
  const videoRef = useRef(null);
  const { onSetVideoRef } = useShowCamera(null);
  const { selectdMusic } = useUiKaraoke();

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
      <WebcamVideo countDown={timeRemaining} />

      {selectdMusic && (
        <audio controls={false} autoPlay>
          <source src={AudioUrl[selectdMusic]} type="audio/mp3" />
        </audio>
      )}
      <img
        src="./assets/images/marco.png"
        alt=""
        style={{ width: "100%", height: "100%", position: "absolute" }}
      />
      <img
        src="./assets/images/record.png"
        alt=""
        style={{
          width: "27.15%",
          height: "8.13%",
          left: "36.43%",
          top: "82.7%",
          position: "absolute",
        }}
      />
    </div>
  );
};
