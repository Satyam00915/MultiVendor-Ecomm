import { IUser } from "@/models/User";
import { createSlice } from "@reduxjs/toolkit";

interface IVendor {
  AllVendorsData: IUser[];
}

const initialState: IVendor = {
  AllVendorsData: [],
};

export const vendorSlice = createSlice({
  name: "vendorSlice",
  initialState,
  reducers: {
    setAllVendorsData: (state, action) => {
      state.AllVendorsData = action.payload;
    },
  },
});

export const { setAllVendorsData } = vendorSlice.actions;
export default vendorSlice.reducer;
