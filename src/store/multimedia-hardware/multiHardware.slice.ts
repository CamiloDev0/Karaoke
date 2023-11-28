import { createSlice } from "@reduxjs/toolkit";
import { IMultiHardware } from "../types";

const initialState: IMultiHardware = {
  audioDevices: [],
  audioDevicesAllowed: false,
  audioOutputDevices: [],
  audioOutputDevicesAllowed: false,
  browserInfo: null,
  isValidBrowser: false,
  videoDevices: [],
  videoDevicesAllowed: false,
};
export const multiHardwareSlice = createSlice({
  name: "multiHardware",
  initialState,
  reducers: {
    onSetMultiHardware: (state, { payload }) => {
      state.audioDevices = payload.audioDevices;
      state.audioDevicesAllowed = payload.audioDevicesAllowed;
      state.audioOutputDevices = payload.audioOutputDevices;
      state.audioOutputDevicesAllowed = payload.audioOutputDevicesAllowed;
      state.browserInfo = payload.browserInfo;
      state.isValidBrowser = payload.isValidBrowser;
      state.videoDevices = payload.videoDevices;
      state.videoDevicesAllowed = payload.videoDevicesAllowed;
    },
  },
});

export const { onSetMultiHardware } = multiHardwareSlice.actions;
