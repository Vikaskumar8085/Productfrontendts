import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "UserSlice",
  initialState: {},
  reducers: {
    setuserauth: (state, action) => {},
  },
});
export const { setuserauth } = UserSlice.actions;
export default UserSlice.reducer;
