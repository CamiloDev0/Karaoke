import { createSlice } from "@reduxjs/toolkit";
import { ILyrics } from "../../utils/types/lyrics.types";

export type TSelectedMusic = "bonito" | "provenza";

export type TAudioUrl = {
    [key in TSelectedMusic]: string;
};

export type TLyricsMusic = {
  [key in TSelectedMusic]: ILyrics[];
}
interface UiKaraoke {
  currentPage: number;
  selectdMusic: TSelectedMusic | null;
  qrVideoName: string | null;
}

const initialState: UiKaraoke = {
  currentPage: 1,
  selectdMusic: null,
  qrVideoName: null
};
export const uiKaraokeSlice = createSlice({
  name: "uiPage",
  initialState,
  reducers: {
    onNextPage: (state /* action */) => {
      state.currentPage += 1;
    },
    onPassPage: (state /* action */) => {
      state.currentPage -= 1;
    },
    onSetSelectedMusic: (state, { payload }) => {
      state.selectdMusic = payload;
    },
    onResetCurrentPage: (state) => {
      state.currentPage = 1;
      state.selectdMusic = null;
    },
    onSetQrVideoName: (state, { payload }) =>{
      state.qrVideoName = payload
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  onNextPage,
  onPassPage,
  onSetSelectedMusic,
  onResetCurrentPage,
  onSetQrVideoName
} = uiKaraokeSlice.actions;
