import { StepsView } from "./karaoke/components/StepsView";
import { WelcomePage } from "./karaoke";
import { SelectMusic } from "./karaoke/components/SelectMusic";
import { CountDown } from "./karaoke/components/CountDown";
import { TakeVideo } from "./karaoke/components/TakeVideo";
import { QRVideo } from "./karaoke/components/QRVideo";
import { useMultiHardware } from "./hooks/useMultiHardware";
import { NoMultiHardware } from "./modals/NoMultiHardware";
import VideoRecorder from "react-video-recorder";
import YourComponent from "./emergencia";
export const KarolGApp = () => {
  useMultiHardware();
  return (
    <div className="App">
     {/*  <StepsView>
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
      </StepsView> */}
        <CountDown />
      {/* <YourComponent /> */}
    </div>
  );
};
