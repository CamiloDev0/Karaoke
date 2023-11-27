import { useEffect, useRef } from "react";
import { useCountdown } from "../../hooks/useCountdown";
import { useUiKaraoke } from "../../hooks/useUiKaraoke";
import { useShowCamera } from "../../hooks/useShowCamera";
export const CountDown = () => {
  const { timeRemaining } = useCountdown(3);
  const videoRef = useRef(null);
  const { onSetVideoRef } = useShowCamera(null);
  const { nextPage } = useUiKaraoke();
  const images = [
    "./assets/images/num1.png",
    "./assets/images/num2.png",
    "./assets/images/num3.png",
  ];

  useEffect(() => {
    if (timeRemaining === 0) {
      nextPage();
    }
  }, [timeRemaining]);

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
          width: "100%",
          height: "100%",
          position: "absolute",
          objectFit: "fill",
        }}
      />
      {/* <img
        src="./assets/images/karolg.png"
        alt=""
        style={{
          width: "52.54%",
          height: "10.25%",
          left: "23.73%",
          top: "7.32%",
          position: "absolute",
        }}
      /> */}
      <img
        src="images/rdy.png"
        alt=""
        style={{
          width: "69.92%",
          height: "3.95%",
          left: "15%",
          top: "84.55%",
          position: "absolute",
        }}
      />
      <img
        src="./assets/images/frame3.png"
        alt=""
        style={{ width: "100%", height: "100%", position: "absolute" }}
      />
      <div>
        {timeRemaining > 0 && (
          <img
            src={images[timeRemaining - 1]}
            alt={`Image ${timeRemaining + 1}`}
            style={{ left: "40%", top: "30%", position: "absolute" }}
          />
        )}
      </div>
    </div>
  );
};
