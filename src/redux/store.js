import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";

// Combine all reducers
const reducer = {
  auth: authReducer,
};

export const store = configureStore({
  reducer,
});
