import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface Regiontype {
  [x: string]: any;
  value: any[];
}
const initialState: Regiontype = {
  value: [],
};

const Regionslice = createSlice({
  name: "Regionslice",
  initialState,
  reducers: {
    setRegionitems: (state, action: PayloadAction<any>) => {
      state.value = action.payload;
    },
    setaddRegionitems: (state, action: PayloadAction<any>) => {
      state.value.push(action.payload);
    },
    setdeleteRegionitems: (state, action: PayloadAction<any>) => {
      state.value = state.value.filter((item:any) => item.id !== action.payload);
    },
    setupdateRegionitems: (state, action: PayloadAction<any>) => {
      state.value = state.value.map((item:any) => item.id === action.payload.id ? action.payload : item);
    }
  },
});

export const {setRegionitems, setaddRegionitems, setdeleteRegionitems, setupdateRegionitems} = Regionslice.actions;

export default Regionslice.reducer;
