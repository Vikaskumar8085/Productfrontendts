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
    //for update
    setupdateeducationitems: (state, action: PayloadAction<any>) => {
      const index = state.values.findIndex(
        (item) => item.id === action.payload.id
      );
      state.values[index] = action.payload;
    },
    //for delete
    setdeleteeducationitems: (state, action: PayloadAction<any>) => {
      state.values = state.values.filter((item) => item.id !== action.payload);
    },

  },
});

export const {seteducationitems,setaddeducationitems,setupdateeducationitems,setdeleteeducationitems} = Educationslice.actions;
export default Educationslice.reducer;
