import { useEffect, useState } from "react";
import { ILyrics } from "../utils/types/lyrics.types";

interface UseGetLettersKaraokeProps {
  lyrics: ILyrics[];
}

interface UseGetLettersKaraokeResult {
  timeRemaining: number;
  currentDuration: number;
  percentage: number;
  currentLyris: string;
  nextLyrics: string;
  previousLyris: string;
}

export const useGetLettersKaraoke = ({
  lyrics,
}: UseGetLettersKaraokeProps): UseGetLettersKaraokeResult => {
  const [currentLyric, setCurrentLyric] = useState(0);
  const [currentDuration, setCurrentDuration] = useState(lyrics[0].durations);
  const [stop, setStop] = useState(false);
  const [previousLyris, setPreviousLyris] = useState<string>("");
  const [nextLyrics, setNextLyrics] = useState(lyrics[1].lyrics);

  useEffect(() => {
    if (!stop) {
      const intervalId = setInterval(() => {
        setCurrentLyric((prevLyric) => {
          const nextIndex = prevLyric + 1;
          const countOfLyrics = lyrics.length - 1;
          if (nextIndex === countOfLyrics) setStop(true);
          setPreviousLyris(lyrics[prevLyric].lyrics);
          setCurrentDuration(lyrics[nextIndex].durations);
          setNextLyrics(
            nextIndex === countOfLyrics ? "" : lyrics[nextIndex + 1].lyrics
          );
          return nextIndex;
        });
      }, currentDuration * 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [currentDuration, stop, lyrics]);

  return {
    timeRemaining: currentDuration,
    currentDuration: lyrics[currentLyric].durations,
    percentage: (currentDuration / lyrics[currentLyric].durations) * 100,
    currentLyris: lyrics[currentLyric].lyrics,
    nextLyrics,
    previousLyris,
  };
};
