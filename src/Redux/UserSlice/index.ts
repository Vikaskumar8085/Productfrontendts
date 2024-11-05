import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserAuth {
  isLogin: boolean;
  values: [];
}

const initialState: UserAuth = {
  isLogin: false,
  values: [],
};

const UserSlice = createSlice({
  name: "UserSlice",
  initialState,
  reducers: {
    setuserauth: (state, action: PayloadAction<any>) => {
      state.values = action.payload;
    },
  },
});
export const { setuserauth } = UserSlice.actions;
export default UserSlice.reducer;
