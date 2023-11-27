import { StepsView } from "./karaoke/components/StepsView";
import { WelcomePage } from "./karaoke";
import { SelectMusic } from "./karaoke/components/SelectMusic";
import { CountDown } from "./karaoke/components/CountDown";
import { TakeVideo } from "./karaoke/components/TakeVideo";
import { QRVideo } from "./karaoke/components/QRVideo";
export const KarolGApp = () => {
  return (
    <div className="App">
      <StepsView>
        <WelcomePage />
        <SelectMusic />
        <CountDown />
        <TakeVideo />
        <QRVideo />
      </StepsView>
    </div>
  );
};
