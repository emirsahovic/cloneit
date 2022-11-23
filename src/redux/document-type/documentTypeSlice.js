import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import documentTypeService from "./documentTypeService";

const initialState = {
  documentsType: [],
  isError: false,
  isSuccess: false,
  message: "",
  isLoading: false,
};


//GET DOCUMENT TYPE
export const getDocumentType = createAsyncThunk(
    "getdocumenttype",
    async (_, thunkAPI) => {
      try {
        return await documentTypeService.getDocumentType();
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  );


  export const documentTypeSlice = createSlice({
    name: "documentType",
    initialState,
    reducers: {
      reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
      .addCase(getDocumentType.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDocumentType.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.documentsType = action.payload;
      })
      .addCase(getDocumentType.rejected, (state, action) => {
        state.isLoading = false;
        state.documentsType = null;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })

    }

})


export const { reset } = documentTypeSlice.actions;
export default documentTypeSlice.reducer;
