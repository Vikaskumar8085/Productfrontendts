import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Profile {
  
  values: any[];
}

const initialState: Profile = {
  
  values: [],
};

const ProfileSlice = createSlice({
  name: "ProfileSlice",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<any>) => {
      state.values = action.payload;
    },
    setAddProfile: (state, action: PayloadAction<any>) => {
        state.values.push(action.payload);
        },
    setDeleteProfile: (state, action: PayloadAction<any>) => {
        state.values = state.values.filter((item:any) => item.id !== action.payload);
        },
    setUpdateProfile: (state, action: PayloadAction<any>) => {
        state.values = state.values.map((item:any) => item.id === action.payload.id ? action.payload : item);
        }

    
  },
});
export const { setProfile, setAddProfile,setUpdateProfile}  = ProfileSlice.actions;
export default ProfileSlice.reducer;
