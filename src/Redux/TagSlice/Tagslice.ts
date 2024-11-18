import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";

interface TagType {
  value: any[];
}
const initialState: TagType = {
  value: [],
};

const Tagslice = createSlice({
  name: "Tagslice",
  initialState,
  reducers: {
    setTagitems: (state, action: PayloadAction<any>) => {
      state.value = action.payload;
    },
    setaddItems: (state, action: PayloadAction<any>) => {
      state.value.push(action.payload);
    },
  },
});

export const {setTagitems, setaddItems} = Tagslice.actions;

export default Tagslice.reducer;
