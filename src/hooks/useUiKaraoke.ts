import {
  TSelectedMusic,
  onNextPage,
  onPassPage,
  onResetCurrentPage,
  onSetQrVideoName,
  onSetSelectedMusic,
  useAppDispatch,
  useAppSelector,
} from "../store";

export const useUiKaraoke = () => {
  const { currentPage, selectdMusic, qrVideoName } = useAppSelector(
    (state) => state.uiKaraoke
  );
  const dispatch = useAppDispatch();

  const nextPage = () => {
    dispatch(onNextPage());
  };

  const passPage = () => {
    dispatch(onPassPage());
  };

  const setSelectedMusic = (selectedMusic: TSelectedMusic) => {
    dispatch(onSetSelectedMusic(selectedMusic));
  };

  const resetCurrnetPage = () => {
    dispatch(onResetCurrentPage());
  };

  const setVideoQRName = ( VideoName:string ) => {
    dispatch(onSetQrVideoName(VideoName));
  }

  return {
    currentPage,
    selectdMusic,
    nextPage,
    passPage,
    setSelectedMusic,
    resetCurrnetPage,
    setVideoQRName,
    qrVideoName
  };
};
