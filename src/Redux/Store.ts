import {configureStore, UnknownAction} from "@reduxjs/toolkit";
import UserSlice from "./UserSlice/index";
import CandidateSlice from "./CandidateSlice/CandidateSlice";
import Tagslice from "./TagSlice/Tagslice";
import clientSlice from "./ClientSlice/Clientslice";
import Regionslice from "./Region/Regionslice";
import reasonSlice from "./ReasonSlice/reasonSlice";
import Educationslice from "./EducationSlice/Educationslice";
import DesignationSlice from "./DesignationSlice/DesignationSlice";
import securitySlice from "./securityslice/index";
import ProfileSlice from "./ProfileSlice/index";
import DashboardSlice from "./DashboardSlice/index";
import Dashboard1Slice from "./DashboardSlice1/index";
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
    security: securitySlice,
    dashboard: DashboardSlice,
    dashboard1 : Dashboard1Slice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
