import { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import { useUiKaraoke } from '../hooks/useUiKaraoke';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  countDown: number;
}

const videoConstraints = {
  width: 450,
  height: 450,
  facingMode: 'user',
};

const TYPE_LISTENER = 'dataavailable';

export default function WebcamVideo({ countDown }: Props) {
  const { nextPage, setVideoQRName } = useUiKaraoke();
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef: React.MutableRefObject<MediaRecorder | null> = useRef(
    null
  );
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);

  const handleDataAvailable = ({
    data,
  }: MediaRecorderEventMap['dataavailable']) => {
    if (data.size > 0) {
      setRecordedChunks((prev) => prev.concat(data));
    }
  };

  const handleStartCaptureClick = () => {
    if (webcamRef.current && webcamRef.current.stream) {
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
        mimeType: 'video/webm',
      });
      mediaRecorderRef.current.addEventListener(
        TYPE_LISTENER,
        handleDataAvailable
      );
      mediaRecorderRef.current.start();
    }
  };

  const handleStopCaptureClick = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  };

  const handleDownload = () => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: 'video/webm',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      document.body.appendChild(a);
      //   a.style = "display: none";
      a.href = url;
      a.download = 'react-webcam-stream-capture.mp4';
      a.click();
      window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
      nextPage();
    }
  };

  const uploadFileRequest = async () => {
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
        	nextPage();
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

  useEffect(() => {
    handleStartCaptureClick();
  }, [webcamRef.current, webcamRef.current?.stream]);

  useEffect(() => {
    if (countDown === 0) {
      handleStopCaptureClick();
      setTimeout(uploadFileRequest, 5000);
    }
  }, [countDown, handleStopCaptureClick, handleDownload]);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: '0px',
        left: '0px',
        overflow: 'hidden',
      }}
    >
      <Webcam
        width={'100%'}
        height={'100%'}
        style={{ objectFit: 'fill' }}
        audio
        ref={webcamRef}
        videoConstraints={videoConstraints}
        audioConstraints
      />
    </div>
  );
}
