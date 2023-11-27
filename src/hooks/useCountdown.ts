import { useEffect, useState } from 'react';

export const useCountdown = (seconds:number) => {
  const [timeRemaining, setTimeRemaining] = useState(seconds);

  useEffect(() => {
    if (timeRemaining > 0) {
      const intervalId = setInterval(() => {
        setTimeRemaining((s) => s - 1);
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [timeRemaining]);

  return {
    timeRemaining,
    percentage: (timeRemaining / seconds) * 100,
  };
};

