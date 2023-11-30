import { useEffect, useState } from "react";
import { useUiKaraoke } from '../hooks/useUiKaraoke';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export const useShowCameraGrabar = (
  videoRefProp: React.MutableRefObject<null> | null = null
) => {
  const [videoRef, setVideoRef] = useState<React.MutableRefObject<any> | null>(
    null
  );
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const { setVideoQRName } = useUiKaraoke();

  const onSetVideoRef = (videoRef: React.MutableRefObject<any>) => {
    setVideoRef(videoRef);
  };

  const startRecording = () => {
    if (videoRef?.current) {
      const constraints = {
        video: true,
        audio: true, 
      };

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          const newMediaRecorder = new MediaRecorder(stream);

          newMediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
              setRecordedChunks((prev) => [...prev, event.data]);
            }
          };

          newMediaRecorder.onstop = () => {
            const blob = new Blob(recordedChunks, { type: "video/webm" });
            // Aquí puedes manejar la lógica de lo que quieres hacer con el video grabado
            console.log("Blob", blob);
          };

          newMediaRecorder.start();
          setIsRecording(true);
          setMediaRecorder(newMediaRecorder);
        })
        .catch((error) => {
          console.error("Error accessing camera:", error);
        });
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
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

    return () => {
      stopRecording();
    };
  }, [videoRef]);

  useEffect(() => {
    if (videoRefProp) {
      setVideoRef(videoRefProp);
    }
  }, [videoRefProp]);


  const handleDownload = async (callback?:()=>void) => {
    /*if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      const url = URL.createObjectURL(blob);
      console.log("url", url);
      const a = document.createElement("a");
      document.body.appendChild(a);
      //   a.style = "display: none";
      a.href = url;
      a.download = "react-webcam-stream-capture.mp4";
      a.click();
      window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
      if(callback)callback()
    }*/
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: 'video/webm',
      });
      const fileName = generateUniqueId();
      const data = new FormData();
      data.append('videoFile', blob, fileName);
      const _heads = {
        'Content-Type': `multipart/form-data;`,
      };
      try {
        const res = await axios.post(
          'https://mocionws.info/video.php',
          data,
          { headers: _heads }
        );
        console.log('UPLOAD VIDEO', res);
        if (res.data !== 'error') {
        	setVideoQRName(res.data);
        	if(callback)callback();
        }
      } catch (error) {
        console.log('ERROR UPLOAD VIDEO', error);
      }
    }
  };

  const generateUniqueId = () => {
    const newUniqueId = uuidv4().slice(0, 6);
    return newUniqueId;
  };


  return {
    onSetVideoRef,
    startRecording,
    stopRecording,
    isRecording,
    recordedChunks,
    handleDownload
  };
};
