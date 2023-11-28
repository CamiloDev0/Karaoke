import { useEffect, useState } from "react";
import { ILyrics } from "../utils/types/lyrics.types";

export const useGetLettersKaraoke = (durations: ILyrics[]) => {
  const [currentDurationIndex, setCurrentDurationIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(durations[0].durations);
  const [stop, setStop] = useState(false);
  useEffect(() => {
    if (!stop /* || timeRemaining > 0 */) {
      const intervalId = setInterval(() => {
        /*  if (timeRemaining > 0) {
          setTimeRemaining((s) => s - 1);
        } else {
          
          
        } */

        const nextIndex = (currentDurationIndex + 1) % durations.length;
        if (nextIndex === durations.length - 1) setStop(true);
        setCurrentDurationIndex(nextIndex);
        setTimeRemaining(durations[nextIndex].durations);
      }, timeRemaining * 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [timeRemaining, currentDurationIndex, durations]);

  return {
    timeRemaining,
    currentDuration: durations[currentDurationIndex].durations,
    percentage:
      (timeRemaining / durations[currentDurationIndex].durations) * 100,
    currentLyris: durations[currentDurationIndex].lyrics,
  };
};
