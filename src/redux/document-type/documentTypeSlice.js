import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import documentTypeService from "./documentTypeService";

const initialState = {
  documentsType: [],
  specificDocument: {},
  isError: false,
  isSuccess: false,
  message: "",
  isLoading: false,
};


//GET DOCUMENT TYPES
export const getDocumentType = createAsyncThunk(
    "getdocumenttypes",
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

  //GET SPECIFIC DOCUMENT
export const getSpecificDocument = createAsyncThunk(
  "getspecificdocument",
  async (id, thunkAPI) => {
    try {
      return await documentTypeService.getSpecificDocument(id);
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

  //SaveData
  export const saveData = createAsyncThunk(
    "saveData",
    async (data, thunkAPI) => {
      try {
        return await documentTypeService.saveDocument(data);
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
      .addCase(getSpecificDocument.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSpecificDocument.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.specificDocument = action.payload;
      })
      .addCase(getSpecificDocument.rejected, (state, action) => {
        state.isLoading = false;
        state.documentsType = null;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(saveData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(saveData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(saveData.rejected, (state, action) => {
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
