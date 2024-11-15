import {createSlice} from "@reduxjs/toolkit";

interface TagType {
  value: [];
}
const initialState: TagType = {
  value: [],
};

const Tagslice = createSlice({
  name: "Tagslice",
  initialState,
  reducers: {
    setTagitems: (state, action) => {},
  },
});

export const {setTagitems} = Tagslice.actions;

export default Tagslice.reducer;
