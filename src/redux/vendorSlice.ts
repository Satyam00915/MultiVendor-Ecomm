import { IProduct } from "@/models/Product";
import { IUser } from "@/models/User";
import { createSlice } from "@reduxjs/toolkit";

interface IVendor {
  AllVendorsData: IUser[];
  AllProductData: IProduct[] | null;
}

const initialState: IVendor = {
  AllVendorsData: [],
  AllProductData: [],
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
    setAllProductsData: (state, action) => {
      state.AllProductData = action.payload;
    },
  },
});

export const { setAllVendorsData, updateVendorStatus, setAllProductsData } =
  vendorSlice.actions;
export default vendorSlice.reducer;
