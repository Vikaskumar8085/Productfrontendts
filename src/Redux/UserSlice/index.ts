import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface UserAuth {
  isLogin: boolean;
  values: [];
  Role: string;
}
const initialState: UserAuth = {
  isLogin: false,
  values: [],
  Role: "",
};

const UserSlice = createSlice({
  name: "UserSlice",
  initialState,
  reducers: {
    setuserauth: (state, action: PayloadAction<any>) => {
      state.values = action.payload;
    },
    setUserRole: (state, action: PayloadAction<any>) => {
      state.Role = action.payload;
    },
  },
});
export const {setuserauth, setUserRole} = UserSlice.actions;
export default UserSlice.reducer;
