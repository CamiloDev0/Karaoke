import { useEffect } from "react";
import { useCountdown } from "../../hooks/useCountdown";
import { useUiKaraoke } from "../../hooks/useUiKaraoke";
export const QRVideo = () => {
  const { timeRemaining } = useCountdown(60);
  const { resetCurrnetPage } = useUiKaraoke();
  useEffect(() => {
    if (timeRemaining === 0) {
      resetCurrnetPage();
    }
  }, [timeRemaining]);

  return (
    <div>
      {/* <video
        // ref={videoRef}
        autoPlay
        playsInline
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          objectFit: "fill",
        }}
      /> */}
      <img
        src="./assets/images/frame4.png"
        alt=""
        style={{ width: "100%", height: "100%", position: "absolute" }}
      />
    </div>
  );
};
