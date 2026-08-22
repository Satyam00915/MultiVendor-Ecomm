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
    updateVendorStatus: (state, action) => {
      const { vendorId, approvalStatus } = action.payload;
      const vendor = state.AllVendorsData.find((v) => v._id === vendorId);
      if (vendor?.vendor) {
        vendor.vendor.verificationStatus = approvalStatus;
      }
    },
  },
});

export const { setAllVendorsData, updateVendorStatus } = vendorSlice.actions;
export default vendorSlice.reducer;
