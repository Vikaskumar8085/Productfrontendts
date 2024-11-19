import {configureStore} from "@reduxjs/toolkit";
import UserSlice from "./UserSlice/index";
import CandidateSlice from "./CandidateSlice/CandidateSlice";
import Tagslice from "./TagSlice/Tagslice";
import clientSlice from "./ClientSlice/Clientslice";
import Regionslice from "./Region/Regionslice";
import reasonSlice from "./ReasonSlice/reasonSlice";
import Educationslice from "./EducationSlice/Educationslice";
export const store = configureStore({
  reducer: {
    user: UserSlice,
    candidate: CandidateSlice,
    client: clientSlice,
    tag: Tagslice,
    region: Regionslice,
    reason: reasonSlice,
    education: Educationslice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
