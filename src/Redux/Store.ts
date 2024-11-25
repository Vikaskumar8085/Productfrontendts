import {configureStore} from "@reduxjs/toolkit";
import UserSlice from "./UserSlice/index";
import CandidateSlice from "./CandidateSlice/CandidateSlice";
import Tagslice from "./TagSlice/Tagslice";
import clientSlice from "./ClientSlice/Clientslice";
import Regionslice from "./Region/Regionslice";
import reasonSlice from "./ReasonSlice/reasonSlice";
import Educationslice from "./EducationSlice/Educationslice";
import DesignationSlice from "./DesignationSlice/DesignationSlice";
import ProfileSlice from "./ProfileSlice/index";
export const store = configureStore({
  reducer: {
    user: UserSlice,
    candidate: CandidateSlice,
    client: clientSlice,
    tag: Tagslice,
    region: Regionslice,
    reason: reasonSlice,
    education: Educationslice,
    designation: DesignationSlice,
    profile: ProfileSlice,
    
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
