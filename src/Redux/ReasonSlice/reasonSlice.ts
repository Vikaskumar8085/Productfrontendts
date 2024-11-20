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
    setdeletereasonitems: (state, action: PayloadAction<any>) => {
      state.value = state.value.filter((item:any) => item.id !== action.payload);
    },
    setupdatereasonitems: (state, action: PayloadAction<any>) => {
      state.value = state.value.map((item:any) => item.id === action.payload.id ? action.payload : item);
    }
  },
});

export const {setreasonitems, setaddreasonitems, setdeletereasonitems, setupdatereasonitems} = reasonSlice.actions;
export default reasonSlice.reducer;
