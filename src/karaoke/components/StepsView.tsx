import { ReactNode} from "react";
import { useUiKaraoke } from "../../hooks/useUiKaraoke";
interface Props {
  children: ReactNode | ReactNode[];
}
export const StepsView = ({ children: StepsComponents }: Props) => {
  const { currentPage } = useUiKaraoke();
  if (Array.isArray(StepsComponents))
    return <div>{StepsComponents[currentPage - 1]}</div>;
  return <div>{StepsComponents}</div>;
};
