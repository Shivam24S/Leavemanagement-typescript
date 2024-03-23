import { configureStore } from "@reduxjs/toolkit";
import leaveReducer from "../features/LeaveSlicer";

export const store = configureStore({
  reducer: {
    leave: leaveReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
