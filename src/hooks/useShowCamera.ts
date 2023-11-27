import { useEffect, useState } from "react";

export const useShowCamera = (
  videoRefProp: React.MutableRefObject<null> | null = null
) => {
  const [videoRef, setVideoRef] = useState<React.MutableRefObject<any> | null>(
    null
  );

  const onSetVideoRef = (videoRef: React.MutableRefObject<any>) => {
    setVideoRef(videoRef);
  };
  useEffect(() => {
    const startCamera = async () => {
      try {
        if (!videoRef) return;
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        const videoElement = videoRef.current;
        videoElement.srcObject = stream;
        videoElement.play();
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };
    startCamera();
  }, [videoRef]);

  useEffect(() => {
    if (videoRefProp) {
      setVideoRef(videoRefProp);
    }
  }, [videoRefProp]);

  return {
    onSetVideoRef,
  };
};
