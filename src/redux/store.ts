import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import vendorReducer from "./vendorSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    vendor: vendorReducer,
  },
});

// The complete Type of my redux state
// {
//     reducer: {
//         auth: authState,
//         cart: cartState
//     }
// }
// Due to this typescript will know exactly what state contains and give autocomplete
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
