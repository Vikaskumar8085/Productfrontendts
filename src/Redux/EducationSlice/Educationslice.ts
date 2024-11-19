import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface educationtype {
  values: any[];
}
const initialState: educationtype = {
  values: [],
};

const Educationslice = createSlice({
  name: "educationslice",
  initialState,
  reducers: {
    seteducationitems: (state, action: PayloadAction<any>) => {
      state.values = action.payload;
    },
    setaddeducationitems: (state, action: PayloadAction<any>) => {
      state.values.push(action.payload);
    },
  },
});

export const {seteducationitems} = Educationslice.actions;
export default Educationslice.reducer;
