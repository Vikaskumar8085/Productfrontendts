import {createSlice} from "@reduxjs/toolkit";

interface educationtype {
  values: [];
}
const initialState: educationtype = {
  values: [],
};

const Educationslice = createSlice({
  name: "educationslice",
  initialState,
  reducers: {
    seteducationitems: (state, action) => {},
  },
});

export const {seteducationitems} = Educationslice.actions;
export default Educationslice.reducer;
