import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import documentTypeReducer from "./document-type/documentTypeSlice";
import userReducer from "./users/userSlice";

// Combine all reducers
const reducer = {
  auth: authReducer,
  documentType: documentTypeReducer,
  user: userReducer,
};

export const store = configureStore({
  reducer,
});
