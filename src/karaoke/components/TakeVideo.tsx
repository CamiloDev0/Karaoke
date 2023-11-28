import { useCountdown } from "../../hooks/useCountdown";
import WebcamVideo from "../../webcam/WebcamVideo";
import { AudioUrl } from "../../utils/constants/audio-url";
import { useUiKaraoke } from "../../hooks/useUiKaraoke";
import { useGetLettersKaraoke } from "../../hooks/useGetLettersKaraoke";
import { lyricsByMusic } from "../../utils/constants/letters-music";
export const TakeVideo = () => {
  const { selectdMusic } = useUiKaraoke();
  const { timeRemaining } = useCountdown(30);

  const { currentLyris } = useGetLettersKaraoke(
    lyricsByMusic[selectdMusic ?? "bonito"]
  );

  return (
    <div>
      <WebcamVideo countDown={timeRemaining} />
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          overflow: "hidden",
          zIndex: 999,
        }}
      >
        <p style={{ fontSize: "40px", color: "#FFFFFF" }}>{currentLyris}</p>
      </div>
      <img
        src="./assets/images/marco.png"
        alt=""
        style={{ width: "100%", height: "100%", position: "absolute" }}
      />
      {selectdMusic && (
        <audio controls={false} autoPlay>
          <source src={AudioUrl[selectdMusic]} type="audio/mp3" />
        </audio>
      )}
    </div>
  );
};
