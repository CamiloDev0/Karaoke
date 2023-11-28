import { StepsView } from "./karaoke/components/StepsView";
import { WelcomePage } from "./karaoke";
import { SelectMusic } from "./karaoke/components/SelectMusic";
import { CountDown } from "./karaoke/components/CountDown";
import { TakeVideo } from "./karaoke/components/TakeVideo";
import { QRVideo } from "./karaoke/components/QRVideo";
import Camera from "./webcam/CameraPedirPermiso";
import { CameraAndroidyios } from "./webcam/CameraAndroidyios";
import { WebCamRecorder } from "./webcam/WebCamRecorder";
import { useMultiHardware } from "./hooks/useMultiHardware";
import { NoMultiHardware } from "./modals/NoMultiHardware";
export const KarolGApp = () => {
  const { videoDevicesAllowed, audioDevicesAllowed } = useMultiHardware();
  return (
    <div className="App">
      <StepsView>
        <WelcomePage />
        <SelectMusic />
        <NoMultiHardware>
          <CountDown />
        </NoMultiHardware>
        <NoMultiHardware>
          <TakeVideo />
        </NoMultiHardware>
        <NoMultiHardware>
          <QRVideo />
        </NoMultiHardware>
      </StepsView>
      {/* <Camera/> */}
      {/* <CameraAndroidyios/> */}
      {/* <WebCamRecorder/> */}
    </div>
  );
};
