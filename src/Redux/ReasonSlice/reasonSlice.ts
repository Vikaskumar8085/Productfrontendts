import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface reasonType {
  value: any[];
}

const initialState: reasonType = {
  value: [],
};

const reasonSlice = createSlice({
  name: "reason",
  initialState,
  reducers: {
    setreasonitems: (state, action: PayloadAction<any>) => {
      state.value = action.payload;
    },
    setaddreasonitems: (state, action: PayloadAction<any>) => {
      state.value.push(action.payload);
    },
  },
});

export const {setreasonitems, setaddreasonitems} = reasonSlice.actions;
export default reasonSlice.reducer;
