import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import documentTypeReducer from './document-type/documentTypeSlice'
// Combine all reducers
const reducer = {
  auth: authReducer,
  documentType: documentTypeReducer
};

export const store = configureStore({
  reducer,
});
