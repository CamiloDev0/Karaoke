import { useCountdown } from "../../hooks/useCountdown";
import WebcamVideo from "../../webcam/WebcamVideo";
import { AudioUrl } from "../../utils/constants/audio-url";
import { useUiKaraoke } from "../../hooks/useUiKaraoke";
import { useGetLettersKaraoke } from "../../hooks/useGetLettersKaraoke";
import { lyricsByMusic } from "../../utils/constants/letters-music";
import Emergencia from "../../Emergencia";
export const TakeVideo = () => {
  const { selectdMusic } = useUiKaraoke();
  const { timeRemaining } = useCountdown(30);

  const { currentLyris, previousLyris, nextLyrics } = useGetLettersKaraoke({
    lyrics: lyricsByMusic[selectdMusic ?? "bonito"],
  });

  return (
    <div>
      {/* <WebcamVideo countDown={timeRemaining} /> */}
      <Emergencia timeRemaining={timeRemaining} />
      <div
        style={{
          width: "98%",
          height: "250px",
          position: "absolute",
          overflow: "hidden",
          bottom: "0%",
          left: "0%",
          backgroundColor: "#000000B3",
          borderRadius: "10px 10px 0px 0px",
          zIndex: 999,
          padding: "10px",
        }}
      >
        {previousLyris && (
          <p
            key={previousLyris}
            style={{
              fontSize: "2rem",
              color: "#FFFFFFCC",
              fontWeight: "normal",
              width: "100%",
              textAlign: "center",
            }}
          >
            {previousLyris}
          </p>
        )}
        {currentLyris && (
          <p
            key={currentLyris}
            style={{
              fontSize: "3rem",
              color: "#FFFFFF",
              fontWeight: "bold",
              width: "100%",
              textAlign: "center",
            }}
          >
            {currentLyris}
          </p>
        )}
        {nextLyrics && (
          <p
            key={nextLyrics}
            style={{
              fontSize: "2rem",
              color: "#FFFFFFCC",
              fontWeight: "normal",
              width: "100%",
              textAlign: "center",
            }}
          >
            {nextLyrics}
          </p>
        )}
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
