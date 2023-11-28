import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { uiKaraokeSlice } from "./ui-karaoke/uiKaraoke.slice";
import { multiHardwareSlice } from "./multimedia-hardware/multiHardware.slice";

export const store = configureStore({
  reducer: {
    uiKaraoke: uiKaraokeSlice.reducer,
    multiHardware: multiHardwareSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
