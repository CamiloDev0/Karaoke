import { useEffect } from "react";
import { useCountdown } from "../../hooks/useCountdown";
import { useUiKaraoke } from "../../hooks/useUiKaraoke";
import QRCode from "react-qr-code";

export const QRVideo = () => {
  const { timeRemaining } = useCountdown(60);
  const { resetCurrnetPage, qrVideoName } = useUiKaraoke();
  console.log("VIDEO NAME VIEW QR", qrVideoName);
  useEffect(() => {
    if (timeRemaining === 0) {
      resetCurrnetPage();
    }
  }, [timeRemaining]);

  return (
    <div>
      <QRCode
        size={256}
        bgColor="rgba(255,255,255,0.7)"
        style={{ height: "auto", maxWidth: "100%", width: "30%", position:"absolute", zIndex:1, top:"54%", left:"35%" }}
        value={`https://mocionws.info/download.html?url=https://mocionws.info/video/${ qrVideoName }&name=Bancolombia-Karol-G`}
        viewBox={`0 0 256 256`}
      />
      <img
        src="./qr-back.png"
        alt=""
        style={{ width: "100%", height: "100%", position: "absolute" }}
      />
    </div>
  );
};
