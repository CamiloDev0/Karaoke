import { useEffect } from "react";
import { onSetMultiHardware, useAppDispatch, useAppSelector } from "../store";
import { useMultimediaPermissions } from "./useMultimediaPermissions";

export const useMultiHardware = () => {
  const dispatch = useAppDispatch();
  const { requirements } = useMultimediaPermissions();
  const multiHardware = useAppSelector((state) => state.multiHardware);
  console.log('multiHardware',multiHardware)
  const getStatusHardware = () => {
    if (requirements) {
      dispatch(onSetMultiHardware(requirements));
    }
  };

  useEffect(() => {
    getStatusHardware();
  }, [requirements]);

  return { ...multiHardware, getStatusHardware };
};
