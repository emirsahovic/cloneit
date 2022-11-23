import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const initialState = {
  isSuccessRegister: false,
  isLoadingRegister: false,
  isErrorRegister: false,
  messageRegister: "",
  isSuccessLogin: false,
  isLoadingLogin: false,
  isErrorLogin: false,
  messageLogin: "",
};

export const registerUser = createAsyncThunk("auth/register", async (userData, thunkAPI) => {
  try {
    await authService.registerUser(userData);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const loginUser = createAsyncThunk("auth/login", async (userData, thunkAPI) => {
  try {
    await authService.loginUser(userData);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isErrorRegister = false;
      state.isSuccessRegister = false;
      state.isLoadingRegister = false;
      state.messageRegister = "";
    },
    setErrorToNo: (state) => {
      state.isErrorLogin = false;
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.isLoadingRegister = true;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.isLoadingRegister = false;
      state.isSuccessRegister = true;
    },
    [registerUser.rejected]: (state, action) => {
      state.isLoadingRegister = false;
      state.isSuccessRegister = false;
      state.isErrorRegister = true;
      state.messageRegister = action.payload;
    },
    [loginUser.pending]: (state) => {
      state.isLoadingLogin = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.isLoadingLogin = false;
      state.isSuccessLogin = true;
    },
    [loginUser.rejected]: (state, action) => {
      state.isLoadingLogin = false;
      state.isSuccessLogin = false;
      state.isErrorLogin = true;
      state.messageLogin = action.payload;
    },
  },
});

export const { reset, setErrorToNo } = authSlice.actions;
export default authSlice.reducer;
