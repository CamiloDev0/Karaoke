import { useEffect, useState } from "react";
import { useUiKaraoke } from '../hooks/useUiKaraoke';
import axios from 'axios';

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
          audio: true
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
    // if (recordedChunks.length) {
    //   const blob = new Blob(recordedChunks, {
    //     type: "video/webm",
    //   });
    //   const url = URL.createObjectURL(blob);
    //   console.log("url", url);
    //   const a = document.createElement("a");
    //   document.body.appendChild(a);
    //   //   a.style = "display: none";
    //   a.href = url;
    //   a.download = "react-webcam-stream-capture.webm";
    //   a.click();
    //   window.URL.revokeObjectURL(url);
    //   setRecordedChunks([]);
    //   if(callback)callback()
    // }
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: 'video/webm',
      });
      const arrayBuffer = await blob.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);

      try {
        const response = await axios.post('https://mocionws.info/upload.php', uint8Array, {
          headers: {
            'Content-Type': 'application/octet-stream',
          },
        });
        console.log('Archivo guardado correctamente como mp4.', response.data);
        if (response.data !== 'error') {
          	setVideoQRName(response.data);
          	if(callback)callback();
          }
      } catch (error) {
        console.error('Error al guardar el archivo.', error);
      }
    }
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
