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
    setdeleteTagitems: (state, action: PayloadAction<any>) => {
      state.value = state.value.filter((item:any) => item.id !== action.payload);
    },
    setupdateTagitems: (state, action: PayloadAction<any>) => {
      state.value = state.value.map((item:any) => item.id === action.payload.id ? action.payload : item);
    }
  },
});

export const {setTagitems, setaddItems, setdeleteTagitems, setupdateTagitems} = Tagslice.actions;

export default Tagslice.reducer;
