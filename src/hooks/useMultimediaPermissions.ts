import { useEffect, useState } from "react";
import VoxeetSDK from "@voxeet/voxeet-web-sdk";
import Bowser from "bowser";
import { IMultiHardware } from "../store/types";

export const useMultimediaPermissions = () => {
  const [requirements, setRequirements] = useState<IMultiHardware | null>(null);
  useEffect(() => {
    (async () => {
      try {
        const audioDevicesinner =
          await VoxeetSDK.mediaDevice.enumerateAudioDevices();
        const videoDevicesinner =
          await VoxeetSDK.mediaDevice.enumerateVideoDevices();
        const audioOutputinner =
          await VoxeetSDK.mediaDevice.enumerateAudioOutputDevices();
        //Verificacion de la camara
        const videoDevicesAllowed = await checkVideoDevice();
        //verificacion de los dispositivos de audio
        const audioDevicesAllowed = await checkAudioDevice();
        const audioOutputDevicesAllowed = await checkAudioOutput();
        const isValidBrowser = checkisValidBrowser();
        const browserInfo = checkBrowserInfo();

        setRequirements({
          audioDevices: audioDevicesinner,
          videoDevices: videoDevicesinner,
          videoDevicesAllowed: videoDevicesAllowed,
          audioDevicesAllowed: audioDevicesAllowed,
          audioOutputDevicesAllowed: audioOutputDevicesAllowed,
          audioOutputDevices: audioOutputinner,
          isValidBrowser: isValidBrowser ?? false,
          browserInfo: browserInfo,
        });
      } catch (e) {
        console.error("exception", e);
      }

      //inyectando el polyfill del método getUserMedia
      getUserMediaPolyfill();
    })();

    return () => {};
  }, []);

  const getUserMediaPolyfill = () => {
    (async () => {
      if (!navigator.mediaDevices) {
        navigator.mediaDevices = {};
      }
      navigator.mediaDevices.getUserMedia =
        navigator.mediaDevices.getUserMedia ||
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;
    })();
  };

  const checkAudioDevice = async () => {
    let constraints = { audio: true, video: false };
    let allowed = false;
    try {
      allowed = await navigator.mediaDevices.getUserMedia(
        constraints,
        () => {},
        () => {}
      );
      allowed = true;
    } catch (e) {
      allowed = false;
    }
    return allowed;
  };

  const checkisValidBrowser = () => {
    const browser = Bowser.getParser(window.navigator.userAgent);
    const isValidBrowser = browser.satisfies({
      chrome: ">65",
      firefox: ">60",
      edge: ">17",
      safari: ">11",
      opera: ">57",
    });

    return isValidBrowser;
  };

  const checkBrowserInfo = () => {
    const browser = Bowser.getParser(window.navigator.userAgent);
    const getBrowserInfo = browser.getBrowser();
    return getBrowserInfo;
  };

  const checkVideoDevice = async () => {
    const constraints = { audio: false, video: true };
    let allowed = false;
    try {
      await navigator.mediaDevices.getUserMedia(
        constraints,
        () => {},
        () => {}
      );
      allowed = true;
    } catch (e) {
      allowed = false;
    }
    return allowed;
  };
  const checkAudioOutput = async () => {
    let allowed = false;
    try {
      await navigator.mediaDevices.selectAudioOutput();
      allowed = true;
    } catch (error) {
      allowed = false;
    }
    return allowed;
  };

  return { requirements };
};
