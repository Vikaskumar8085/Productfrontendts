import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ClientSecurityType {
  value: any[];
}
const initialState: ClientSecurityType = {
  value: [],
};
const clientSecurity = createSlice({
  name: "Client Securit",
  initialState,
  reducers: {
    setClientSecurity: (state, action: PayloadAction<any>) => {
      state.value = action.payload;
    },
    setAddClientSecurity: (state, action: PayloadAction<any>) => {
      state.value = [...state.value, action.payload];
    },
    setUpdateClientSecurity: (state, action: PayloadAction<any>) => {
      state.value = state.value.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    setremoveClientsecurity: (state, action: PayloadAction<any>) => {
      state.value = state.value.filter((item) => item.id !== action.payload);
    },
  },
});

export const {
  setClientSecurity,
  setAddClientSecurity,
  setUpdateClientSecurity,
  setremoveClientsecurity,
} = clientSecurity.actions;
export default clientSecurity.reducer;
