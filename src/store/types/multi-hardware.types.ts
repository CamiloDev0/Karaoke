export interface IMultiHardware {
  audioDevices: any[];
  audioDevicesAllowed: boolean;
  audioOutputDevices: any[];
  audioOutputDevicesAllowed: boolean;
  browserInfo: Bowser.Parser.Details | null;
  isValidBrowser: boolean;
  videoDevices: any[];
  videoDevicesAllowed: boolean;
}
