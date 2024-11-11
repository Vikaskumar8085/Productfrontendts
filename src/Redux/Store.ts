import {configureStore} from "@reduxjs/toolkit";
import UserSlice from "./UserSlice/index";
import CandidateSlice from "./CandidateSlice/CandidateSlice";

export const store = configureStore({
  reducer: {
    user: UserSlice,
    candidate: CandidateSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
