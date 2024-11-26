import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface SeurityType {
  value: any[];
}
const initialState: SeurityType = {
  value: [],
};
const securitySlice = createSlice({
  name: "Security",
  initialState,
  reducers: {
    setSecurity: (state, action: PayloadAction<any>) => {
      state.value = action.payload;
    },
    setAddSecurity: (state, action: PayloadAction<any>) => {
      state.value = [...state.value, action.payload];
    },
    setUpdateSecurity: (state, action: PayloadAction<any>) => {
      state.value = state.value.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    setremovesecurity: (state, action: PayloadAction<any>) => {
      state.value = state.value.filter((item) => item.id !== action.payload);
    },
  },
});

export const {
  setSecurity,
  setAddSecurity,
  setUpdateSecurity,
  setremovesecurity,
} = securitySlice.actions;
export default securitySlice.reducer;
