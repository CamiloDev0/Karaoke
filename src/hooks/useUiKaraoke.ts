import {
  TSelectedMusic,
  onNextPage,
  onPassPage,
  onResetCurrentPage,
  onSetSelectedMusic,
  useAppDispatch,
  useAppSelector,
} from "../store";

export const useUiKaraoke = () => {
  const { currentPage, selectdMusic } = useAppSelector(
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

  return {
    currentPage,
    selectdMusic,
    nextPage,
    passPage,
    setSelectedMusic,
    resetCurrnetPage,
  };
};
