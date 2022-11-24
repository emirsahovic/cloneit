import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";

const initialState = {
  user: {},
  isLoadingUsersProfile: false,
  isSuccessUsersProfile: false,
  isErrorUsersProfile: false,
  messageUsersProfile: "",
};

export const getUsersProfile = createAsyncThunk("users/profile", async (_, thunkAPI) => {
  try {
    const data = await userService.getUsersProfile();
    return data;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state.isErrorUsersProfile = false;
      state.isSuccessUsersProfile = false;
      state.isLoadingUsersProfile = false;
      state.messageUsersProfile = "";
    },
  },
  extraReducers: {
    [getUsersProfile.pending]: (state) => {
      state.isLoadingUsersProfile = true;
    },
    [getUsersProfile.fulfilled]: (state, action) => {
      state.isLoadingUsersProfile = false;
      state.isSuccessUsersProfile = true;
      state.user = action.payload;
    },
    [getUsersProfile.rejected]: (state, action) => {
      state.isLoadingUsersProfile = false;
      state.isSuccessUsersProfile = false;
      state.isErrorUsersProfile = true;
      state.messageUsersProfile = action.payload;
    },
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
