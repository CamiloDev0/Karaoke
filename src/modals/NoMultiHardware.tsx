import { useMultiHardware } from "../hooks/useMultiHardware";

interface Props {
  children: React.ReactNode;
}
export const NoMultiHardware = ({ children }: Props) => {
  const { videoDevicesAllowed, audioDevicesAllowed } = useMultiHardware();
  if (!videoDevicesAllowed && !audioDevicesAllowed) {
    return <p>Debe permitir acceso a la camara y microfono</p>;
  } else if (!videoDevicesAllowed && audioDevicesAllowed) {
    return <p>Debe permitir acceso a la camara</p>;
  } else if (videoDevicesAllowed && !audioDevicesAllowed) {
    return <p>Debe permitir acceso al microfono</p>;
  }
  return <>{children}</>;
};
