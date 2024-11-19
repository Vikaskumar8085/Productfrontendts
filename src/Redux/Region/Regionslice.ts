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
  },
});

export const {setRegionitems, setaddRegionitems} = Regionslice.actions;

export default Regionslice.reducer;
