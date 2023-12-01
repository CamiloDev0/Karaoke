import { useCountdown } from "../../hooks/useCountdown";
import { AudioUrl } from "../../utils/constants/audio-url";
import { useUiKaraoke } from "../../hooks/useUiKaraoke";
import { useGetLettersKaraoke } from "../../hooks/useGetLettersKaraoke";
import { lyricsByMusic } from "../../utils/constants/letters-music";
import Emergencia from "../../Emergencia";
import { useRef, useState } from "react";

import ReactPlayer from "react-player";

export const TakeVideo = () => {
  const { selectdMusic } = useUiKaraoke();
  const { timeRemaining } = useCountdown(23);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(true);
  const { currentLyris, previousLyris, nextLyrics, stopLetters } =
    useGetLettersKaraoke({
      lyrics: lyricsByMusic[selectdMusic ?? "bonito"],
    });

  console.log("audioRef.current", audioRef.current);
  const stopAudio = () => {
    /*  if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    } */
    setPlaying(false);
  };

  return (
    <div>
      {/* <WebcamVideo countDown={timeRemaining} /> */}
      <Emergencia
        timeRemaining={timeRemaining}
        stopLetters={stopLetters}
        stopAudio={stopAudio}
      />
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
        {previousLyris.length === 0 &&
          currentLyris.length === 0 &&
          nextLyrics.length === 0 && (
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
              Se está generando el video, esto tomará un momento
            </p>
          )}
      </div>
      <img
        src="./assets/images/marco.png"
        alt=""
        style={{ width: "100%", height: "100%", position: "absolute" }}
      />
      {/* {selectdMusic && (
        <ReactPlayer
          ref={audioRef}
          src={AudioUrl[selectdMusic]}
          autoPlay
          controls={false}
          volume={1.0}
          
        />
      )} */}
      {selectdMusic && (
        <ReactPlayer
          volume={1.0}
          height={""}
          ref={audioRef}
          url={AudioUrl[selectdMusic]}
          autoPlay
          controls
          playing={playing}
          onPause={() => {
            setPlaying(false);
          }}
        />
      )}
      {/* {selectdMusic && (
        <audio ref={audioRef} controls={false} autoPlay>
          <source src={AudioUrl[selectdMusic]} type="audio/mp3" />
        </audio>
      )} */}
    </div>
  );
};
