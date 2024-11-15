import {createSlice} from "@reduxjs/toolkit";

interface Regiontype {}
const initialState: Regiontype = {};

const Regionslice = createSlice({
  name: "Regionslice",
  initialState,
  reducers: {
    setRegion: (state, action) => {},
  },
});

export const {setRegion} = Regionslice.actions;

export default Regionslice.reducer;
