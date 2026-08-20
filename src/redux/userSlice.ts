import { IUser } from "@/models/User";
import { createSlice } from "@reduxjs/toolkit";

interface IUserData {
  userData: IUser | null;
}

const initialState: IUserData = {
  userData: null,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
